---
title: Getting Started with Designs
description: Learn how to create, import, and share cloud native infrastructure designs in Kanvas — from your first design to deployable architecture.
weight: 2
categories: [Designer]
tags: [designs]
aliases:
  - /meshmap/getting-started
---

{{< alert type="info" title="Follow Along with Jordan and Five" >}}
Throughout the Kanvas docs, you'll follow **Jordan Reyes** — a developer and designer at Orbital Labs — as she creates, shares, and iterates on infrastructure designs. **Five** reviews her work and occasionally discovers that a design works better in practice than it does in theory. Their starting point is the `microservices-baseline` design in the `orbital-dev` workspace. [Meet the full cast →]({{< ref "cloud/getting-started/meet-five/_index.md" >}})
{{< /alert >}}

## Sign in

Kanvas can be explored anonymously, but saving to your account, sharing with teammates, and deploying require sign-in.

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
