---
title: Keychains
description: Keychains are a collection of keys
weight: 2
categories: [Security]
tags: [keychains, permissions]
---

In Layer5 Cloud, a collection of permissions is represented as a keychain. One or more keychains can are grouped together and assigned to a [role](/cloud/security/roles). Later, a role can be assigned to a user. This is the general flow of how keychains are assigned to a user.

For instance, consider a system shipped default keychain `Team Management`, which is a collection of eight keys: `View All Teams`, `Add User to Team`, `Invite User to Team`, `Remove User from Team`, `Create Team`, `Delete Team`, `Remove User Role from Team`, and `Assign User Role in a Team`. This implies that you can perform all these operations only if your user account possesses a role to which `Team Management` keychain is assigned in a given organization.

{{< alert title="Note" >}}

1. Same keychain can be asssigned to multiple roles.
2. One or more keychains can be assigned to a role.
3. Each keychain is assigned in context of an organization.

{{< /alert >}}


### Keychains Types

Layer5 Cloud ships with the following 10 default keychains

<!-- TODO: Create separate page to explain in detail about each of the default keys assigned to the following default keychains. -->

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

#### Create Keychains

Create a new keychain by navigating to the [Keychains](https://cloud.layer5.io/security/keychains) page and clicking the **Create Keychain** button. Provide a name and choose the one more keys from the list of available keys. Then click the **Create Keychain** button to create the keychain.


{{< alert title="Note" >}}

If you don't have permission to create keychains for your selected organization, you will see a disabled Keychains tab. In that case, consider switching to a different organization for which you have permission to view keychains, or contact your organization admin to assign you access to the keychains page.
{{< /alert >}}


#### View Keychains

Review keychains assigned to your user account by navigating to the [Keychains](https://cloud.layer5.io/security/keychains) page.

{{< alert title="Note" >}}

If you don't have permission to view keychains for your selected organization, you will see a disabled Keychains tab. In that case, consider switching to a different organization for which you have permission to view keychains, or contact your organization admin to assign you access to the keychains page.

{{< /alert >}}

#### Assign Keychains

1. Select the organization for which you wish to assign keychains to users. You can do this by selecting the organization from the organization context switcher in the top navigation bar.
2. Navigate to the [Roles](https://cloud.layer5.io/security/roles) page.
3. Choose from the existing set of roles or create a new role to which you want to assign the keychain. For more information, see [Roles](/cloud/security/roles).
4. Navigate to [Users](https://cloud.layer5.io/identity/users) page.
5. Select the user to whom you want to assign the role with a new set of permissions. Alternatively, you can invite a new user and assign the role with the new set of permissions separately. For more information, see [Users](/cloud/identity/users).

{{< alert title="Note" >}}

If you don't have permission to perform any of the above operations, consider switching to a different organization for which you are authorized to perform these actions. Alternatively, contact your organization admin for elevated access.

{{< /alert >}}


{{< alert title="Permission Assignment at Teams, Organization and Provider Levels" >}}

1. You need to have the default `Team Admin` role (or a custom role with `Edit User` key assigned) to assign permissions to users in your team.
2. You need to have the default `Organization Admin` role (or a custom role with `Edit User` key assigned) to assign permissions to users in your organization.
3. You need to have default `Provider Admin` role (or a custom role with `Update Profile` key assigned) to assign permissions to users across any organization or teams.

{{< /alert >}}


### Keychains Lifecycle

Layer5 Cloud ships with 10 default keychains, each designed to enforce permissions across the platform. These default keychains are mutable, that is, you can add or remove keys from these keychains (provided you have permission to Edit a Keychain). Separately, you can also create your own keychains and assign them to roles.

{{< alert title="Best Practice" >}}

It is recommended not to alter the existing default keychains unless you intend to change permissions across the entire platform, affecting all users regardless of their organization. This is because the default keychains are assigned to default roles, and each new user is assigned a default role.

If you wish to change the permission for a specific organization, consider creating a new keychain and assigning it to a role. Then assign the role to the users of that organization.

{{< /alert >}}