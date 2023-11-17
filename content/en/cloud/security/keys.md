---
title: Keys
description: Keys are the atomic unit of access control
date: 2023-10-30
# weight: 3
categories: [Security]
tags: [keys, permissions]
---

In Layer5 Cloud, permissions are represented as keys, each serving as a unique identifier for a specific permission. One or more keys can be grouped together and assigned to a [keychain](/cloud/security/keychains). Then this keychain can be assigned to a [role](/cloud/security/roles) and that role can be assigned to a user. This is the general flow of how keys are assigned to a user.

For instance, consider a system shipped default key `Create Organization`, which corresponds to the permission to create an organization in the Cloud. This implies that to create an organization, you need to have `Create Organization` key assigned to a keychain, which, in turn, is assigned to a role that's associated with your user account for a given organization.

{{< alert title="Note" >}}

1. Same key can be asssigned to muliple keychains.
2. One or more keys can be assigned to a keychain.
3. Each key is assigned in context of an organization.

{{< /alert >}}

### Keys Types

Generally, there are four types of keys:

1. **Create** - Create keys permit you to create resources. For example, `Create Organization` key allows you to create an organization.
2. **Read** - Read keys permit you to access and retrieve resources. For example, `View All Teams` key lets you see all the teams within a selected organization.
3. **Update** - Update keys permit you to update resources. For instance, `Update Organization` key allows you to update an organization details.
4. **Delete** - Delete keys permit you to delete resources. For instance, `Delete Organization` key allows you to delete an organization.

There are also some special types of keys which don't fall into the standard CRUD (CREATE, READ, UPDATE, DELETE) category. For example, the `Approve Catalog Request` key allows you to approve a catalog request to publish a cloud native design to [Cloud Catalog](/cloud/catalog) or `Connect Github Account to Workspace` key enables you to connect your GitHub Account to your [workspace](/cloud/workspaces) in context of any organization.


### Keys Enforcement

The primary purpose of key enforcement is to ensure that you can only perform actions for which you have the necessary permissions within the context of your selected/available organization. This is achieved by disabling or hiding the UI elements associated with actions for which you lack the required permissions. This approach not only provides clarity regarding what actions you are authorized to perform but also prevents you from attempting actions that you do not have authorization to execute.
For more information on managing permissions within an organization and use of organization context switcher, see [Organizations](/cloud/identity/organizations).

Each key is enforced at specific UI elements. For instance, the `Create Organization` key is enforced at the **Create Organization** button in the **Organizations** page. This implies that the button is disabled if you don't have the `Create Organization` assigned to a keychain, which, in turn, is assigned to a role that's associated with your user account for a given organization.


### Keys Management

#### View Keys

Review Keys assigned to your user account by navigating to the [Keys](https://cloud.layer5.io/security/keys) page.

{{< alert title="Note" >}}

If you don't have permission to view keys for your selected organization, you will see a disabled Keys tab. In that case, consider switching to a different organization for which you have permission to view keys, or contact your organization admin to assign you access to the keys page.

{{< /alert >}}

#### Assign Keys

1. Select the organization for which you wish to assign keys to users. You can do this by selecting the organization from the organization context switcher in the top navigation bar.
2. Navigate to [Keychains](https://meshery.layer5.io/security/keychains) page.
3. Choose from the existing set of keychains or create a new keychain to which you want to assign keys. For more information, see [Keychains](/cloud/security/keychains).
4. Choose one more of your desired keys from the list of available keys.
5. Navigate to the [Roles](https://cloud.layer5.io/security/roles) page.
6. Choose from the existing set of roles or create a new role to which you want to assign the keychain. For more information, see [Roles](/cloud/security/roles).
7. Navigate to [Users](https://cloud.layer5.io/identity/users) page.
8. Select the user to whom you want to assign the role with a new set of permissions. Alternatively, you can invite a new user and assign the role with the new set of permissions separately. For more information, see [Users](/cloud/identity/users).

{{< alert title="Note" >}}

If you don't have permission to perform any of the above operations, consider switching to a different organization for which you are authorized to perform these actions. Alternatively, contact your organization admin for elevated access.

{{< /alert >}}

{{< alert title="Permission Assignment at Teams, Organization and Provider Levels" >}}

1. You need to have the default `Team Admin` role (or a custom role with `Edit User` key assigned) to assign permissions to users in your team.
2. You need to have the default `Organization Admin` role (or a custom role with `Edit User` key assigned) to assign permissions to users in your organization.
3. You need to have default `Provider Admin` role (or a custom role with `Update Profile` key assigned) to assign permissions to users across any organization or teams.

{{< /alert >}}

### Keys Lifecycle

Layer5 Cloud ships with 103 default keys, each designed to enforce permissions across the platform. All the keys shipped with the system are immutable and cannot be deleted or modified. Each key is uniquely identified in the form of a UUID. The UUID is used to reference the key in the system.

