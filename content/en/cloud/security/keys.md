---
title: Keys
description: Keys are the atomic unit of access control
date: 2023-10-30
# weight: 3
categories: [Security]
tags: [keys, permissions]
---

In Layer5 Cloud, permissions are represented as keys, each serving as a unique identifier for specific permissions. For instance, the `Create Organization` key corresponds to the permission to create an organization in the Cloud. This means that you can create an organization only if you have been assigned this key.

Keys are grouped together and assigned to a [keychain](/security/keychains). These keychains are then grouped together and assigned to a [role](/security/roles). Later, a role can be assigned to a user. This is the general flow of how keys are assigned to a user.

{{< alert title="Note" >}}
1. Same key can be asssigned to muliple keychains.
2. One or more keys can be assigned to a keychain.
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

