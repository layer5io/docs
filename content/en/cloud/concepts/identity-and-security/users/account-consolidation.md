---
title: Account Consolidation
description: >
  Layer5 Cloud resolves email/password, GitHub, and Google sign-in to a single account per verified email address.
weight: 6
categories: [Identity]
tags: [users]
---

Layer5 Cloud recognizes one account per verified email address, no matter which method you use to sign in.

## What changed for me

Previously, signing in with email/password, GitHub, or Google could each create a **separate** account, even when they shared the same email address. This led to a confusing experience: designs, organizations, and workspaces created under one sign-in method would appear to "disappear" when you signed in with another.

Layer5 Cloud has consolidated these previously split accounts in a one-time maintenance operation. For each affected person, all resources were transferred to a single retained account, including:

- Designs and views
- Workspaces
- Connections and credentials
- Performance profiles
- Schedules
- Organization and team memberships and roles

Duplicate, auto-created "My Organization" organizations that had no other members were removed. Organizations with other members were preserved, and ownership transferred to the retained account. If a connection name collided during the merge, the duplicate was renamed with a " (merged)" suffix so both remain identifiable.

{{< alert type="info" title="No action required" >}}
Consolidation happened automatically. You do not need to do anything, and you keep access to everything you had before, now under one account.
{{< /alert >}}

## Signing in with multiple methods

Going forward, signing in with email/password, GitHub, or Google using the same **verified** email address always resolves to the same account:

1. You create an account with `alice@example.com`, whether by setting a password or signing in with GitHub or Google.
2. Later, you sign in with a different method (for example, Google instead of GitHub) using a provider that returns the same verified email address.
3. Layer5 Cloud recognizes the verified email address and signs you into your existing account rather than creating a new one.

Your designs, organizations, and workspaces are always available, regardless of which sign-in method you used to create them or which one you use on a given day.

## Your email addresses

Layer5 Cloud keeps a record of every email address that has ever resolved to your account. Each of these addresses continues to work for:

- Accepting invitations sent to that address
- Role assignments made against that address

Your account has exactly one **primary** email address at a time, shown on your profile. If you have signed in through multiple methods over time, you may see more than one address associated with your account, but only the primary address is used to identify you by default.

## Wanting separate accounts

After consolidation, each email address maps to exactly one account. If you deliberately want separate accounts, for example to keep a testing environment separate from production, use a distinct email address for each account. This is standard behavior for any SaaS platform that supports single sign-on: identity is tied to the verified email address, not to the sign-in method you happen to use that day.

## For organization admins: billing impact

If duplicate accounts previously inflated the seat count on your organization's subscription, consolidation corrects that seat count downward automatically. Your subscription quantity updates on the next billing reconciliation cycle, you don't need to adjust it manually.

{{< alert type="info" title="Minimum-seat plans" >}}
If your plan is already at its minimum-seat floor, consolidation has no effect on your seat count or billing.
{{< /alert >}}

{{< alert type="info" title="Related reading" >}}
For how sign-in providers link to your account going forward, see [Account Linking]({{< ref "cloud/concepts/identity-and-security/users/_index.md#account-linking" >}}).
{{< /alert >}}
