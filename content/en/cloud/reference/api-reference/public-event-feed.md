---
title: Public Event Feed
weight: 10
---
<!-- markdownlint-configure-file {
  "MD041": false,
  "MD003": false,
  "MD022": false
} -->

The public event feed provides an unauthenticated, read-only view of
events that users have chosen to share publicly.

## Get the public event feed

`GET /api/events/feed`

This endpoint does not require authentication. It returns eligible public
events in reverse chronological order, with the newest events first.

An event appears in the feed only when:

- Its visibility is set to `public`.
- Its owner's `shareActivityPublicly` preference is enabled.
- It meets the feed's required metadata checks.

The preference is checked when the feed is requested. Disabling it hides
that user's previously public events from subsequent feed responses; it
does not rewrite those events.

## Query parameters

| Parameter | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `page` | Integer | Minimum: `0` | — | Zero-based page number. |
| `pagesize` | Integer | 1-50 | `20` | Number of events per page. A value outside 1-50 returns HTTP `400 Bad Request`. |
| `category` | String | Maximum length: `500` | — | Filters by category. |
| `action` | String | Maximum length: `500` | — | Filters by action. |

The `category` and `action` filters are optional and can be used together.

The `pagesize` parameter must be between `1` and `50`. Values outside
this range are rejected with HTTP `400 Bad Request`.

## Response

A successful request returns a JSON object containing pagination metadata
and the event records.

| Field | Type | Description |
|---|---|---|
| `page` | Integer | Current zero-based page number. |
| `pageSize` | Integer | Number of events requested per page. |
| `totalCount` | Integer | Total number of matching public events. |
| `data` | Array | Eligible event records for the current page. |

Each event in `data` contains the following required fields:

| Field | Type | Description |
|---|---|---|
| `id` | String | Event identifier. |
| `userId` | String | Identifier of the event owner. |
| `category` | String | Event category. |
| `action` | String | Event action. |
| `createdAt` | String | Event creation timestamp. |
| `visibility` | String | Visibility; feed records are `public`. |
| `platform` | String | Platform associated with the event. |
| `role` | String | Role associated with the event. |
| `line` | String | Line associated with the event. |

The following fields are optional:

| Field | Type | Description |
|---|---|---|
| `networks` | Array | Network information, when available. |
| `displayName` | String | Public display name, when available. |
| `avatarUrl` | String | Avatar URL, if the user has a public profile. |
| `organizationName` | String | Organization name, when available. |
| `publicProfileUrl` | String | Profile URL, if the user has a public profile. |

### Example response

```json
{
  "page": 0,
  "pageSize": 20,
  "totalCount": 1,
  "data": [
    {
      "id": "event-123",
      "userId": "user-456",
      "category": "deployment",
      "action": "completed",
      "createdAt": "2026-11-13T06:00:00Z",
      "visibility": "public",
      "platform": "Kubernetes",
      "role": "Developer",
      "line": "Production deployment completed",
      "networks": [],
      "displayName": "Alex",
      "avatarUrl": "https://example.com/avatar.png",
      "publicProfileUrl": "https://example.com/profile/alex"
    }
  ]
}
```

## Privacy and data visibility

The feed exposes only a limited projection of public event data.

- Only events with `visibility: "public"` are eligible.
- The owner's `shareActivityPublicly` preference is checked when the
  feed is requested.
- The feed does not expose email addresses, first names, last names,
  descriptions, providers, or raw event metadata.
- The `platform`, `role`, `line`, and `networks` fields are projected
  from the event's schedule-completion metadata.
- Events without valid required metadata are omitted from the feed.
- Public profile information, when available, is resolved at request time.

## Caching and rate limiting

### Caching

Successful responses carry a `Cache-Control` header with a `max-age`
value of up to 30 seconds:

`Cache-Control: public, max-age=N`

The value of `N` can range from `0` to `30`. Shared caches may serve a
response for the specified duration. Because the owner's sharing
preference is evaluated when the feed is requested, a preference
change may take up to the cache lifetime to be reflected in cached
responses.

### Rate limiting

Requests to the public event feed are rate-limited by client IP address.

When the rate limit is exceeded, the API returns HTTP `429 Too Many
Requests` and includes a `Retry-After` header indicating when the client
can retry.

## Sharing preference

The `shareActivityPublicly` preference controls whether a user's public
events appear in the public event feed.

It is an account-wide boolean preference that can be updated through
the following endpoint using an authenticated session:

`PUT /api/identity/users/preferences`

The request body is a JSON object containing the preferences to update.
Each field is optional, and omitted fields retain their existing values.

Example request:

```json
{
  "shareActivityPublicly": false
}
```

| Value | Behavior |
|---|---|
| `true` | The user's public events are eligible for the feed. |
| `false` | The user's events are hidden from the feed. |

If the preference is absent, it defaults to `true`.

The preference update accepts boolean values. Non-boolean values are
rejected with HTTP `400 Bad Request`.

Changing the preference affects feed visibility at read time. Existing
events are not rewritten when the preference is changed.

## Publishing public events

Events are created through:

`POST /api/events`

The event's owner is always the authenticated caller; a client cannot set the owner. The `visibility` field controls whether an event is private or public.

The event owner is determined by the authenticated calling session or
user token. The owner's `shareActivityPublicly` preference controls
whether the event can appear in the public feed.

| Value | Behavior |
|---|---|
| `private` | The event remains private. This is the default. |
| `public` | Eligible for the feed if the owner's preference allows it. |

Example request:

```json
{
  "category": "deployment",
  "action": "completed",
  "visibility": "public"
}
```

If `visibility` is omitted, the event defaults to `private`. Setting it
to `public` does not override the owner's `shareActivityPublicly`
preference.
