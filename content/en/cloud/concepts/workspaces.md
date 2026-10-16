---
title: Workspaces
description: >
  A workspace groups teams, environments, designs, and views inside one organization, and decides which connections a team can reach.
weight: 40
diataxis: explanation
categories: [spaces]
aliases:
  - /cloud/spaces/
  - /cloud/spaces/workspaces/
  - /cloud/concepts/spaces/
  - /cloud/concepts/spaces/workspaces/
---

A workspace is a named grouping inside an organization that brings together the teams who do a piece of work, the environments they deploy to, and the designs and views they work on. Workspaces exist so an administrator can draw a boundary around a project or a stage of a pipeline, such as staging or production, and decide in one place which teams reach which infrastructure connections.

A workspace does two separate jobs, and keeping them apart is the key to the model:

- **It organizes resources.** Designs and views live in a workspace, and the workspace decides which organization they are listed under.
- **It grants connection access.** Assigning a team to a workspace gives that team's members read-only access to the connections in the workspace's environments. That is the only access a team assignment grants.

Workspaces and environments appear together in the Spaces area of Layer5 Cloud, which also shows counts of your organization's environments, workspaces, and connections.

## What a workspace contains

A workspace belongs to exactly one organization for its whole life. Editing a workspace changes its name, description, or metadata, never its organization. To have a workspace in another organization, create one there.

A workspace holds zero or more of each of the following:

| Member | How many workspaces it can be in | What assigning it means |
| --- | --- | --- |
| Team | Any number | Members of the team gain read-only access to the connections in this workspace's environments. The team must belong to the workspace's organization. |
| Environment | Any number | The environment's connections become reachable by the workspace's teams. The environment must belong to the workspace's organization. |
| Design | At most one | The design moves here. Assigning a design to a workspace removes it from the workspace it was in. |
| View | At most one | The view moves here, the same way a design does. |

Assigning a team or environment that is already in the workspace changes nothing. Creating a workspace assigns no team and no environment; you add them afterward.

### Designs live in one workspace at a time

Because a design sits in at most one workspace, assigning it to a workspace is a move, not a copy. The workspace a design sits in decides two things:

- The organization under which the design is listed.
- The organization in which the Share Design permission is checked when someone shares the design.

Moving a design requires the Assign Designs to Workspaces permission in the destination workspace's organization. Layer5 Cloud does not also require access to the workspace the design leaves. When you list the designs you can add to a workspace, the list shows only designs you own that are not already in it.

## Who sees a workspace and what a team assignment grants

Workspace visibility is organization-wide by design. Every member of an organization can list and open every workspace in that organization, whether or not one of their teams is assigned to it. Team assignment does not narrow what you see. The Workspaces, Environments, and connection areas of the Cloud UI appear only to people who hold the matching View Workspace, View Environment, and View Connections permissions.

Team assignment grants exactly one thing: **read-only access to the connections, and their credentials, in the workspace's environments.**

It does not grant access to designs. Placing a private design in a workspace and assigning a team to that workspace does not let the team read the design. To give people access to a design, share it with them; see [Share a Design]({{< ref "kanvas/guides/collaborating/sharing-designs/index.md" >}}).

### The access chain for connections

A member of a team reaches a connection through a chain of four live links. Breaking any one of them ends the access.

| Link | Created by | Broken by |
| --- | --- | --- |
| 1. User is a member of a team | Adding the user to the team | Removing the user from the team |
| 2. Team is assigned to a workspace | Assign team to workspace | Removing the team from the workspace, or deleting the workspace |
| 3. Environment is assigned to the workspace | Assign environment to workspace | Removing the environment from the workspace, or deleting either one |
| 4. Connection is assigned to the environment | Assign connections to environment | Removing the connection from the environment, or deleting the environment |

The result is read-only. Modifying or deleting a connection still requires owning it. Two other routes reach a connection independently of this chain: owning it, and holding the View All Organizations key. See [Environments]({{< ref "cloud/concepts/environments.md" >}}) for the full access rules.

## Lifecycle

- **Default workspace.** Every organization receives a workspace when it is created, so designs always have somewhere to live.
- **Names.** A name and description are each limited to 255 characters. Names are not unique: two workspaces in one organization can share a name.
- **Editing.** Only the fields you change are updated; the others keep their values.
- **The last workspace stays.** An organization always keeps at least one workspace. Deleting the last one is refused with `cannot delete workspace: at least one workspace must exist for the organization`. Two simultaneous deletes cannot both succeed and leave the organization empty.
- **Deleting a workspace** ends every team, environment, design, and view assignment it holds, in one step. The teams, environments, designs, views, and connections themselves remain. Designs and views that were in the workspace are left in no workspace until you assign them to another one. Team members lose any connection access that flowed through the deleted workspace.

## Recent activity

Each workspace records an activity log: creating, editing, and deleting the workspace, and assigning or removing teams, environments, designs, and views. Every entry carries the email address of the person who acted. Reading the log requires the View Workspace permission.

## Permissions

Every workspace action is checked in the organization that owns the workspace. Creating a workspace is checked in the organization you create it in.

{{< keys-matrix caption="Workspace permissions" functions="View Workspace|Create Workspace|Edit Workspace|Delete Workspace|Assign team to workspace|Remove team from workspace|Assign environment to workspace|Remove environment from workspace|Assign Designs to Workspaces|Remove Designs from Workspaces|Assign Views to Workspace|Unassign Views from Workspace" >}}

## Plan availability

{{< feature-tiers categories="Workspaces" functions="My Workspace|Shared Workspaces" >}}

The matrix shows how workspaces are packaged across plans. Layer5 Cloud enforces no plan check on workspace actions: creating, editing, deleting, and assigning work the same on every plan, governed only by the permissions above.

## Related

- [Manage Workspaces]({{< ref "cloud/guides/workspaces/managing-workspaces/index.md" >}}) covers creating, editing, and deleting workspaces and assigning their members.
- [Environments]({{< ref "cloud/concepts/environments.md" >}}) explains the deploy targets a workspace exposes.
- [Teams]({{< ref "cloud/concepts/identity-and-security/teams/_index.md" >}}) explains how teams group people.
