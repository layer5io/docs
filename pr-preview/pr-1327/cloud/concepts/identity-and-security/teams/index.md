# Teams

> A team groups organization members so administrators can grant them roles and attach them to workspaces together.



A team is a named group of users inside one organization. Teams exist so an administrator can give a set of people the same access once, instead of granting it person by person. A team carries two kinds of access: **roles** held by its members, and **workspace assignments** that give the whole team access to a workspace and the resources in it.

Organizations contain any number of teams. A team has any number of members, and a user can belong to any number of teams. Teams are flat: a team cannot contain another team.

## Team owner and Team Admin

Two separate things give someone authority over a team.

- The **owner** is the user who created the team. Ownership is recorded once at creation and cannot be transferred.
- **Team Admin** is a role. A member who holds it can add and remove other members and assign the Team Admin role within the team.

The two are independent. A team created from the Teams page gives its creator both: the creator becomes owner, a member, and Team Admin. A team created through the API alone records an owner but no membership and no Team Admin role until the owner adds themselves.

| Action | Who can do it |
| --- | --- |
| Create a team | Holders of the Create Team permission: Organization Admin, Team Admin, Academy Admin, Provider Admin |
| Add a member | Team Admin or owner of that team, or Provider Admin |
| Remove another member | Team Admin of that team, or Provider Admin |
| Leave a team | A member who is not a Team Admin and not the owner |
| Delete a team | Organization Admin or Owner, Provider Admin, or someone who is both owner and Team Admin of the team |

An Organization Admin who is neither owner nor Team Admin of a team cannot add or remove its members. To change membership, assign that Organization Admin the Team Admin role in the team first, or use a Provider Admin.

The owner cannot leave the team, even to hand it to someone else. Because ownership cannot be transferred, deleting the team is the only way for an owner to exit. A Team Admin who is not the owner cannot remove themselves either; only members without the Team Admin role can leave.

## How a team grants access

A member's permissions in an organization are the union of the roles they hold in the organization and in every team mapped into it. A role held in a team therefore applies across the organization in which the team lives, not only inside the team. Grant the Team Admin role deliberately: it carries team, user-viewing, and security management permissions organization-wide. See [Roles](/pr-preview/pr-1327/cloud/concepts/identity-and-security/roles/) and the [Roles and Permissions reference](/pr-preview/pr-1327/cloud/reference/default-permissions/).

A team also receives access to resources through [workspaces](/pr-preview/pr-1327/cloud/guides/workspaces/): assigning a team to a workspace gives its members read-only access to the connections in the workspace's environments. It does not open private designs to the team. Teams are not assigned to environments directly.

## Who sees which teams

The Teams page lists the teams of the selected organization with name, description, owner, and creation time. Every authenticated member of the organization receives the same list; it is not narrowed to your own teams or to teams you administer. A team's member list is likewise visible to any member of the organization.

## Membership rules

- **Adding a member.** The Teams page only offers users who already belong to the organization. The API accepts any existing user, so treat organization membership as the intended precondition and add people to the organization first (see [Manage Users](/pr-preview/pr-1327/cloud/concepts/identity-and-security/users/user-management/)).
- **Adding is idempotent.** Adding someone who is already a member changes nothing.
- **Notification.** An added member receives an email unless their notification preferences disable organization and team user-management email.
- **Invitations.** Teams have no invite link or join request of their own. To bring someone into an organization and into specific teams in one step, create an organization invitation that lists the teams and team roles (see [Invite Users](/pr-preview/pr-1327/cloud/concepts/identity-and-security/users/user-invitations/)).
- **Removing a member.** Removing a member ends their membership and every role they held in that team. It does not touch their organization membership, organization roles, or other teams.

## Deleting a team

Deleting a team hides it from team lists and lookups. The user accounts of its members, and every resource they own, remain. Delete removes only the team record, so workspace assignments and the roles recorded on member rows are not cleaned up by the deletion itself. Before deleting a team, remove its members and unassign it from workspaces so no access outlives it.

## What is not available

Layer5 Cloud does not provide these today:

- Team invite links and team join requests.
- Transferring team ownership.
- Creating a new user account from inside a team. Create the user in the organization, or use an invitation that lists the team.
- Limits on the number of teams per organization or per user, and unique team names. Two teams in one organization can share a name.
- Plan restrictions: teams are available on every plan.

For the steps, see [Manage Teams](/pr-preview/pr-1327/cloud/guides/organizations/managing-teams/).

