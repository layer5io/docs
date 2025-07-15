---
docType: "Chapter"
id: "Without Container Orchestration"
chapterTitle: "Without Container Orchestration"
description: ""
lectures: 2
title: "Without Container Orchestration"
weight: 1
---
{{< chapterstyle >}}

<h2 class="chapter-sub-heading">Why Kubernetes?</h2>

Running services in containers tend to produce numerous containers pretty quick. Handling many containers with no additional aid is a very cumbersome job. Hence, an orchestration solution is necessary to run services in containers efficiently.

{{< image src="/images/learning-path/intro-kubernetes/kubernetes/c2_l1_1.png" width="100%" align="center" alt="Why Kubernetes?" >}}

<h2 class="chapter-sub-heading">Without Container Orchestration</h2>

<ul>
    <li>Think about scaling up services; it increases manual work.</li>
    <li>Think about fixing crashing nodes; it increases manual work.</li>
    <li>Think about the complexity of running new stuff in production; it increases.</li>
    <li>Think about the human cost of running those services; it increases.</li>
    <li>Scaling services/applications becomes more and more difficult.</li>
    <li>Public cloud provider resource usage becomes more and more expensive.</li>
</ul>

{{< image src="/images/learning-path/intro-kubernetes/kubernetes/c2_l1_2.png" width="100%" align="center" alt="Without Container Orchestration" >}}

{{< /chapterstyle >}}