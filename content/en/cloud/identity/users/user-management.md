---
title: User Management
description: >
  Learn how to create, add, invite, and manage users within Layer5 Cloud.
weight: 4
categories: [Identity]
tags: [users]
---

This guide outlines methods for creating user accounts, adding users to organizations, inviting new members, and managing user access within Layer5 Cloud to maintain a secure and organized environment.

![User Management options](/cloud/identity/users/org_invite.png)

## Create User Account

Seamlessly initiate new user accounts, ensuring a smooth onboarding process. Specify user details, such as email, and tailor their access by adding them to one or more organizations. Optionally assign roles, defining their scope within the platform. Complete the process by sending a personalized account setup email, streamlining the user's introduction to Layer5 Cloud.

![Create User](/cloud/identity/users/create-user.gif)

{{< alert type="info" title="Permission Required for User Creation" >}}
Only Provider Admins and Organization Admins can create users. For more information, see [Roles](/cloud/security/roles).
{{< /alert >}}

## Add / Remove Existing User

This section explains how to add existing Layer5 Cloud users to one of your organizations or remove them.

![Flow for organization and team membership](/cloud/identity/users/Slide41.svg)

### Adding a User to an Organization

If someone already has a Layer5 Cloud account but isn't part of your organization, you can add them.

1. Go to the Users tab in the Identity section 
2. Click the **Add User** button.
3. Select the organization to which you want to add the user.
4. Select the user from the list of available users.
5. Assign appropriate roles within the organization.

![Add User to Organization](/cloud/identity/users/add-user.gif)

### Removing Users from an Organization

You can remove users from an organization one by one or several at once. This action takes away their membership and access to that specific organization's resources but doesn’t delete their overall Layer5 Cloud account.

#### Method 1: Individual User Removal (One by One)
   * **Locate the User:** Find the specific user you wish to remove from the list.
   * **Use Row Action:** Click the "Remove User" icon.
   * **Confirm:** When prompted, confirm your decision to remove the user from the organization.

#### Method 2: Bulk User Removal (Multiple Users at Once)
   * **Select Users:** Use the checkboxes next to each user's name to select all the users you intend to remove.
   * **Use Bulk Action:** Click the "Delete" button.
   * **Confirm:** When prompted, confirm that you want to remove all the selected users from the organization.

![Removing Users from an Organization](/cloud/identity/users/remove_user.png)

## Invite User via Email

You can invite new or existing users to join one of your organizations by sending them an email invitation.

* **How to Invite:**
    1.  Click the "Invite User" button.
    2.  Enter the person's First Name, Last Name, and Email address.
    3.  Assign them to a target Organization. Optionally, Team(s) and Organization Role(s) they will receive.
    4.  Layer5 Cloud sends an invitation email to the user.
* **What the User Does:** The person you invited will click a link in the email to accept. If they're new to Layer5 Cloud, they'll need to create an account first before they can join your organization.

{{< alert type="info" title="Permissions for Role Assignment" >}}
An Organization Admin can assign organization roles to users, but provider roles can only be assigned by Provider Admins. For more information, see [Roles](/cloud/security/roles).
{{< /alert >}}
