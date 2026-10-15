---
title: Child Organizations
description: >
    Create organizations inside an organization, see who can view and administer them, and understand what a parent administrator can and cannot do in a child.
weight: 3
categories: [Identity]
tags: [orgs]
---

A **child organization** is an organization created inside another organization, called its **parent**. A child is otherwise an ordinary organization: it has its own members, teams, workspaces, invitations, domain, and credentials. The parent relationship adds one thing, which is that administrators of the parent can manage the child's settings and membership from the parent.

{{< alert title="Permissions Required" type="info" >}}
Creating a child organization requires the **Create Organization** permission in the parent. Seeing the list of a parent's children requires **View Organizations** in the parent. Editing, deleting, or adding members to a child from the parent requires the Organization Administrator or Owner role in the parent. To understand the specific roles needed for each action, please refer to the [Default Permissions reference](https://docs.layer5.io/cloud/reference/default-permissions/).
{{< /alert >}}

## How Organizations Nest

- An organization can have any number of child organizations.
- A child can have child organizations of its own, and those can have children of their own. There is no limit on depth.
- Every top-level organization sits directly under the **provider organization** of your Layer5 Cloud deployment. The provider organization is never itself a child, and it does not appear in the child organizations section.
- A child belongs to exactly one parent. A child cannot be moved to another parent after it is created.

A parent administers its **direct** children only. An administrator of a grandparent does not administer a grandchild by virtue of that role; the administrator of the intermediate organization does.

## Creating a Child Organization

Any member holding the **Create Organization** permission in the parent can create a child. The creator becomes an Organization Administrator of the new child.

1.  Switch to the parent organization.
2.  Go to the Organizations page and find the **Child organizations** section.
3.  Use the create control in that section and fill in the same details you provide for any organization: name, country, region, and description.

The parent is always the organization you have selected, so there is no parent field to fill in. If you do not see a create control, your role in the parent does not include **Create Organization**.

## Viewing Child Organizations

The **Child organizations** section on the Organizations page lists the direct children of the selected organization, showing each child's **name**, **description**, and **domain**. It appears for anyone holding **View Organizations** in the selected organization, and it does not appear when you have the provider organization or all organizations selected.

{{< alert title="Seeing a Child Is Not Joining It" type="info" >}}
Being able to see the list of children does not make you a member of any child. You do not see a child's members, invitations, or other settings from the list, and the child does not appear in your organization switcher unless you are a member of it.
{{< /alert >}}

## What a Parent Administrator Can Do

An Organization Administrator or Owner of the parent can manage a direct child from the parent, without joining the child. From the parent, they can:

-   **Edit the child's settings**, using the edit action on the child's row.
-   **Add members to the child.** The **Child organizations** section has no add-member control, so this is done through the existing add-member API for the child.
-   **Search the child's members.**
-   **Delete the child**, using the delete action on the child's row, provided the child has no child organizations of its own (see [Deleting Organizations That Have Children](#deleting-organizations-that-have-children)).

This access is read from the parent administrator's role in the parent on every request. Removing someone as an Organization Administrator of the parent ends their access to the settings of every child at once, with nothing to clean up in the children.

## What a Parent Administrator Cannot Do

Governing a child does not make the parent administrator a member of it. Anything inside the child still requires membership in the child and the usual role there, including:

-   workspaces, environments, connections, and credentials,
-   teams,
-   identity providers,
-   the mail server.

To work inside a child, a parent administrator must be added to it as a member like anyone else. Holding a permission such as Edit Organization in the parent does not grant that permission in the child.

## Switching into a Child

The organization switcher lists only the organizations you are a member of. A parent administrator who is not a member of a child can edit that child's settings from the parent but cannot switch into it. The creator of a child is a member of it from the start, so the creator can switch into it right away. Other members of the parent do not appear in the child until someone adds them to it. See [Navigating Organizations](../navigating-organizations/) for how the switcher and the active organization work.

## Deleting Organizations That Have Children

An organization that still has child organizations cannot be deleted. The request is refused and nothing is deleted. Delete the children first, starting with the deepest, and then delete the parent. Children are never deleted along with their parent and are never moved to another parent.

Deleting a child removes it as described in [Deleting Your Organization](../#deleting-your-organization).
