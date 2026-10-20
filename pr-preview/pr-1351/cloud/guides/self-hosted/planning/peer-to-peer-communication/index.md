# Networking


> Prepare and configure network services for your Layer5 Cloud deployment.

## Considerations of Peer-to-Peer Communication

When two people open the same design, their browsers exchange edits directly over WebRTC. Layer5 Cloud takes part only at the start and for presence. Edits do not pass through Layer5 Cloud or Meshery Server.

A self-hosted provider is its own signaling host. Browsers open a WebSocket to `/collaboration` on your deployment. Users connected to your deployment never signal through Layer5's hosted service, and there is no public Layer5 signaling server to point them at.

Characteristics of the peer-to-peer communication include:

- The WebSocket carries introductions and presence. WebRTC carries the edits.
- Browsers ask public STUN servers how to reach each other, and fall back to a public TURN relay when a direct path is blocked. Those hosts are set by the Kanvas client and are not configurable in the deployment.
- The server stores nothing from a session. The person who made an edit saves it through the normal design save.
- Not suited for a large number of collaborators on a single document, because every browser connects to every other browser.

### Default Configuration

The signaling endpoint is `/collaboration` on your own hostname. The ingress must pass WebSocket upgrades. The server pings each connection every 27 seconds and drops a client that does not answer within 30 seconds.

- **Authentication.** A connection must present the user's access token. The server answers an unauthenticated connection with `401`.
- **Rooms.** The endpoint accepts any room name from a signed-in user and does not check that the user may open the design. Design identifiers are random, and the content stays on the peers.
- **Origins.** The endpoint accepts WebSocket connections from any origin.

Each participant is shown to the others with their name, avatar, cursor, and selected component. A second browser tab with the same account appears as another collaborator.

#### Default Number of Supported Users

Layer5 Cloud enforces no cap on the number of people in a room, on document size, or on session length. Connection count grows with the square of the room's size, so a very large room degrades before the server does. Plan for design reviews and pairing.

## Required network paths

| From | To | Protocol | Purpose |
| --- | --- | --- | --- |
| Browsers, Meshery Servers, API clients | Ingress, public hostname | HTTPS | UI, API, sign-in (`/kratos`), and OAuth2 (`/hydra`) |
| Browsers | Ingress, `/collaboration` | WebSocket over HTTPS | Co-editing signaling |
| Layer5 Cloud server | Kratos and Hydra services | HTTP, in cluster | Account and token operations. Default ports: Kratos public 9010 and admin 9011, Hydra public 4444 and admin 4445 |
| Kratos | Layer5 Cloud server | HTTP, in cluster | Registration hooks, and identity mail when the HTTP courier is selected |
| Layer5 Cloud server, Kratos, Hydra | PostgreSQL | TCP 5432 | Databases `meshery`, `kratos`, `hydra` |
| Layer5 Cloud server | SMTP relay | SMTP on 25, 465, 587, or 2525 | Mail. The relay must resolve to a public address |
| Browsers | Public STUN and TURN hosts | UDP and TCP | Direct connections between co-editing browsers |

## When co-editing cannot connect

Kanvas keeps working as a single-user editor and writes the reason to the browser console. There is no on-screen indicator and no automatic retry.

| Symptom | Likely cause |
| --- | --- |
| The WebSocket to `/collaboration` fails with `401` | The user's session has expired. Signing in again fixes it. |
| The WebSocket never upgrades | The ingress or an intermediate proxy does not pass WebSocket upgrades on `/collaboration`. |
| The WebSocket connects, but people do not see each other's changes | Browsers cannot reach the public STUN and TURN hosts, or a firewall blocks WebRTC. |
| People see each other's presence but not edits | Signaling works and the peer connection does not. |

