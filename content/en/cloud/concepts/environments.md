---
title: Environments
description: >
  An environment is a named group of connections that forms a deploy target and the unit through which workspaces expose connections to teams.
weight: 50
diataxis: explanation
categories: [spaces]
aliases:
  - /cloud/spaces/environments/
  - /cloud/concepts/spaces/environments/
---

An environment is a named group of connections, such as Kubernetes clusters, together with the credentials those connections use. Environments matter for two reasons:

- **An environment is a deploy target.** When you deploy a design, you choose the environment to deploy it to, and the design deploys to that environment's connections.
- **An environment is how a workspace exposes connections.** A workspace never holds connections directly. It holds environments, and teams assigned to the workspace reach the connections inside them.

Group connections the way you deploy: one environment per pipeline stage, region, or purpose, so that choosing a target means choosing one environment instead of a list of clusters.

## Scope and membership

An environment belongs to one organization for its whole life. Editing an environment never changes its organization.

| Relationship | Rule |
| --- | --- |
| Connection in environments | A connection can be in any number of environments. Adding it to one does not remove it from another. |
| Environment in workspaces | An environment can be in any number of workspaces in its organization. |
| Who sees an environment | Every member of the organization can list and open every environment in it. Team membership does not narrow the list. |

Names and descriptions are limited to 255 characters. Names are not unique: two environments in one organization can share a name.

## Choosing an environment at deploy time

Deploying a design happens in Kanvas. The deploy action offers environments from your organization's whole list at the moment you deploy. The workspace the design sits in does not limit that choice, so a design in a staging workspace can still be deployed to a production environment. Choose the target deliberately. See [Deploy a Design]({{< ref "kanvas/guides/deploying/deploying-designs/index.md" >}}).

## Access to connections and credentials

A user can read a connection, and the credential it uses, when any one of these holds:

| Route | What it grants | How it ends |
| --- | --- | --- |
| You own the connection | Read, modify, and delete | - |
| You belong to a team assigned to a workspace that contains an environment that contains the connection | Read only | Removing you from the team, the team from the workspace, the environment from the workspace, or the connection from the environment, or deleting the workspace or environment |
| You hold the [View All Organizations key]({{< ref "cloud/concepts/identity-and-security/keys.md" >}}) | Read access to every connection and credential in every organization | Losing the key |

Only ownership allows changes. Access through a workspace is always read-only, however many workspaces lead to the same connection.

This chain governs connections and credentials only. Designs and views are not opened by environment or workspace assignment; share a design to give someone access to it. See [Workspaces]({{< ref "cloud/concepts/workspaces.md" >}}) for the full access chain.

## Platform-provisioned environments

Some environments are created by Layer5 Cloud itself to hold organization configuration, such as sign-in providers or the mail server. They appear in your organization's environment list, but they are not deploy targets you manage:

- They cannot be deleted. The attempt is refused with `this environment is provisioned by the platform and cannot be deleted here`.
- Connections cannot be assigned to them or detached from them through the normal environment controls.
- They cannot be added to a workspace. If one is already in a workspace, you can remove it.

Every environment you create is an ordinary environment.

## Deleting an environment

Deleting an environment ends its connection assignments and its workspace assignments in one step. The connections remain, and keep their membership in any other environment. Teams that reached a connection only through the deleted environment lose that access.

## Limits and behavior

- **Editing replaces both fields.** An environment edit sets both the name and the description. A field left out of the request becomes empty, so always send both.
- **Organization is fixed.** An edit never moves an environment to another organization.
- **Removing a connection that was never assigned** is refused with `no such connection assignment`.

## Permissions

Every environment action is checked in the organization that owns the environment. Creating an environment is checked in the organization you create it in.

{{< keys-matrix caption="Environment permissions" functions="View Environment|Create Environment|Edit Environment|Delete Environment|Assign connections to environment|Remove connections from environment|Assign environment to workspace|Remove environment from workspace" >}}

## Plan availability

The feature matrix lists environments under the Enterprise plan. Layer5 Cloud does not refuse environment actions by plan: creating, editing, deleting, and assigning environments are governed only by the permissions above.

## Related

- [Manage Environments]({{< ref "cloud/guides/workspaces/managing-environments/index.md" >}}) covers creating environments and assigning connections.
- [Workspaces]({{< ref "cloud/concepts/workspaces.md" >}}) explains how environments reach teams.
- [Promote a Design from Staging to Production]({{< ref "cloud/tutorials/promoting-a-design.md" >}}) puts environments and workspaces to work together.
