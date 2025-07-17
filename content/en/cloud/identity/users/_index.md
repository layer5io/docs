---
title: Users
description: >
  Each user account represents an individual collaborator. Individual user accounts exist beyond the bounds of organizations.
categories: [Identity]
tags: [users]
---

## User Accounts

Anyone who uses Layer5 Cloud signs into a user account. Your user account is your identity on Layer5 Cloud and has a username and profile. For example, see Five's profile.

<!-- {{< alert type="warning" title="TODO" >}}Insert Five's user profile here.{{< /alert >}} -->

Your user account can own resources such as workspaces, designs, connections, credentials, tokens, Any time you take any action on Layer5 Cloud such as creating a design or reviewing a deployment request, the action is attributed to your user account.

Each user account is subscribed to a plan: Free, Team, or Enterprise. All user accounts can own an unlimited number of public and private workspaces, with an unlimited number of collaborators on those workspaces. If you use Layer5 Free, private workspaces owned by your user account have a limited feature set. You can upgrade to Layer5 Enterprise to get a full feature set for private workspaces.

Note: Free plan users are limited to a single organization — their initial default organization, typically named "My Organization".

{{< alert type="info" >}}
For more information, see [Layer5 subscription plans](https://layer5.io/pricing).
{{< /alert >}}

Teams allow you to organize users into groups and conveniently assign access to workspaces or to assign roles with associated keychains and keys to control permissions.

{{< alert type="info" >}}
You need to have the default `Team Admin` role to assign permissions to users in your team. For more information, see [Teams](/cloud/identity/teams).
{{< /alert >}}

Organizations may have any number of teams and teams may have any number of users. User accounts are treated as sovereign entities that are owned by individual individuals, not by corporations.

Organization and teams may have any number of users accounts. User accounts are treated as sovereign entities that are owned by individual individuals, not by corporations.

Users and their tokens may be authorized to access resources. Users can be created and managed by the Provider Admins, Organization Admins, or Team Admins. Users of one organization may be granted access to resources (e.g. Workspaces and Designs) of another organization. User entitlement, roles and permissions are org-scoped, meaning that the entitlements and permissions that a given user has in one organization does not necessarily reflect the same level of access that their membership in another oganziation does.

{{< alert type="info" >}}
Only Provider Admins and Organization Admin can create users. For more information, see [Roles](/cloud/security/roles/).
{{< /alert >}}

## Account Linking

You can link your Layer5 account to social sign-in providers after sign up, as well as unlink social sign-in providers that you might have previously added. You can link your social sign-in accounts on login automatically using a secure flow. This is how it works:

1. You create an account with the email address `alice@example.com` and a password.
2. When signing in later, click to sign in with a social sign-in provider (e.g. GitHub or Google) that contains the same email address `alice@example.com`.
3. Since your same email address is aleady associated to an your existing account, registered already, you will be prompted to enter the password of your existing account.
4. After entering the correct password, your social sign-in is linked to your existing account. Now, you can sign in with either password or social sign-in provider.

**Rules and Limitations**

1. You cannot link the same social sign-in to multiple Layer5 accounts
2. If you delete your account, any linked OAuth providers (e.g., GitHub) are automatically unlinked  
3. Re-registering with the same email **does not** automatically re-link the OAuth provider  
4. You may unlink a social sign-in provider at any time

## Account Deletion

When a user deletes their account, the following behaviors apply:

**1. Personal Resources**

- Personal content (e.g., unpublished designs) is soft-deleted internally.
- There is currently **no recovery option** available to users.

**2. Published Content**

- Published content (e.g., items in the [Catalog](https://cloud.layer5.io/catalog)) remains accessible to the public
- This ensures that published work continues to benefit the community, even after the account is deleted.

**3. Organization Ownership**

- If you are the [only Org Admin or Owner](https://docs.layer5.io/cloud/security/roles/), the organization may become **unmanageable** after you delete your account.
- It is strongly recommended to assign multiple admins before deletion.

**4. Organization Deletion**

- Organizations cannot be deleted just by leaving or deleting accounts.
- Only Org Owners can delete an organization, and it must be done as an explicit, manual action.
- Org Admins do not have this permission.

**5. Re-registering with the Same Email**

- Signing up again with the same email address creates a **new, separate account**.
- The new account:
  - Will not automatically regain access to resources linked to the deleted account.
  - May, in rare cases, display inconsistent profile data (e.g., old display name in design attribution).

{{< alert type="info" >}}
This is a known issue. Future versions of Layer5 Cloud will address it through UUID-based identity linking.
{{< /alert >}}

**6. Deployed Designs**

- Deployed designs are **not automatically removed** when a user deletes their account.
- This ensures that deployments remain stable unless explicitly taken down.

{{< alert type="info" >}}
While account deletion is permanent for end-users, future versions of Layer5 Cloud may introduce:

- A pre-deletion flow for reviewing and exporting data  
- The ability to transfer ownership of resources (e.g., workspaces, teams, organizations)  
- Support for recovering accounts or restoring deleted data

{{< /alert >}}

### Behavior When Linking Multiple Accounts

If you link two Layer5 accounts that both have existing designs or resources:

- You will be prompted to choose a **primary account** to retain.
- Designs from the secondary account **are not merged automatically**.
- You should manually export or migrate any designs you want to retain from the secondary account before completing the linking process.
- In future releases, Layer5 Cloud will introduce tools to assist in migrating and merging designs during linking.

### Linking Multiple Social Sign-In Accounts of the Same Type

Currently, Layer5 Cloud **does not support linking multiple accounts of the same provider type** (e.g., multiple Google or GitHub accounts) to a single Layer5 account.

- Each Layer5 account can be linked to **only one account per provider type**.
- Attempting to link another account of the same provider will result in an error or prompt to replace the existing one.
- Support for multiple accounts of the same provider may be considered in future versions.
