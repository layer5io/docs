---
docType: "Chapter"
id: "introduction"
chapterTitle: "Introduction"
description: ""
lectures: 12
title: "Introduction"
weight: 1
---

{{< chapterstyle >}}

In this tutorial, you will learn how to **Install a Scalable PostgreSQL Distribution on Kubernetes with Cloud Native PostgreSQL** using Meshery Playground. Meshery Playground is an interactive and collaborative live cluster environment that simplifies the deployment process and enhances user experience by providing visual tools for managing Kubernetes resources.

> **NOTE:** If this is your first time working with Meshery Playground, consider starting with the [Exploring Kubernetes Pods with Meshery Playground](https://docs.meshery.io/guides/tutorials/kubernetes-pods) tutorial first.

<h2 class="chapter-sub-heading">Prerequisites</h2>

- Basic understanding of Kubernetes concepts.
- Access to the _Meshery Playground_. If you don't have an account, sign up at [Meshery Playground](https://play.meshery.io/).

<h2 class="chapter-sub-heading">Lab Scenario</h2>

- Import the CloudnativePG manifest files
- Import manifest files for sample application
- Deploy these resources on the playground


<h2 class="chapter-sub-heading">Objective</h2>

Learn how to deploy and manage postgreSQL and a Python sample application using CloudNative PG and Meshery Playground. This tutorial will demonstrate how to import manifest files, visualize kubernetes resources, and observe the dynamic provisioning capabilities of CloudNativePG. By the end of this tutorial, you will have a clear understanding of how to leverage Meshery Playground for deployments and visualization.

<h2 class="chapter-sub-heading">CloudNativePG</h2>

CloudNative PG is a level 5 Kubernetes operator that efficiently manages PostgreSQL clusters, ensuring high availability throughout their lifecycle. It offers seamless Kubernetes API integration, declarative configuration, 
advanced observability, and is secure by default.
CloudNative PG encapsulates PostgreSQL within a Kubernetes-native framework, adhering to cloud-native principles for deployment, 
scaling, and management. It uses CRDs and Operator patterns for seamless integration with Kubernetes, enabling automated provisioning, scaling, and management of PostgreSQL clusters.


<h3 class="chapter-sub-heading">Access Meshery Playground</h3>

1. Log in to the [Meshery Playground](https://cloud.layer5.io/) using your credentials. On successful login, you should be at the dashboard. Press the **X** on the _Where do you want to start?_ popup to close it (if required).
2. Click **Explore** in the Cloud Native Playground tile to navigate to _Kanvas_

{{< /chapterstyle >}}