# Rate limits


> Which Layer5 Cloud API routes are rate limited, the limit for each route family, and how to handle HTTP 429.



Layer5 Cloud limits how fast a caller can call some API routes. A request over the limit is refused with HTTP 429. The limits first shipped in Layer5 Cloud v1.0.334 and are unchanged through v1.0.342.

Normal desktop use never reaches these limits. You see a 429 only when a client calls far faster than normal use, for example in a retry loop or when it replays a large backlog at once.

## What is limited

Limits apply per caller and per route family. There is no global limit.

- Each route family has its own bucket for each caller. Using up one family never refuses a request in another family.
- Routes outside the families in the [limits table](#limits-by-route-family) are not rate limited.
- The families cover the routes the Blowhorn desktop app calls: claims, schedules, ledgers, content items, events, profiles, desktop connections, capabilities, and Blowhorn health.

### Who counts as the caller

The caller is the authenticated user. All of your installs and all of your [tokens](/pr-preview/pr-1274/cloud/concepts/identity-and-security/tokens/) share your buckets, because they all belong to the same user.

Two kinds of request are counted by client IP address instead:

- A request with no user, such as the capabilities handshake.
- A request authenticated with the shared anonymous Meshery results token.

Layer5 Cloud checks the `CF-Connecting-IP` header, then `X-Real-IP`, and takes the first valid IPv4 address found across them in that order. If neither header holds a valid IPv4 address, it takes the first valid IPv6 address found. If neither header holds a valid address, it uses the connection's remote address.

## How the limit works

Each bucket is a token bucket with two numbers:

- **Burst** is the size of the bucket: how many requests you can make back to back, starting from a full bucket.
- **Rate** is how many tokens per second refill the bucket. Each request spends one token. Once the burst is spent, traffic sustained above the rate is refused.

A bucket that is empty refills completely in burst ÷ rate seconds. Over any one minute, a caller can make at most burst + (60 × rate) requests in one family.

A bucket that is not used for 10 minutes is dropped. By then it has refilled completely, so dropping it changes no answer.

## Limits by route family

In the route column, `*` means the path and every path under it.

| Family | Routes | Rate | Burst |
|---|---|---|---|
| `claims` | `/api/claims*` | 10 per second | 150 |
| `schedules` | `/api/schedules*`, `/api/workspaces/{workspaceId}/schedules*` | 20 per second | 200 |
| `ledgers` | `/api/ledgers*` | 20 per second | 300 |
| `content_items` | `/api/content-items*` | 20 per second | 400 |
| `events_write` | `POST /api/events` (run records) | 10 per second | 300 |
| `events_read` | `GET /api/events*`, `GET /api/workspaces/{workspaceId}/events` | 20 per second | 500 |
| `events_manage` | `PUT` and `DELETE` on `/api/events*`: `DELETE /api/events`, `DELETE /api/events/{id}`, `PUT /api/events/status`, `PUT /api/events/{id}/status` | 5 per second | 100 |
| `profiles` | `/api/profiles*`, `/api/workspaces/{workspaceId}/profiles*` | 5 per second | 100 |
| `desktop_connections` | `POST /api/integrations/connections`, `POST /api/integrations/connections/{connectionId}/heartbeat`, `DELETE /api/integrations/connections/desktop/{installationId}` | 2 per second | 200 |
| `capabilities` (counted by IP address) | `GET /capabilities` (deprecated), `GET /{meshery-version}/capabilities` | 10 per second | 200 |
| `blowhorn_health` | `GET /api/blowhorn/health` | 1 per second | 30 |

Registering a connection uses the generic `POST /api/integrations/connections` route. Meshery Server connection registration therefore shares the `desktop_connections` bucket with the desktop app.

### Effective window

| Family | Refill from empty | Most requests in one minute |
|---|---|---|
| `claims` | 15 seconds | 750 |
| `schedules` | 10 seconds | 1,400 |
| `ledgers` | 15 seconds | 1,500 |
| `content_items` | 20 seconds | 1,600 |
| `events_write` | 30 seconds | 900 |
| `events_read` | 25 seconds | 1,700 |
| `events_manage` | 20 seconds | 400 |
| `profiles` | 20 seconds | 400 |
| `desktop_connections` | 100 seconds | 320 |
| `capabilities` | 20 seconds | 800 |
| `blowhorn_health` | 30 seconds | 90 |

### How the limits are sized

The limits are sized for one heavy user running the desktop app on 5 installs at once. Each family has at least 10 times the headroom over that user's normal peak. A script that sends several hundred requests in a few seconds still empties the bucket and is refused.

## When a request is refused

A refused request receives:

- Status `429 Too Many Requests`.
- A `Retry-After` header: the whole number of seconds until your bucket holds a token again, at least 1. Every family refills at 1 token per second or faster, so with the current limits the value is `1`.
- A JSON body in the MeshKit error format, with code `meshery_cloud-3629`.

```json
{
  "code": "meshery_cloud-3629",
  "error": "Too many requests",
  "severity": "alert",
  "probableCause": [
    "A client is calling this route family faster than normal use, for example a retry loop or a burst of replayed requests."
  ],
  "suggestedRemediation": [
    "Wait for the number of seconds in the Retry-After header, then retry. A client that is refused in normal use should pace its requests."
  ]
}
```

The body does not name the route family. Identify a refusal by the code `meshery_cloud-3629` and the `Retry-After` header, and do not parse the message text.

### Handling a 429

- Treat 429 as retryable. Wait the number of seconds in `Retry-After`, then retry the request.
- Retrying a Blowhorn write is safe, because the writes are idempotent: a claim replays, a ledger record is written only if absent, and a run record carries an idempotency key.
- If your client is refused during normal use, pace its requests so that it stays under the rate of the family it calls.

### Order of checks

The limit is checked after authentication and before the organization of the request is resolved.

- A request with a missing or invalid credential receives HTTP 401 before any rate check, and does not spend a token.
- A refused request does no work: no organization is resolved and the endpoint does not run.

## Where the counts are kept

- Counts are kept in memory in the Layer5 Cloud server process, separately on each pod. They are not shared between pods and are not saved.
- Counts reset when the server restarts or a new version is deployed.
- Hosted Layer5 Cloud runs one replica, so the per-pod count is the real limit.
- The limits are fixed in the server code. They cannot be configured per organization or per deployment, and a [self-hosted deployment](/pr-preview/pr-1274/cloud/guides/self-hosted/) has the same values.

For authentication, organization context, and the other error responses, see the [Cloud API](/pr-preview/pr-1274/cloud/reference/api-reference/).

