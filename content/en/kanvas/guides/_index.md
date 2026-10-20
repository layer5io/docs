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

Tasks you perform on the canvas. See [Build Designs]({{< ref "kanvas/guides/designing/_index.md" >}}) for the group.

| Goal | Guide |
|---|---|
| Add components, edit their configuration, lock, duplicate, copy, and paste them | [Add and Configure Components]({{< ref "kanvas/guides/designing/configuring-components/index.md" >}}) |
| Connect components and remove connections | [Create Relationships]({{< ref "kanvas/guides/designing/creating-relationships/index.md" >}}) |
| Draw, label, and annotate a design | [Whiteboard on the Canvas]({{< ref "kanvas/guides/designing/whiteboarding/index.md" >}}) |
| Keep frequently used models within reach | [Pin Models to the Dock]({{< ref "kanvas/guides/designing/pin-model-to-dock/index.md" >}}) |
| Group components by shared labels | [Work with Tags]({{< ref "kanvas/guides/designing/tagsets/index.md" >}}) |

## Manage designs

See [Manage Designs]({{< ref "kanvas/guides/designs/_index.md" >}}) for the group.

| Goal | Guide |
|---|---|
| Bring in a manifest, Helm chart, Compose file, Kustomize project, or design, or merge one design into another | [Import and Merge Designs]({{< ref "kanvas/guides/designs/import-designs/index.md" >}}) |
| Understand and control how work is saved | [Save Designs]({{< ref "kanvas/guides/designs/saving-designs/index.md" >}}) |
| Start from a public or published design | [Clone a Design]({{< ref "kanvas/guides/designs/cloning-a-design/index.md" >}}) |
| Back up a design or use it offline | [Export Designs]({{< ref "kanvas/guides/designs/export-designs/index.md" >}}) |
| Show a design on another site | [Embed Designs]({{< ref "kanvas/guides/designs/embedding-designs/index.md" >}}) |
| Make a design available in the catalog | [Publish Designs]({{< ref "kanvas/guides/designs/publishing-designs/index.md" >}}) |
| Remove a design permanently | [Delete a Design]({{< ref "kanvas/guides/designs/deleting-a-design/index.md" >}}) |

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
