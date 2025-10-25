---
title: Using Academy Content Template Creator
weight: 6
description: >
  
categories: [Academy]
tags: [Academy]
aliases: 
- /cloud/academy/using-academy-content-template-creator
- /cloud/academy/using-content-template-creator
- /cloud/academy/academy-content-template-creator-guide
---

The Academy Content Template Creator is a step-by-step wizard that helps you create structured templates for your Academy content. This generator streamlines the process of
creating learning paths, challenges, and certifications by collecting all necessary metadata and generating a ready-to-use template.


## Getting Started
![Academy Content Template Creator](images/template-creator.png)
1. Access the Creator: Click on the "Create New Content" card in your Academy dashboard
2. Create Your Content: The wizard will guide you through **5 essential steps** to create your content template

Since it's straightforward, let's walk through a practical example to demonstrate the process.

## Example: Creating "Meshery Contributors Certification"

This example demonstrates how to use the **Academy Content Template Creator** to build a **certification** program for **Meshery contributors**. Each step shows what information to enter, followed by specific example values.

### Step 1: Basic Information
![Step 1: Basic Information](images/template-creator-step1.png)
- Type: Choose "Certification" from Learning Path, Challenge, or Certification
- Title: "Meshery Contributors Certification"
- Description: "A comprehensive certification program for developers looking to become active contributors to Meshery"

### Step 2: Content Details
![Step 2: Content Details](images/template-creator-step2.png)
<!-- - Level: Intermediate (assumes basic cloud-native knowledge) -->
- Categories: "open-source, cloud-native"
- Add Tags: "meshery", "kubernetes", "golang", "contribution", "open-source"
- Banner Image: "images/meshery-contributors-banner.svg"

### Step 3: Content Access
![Step 3: Content Access](images/template-creator-step3.png)
- Workspace: "Meshery Academy"
- Team: "Contributors Program"
- Access Status: Enabled
- Content Access End Date: Leave blank for permanent access (Meshery always welcomes contributors)

**Understanding Access Status: Enabled vs Disabled**

The Access Status setting in Step 3 controls the visibility and accessibility of your Academy content to users.

**Enabled Status Behavior:**
- **Visible**: Content appears in Academy catalogs and search results
- **Accessible**: Users with proper permissions can view and interact with the content
- **Active**: All features work normally (enrollment, progress tracking, badge awarding)
- **Discoverable**: Content shows up in filtered searches and category browsing

**Disabled Status Behavior:**
- **Hidden**: Content does not appear in public Academy catalogs
- **Inaccessible**: Users cannot access the content even with direct links
- **Inactive**: No progress tracking or badge awarding occurs
- **Non-discoverable**: Content is excluded from search results and browsing

**For the Meshery Contributors Certification example:**

*If Enabled:*
- Contributors can immediately find and enroll in the certification
- Progress tracking begins upon enrollment
- Badge is awarded upon successful completion
- Content appears in the Contributors Program workspace

*If Disabled:*
- Certification is hidden from the Contributors Program
- No new enrollments possible
- Existing progress is paused
- Content remains invisible until re-enabled

### Step 4: Recognition
![Step 4: Recognition](images/template-creator-step4.png)

The Recognition step defines the badge or certificate awarded upon completion. You have two options:
- **Use Existing Recognition**: Choose from the Layer5 collection
- **Create New Recognition**: Design a custom badge with an image URL

**For our example:**
- Create a "Meshery Contributor" badge with the Meshery logo


### Step 5: Generate Template
![Step 5: Generate Template](images/template-creator-step5.png)

After clicking "Continue" in Step 4, a success notification appears in the bottom-right corner confirming your template has been created successfully.

{{< alert type="info" title="Navigation Between Steps" >}}
You can navigate back to any previous step to make modifications. When you return to earlier steps and make changes, your entries in the subsequent steps will remain intact.
{{< /alert >}}


**Generated Template Output for Meshery Contributors Certification:**

This template provides the YAML front matter metadata for static site generators (like Hugo/Jekyll). After copying it, we can directly create new content files in our Academy repository.

```yaml
---
type: "certification"
title: "Meshery Contributors Certification"
description: "A comprehensive certification program for developers looking to become active contributors to Meshery"
weight: 1
banner: "images/meshery-contributors-banner.svg"
id: "unique-content-id"
level: "beginner"
---

Provide a brief summary of what learners will gain.
<!-- Add your Academy content here -->
```

{{< alert type="info" title="Important Reference IDs" >}}
Make note of two key identifiers for your content files:
- **Content ID**: Unique identifier for this specific content
- **Organization ID**: Your organization's identifier (remains constant)
{{< /alert >}}

{{< alert type="info" title="Content ID Updates" >}}
If you click "Back" and return to Step 5, a new Content ID will be generated. Simply use the new ID and discard the previous one.
{{< /alert >}}

