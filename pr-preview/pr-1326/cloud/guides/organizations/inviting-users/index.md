# User Invitations


> Learn how to create custom, secure, and flexible invitations for new members.



The [invitation system](https://cloud.layer5.io/identity/invitations) gives you precise control over how members join your organization, allowing you to streamline onboarding and enhance security.

You can create highly customized invitations for any scenario, from onboarding specific individuals to launching large-scale community challenges. Each invitation can be configured with expiration dates, usage quotas, and pre-assigned roles, ensuring new members get the right access from the moment they join.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Required permission</h4>
  
      Managing invitations requires the <strong>Manage Invitations</strong> permission within your organization. Contact your organization administrator if you need access.
  
</div>



### Default organization state

By default, organizations are **closed**: there is no open registration. A user cannot join your organization simply by navigating to a URL - they must either click a valid invitation link or register through a page associated with an organization that has a [default invitation](#invitation-properties-explained) configured.

When no default invitation is set, new users who arrive at your organization's registration page are registered as platform users but are **not** automatically added to your organization. They will have no organization membership and no roles until an administrator adds them or they accept an invitation link.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Two ways to designate the open signup invitation</h4>
  
      <p>An organization&rsquo;s open signup invitation can be set in two places: the invitation picker in <strong>Edit Organization</strong>, or the <code>isDefault</code> setting on the invitation itself.</p>
<p>The <strong>Edit Organization</strong> selection takes precedence. The <code>isDefault</code> marker is used when no selection has been made there, or when the invitation that selection points at no longer exists.</p>

  
</div>









<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Roles are not assigned automatically</h4>
  
      When a user joins an organization via invitation, they receive only the roles explicitly listed on that invitation. If the invitation has no roles configured, the user joins with no role. Use the <code>roles</code> field on each invitation to ensure new members receive the correct initial permissions.
  
</div>



### Key capabilities

The invitation system provides three main areas of control to help you manage access effectively.

#### Create custom invitations for any audience
Tailor each invitation to your specific needs with three flexible modes:
- **Precise invitation**: Target a single user by specifying their full email address.
- **Domain-wide invitation**: Onboard an entire organization at once by allowing any email from a specific domain (e.g., `@layer5.io`).
- **Public invitation**: Leave the email field blank to create an open link for public events (e.g., Academy Challenge invitations).







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Use domain wildcards carefully</h4>
  
      Patterns like <code>@company.com</code> allow anyone with that domain. Verify ownership and pair with roles and teams that grant only necessary access.
  
</div>



#### Control the invitation lifecycle
Manage access with settings that put you in control:
- **Expiration date**: Set a specific date and time after which the invitation link can no longer be used to join. This prevents new signups but does not affect members who have already accepted the invitation.
- **Usage quota**: Limit the number of times an invitation can be used. The invitations table shows current acceptance count alongside the limit (e.g., `2 / 5`).







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Blank means unlimited</h4>
  
      If <code>expiresAt</code> is not set, the invitation never expires. If <code>quota</code> is not set, the invitation has unlimited uses.
  
</div>



#### Manage invitations dynamically
Instantly revoke access by switching an invitation's status between **enabled** and **disabled** at any time. A disabled invitation can be re-enabled later without recreating it.

### How to create an invitation

To create a new invitation, navigate to the [Invitations page](https://cloud.layer5.io/identity/invitations) from the main menu. Click the **Create New Invitation** button to open the creation dialog.

<img src="./images/create-invitation.png" alt="Create Invitation Dialog" style="width:30%; height:auto;" />







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Email notifications</h4>
  
      After an invitation is created, a notification email is sent only to addresses listed in the <code>emails</code> field that are exact email addresses. Domain-wide patterns (e.g., <code>@layer5.io</code>) and public invitations (empty <code>emails</code> field) do not trigger individual notification emails - share the invitation link directly in those cases.
  
</div>



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
| `acceptanceOutcome` | What accepting the invitation does. `direct_membership` (the default) makes the user a member of the inviting organization. `child_organization` instead creates a new organization for the user beneath the inviting organization. See [Choosing what accepting does](#choosing-what-accepting-an-invitation-does). Creating or editing a `child_organization` invitation requires the **Create Organization** permission in the inviting organization. |
| `isDefault` | When enabled, marks this invitation as the organization's open signup invitation. Users who register through your organization's registration page are automatically enrolled through this invitation, receiving the pre-configured roles and teams. Without a default invitation, the registration page does not automatically add users to the organization. Only one invitation can be designated as the default at a time - designating a new one clears the previous. Turning this setting on **or off** requires the **Manage Invitations** permission; editing any other property of an invitation does not, and leaves the setting as it was. |

### Managing existing invitations

All existing invitations are displayed in a table showing key details for each invitation: its name and description, a copyable acceptance link, the owner, expiration date, quota usage, assigned roles and teams, and current status.

![Invitations Overview Table](./images/overview.png)

You can filter the list using the filter control at the top right of the table. Available filters are:
- **Status** - show only enabled or disabled invitations
- **Roles** - show invitations that grant a specific role
- **Teams** - show invitations that add members to a specific team

From the table you can perform the following management actions on each invitation:

* **Copy Link**: Click the copy icon next to the invitation URL to copy it for sharing.
* **Edit Invitation**: Click the pencil icon to open the edit dialog and modify any invitation properties.
* **Delete Invitation**: Click the trash icon to permanently remove the invitation. This action cannot be undone.

If another administrator deletes an invitation while your edit dialog is open, saving reports that the invitation was not found rather than reporting success. Close the dialog and reload the invitations table to see the current list. Whenever an edit cannot be saved, the dialog reports the specific reason it was refused.

### Tracking who has accepted an invitation

The **Quota** column in the invitations table always shows the number of users who have accepted an invitation alongside the configured limit - for example, `2 / 5` if a quota is set, or `2 / Unlimited` if no quota is configured. This lets you monitor uptake at a glance.

To see the individual users who are now members of the organization, navigate to the [User Management](/pr-preview/pr-1326/cloud/guides/organizations/managing-users/) page. Members who joined via invitation appear there alongside their assigned roles.

### What happens when a user accepts an invitation

When a user clicks an acceptance link and is logged in, the system performs the following steps in order. Steps 3 to 5 describe a `direct_membership` invitation, the default; a `child_organization` invitation replaces them, as described after the list.

1. **Validates the invitation** - confirms it exists, is `enabled`, has not passed its expiration date, and has not exceeded its quota.
2. **Checks email eligibility** - verifies the user's email matches the invitation's `emails` list. An empty list allows any email (public invitation).
3. **Adds the user to the organization** - the user immediately becomes a member of the organization that owns the invitation.
4. **Assigns roles** - all roles configured on the invitation are assigned to the user in that organization. If no roles are configured, the user joins with no role.
5. **Adds the user to teams** - the user is added to all teams configured on the invitation.

For a `direct_membership` invitation, role and team assignment failures are non-blocking: the user is still added to the organization even if an individual role or team assignment fails.

For a `child_organization` invitation, the user is not added to the inviting organization. Instead, a child organization is created for them with the invitation's roles and teams applied inside it, as described in [Choosing what accepting an invitation does](#choosing-what-accepting-an-invitation-does). That acceptance is all or nothing: if any part of it fails, including a single role or team, nothing is created and the acceptance is not counted against the quota.

### Choosing what accepting an invitation does

Every invitation has an `acceptanceOutcome` that decides where the accepting user ends up.

In the **Create New Invitation** and **Edit Invitation** dialogs, choose it under **When accepted**. **Direct membership** is selected by default. **Child organization** appears only if you have the **Create Organization** permission in the current organization. If you lack that permission and edit an invitation that already uses Child organization, the option is shown selected but cannot be changed.

<img src="./images/acceptance-outcome.png" alt="When accepted picker in the Create New Invitation dialog" style="width:50%; height:auto;" />

| `acceptanceOutcome` | Result of accepting |
| :--- | :--- |
| `direct_membership` (default) | The user joins the inviting organization with the invitation's roles and teams, as described above. |
| `child_organization` | A new organization named **My Organization** is created as a child of the inviting organization. The user is its owner and Organization Admin, it gets the standard **My Team** and **My Workspace**, the invitation's roles are granted in it, and teams with the same names and descriptions as the invitation's teams are created in it with the user as a member. The user does not become a member of the inviting organization, and the inviting organization's own teams are unchanged. |

A few things hold for both outcomes:

- Every team listed on an invitation must belong to the inviting organization. An invitation that lists another organization's team is refused when it is created, edited, or accepted.
- Accepting is counted once per person. Accepting the same invitation again does not create a second child organization or use more of the quota.
- When someone creates a new account through your organization's open signup invitation, they do not also receive a separate personal organization; the invitation decides where they land. If the invitation turns out not to apply (for example, its quota is used up), a personal organization is created for them as usual.

### How the open signup invitation is applied at sign-in

The open signup invitation is not limited to first-time registration. It is applied whenever someone signs in through your organization's own address, such as its custom domain, on every sign-in method that address offers, including email and password as well as social sign-in. Someone who already has a Layer5 Cloud account and has never been a member of your organization becomes a member on that sign-in, with the roles and teams the invitation configures. When the open signup invitation is a `child_organization` invitation, that person instead receives their own child organization beneath yours, as described in [Choosing what accepting an invitation does](#choosing-what-accepting-an-invitation-does).

It is applied only to people who are not already members, which has two consequences worth knowing:

- **Roles and teams are never re-applied to an existing member.** If you remove a role or a team from someone who joined this way, signing in again does not restore it.
- **Each person is counted once.** Repeated sign-ins by the same person do not increase the invitation's acceptance count or add them to the organization a second time.







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">When open signup adds nobody</h4>
  
      <p>A person can sign in successfully and still not join your organization. The open signup invitation is applied only when all of the following hold:</p>
<ul>
<li>Its status is <code>enabled</code>.</li>
<li>Its expiration date has not passed.</li>
<li>Its quota has not been reached.</li>
<li>The person&rsquo;s email address matches its <code>emails</code> list. An empty list matches everyone.</li>
</ul>
<p>When one of them does not hold, someone who is not already a member signs in as a platform user with no membership and no roles in your organization, and no error is shown to them. Existing members are unaffected: they keep the membership, roles, and teams they already have. Check these four properties first when people who sign in at your organization&rsquo;s address are not appearing under <a href="/pr-preview/pr-1326/cloud/guides/organizations/managing-users/">User Management</a>.</p>

  
</div>



### Use cases and examples

The invitation system offers flexible configurations to fit a variety of use cases.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">How invitation links handle unauthenticated users</h4>
  
      When a user who is not logged in clicks an invitation link, the system saves the invitation ID in a short-lived 30-minute cookie and redirects them to the organization&rsquo;s registration page. After a successful login or signup, the system reads the cookie and automatically completes the invitation acceptance with the outcome the invitation&rsquo;s <code>acceptanceOutcome</code> selects: membership in the organization with the configured roles and teams, or a new child organization.
  
</div>



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







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Managing learner costs</h4>
  
      The available seats for learners are determined by your organization&rsquo;s subscription plan. Please be mindful of your subscription to manage costs effectively.
  
</div>



#### Scenario 4: Granting temporary partner access

- **Goal**: Give an external partner secure access to specific resources only for the duration of a project.
- **Configuration**:
  - Email: Use the partner's domain (e.g., `@partner.com`).
  - Teams: Add them only to a shared project team (e.g., `Project-X-Shared`).
  - Expiration date: Set to the project's end date to prevent new signups after the project concludes.
  - Description: Add a note for internal reference, such as "Temporary access for Project X contractors".







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Expiration does not remove existing members</h4>
  
      Setting an expiration date prevents new users from using the invitation link after that date. It does not automatically remove partners who have already joined. When the project ends, manually remove those users from the organization or team.
  
</div>









<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Public invitations</h4>
  
      Public links can be forwarded broadly. Always set an expiration date and a quota to limit unintended signups.
  
</div>



