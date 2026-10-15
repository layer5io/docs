---
title: Roles and Permissions
description: Which permissions each default Layer5 Cloud role holds, who assigns each role, and which default keychains group the permissions.
weight: 20
diataxis: reference
categories: [reference]
tags: [permissions, roles, keychains]
aliases:
  - /cloud/concepts/identity-and-security/roles/academy-roles/
  - /cloud/concepts/identity-and-security/roles/organization-roles/
  - /cloud/concepts/identity-and-security/roles/provider-admin-roles/
  - /cloud/concepts/identity-and-security/roles/team-roles/
  - /cloud/concepts/identity-and-security/roles/user-role/
  - /cloud/concepts/identity-and-security/roles/workspace-roles/
  - /cloud/concepts/identity-and-security/users/default-permissions/
  - /cloud/identity/users/default-permissions/
  - /cloud/security/roles/academy-roles/
  - /cloud/security/roles/organization-roles/
  - /cloud/security/roles/provider-admin-roles/
  - /cloud/security/roles/team-roles/
  - /cloud/security/roles/user-role/
  - /cloud/security/roles/workspace-roles/
---

This page tells you which permissions each default Layer5 Cloud role holds. Use it to find out why an action is missing for a user and which role grants it. For how roles, keychains, and permissions fit together, see [Roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}).

## How permission checks work

A permission is a named key that allows one action, such as Create Team. A keychain groups keys, and a role groups keychains. Layer5 Cloud checks the key, never the role name. Before it runs a guarded action, Cloud resolves the organization the request names, then checks whether the user holds the key through a role in that organization. A user's permissions are the union of the keys from every role the user holds there.

When a user lacks the key, Cloud refuses the request with HTTP 403 and the message "You do not hold the permission this action requires in this organization". The response body is JSON with an `error` message and a `code`.

Provider Admin passes every permission check, in every organization.

## Default roles

| Role | Scope | Assigned by |
|---|---|---|
| Provider Admin | Provider | Provider Admin |
| Kanvas | Provider | Provider Admin. Every new account receives it automatically. |
| Curator | Provider | Provider Admin |
| Organization Admin | Organization | Organization Admin or Provider Admin |
| User | Organization | Organization Admin or Provider Admin |
| Workspace Admin | Organization | Organization Admin or Provider Admin |
| Workspace Manager | Organization | Organization Admin or Provider Admin |
| Academy Admin | Organization | Organization Admin or Provider Admin |
| Academy Learner | Organization | Organization Admin or Provider Admin |
| Team Admin | Team | Team Admin or Provider Admin |

An anonymous user, someone using Kanvas without signing in, receives an internal Anonymous User role. It is not listed and cannot be assigned. See [Permissions by Role]({{< ref "kanvas/reference/permissions.md" >}}) for what anonymous users can do in Kanvas.

The Kanvas role holds no keychains. It makes the Kanvas extension available when a Meshery Server connects to Layer5 Cloud.

## Reading the matrices

The matrices below are refreshed automatically from the Layer5 permission list.

- A check mark means the role holds the permission.
- A check mark with an asterisk means the role holds the permission only on resources the user owns.
- A dash means the role does not hold the permission.

