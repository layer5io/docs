---
title: How-to Guides
linkTitle: How-to Guides
description: Task guides for building, managing, validating, deploying, sharing, and operating Kanvas designs.
weight: 30
diataxis: how-to
---

Each guide accomplishes one task for a reader who already knows the basics. If you are new to Kanvas, start with [Getting Started]({{< ref "kanvas/getting-started/_index.md" >}}). If you want the reasoning behind a behavior, read [Concepts]({{< ref "kanvas/concepts/_index.md" >}}). For exact options, limits, and shortcuts, use [Reference]({{< ref "kanvas/reference/_index.md" >}}).

Every action in these guides runs under your permissions. Kanvas hides or disables an action your role does not allow. Validating, deploying, and undeploying a design also need a Meshery you run, because the hosted kanvas.new site does not run them. [How Kanvas Works with Meshery and Layer5 Cloud]({{< ref "kanvas/concepts/architecture/index.md" >}}) lists what each environment supports.

## Build designs

| Goal | Guide |
|---|---|
| Edit a component's configuration | [Configuring Components]({{< ref "kanvas/designer/configuring-components/index.md" >}}) |
| Add and arrange components on the canvas | [Working with Components]({{< ref "kanvas/getting-started/working-with-components/index.md" >}}) |
| Connect components | [Creating Relationships]({{< ref "kanvas/getting-started/creating-relationships/index.md" >}}) |
| Draw shapes, text, and annotations | [Whiteboarding]({{< ref "kanvas/designer/whiteboarding/index.md" >}}) |
| Keep frequently used models within reach | [Pinning Models to the Dock]({{< ref "kanvas/designer/pin-model-to-dock/index.md" >}}) |
| Use tags on designs | [Working with Tags]({{< ref "kanvas/designer/tagsets/index.md" >}}) |

## Manage designs

| Goal | Guide |
|---|---|
| Bring in a manifest, Helm chart, Compose file, or design | [Importing a Design]({{< ref "kanvas/getting-started/import-designs/index.md" >}}) |
| Combine two designs, or open one in place of the canvas | [Merging and Loading Designs]({{< ref "kanvas/designer/merging-designs/index.md" >}}) |
| Understand and control how work is saved | [Saving Designs]({{< ref "kanvas/designer/saving-designs/index.md" >}}) |
| Start from an existing design | [Cloning a Design]({{< ref "kanvas/tasks/designs/cloning-a-design/index.md" >}}) |
| Back up a design or use it offline | [Exporting Designs]({{< ref "kanvas/designer/export-designs/index.md" >}}) |
| Show a design on another site | [Embedding Designs]({{< ref "kanvas/designer/embedding-designs/index.md" >}}) |
| Make a design available in the catalog | [Publishing Designs]({{< ref "kanvas/designer/publishing-designs/index.md" >}}) |
| Remove a design permanently | [Deleting a Design]({{< ref "kanvas/tasks/designs/deleting-a-design/index.md" >}}) |

## Validate and deploy

Run the steps in this order. Validation catches configuration errors in the design, a dry run checks the design against the target clusters, and a deployment applies it.

| Goal | Guide |
|---|---|
| Check a design's configuration | [Validating Designs]({{< ref "kanvas/tasks/designs/validating-designs/index.md" >}}) |
| Simulate a deployment without changes | [Dry Running a Design]({{< ref "kanvas/tasks/designs/dry-running-a-design/index.md" >}}) |
| Apply a design to one or more clusters | [Deploying Designs]({{< ref "kanvas/tasks/designs/deploying-designs/index.md" >}}) |
| Roll a deployment back | [Undeploying Designs]({{< ref "kanvas/tasks/designs/undeploying-designs/index.md" >}}) |

## Collaborate and review

| Goal | Guide |
|---|---|
| Give other people access to a design | [Sharing Designs]({{< ref "kanvas/designer/sharing/index.md" >}}) |
| Discuss a design with comments | [Reviewing Designs]({{< ref "kanvas/designer/comments/index.md" >}}) |

## Visualize pull requests and charts

| Goal | Guide |
|---|---|
| Post an infrastructure snapshot on a GitHub pull request | [Kanvas GitHub Snapshot]({{< ref "kanvas/concepts/kanvas-snapshot/index.md" >}}) |
| Render a snapshot of a Helm chart | [Helm Kanvas Snapshot]({{< ref "kanvas/concepts/helm-kanvas-snapshot/index.md" >}}) |

## Operate infrastructure

| Goal | Guide |
|---|---|
| Open a shell in a running container | [Interactive Terminal]({{< ref "kanvas/operator/interactive-terminal/index.md" >}}) |
| Follow a container's logs | [Log Streaming]({{< ref "kanvas/operator/log-streaming/index.md" >}}) |
| Measure a running service | [Performance Testing in Operator]({{< ref "kanvas/operator/performance-testing/index.md" >}}) |

## Fix problems

| Goal | Guide |
|---|---|
| Diagnose and resolve a Kanvas problem | [Troubleshooting Kanvas]({{< ref "kanvas/reference/troubleshooting.md" >}}) |
