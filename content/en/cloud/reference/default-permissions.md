---
title: Default Permissions
description: >
  List of default permissions granted to the Organizations, Teams and Users roles.
categories: [identity]
tags: [permissions]
---

{{< alert title="Customizable Permissions" type="info" >}}Only a Provider Admin can create or change [keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}) and [roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}). On hosted Layer5 Cloud, Layer5 operates the Provider Admin role, so an organization cannot build a custom permission set itself. On a self-hosted deployment, the operator's Provider Admins can. Changing the keychains of a role changes that role for every organization that uses it.{{< /alert >}}

**Legend:**

- ✅* user must be resource owner in order to perform action.
- ✅ user is allowed to perform action regardless of resource ownership.

<div class="permissions-tabpane">
{{< tabpane text=true >}}
{{< tab header="**Sort by**:" disabled=true />}}
{{< tab header="Categories" lang="en" >}}
{{< csvtable >}}
{{< /tab >}}
{{< tab header="Roles" lang="en" >}}
{{< csvtable-roles >}}
{{< /tab >}}
{{< /tabpane >}}
</div>

## How permission checks work

A permission is a named key that allows one action, such as Create Team. A keychain groups keys, and a role groups keychains. Layer5 Cloud checks the key, never the role name. Before it runs a guarded action, Cloud resolves the organization the request names, then checks whether the user holds the key through a role in that organization. A user's permissions are the union of the keys from every role the user holds there.

When a user lacks the key, Cloud refuses the request with HTTP 403 and the message "You do not hold the permission this action requires in this organization". The response body is JSON with an `error` message and a `code`.

Provider Admin passes every permission check, in every organization.

Keys, keychains, and roles are defined once for the whole deployment. What varies per organization is which roles a user holds there. See [Keys]({{< ref "cloud/concepts/identity-and-security/keys.md" >}}) and [Keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}).

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

An anonymous user, someone using Kanvas without signing in, receives an internal Anonymous User role. It is not listed and cannot be assigned. See [Kanvas reference]({{< ref "kanvas/reference/_index.md" >}}) for what anonymous users can do in Kanvas.

The Kanvas role holds no keychains. It makes the Kanvas extension available when a Meshery Server connects to Layer5 Cloud.

## Roles the matrix columns do not cover

The tables above are refreshed from the Layer5 permission list (`static/data/csv/keys.csv`). A check mark means the role holds the permission. A check mark with an asterisk means the role holds the permission only on resources the user owns. A cross means the role does not hold the permission.

The spreadsheet includes columns for User, Team Admin, Academy Admin, Learner (headed Leaner), Workspace Admin, Org Billing Manager, Org Admin, and Provider Admin. These roles have no column:

| Role | What it holds by default |
|---|---|
| Workspace Manager | The permissions of Workspace Admin for workspaces, environments, teams, and lifecycle actions, plus management of the designs, environments, and connections inside the workspaces where the user holds the role. It does not hold the catalog curation permissions. |
| Curator | No keychains in a default install. Organization Admin and Workspace Admin hold the catalog curation permissions, including approving and denying publish requests. |
| Kanvas | No keychains. See [Default roles](#default-roles). |
| Anonymous User | The Kanvas design permissions for people who are not signed in. |

Academy Admin holds the Academy management permissions, plus team management and workspace management. Academy Learner holds access to Academy content and registration. Both appear as columns in the tables above.

## Default keychains

Layer5 Cloud ships 30 default keychains. Each groups the permissions for one area. Roles hold keychains, so granting a keychain to a role grants every permission in it. The system account owns the default keychains. Only a Provider Admin can change a keychain or assign one to a role, as of Layer5 Cloud v1.0.280.

| Keychain | What it groups |
|---|---|
| User View | Permissions for individual users, including View Tokens, View Sessions, View Keys, and View Keychains. |
| User Management | Managing users and their roles. |
| Team View | Viewing teams and their members. |
| Team Management | Managing teams and team membership. |
| Organization Management | Managing organizations, their teams, and their users. |
| Events Management | Event management: statistics, audit, and summaries. |
| Security Management | Creating, downloading, and deleting API tokens, and managing credentials. Key and keychain management belongs to Provider Management. See [security permission keys]({{< ref "cloud/reference/_index.md#permission-keys" >}}). |

Layer5 Cloud also ships keychains for workspaces, environments, the catalog, lifecycle actions, extensions, settings, performance, views, collaboration, infrastructure, curation, the Academy, and the two Kanvas action sets (Designer Actions and Operator Actions). For keychain behavior, see [Keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}).

## Profile permissions

The profile permissions are not yet rows in the permission list. They are held by default as follows:

| Permission | Held by |
| --- | --- |
| View Profiles | User, Team Admin, Workspace Admin, Organization Admin |
| Create Profile, Edit Profile, Delete Profile | Workspace Admin, Organization Admin |
| Assign profile to workspace, Remove profile from workspace | Workspace Admin, Academy Admin, Organization Admin |

Provider Admin holds all six. The owner of a profile can read it without View Profiles, and can edit it and its connection links without Edit Profile. People using Kanvas without signing in hold none of them. See [Profiles]({{< ref "cloud/concepts/spaces/profiles.md" >}}).

## What the matrix does not show

- **Security keys.** Token, session, key, and keychain keys are not all rows in this spreadsheet. See [security permission keys]({{< ref "cloud/reference/_index.md#permission-keys" >}}).
- **Canvas editing.** The permission list omits the per-edit Kanvas permissions, such as adding, deleting, and styling components. See [Kanvas reference]({{< ref "kanvas/reference/_index.md" >}}) for which Kanvas actions check a permission.
- **Provider Admin.** It holds every permission, including permissions that are not in the list.
- **Plan limits.** A role grants a permission, and the plan decides whether the capability exists for the organization. See [Feature availability by plan]({{< ref "cloud/reference/_index.md#feature-availability-by-plan" >}}).

## Custom roles

A custom role bundles keychains that the default roles do not combine. Only a Provider Admin can create, edit, or delete a custom role, or change an existing role. The server refuses everyone else with HTTP 403. On hosted Layer5 Cloud, Layer5 operates the Provider Admin role, so an organization cannot create custom roles itself. On a self-hosted deployment, the operator's Provider Admins can.

Roles and keychains are defined for the whole Layer5 Cloud deployment, not per organization. Only a Provider Admin can create, edit, or delete a keychain, change its keys, or assign a keychain to a role. Changing the keychains of a role changes that role for every organization that uses it. See [Roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}).

The plan catalog lists Custom Roles and User-defined Roles as packaged capabilities. Layer5 Cloud does not check your plan when a custom role is created. It checks that the caller is a Provider Admin.
