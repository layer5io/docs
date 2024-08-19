---
title: Starting from a Helm Chart
description: >
  Create a MeshMap design from a Helm Chart.
weight: 3
categories: [Designer]
tags: [designs]
---

{{< front-matter feature_name="Application Import" >}}

Helm helps you manage Kubernetes applications. Helm Charts help you define, install, and upgrade even the most complex Kubernetes application.
Starting a MeshMap design from a Helm chart is another way to get started with an entire application stack.

Jump start your MeshMap design by importing your existing Helm Charts.

## Requirements

- Access a Meshery Server. If you have not [deployed your own Meshery Server](https://docs.meshery.io/installation), you can use the _Meshery Playground_. If you don't have an account, sign up for free at [https://play.meshery.io](https://play.meshery.io).
- Access to _MeshMap_. You can sign up for the beta at [https://layer5.io/cloud-native-management/meshmap](https://layer5.io/cloud-native-management/meshmap) or request access from within your Layer5 Cloud account.
- One or more Helm chart packages in **.tgz** format.

## Importing a Design

Click the **Import Design** option under the _Designs_ tab in MeshMap.

![Copy of a Design](/meshmap/getting-started/images/2024-04-18_18-01.png)

Next, provide a name under Design File Name (1), set the _Design Type_ to Helm Chart and paste the URL (3) to the location of the Helm chart package in .tgz format.

This example uses the Meshery Server helm chart at [https://meshery.github.io/meshery.io/charts/meshery-v0.7.48.tgz](https://meshery.github.io/meshery.io/charts/meshery-v0.7.48.tgz)

![Copy of a Design](/meshmap/getting-started/images/2024-04-18_18-04.png)

You should now have MeshMap design of the chart.

![Copy of a Design](/meshmap/getting-started/images/2024-04-18_18-10.png)

Continue to make any changes if required or deploy it.
