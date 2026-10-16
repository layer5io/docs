---
title: Manage Workspaces
description: >
  Create, edit, and delete workspaces; give teams access; attach environments; place designs and views; and review workspace activity.
weight: 10
diataxis: how-to
categories: [spaces]
tags: [workspaces]
aliases:
  - /cloud/spaces/managing-workspaces/
  - /cloud/concepts/spaces/managing-workspaces/
  - /cloud/guides/tutorials/sharing-a-workspace/
  - /cloud/tutorials/sharing-a-workspace/
  - /cloud/guides/workspaces/sharing-a-workspace/
---

A workspace is the unit you use to organize designs and to decide which teams can reach an organization's environments and connections. This guide covers every task on a workspace. For what a workspace is and how it relates to teams, environments, and designs, read the [Workspaces concept]({{< ref "cloud/concepts/workspaces.md" >}}).

Each task names the permission it needs. Layer5 Cloud checks the permission in the organization that owns the workspace. A custom role or a team role can hold any of these permissions; the default holders are below.

{{< keys-matrix caption="Workspace permissions" functions="View Workspace|Create Workspace|Edit Workspace|Delete Workspace|Assign team to workspace|Remove team from workspace|Assign environment to workspace|Remove environment from workspace|Assign Designs to Workspaces|Remove Designs from Workspaces|Assign Views to Workspace|Unassign Views from Workspace" >}}

## Find workspaces {#view-workspaces}

**Needs:** View Workspace to see the Workspaces page. The API lists workspaces for any signed-in member of the organization.

Every member of an organization can list every workspace in it. Team membership does not narrow the list. A list request names one organization. A user who holds View All Organizations can ask for every organization at once.

You can search by name or description, order by creation or update time, and page through results.

## Create a workspace

**Needs:** Create Workspace in the organization that will own the workspace.

A workspace takes a name, a description, and an organization. The workspace stays in that organization for its whole life; Layer5 Cloud ignores a later request to change it.

- The Workspaces page requires a name and an organization. The API does not check that the name is non-empty.
- Name and description are each limited to 255 characters. A longer value fails with `Unable to create workspace`.
- Names do not have to be unique. Two workspaces in one organization can share a name, so choose names you can tell apart.
- You become the owner of record. Creating a workspace does not assign any team or environment, and an empty workspace gives nobody access to anything.

## Edit a workspace

**Needs:** Edit Workspace.

You can change the name and the description. An update changes only the fields you send. A request with an empty body fails. A workspace that is not in one of your organizations answers `workspace not found`.

## Give a team access to a workspace {#assign-teams-to-a-workspace}

**Needs:** Assign team to workspace to add a team, Remove team from workspace to take it away.

The team and the workspace must belong to the same organization. A team from another organization is refused with HTTP 403. Assigning a team that is already assigned changes nothing and returns the existing assignment.

What a team assignment grants is narrower than it sounds:

| It grants | It does not grant |
| --- | --- |
| Read-only access to the connections, and their credentials, in every environment attached to the workspace | Access to private designs in the workspace |
| | The ability to see the workspace (all organization members see all workspaces) |
| | Permission to create, edit, or delete anything |

Removing the team ends the access at once. To give a team access to a private design, share the design with the people who need it. See [Share Designs]({{< ref "kanvas/guides/collaborating/sharing-designs/index.md" >}}).

## Attach an environment to a workspace {#link-environments-to-a-workspace}

**Needs:** Assign environment to workspace to attach, Remove environment from workspace to detach.

Attaching an environment makes its connections readable to every member of the workspace's teams. The environment and the workspace must belong to the same organization; a cross-organization attachment is refused with HTTP 403.

Some environments are provisioned by Layer5 Cloud itself to hold organization configuration such as the mail server or sign-in providers. Layer5 Cloud refuses to attach one to a workspace: `this environment is provisioned by the platform and cannot be added to a workspace`.

Attaching an environment that is already attached returns the existing attachment. Detaching one that was never attached answers `no such environment assignment`. Detaching an environment that was already detached returns the earlier record without error.

The same environment can sit in any number of workspaces. Creating and filling environments is covered in [Manage Environments]({{< ref "cloud/guides/workspaces/managing-environments/index.md" >}}).

## Place designs and views in a workspace {#move-designs-and-views-between-workspaces}

**Needs:** Assign Designs to Workspaces and Remove Designs from Workspaces for designs. Assign Views to Workspace and Unassign Views from Workspace for views.

A design or view belongs to at most one workspace. Placing it in a workspace moves it: Layer5 Cloud removes every earlier workspace assignment, then adds the new one. There is no copy.

- **Ownership does not change.** The user who created a design stays its owner after any move.
- **The workspace decides the organization.** A design is listed under the organization of the workspace that holds it, and the Share Design permission is checked in that organization. Moving a design into a workspace in another organization moves it into that organization.
- **Workspace membership is not design access.** A private design stays private. Only the owner, provider administrators, and users the design was shared with can open it, wherever it sits. Private, public, and published designs can all live in one workspace.
- **Removing a design** from its workspace leaves it with no workspace. The design and its owner are unaffected.

The permission is checked in the destination workspace's organization only. Layer5 Cloud does not check that you own the design or that the design is in your organization.

The unassigned list for a workspace shows only designs you own.

## Review workspace activity {#view-recent-activity}

**Needs:** View Workspace.

Each workspace keeps an event log. It records the creation, update, and deletion of the workspace, and every assignment and unassignment of a team, environment, design, or view, with the email of the person who acted. Failed attempts are recorded as error events. The log is paged and searchable.

## Delete a workspace

**Needs:** Delete Workspace.

Deleting a workspace ends, in one step, every team, environment, design, and view assignment it holds. It deletes none of those resources: the teams, environments, connections, designs, and views all remain. Designs and views that were in the workspace have no workspace afterwards, and team members lose the connection access the workspace gave them.

**An organization must keep at least one workspace.** Layer5 Cloud refuses to delete the last one with `cannot delete workspace: at least one workspace must exist for the organization`. The check holds under concurrent requests, so two simultaneous deletes cannot empty an organization. The refusal arrives as HTTP 500.

Create the replacement workspace first, then delete the other.

## Patterns that work

- **One workspace per project.** Attach the project's team and environments, and keep its designs together.
- **One workspace per stage.** Give a production workspace only the production environment and the platform team. Members of other teams cannot read production connections through it. See [Promote a Design from Staging to Production]({{< ref "cloud/tutorials/promoting-a-design.md" >}}).
- **One workspace per team.** Attach the team and the environments it works with.

## Questions

**Can other workspace members edit or delete my design?** Workspace membership grants no design access. People you shared the design with can read, edit, and clone it. Only the owner or a provider administrator can delete it.

**How do I make a design read-only for everyone?** Publish it. See [Publish Designs]({{< ref "kanvas/guides/designs/publishing-designs/index.md" >}}).

**Does a workspace have size limits?** No. Layer5 Cloud enforces no space or file-count limit on workspaces, and no plan check on workspace actions.
