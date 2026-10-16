---
title: Security
linkTitle: Security
description: >
  Guides for API tokens, sessions, and custom keychains: create and revoke credentials, sign out a session, and build a keychain.
weight: 40
diataxis: how-to
categories: [security]
tags: [tokens, sessions, keychains]
---

These guides cover the security tasks in Layer5 Cloud. For how keys, keychains, and roles combine into permissions, read the [Keys]({{< ref "cloud/concepts/identity-and-security/keys.md" >}}) and [Keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}) concepts. For defaults, lifetimes, and endpoints in one place, see the [Security Reference]({{< ref "cloud/reference/security.md" >}}).

| I want to | Go to | Permission needed |
| --- | --- | --- |
| Authenticate a script or CI job to Layer5 Cloud | [Create and Use an API Token]({{< ref "cloud/guides/security/api-tokens.md" >}}) | Create Token, Download Token |
| Stop a leaked or retired token from working | [Revoke an API Token]({{< ref "cloud/guides/security/api-tokens.md#revoke-a-token" >}}) | Delete Token |
| Rotate a token without breaking a pipeline | [Rotate a token]({{< ref "cloud/guides/security/api-tokens.md#rotate-a-token" >}}) | Create Token, Delete Token |
| See where I am signed in and end a session | [Review and Sign Out Sessions]({{< ref "cloud/guides/security/sessions.md" >}}) | View Sessions, Delete Token |
| Group keys into a custom keychain | [Build a Custom Keychain]({{< ref "cloud/guides/security/custom-keychains.md" >}}) | Create Keychain, Edit Keychain, Delete Keychain |
