---
title: Keys
description: Keys are the atomic unit of access control
date: 2023-10-30
# weight: 3
categories: [Security]
tags: [keys, permissions]
---

In Layer5 Cloud, permissions are represented as keys, each serving as a unique identifier for specific permissions. One or more keys can be grouped together and assigned to a [keychain](/security/keychains). Then this keychain can be assigned to a [role](/security/roles) and that role can be assigned to a user. This is the general flow of how keys are assigned to a user.

For instance, consider a system shipped default key `Create Organization`, which corresponds to the permission to create an organization in the Cloud. This implies that to create an organization, you need to have `Create Organization` key assigned to a keychain, which, in turn, is assigned to a role that's associated with your user account for a given organization.


{{< alert title="Note" >}}

1. Same key can be asssigned to muliple keychains.
2. One or more keys can be assigned to a keychain.
3. Each key is assigned in context of an organization.

{{< /alert >}}





### Flow of 

### Key Name

- It provides the clearest indication of the key's purpose.


### Category

- These are the top-level categories that broadly define the primary functions or features associated with keys. For example:

  - Workspace Management: Handling workspace-related tasks.
  - Security Management: Managing security-related tasks.

### Subcategory

- The subcategory specifies the context or category to which the key belongs. For example:

   - Workspace Management > Environments:
      Under the Workspace Management category, the Environments subcategory is used to manage environments.

### Description

- The description provides a more detailed explanation of the key's role.