The columns show the roles that hold permissions in the list. "Org Admin" is the Organization Admin role. Workspace Manager, Curator, Kanvas, and the Academy roles have no column; see [Roles outside the matrices](#roles-outside-the-matrices).

### Designs and catalog

{{< keys-matrix caption="Designs" functions="View Designs|Create new design|Import Design|Edit design|Details of design|Delete a design|Download a design|Validate Design|Evaluate Relationships|Deploy Design|Undeploy Design|Publish Design|Unpublish Design" >}}

{{< keys-matrix caption="Catalog" functions="View Catalog|Share Design|Clone Design|View Catalog Requests|Approve Catalog Request|Deny Catalog Request" >}}

### Teams

{{< keys-matrix caption="Teams" functions="View Team|View Teams|View All Teams|Create Team|Edit Team|Delete Team|Add User to Team|Invite User to Team|Remove User from Team|Assign Roles to Team members|Remove Roles from Team members|Open Team Invite|Leave Team" >}}

### Organizations and roles

{{< keys-matrix caption="Organizations" functions="View Org|View Organizations|View All Organizations|Create Organization|Edit Organization|Add User to Organization|Invite User to Organization|Remove User from Organization|Promote or Demote User to Org Admin|Assign Roles to Organization members|Remove Roles from Organization members" >}}

{{< keys-matrix caption="Roles" functions="Assign User Roles" >}}

### Workspaces, environments, and connections

{{< keys-matrix caption="Workspaces" functions="View Workspace|Create Workspace|Edit Workspace|Delete Workspace|Assign team to workspace|Remove team from workspace|Assign environment to workspace|Remove environment from workspace|Assign Designs to Workspaces|Remove Designs from Workspaces" >}}

{{< keys-matrix caption="Environments" functions="View Environment|Create Environment|Edit Environment|Delete Environment|Assign connections to environment|Remove connections from environment" >}}

{{< keys-matrix caption="Connections" functions="View Connections|Add cluster|Change connection state|Delete a connection|View All Kubernetes Clusters" >}}

### Operator, performance, and settings

{{< keys-matrix caption="Operator views" functions="View Views|Assign Views to Workspace|Unassign Views from Workspace" >}}

{{< keys-matrix caption="Performance" functions="View performance profiles|View Results|Add performace profile|Run test|Edit performance test|Delete performance test" >}}

{{< keys-matrix caption="Settings and extensions" functions="View Settings|View Metrics|View Registry|Connect Metrics|Connect adapter|View Extensions|Install extension" >}}

## Roles outside the matrices

| Role | What it holds by default |
|---|---|
| Workspace Manager | The permissions of Workspace Admin for workspaces, environments, teams, and lifecycle actions, plus management of the designs, environments, and connections inside the workspaces where the user holds the role. It does not hold the catalog curation permissions. |
| Curator | No keychains in a default install. Organization Admin and Workspace Admin hold the catalog curation permissions, including approving and denying publish requests. |
| Kanvas | No keychains. See [Default roles](#default-roles). |
| Academy Admin | The Academy management permissions, plus team management and workspace management. |
| Academy Learner | Access to Academy content and registration. |
| Anonymous User | The Kanvas design permissions for people who are not signed in. |

## Default keychains

Each default keychain groups the permissions for one area. Roles hold keychains, so granting a keychain to a role grants every permission in it.

| Keychain | What it groups |
|---|---|
| User View | Permissions for individual users. |
| User Management | Managing users and their roles. |
| Team View | Viewing teams and their members. |
| Team Management | Managing teams and team membership. |
| Organization Management | Managing organizations, their teams, and their users. |
| Events Management | Event management: statistics, audit, and summaries. |
| Security Management | Managing keys, keychains, credentials, and tokens. |

Layer5 Cloud also ships keychains for workspaces, environments, the catalog, lifecycle actions, extensions, settings, performance, views, collaboration, infrastructure, curation, the Academy, and the two Kanvas action sets (Designer Actions and Operator Actions). For keychain behavior, see [Keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}).

## What the matrices do not show

- **Canvas editing.** The permission list omits the per-edit Kanvas permissions, such as adding, deleting, and styling components. See [Permissions by Role]({{< ref "kanvas/reference/permissions.md" >}}) for which Kanvas actions check a permission.
- **Provider Admin.** It holds every permission, including permissions that are not in the list.
- **Plan limits.** A role grants a permission, and the plan decides whether the capability exists for the organization. See [Feature Availability by Plan]({{< ref "cloud/reference/feature-availability.md" >}}).

## Custom roles

A custom role bundles keychains that the default roles do not combine. Only a Provider Admin can create, edit, or delete a custom role. On hosted Layer5 Cloud, Layer5 operates the Provider Admin role, so an organization cannot create custom roles itself. On a self-hosted deployment, the operator's Provider Admins can.

Roles and keychains are defined for the whole Layer5 Cloud deployment, not per organization. Changing the keychains of a role changes that role for every organization that uses it. See [Roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}).
