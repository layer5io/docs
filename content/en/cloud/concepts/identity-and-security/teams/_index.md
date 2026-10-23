---
title: Teams
description: >
  Outside of grouping users together, teams offer control access to workspaces and to workspace resources such as environments and managed and unmanaged connections.
weight: 2
categories: [identity]
tags: [teams]
aliases:
  - /cloud/identity/teams/
  - /cloud/guides/organizations/managing-teams/
---

A team is a named group of users inside one organization. Teams exist so an administrator can give a set of people the same access once, instead of granting it person by person. A team carries two kinds of access: roles held by its members, and workspace assignments that give the whole team access to a workspace and the resources in it.

Organizations contain any number of teams. A team has any number of members, and a user can belong to any number of teams. Teams are flat: a team cannot contain another team.

## Example: Orbital Labs Teams

The following teams illustrate how organizations use teams to segment access and responsibilities. Follow the full story at [Meet Five and the Cast]({{< ref "cloud/getting-started/meet-five/_index.md" >}}).

<img src='images/team-of-fives.svg' alt="Team of Fives" style="width:120px; float:right; margin-left:1.5rem; margin-bottom:1rem;" />

{{< cardpane >}}
{{% card header="**Infrastructure Team**" %}}
**Organization:** Orbital Labs
**Team Admin:** Zara Osei
**Members:** Five

Controls access to production and staging workspaces (`orbital-production`, `orbital-staging`). Zara manages team membership and approves environment assignments. Five handles day-to-day platform operations.
{{% /card %}}
{{% card header="**Development Team**" %}}
**Organization:** Orbital Labs
**Team Admin:** Maya Chen *(also Org Admin)*
**Members:** Rex Park, Jordan Reyes

Controls access to the development workspace (`orbital-dev`). Rex deploys often. Jordan designs infrastructure. Maya also holds Organization Admin for Orbital Labs, which is a separate role from Team Admin.
{{% /card %}}
{{< /cardpane >}}

{{< alert type="info" >}}
An Org Admin may also hold Team Admin. Maya Chen holds both roles at Orbital Labs. Holding Organization Admin alone does not let someone add or remove members of a team they do not own and do not administer. See [Roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}) for how role assignments stack.
{{< /alert >}}

## Add a Team

To apply different settings to a set of users, create a team in the organization and place them in it. You can then grant that team access to a workspace and to environments in that workspace.

Teams sit directly under the organization. You can add as many teams as you want, at the same level. Hierarchical teams are not supported. There is no limit on the number of teams per organization or per user, and team names do not have to be unique. Two teams in one organization can share a name.

A team takes a name and a description. The name is required on the Teams page. Layer5 Cloud does not check it for uniqueness or for length beyond 255 characters. You can pick initial members from the organization's users in the same step.

The creator becomes the team's owner, a member, and a Team Admin. Members chosen at creation are added as plain members with no role. The team is created in the organization you have selected. Confirm the organization switcher shows the organization you intend before you create it.

Creating a team requires the Create Team permission. Organization Admin, Team Admin, Academy Admin, and Provider Admin hold it by default.

>Learn more about the [organizational structure]({{< ref "cloud/concepts/identity-and-security/_index.md" >}}).

{{< alert type="info" title="Team Ownership">}}
The user who created the team is its owner. Ownership is recorded once at creation and cannot be transferred. The owner cannot leave the team. Deleting the team is the only way for an owner to exit.
{{< /alert >}}

{{< alert type="info" title="Removing a Member from the Organization" >}}
Removing a member from an organization also ends their membership in that organization's teams, and the permissions those team memberships granted. A team can be mapped to more than one organization. Removing a member from one organization ends their membership in every team mapped to it, including a team they use through another organization they still belong to. See [User Management]({{< ref "cloud/concepts/identity-and-security/users/user-management/index.md" >}}).
{{< /alert >}}

## Delete a Team

Deleting a team hides it from team lists and lookups. The user accounts of its members, and every resource they own, remain. Delete removes only the team record, so workspace assignments and the roles recorded on member rows are not cleaned up by the deletion itself.

Who can delete a team: an Organization Admin or the organization owner, a Provider Admin, or the person who is both owner and Team Admin of the team. Team Admin alone, and owner alone, are refused. An Organization Admin who is neither owner nor Team Admin of a team still can delete the team when they hold that organization authority. They cannot add or remove its members unless they are also Team Admin or the owner.

Before you delete, do these so no access remains:

1. Remove every member from the team.
2. Unassign the team from each workspace it has access to.

{{< alert type="info" title="Team Deletion" >}}
Deleting a team removes the team record. It does not delete user accounts or associated resources, and it does not by itself remove members' team roles or workspace assignments. Do the steps above first.
{{< /alert >}}

### Example

Suppose Team A contains Alice and Bob and is associated with several resources.

After deleting Team A:

* Team A no longer appears in team lists.
* Alice and Bob remain users in the organization.
* Their accounts and the resources remain.
* Remove them from the team and unassign the team from workspaces before deleting, so those grants do not outlive the team.

