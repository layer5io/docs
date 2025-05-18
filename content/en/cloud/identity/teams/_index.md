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

To apply different settings to a set of users, create a child new team below your top-level organization and place them in it. You can then apply unique settings to that team, like access to a workspace and their a specific set of environments.

A team is simply a group that an administrator can create in the Google Admin console to apply settings to a specific set of users. By default, all users are placed in the top-level (parent) organizational unit. Child organizational units inherit the settings from the parent, but can be changed to fit the needs of the child organizational unit.

Below the top-level organization, you can add as many teams as you want - at the same level. Hierarchal teams are not currently supported. When you change a setting at the higher level organization, the settings for all child teams that inherit that setting also change. Custom settings at the team level, however, remain unchanged.

>Learn more about the [organizational structure](/cloud/identity). 

{{< alert type="info" title="Team Ownership">}}
If you are the current team owner, you can’t remove yourself from the team until you transfer ownership to another team administrator.
{{< /alert >}}

## Open Team Invite

The "Open Team Invite" feature allows administrators to enable a specific invitation method for users to join a particular team. This is intended to function like an [Open Org Invite Link](https://docs.layer5.io/cloud/identity/users/user-management/), but for a specific team, providing a direct way to invite members rather than adding them manually.

![Process of open team invite](/cloud/identity/teams/open_team_invite.gif) 

### Why Use Open Team Invite

* **Targeted Team Invites:** Directly invite users to join specific teams.
* **Streamlined Access:** Simplify onboarding for users needing access to particular project groups or shared resources within a team.
* **Focused Membership:** Works in conjunction with organization invites, allowing users to first join the organization and then be guided into specific teams.

{{< alert type="info" title="For Organization-Specific Invitations">}}
If your goal is to invite users only to a specific organization (and not directly to a team as part of the same invitation), please refer to the documentation on [Open Org Invite Link and User Management](https://docs.layer5.io/cloud/identity/users/user-management/).
{{< /alert >}}

### How Open Team Invite Works

1.  **Copy Team Invite Link:** After clicking the relevant UI element, the link is copied to your clipboard.[^1]
2.  **Share Link:** Distribute this copied "Team Invite Link" to the individuals you intend to invite to the team.
3.  **User Onboarding with Team Invite Link:** When a user clicks the "Team Invite Link," the system handles their onboarding as follows:
    * **If the user has no system account:** They are guided through the account registration process. Upon successful registration, they are automatically added to **both** the relevant organization and the specific team.
    * **If the user has a system account but is not in the target organization:** Upon using the link, they are added to **both** the organization and the specific team.
    * **If the user is already in the organization (and has an account):** Upon using the link, they are added to the specific team.
4.  **Manual Alternative:** As an alternative, administrators can always manually add existing organization members to a team.

[^1]: If the direct way to copy this link isn't fully visible or working correctly in the current version, this is a known issue that we plan to fix in an upcoming update.