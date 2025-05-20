---
title: Layer5 Helm Repository
description: Layer5 Helm Repository contains a collection of charts, including Layer5 Cloud, which can be deployed in any Kubernetes cluster on-premises or in Cloud using Helm.
linkTitle: Layer5 Helm Repository
type: docs
menu: {main: {weight: 3}}
weight: 1
cascade: 
    type: docs
---

{{< alert type="info" title="Repository Only">}}
This page only contains a brief synopsis of the Helm repository.

See the [Self-Hosted section](/cloud/self-hosted/) of the Layer5 Cloud documentation for deployment prerequisites, considerations, and instructions.
{{< /alert >}}

## Repository Contents

Contained in the Layer5 Helm repository is the [Meshery Remote Provider](https://docs.meshery.io/extensibility/providers) charts (and it's subcharts) for Layer5 Cloud. See the repository's <a href="/charts/index.yaml">full index</a> of Layer5 Helm charts</a>.

## Chart Source

<p>The source for this chart is located in the <code>layer5io/meshery-cloud</code> repository under <code>install/kubernetes/</code>.</p>

{{< alert type="info" title="Complete Deployment Instructions">}}
Layer5 Cloud's Helm chart supports a number of [configuration options]({{<ref "/cloud/self-hosted/deployment/helm-chart-values" >}})

See the [Self-Hosted section](/cloud/self-hosted/) of the Layer5 Cloud documentation for deployment prerequisites, considerations, and instructions.
{{< /alert >}}
