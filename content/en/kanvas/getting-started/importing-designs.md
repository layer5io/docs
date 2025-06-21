---
title: Importing a Design
description: >
  Create a Kanvas design by importing from Helm Charts, Kubernetes manifests, Docker Compose files, or Meshery Designs.
weight: 3
categories: [Designer]
tags: [designs]
aliases:
  - /meshmap/getting-started/starting-helm
  - /kanvas/getting-started/starting-helm
---

You can quickly begin designing your infrastrucutre in Kanvas by importing existing resources in one of the supported formats: **Helm Charts**, **Kubernetes manifests**, **Docker Compose files**, or **Meshery Designs**. This lets you collaboratively visualize and edit your application stack with ease—no need to start from scratch.

Below, we walk through an example using a Helm Chart, but the steps are similar for other supported formats.

Helm helps you manage Kubernetes applications. Helm Charts help you define, install, and upgrade even the most complex Kubernetes application.
Importing a Helm chart, or any supported file into Kanvas is a fast way to bring your existing architecture into the visual designer.

## Requirements

- Access Kanvas at https://kanvas.new or request access from within your Layer5 Cloud account.
- Access a Meshery Server. If you have not [deployed your own Meshery Server](https://docs.meshery.io/installation), you can use the _Meshery Playground_. If you don't have an account, sign up for free at [https://play.meshery.io](https://play.meshery.io).
- One or more Helm charts in `.tgz`, `.tar`, `.tar.gz`, or OCI format.

## Importing a Design

There are multiple ways to import an design into Kanvas.

Option 1. Drag and drop your file (e.g., Helm chart) onto Kanvas.
![Drag and drop a Design](/kanvas/getting-started/images/importing-designs/drag-and-drop-design-into-kanvas.png)

Option 2. Use the **Import Menu**  in Kanvas. Click the **hamburger menu** (☰) in the top-left corner, then select **Import** from the menu.
![Drag and drop a Design](/kanvas/getting-started/images/importing-designs/import-menu.png)

Option 3. Visit My Designs, and click the **Import Design** button in Cloud.
![Import a Design](/kanvas/getting-started/images/importing-designs/import-a-design-layer5-cloud.png)

Next

1. Provide a name under Design File Name

2. Choose Upload Method:

- File Upload: Select a file in one of the supported formats from your local system choose one of the supported form your local filesystem.
- URL Import: Paste a direct URL pointing to a single file in a supported format.

![Copy of a Design](/kanvas/getting-started/images/importing-designs/import-designs-modal.png)

This example uses the Meshery Server Helm chart at [https://meshery.github.io/meshery.io/charts/meshery-v0.8.56.tgz](https://meshery.github.io/meshery.io/charts/meshery-v0.8.56.tgz)


Once imported, the chart will appear as a Kanvas design:

![Copy of a Design](/kanvas/getting-started/images/2024-04-18_18-10.png)

You can now continue editing the design or deploy it directly from Kanvas.
