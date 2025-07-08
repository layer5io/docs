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

他想要的是一个**结构化、信息详尽且能解决实际问题的指南**。

我们来分解一下，并为你构建一个 Lee 想要的文档大纲。

**标题：在 Meshery 中导入设计 (Importing Designs in Meshery)**

**1. 简介 (Introduction)**
* 这部分是**通用内容**，不会重复。
* 简要说明什么是“导入设计”，以及为什么用户会需要这个功能（例如，复用现有配置、与团队共享等）。
* 概述支持的三种主要导入方式：
    * 通过文件上传 (File Upload)
        draw and drap
        model file
    * 通过 URL (Via URL)
        model url
    * 通过 GitHub (Via GitHub)
        没试过，试一下

**2. 导入方式详解 (Using a Tab-based Layout)**
* **标签页 (Tab Panes)** 的地方。每个标签对应一种导入方式。

    * **【标签页 1: 文件上传 (File Upload)】**
        * **操作步骤**: 简洁地描述如何通过拖拽或浏览文件来上传。*(这部分步骤可能很短，可以减少截图)*。
        * **支持的格式与具体要求 (Supported Formats & Requirements)**:
            * **Helm Chart**:
                * 必须是打包好的 `tar.gz` 压缩文件。
                * **错误示例**: 不能只上传单个 `chart.yaml` 或 `values.yaml` 文件。
            * **Kustomize**:
                * 必须是包含 `kustomization.yaml` 及其相关文件的**目录压缩包**。
                * **错误示例**: 不能只上传单个 `kustomization.yaml` 文件。
            * **Docker Compose**:
                * 必须是有效的 `docker-compose.yaml` 或 `docker-compose.yml` 文件。
            * **Kubernetes Manifests**:
                * 可以是单个 YAML 文件，也可以是包含多个 YAML 文件的目录压缩包。

    * **【标签页 2: 通过 URL 导入】**
        * **操作步骤**: 描述如何粘贴 URL 并点击导入。
        * **支持的格式与具体要求**:
            * 说明 URL 必须是指向**原始文件 (raw file)** 的直接链接。
            * 列出支持的格式（如指向单个 `yaml` 文件、`tar.gz` 包的 URL 等）以及对应的注意事项。

    * **【标签页 3: 通过 GitHub 导入】**
        * **操作步骤**: 描述如何使用 GitHub 向导，授权并选择仓库和文件。
        * **支持的格式与具体要求**:
            * 说明支持识别仓库中的哪种文件或目录结构（例如，它会自动寻找 Helm Chart 还是 Kustomize 目录？）。
            * 解释相关的权限要求。

**3. 高级主题与常见问题 (Advanced Topics & FAQ)**
* 这部分也是**通用内容**，用来解答 Lee 提出的那些更复杂的问题。
* **合并与覆盖设计 (Merging & Overwriting Designs)**:
    * 回答“在一个已导入的设计上再拖拽一个文件会发生什么？”
    * 解释合并逻辑，例如是覆盖还是增量添加。
* **支持的组合 (Supported Combinations)**:
    * 回答“能否将 Helm Chart 和 Kustomize 文件合并导入？”
* **文件大小与限制 (File Size & Limitations)**:
    * 回答“可以导入一个超大的 Kubernetes 文件吗？”

在import model页面一次性放入多个file会出现：
不会融合，只会取最后一个文件

在cloud端导入的时候
helm和oci的不行/ k8s和meshery的可以

在kanvas页面import的时候
可以选择融合或者import as new，h
helm/oci可以融合，可以作为新文件
k8s和meshery 也可以融合/作为新文件
在kanvas页面上的import是功能完全正确的

docker compose
https://github.com/docker/awesome-compose/tree/master/nginx-golang-postgres

kustomize example
https://github.com/kubernetes-sigs/kustomize/tree/master/examples/helloWorld

