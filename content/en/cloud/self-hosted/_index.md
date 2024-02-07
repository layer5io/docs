---
title: Self-Hosted
weight: 10
description: >
  Keep your MeshMap designs internal to your workplace. Get remote support from Layer5 when you need it.
---

![self-hosted](images/self-hosted.svg "image-right-no-shadow")

## On-premises Deployment of Layer5 Cloud

Layer5 Cloud is a collection of services that can be deployed on-premises. The following diagram illustrates the architecture of Layer5 Cloud.

### Kuberentes-based Installation with Helm

Layer5 offers on-premises isntallation of its Meshery Remote Provider: Layer5 Cloud. See the [repository's full [index](https://docs.layer5.io/charts) of Layer5 Helm Charts. Contained in the Layer5 Helm repository is one chart with two subcharts:

#### Prerequisites

**1. Prepare a Persistent Volume**

A persistent volume to store the Postgres database is necessary to prepare prior to deployment. If your target cluster does not have a persistent volume readily available (or not configured for automatic PV provisioning and binding of PVCs to PV), we suggest to apply the following configuration to your cluster.

1. [Optional] Prepare a persistent volume.

```bash
kubectl apply -f install/persistent-volume.yaml
```

2. Prepare a dedicated namespace and add the chart repo to your helm configuration.

```bash
kubectl create ns <namespace>
helm repo add layer5 https://docs.layer5.io/charts
```

#### Installation

**1. Install Postgres database**

```bash
helm install -f ./install/postgresql/values.yaml postgres ./install/postgresql -n <namespace>
```

**2. Install Remote Provider Server and Identity Provider.**

```bash
## TBD: Delete local filesystem reference
# helm install -f ./install/kubernetes/values.yaml cloud ./install/kubernetes -n <namespace>`

helm install layer5-cloud layer5 -n layer5-cloud
```

#### Customizing Layer5 Cloud's installation with values.yaml

Layer5’s Helm charts support a number of configuration options. Please refer to following table of configuration options.

| | | |


## White-labeling

White-labeling is a feature that allows you to customize the appearance and branding of your engineering platform powered by Layer5 Cloud. With white-labeling, you can change the logo, color scheme, domain name, and other elements of the user interface to match your own identity and preferences. White-labeling enables you to offer a seamless and consistent experience to your customers, partners, or internal users who access your service mesh platform. White-labeling also helps you to differentiate your platform from other Layer5 Cloud users and competitors, and to enhance your brand recognition and loyalty.

## Considerations of Self-Hosted Deployments

![self-hosted-deployment](images/self-hosted-deployment.svg "image-center-no-shadow")

## Considerations of Peer-to-Peer Communication and Central Coordination


![meshmap-collaboration-networking](images/meshmap-collaboration-networking.svg "image-center-no-shadow")


## Consideration for Air-Gapped Deployments

Meshery acknowledges the importance of air-gapped deployments and ensures content support for such environments. Content registered should be available even in the absence of internet connectivity, thus aligning with Meshery's commitment to versatile deployment scenarios.

{{< alert title="As as Service" >}}Connect to Layer5 Cloud and have your MeshMap designs versioned and available for team sharing and real-time collaboration.{{< /alert >}}


