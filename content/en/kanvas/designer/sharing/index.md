---
title: Sharing Designs
description: >
  Share design with other users and use control access to manage design access permissions and visibility.
weight: 3
categories: [Designer]
tags: [designs, collaboration, review]
aliases:
  - /meshmap/designer/share-resource
  - /kanvas/designer/share-resource
---

In Kanvas, you can share your designs with other members of your organization and teams, and you can control access permissions. This page describes the different access types for designs and how to effectively use them.

{{< alert title="Sharing Views">}}
You can share and control access to [Views](/kanvas/operator/views) in the same fashion as you do for Designs.
{{< /alert >}}

## Understanding visibility levels

Designs and Views have visibility statuses that define who can access your designs. These options offer different levels of exposure for content within your workspaces:

- **Private:** Designs or Views with visibility status private defines only you, the creator, and the user or team that have access based on granted access permission can view and edit the design. Other users cannot access it unless you explicitly share it with them.

- **Public:**  Making a design public allows anyone within your organization to view, comment on, and edit the design. This feature is useful for sharing best practices, reference architectures, or contributions within your organization. However, as the owner of the design, you can restrict permissions for individual users or teams by adding and customizing access permissions. We will discuss how you can do this in the next section.

- **Published:**  The published visibility setting is designed for sharing designs with a wider audience. Published designs become discoverable to other users and allow them to view, download, and clone the design. Users can find published designs through [Cloud Catalog](/cloud/catalog) ([open catalog](https://cloud.layer5.io/catalog)).

## Granting access to individual users

As a design owner, you have granular control over access permissions for your designs. You can share your designs with specific users and assign them different access types. This allows you to collaborate effectively while maintaining control over who can view, comment, or edit your designs.
You can share your designs with other users by using the "Share" modal. This modal allows you to grant access to individual users or teams, and you can define the access type for each user or team.

The following steps show how you can grant access to individual users:

- Open your design in Kanvas.
- Click the "Share" button located on the top right corner.
- Enter the name or email addresses of the users you want to share the design with.
- Define the access type for each user (e.g., view, comment, edit). You can choose from predefined options.

You can also change the visibility status between public and private of the design from here.

## Levels of access

When you share a design, you have different access types that you can assign to users or teams for your designs. These access types include:

- **View**: Users with view access can see the design details but cannot modify them.
- **Comment**: Comment access allows users to add comments and suggestions to the design, facilitating discussions and feedback.
- **Edit**: Edit access allows users to modify configurations, add components, deploy design, and essentially alter the design. While Editors have extensive access, they do not have all the privileges of the Owner like deleting designs.
- **Owner**: Owner access grants the highest level of permission, includes all access types available like view, comment and edit. Owners have full control over the design and its settings. However, it's important to note that presently Kanvas does not support transferring the design ownership.

The Owner, Editor, and Viewer access types are hierarchical, meaning that the Owner access includes the edit access, and the Edit access includes the view access.

If there are explicit access type set for a user, that will take precedence and be considered active. Otherwise, the access type assigned to the team will be used if the user is part of team and team has access.

For example, if Sarah has been granted specific access type, that will be active. However, if no specific access permission are set for Sarah, but she's part of a team with access, then the access type of that team will apply to her.

### Revoking access and re-inviting users

You can manage access permissions at any time by revisiting the "Share" modal. This modal allows you to grant access to new users, revoke access or even update the access permissions of current users.

## Share design via link

You can share your design via link, for that revisit the "Share" modal and click on "Copy Link" button. You will be allowed to share the link only if your design's visibility status is public, anyone who click the link or you share with can be able to access your design. It's important to understand that currently making design public allows users to view, comment and edit the design.

This can be useful when you want to share design with multiple users without explicitly giving the access.

## Granting access to multiple users

You can share your designs with many users at the same time, by granting access to any number of teams, which simplifies the process of sharing within your organization. This provides a convenient way to manage permissions for groups of users who are working together on projects or tasks.

Grant access to teams by assigning a team to a workspace. Instead of individually assigning permissions to each member, you can simply assign permissions to the team as a whole, and manage access permissions like view, comment, and edit for the team.

{{< alert title="Implications of adding a Design to a Workspace">}}

When you add design to a workspace, it signifies that all teams associated with that workspace will be allowed to access your designs even if it is private. Review your workspace's team assignments in order to verify which users will be granted access.

Learn more about [auditing and assigning Workspace access](/cloud/spaces/workspaces/).

{{< /alert >}}
