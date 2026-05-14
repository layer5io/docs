---
title: Publishing Meshery Designs to Artifact Hub
model: Artifact Hub
params:
    kind: design
categories: [tutorials]
description: Step by step example for how to export Meshery Designs and publish them to an Artifact Hub repository.
aliases:
- /kanvas/tutorials/publish-to-Artifact Hub
---

## Introduction

In this tutorial, we'll see how to export a Design from Meshery which we will use to populate an Artifact Hub repository.

## Prerequisites

- Access to the _Meshery Playground_. If you don't have an account, sign up at [Meshery Playground](https://playground.meshery.io/).

## Steps

### 1. Click on MeshMap
![](/kanvas/tutorials/images/publish-to-Artifact Hub/2024-07-30_1.png)


### 2. Find the Design in the Side Panel
![](/kanvas/tutorials/images/publish-to-Artifact Hub/2024-07-30_2.png)


### 3. Click on Export Design
![](/kanvas/tutorials/images/publish-to-Artifact Hub/2024-07-30_3.png)


### 4. Click on EXPORT under OCI
![](/kanvas/tutorials/images/publish-to-Artifact Hub/2024-07-30_4.png)

### Prepare your Artifact Hub repo
You will need to have an Artifact Hub repository already created with `Kind` as `Meshery Designs`. See [Artifact Hub documentation](https://Artifact Hub.io/docs/topics/repositories/meshery-designs/) for more information on managing repositories.

### Push Design to Artifact Hub repository
At this point you should have downloaded your design as a `tar` archive. This archive contains a second archive which holds the metadata files to publish to your Artifact Hub repository. Expand the first `tar` archive and locate the resulting files. Expand the second archive you find there and you will have a folder containing two files: `Artifact Hub-pkg.yml` and `design.yml`. Move these files to your prepared Artifact Hub repository and push it upstream.

### Verify Repository in Artifact Hub
Once the files are pushed to the Artifact Hub repo you will need to wait until Artifact Hub indexes it. You can verify the status of the repository in the Artifact Hub control panel.