# Meshery Server Registration


> How a Meshery Server registers itself with Layer5 Cloud as its Remote Provider, what data is recorded, and how re-registration is handled.



Layer5 Cloud is a [Meshery remote provider](https://docs.meshery.io/extensibility/providers). When a Meshery Server uses Layer5 Cloud, hosted or self-hosted, the server registers itself with Cloud on behalf of the signed-in user. Registration is what makes that Meshery Server known to Cloud: it appears as a `meshery` connection owned by that user. This page explains what the server sends, how Cloud tells a new server from one it already knows, what survives re-registration, and what each failure means.

For where registration fits between Cloud and Meshery, see [How Layer5 Cloud works with Meshery and Kanvas](/pr-preview/pr-1365/cloud/concepts/#how-layer5-cloud-works-with-meshery-and-kanvas).

## Why Registration Exists

Registration answers two questions for Cloud:

1. **Which Meshery Server is calling?** Many Meshery deployments can work with the same Cloud deployment, and Cloud must keep them apart.
2. **Who owns it?** Every registration is owned by exactly one user, the user whose session made the request.

A registration record answers both. It ties a stable server identifier to an owner and survives Meshery Server restarts.

## Identifying a Meshery Server

A Meshery Server generates a stable server identifier on its first start and keeps it locally. It sends that identifier as `serverId` inside the connection's `metadata`. The key is camelCase.

Cloud recognizes an existing registration by three values together:

- the connection kind, `meshery`
- the owner, which is the authenticated user
- `metadata.serverId`

Each owner and `serverId` pair maps to exactly one connection. Cloud places no limit on either side of that pair: one user can register any number of Meshery Servers, and one Meshery Server can be registered by any number of users, with one connection per user.

Connections are owned by a user, not by an organization. Each user sees their own connections, including the Meshery Servers they registered.

## Registration Endpoint

A Meshery Server registers by sending a connection to:

```
POST /api/integrations/connections
```

The request must be authenticated with a Cloud session or a bearer token. Cloud takes the owner from that authentication, never from the request body.

| Field | Required | Description |
| :--- | :--- | :--- |
| `kind` | Yes | The connection kind. Case-insensitive. Accepted values are `meshery`, `kubernetes`, `prometheus`, and `grafana`. A Meshery Server registers itself with `meshery`. |
| `metadata.serverId` | Yes, for `meshery` | The stable identifier the Meshery Server generated. The key is camelCase. |
| `name` | No | A display name. When omitted, Cloud names the connection `<kind>-<random>`, for example `meshery-` followed by a random suffix. |
| `metadata` (other keys) | No | Additional details about the server, such as its version. Cloud refreshes them on every registration. |

On success, Cloud responds with HTTP 201 and a one-item page of connections containing the registered connection. Every registration call, first or repeat, records a "registered" event for the connection in the account's event log.

## What Happens on First Registration

When no connection matches the owner and `serverId`, Cloud creates a new `meshery` connection owned by the authenticated user.

The request is rejected before anything is stored when authentication does not resolve to a user. The error is "cannot register meshery connection: missing owner in authenticated session".

## What Happens on Re-Registration

A re-registration is any later call from the same Meshery Server, carrying the same `serverId`, for the same user. It typically follows a Meshery Server restart, a new sign-in, or a reconnect.

Cloud updates the existing connection in place:

| Kept from the stored connection | Refreshed from the request |
| :--- | :--- |
| ID, name, kind, type, sub-type, status, owner, and creation time | Metadata and the last-updated time |

Two consequences follow:

- **Re-registering never renames a server.** A request that omits `name`, and would otherwise get a random name, cannot replace the name the connection already has.
- **Re-registering never resets status.** A Meshery Server you disconnected or ignored stays disconnected or ignored when it registers again.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Status changes through connection lifecycle actions</h4>
  
      Connection status changes through the dedicated connection lifecycle actions, such as connect, disconnect, ignore, and delete, not through registration. Registration carries the stored status forward, so a restarting server cannot undo a status you set.
  
</div>



## Validation and Error Cases

| Condition | Result |
| :--- | :--- |
| The request carries no Cloud session or bearer token | Rejected. The endpoint requires authentication. |
| The authentication does not resolve to a user | Rejected before anything is stored, with the error "cannot register meshery connection: missing owner in authenticated session". |
| `kind` is not one of the accepted values | HTTP 500 with the error "connection kind: `<kind>`, not implemented yet". |
| `metadata.serverId` is missing or empty on a `meshery` registration | HTTP 500 with the error "empty server id; cannot check for existence". No connection is created. |

A missing or empty `serverId` does not fall back to creating an unidentified connection.

## Operator Guidance

If you operate a self-hosted Layer5 Cloud, these symptoms map to the most common causes:

- **Registration fails with "missing owner in authenticated session".** The request reached Cloud with authentication that does not resolve to a user. Look at the request in your logs and confirm that it carries a valid session or bearer token for an existing account.
- **Registration fails with "empty server id; cannot check for existence".** The client did not send `serverId` in `metadata`. Cloud does not fall back to creating an unidentified connection. Confirm that the client sends the identifier under the camelCase key `serverId`.
- **Registration fails with "not implemented yet".** The client sent a `kind` other than `meshery`, `kubernetes`, `prometheus`, or `grafana`.
- **A Meshery Server appears under the wrong user.** The owner comes from the session, not from the request body. The server was registered while a different account was signed in.
- **The same Meshery Server appears more than once.** Each owner and `serverId` pair is a separate connection, so a server registered by two users appears once for each of them. If one user sees the same server twice, the server presented a different `serverId`, which happens when it loses the identifier it stored locally and generates a new one.
- **A Meshery Server's name or status in Cloud does not change when it reconnects.** This is intended. Re-registration preserves the stored name and status. Change them through the connection's own actions.

## Where the Code Lives

The behavior on this page is the contract for `POST /api/integrations/connections`. Identity is the triple of kind `meshery`, the authenticated owner, and `metadata.serverId`. Status changes go through the connection lifecycle actions (connect, disconnect, ignore, and delete), not through registration.

## Other connection kinds

The same endpoint registers the other accepted kinds, with their own identity rules:

- **Kubernetes.** Cloud derives the connection's ID from the cluster and the owner, so registering the same cluster again updates the existing connection instead of creating another. Cloud stores the cluster's credential once and keeps the stored status.
- **Prometheus and Grafana.** Cloud creates the connection or updates the existing one in place.

