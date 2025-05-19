---
title: Organization Management
description: >
    Learn how to 
weight: 1
categories: [Identity]
tags: [orgs]
---

This guide explains how you can manage your Organizations, covering key operations such as creating new organizations, editing existing ones, inviting members, and deleting organizations.

![](/cloud/identity/organizations/org-management/org_overview.png)

{{< alert title="Permissions Required" type="info" >}}
Operations described on this page for managing your Organization typically require Organization Administrator or similar administrative roles. To understand the specific roles needed for each action, please refer to the [Default Permissions reference](https://docs.layer5.io/cloud/reference/default-permissions/).
{{< /alert >}}

## Creating an Organization

An Organization provides a way to structure your teams, users, and resource access for different projects or initiatives.

### How to create an Organization

1.  Go to the **Organizations** section, click the **Add Organization** button
3.  The "Create New Organization" model will appear.
    -   **Organization Name:** Enter a unique name for your new Organization. This is a required field.
    -   **Country (Optional):** Select the country for your Organization.
    -   **Region (Optional):** Select the primary time zone for your Organization.
    -   **Add Organization Members (Optional):** You can begin adding **existing** Layer5 Cloud users to your new Organization in this field.

{{< alert type="warning" title="Unable to Create More Organizations?" >}}
If the "Add Organization" button is disabled, it means your current role does not permit creating additional Organizations. Only users with roles like Organization Administrator or Provider Administrator can create new Organizations.
{{< /alert >}}

![Filling out new Organization details](/cloud/identity/organizations/org-management/create_org.png)

## Editing Your Organization

You can update your Organization's name, location, associated teams, branding, and access its invitation link through the edit settings.

### How to Edit Your Organization

1.  Select the Organization you want to modify and click its **"Edit"** button.
2.  The "Edit Organization" model will open.
    -   **Add Team:** Associate existing Teams with this Organization.
    -   **Theme:** Customize your Organization's visual theme by choosing from the available color swatches.
    -   **Logos:** Upload specific logo versions for different display purposes.
    -   **Invitations:** Access a shareable link to invite users to your Organization.

![Editing Organization Details in Layer5 Cloud](/cloud/identity/organizations/org-management/edit_org.png)

## Using the Open Organization Invitation Link

To invite multiple users to your organization at once, or to allow open sign-ups (for example, for a public community), you can use the "Open Organization Invitation Link." This is a shareable link that lets users join directly.

### When to Use This Link
* **Bulk Onboarding:** To quickly onboard many users without sending individual emails.
* **Public Sign-ups:** To let people sign up openly, for instance, by posting the link on a community page or another public resource.
* **Cross-Organizational Collaboration:** To make it easy for collaborators from other organizations or external partners to join.

### How to Get the Invitation Link
1. Go to your Organization's settings page.
2. Choose the target organization, then click its edit button.
3. Click the "Copy invite link to join your org" option.

![Obtain Organization Invite Link](/cloud/identity/organizations/org-management/org_open_invite.gif)

{{< alert title="Inviting Users to Specific Teams" type="info" >}}
If you want to invite users directly to a specific team within your organization, please refer to the documentation on [Open Team Invites](https://docs.layer5.io/cloud/identity/teams/)
{{< /alert >}}

### How it Works

1.  For New Users (without an existing Layer5 Cloud account):
    * When a new user clicks the invitation link, they will be directed to the sign-up page.
    * After creating their account, they will be automatically added to the organization associated with the invite link.

2.  For Existing Users (with a Layer5 Cloud account):
    * An existing user who clicks the invitation link will be able to join the organization using their current account.[^1]


## Delete

/cloud/identity/organizations/org-management/delete_org.png

普通用户没办法删除

[^1]: Existing users who click this invitation link might encounter a "Page not found" error. This is a temporary bug and is being addressed.