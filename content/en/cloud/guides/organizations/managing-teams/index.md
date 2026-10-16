---
title: Manage Teams
description: >
  Create a team, add and remove members, assign Team Admins, attach a team to a workspace, and delete a team.
weight: 50
diataxis: how-to
categories: [identity]
tags: [teams]
---

This guide covers the administrator tasks for teams. For what a team is and how it grants access, read the [Teams concept]({{< ref "cloud/concepts/identity-and-security/teams/_index.md" >}}).

{{< keys-matrix caption="Team permissions" functions="Create Team|Edit Team|Delete Team|View All Teams|Add User to Team|Remove User from Team|Leave Team|Assign team to workspace" >}}

## Create a team

**Needs:** the Create Team permission in your current organization.

A team takes a name and a description. The name is required on the Teams page; Layer5 Cloud does not check it for uniqueness or length beyond 255 characters. You can pick initial members from the organization's users in the same step.

The creator becomes the team's owner, a member, and a Team Admin. Members chosen at creation are added as plain members with no role.

The team is created in the organization you have selected. Confirm the organization switcher shows the organization you intend before you create it.

## Add members

**Needs:** Team Admin or owner of the team, or Provider Admin.

1. Make sure each person is already a member of the organization. Add them first if not.
2. Add them to the team.

Added people receive an email unless they have turned off organization and team user-management notifications. Adding an existing member is harmless and changes nothing.

Adding someone to the team does not give them a role in it. A member with no role holds only what they receive through their organization roles and the team's workspace assignments.

## Make a member a Team Admin

**Needs:** Team Admin of the team, Organization Admin or a holder of Assign User Roles, or Provider Admin.

Team Admin is the only role offered for team scope. Assigning it sets the person's role list in that team: the roles you submit replace the roles they held there, and an empty list removes every team role while keeping the membership. The person must belong to the organization. Granting the role to someone not yet on the team also adds them to it.

Team Admin permissions apply across the whole organization, not just this team. See [How a team grants access]({{< ref "cloud/concepts/identity-and-security/teams/_index.md#how-a-team-grants-access" >}}).

## Remove a member or leave a team

| You are | You can |
| --- | --- |
| Team Admin removing someone else | Remove them |
| A member without Team Admin | Leave the team (remove yourself) |
| A Team Admin | Not remove yourself; another Team Admin or a Provider Admin removes you |
| The owner | Not leave; delete the team instead |
| Provider Admin | Remove anyone except the owner removing themselves |

Removal ends the person's membership and all their roles in the team. It leaves their organization membership and other teams unchanged. A removed owner remains the owner of record.

## Give a team access to a workspace

**Needs:** Assign team to workspace in the workspace's organization (Organization Admin, Workspace Admin, Academy Admin, Provider Admin).

Assign the team to the workspace. The team and the workspace must belong to the same organization. Unassigning needs Remove team from workspace. See [Workspaces]({{< ref "cloud/guides/workspaces/_index.md" >}}).

## Delete a team

**Needs:** Organization Admin or Owner, Provider Admin, or the person who is both owner and Team Admin of the team. Team Admin alone and owner alone are refused.

Deleting is irreversible and removes only the team record: members keep their user accounts, and resources remain. Before you delete, do these so no access remains:

1. Remove every member from the team.
2. Unassign the team from each workspace it has access to.

## Limits and failure modes

- Deleting the team does not remove its members' team roles or workspace assignments on its own; do the steps above.
- Updates that fail partway can leave a team without its creator as member. If the creator is not listed, add them to the team.
- A team cannot be moved to another owner. Plan to keep at least one other Team Admin so someone can administer the team if the owner leaves the organization.
