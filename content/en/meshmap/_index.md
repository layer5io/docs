---
title: MeshMap Documentation
linkTitle: Overview
type: docs
menu: {main: {weight: 3}}
weight: 1
cascade: 
    type: docs
---


<!-- {{% pageinfo %}}

**Meshery** is a cloud native manager that enables the design and management of Kubernetes-based infrastructure and applications. It is an extensible developer platform that seamlessly integrates with various CNCF projects, monitoring, CI/CD, and security tools.

**MeshMap** is like Figma for DevOps, as it allows you to create, test, and deploy cloud native architectures with ease and efficiency.{{% /pageinfo %}} -->
<!-- {{< figure src="layer5-cloud-provider.svg"  class="image-center-shadow" >}} -->

{{% pageinfo %}}

## Understanding the Meshery Ecosystem

**Layer5 Cloud** ([docs](/cloud)) is an identity provider and global console for Meshery deployments with an extensible and highly flexible authorization framework, tenant entitlement services, service provider-grade organizational hierarchy, team workspace management and a content catalog for public and private hosting of cloud native architectures. Layer5 Cloud is available as a service or self-hosted.

**Meshery** ([docs](https://docs.meshery.io)) is a cloud native manager that enables the design and management of Kubernetes-based infrastructure and applications. It is an extensible developer platform that seamlessly integrates with all CNCF projects, and various monitoring, CI/CD, and security tools.

<p class="image-left" 
    style="display:inline; font-style:italic; padding: 1rem; width:auto;
            box-shadow: inset 0 -3em 3em #00b39f33,
                0 0 0 2px #00b39f33,
                0.3em 0.3em 1em #00b39f00;">You are here</p>

**MeshMap** ([docs](/meshmap)) provides a visual interface that allows users to create and edit Kubernetes manifests, charts and pipelines, as well as monitor the performance and health of their clusters. MeshMap aims to simplify the complexity of Kubernetes and make it accessible to more users, similar to how Figma democratized design tools for web and mobile applications.

{{% /pageinfo %}}

## What is MeshMap?

<div style="display:flex;justify-content:center;margin:1rem;">MeshMap is a web-based application that allows you to create and share diagrams of cloud native infrastructure for Kubernetes. You can draw shapes, lines, text, and icons to represent the components and relationships of your Kubernetes clusters. MeshMap supports freestyle design, meaning that you can customize the appearance and layout of your diagrams without any constraints. MeshMap also enables real-time collaboration, meaning that you can invite others to join your sessions and edit the diagrams together. MeshMap is a simple and intuitive tool for designing and communicating cloud native infrastructure for Kubernetes.</div>

## What is MeshMap Modes

Choose your mode of operation for MeshMap.

<div style="display:flex;justify-content:center;">
{{< cardpane >}}
    <a href="../designer/">
  {{< card header="Designer" >}}
    <a href="../designer/">Designer</a> mode is for those who want to create their own MeshMap, using the palette of components provided by Meshery.
    <p>Drag-and-drop your cloud native infrastructure using a pallete of thousands of versioned Kubernetes components.</p>
    <p>Use context-aware relationships configure your infrastructure intuitively.</p>
  {{< /card >}}
    </a>
  <a href="../visualizer/">
  {{< card header="Visualizer" >}}
    <a href="../visualizer/">Visualizer</a> mode is for operating your Kubernetes clusters and cloud native infrastructure.
    <p>Bring all your Kubernetes clusters under a common management. Deploy designs, apply patterns, manage and operate your deployments and services in real-time.</p>
    <p>Interactively connect to pods and containers to debug and troubleshoot.</p>
  {{< /card >}}
  </a>
{{< /cardpane >}}
</div>




<!-- ## What is MeshMap?

Introduce your project, including what it does or lets you do, why you would use it, and its primary goal (and how it achieves it). This should be similar to your README description, though you can go into a little more detail here if you want.

## Why do I want it?

Help your user know if your project will help them. Useful information can include:

* **What is it good for?**: What types of problems does your project solve? What are the benefits of using it?

* **What is it not good for?**: For example, point out situations that might intuitively seem suited for your project, but aren't for some reason. Also mention known limitations, scaling issues, or anything else that might let your users know if the project is not for them.

* **What is it *not yet* good for?**: Highlight any useful features that are coming soon.

## Where should I go next?

Give your users next steps from the Overview. For example:

* [Getting Started](/docs/getting-started/): Get started with $project
* [Examples](/docs/examples/): Check out some example code!
 -->
