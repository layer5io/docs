# Stream Container Logs


> Live-tail the logs of a pod or container from the Operator canvas, search the stream, and know its limits.


Log streaming live-tails the output of a pod's containers inside the Operator canvas. Each stream starts with the most recent lines and then follows new output as it is written, so you can watch a rollout, a crash loop, or a request path next to the topology that produced it.

## Before you start

- **Operator mode on a Meshery you run.** The hosted kanvas.new site does not offer Operator mode.
- **A connected cluster with Meshery Operator deployed.** MeshSync reads the logs and Meshery Server relays them through the broker, the same path the terminal uses. See [Operator](/pr-preview/pr-1335/kanvas/concepts/operator/).
- **Containers that exist.** Logs come from the Kubernetes log API, so a container that has not started has nothing to stream.

## Start a stream

The action is named **Initiate Log Session** and is offered on **Pod** and **Container** resources only. Right-click the resource, or select it and use the action in the header of the Details panel. The stream opens in the same bottom-left panel as [terminal sessions](/pr-preview/pr-1335/kanvas/guides/operating/interactive-terminal/), as a tab.

| You select | Tabs opened |
|---|---|
| A pod | One tab for the pod that combines every container in its `containers` list. Each line is prefixed with `[<pod>:<container>]` in a per-container color. |
| A container | One tab for that container. |
| Several pods, one after another | One tab per pod. Kanvas does not merge different pods into one tab. |

Starting a stream for a pod that already has a tab does nothing. To stream only some of a pod's containers, use the container selector in the panel header. Choosing different containers restarts that tab's stream.

## Read and control the stream

- **Backlog.** Each container starts with its last 1,000 lines. Kanvas requests timestamps, so every line begins with an RFC 3339 time. Standard output and standard error arrive combined.
- **Scrollback.** The browser keeps the last 10,000 lines per tab.
- **Search.** The search icon in the panel header opens a search field with next and previous controls. It highlights and jumps between matches. It does not hide non-matching lines.
- **Copy.** Select text in the stream to copy it. There is no Clear, Copy-all, or Download control.
- **Stop.** The trash icon on a tab stops the stream and removes the tab. Closing the panel with its close button only hides it; streams keep running.

Empty lines are dropped. Very long lines can be split across messages and display broken.

## Limits and scope

| Item | Behavior |
|---|---|
| Initial backlog | 1,000 lines per container, fixed. |
| Previous container logs | Not available. Streams read the current container only. |
| Follow | Always on. |
| Reconnect | None. If the connection drops, the tab stops updating with no message. Close it and start a new stream. |
| Container exits or pod is deleted | The stream ends with no message. |
| Resource names | Pod, namespace, and container names must be valid Kubernetes DNS labels. Other names are rejected by the server. |
| Changing the container selection | Requests the 1,000-line backlog again, so lines can repeat in the tab. |

## Who can use it

Kanvas does not hide or disable the action by role or plan. The permission model lists **Stream container logs** as an Operator capability for the Team Operator plan and above, granted to workspace administrators, organization administrators, and provider administrators. See [Permissions by Role](/pr-preview/pr-1335/kanvas/reference/permissions/) and [Feature Availability](/pr-preview/pr-1335/kanvas/reference/feature-availability/).

## Failure modes

| Symptom | Cause and fix |
|---|---|
| Panel shows `Failed to create terminal session` with a reason | The Kanvas extension could not be loaded by Meshery, for example because it was built for a different Meshery version. Install matching versions. |
| Toast `No container found to create log session` | The selected component lists no containers. |
| Empty tab, no lines | The pod has produced no output, or Meshery Server cannot reach MeshSync. Confirm the cluster shows as connected and that the broker is connected. Kanvas does not display the server's error text for log streams. |

For cluster connection problems, see [Troubleshoot Kanvas](/pr-preview/pr-1335/kanvas/guides/troubleshooting/).

## Related

- [Run a Performance Test](/pr-preview/pr-1335/kanvas/guides/operating/performance-testing/) to see how a service holds up under load while the stream is open.
- [Operator](/pr-preview/pr-1335/kanvas/concepts/operator/) explains the data path from the cluster to the canvas.

