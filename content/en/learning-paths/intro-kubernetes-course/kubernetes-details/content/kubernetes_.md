---
docType: "Chapter"
id: "Kubernetes ..."
chapterTitle: "Kubernetes ..."
description: ""
lectures: 4
title: "Kubernetes ..."
weight: 4
---
{{< chapterstyle >}}

<h2 class="chapter-sub-heading">Kubernetes is ...</h2>

... **providing** the building blocks for creating developer and infrastructure platforms but preserves user choice and flexibility where it is essential.

... **extensible**, and lets users integrate their logging, monitoring, alerting, and many more solutions because it is not monolithic, and these solutions are optional and pluggable.

{{< image src="/images/learning-path/intro-kubernetes/kubernetes-details/c3_l4_1.png" width="100%" align="center" alt="Pluggable Solutions" >}}

<h2 class="chapter-sub-heading">Kubernetes does NOT ...</h2>

... **limit the types of applications supported.**
</br>
Kubernetes aims to support a highly diverse workload, including stateless, stateful, and data-processing workloads. If an application can run in a container, it should run great on Kubernetes.

...** deploy source code and does not build your application.**
</br>
Organizational cultures determine Continuous Integration, Delivery, and Deployment (CI/CD) workflows and preferences and technical requirements.

... **provide application-level services.**
</br>

such as middleware, data-processing frameworks, databases, caches, nor cluster storage systems as built-in services. Application access through portable mechanisms the components mentioned above - both are running Kubernetes.

... **provide nor adopt any comprehensive machine management.**
<br/>
The task requires additional components for system configuration, system management & maintenance, etc...

<h2 class="chapter-sub-heading">Kubernetes is NOT ...</h2>

... **a traditional, all-inclusive PaaS system.**
</br>
Kubernetes operates at the container level rather than at the hardware level. It provides some generally helpful features common to PaaS offerings, such as deployment, scaling, load balancing.

... **a mere orchestration system.**
</br>
It eliminates the need for orchestration. The definition of orchestration is executing a defined workflow:
</br>
<li>first, do A, then B, then C → <strong>imperative</strong>.</li>
<br>
Kubernetes comprises independent, composable control processes that continuously drive the current state:
</br>
<li>towards the desired state → <strong>declarative</strong>.</li>

{{< /chapterstyle >}}