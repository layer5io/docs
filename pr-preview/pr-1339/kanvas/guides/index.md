# How-to Guides

> Task guides for building, managing, validating, deploying, sharing, and operating Kanvas designs.


Each guide accomplishes one task for a reader who already knows the basics. If you are new to Kanvas, start with [Getting Started](/pr-preview/pr-1339/kanvas/getting-started/). If you want the reasoning behind a behavior, read [Concepts](/pr-preview/pr-1339/kanvas/concepts/). For exact options, limits, and shortcuts, use [Reference](/pr-preview/pr-1339/kanvas/reference/).

Every action in these guides runs under your permissions. Kanvas hides or disables an action your role does not allow. Validating, deploying, and undeploying a design also need a Meshery you run, because the hosted kanvas.new site does not run them. [How Kanvas Works with Meshery and Layer5 Cloud](/pr-preview/pr-1339/kanvas/concepts/architecture/) lists what each environment supports.

## Build designs

Tasks you perform on the canvas. See [Build Designs](/pr-preview/pr-1339/kanvas/guides/designing/) for the group.

| Goal | Guide |
|---|---|
| Add components, edit their configuration, lock, duplicate, copy, and paste them | [Add and Configure Components](/pr-preview/pr-1339/kanvas/guides/designing/configuring-components/) |
| Connect components and remove connections | [Create Relationships](/pr-preview/pr-1339/kanvas/guides/designing/creating-relationships/) |
| Draw, label, and annotate a design | [Whiteboard on the Canvas](/pr-preview/pr-1339/kanvas/guides/designing/whiteboarding/) |
| Keep frequently used models within reach | [Pin Models to the Dock](/pr-preview/pr-1339/kanvas/guides/designing/pin-model-to-dock/) |
| Group components by shared labels | [Work with Tags](/pr-preview/pr-1339/kanvas/guides/designing/tagsets/) |

## Manage designs

See [Manage Designs](/pr-preview/pr-1339/kanvas/guides/designs/) for the group.

| Goal | Guide |
|---|---|
| Bring in a manifest, Helm chart, Compose file, Kustomize project, or design, or merge one design into another | [Import and Merge Designs](/pr-preview/pr-1339/kanvas/guides/designs/import-designs/) |
| Understand and control how work is saved | [Save Designs](/pr-preview/pr-1339/kanvas/guides/designs/saving-designs/) |
| Start from a public or published design | [Clone a Design](/pr-preview/pr-1339/kanvas/guides/designs/cloning-a-design/) |
| Back up a design or use it offline | [Export Designs](/pr-preview/pr-1339/kanvas/guides/designs/export-designs/) |
| Show a design on another site | [Embed Designs](/pr-preview/pr-1339/kanvas/guides/designs/embedding-designs/) |
| Make a design available in the catalog | [Publish Designs](/pr-preview/pr-1339/kanvas/guides/designs/publishing-designs/) |
| Remove a design permanently | [Delete a Design](/pr-preview/pr-1339/kanvas/guides/designs/deleting-a-design/) |

## Validate and deploy

See [Validate and Deploy](/pr-preview/pr-1339/kanvas/guides/deploying/) for the group. Run the steps in this order. Validation catches configuration errors in the design, a dry run checks the design against the target clusters, and a deployment applies it.

| Goal | Guide |
|---|---|
| Check a design's configuration | [Validate a Design](/pr-preview/pr-1339/kanvas/guides/deploying/validating-designs/) |
| Simulate a deployment without changes | [Dry-run a Design](/pr-preview/pr-1339/kanvas/guides/deploying/dry-running-a-design/) |
| Apply a design to one or more clusters | [Deploy a Design](/pr-preview/pr-1339/kanvas/guides/deploying/deploying-designs/) |
| Roll a deployment back | [Undeploy a Design](/pr-preview/pr-1339/kanvas/guides/deploying/undeploying-designs/) |

## Collaborate and review

See [Collaborate and Review](/pr-preview/pr-1339/kanvas/guides/collaborating/) for the group.

| Goal | Guide |
|---|---|
| Give other people access to a design | [Share a Design](/pr-preview/pr-1339/kanvas/guides/collaborating/sharing-designs/) |
| Discuss a design with comments | [Review a Design with Comments](/pr-preview/pr-1339/kanvas/guides/collaborating/reviewing-designs/) |

## Visualize pull requests and charts

See [Kanvas Snapshot](/pr-preview/pr-1339/kanvas/guides/snapshots/) for the group, which lists supported inputs and platforms.

| Goal | Guide |
|---|---|
| Post an infrastructure snapshot on a GitHub pull request | [Visualize Pull Requests with Kanvas Snapshot](/pr-preview/pr-1339/kanvas/guides/snapshots/kanvas-snapshot/) |
| Render a snapshot of a Helm chart from a terminal | [Snapshot a Helm Chart](/pr-preview/pr-1339/kanvas/guides/snapshots/helm-kanvas-snapshot/) |

## Operate infrastructure

| Goal | Guide |
|---|---|
| Open a shell in a running container | [Interactive Terminal](/pr-preview/pr-1339/kanvas/guides/operating/interactive-terminal/) |
| Follow a container's logs | [Log Streaming](/pr-preview/pr-1339/kanvas/guides/operating/log-streaming/) |
| Measure a running service | [Performance Testing in Operator](/pr-preview/pr-1339/kanvas/guides/operating/performance-testing/) |

## Fix problems

| Goal | Guide |
|---|---|
| Diagnose and resolve a Kanvas problem | [Troubleshoot Kanvas](/pr-preview/pr-1339/kanvas/guides/troubleshooting/) |

