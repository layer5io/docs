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

### Keychains Management

#### Creating a Keychain

- To create a keychain, navigate to the **Keychains** page and click the **Create Keychain** button.
- Assign relevant keys to the keychain.
- Further, assign the keychain to the relevant user roles to grant specific permissions to users.