---
title: Kanvas Documentation
description: Kanvas delivers a collaborative experience for engineers similar to how Google Workspace transforms the digital work environment and how Figma democratizes UX design tooling.
linkTitle: Kanvas
type: docs
menu: {main: {weight: 3}}
weight: 1
cascade:
    type: docs
aliases:
    - /meshmap/
---

{{% pageinfo %}}

## Understanding the Layer5 Ecosystem

{{< ecosystem-box link="cloud/_index.md" icon="cloud" class="hidden-highlight-box" title="Layer5 Cloud" >}}
is an identity provider and global console for deployments with an extensible and highly flexible authorization framework, tenant entitlement services, service provider-grade organizational hierarchy, team workspace management and a content catalog for public and private hosting of cloud native architectures. Layer5 Cloud is available as a service or self-hosted.
{{< /ecosystem-box >}}

{{< ecosystem-box icon="images/logos/kanvas-icon-color.svg" image="true" title="Kanvas" >}}
delivers a collaborative experience similar to how Google Workspace transforms the digital work environment and how Figma democratizes UX design tooling. Kanvas simplifies the complexity of Kubernetes and multi-cloud infrastructure management accessible to all. Kanvas provides a visual, multi-player experience that allows you to create, configure, deploy, and manage modern infrastructure with confidence.
{{< /ecosystem-box >}}

{{% /pageinfo %}}

## What is Kanvas?

<p style="display:flex;text-align:center;margin:1rem auto;color:white;"><i>Kanvas is like Google Workspace for DevOps, as it allows you to create, test, and deploy cloud native architectures collaboratively and easily.</i></p>

Kanvas is a web-based application that allows you to create and share orchestratable diagrams of cloud native infrastructure for Kubernetes and public cloud services. You can draw shapes, lines, text, and icons to represent your infrastructure components and their relationships. Kanvas also supports freestyle design, meaning that you can customize the appearance and layout of your diagrams without any constraints. Kanvas enables real-time collaboration, meaning that you can invite others to join your sessions and edit the diagrams together. Kanvas is a simple and intuitive tool for designing and communicating cloud native infrastructure for Kubernetes and multi-cloud services.

### Choose your mode

Choose your mode of operation for Kanvas.

<div style="display:flex;justify-content:center;">
{{< cardpane >}}
    <a href="{{< ref "kanvas/designer/_index.md" >}}">
  {{< card header="Designer" >}}
    <a href="{{< ref "kanvas/designer/_index.md" >}}">Designer</a> mode is for those who want to create their own Kanvas, using the palette of components.
    <p>Drag-and-drop your cloud native infrastructure using a palette of thousands of versioned Kubernetes components.</p>
    <p>Use context-aware relationships configure your infrastructure intuitively.</p>
  {{< /card >}}
    </a>
  <a href="{{< ref "kanvas/operator/_index.md" >}}">
  {{< card header="Operator" >}}
    <a href="{{< ref "kanvas/operator/_index.md" >}}">Operator</a> mode is for operating your Kubernetes clusters and cloud native infrastructure.
    <p>Bring all your Kubernetes clusters under a common management. Deploy designs, apply patterns, manage and operate your deployments and services in real-time.</p>
    <p>Interactively connect to pods and containers to debug and troubleshoot.</p>
  {{< /card >}}
  </a>
{{< /cardpane >}}
</div>
