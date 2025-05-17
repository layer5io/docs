---
title: User Management
description: >
  Efficiently manage and organize users within Layer5 Cloud with our comprehensive user management capabilities.
weight: 4
categories: [Identity]
tags: [users]
---

Effectively managing users is crucial for maintaining a secure and organized Layer5 Cloud environment. This guide outlines the various methods available for user creation, addition to organizations, and invitations.


![Org Invite](/cloud/identity/users/org_invite.png)

## Create User Account

Seamlessly initiate new user accounts, ensuring a smooth onboarding process for individuals new to Layer5 Cloud. As an administrator, you can specify user details and tailor their initial access.

* **Process:** The administrator directly fills out a form with the new user's details.
* **Information Required:** Typically includes First Name, Last Name, Email ID, the Organization(s) to assign, Organization Role(s), and any applicable Provider Role Names.

![Create User](/cloud/identity/users/create-user.gif)

{{< alert type="info" title="Note" >}}
Only Provider Admins and Organization Admins can create users. For more information, see [Roles](/cloud/security/roles).
{{< /alert >}}

## Add User to Organization / Remove User

This section covers adding **existing** Layer5 Cloud users to a specific organization or removing them.

![Flow for organization and team membership](/cloud/identity/users/Slide41.svg)

### Adding a User to an Organization
This option is used to grant an existing Layer5 Cloud user membership into one of your organizations if they are not already a part of it.

1.  Navigate to the **Users** tab in the Identity section (or directly within an Organization's member settings).
2.  Click the **Add User** button (or a similar option to manage organization members).
3.  Select or confirm the organization to which you want to add the user.
4.  Search for and select the user from the list of available Layer5 Cloud users (e.g., by email or username).
5.  Assign appropriate roles within the organization.

![Add User to Organization](/cloud/identity/users/add-user.gif)

### Removing Users from an Organization

You have the flexibility to remove users from an organization individually or multiple users at once. This action revokes their membership and access to that specific organization's resources but typically does not delete their overall Layer5 Cloud account.

#### Method 1: Individual User Removal (One by One)
   * **Locate the User:** Find the specific user you wish to remove from the list.
   * **Use Row Action:** Each user row typically has a "Remove" icon. Click this icon for the user you want to remove.
   * **Confirm:** A confirmation prompt will appear. Confirm the action to remove the user from the organization.

#### Method 2: Bulk User Removal (Multiple Users at Once)
   * **Select Users:** Use the checkboxes next to each user's name to select all the users you intend to remove.
   * **Use Bulk Action:** After selecting the users, a bulk action option will typically become active. Click this button.
   * **Confirm:** A confirmation prompt will appear, often listing the number of users selected for removal. Confirm the action to remove all selected users from the organization simultaneously.

![Removing Users from an Organization](/cloud/identity/users/remove_user.png)

## Invite User via Email

Invite new or existing users to join one of your organizations by sending a direct email invitation. This method allows for personalized onboarding.

* **Process:**
    1.  An administrator accesses the "Invite User" feature, typically from the User Management area or an Organization's member page.
    2.  The administrator fills in the prospective member's First Name, Last Name, and Email address.
    3.  They assign the target Organization, and optionally, specific Team(s) and Organization Role(s) that the user will have upon accepting the invitation.
    4.  An invitation email is sent to the user.
* **User Action:** The recipient clicks a link in the email to accept the invitation. If they are new to Layer5 Cloud, they will be prompted to create an account first before joining the organization.

{{< alert type="info" title="Note" >}}
An Organization Admin can assign organization roles to users, but provider roles can only be assigned by Provider Admins. For more information, see [Roles](/cloud/security/roles).
{{< /alert >}}

## Using the Open Organization Invitation Link

Beyond direct methods, Layer5 Cloud provides a convenient way to invite multiple users to join your organization using a shareable "Open Organization Invitation Link". This link allows users to request access or be directly added to your organization, streamlining the onboarding process, especially for larger groups or public communities.

### Why you should use this
* **Bulk Onboarding:** Efficiently invite multiple new users at once without sending individual invitations.
* **Public Sign-ups:** Post the link on a community page or public resource to allow open sign-ups to your organization.
* **Cross-Organizational Collaboration:** Simplify access for collaborators from different organizations or external partners.

### Obtaining the Invitation Link
To get the invitation link for your organization:
1.  Navigate to your **Organization's settings** page in Layer5 Cloud.
2.  Find the section related to user invitations or organization membership (often labeled "Invitations" or similar).
3.  Look for an option like **"Copy invite link to join your org"** and click it.

![Obtain Organization Invite Link](/cloud/identity/users/org_open_invite.gif)

 {{< alert title="Inviting Users to Specific Teams" type="info" >}}
If you want to invite users directly to a specific team within your organization, please refer to the documentation on [Open Team Invites](https://docs.layer5.io/cloud/identity/teams/)
{{< /alert >}}

### How it Works

1.  For New Users (without an existing Layer5 Cloud account):
    * When a new user clicks the invitation link, they will be directed to the sign-up page.
    * After creating their account, they will be automatically added to the organization associated with the invite link.

2.  For Existing Users (with a Layer5 Cloud account):
    * An existing user who clicks the invitation link will be able to join the organization using their current account.^1

This Open Organization Invitation Link feature is designed to make expanding your Layer5 Cloud organization straightforward and efficient.

[^1]: **Known Issue for Existing Users:** Existing users who click this invitation link might encounter a "Page not found" error. The intended behavior is for users to be seamlessly prompted to join the organization with their existing account. This is a temporary bug and is being addressed.