---
title: Starting from a Helm Chart
description: >
  Create a Kanvas design from a Helm Chart.
weight: 3
categories: [Designer]
tags: [designs]
aliases:
  - /meshmap/getting-started/starting-helm
---

Helm helps you manage Kubernetes applications. Helm Charts help you define, install, and upgrade even the most complex Kubernetes application.
Starting a Kanvas design from a Helm chart is another way to get started with an entire application stack.

Jump start your Kanvas design by importing your existing Helm Charts.

## Requirements

- Access Kanvas at https://kanvas.new or request access from within your Layer5 Cloud account.
- Access a Meshery Server. If you have not [deployed your own Meshery Server](https://docs.meshery.io/installation), you can use the _Meshery Playground_. If you don't have an account, sign up for free at [https://play.meshery.io](https://play.meshery.io).
- One or more Helm charts in `.tgz`, `.tar`, `.tar.gz`, or OCI format.

## Importing a Design

There are a few different ways to import a Helm chart into Kanvas.

Option 1. Drag and drop your Helm chart onto Kanvas.
![Drag and drop a Design](/kanvas/getting-started/images/importing-designs/drag-and-drop-design-into-kanvas.png)

Option 2. Click the **Import Design** option under the _Designs_ tab in Kanvas.

Option 3. Visit My Designs, and click the **Import Design** button in Cloud.
![Import a Design](/kanvas/getting-started/images/importing-designs/import-a-design-layer5-cloud.png)

Next, provide a name under Design File Name (1), set the _Design Type_ to Helm Chart and paste the URL (3) to the location of the Helm chart package in .tgz format.

This example uses the Meshery Server Helm chart at [https://meshery.github.io/meshery.io/charts/meshery-v0.8.56.tgz](https://meshery.github.io/meshery.io/charts/meshery-v0.8.56.tgz)

![Copy of a Design](/kanvas/getting-started/images/2024-04-18_18-04.png)

You should now have Kanvas design of the chart.

![Copy of a Design](/kanvas/getting-started/images/2024-04-18_18-10.png)

Continue to make any changes if required or deploy it.
