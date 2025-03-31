---
title: Kanvas Documentation
description: Kanvas delivers a collaborative experience for engineers similar to how Google Workplace transforms the digital work environment and how Figma democratizes UX design tooling. 
linkTitle: Kanvas
type: docs
menu: {main: {weight: 3}}
weight: 1
cascade: 
    type: docs
aliases:
    - /meshmap/
---

<!-- {{% pageinfo %}}

**Meshery** is a cloud native manager that enables the design and management of Kubernetes-based infrastructure and applications. It is an extensible developer platform that seamlessly integrates with various CNCF projects, monitoring, CI/CD, and security tools.

{{% /pageinfo %}} -->
<!-- {{< figure src="layer5-cloud-provider.svg"  class="image-center-shadow" >}} -->

{{% pageinfo %}}

## Understanding the Meshery Ecosystem

<div style="display: flex; align-items: flex-start; margin-top:15px;"><div class="logo-container">{{< svg name="cloud" >}}</div>

<div style="flex: 1;">

**Layer5 Cloud** ([docs](/cloud)) is an identity provider and global console for Meshery deployments with an extensible and highly flexible authorization framework, tenant entitlement services, service provider-grade organizational hierarchy, team workspace management and a content catalog for public and private hosting of cloud native architectures. Layer5 Cloud is available as a service or self-hosted.
</div></div>

<div style="display: flex; align-items: flex-start; margin-top:15px;"><div class="logo-container">{{< svg name="meshery" >}}</div>

<div style="flex: 1;">

**Meshery** ([docs](https://docs.meshery.io)) is a cloud native manager that enables the design and management of Kubernetes-based infrastructure and applications. It is an extensible developer platform that seamlessly integrates with all CNCF projects, and various monitoring, CI/CD, and security tools.
</div></div>

<div style="display:flex;flex-direction:column;margin-bottom:2rem;margin-top:1rem;padding:1rem;box-shadow:inset 0 0 4em #ebc01766,0 0 0 2px #ebc01766,.3em .3em 1em #ebc01733;position:relative;background-color:#1a1a1a;border:1px solid #ebc017;">
  <!-- "You are here" indicator -->
  <div style="position:absolute;top:-10px;left:10px;background:#ebc017;color:#333;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:bold;">
    YOU ARE HERE
  </div>
  
  <div style="display:flex;align-items:flex-start;gap:1rem;width:100%;">
    <div style="min-width:50px;flex-shrink:0;"><img src="/images/logos/kanvas-alt.svg" alt="kanvas logo" data-modal="false" style="border:none;"/></div>
    <div style="flex:1;word-wrap:break-word;">
      <strong>Kanvas</strong> (<a href="/kanvas">docs</a>) Kanvas delivers a collaborative experience similar to how Google Workplace transforms the digital work environment and how Figma democratizes UX design tooling. Kanvas simplifies the complexity of Kubernetes and multi-cloud infrastructure management accessible to all. Kanvas provides a visual, multi-player experience that allows you to create, configure, deploy, and manage modern infrastructure with confidence.
    </div>
  </div>
</div>
{{% /pageinfo %}}

## What is Kanvas?

<p style="display:flex;text-align:center;margin:1rem auto;color:white;"><i>Kanvas is like Google Docs for DevOps, as it allows you to create, test, and deploy cloud native architectures collaboratively and easily.</i></p>

Kanvas is a web-based application that allows you to create and share diagrams of cloud native infrastructure for Kubernetes. You can draw shapes, lines, text, and icons to represent the components and relationships of your Kubernetes clusters. Kanvas supports freestyle design, meaning that you can customize the appearance and layout of your diagrams without any constraints. Kanvas also enables real-time collaboration, meaning that you can invite others to join your sessions and edit the diagrams together. Kanvas is a simple and intuitive tool for designing and communicating cloud native infrastructure for Kubernetes and multi-cloud services.

### Choose your mode

Choose your mode of operation for Kanvas.

<div style="display:flex;justify-content:center;">
{{< cardpane >}}
    <a href="../kanvas/designer/">
  {{< card header="Designer" >}}
    <a href="../kanvas/designer/">Designer</a> mode is for those who want to create their own Kanvas, using the palette of components provided by Meshery.
    <p>Drag-and-drop your cloud native infrastructure using a palette of thousands of versioned Kubernetes components.</p>
    <p>Use context-aware relationships configure your infrastructure intuitively.</p>
  {{< /card >}}
    </a>
  <a href="../kanvas/operator/">
  {{< card header="Operator" >}}
    <a href="../kanvas/operator/">Operator</a> mode is for operating your Kubernetes clusters and cloud native infrastructure.
    <p>Bring all your Kubernetes clusters under a common management. Deploy designs, apply patterns, manage and operate your deployments and services in real-time.</p>
    <p>Interactively connect to pods and containers to debug and troubleshoot.</p>
  {{< /card >}}
  </a>
{{< /cardpane >}}
</div>


<!-- ## What is Kanvas?

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
