---
title: Teams
description: >
  Outside of grouping users together, teams offer control access to workspaces and to workspace resources such as environments and managed and unmanaged connections.
categories: [Identity]
tags: [teams]
---

Organizations are the basic unit of multi-tenancy inside of Layer5 Cloud. Organizations can have any number of teams. Teams can have any number of users. Users can belong to any number of teams. Users may belong to any number of organizations.

Outside of grouping users together, teams offer control access to workspaces and to workspace resources such as environments and managed and unmanaged connections.

## Add a Team

To apply different settings to a set of users, create a new team within your organization. You can then apply unique settings to that team, such as access to specific workspaces and their associated environments.

A team is a group created by an administrator to apply common settings and access controls to a specific set of users within an organization. By default, all users are part of the top-level organization. Teams inherit settings from the parent organization, but these can be customized as needed for the team.

Currently, hierarchical teams are not supported; all teams exist at the same level directly under the organization. Changes to settings at the organization level will propagate to all teams that inherit those settings, while custom team settings will remain unchanged.

Learn more about the [organizational structure](/cloud/identity). 

{{< alert type="info" title="Team Ownership">}}
If you are the current team owner, you can’t remove yourself from the team until you transfer ownership to another team administrator.
{{< /alert >}}

## Open Team Invite

The "Open Team Invite" feature allows administrators to enable a specific invitation method for users to join a particular team. This is intended to function like an [Open Org Invite Link](https://docs.layer5.io/cloud/identity/users/user-management/), but for a specific team, providing a direct way to invite members rather than adding them manually.

![Process of open team invite](/cloud/identity/teams/open_team_invite.gif)

### How "Open Team Invite" Works
1.  **Enable the Feature:** When creating or editing a team, an administrator selects the "Open Team Invite" checkbox (as shown in the GIF).
2.  **Intended Invitation Mechanism:** This action is designed to enable a specific way to invite users to this team, ideally by making a shareable "Team Invite Link" available.
    * **(Current Status:** While this setting enables the feature, the direct generation and use of a shareable team invite link in the UI is under review. The GIF illustrates enabling the "Open Team Invite" setting itself. For updates, see GitHub issue #560.)
3.  **Share Invitation:** Once available, the team-specific invitation (e.g., the link) can be shared with users.
    * Invited users typically must already be members of the organization. If not, they should join the organization first (e.g., via an "Open Org Invite Link").
4.  **User Joins Team:** Upon using the team-specific invitation, the user is added to that team.
5.  **Manual Alternative:** If "Open Team Invite" is not enabled, administrators must manually add members to the team.

### Benefits of "Open Team Invite"
* **Targeted Team Invites:** Directly invite users to join specific teams.
* **Streamlined Access:** Simplify onboarding for users needing access to particular project groups or shared resources within a team.
* **Focused Membership:** Works in conjunction with organization invites, allowing users to first join the organization and then be guided into specific teams.