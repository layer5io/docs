---
title: Organization Configuration Scenarios
description: >
  The named ways an organization can be configured in Layer5 Cloud: Hosted,
  Branded, and White-Label, and how to choose between them based on your
  domain, identity provider, and sign-in needs.
weight: 2
categories: [identity]
tags: [orgs, custom-domain, identity, byoc, white-labeling]
aliases:
  - /cloud/identity/organizations/configuration-scenarios/
---

Every organization in Layer5 Cloud is configured based on two simple choices:
**where your users sign in** (your front door) and **whose identity
provider authenticates them**. Those two choices combine into a small set
of named scenarios. This guide names each one, describes what your users
experience, and explains **when you would choose one over the next**.

For the step-by-step setup behind these choices, follow the links into
[White-labeling](/cloud/guides/self-hosted/white-labeling/) (themes, logos,
custom domains) and [Identity Services](/cloud/guides/self-hosted/planning/identity-services/)
(bring-your-own-credentials and authentication boundaries). This page is
the map; those are the turn-by-turn directions.

## First, the two organization types

Before the scenarios, two roles an organization can play (illustrated with
[Five and the cast at Orbital Labs](/cloud/getting-started/meet-five)):

- **Provider Organization**, the top-level organization that operates the
  deployment. On the hosted service, this is Layer5 itself; on a self-hosted
  deployment, it is your platform team (in the cast, **Constellation Cloud**).
  The Provider Organization owns the deployment's **default identity
  providers**, the Google and GitHub apps every other organization falls
  back to, and a Provider Administrator manages platform-wide settings.
  There is exactly one.

- **Tenant Organization**, every other organization: your customers,
  partners, or business units (in the cast, **Orbital Labs** and **Stellar
  Dynamics**). A tenant is what you configure into one of the scenarios
  below. There can be any number of them.

{{< alert type="info" >}}
The scenarios below describe how to configure a **Tenant Organization**.
The Provider Organization always signs in on the deployment's canonical
host with the default identity providers.
{{< /alert >}}

## The two choices

