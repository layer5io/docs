# Kanvas Documentation

> Kanvas is a visual, collaborative tool for designing, validating, deploying, and operating Kubernetes and cloud infrastructure.


Kanvas lets you design Kubernetes and cloud infrastructure visually, validate and deploy that design to your clusters, and then operate what is running, all from one shared canvas. Teams work on the same design at the same time, so the diagram you discuss is the configuration you deploy.

## What is Kanvas?

Kanvas is a web application for creating and sharing orchestratable designs of cloud native infrastructure. A design is a declarative description of infrastructure: the components it contains, the relationships between them, their configuration, and any annotations you add to explain it. You build a design by placing components on a canvas, connecting them, and configuring each one. You can also draw shapes, lines, text, and icons to document your intent; Kanvas treats those as annotations and never deploys them.

A design does not stop at the diagram. Kanvas validates a design against the schema of every component in it, dry-runs it against your target clusters without applying anything, and deploys or undeploys it on the Kubernetes contexts you select. Every save creates a new version of the design, and multiple people can edit the same design together in real time.

This matters because one artifact carries your infrastructure from whiteboard to running cluster. Reviewers read the same design that operators deploy, and every resource Kanvas deploys carries the identity of the design that produced it, so you can trace running workloads back to their source.

## Two modes: Designer and Operator

Kanvas has two modes. You switch between them at any time; if the open design or resource has unsaved changes, Kanvas asks you to confirm before you leave.

- **[Designer](/pr-preview/pr-1320/kanvas/concepts/designer/)** is for authoring. You compose designs from versioned components, define relationships, configure each component, and annotate the result. Whiteboarding is a toolset inside Designer, not a separate mode. Validate, dry-run, deploy, and undeploy actions run from Designer.
- **[Operator](/pr-preview/pr-1320/kanvas/concepts/operator/)** is for running infrastructure. It shows the recorded state of your connected Kubernetes clusters, collected by MeshSync and served through Meshery. Operator can scope its view to the resources a single design deployed.

### Where each mode is available

Designer is available everywhere Kanvas runs, including the hosted Kanvas at [kanvas.new](https://kanvas.new). Operator mode, and every action that touches a cluster, needs a Meshery deployment that can reach your clusters.

| Capability | Hosted Kanvas (kanvas.new) | Meshery Playground or self-hosted Meshery |
|---|---|---|
| Designer: author and import designs | Available | Available |
| Share and publish designs | Requires sign-in | Requires sign-in |
| Validate, dry-run, deploy, and undeploy | Not available | Available |
| Connect clusters | Not available | Available |
| Operator mode | Not available | Available |

When you invoke a cluster-bound capability on kanvas.new, Kanvas explains that it is not available there and points you to the [Meshery Playground](https://playground.meshery.io) or a self-hosted Meshery deployment. Plan details live at [layer5.io/pricing](https://layer5.io/pricing).

### Choose your mode

<div style="display:flex;justify-content:center;">
<div class="td-card-group card-group p-0 mb-4">
  <div class="td-card card border me-4">
<div class="card-header">
      Designer
    </div>
<div class="card-body">
    <p class="card-text">
        
    <p><a href="/pr-preview/pr-1320/kanvas/concepts/designer/">Designer</a> mode is for creating and editing designs.</p>
    <p>Compose infrastructure from a palette of versioned components, connect components with relationships, and configure each one.</p>
    <p>Validate a design, dry-run it against your clusters, and deploy it.</p>
  </p>
      </div>
  </div>

  <div class="td-card card border me-4">
<div class="card-header">
      Operator
    </div>
<div class="card-body">
    <p class="card-text">
        
    <p><a href="/pr-preview/pr-1320/kanvas/concepts/operator/">Operator</a> mode is for operating your Kubernetes clusters and the infrastructure running on them.</p>
    <p>See the recorded state of the clusters you select.</p>
    <p>Filter the view to the resources that a specific design deployed.</p>
  </p>
      </div>
  </div>

</div>

</div>

## How Kanvas relates to Meshery and Layer5 Cloud

Kanvas is an extension of Meshery. Its interface loads into Meshery UI, and a companion plugin runs inside Meshery Server. Meshery Server is the component that talks to your clusters: it deploys and observes infrastructure on Kanvas's behalf. [Layer5 Cloud](/pr-preview/pr-1320/cloud/) is the remote provider behind Kanvas: it stores your designs and their versions and handles identity, sharing, the catalog, and events. [How Kanvas Works with Meshery and Layer5 Cloud](/pr-preview/pr-1320/kanvas/concepts/architecture/) explains how requests move between these parts.

## Where to go next

- **[Getting Started](/pr-preview/pr-1320/kanvas/getting-started/)** - create your first design and reach a working result fast.
- **[Tutorials](/pr-preview/pr-1320/kanvas/tutorials/)** - learn Kanvas by building realistic designs end to end.
- **[How-to Guides](/pr-preview/pr-1320/kanvas/guides/)** - accomplish a specific task, such as deploying or sharing a design.
- **[Concepts](/pr-preview/pr-1320/kanvas/concepts/)** - understand designs, components, relationships, and how Kanvas works.
- **[Reference](/pr-preview/pr-1320/kanvas/reference/)** - look up exact options, limits, permissions, and shortcuts.

