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

See [Manage Designs](/kanvas/guides/designs/) for the group.

| Goal | Guide |
|---|---|
| Bring in a manifest, Helm chart, Compose file, Kustomize project, or design, or merge one design into another | [Import and Merge Designs](/kanvas/guides/designs/import-designs/) |
| Understand and control how work is saved | [Save Designs](/kanvas/guides/designs/saving-designs/) |
| Start from a public or published design | [Clone a Design](/kanvas/guides/designs/cloning-a-design/) |
| Back up a design or use it offline | [Export Designs](/kanvas/guides/designs/export-designs/) |
| Show a design on another site | [Embed Designs](/kanvas/guides/designs/embedding-designs/) |
| Make a design available in the catalog | [Publish Designs](/kanvas/guides/designs/publishing-designs/) |
| Remove a design permanently | [Delete a Design](/kanvas/guides/designs/deleting-a-design/) |

## Validate and deploy

See [Validate and Deploy](/kanvas/guides/deploying/) for the group. Run the steps in this order. Validation catches configuration errors in the design, a dry run checks the design against the target clusters, and a deployment applies it.

| Goal | Guide |
|---|---|
| Check a design's configuration | [Validate a Design](/kanvas/guides/deploying/validating-designs/) |
| Simulate a deployment without changes | [Dry-run a Design](/kanvas/guides/deploying/dry-running-a-design/) |
| Apply a design to one or more clusters | [Deploy a Design](/kanvas/guides/deploying/deploying-designs/) |
| Roll a deployment back | [Undeploy a Design](/kanvas/guides/deploying/undeploying-designs/) |

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
| Diagnose and resolve a Kanvas problem | [Troubleshoot Kanvas](/kanvas/guides/troubleshooting/) |