| Choice | Options |
| --- | --- |
| **Front door**, where your users sign in | **Shared** (the deployment's address, e.g. `cloud.layer5.io`) · **Branded subdomain** (a subdomain of the deployment's base domain, e.g. `acme.layer5.io`) · **Custom domain** (your own domain, e.g. `cloud.acme.com`) |
| **Identity provider**, who runs sign-in | **Shared/default** (the deployment's Google + GitHub apps) · **Your own (BYOC)** (your own Google, GitHub, and/or OIDC single sign-on) |

Both email-and-password and social sign-in (the Google / GitHub buttons)
work in *every* scenario, including on a fully-custom domain using the
deployment's default identity providers. What the named scenarios capture is
*whose* identity provider authenticates your users and *whose* brand appears
on the consent screen, not whether social sign-in is available. (See
[White-labeling → Social sign-in on a custom domain](/cloud/guides/self-hosted/white-labeling/#social-sign-in-on-a-custom-domain)
for details.)

## The scenarios at a glance

| Scenario | Front door | Identity provider | Social sign-in | Choose it when… |
| --- | --- | --- | --- | --- |
| **Hosted** | Shared (`cloud.layer5.io`) | Shared/default | ✅ Works | You just want an organization, no custom URL, no setup. |
| **Branded** | Branded subdomain (`acme.layer5.io`) | Shared/default | ✅ Works | You want a branded sign-in URL and pages, but are happy using the platform's Google/GitHub apps. |
| **Branded + BYOC** | Branded subdomain | Your own (BYOC) | ✅ Works (your consent screen) | You want a branded subdomain **and** your own OAuth apps or single sign-on. |
| **White-Label** | Custom domain (`cloud.acme.com`) | Shared/default | ✅ Works | You want your own domain, with social sign-in working out of the box on the platform's Google/GitHub apps. |
| **White-Label + BYOC** | Custom domain | Your own (BYOC) | ✅ Works (your consent screen) | You want a fully branded deployment on your own domain, end to end. |

Read the table top-to-bottom as a ladder: each rung gives your organization
more of its own identity. One combination is intentionally **not possible**:
the Shared front door always uses the shared identity provider, so
"Shared + your own identity provider" does not exist. **To use your own
identity provider, configure a Branded subdomain or a Custom domain first.**

## The scenarios in detail

### Hosted

Your organization lives on the deployment's own address (`cloud.layer5.io`).
Users reach it by signing in there and selecting your organization from the
organization switcher.

- **Branding:** your theme colors and logo appear once users are inside the
  app; the sign-in page itself is the platform's (it is shared by everyone
  on that address).
- **Sign-in:** email and password, as well as Google and GitHub, both work out of the box.
- **Choose it when:** you're getting started, running an internal team, or
  simply don't need a branded URL. This is the default, no configuration
  required.

### Branded

Your organization gets a **vanity subdomain** of the deployment's base
domain, for example `acme.layer5.io` on the hosted service. Your sign-in,
sign-up, and error pages carry your colors, logo, and links.

- **Branding:** full branding on the sign-in pages **and** inside the app.
- **Sign-in:** email and password, as well as Google and GitHub, both work, the social
  buttons use the platform's Google/GitHub apps, so the upstream consent
  screen shows the platform's name.
- **Choose it when:** you want a branded, memorable URL and a branded login
  experience, but you don't need your own OAuth apps or your company's
  single sign-on. Set up the subdomain in
  [White-labeling → Custom Domain Name and Login Screen](/cloud/guides/self-hosted/white-labeling/#custom-domain-name-and-login-screen).

### Branded + BYOC

A Branded subdomain, plus **your own identity provider** ([BYOC](/cloud/guides/self-hosted/planning/identity-services/#bring-your-own-credentials-byoc)):
your own Google OAuth client, GitHub OAuth App, and/or a generic OIDC
provider for single sign-on.

- **Branding:** branded sign-in pages **and** your own brand on the Google /
  GitHub consent screen.
- **Sign-in:** email and password, as well as social sign-in, all through *your* apps:
  your consent screen, your rate limits, your audit trail, your rotation.
- **Choose it when:** you want a branded subdomain and also need control of
  your OAuth client or want to connect your corporate single sign-on. Note
  that bringing your own identity provider makes your organization a
  **distinct authentication boundary**, see [Identity Services → The
  identity provider is the security boundary](/cloud/guides/self-hosted/planning/identity-services/#the-identity-provider-is-the-security-boundary).

### White-Label

Your organization runs on **your own domain** (`cloud.acme.com`, on a
different base domain from the deployment), using the deployment's
**default** identity providers.

- **Branding:** fully white-labeled sign-in pages on your own domain.
- **Sign-in:** email and password, as well as Google and GitHub, all work out
  of the box, the social buttons use the platform's Google/GitHub apps, so
  the upstream consent screen shows the platform's name.
- **Choose it when:** you want your own domain with social sign-in working
  immediately, and you don't need your own OAuth apps or consent-screen
  branding. **To bring your own OAuth apps or corporate single sign-on, add
  your own identity provider** and you become a *White-Label + BYOC*
  organization (below). Set up the custom domain in
  [White-labeling → Custom Domain Name and Login Screen](/cloud/guides/self-hosted/white-labeling/#custom-domain-name-and-login-screen).

### White-Label + BYOC

The top of the ladder: **your own domain** *and* **your own identity
provider**. Your organization is branded end to end and authenticates
entirely through your own apps.

- **Branding:** your domain, your sign-in pages, and your brand on the
  Google / GitHub / OIDC consent screen.
- **Sign-in:** email and password, as well as social sign-in, all work, entirely on your
  own domain and through your own apps.
- **Choose it when:** you want a true white-label deployment, your domain,
  your brand on every screen, your identity provider, your security
  boundary. This is the typical choice for a partner or reseller offering
  the platform under their own name. Set up BYOC in
  [Identity Services → Bring Your Own Credentials](/cloud/guides/self-hosted/planning/identity-services/#bring-your-own-credentials-byoc).

## How to choose

A quick way to land on the right scenario:

1. **Do you need a branded URL?**
   - No → **Hosted**. You're done.
   - Yes, a subdomain of the platform is fine → continue at step 2 with
     **Branded**.
   - Yes, it must be *my own* domain → continue at step 2 with
     **White-Label**.

2. **Do you need your own identity provider**, your own Google/GitHub apps,
   your own consent-screen branding, or your corporate single sign-on?
   - On a **subdomain**: No → **Branded**. Yes → **Branded + BYOC**.
   - On **your own domain**: No → **White-Label** (social sign-in works on the
     platform's apps). Yes → **White-Label + BYOC** (the full experience).

{{< alert type="info" >}}
**Rule of thumb.** Social sign-in works out of the box in every scenario,
including on your own domain on a *different* base domain from the deployment,
using the platform's identity providers. Bringing your own identity provider
is **always optional**, whatever your domain: choose it only when you want
your own consent-screen branding, your own OAuth rate limits and audit trail,
corporate single sign-on, or a distinct authentication boundary. The full
breakdown is in [Identity Services → BYOC is always optional](/cloud/guides/self-hosted/planning/identity-services/#byoc-is-always-optional).
{{< /alert >}}

## These choices are independent of who can join

The scenario you pick controls **where and how** users sign in. It does
**not** control **who is allowed to join** your organization, that is set
separately through invitations (open self-service vs. invite-only, optional
email-domain allowlists, role and team assignment, quotas, and expiry). Any
scenario above can be paired with any membership policy. See
[Organization Management](/cloud/guides/organizations/org-management/)
and [User Invitations](/cloud/concepts/identity-and-security/users/user-invitations/).

## Set up a custom domain

A domain routes users who arrive at that address into your organization. Every scenario other than Hosted depends on one.

Only a **Provider Admin** can set a domain to a new value. An Organization Admin sees the domain field, but the save fails with a 403 error that says the domain requires a Provider Admin. Organization administrators can keep the stored value and can clear it.

Layer5 Cloud checks the domain when it changes:

| Rule | Detail |
| --- | --- |
| Length | 3 to 253 characters. |
| Labels | Dot-separated, each 1 to 63 ASCII letters, digits, or hyphens, not starting or ending with a hyphen. |
| Format | A hostname. Email-shaped input with `@` is rejected. The value cannot start with `http`, `https`, or `www`. |
| Internationalized names | Write them in Punycode (`xn--`). |
| Reserved hosts | The provider's own hosts, including the canonical Layer5 Cloud address, are rejected. |
| Uniqueness | One organization per domain. Deleted organizations keep their domain, so clear the domain before you delete an organization if the address must be reused. |

The check is syntactic. Layer5 Cloud does not resolve the name when you save. Point the domain's DNS at your Layer5 Cloud deployment, as described in [White-labeling](/cloud/guides/self-hosted/white-labeling/).

How the domain is used:

- The host of each request, with the protocol and port removed, is compared exactly to organization domains. `cloud.acme.com` and `www.cloud.acme.com` are different hosts.
- A request that arrives on an organization's domain runs in that organization or in the requester's own organization beneath it, and its branding always comes from the domain's organization. A saved preference or browser session that names an organization outside the domain organization's tree is ignored on that domain. See [On a custom domain](/cloud/guides/organizations/org-management/#on-a-custom-domain).
- **Sign-up on the domain.** Each person who signs up on an organization's domain gets their own organization beneath the domain's organization, unless they are a non-member who signs in on the domain through the organization's open invitation, in which case they join through that invitation instead. The new organization comes with a team, a workspace, and the domain organization's branding, and the person is its administrator. Accounts that signed up on a domain before this behavior existed receive one automatically. Members of the domain's organization do not.
- The deployment's own address, IP addresses, and reserved hosts are never treated as custom domains.
- Lookups, including misses, are cached for five minutes. Creating, updating, or deleting an organization clears the affected entry on the server that handled the change.
- Emptying the field removes the assignment.
- When an organization has an open invitation, a non-member who signs in on its domain joins through it.

The by-domain lookup is public and needs no credentials. It returns the organization record when the domain is assigned and `null` with a 200 status when it is not:

```bash
curl "https://cloud.layer5.io/api/identity/orgs/by-domain?domain=cloud.acme.com"
```

Substitute your deployment's address and your hostname. A `null` result means the domain is unassigned, mistyped, or still inside the cache window for a recent change.

## Add your own identity provider

Organization Admins and Owners add, rotate, and remove identity providers without the provider's help. The procedure is in [Configuring Identity Providers](/cloud/guides/organizations/org-management/#configuring-identity-providers-bring-your-own-credentials). The first provider you save switches the organization to its own identity providers. Removing the last one returns it to the platform's defaults. Bringing your own identity provider is always optional, whatever the domain. To use your own identity provider, give the organization a branded subdomain or a custom domain first. The shared front door always uses the shared identity provider.
