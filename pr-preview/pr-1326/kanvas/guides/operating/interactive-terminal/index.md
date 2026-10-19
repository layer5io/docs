# Open an Interactive Terminal


> Open shell sessions into the containers of a running pod from the Operator canvas, and know what the terminal can and cannot do.


The interactive terminal opens a shell inside a running container without leaving the Operator canvas. Use it for last-mile diagnosis that logs and status cannot answer: testing connectivity from inside a pod, reading a mounted file, or checking an injected environment variable. It is a browser-based equivalent of `kubectl exec`, scoped to the resource you selected.

## Before you start

- **Operator mode on a Meshery you run.** The hosted kanvas.new site does not offer Operator mode. See [How Kanvas Works with Meshery and Layer5 Cloud](/pr-preview/pr-1326/kanvas/concepts/architecture/).
- **A connected cluster with Meshery Operator deployed.** Meshery Operator runs MeshSync and a message broker in the cluster. MeshSync executes the shell, and Meshery Server relays input and output through the broker. If any of the three is unavailable, the terminal does not connect (see [Failure modes](#failure-modes)).
- **A running container whose image contains `/bin/sh`.** Distroless images have no shell and cannot be used.

## Open a session

The action is named **Initiate Terminal Session** and is offered on **Pod** and **Container** resources only. Right-click the resource on the canvas, or select it and use the action in the header of the Details panel. The session starts immediately and the terminal panel opens at the bottom left of the canvas. There is no separate connect step.

What opens depends on what you selected:

| You select | Sessions opened |
|---|---|
| A pod | One session per container in the pod's `containers` list, each in its own tab. Init and ephemeral containers are not included. There is no prompt to choose a container. |
| A container | One session for that container. |

A node with an active session shows a terminal badge. Selecting the badge reopens the panel.

## Work in the terminal

Each tab is one shell session. The panel is draggable, minimizable to a dock icon with a session count, and keeps its scrollback (10,000 lines). Closing the panel with the close button hides it and leaves the sessions running. The trash icon on a tab ends that tab's session and removes the tab. Leaving Operator mode closes the panel.

The terminal edits your input in the browser and sends it to the container when you press Enter:

| Key | Behavior |
|---|---|
| Printable keys, Backspace | Edit the current line locally. |
| Enter | Sends the whole line to the shell. |
| Up, Down | Walk the history of lines typed in this tab. |
| Ctrl+C | Sends an interrupt to the running command. |
| Tab | Inserts four spaces. It does not trigger shell completion. |
| Other Ctrl, Alt, and Meta combinations | Ignored. |

Because input is line-based and the remote terminal is not resized when you resize the panel, commands that take over the screen, such as `vim`, `top`, and `less`, do not work. Use commands that print and exit: `ls`, `cat`, `env`, `ps aux`, `curl`, `nslookup`.

The search icon in the panel header opens a search field with next and previous controls for finding text in the scrollback.

## Limits and scope

| Item | Behavior |
|---|---|
| Sessions per container | One live session per container per user. Starting a second session for the same container does nothing and opens no new tab. |
| Concurrent sessions overall | No limit is enforced. |
| Different users | Each user gets an independent session, even on the same container. |
| Shell | Fixed to `/bin/sh` with a terminal attached. No bash fallback and no shell selection. |
| Identity in the container | The exec call runs with MeshSync's own Kubernetes access, not a per-user Kubernetes identity. Anyone who can open a terminal has the reach of the workload's container, so treat access to this action as access to the container. |
| Idle timeout, maximum duration | None. |
| Reconnect | None. If the connection between your browser and Meshery Server drops, the tab stays on screen but is dead. Close the tab and start a new session. |

## Who can use it

Kanvas does not hide or disable the action based on role or plan. The permission model lists **View Interactive Terminal** as an Operator capability for the Team Operator plan and above. See [Permissions by Role](/pr-preview/pr-1326/kanvas/reference/permissions/) and [Feature Availability](/pr-preview/pr-1326/kanvas/reference/feature-availability/) for the current role and plan matrix.

## Failure modes

| Symptom | Cause and fix |
|---|---|
| Panel shows `Failed to create terminal session` with a reason | The Kanvas extension could not be loaded by Meshery. The reason names the cause, for example a plugin built for a different Meshery version than the one you run. Install matching versions. |
| Toast `No container found to create term session` | The selected component lists no containers. |
| Empty tab, no prompt | Meshery Server could not reach MeshSync. Confirm the cluster shows as connected and that the broker is connected. Kanvas does not display the server's error text for terminal sessions. |
| Prompt never appears, or the shell prints an error | The container has no `/bin/sh`, is not in the Running phase, or was deleted. Errors raised while MeshSync opens the shell print in the terminal itself. |
| Session goes quiet after `exit` or a pod restart | The session ended on the cluster. Kanvas shows no closed message. Close the tab and start a new session. |

For cluster connection problems, see [Troubleshoot Kanvas](/pr-preview/pr-1326/kanvas/guides/troubleshooting/).

## Related

- [Stream Container Logs](/pr-preview/pr-1326/kanvas/guides/operating/log-streaming/) opens in the same panel as terminal sessions.
- [Operator](/pr-preview/pr-1326/kanvas/concepts/operator/) explains where this data comes from.
- [Resource Details](/pr-preview/pr-1326/kanvas/reference/resource-details/) lists the actions available for every resource kind.

