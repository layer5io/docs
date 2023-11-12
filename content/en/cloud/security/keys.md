---
title: Keys
description: Keys are the atomic unit of access control
date: 2023-10-30
# weight: 3
categories: [Security]
tags: [keys, permissions]
---

In Layer5 Cloud, permissions are represented as keys, each serving as a unique identifier for a specific permission. One or more keys can be grouped together and assigned to a [keychain](/security/keychains). Then this keychain can be assigned to a [role](/security/roles) and that role can be assigned to a user. This is the general flow of how keys are assigned to a user.

For instance, consider a system shipped default key `Create Organization`, which corresponds to the permission to create an organization in the Cloud. This implies that to create an organization, you need to have `Create Organization` key assigned to a keychain, which, in turn, is assigned to a role that's associated with your user account for a given organization.


{{< alert title="Note" >}}

1. Same key can be asssigned to muliple keychains.
2. One or more keys can be assigned to a keychain.
3. Each key is assigned in context of an organization.

{{< /alert >}}


### Keys Enforcement

The primary purpose of key enforcement is to ensure that you can only perform actions for which you have the necessary permissions within the context of an organization you are a member of. This is achieved by disabling or hiding the UI elements associated with actions for which you lack the required permissions. This approach not only provides clarity regarding what actions you are authorized to perform but also prevents you from attempting actions that you do not have authorization to execute.
For more information on managing permissions within an organization and use of organization context switcher, see [Organizations](/identity/organizations).

Each key is enforced at specific UI elements. For instance, the `Create Organization` key is enforced at the **Create Organization** button in the **Organizations** page. This implies that the button is disabled if you don't have the `Create Organization` assigned to a keychain, which, in turn, is assigned to a role that's associated with your user account for a given organization.

