---
docType: "Chapter"
id: "DEPLOYMENTs"
chapterTitle: "DEPLOYMENTs"
description: "Deployments are a higher-order abstraction that controls deploying and maintaining a set of Pods. They support sophisticated logic for deploying, updating, and scaling Pods within a cluster."
lectures: 7
title: "DEPLOYMENTs"
weight: 4
---
{{< chapterstyle >}}

<h2 class="chapter-sub-heading">DEPLOYMENTs</h2>

A ReplicaSet's purpose is to maintain a stable set of replica Pods running at any given time to guarantee the avaiA Deployment is a higher-order abstraction that controls deploying and maintaining a set of Pods. Behind the scenes, it uses a ReplicaSet to keep the Pods running, but it offers sophisticated logic for deploying, updating, and scaling a set of Pods within a cluster. Deployments support rollbacks and rolling updates. Rollouts can be paused if needed.

{{< image src="/images/learning-path/intro-kubernetes/kubernetes_building_blocks/c4_l4_1.gif" width="100%" align="center" alt="DEPLOYMENTs" >}}

{{< /chapterstyle >}}