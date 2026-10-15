# How-to Guides

> Task guides for building, managing, validating, deploying, sharing, and operating Kanvas designs.


Each guide accomplishes one task for a reader who already knows the basics. If you are new to Kanvas, start with [Getting Started](/pr-preview/pr-1295/kanvas/getting-started/). If you want the reasoning behind a behavior, read [Concepts](/pr-preview/pr-1295/kanvas/concepts/). For exact options, limits, and shortcuts, use [Reference](/pr-preview/pr-1295/kanvas/reference/).

Every action in these guides runs under your permissions. Kanvas hides or disables an action your role does not allow. Validating, deploying, and undeploying a design also need a Meshery you run, because the hosted kanvas.new site does not run them. [How Kanvas Works with Meshery and Layer5 Cloud](/pr-preview/pr-1295/kanvas/concepts/architecture/) lists what each environment supports.

## Build designs

Tasks you perform on the canvas. See [Build Designs](/pr-preview/pr-1295/kanvas/guides/designing/) for the group.

| Goal | Guide |
|---|---|
| Add components, edit their configuration, lock, duplicate, copy, and paste them | [Add and Configure Components](/pr-preview/pr-1295/kanvas/guides/designing/configuring-components/) |
| Connect components and remove connections | [Create Relationships](/pr-preview/pr-1295/kanvas/guides/designing/creating-relationships/) |
| Draw, label, and annotate a design | [Whiteboard on the Canvas](/pr-preview/pr-1295/kanvas/guides/designing/whiteboarding/) |
| Keep frequently used models within reach | [Pin Models to the Dock](/pr-preview/pr-1295/kanvas/guides/designing/pin-model-to-dock/) |
| Group components by shared labels | [Work with Tags](/pr-preview/pr-1295/kanvas/guides/designing/tagsets/) |

## Manage designs

| Goal | Guide |
|---|---|
| Bring in a manifest, Helm chart, Compose file, or design | [Importing a Design](/pr-preview/pr-1295/kanvas/getting-started/import-designs/) |
| Combine two designs, or open one in place of the canvas | [Merging and Loading Designs](/pr-preview/pr-1295/kanvas/designer/merging-designs/) |
| Understand and control how work is saved | [Saving Designs](/pr-preview/pr-1295/kanvas/designer/saving-designs/) |
| Start from an existing design | [Cloning a Design](/pr-preview/pr-1295/kanvas/tasks/designs/cloning-a-design/) |
| Back up a design or use it offline | [Exporting Designs](/pr-preview/pr-1295/kanvas/designer/export-designs/) |
| Show a design on another site | [Embedding Designs](/pr-preview/pr-1295/kanvas/designer/embedding-designs/) |
| Make a design available in the catalog | [Publishing Designs](/pr-preview/pr-1295/kanvas/designer/publishing-designs/) |
| Remove a design permanently | [Deleting a Design](/pr-preview/pr-1295/kanvas/tasks/designs/deleting-a-design/) |

## Validate and deploy

Run the steps in this order. Validation catches configuration errors in the design, a dry run checks the design against the target clusters, and a deployment applies it.

| Goal | Guide |
|---|---|
| Check a design's configuration | [Validating Designs](/pr-preview/pr-1295/kanvas/tasks/designs/validating-designs/) |
| Simulate a deployment without changes | [Dry Running a Design](/pr-preview/pr-1295/kanvas/tasks/designs/dry-running-a-design/) |
| Apply a design to one or more clusters | [Deploying Designs](/pr-preview/pr-1295/kanvas/tasks/designs/deploying-designs/) |
| Roll a deployment back | [Undeploying Designs](/pr-preview/pr-1295/kanvas/tasks/designs/undeploying-designs/) |

## Collaborate and review

| Goal | Guide |
|---|---|
| Give other people access to a design | [Sharing Designs](/pr-preview/pr-1295/kanvas/designer/sharing/) |
| Discuss a design with comments | [Reviewing Designs](/pr-preview/pr-1295/kanvas/designer/comments/) |

## Visualize pull requests and charts

| Goal | Guide |
|---|---|
| Post an infrastructure snapshot on a GitHub pull request | [Kanvas GitHub Snapshot](/pr-preview/pr-1295/kanvas/concepts/kanvas-snapshot/) |
| Render a snapshot of a Helm chart | [Helm Kanvas Snapshot](/pr-preview/pr-1295/kanvas/concepts/helm-kanvas-snapshot/) |

## Operate infrastructure

| Goal | Guide |
|---|---|
| Open a shell in a running container | [Interactive Terminal](/pr-preview/pr-1295/kanvas/operator/interactive-terminal/) |
| Follow a container's logs | [Log Streaming](/pr-preview/pr-1295/kanvas/operator/log-streaming/) |
| Measure a running service | [Performance Testing in Operator](/pr-preview/pr-1295/kanvas/operator/performance-testing/) |

## Fix problems

| Goal | Guide |
|---|---|
| Diagnose and resolve a Kanvas problem | [Troubleshooting Kanvas](/pr-preview/pr-1295/kanvas/reference/troubleshooting/) |

