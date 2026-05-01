---
title: Workspaces
description: >
  Understand the core concepts of Workspaces.
weight: 6
categories: [Spaces]
---

Workspaces provide a virtual space for you and your teams to collaborate, organize project-based work, manage access to environments and resources, and track team activities.

You can create Workspaces to group related Designs and Environments, define domains of responsibility for your teams, and streamline resource management.

## Key Features

- **Resource Sharing:** Workspaces allow for seamless resource sharing among team members, fostering collaboration.
- **Logical Grouping:** Within Workspaces, you can group related components such as environments and infrastructure designs.
- **Flexibility:** Workspaces support various resources like Kubernetes, Prometheus, Jaeger, Nginx, and more.
- **Simplified Management:** Managing and deploying resources is made easy within Workspaces.
- **Access Control:** Workspaces allow you to control access to resources by granting permissions to users and teams.

### Workspace Relationships and Restrictions

- Access to Workspaces may be granted to one or more teams.
- As a point of collaboration to facilitate work, Workspaces may have zero or more Environments associated.
- A Workspace is closely associated with Teams. Teams are groups of users with varying permissions, and they are at the center of resource access and management within a Workspace.
- One or more teams can be assigned access to a workspace.

After creating a Workspace, one of your next steps is to assign team access, create or transfer designs into the Workspace, and allocate resources that to Workspace by associating it with one or more Environments, therein making the Environment's connections available to users of the Workspace.

Like a shared drive (or shared collection of files), Workspaces are your Google Drive, while Designs are your Google Docs.

## Key Workspace Components

### Environments

- Environments are a central part of a workspace. They serve as a logical grouping for managing connections. A connection, in this context, can be either managed or discovered. Examples of connections include Kubernetes clusters, Prometheus instances, Jaeger traces, Nginx servers, and more.
- One or more environments can be assigned to a workspace.
- Same environment can be assigned to multiple workspaces.

{{< alert type="info" title="Assigning Environments to Workspaces" >}}
Assign any number of Environments to one or more Workspaces. See [Environments](/cloud/spaces/environments) section for more information.
{{< /alert >}}

### Designs

- Infrastructure Designs are essential for creating reusable deployment templates. Users belonging to teams with access to a workspace can utilize these designs to deploy resources in the Kubernetes clusters associated with that workspace.
- Like a shared drive (or shared collection of files), Workspaces are your Google Drive, while Designs are your Google Docs.
- One or more designs can be assigned to a workspace.

{{< alert type="info" title="Design Ownership in Workspaces" >}}
Designs belong to only one Workspace at any given time. See [Designs](https://docs.meshery.io/concepts/designs) section for more information.
{{< /alert >}}

### Teams

- A Workspace is closely associated with Teams. Teams are groups of users with varying permissions, and they are at the center of resource access and management within a Workspace.
- One or more teams can be assigned to a workspace.
- Same team can be assigned to multiple workspaces.

{{< alert type="info" title="Team Access Control in Workspaces" >}}
Teams offer control access to workspaces and to workspace resources such as environments and managed and unmanaged connections. See [Teams](/cloud/identity/teams).
{{< /alert >}}

### Connections

- Connections refer to various resources that can be either managed or unmanaged, but are discovered and made accessible for use. Examples of Connections include Kubernetes clusters, Prometheus instances, Jaeger services, Nginx deployments, and more. These Connections serve as a fundamental part of Workspaces, as users can deploy infrastructure designs within the context of these Connections.
- Connections can be assigned to one or more environments.
- Same connection can be assigned to multiple environments.

{{< alert type="info" title="Learn More About Connections" >}}
See [Connections](https://docs.meshery.io/concepts/logical/connections) section for more information.
{{< /alert >}}

## Best Practices

To make the most of Workspaces, here are some best practices:

- Clearly define permissions in the form of team assignment to ensure proper access control.
- Use Infrastructure Designs to standardize resource deployments.
- Regularly review and update your Workspace's resources and configurations.

Workspaces enhance collaboration within your teams, providing a structured environment for sharing and managing resources. By following best practices and understanding the core components of Workspaces, you can maximize the benefits of this feature.

{{< alert type="info" title="Looking for Practical Workspace Management?" >}}
For a step-by-step guide on how to create, edit, and manage your workspaces, see the [Managing Workspaces](/cloud/spaces/managing-workspaces/) documentation.
{{< /alert >}}

## Example: Orbital Labs Workspace Setup

The following illustrates how Five and Maya set up workspaces at Orbital Labs to segment access across infrastructure and development workflows. See [Meet Five and the Cast](/cloud/about) for the full seed inventory.

### Workspace Inventory

| Workspace | Owner Org | Teams with Access | Environments |
|---|---|---|---|
| `orbital-production` | Orbital Labs | Infrastructure only | `prod-aws` (EKS + RDS + S3 + CloudFront + SQS), `prod-gcp` (GKE + Cloud SQL + Cloud Storage + Pub/Sub) |
| `orbital-staging` | Orbital Labs | Infrastructure + Development | `staging-aws` (EKS + S3 + ElastiCache), `staging-azure` (AKS + Azure Blob + Azure Service Bus) |
| `orbital-dev` | Orbital Labs | Development only | `dev-local` (kind + LocalStack) |

### Creating orbital-staging

Five creates the `orbital-staging` workspace to give the Development team a shared environment for feature-branch testing — without handing them the keys to production.

**Steps Five follows:**
1. Navigate to **Workspaces** and click **Create Workspace**
2. Name the workspace `orbital-staging`
3. Save — the workspace is created with no team access and no environments assigned

**Maya then assigns team access:**
1. Open the `orbital-staging` workspace settings
2. Add the **Infrastructure** team — enabling Zara and Five to manage environment connections
3. Add the **Development** team — enabling Rex and Jordan to deploy designs and use connections

{{< alert type="info" title="Why both teams?" >}}
Infrastructure owns the environments (Zara assigns connections); Development owns the designs (Rex and Jordan deploy them). Assigning both teams to `orbital-staging` gives each group the access it needs without elevating Development's access to `orbital-production`.
{{< /alert >}}
