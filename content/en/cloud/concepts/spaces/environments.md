---
title: Environments
description: "Environments are how you organize your deployment targets (whether on-premises servers or cloud services) into resource groups."
categories: [Spaces]
aliases:
  - /cloud/spaces/environments/

---

Environments are how you organize your deployment targets (whether on-premises servers or cloud services) into groups that represent the different stages of your deployment pipeline, for instance, development, test, and production.
Environments allow you to logically group related [Connections](#connections) and their associated [Credentials](#credentials). Environments make it easier for you to manage, share, and work with a collection of resources as a group, instead of dealing with all your Connections and Credentials on an individual basis.

### Assigning Resources to Environments

Assign any number of Connections to an environment whether that Connection is managed or unmanaged (see [MeshSync](https://docs.meshery.io/concepts/architecture/meshsync) to learn more about managed and unmanaged Connections). In-turn, assign any number of Environments to one or more [Workspaces](../workspaces). Connections (and any associated Credentials) that are assigned to an Environment become immediately available for use in any associated Workspace.

### Sharing Resources between Environments

Environments can share resources. For example, you might create an environment named "production" and assign three connections: a GitHub connection, a Kubernetes connection, and a Prometheus connection. Subsequently, you also define a an environment named "dev/test "and assign three connections: a different Kubernetes connection, a different Prometheus connection, _and_ the same GitHub connection that is also assigned to the "production" environment.

### Deleting an Environment

Deleting an environment does not delete any resources (e.g. connections) currently contained with the environment. Resources that belong to others environments will continue to belong to those other environments. Learn more about the behavior of [lifecycle of connections](https://docs.meshery.io/concepts/logical/connections).

## Summary

Environments represent a collection of resources in the form of Connections - both of managed and unmanaged Connections. Environment resources are comprised of Connections (and implicitly any Credentials used by those assigned Connections). Create and use environments to organize your connections and credentials into groups, and then make these resources available to you and your teams by assigning environments to Workspaces.

## Key Features

- **Logical Grouping** Environments allow you to logically group related connections and their associated credentials. This makes it easier to manage, share, and work with a subset of resources instead of dealing with all your connections individually.

- **Resource Sharing** Environments can be seamlessly assigned to [Workspaces](../workspaces), another essential concept in Meshery. When you assign an Environment to a Workspace, you enable resource sharing among team members. This collaborative approach simplifies the sharing of connections and resources, making it easier to work together in cloud native environments.

## Key Components

### Connections

Connections are an integral part of Environment. These are cloud native resources that can be both managed and unmanaged, and they're registered by the Meshery Server. Examples of connections include Kubernetes clusters, Prometheus instances, Jaeger tracers, and Nginx web servers.

> See "[Connections](https://docs.meshery.io/concepts/logical/connections)" in Meshery Docs for more information.

### Credentials

Credentials in an Environment are the keys to securely authenticate and access managed connections. For example, valid Prometheus secrets or Kubernetes API tokens are essential credentials for securely interacting with these managed resources.

> See "[Credentials](https://docs.meshery.io/concepts/logical/credentials)" in Meshery Docs for more information.

## Example: Orbital Labs Environment Setup

The following illustrates how Five and Zara set up multi-cloud environments at Orbital Labs, spanning AWS, GCP, and Azure. See [Meet Five and the Cast](/cloud/getting-started/meet-five) for the full seed inventory.

### Environment Inventory

| Environment | Workspace | Cloud Provider | Connections |
|---|---|---|---|
| `prod-aws` | orbital-production | AWS | EKS cluster, RDS (PostgreSQL), S3, CloudFront, SQS |
| `prod-gcp` | orbital-production | GCP | GKE cluster, Cloud SQL, Cloud Storage, Pub/Sub |
| `staging-aws` | orbital-staging | AWS | EKS cluster, S3, ElastiCache |
| `staging-azure` | orbital-staging | Azure | AKS cluster, Azure Blob Storage, Azure Service Bus |
| `dev-local` | orbital-dev | Local | kind (local Kubernetes), LocalStack (AWS emulation) |
| `stellar-enterprise` | stellar-main | Azure | AKS, Azure SQL, Azure API Management, Azure AD |

### Connecting prod-aws

Five connects Orbital Labs' primary AWS production environment to Layer5 Cloud:

1. Navigate to **Environments** and click **Create Environment**
2. Name it `prod-aws` and save
3. Add connections one at a time — each connection is a discrete cloud resource:
   - **EKS cluster** — the compute layer for deployed workloads
   - **RDS (PostgreSQL)** — the managed database instance
   - **S3 bucket** — object storage for design artifacts and state
   - **CloudFront distribution** — CDN layer for the frontend
   - **SQS queue** — async messaging between services
4. Zara assigns `prod-aws` to the `orbital-production` workspace, making all five connections available to Infrastructure team members

### Adding prod-gcp for Multi-Cloud Coverage

Five repeats the process for GCP to give Orbital Labs multi-cloud flexibility:

1. Create environment `prod-gcp`
2. Add connections:
   - **GKE cluster** — Google Kubernetes Engine compute
   - **Cloud SQL** — managed relational database on GCP
   - **Cloud Storage bucket** — GCP object storage
   - **Pub/Sub topic** — async messaging on GCP
3. Zara assigns `prod-gcp` to `orbital-production` alongside `prod-aws`

Both environments are now available to any design deployed within the `orbital-production` workspace.

{{< alert type="info" title="dev-local for Getting Started" >}}
The `dev-local` environment uses a local Kubernetes cluster (kind) and LocalStack to emulate AWS services — no cloud credentials required. If you are following along with these docs for the first time, start with `dev-local` in the `orbital-dev` workspace.
{{< /alert >}}
