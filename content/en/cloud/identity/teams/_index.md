---
title: Teams
description: >
  Outside of grouping users together, teams offer control access to workspaces and to workspace resources such as environments and managed and unmanaged connections.
categories: [Identity]
tags: [teams]
---

Organizations are the basic unit of multi-tenancy inside of Layer5 Cloud. Organizations can have any number of teams. Teams can have any number of users. Users can belong to any number of teams. Users may belong to any number of organizations.

Outside of grouping users together, teams offer control access to workspaces and to workspace resources such as environments and managed and unmanaged connections.

## Example: Orbital Labs Teams

The following teams illustrate how organizations use teams to segment access and responsibilities. Follow the full story at [Meet Five and the Cast](/cloud/about).

<img src="/images/five/team-of-fives.svg" alt="Team of Fives" style="width:120px; float:right; margin-left:1.5rem; margin-bottom:1rem;" />

{{< cardpane >}}
{{% card header="**Infrastructure Team**" %}}
**Organization:** Orbital Labs  
**Team Admin:** Zara Osei  
**Members:** Five

Controls access to production and staging workspaces (`orbital-production`, `orbital-staging`). Zara manages the keychain permission matrix and approves environment assignments. Five handles day-to-day platform operations and occasionally discovers undocumented feature behavior.
{{% /card %}}
{{% card header="**Development Team**" %}}
**Organization:** Orbital Labs  
**Team Admin:** Maya Chen *(also Org Admin)*  
**Members:** Rex Park, Jordan Reyes

Controls access to the development workspace (`orbital-dev`). Rex deploys often; Jordan designs infrastructure that is architecturally ambitious. Maya ensures neither of them touches production on a Friday afternoon.
{{% /card %}}
{{< /cardpane >}}

{{< alert type="info" >}}
An Org Admin may also serve as a Team Admin — Maya Chen holds both roles at Orbital Labs. See [Roles](/cloud/security/roles/) for more on how role assignments stack.
{{< /alert >}}

## Add a Team

To apply different settings to a set of users, create a child new team below your top-level organization and place them in it. You can then apply unique settings to that team, like access to a workspace and their a specific set of environments.

A team is simply a group that an administrator can create in the Google Admin console to apply settings to a specific set of users. By default, all users are placed in the top-level (parent) organizational unit. Child organizational units inherit the settings from the parent, but can be changed to fit the needs of the child organizational unit.

Below the top-level organization, you can add as many teams as you want - at the same level. Hierarchal teams are not currently supported. When you change a setting at the higher level organization, the settings for all child teams that inherit that setting also change. Custom settings at the team level, however, remain unchanged.

>Learn more about the [organizational structure](/cloud/identity). 

{{< alert type="info" title="Team Ownership">}}
If you are the current team owner, you can’t remove yourself from the team until you transfer ownership to another team administrator.
{{< /alert >}}

## Open Team Invite

The "Open Team Invite" feature allows administrators to use shareable "Team Invite Links" for users to join a particular team. This link-based invitation method functions much like an [Open Org Invite Link](https://docs.layer5.io/cloud/identity/organizations/org-management/), but is tailored for team-specific invitations and provides a direct alternative to adding members manually.

![Process of open team invite](/cloud/identity/teams/open_team_invite.gif)

### When to Use

- **Large-Scale Member Recruitment:** Efficiently integrate many new members into project teams, especially during organizational expansion.

- **Structured Self-Service Enrollment:** Supports efficient, self-service team setup for urgent initiatives (e.g., agile sprints, training cohorts).

{{< alert type="info" title="For Organization-Specific Invitations">}}
If your goal is to invite users only to a specific organization (and not directly to a team as part of the same invitation), please refer to the documentation on [Open Org Invite Link and User Management](https://docs.layer5.io/cloud/identity/organizations/org-management/).
{{< /alert >}}

### How it Works

1. **Copy Team Invite Link:** Click the **copy** button to get the "Team Invite Link".[^1]
2.  **User Onboarding with Team Invite Link:** When a user clicks the "Team Invite Link," the system handles their onboarding as follows:
    * **If the user has no system account:** They are guided through the account registration process. Upon successful registration, they are automatically added to **both** the relevant organization and the specific team.
    * **If the user has a system account but is not in the target organization:** Upon using the link, they are added to **both** the organization and the specific team.
    * **If the user is already in the organization (and has an account):** Upon using the link, they are added to the specific team.
3.  **Manual Alternative:** As an alternative, administrators can always manually add existing organization members to a team.

[^1]: If the direct way to copy this link isn't fully visible or working correctly in the current version, this is a known issue that we plan to fix in an upcoming update.