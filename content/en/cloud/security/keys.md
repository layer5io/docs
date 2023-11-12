---
title: Keys
description: Keys are the atomic unit of access control in Layer5 Cloud
date: 2023-10-30
# weight: 3
categories: [Security]
tags: [keys, permissions]
---

## Overview

In Layer5 Cloud, permissions are represented in the form of keys. Each key is a unique identifier that represents a specific permission. For example, the key "17a6fa82-cdab-46db-a7ce-a9d0a1bbf40f" represents the permission to create an organization. Therefore, you can create an organization only if you have this key assigned to you.

Keys are grouped together into a logical construct called a [keychain](/security/keychains). These keychains are then grouped together and assigned to a [role](/security/roles). Afterward, a role is assigned to a user. This is the general flow of how permissions are assigned to a user

{{< alert title="Note" >}}
Same key can be asssigned to muliple keychains.
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