## Open Team Invite

Layer5 Cloud does not provide team invite links or team join requests. There is no shareable team link that adds a person to a team.

To bring someone into an organization and into specific teams in one step, create an organization invitation that lists the teams and team roles. See [User Invitations]({{< ref "cloud/concepts/identity-and-security/users/user-invitations/index.md" >}}). To add someone who is already a member of the organization, add them from the team.

Creating a new user account from inside a team is not available. Create the user in the organization, or use an invitation that lists the team.

## Team owner and Team Admin

Two separate things give someone authority over a team.

- The **owner** is the user who created the team. Ownership cannot be transferred.
- **Team Admin** is a role. A member who holds it can add and remove other members and assign the Team Admin role within the team.

The two are independent. A team created from the Teams page gives its creator both: the creator becomes owner, a member, and Team Admin. A team created through the API alone records an owner but no membership and no Team Admin role until the owner adds themselves.

| Action | Who can do it |
| --- | --- |
| Create a team | Holders of Create Team: Organization Admin, Team Admin, Academy Admin, Provider Admin |
| Add a member | Team Admin or owner of that team, or Provider Admin |
| Remove another member | Team Admin of that team, or Provider Admin |
| Leave a team | A member who is not a Team Admin and not the owner |
| Delete a team | Organization Admin or owner, Provider Admin, or someone who is both owner and Team Admin of the team |

An Organization Admin who is neither owner nor Team Admin of a team cannot add or remove its members. To change membership, assign that Organization Admin the Team Admin role in the team first, or use a Provider Admin.

The owner cannot leave the team. A Team Admin who is not the owner cannot remove themselves either. Only members without the Team Admin role can leave.

## How a team grants access

A member's permissions in an organization are the union of the roles they hold in the organization and in every team mapped into it. A role held in a team therefore applies across the organization in which the team lives, not only inside the team. Grant the Team Admin role deliberately: it carries team, user-viewing, and security management permissions organization-wide. See [Roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}) and [Roles and Permissions]({{< ref "cloud/reference/default-permissions.md" >}}).

A team also receives access to resources through [workspaces]({{< ref "cloud/concepts/spaces/workspaces.md" >}}): assigning a team to a workspace gives its members read-only access to the connections in the workspace's environments. It does not open private designs to the team. Teams are not assigned to environments directly. Assigning a team to a workspace requires Assign team to workspace in the workspace's organization (Organization Admin, Workspace Admin, Academy Admin, Provider Admin). The team and the workspace must belong to the same organization. Unassigning needs Remove team from workspace. See [Environments]({{< ref "cloud/concepts/spaces/environments.md" >}}).

## Who sees which teams

The Teams page lists the teams of the selected organization with name, description, owner, and creation time. Every authenticated member of the organization receives the same list. It is not narrowed to your own teams or to teams you administer. A team's member list is likewise visible to any member of the organization.

## Membership rules

- **Adding a member.** The Teams page only offers users who already belong to the organization. The API accepts any existing user, so treat organization membership as the intended precondition and add people to the organization first. See [User Management]({{< ref "cloud/concepts/identity-and-security/users/user-management/index.md" >}}).
- **Adding is idempotent.** Adding someone who is already a member changes nothing.
- **Notification.** An added member receives an email unless their [notification preferences]({{< ref "cloud/concepts/identity-and-security/users/notification-preferences/index.md" >}}) disable organization and team user-management email.
- **Removing a member.** Removing a member ends their membership and every role they held in that team. It does not touch their organization membership, organization roles, or other teams. A removed owner remains the owner of record.

| You are | You can |
| --- | --- |
| Team Admin removing someone else | Remove them |
| A member without Team Admin | Leave the team (remove yourself) |
| A Team Admin | Not remove yourself. Another Team Admin or a Provider Admin removes you |
| The owner | Not leave. Delete the team instead |
| Provider Admin | Remove anyone except the owner removing themselves |

## Make a member a Team Admin

Team Admin is the only role offered for team scope. Assigning it requires Team Admin of the team, Organization Admin or a holder of Assign User Roles, or Provider Admin.

Assigning it sets the person's role list in that team: the roles you submit replace the roles they held there, and an empty list removes every team role while keeping the membership. The person must belong to the organization. Granting the role to someone not yet on the team also adds them to it.

Team Admin permissions apply across the whole organization, not just this team. See [How a team grants access](#how-a-team-grants-access).

Adding someone to the team does not give them a role in it. A member with no role holds only what they receive through their organization roles and the team's workspace assignments.

## What is not available

Layer5 Cloud does not provide these today:

- Team invite links and team join requests.
- Transferring team ownership.
- Creating a new user account from inside a team.
- Limits on the number of teams per organization or per user, and unique team names.
- Plan restrictions. Teams are available on every plan.

Updates that fail partway can leave a team without its creator as member. If the creator is not listed, add them to the team. A team cannot be moved to another owner. Plan to keep at least one other Team Admin so someone can administer the team if the owner leaves the organization.
