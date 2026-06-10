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

See the [Self-Hosted section]({{< ref "cloud/guides/self-hosted/_index.md" >}}) of the Layer5 Cloud documentation for deployment prerequisites, considerations, and instructions.
{{< /alert >}}

## Repository Contents

Contained in the Layer5 Helm repository is the [Meshery Remote Provider](https://docs.meshery.io/extensibility/providers) charts (and it's subcharts) for Layer5 Cloud. See the repository's [full index]({{< static "charts/index.yaml" >}}) of Layer5 Helm charts.

## Chart Source

<p>The source for this chart is located in the <code>layer5io/meshery-cloud</code> repository under <code>install/kubernetes/</code>.</p>

{{< alert type="info" title="Complete Deployment Instructions">}}
Layer5 Cloud's Helm chart supports a number of [configuration options]({{<ref "cloud/guides/self-hosted/deployment/helm-chart-values.md" >}})

See the [Self-Hosted section]({{< ref "cloud/guides/self-hosted/_index.md" >}}) of the Layer5 Cloud documentation for deployment prerequisites, considerations, and instructions.
{{< /alert >}}
