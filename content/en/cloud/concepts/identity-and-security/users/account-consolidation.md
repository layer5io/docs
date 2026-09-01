---
title: Account Consolidation
description: >
  Layer5 Cloud resolves email/password, GitHub sign-in, and Google sign-in to a single account per verified email address.
weight: 6
categories: [Identity]
tags: [users]
---

Layer5 Cloud recognizes one account per verified email address, no matter which method you use to sign in.

## What changed

Previously, signing in with email/password, GitHub, or Google could each create a **separate** account, even when they shared the same email address. This led to a confusing experience: designs, organizations, and workspaces created under one sign-in method would appear to "disappear" when you signed in with another.

In July 2026, Layer5 Cloud consolidated these previously split accounts in a one-time maintenance operation. For each affected person, all resources were transferred to a single retained account, including:

- Designs and views
- Workspaces and environments
- Connections and credentials
- Performance profiles and results
- Schedules
- API tokens
- Organization and team memberships and roles

Anything else a duplicate account owned - owned teams, academy registrations, and resource access grants among them - moved with it.

Organizations were handled separately from that transfer. An organization owned by a duplicate account with no other active members - typically the "My Organization" that Layer5 Cloud creates for every new account - was removed. Any workspace in it that still held content was first re-homed to the retained account's default organization, so no workspace content was lost. An organization that did have other members was preserved, and its ownership transferred to the retained account.

If a connection name collided during the merge, the duplicate was renamed with a `(merged)` suffix - and `(merged, 2)`, `(merged, 3)`, and so on for any further collisions on the same name - so both remain identifiable.

{{< alert type="info" title="Nothing for you to do" >}}
Consolidation ran automatically as a maintenance operation and is complete. You keep access to everything you had, under one account. If you sign in with a different method and resources appear to be missing, [contact support]({{< ref "cloud/getting-started/support.md" >}}).
{{< /alert >}}

## Signing in with multiple methods

Signing in with email/password, GitHub, or Google using the same **verified** email address always resolves to the same account:

1. You create an account with `alice@example.com`, whether by setting a password or signing in with GitHub or Google.
2. Later, you sign in with a different method (for example, Google instead of GitHub) using a provider that returns the same verified email address.
3. Layer5 Cloud recognizes the verified email address and signs you into your existing account rather than creating a new one.

Your designs, organizations, and workspaces are always available, regardless of which sign-in method you used to create them or which one you use on a given day. Each email address is now unique to a single account, so a second account can no longer be created for an address that already belongs to one.

## Your email addresses

Your account has exactly one **primary** email address at a time. That is the address shown on your profile and the one used to identify you.

If your account absorbed a duplicate during consolidation, Layer5 Cloud also keeps a record of the addresses that duplicate used. Each of those addresses continues to work for:

- Accepting invitations sent to that address
- Role assignments made against that address

These additional addresses are not displayed in the Layer5 Cloud interface. You can retrieve them for your own account through the API, at `GET /api/identity/users/{userId}/emails`.

## Wanting separate accounts

Each email address maps to exactly one account. If you deliberately want separate accounts, for example to keep a testing environment separate from production, use a distinct email address for each account. This is standard behavior for any SaaS platform that supports single sign-on: identity is tied to the verified email address, not to the sign-in method you happen to use that day.

## For organization admins: billing impact

If duplicate accounts had inflated the seat count on your organization's subscription, consolidation corrected that seat count downward. Layer5 Cloud recounts billable seats automatically on a recurring reconciliation cycle and pushes the corrected quantity to the payment processor, so there is nothing to adjust manually.

{{< alert type="info" title="Minimum-seat plans" >}}
Billable seats never drop below your plan's minimum. If your plan was already at its minimum-seat floor, consolidation had no effect on your seat count or billing.
{{< /alert >}}

{{< alert type="info" title="Related reading" >}}
For how sign-in providers link to your account, see [Account Linking]({{< ref "cloud/concepts/identity-and-security/users/_index.md#account-linking" >}}).
{{< /alert >}}
