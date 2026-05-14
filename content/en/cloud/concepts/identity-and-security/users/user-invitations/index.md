---
title: User Invitations
description: >
 Learn how to create custom, secure, and flexible invitations for new members.
weight: 3
categories: [Identity]
tags: [users]
aliases:
  - /cloud/identity/users/user-invitations/

---

The [invitation system](https://cloud.layer5.io/identity/invitations) gives you precise control over how members join your organization, allowing you to streamline onboarding and enhance security.

You can create highly customized invitations for any scenario, from onboarding specific individuals to launching large-scale community challenges. Each invitation can be configured with expiration dates, usage quotas, and pre-assigned roles, ensuring new members get the right access from the moment they join.

{{< alert type="info" title="Required permission" >}}
Managing invitations requires the **Manage Invitations** permission within your organization. Contact your organization administrator if you need access.
{{< /alert >}}

### Default organization state

By default, organizations are **closed**: there is no open registration. A user cannot join your organization simply by navigating to a URL — they must either click a valid invitation link or register through a page associated with an organization that has a [default invitation](#invitation-properties-explained) configured.

When no default invitation is set, new users who arrive at your organization's registration page are registered as platform users but are **not** automatically added to your organization. They will have no organization membership and no roles until an administrator adds them or they accept an invitation link.

{{< alert type="info" title="Roles are not assigned automatically" >}}
When a user joins an organization via invitation, they receive only the roles explicitly listed on that invitation. If the invitation has no roles configured, the user joins with no role. Use the `roles` field on each invitation to ensure new members receive the correct initial permissions.
{{< /alert >}}

### Key capabilities

The invitation system provides three main areas of control to help you manage access effectively.

#### Create custom invitations for any audience
Tailor each invitation to your specific needs with three flexible modes:
- **Precise invitation**: Target a single user by specifying their full email address.
- **Domain-wide invitation**: Onboard an entire organization at once by allowing any email from a specific domain (e.g., `@layer5.io`).
- **Public invitation**: Leave the email field blank to create an open link for public events (e.g., Academy Challenge invitations).

{{< alert type="warning" title="Use domain wildcards carefully" >}}
Patterns like `@company.com` allow anyone with that domain. Verify ownership and pair with roles and teams that grant only necessary access.
{{< /alert >}}

#### Control the invitation lifecycle
Manage access with settings that put you in control:
- **Expiration date**: Set a specific date and time after which the invitation link can no longer be used to join. This prevents new signups but does not affect members who have already accepted the invitation.
- **Usage quota**: Limit the number of times an invitation can be used. The invitations table shows current acceptance count alongside the limit (e.g., `2 / 5`).

{{< alert type="info" title="Blank means unlimited" >}}
If `expiresAt` is not set, the invitation never expires. If `quota` is not set, the invitation has unlimited uses.
{{< /alert >}}

#### Manage invitations dynamically
Instantly revoke access by switching an invitation's status between **enabled** and **disabled** at any time. A disabled invitation can be re-enabled later without recreating it.

### How to create an invitation

To create a new invitation, navigate to the [Invitations page](https://cloud.layer5.io/identity/invitations) from the main menu. Click the **Create New Invitation** button to open the creation dialog.

<img src="./images/create-invitation.png" alt="Create Invitation Dialog" style="width:30%; height:auto;" />

{{< alert type="info" title="Email notifications" >}}
After an invitation is created, a notification email is sent only to addresses listed in the `emails` field that are exact email addresses. Domain-wide patterns (e.g., `@layer5.io`) and public invitations (empty `emails` field) do not trigger individual notification emails — share the invitation link directly in those cases.
{{< /alert >}}

<img src="./images/invitation-email.png" alt="Invitation Email" style="width:50%; height:auto;" />


#### Invitation properties explained

| Property | Description |
| :--- |  :--- |
| `emails` | List of email addresses or domain patterns allowed to use the invitation. Exact addresses (e.g., `user@example.com`) and domain patterns (e.g., `@example.com`) are both supported. If empty, the invitation is public. |
| `roles` | List of roles automatically assigned to new members upon accepting the invitation. If empty, the user joins with no role. |
| `teams` | List of teams new members are automatically added to upon accepting the invitation. |
| `quota` | Number that limits how many users can accept the invitation. If not set, there is no usage limit. |
| `expiresAt` | Date after which the invitation link can no longer be used. Does not affect existing members. If not set, the invitation never expires. |
| `status` | Invitation status: `enabled` = active and usable; `disabled` = inactive (can be re-enabled later). |
| `name` | A human-readable name used to identify the invitation. |
| `description` | Additional information about the invitation's purpose, for internal reference. |
| `isDefault` | When enabled, marks this invitation as the organization's open signup invitation. Users who register through your organization's registration page are automatically enrolled through this invitation, receiving the pre-configured roles and teams. Without a default invitation, the registration page does not automatically add users to the organization. Only one invitation should be designated as the default at a time. |

### Managing existing invitations

All existing invitations are displayed in a table showing key details for each invitation: its name and description, a copyable acceptance link, the owner, expiration date, quota usage, assigned roles and teams, and current status.

![Invitations Overview Table](./images/overview.png)

You can filter the list using the filter control at the top right of the table. Available filters are:
- **Status** — show only enabled or disabled invitations
- **Roles** — show invitations that grant a specific role
- **Teams** — show invitations that add members to a specific team

From the table you can perform the following management actions on each invitation:

* **Copy Link**: Click the copy icon next to the invitation URL to copy it for sharing.
* **Edit Invitation**: Click the pencil icon to open the edit dialog and modify any invitation properties.
* **Delete Invitation**: Click the trash icon to permanently remove the invitation. This action cannot be undone.

### Tracking who has accepted an invitation

The **Quota** column in the invitations table always shows the number of users who have accepted an invitation alongside the configured limit — for example, `2 / 5` if a quota is set, or `2 / Unlimited` if no quota is configured. This lets you monitor uptake at a glance.

To see the individual users who are now members of the organization, navigate to the [User Management](/cloud/concepts/identity-and-security/users/user-management/) page. Members who joined via invitation appear there alongside their assigned roles.

### What happens when a user accepts an invitation

When a user clicks an acceptance link and is logged in, the system performs the following steps in order:

1. **Validates the invitation** — confirms it exists, is `enabled`, has not passed its expiration date, and has not exceeded its quota.
2. **Checks email eligibility** — verifies the user's email matches the invitation's `emails` list. An empty list allows any email (public invitation).
3. **Adds the user to the organization** — the user immediately becomes a member of the organization that owns the invitation.
4. **Assigns roles** — all roles configured on the invitation are assigned to the user in that organization. If no roles are configured, the user joins with no role.
5. **Adds the user to teams** — the user is added to all teams configured on the invitation.

Role and team assignment failures are non-blocking: the user is still added to the organization even if an individual role or team assignment fails.

### Use cases and examples

The invitation system offers flexible configurations to fit a variety of use cases.

{{< alert type="info" title="How invitation links handle unauthenticated users" >}}
When a user who is not logged in clicks an invitation link, the system saves the invitation ID in a short-lived 30-minute cookie and redirects them to the organization's registration page. After a successful login or signup, the system reads the cookie and automatically completes the invitation acceptance, adding the user to the organization with the configured roles and teams.
{{< /alert >}}

#### Scenario 1: Inviting a single team member

- **Goal**: Provide a new employee with a secure, single-use invitation that grants the correct initial permissions.
- **Configuration**:
  - Email: Set to the new member's specific email address.
  - Roles: Assign their specific role (e.g., `Developer`).
  - Teams: Add them directly to their project team (e.g., `Frontend-Team`).
  - Quota: Set to `1` to ensure the link is only used once.

#### Scenario 2: Opening registration for an entire organization

- **Goal**: Allow all employees from your company to join using their corporate email without individual invitations.
- **Configuration**:
  - Email: Use a domain pattern to cover all employees (e.g., `@yourcompany.com`).
  - Roles: Assign a default role for all new members.

#### Scenario 3: Launching a community challenge

- **Goal**: Create a public signup link for a limited-time community event with a maximum number of participants.
- **Configuration**:
  - Email: Leave blank for public access.
  - Name: Give it a clear name like "Layer5 Challenge 2025".
  - Expiration date: Set to the date and time the challenge registration closes.
  - Quota: Set to the maximum number of participants (e.g., `100`).
  - Roles: Assign a temporary role like `Learner`.

{{< alert type="info" title="Managing learner costs" >}}
The available seats for learners are determined by your organization's subscription plan. Please be mindful of your subscription to manage costs effectively.
{{< /alert >}}

#### Scenario 4: Granting temporary partner access

- **Goal**: Give an external partner secure access to specific resources only for the duration of a project.
- **Configuration**:
  - Email: Use the partner's domain (e.g., `@partner.com`).
  - Teams: Add them only to a shared project team (e.g., `Project-X-Shared`).
  - Expiration date: Set to the project's end date to prevent new signups after the project concludes.
  - Description: Add a note for internal reference, such as "Temporary access for Project X contractors".

{{< alert type="warning" title="Expiration does not remove existing members" >}}
Setting an expiration date prevents new users from using the invitation link after that date. It does not automatically remove partners who have already joined. When the project ends, manually remove those users from the organization or team.
{{< /alert >}}

{{< alert type="warning" title="Public invitations" >}}
Public links can be forwarded broadly. Always set an expiration date and a quota to limit unintended signups.
{{< /alert >}}
