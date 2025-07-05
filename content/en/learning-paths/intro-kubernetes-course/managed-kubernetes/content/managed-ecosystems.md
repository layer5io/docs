---
docType: "Chapter"
id: "Managed Ecosystems"
chapterTitle: "Managed Ecosystems"
description: ""
lectures: 2
title: "Managed Ecosystems"
weight: 2
---
{{< chapterstyle >}}

<h2 class="chapter-sub-heading">Container Orchestration Ecosystem</h2>

While Kubernetes solves the orchestration part, additional components are needed to deploy and run containers smoothly in production.

Container lifecycle management as well as monitoring, backup, CI/CD, security, logging and registration are all activities needed in container orchestration.

K8s comes with multiple options and plugins for each layer. Each team has its preferences for ecosystem decisions.

{{< image src="/images/learning-path/intro-kubernetes/managed-kubernetes/c5_l2_1.png" width="100%" align="center" alt="Ecosystem" >}}

**Managed Container Orchestration Ecosystems**

**SKS**

Exoscale's Scalable Kubernetes Service (SKS) built into the platform's core based on vanilla Kubernetes. Easily upgradeable to go along with the progress of the Kubernetes project. A fully open ecosystem with the flexibility to choose all additional pluggable solutions based on your needs. Start a production Kubernetes cluster in seconds. Run from the portal, CLI, API and configuration management tools. The managed service scope is the Kubernetes Cluster, precisely the total lifecycle management of the control plane and the nodes.

**APPUiO**

VSHN's APPUiO is the leading Kubernetes based Container Platform for the design, development and operation of applications. Based on reliable Open Source concepts, such as Docker and Kubernetes, APPUiO supports the DevOps approach. Development, deployment and operation processes are accelerated through automation and self-service. The cooperation between software developers and business organization is also improved. The managed service scope extends into parts of the ecosystem of pluggable Kubernetes solutions, increasing user comfort and reducing user flexibility in individual tool selection.

**CK8s**

Elastisys' Compliant Kubernetes (CK8s) is a security-hardened, CNCF certified Kubernetes distribution that allows organizations to enjoy the benefits of Kubernetes while fulfilling regulatory requirements – all the way from development to deployment to operations and audits. Compliant Kubernetes comes pre-configured with CNCF approved open source projects that make life easier at audits and enforces compliance policies for your workloads, helping fulfil regulatory standards. You can rely on pre-configured templates and best practices and define your policies to achieve your regulatory goals. The managed service scope is fully managed.

{{< image src="/images/learning-path/intro-kubernetes/managed-kubernetes/c5_l2_2.png" width="100%" align="center" alt="Managed Ecosystems" >}}

{{< /chapterstyle >}}