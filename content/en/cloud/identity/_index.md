---
title: Identity
description: >
  Organizations, Teams, Users
weight: 3
categories: [Identity]
---

Organizations are the basic unit of multi-tenancy inside of Layer5 Cloud. The identity structure is highly flexible: organizations can have any number of teams, teams can have any number of users, and users can belong to any number of teams and organizations. 

Below is an overview of the core identity components within the Layer5 Cloud.

## [Organizations](organizations)
Organizations serve as the fundamental component of multi-tenancy within the Layer5 Cloud. 

They act as the top-level parent entity. All users and teams ultimately roll up to an organization. While Free plan users are limited to a single default organization, enterprise environments can leverage organizations to strictly isolate resources, billing, and access control across entirely different business units.

## [Teams](teams)
Outside of grouping users together, teams offer controlled access to workspaces and to workspace resources such as environments and managed and unmanaged connections.

Administrators can create teams as child units below the top-level organization. This allows you to apply unique settings, permissions, and workspace access to a specific set of users without altering the parent organization's settings. 

## [Users](users)
Each user account represents an individual collaborator. Individual user accounts exist beyond the bounds of organizations.

Anyone who uses Layer5 Cloud signs into a user account, which acts as your sovereign identity. Your user account can independently own resources such as workspaces, designs, connections, and tokens. Any action taken on the platform—such as creating a design or reviewing a deployment request—is directly attributed to your individual user account, regardless of which teams or organizations you belong to.