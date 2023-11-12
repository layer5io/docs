---
title: Keychains
description: Keychains are a collection of keys
date: 2023-10-30
# weight: 4
categories: [Security]
tags: [keychains, permissions]
---

In Layer5 Cloud, a collection of permissions is represented as a keychain. One or more keychains can are grouped together and assigned to a [role](/cloud/security/roles). Later, a role can be assigned to a user. This is the general flow of how keychains are assigned to a user.

For instance, consider a system shipped default keychain `Team Management`, which is a collection of eight keys: `View All Teams`, `Add User to Team`, `Invite User to Team`, `Remove User from Team`, `Create Team`, `Delete Team`, `Remove User Role from Team`, and `Assign User Role in a Team`. This implies that you can perform all these operations only if your user account possesses a role to which `Team Management` keychain is assigned in a given organization.

{{< alert title="Note" >}}

1. Same keychain can be asssigned to muliple roles.
2. One or more keychains can be assigned to a role.
3. Each keychain is assigned in context of an organization.

{{< /alert >}}


### Keychains Types

Layer5 Cloud ships with the following 10 default keychains

1. **Provider Management** - This keychain is a collection of keys that allows you to manage providers. For instance, this keychain permits you to view, approve or deny catalog requests.
2. **Security Management** - This keychain is a collection of keys that allows you to manage security. For instance, this keychain permits you to create/delete credentials and tokens.
3. **User View** - This keychain is a collection of keys that allows you to manage users views. For instance, this keychain permits you to view all users within an organization or all environments and connections within a workspace of your organization.
4. **Team View** - This keychain is a collection of keys that allows you to manage team level views. For instance, this keychain permits you to view and edit teams within an organization.
5. **User Management** - This keychain is a collection of keys that allows you to manage users. For instance, this keychain permits you to invite user to a team or remove user from a team.
6. **Organization Management** - This keychain is a collection of keys that allows you to manage organizations. For instance, this keychain permits you to create/delete organizations.
7. **Environment Management** - This keychain is a collection of keys that allows you to manage environments. For instance, this keychain permits you to CRUD operations on environments assigned to your workspace of your organization.
8. **Workspace Management** - This keychain is a collection of keys that allows you to manage workspaces. For instance, this keychain permits you to CRUD operations on workspaces of your organization.
9. **Team Management** - This keychain is a collection of keys that allows you to manage teams. For instance, this keychain permits you to CRUD operations on teams of your organization.
10. **Events Management** - This keychain is a collection of keys that allows you to manage events. For instance, this keychain permits you to view events of all users of the Layer5 Cloud.


### Keychains Management

#### Creating a Keychain

- To create a keychain, navigate to the **Keychains** page and click the **Create Keychain** button.
- Assign relevant keys to the keychain.
- Further, assign the keychain to the relevant user roles to grant specific permissions to users.