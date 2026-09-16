---
title: Tutorials
description: End-to-end Kanvas tutorials for Kubernetes, AWS, Azure, GCP, Artifact Hub, WordPress, and cross-org collaboration.
date: 2023-10-30
weight: 8
aliases:
  - /meshmap/tutorials
---

Kanvas tutorials walk through real-world design scenarios using two fictional organizations — Orbital Labs, a cloud-native startup on the Team plan, and Stellar Dynamics, their enterprise client on the Enterprise plan — both managed under the Constellation Cloud provider. Each tutorial follows a cast of named characters as they build, share, and collaborate on infrastructure designs, so you can see how Kanvas permissions, workspaces, environments, and cross-org access work together in practice.

{{< alert type="info" >}}
Meet Five, Maya, Zara, Marcus, Dr. Aiko, and the full cast at [Meet Five and the Cast]({{< ref "cloud/getting-started/meet-five/_index.md" >}}).
{{< /alert >}}

## Featured tutorials

{{< cardpane >}}
{{% card header="Kubernetes" %}}
Hands-on Playground tutorials for pods, deployments, services, and more — plus a [visual request-flow walkthrough]({{< ref "kanvas/tutorials/kubernetes-request-flow.md" >}}). Start at the [Kubernetes tutorials hub]({{< ref "kanvas/tutorials/kubernetes/_index.md" >}}).
{{% /card %}}
{{% card header="GCP Data Pipeline" %}}
[Building a GCP Data Pipeline Design]({{< ref "kanvas/tutorials/data-pipeline-gcp.md" >}}) — model Pub/Sub, Dataflow, BigQuery, and GKE in Designer.
{{% /card %}}
{{% card header="Cross-Org Access" %}}
[stellar-saas-platform]({{< ref "kanvas/tutorials/stellar-saas-platform.md" >}}) — share and review designs across organizations.
{{% /card %}}
{{% /cardpane %}}

{{< cardpane >}}
{{% card header="AWS" %}}
[Deploy AWS EC2 Instances with Meshery]({{< ref "kanvas/tutorials/aws/deploy-aws-ec2-instances-with-meshery/index.md" >}}) using AWS Controllers for Kubernetes (ACK). See also the [AWS tutorials hub]({{< ref "kanvas/tutorials/aws/_index.md" >}}).
{{% /card %}}
{{% card header="Azure" %}}
Deploy [Azure resources]({{< ref "kanvas/tutorials/azure/deploy-azure-resources-with-meshery/index.md" >}}) and an [Azure Storage Account]({{< ref "kanvas/tutorials/azure/deploy-azure-storage-account-with-meshery.md" >}}) with ASO. See the [Azure tutorials hub]({{< ref "kanvas/tutorials/azure/_index.md" >}}).
{{% /card %}}
{{% card header="Artifact Hub" %}}
[Publishing Meshery Designs to Artifact Hub]({{< ref "kanvas/tutorials/artifacthub/publish-to-artifacthub/index.md" >}}) — export and publish designs to a repository.
{{% /card %}}
{{% /cardpane %}}

{{< cardpane >}}
{{% card header="WordPress" %}}
[Embedding a Meshery Design in a WordPress Post]({{< ref "kanvas/tutorials/wordpress/embedding-meshery-design-in-wordpress/index.md" >}}) — publish interactive designs on your site.
{{% /card %}}
{{% /cardpane %}}
