---
title: Operate Infrastructure
linkTitle: Operate Infrastructure
description: Work against live clusters from Operator mode - open shells, follow logs, and load test services.
weight: 60
diataxis: how-to
categories: [operator]
tags: [operator]
---

These guides cover tasks you run against live clusters from Operator mode. Each task starts from a resource on the Operator canvas and runs through Meshery Operator, MeshSync, and the broker that Meshery Operator deploys in the cluster. To see how those pieces fit together, read [Operator]({{< ref "kanvas/concepts/operator/index.md" >}}).

| To do this | Resource kinds | Guide |
|---|---|---|
| Open a shell in a running container | Pod, Container | [Open an Interactive Terminal]({{< ref "kanvas/guides/operating/interactive-terminal/index.md" >}}) |
| Follow a pod's or container's logs | Pod, Container | [Stream Container Logs]({{< ref "kanvas/guides/operating/log-streaming/index.md" >}}) |
| Generate load against an endpoint | Service, Ingress | [Run a Performance Test]({{< ref "kanvas/guides/operating/performance-testing/index.md" >}}) |

Operator mode needs a Meshery deployment that can reach your clusters. The hosted kanvas.new site does not offer it.
