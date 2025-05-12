---
title: Workspaces
description: >
  Meshery Workspaces serve as a virtual space for your team-based work.
weight: 6
categories: [Spaces]
---


Meshery Workspaces provide a virtual space for you and your teams to collaborate, organize project-based work, manage access to environments and resources, and track team activities.

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
- A Workspace is closely associated with Teams in Meshery. Teams are groups of users with varying permissions, and they are at the center of resource access and management within a Workspace.
- One or more teams can be assigned access to a workspace.

After creating a Workspace, one of your next steps is to assign team access, create or transfer designs into the Workspace, and allocate resources that to Workspace by associating it with one or more Environments, therein making the Environment's connections available to users of the Workspace. 

Like a shared drive (or shared collection of files), Workspaces are your Google Drive, while Meshery Designs are your Google Docs.

### Workspace Deletion Behavior

When a Workspace is deleted:

- Deletion is **permanent and irreversible**. Proceed with caution.
- Before deletion, users have the option to transfer associated Designs and Views to another Workspace.
- If no transfer is made, all associated Designs and Views will be permanently deleted along with the Workspace[^1].
- Any associated Teams or Environments will be detached from the Workspace but will remain available for reassignment.

{{< alert type="info" title="What Happens When a Workspace is Deleted?" >}}
Deleting a Workspace will permanently remove the Workspace itself and its associated Designs and Views, unless they are transferred beforehand. Teams and Environments will remain intact but will no longer be associated with the deleted Workspace.
{{< /alert >}}

## Key Workspace Components

### Environments

- Environments are a central part of a workspace. They serve as a logical grouping for managing connections. A connection, in this context, can be either managed or discovered by Meshery. Examples of connections include Kubernetes clusters, Prometheus instances, Jaeger traces, Nginx servers, and more.
- One or more environments can be assigned to a workspace.
- Same environment can be assigned to multiple workspaces.

{{< alert type="info" title="Assigning Environments to Workspaces" >}}
Assign any number of Environments to one or more Workspaces. See [Environments](https://docs.meshery.io/concepts/environments) section for more information.
{{< /alert >}}

### Designs

- Infrastructure Designs are essential for creating reusable deployment templates. Users belonging to teams with access to a workspace can utilize these designs to deploy resources in the Kubernetes clusters associated with that workspace.
- Like a shared drive (or shared collection of files), Workspaces are your Google Drive, while Meshery Designs are your Google Docs.
- One or more designs can be assigned to a workspace.

{{< alert type="info" title="Design Ownership in Workspaces" >}}
Designs belong to only one Workspace at any given time. See [Meshery Designs](https://docs.meshery.io/concepts/designs) section for more information.
{{< /alert >}}

### Teams 
- A Workspace is closely associated with Teams in Meshery. Teams are groups of users with varying permissions, and they are at the center of resource access and management within a Workspace.
- One or more teams can be assigned to a workspace.
- Same team can be assigned to multiple workspaces.

{{< alert type="info" title="Team Access Control in Workspaces" >}}
Teams offer control access to workspaces and to workspace resources such as environments and managed and unmanaged connections. See [Teams](/cloud/identity/teams).
{{< /alert >}}

### Connections

- Connections in Meshery refer to various resources that can be either managed or unmanaged, but are discovered and made accessible for use. Examples of Connections include Kubernetes clusters, Prometheus instances, Jaeger services, Nginx deployments, and more. These Connections serve as a fundamental part of Workspaces, as users can deploy infrastructure designs within the context of these Connections.
- Connections can be assigned to one or more environments.
- Same connection can be assigned to multiple environments.

{{< alert type="info" title="Learn More About Connections" >}}
See [Connections](https://docs.meshery.io/concepts/logical/connections) section for more information.
{{< /alert >}}

## Best Practices

To make the most of Meshery Workspaces, here are some best practices:

- Clearly define permissions in the form of team assignment to ensure proper access control.
- Use Infrastructure Designs to standardize resource deployments.
- Regularly review and update your Workspace's resources and configurations.

Meshery Workspaces enhance collaboration within your teams, providing a structured environment for sharing and managing resources. By following best practices and understanding the core components of Workspaces, you can maximize the benefits of this feature in Meshery.

[^1]: This functionality is not fully implemented yet. Users might occasionally observe that designs and views are preserved after Workspace deletion.