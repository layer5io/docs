---
title: Default User Permissions
description: >
  Where to find the default permissions each role holds, including the User role.
weight: 5
categories: [identity]
tags: [users]
aliases:
  - /cloud/identity/users/default-permissions/

---

The permissions a user holds are the keys from every role they hold in the selected organization. The full matrix of default roles and permissions is [Default Permissions]({{< ref "cloud/reference/default-permissions.md" >}}).

Read that matrix for the User role. These points are easy to get wrong from older summaries:

- The User role holds View Catalog and View Designs. It also holds Leave Team.
- The User role holds the view keys for tokens, sessions, keys, and keychains, plus Create Token and Download Token. See [Tokens]({{< ref "cloud/concepts/identity-and-security/tokens.md" >}}).
- The User role does not hold Invite User to Team, Invite User to Organization, or Assign Roles to Team members.
- The User role does not hold the keys that create, edit, or delete keychains and roles. Those require Provider Admin. See [Keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}).

A check mark with an asterisk on the matrix means the role holds the permission only on resources the user owns.

{{< alert title="Customizable Permissions" type="info" >}}Only a Provider Admin can create or change [keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}) and [roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}). On hosted Layer5 Cloud, Layer5 operates the Provider Admin role, so an organization cannot build a custom permission set itself. On a self-hosted deployment, the operator's Provider Admins can.{{< /alert >}}
