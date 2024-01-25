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

Learn more about the [organizational structure](/cloud/identity).

{{< alert type="info" title="Note">}}
If you are the current team owner, you can’t remove yourself from the team until you transfer ownership to another team administrator.
{{< /alert >}}