### Next Steps

After generating our template:

1. **Copy the Template**: Use the provided copy button to get your front matter
2. **Create Your Content File**: Paste the template into a new .md file in your academy repository
3. **Add Your Content**: Replace the placeholder comment with your actual learning material


## Manage Invitation

### Auto-Generated Invitations
Navigate to **Identity → Invitations** to find your automatically created invitation.
![](images/auto-invitation.png)

The first column labeled "INVITATION" contains a shareable link that you can copy.

## What Can the Invitation Link Do for You?

The auto-generated invitation link is a powerful tool that helps instructors efficiently manage learner access and streamline the enrollment process.

### 1. Precise Team Access Control

Your invitation link provides targeted access management:

- **Specific Team Access**: Only members of your selected teams can access the content through this link
- **Automatic Role Assignment**: Users who accept the invitation automatically receive the "Academy Learner" role
- **Organization Boundary Protection**: Only users within your [organization](https://docs.layer5.io/cloud/identity/organizations/) can use this invitation

### 2. Flexible Sharing and Distribution

**Automated Email Distribution:**
- The system automatically sends invitation emails to specified team members
- Emails include course descriptions and one-click access links
- Reduces your manual notification workload and ensures consistent messaging

**Direct Sharing Options:**
- Copy and send the invitation link directly to team members
- Share through collaboration tools like Slack, Microsoft Teams, or Discord
- Embed the link in internal documentation, wikis, or learning portals


### Customize Invitation Properties

Click the pencil icon to access the invitation customization form.
![](images/auto-invitation-details.png)

The invitation form contains eight properties. Three are automatically generated by the system for convenience, which you can modify according to your needs:

**Auto-Generated Properties:**
1. **Name**: Automatically formatted as "Academy Invitation for [your-content-name]"
   *Example: "Academy Invitation for meshery-contributors-certification" (lowercase with dash)*
2. **Description**: "Invitation to join organization [organization-name] for academy curricula [course-name]"
3. **Roles**: Defaults to "Academy Learner" - [Learn more about Academy roles](https://docs.layer5.io/cloud/security/roles/academy-roles/) 

{{< alert type="info" title="Admin Role Invitations" >}}
Academy admins can invite other instructors to become co-admins by changing the **Roles** property from "Academy Learner" to "Academy Admin" during invitation customization.
{{< /alert >}}

**Customizable Properties:**

### 1. Emails - Invitation Email List

Configure who receives the invitation:

- **Supported Formats:**
  - Individual emails: `test@domain.com`
  - Domain-wide invitations: `@domain.com` (invites all users from that domain)
- **Duplicate Handling**: The system automatically merges duplicate entries
- **Quantity Recommendations:**
  - Small team invitations: 10-50 email addresses
  - Department-level invitations: 100-200 email addresses
  - Large organizations: Use domain wildcards like `@company.com` instead of listing individual emails

### 2. Expires At - Expiration Settings

Control when the invitation expires:

- **Flexibility**: Supports any time setting, extension, and recovery. Leave blank for permanent access
- **What happens at expiration?**
  - Expiration is only checked when users attempt to accept the invitation
  - If the expiration time has passed, users cannot proceed with the invitation
  - Expiration check compares server current time vs. set expiration time
- **Can I modify expired invitations?**
  - Yes, you can recover and extend expiration times by entering edit mode

### 3. Quota - Usage Limits

Set limits on how many users can accept the invitation:

- **When quota is exceeded:**
  - Operates on a first-accept, first-in basis
  - Users beyond the quota cannot join, even with a valid invitation link
- **Recovery options:**
  - If quota is reached, you can increase the quota to restore access
  - Admin console provides real-time usage monitoring

### 4. Teams - Team Assignment List

Specify which teams invited users will join:

- **Team Selection**: Choose from available teams via dropdown menu
- **Multiple Teams**: You can assign users to multiple teams
- **No Teams Available**: If your organization has no teams, [create them](https://docs.layer5.io/cloud/identity/teams/) first. Users will be added to all successfully configured teams

{{< alert type="info" title="Team Structure Changes" >}}
**During Organization Restructuring:**
- If team structure changes after invitations are sent
- Some teams may be merged or deleted
- New users can still join remaining valid teams

**Permission Management Updates:**
- Team permission policies may change
- Some teams might close to new users
- Other teams continue accepting new members normally
{{< /alert >}}

### 5. Status - Enabled/Disabled

Control invitation accessibility:

- **Enabled**: Invitation functions normally
- **Disabled**: If users open a disabled invitation link, they can choose to "Retry" or "Go to Dashboard"

{{< alert type="info" title="Invitation Idempotency" >}}
Users only need to accept one invitation, regardless of how many invitation emails they receive. Once accepted, additional invitations to the same user are automatically ignored.
{{< /alert >}}