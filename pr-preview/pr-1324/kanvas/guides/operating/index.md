# Operate Infrastructure

> Work against live clusters from Operator mode - open shells, follow logs, and load test services.


These guides cover tasks you run against live clusters from Operator mode. Each task starts from a resource on the Operator canvas and runs through Meshery Operator, MeshSync, and the broker that Meshery Operator deploys in the cluster. To see how those pieces fit together, read [Operator](/pr-preview/pr-1324/kanvas/concepts/operator/).

| To do this | Resource kinds | Guide |
|---|---|---|
| Open a shell in a running container | Pod, Container | [Open an Interactive Terminal](/pr-preview/pr-1324/kanvas/guides/operating/interactive-terminal/) |
| Follow a pod's or container's logs | Pod, Container | [Stream Container Logs](/pr-preview/pr-1324/kanvas/guides/operating/log-streaming/) |
| Generate load against an endpoint | Service, Ingress | [Run a Performance Test](/pr-preview/pr-1324/kanvas/guides/operating/performance-testing/) |

Operator mode needs a Meshery deployment that can reach your clusters. The hosted kanvas.new site does not offer it.

