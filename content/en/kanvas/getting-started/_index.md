---
title: Getting Started
description: Learn the Kanvas model of design, validate, deploy, and operate, choose where to run Kanvas, and build your first design.
weight: 10
diataxis: tutorial
categories: [designer]
tags: [designs]
aliases:
  - /meshmap/getting-started
---

Kanvas turns cloud native infrastructure into a design you can see, check, and deploy. This section takes you from an empty canvas to resources running in a Kubernetes cluster. Along the way you learn the four ideas that every other Kanvas page builds on, and which parts of Kanvas need a Meshery deployment of your own.

## What you will learn

- How a design is built from components, relationships, and configuration, and how Kanvas saves it.
- How Kanvas checks a design before it touches a cluster.
- How a design becomes running resources, and how Kanvas tracks them afterward.
- Which capabilities work on hosted Kanvas and which need a Meshery you run.

## The model in four steps

1. **Design.** In Designer mode you describe infrastructure as a design: components (such as a Kubernetes Deployment or Service), the relationships between them, and their configuration.
2. **Validate.** Kanvas checks the design against each component's schema and attaches every error to the component and field that caused it; a dry run then checks the design against a real cluster without changing it.
3. **Deploy.** Kanvas applies the design to the Kubernetes clusters you select and labels every resource it creates with the design's identity.
4. **Operate.** In Operator mode you see the live state of your clusters and can filter it to the resources that belong to one design.

## Where do you want to work?

Kanvas runs in two places. Both use the same Designer, but only a Meshery you run can reach your clusters.

| Capability | Hosted Kanvas at kanvas.new | Meshery you run (Playground or self-hosted) |
|---|---|---|
| Create and edit designs | Yes | Yes |
| Share and publish designs | Yes, after you sign in | Yes, after you sign in, when Meshery uses Layer5 Cloud as its provider |
| Validate a design | No | Yes |
| Dry-run, deploy, and undeploy a design | No | Yes |
| Connect and view Kubernetes clusters | No | Yes |
| Operator mode | No | Yes |

On kanvas.new, validating, deploying, undeploying, connecting clusters, and opening Operator mode open a prompt that points you to a Meshery you run instead of performing the action. You have two choices:

- **Meshery Playground** at [playground.meshery.io](https://playground.meshery.io) is a hosted Meshery you can use without installing anything.
- **Self-hosted Meshery** runs in your own environment and connects to your own clusters. See the [Meshery installation guide](https://docs.meshery.io/installation/).

A Meshery you run must use Layer5 Cloud as its remote provider for the features that live in Layer5 Cloud: sharing, the catalog, and Operator views. With the local provider, Meshery reports those features as not implemented.

Start on kanvas.new if you only want to design. Start on the Playground or your own Meshery if you plan to complete both tutorials below.

## Sign in

You can open Kanvas and start designing without an account. Sharing and publishing a design require sign-in: when you are anonymous, these actions show a "Sign in to" prompt with a single Sign in action. Signing in takes you to the Layer5 Cloud sign-in page and returns you to the page you were on.

If sign-in cannot start because the provider address is malformed, Kanvas shows the notification "Sign-in could not start" followed by the reason.

## Your first path

Complete these two tutorials in order. The second one starts from the design you save in the first.

1. [Create Your First Design]({{< ref "kanvas/getting-started/starting-scratch.md" >}}) - build a small web application design from an empty canvas, connect its components, and save it.
2. [Deploy and Observe Your First Design]({{< ref "kanvas/getting-started/design-to-deployment/index.md" >}}) - validate, dry-run, and deploy that design, then find its running resources in Operator mode and remove them.

## After the first design

- [Import designs]({{< ref "kanvas/getting-started/import-designs/index.md" >}}) from Kubernetes manifests, Helm charts, Docker Compose files, and existing Meshery designs.
- [Create relationships]({{< ref "kanvas/getting-started/creating-relationships/index.md" >}}) between components and learn how Kanvas interprets them.
- [Work with components]({{< ref "kanvas/getting-started/working-with-components/index.md" >}}) to configure, copy, and arrange them on the canvas.
- [Embed designs]({{< ref "kanvas/designer/embedding-designs/index.md" >}}) in your own documentation so diagrams stay in step with the design they describe.
- Browse the [Tutorials]({{< ref "kanvas/tutorials/_index.md" >}}) for longer, scenario-based walkthroughs.
- Read the [Concepts]({{< ref "kanvas/concepts/_index.md" >}}) to understand designs, relationships, and the Kanvas architecture in depth.
