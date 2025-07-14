---
docType: "Chapter"
id: "REPLICASETs"
chapterTitle: "REPLICASETs"
description: "ReplicaSets are a fundamental building block in Kubernetes, ensuring that a specified number of identical Pods are running at all times."
lectures: 7
title: "REPLICASETs"
weight: 3
---
{{< chapterstyle >}}

<h2 class="chapter-sub-heading">REPLICASETs</h2>

A ReplicaSet's purpose is to maintain a stable set of replica Pods running at any given time to guarantee the availability of a specified number of identical Pods. However, a Deployment is a higher-level concept that manages ReplicaSets and provides declarative updates to Pods and other useful features. Therefore, Deployments are recommended instead of directly using ReplicaSets.

{{< image src="/images/learning-path/intro-kubernetes/kubernetes_building_blocks/c4_l3_1.gif" width="100%" align="center" alt="REPLICASETs" >}}

{{< /chapterstyle >}}