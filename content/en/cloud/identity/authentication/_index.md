---
title: Authentication
description: >
  How Layer5 Cloud authenticates users, the sign-in flows it supports, and how organization context is carried across custom domains.
weight: 4
categories: [Identity]
tags: [authentication, sso, oauth, oidc, custom-domains]
---

Layer5 Cloud authenticates every user through a unified identity layer that supports email-and-password sign-in, single sign-on with OAuth/OIDC providers (GitHub, Google), email-link verification, and self-service password recovery. Once a user is authenticated, the platform pins each request to the correct organization tenant — including organizations that have been mapped to a custom domain.

## How authentication is structured

Layer5 Cloud's authentication subsystem is built on three components that work together:

* **Layer5 Cloud Server** — the only system the browser talks to during a sign-in. It owns the user-facing pages (`/login`, `/registration`, `/recovery`, `/verification`, `/password-reset`, `/reset`, `/account`), proxies every step of the underlying identity flow, and sets the cookies that establish your session.
* **Ory Kratos** — the identity-management engine that handles user accounts, credentials (passwords, OIDC), email verification, password recovery, and account-settings changes. Kratos is never exposed directly to the browser; it sits behind the cloud server.
* **Ory Hydra** — the OAuth 2.0 / OpenID Connect authorization server that issues the access tokens used by Layer5 Cloud and by Meshery instances acting as clients of the Remote Provider.

This separation is the reason every authentication action you take in the browser hits a `/api/auth/...` URL on Layer5 Cloud rather than a Kratos URL. The browser never needs to know that Kratos exists.

```
Browser  ──►  Layer5 Cloud Server  ──►  Ory Kratos / Ory Hydra
```

{{< alert type="info" >}}
For an explanation of how API access tokens differ from browser session cookies, see [Tokens](/cloud/security/tokens) and [Sessions](/cloud/security/sessions).
{{< /alert >}}

## What this section covers

* [**Authentication flows**](/cloud/identity/authentication/authentication-flows) — every sign-in, sign-up, and account-management flow Layer5 Cloud supports, with step-by-step walkthroughs of what the browser, the cloud server, and Kratos each do at every hop. Covers email registration, email login, email verification, GitHub and Google OAuth (signup and login), password recovery and reset, account-settings (link/unlink providers, change password), anonymous-user handover, invitation acceptance, and logout.
* [**Custom domains**](/cloud/identity/authentication/custom-domains) — how Layer5 Cloud routes authenticated traffic when a tenant organization has been mapped to its own custom domain (e.g. `academy.layer5.io`, `exoscale.layer5.io`, `cloud.meshery.io`). Covers the six sources of organization context, the cookie scopes that make cross-domain navigation work, and every redirect scenario that arises when a user's preferred organization differs from the domain they are currently on.

## Two related but distinct concepts

Two ideas that often get conflated are kept separate throughout this section:

| Concept | Meaning | Source of truth |
|---|---|---|
| **Acting org** (scope) | The organization context for the current request — what the server reads from and writes to. | The hostname (custom domain), or the `Layer5-Current-Orgid` header / cookie / preference fallback. |
| **Selected org** (intent) | The organization the user *wants* to be looking at. | `users.preferences.selectedOrganizationId` in the user's profile. |

When intent and scope conflict — for instance, you are on `cloud.layer5.io` but your selected org has its own custom domain — Layer5 Cloud changes the **scope** (redirects you to the matching domain), not your **intent** (your preference is preserved).

## Authentication providers

Out of the box, Layer5 Cloud supports the following sign-in methods:

* **Email and password**, with email verification, "have I been pwned" leaked-credential checking, and self-service password recovery via one-time-code email link.
* **GitHub** via OAuth 2.0 / OpenID Connect. Requested scopes: `read:user`, `user:email`.
* **Google** via OAuth 2.0 / OpenID Connect. Requested scopes: `email`, `profile`.

Linking and unlinking these providers from a single user account is performed via the **Account Settings** flow (`/account`). See [User Accounts → Account Linking](/cloud/identity/users/#account-linking) for the user-facing rules, and [Authentication Flows → Account settings](/cloud/identity/authentication/authentication-flows/#account-settings-link--unlink--change-password) for the underlying mechanics.

## Where authentication fits in the broader stack

Layer5 Cloud also serves as a [Remote Provider for Meshery](https://docs.meshery.io/extensibility/providers). When a self-hosted Meshery instance is configured to use Layer5 Cloud as its provider, Meshery delegates user identity, organization membership, and access tokens to the same flows documented here. From the Meshery user's perspective, "log in to Meshery" and "log in to Layer5 Cloud" are the same act — Meshery redirects to Layer5 Cloud's `/login`, the user authenticates, and Hydra issues the access token that Meshery uses for subsequent API calls.

{{< alert type="info" >}}
If you are running a self-hosted Layer5 Cloud and want to bootstrap the initial Provider Admin organization, see the `INIT_CONFIG` environment variable documented in the [self-hosted setup](/cloud/self-hosted/) section.
{{< /alert >}}
