---
title: Networking
description: "The network paths a self-hosted Layer5 Cloud deployment needs, including how real-time co-editing connects browsers and what the signaling endpoint can see."
categories: [self-hosted]
tags: [networking, webrtc, collaboration]
weight: 20
diataxis: how-to
aliases:
  - /cloud/self-hosted/planning/peer-to-peer-communication/
---

Plan these network paths before you deploy. Most are ordinary HTTPS traffic through your ingress. Real-time co-editing is the exception: it connects browsers directly to each other, and the deployment only introduces them.

## Required network paths

| From | To | Protocol | Purpose |
| --- | --- | --- | --- |
| Browsers, Meshery Servers, API clients | Ingress, public hostname | HTTPS | UI, API, sign-in (`/kratos`), and OAuth2 (`/hydra`) |
| Browsers | Ingress, `/collaboration` | WebSocket over HTTPS | Co-editing signaling |
| Layer5 Cloud server | Kratos and Hydra services | HTTP, in cluster | Account and token operations. Default ports: Kratos public 9010 and admin 9011, Hydra public 4444 and admin 4445 |
| Kratos | Layer5 Cloud server | HTTP, in cluster | Registration hooks, and identity mail when the HTTP courier is selected |
| Layer5 Cloud server, Kratos, Hydra | PostgreSQL | TCP 5432 | Databases `meshery`, `kratos`, `hydra` |
| Layer5 Cloud server | SMTP relay | SMTP on 25, 465, 587, or 2525 | Mail. The relay must resolve to a public address |
| Layer5 Cloud server | Webhook receivers | HTTPS | Optional webhooks |
| Layer5 Cloud server | OpenTelemetry collector | OTLP gRPC | Optional traces |
| Browsers | Public STUN and TURN hosts | UDP and TCP | Direct connections between co-editing browsers |

The ingress must support WebSocket upgrades. A controller or load balancer that closes idle connections shorter than the signaling keep-alive (below) disconnects users from their co-editing session.

## How co-editing connects people

When two people open the same design, their browsers exchange edits directly over WebRTC. Layer5 Cloud takes part only at the start and for presence:

1. Each browser opens a WebSocket to `/collaboration` on the provider that signed the user in and joins a room named after the design.
2. The server tells each browser who else is in the room.
3. The browsers ask public STUN servers how to reach each other, and fall back to a public TURN relay when a direct path is blocked.
4. Edits then travel browser to browser. They do not pass through Layer5 Cloud or Meshery Server.

A self-hosted provider is its own signaling host. Users connected to your deployment never signal through Layer5's hosted service.

In short: the WebSocket carries introductions and presence, WebRTC carries the work, and STUN and TURN help the browsers find each other.

### What the signaling endpoint does and enforces

- **Authentication.** A connection must present the user's access token. The server answers an unauthenticated connection with `401`.
- **Rooms.** The endpoint creates a room when someone joins and tracks who is in it. It accepts any room name from a signed-in user and does not check that the user may open the design the room belongs to. Design identifiers are random, and the content of a design stays on the peers, so treat the identifier as the secret that gates a room.
- **Messages.** The server relays join, leave, and broadcast messages, and pushes the member list of each room to its members, with each person's name and avatar.
- **Keep-alive.** The server pings each connection every 27 seconds. A client that does not answer within 30 seconds is dropped.
- **Persistence.** The server stores nothing from a session. The person who made an edit saves it through the normal design save; a person who opens the design later loads the last saved version.
- **Origins.** The endpoint accepts WebSocket connections from any origin.

### What peers see

Each participant is shown to the others with their name, avatar, cursor, and selected component. Presence colors are random per session, so two people can share a color. A second browser tab with the same account appears as another collaborator.

## Sizing and limits

Layer5 Cloud enforces no cap on the number of people in a room, on document size, or on session length. Because every browser connects to every other browser, connection count grows with the square of the room's size, and a very large room degrades before the server does. Plan for design reviews and pairing, not broadcast to large audiences.

## When co-editing cannot connect

Kanvas keeps working as a single-user editor and writes the reason to the browser console. There is no on-screen indicator and no automatic retry. Check these in order:

| Symptom | Likely cause |
| --- | --- |
| The WebSocket to `/collaboration` fails with `401` | The user's session has expired. Signing in again fixes it. |
| The WebSocket never upgrades | The ingress or an intermediate proxy does not pass WebSocket upgrades on `/collaboration`. |
| The WebSocket connects, but people do not see each other's changes | Browsers cannot reach the public STUN and TURN hosts, or a firewall blocks WebRTC. The STUN and TURN hosts are set by the Kanvas client and are not configurable in the deployment. |
| People see each other's presence but not edits | The same cause: signaling works and the peer connection does not. |
