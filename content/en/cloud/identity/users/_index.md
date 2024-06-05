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
