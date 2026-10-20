---
title: Getting Started with Designs
description: Learn how to create, import, and share cloud native infrastructure designs in Kanvas — from your first design to deployable architecture.
weight: 2
categories: [designer]
tags: [designs]
aliases:
  - /meshmap/getting-started
  - /kanvas/getting-started/design-to-deployment/
---

{{< alert type="info" title="Follow Along with Jordan and Five" >}}
Throughout the Kanvas docs, you'll follow **Jordan Reyes** — a developer and designer at Orbital Labs — as she creates, shares, and iterates on infrastructure designs. **Five** reviews her work and occasionally discovers that a design works better in practice than it does in theory. Their starting point is the `microservices-baseline` design in the `orbital-dev` workspace. [Meet the full cast →]({{< ref "cloud/getting-started/meet-five/_index.md" >}})
{{< /alert >}}

## Sign in

Anonymous users can author designs and save them into a guest account. Sharing or publishing opens a sign-in prompt. On kanvas.new, Validate, Dry run, Deploy, Undeploy, connecting a cluster, and Operator mode open a prompt that directs you to the Meshery Playground or a self-hosted Meshery, including when you are signed in.

<figure>
  <img src="images/auth-login.png" alt="Layer5 Cloud login with GitHub, Google, and email options" />
  <figcaption>Sign-in page: continue with GitHub or Google, or log in with email.</figcaption>
</figure>

## Start here

1. [Starting from scratch]({{< ref "kanvas/getting-started/starting-scratch.md" >}}) — open Designer and create your first design.
2. [Importing a Design]({{< ref "kanvas/getting-started/import-designs/index.md" >}}) — bring in Kubernetes, Helm, Compose, or existing Meshery designs.
3. [Working with Components]({{< ref "kanvas/getting-started/working-with-components/index.md" >}}) — configure, copy, and arrange components on the canvas.
4. [Creating Relationships]({{< ref "kanvas/getting-started/creating-relationships/index.md" >}}) — connect components with context-aware edges.

Choose **Designer** when you are authoring infrastructure; switch to **Operator** when you are inspecting live clusters. See the [Kanvas overview]({{< ref "kanvas/_index.md" >}}) for the mode chooser.

## Use Kanvas for your diagrams

{{< cardpane >}}
{{% card header="Dev Env Documentation" %}}
The dev environment is an often overlooked but critical part of an organization's infrastructure. Knowing what clusters and services are used, how to run and test services locally, and how to troubleshoot are critical parts for getting a team up and running quickly. With Kanvas, you can easily embed designs into your How To and Getting Started guides, making it easy to create, maintain and update concise documentation.
{{% /card %}}
{{% card header="Migrations and Rollbacks" %}}
Migrations and rollbacks are some of the most important things to get right when they're needed. By making it easy to create, find, and reference these documents and diagrams, you can be confident that your processes will be understood and your knowledge up to date.
{{% /card %}}
{{% card header="Deployment Pipeline" %}}
Kanvas keyboard shortcuts and preset icons make it easy to create beautiful, informative designs that explain every aspect of your deploy, test, and monitor pipeline. Embed several designs in one document to cover all of your different services, vendors, and data stores.
{{% /card %}}
{{% /cardpane %}}

## From a saved design to a cluster

Validation checks every component against its schema and does not contact a cluster. A dry run sends the design to the target cluster without applying it. Deploy and undeploy apply to the Kubernetes contexts you select. If you select none, the action targets all connected clusters. Each resource Kanvas creates carries:

| Metadata | Key | Value |
| --- | --- | --- |
| Label | `design.meshery.io/id` | The design's ID |
| Annotation | `design.meshery.io/version` | The design version that was deployed |
| Annotation | `component.meshery.io/id` | The component the resource came from |

Validate Design permits both validation and dry runs. Deploy Design permits deploying. Undeploy Design permits undeploying. Those actions are disabled while the design is empty. Switching to Operator with unsaved changes asks "You have unsaved changes. Are you sure you want to leave?" A design's Operator view is named after the design, with `-View` appended, and filters on `design.meshery.io/id`.

The steps live on [Validating Designs]({{< ref "kanvas/tasks/designs/validating-designs/index.md" >}}), [Dry Running a Design]({{< ref "kanvas/tasks/designs/dry-running-a-design/index.md" >}}), [Deploying Designs]({{< ref "kanvas/tasks/designs/deploying-designs/index.md" >}}), and [Undeploying Designs]({{< ref "kanvas/tasks/designs/undeploying-designs/index.md" >}}).
