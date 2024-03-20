---
title: Sharing Designs
description: >
  Share design with other users and use control access to manage design access permissions and visibility.
weight: 3
categories: [Designer]
tags: [designs, collaboration, review]
---

## Overview

In Meshmap, you can share your designs or design that you have permission to share with other members of your organization and teams and can control over access permissions. This page describes control access permissions for designs and how to effectively use them.

{{< alert title="Note">}}
- You can share and use control access to manage views permissions and visibility also with same methods.
{{< /alert >}}

## Visibility

Designs and Views have visibility status which defines who can access your designs. These options provide different levels of exposure for your designs:

- **Private:** Designs or Views with visibility status private defines only you, the creator, and the user or team that have access based on granted access permission can view and edit the design. Other users cannot access it unless you explicitly share it with them.

- **Public:**  Making a design public allows anyone within your organization to view, comment on, and edit the design. This feature is useful for sharing best practices, reference architectures, or contributions within your organization. However, as the owner of the design, you can restrict permissions for individual users or teams by adding and customizing access permissions. We will discuss how you can do this in the next section.

- **Published:**  The published visibility setting is designed for sharing designs with a wider audience. Published designs become discoverable to other Meshery users and allows them to view, download and clone the design. Users can find published designs through [Meshery Catalog](https://meshery.io/catalog) and catalog tab within MeshMap.

## Granting access for Individual Users

As a design owner, you have granular control over access permissions for your designs. 

Following steps shows how you can grant access to individual users:

- Open your design in MeshMap.
- Click the "Share" button located on top right corner.
- Enter the name or email addresses of the users you want to share the design with.
- Define the permission level for each user (e.g., view, comment, edit). You can choose from predefined options.

You can also change visibility status between public and private of design from here. 

## Permission Levels and their Impact:

Meshmap by default provides you various access permissions for your design that you can grant to other users or team.

- View: Users with view access can see the design details but cannot modify them.
- Comment: Comment access allows users to add comments and suggestions to the design, facilitating discussions and feedback.
- Edit: Edit access allows users to modify configurations, add components, deploy design, and essentially alter the design. While Editors have extensive access, they do not have all the privileges of the Owner like deleting designs.
- Owner: Owner role grants the highest level of access, includes all permissions available like view, comment and edit. Owners have full control over the design and its settings. However, it's important to note that presently Meshmap does not support transferring the design ownership.

The Owner, Editor, and Viewer access permissions are hierarchical, meaning that the Owner permissions includes the edit permission, and the Edit permission includes the view permission. 

If there are explicit access permission set for a user, that will take precedence and be considered active. Otherwise, the permissions assigned to the team will be used if the team has access.

For example, if Sarah has been granted specific access permission, that will be active. However, if no specific access permission are set for Sarah, but she's part of a team with access, then the permissions of that team will apply to her.

## Revoking, and Re-inviting Access:

You can manage access permissions at any time by revisiting the "Share" modal. This modal allows you to grant access to new users, revoke access or even update the access permissions of current users.

## Share design via link

You can share your design by copying the link 

{{< alert title="Note">}}
- The 'Share' feature is currently in its beta phase, and we may introduce updates or improvements over time.
- Your feedback is invaluable! If you encounter any issues or have suggestions for enhancement, please take a moment to provide feedback.
{{< /alert >}}
