# How-to Guides

> Task guides for building, managing, validating, deploying, sharing, and operating Kanvas designs.


Each guide accomplishes one task for a reader who already knows the basics. If you are new to Kanvas, start with [Getting Started](/kanvas/getting-started/). If you want the reasoning behind a behavior, read [Concepts](/kanvas/concepts/). For exact options, limits, and shortcuts, use [Reference](/kanvas/reference/).

Every action in these guides runs under your permissions. Kanvas hides or disables an action your role does not allow. Validating, deploying, and undeploying a design also need a Meshery you run, because the hosted kanvas.new site does not run them. [How Kanvas Works with Meshery and Layer5 Cloud](/kanvas/concepts/architecture/) lists what each environment supports.

## Build designs

Tasks you perform on the canvas. See [Build Designs](/kanvas/guides/designing/) for the group.

| Goal | Guide |
|---|---|
| Add components, edit their configuration, lock, duplicate, copy, and paste them | [Add and Configure Components](/kanvas/guides/designing/configuring-components/) |
| Connect components and remove connections | [Create Relationships](/kanvas/guides/designing/creating-relationships/) |
| Draw, label, and annotate a design | [Whiteboard on the Canvas](/kanvas/guides/designing/whiteboarding/) |
| Keep frequently used models within reach | [Pin Models to the Dock](/kanvas/guides/designing/pin-model-to-dock/) |
| Group components by shared labels | [Work with Tags](/kanvas/guides/designing/tagsets/) |

## Manage designs

| Goal | Guide |
|---|---|
| Bring in a manifest, Helm chart, Compose file, or design | [Importing a Design](/kanvas/getting-started/import-designs/) |
| Combine two designs, or open one in place of the canvas | [Merging and Loading Designs](/kanvas/designer/merging-designs/) |
| Understand and control how work is saved | [Saving Designs](/kanvas/designer/saving-designs/) |
| Start from an existing design | [Cloning a Design](/kanvas/tasks/designs/cloning-a-design/) |
| Back up a design or use it offline | [Exporting Designs](/kanvas/designer/export-designs/) |
| Show a design on another site | [Embedding Designs](/kanvas/designer/embedding-designs/) |
| Make a design available in the catalog | [Publishing Designs](/kanvas/designer/publishing-designs/) |
| Remove a design permanently | [Deleting a Design](/kanvas/tasks/designs/deleting-a-design/) |

## Validate and deploy

Run the steps in this order. Validation catches configuration errors in the design, a dry run checks the design against the target clusters, and a deployment applies it.

| Goal | Guide |
|---|---|
| Check a design's configuration | [Validating Designs](/kanvas/tasks/designs/validating-designs/) |
| Simulate a deployment without changes | [Dry Running a Design](/kanvas/tasks/designs/dry-running-a-design/) |
| Apply a design to one or more clusters | [Deploying Designs](/kanvas/tasks/designs/deploying-designs/) |
| Roll a deployment back | [Undeploying Designs](/kanvas/tasks/designs/undeploying-designs/) |

## Collaborate and review

| Goal | Guide |
|---|---|
| Give other people access to a design | [Sharing Designs](/kanvas/designer/sharing/) |
| Discuss a design with comments | [Reviewing Designs](/kanvas/designer/comments/) |

## Visualize pull requests and charts

| Goal | Guide |
|---|---|
| Post an infrastructure snapshot on a GitHub pull request | [Kanvas GitHub Snapshot](/kanvas/concepts/kanvas-snapshot/) |
| Render a snapshot of a Helm chart | [Helm Kanvas Snapshot](/kanvas/concepts/helm-kanvas-snapshot/) |

## Operate infrastructure

| Goal | Guide |
|---|---|
| Open a shell in a running container | [Interactive Terminal](/kanvas/operator/interactive-terminal/) |
| Follow a container's logs | [Log Streaming](/kanvas/operator/log-streaming/) |
| Measure a running service | [Performance Testing in Operator](/kanvas/operator/performance-testing/) |

## Fix problems

| Goal | Guide |
|---|---|
| Diagnose and resolve a Kanvas problem | [Troubleshooting Kanvas](/kanvas/reference/troubleshooting/) |

