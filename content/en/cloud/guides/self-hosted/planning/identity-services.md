---
title: Identity Services
description: "Understand identity services prerequisites and how to integrate your existing identity with OIDC."
categories: [Self-Hosted]
tags: [identity]
weight: 3
aliases:
  - /cloud/self-hosted/planning/identity-services/

---

Layer5 Cloud offers a built-in identity provider (IDP), supporting OIDC for normal users and token-based authentication (access, ID, refresh tokens) for API clients with JSON Web Signature (JWS) for token signing. Layer5 Cloud users can sign-up via email and password in addition to social identity providers (Google and GitHub) via OAuth2. See [Getting Started with a Layer5 Account](/cloud/getting-started/getting-started-with-layer5-account/) for details.

Layer5 Cloud identity services include features such as account recovery, email verification, automatica social sign-in account linking, and multi-factor authentication (coming soon).

{{< alert type="info" >}}
For more information, see [User Account Linking](/cloud/concepts/identity-and-security/users).
{{< /alert >}}

Layer5 Cloud is also working toward being the IDP for Layer5 by supporting OIDC. It will leverage social authentication with Google, GitHub, Twitter, and LinkedIn based on OIDC to authenticate normal users. After authentication, Layer5 Cloud will be able to generate the access token, ID token, and refresh token for normal users. Applications, on the other hand, will use client credential OAUTH2 to get an access token.

The following diagram illustrates the architecture of Layer5 Cloud.

![self-hosted-deployment](../images/self-hosted-deployment.svg "image-center-no-shadow")

## Identity providers and custom domains

By default, every organization signs users in through your deployment's **shared (default) identity providers** — the Google and GitHub OAuth applications configured for the Provider Organization. Users see those applications' name and logo on the Google or GitHub consent screen, and no per-organization setup is required.

### Bring Your Own Credentials (BYOC)

An organization can optionally **bring its own credentials (BYOC)**: its own Google OAuth client and GitHub OAuth App. With BYOC, the upstream consent screen, the registered redirect URL, and the entire OAuth round trip carry the organization's own branding and stay on the organization's own domain. BYOC is enabled per organization by a [Provider Administrator](/cloud/concepts/identity-and-security/roles/#provider-admin-role); an organization owner then registers the OAuth client ID and secret.

### When BYOC is optional vs. required

Whether BYOC is *optional* or *required* depends on your organization's [custom domain](/cloud/guides/self-hosted/white-labeling/#social-sign-in-on-a-custom-domain) and how it relates to the **base domain** (the registrable domain, or eTLD+1) of your deployment:

| Organization's domain | Default identity providers | BYOC |
| --- | --- | --- |
| No custom domain, or a subdomain of the deployment's base domain (e.g. `team.example.com` on a `cloud.example.com` deployment) | Social sign-in works out of the box | **Optional** — only for your own branding, scale, or isolation |
| A fully-custom domain on a different base domain (e.g. `meshery.yourcompany.com` pointed at the hosted `cloud.layer5.io`) | Social sign-in cannot complete | **Required** for Google / GitHub sign-in |

On a fully-custom domain **without** BYOC, the Google and GitHub buttons are hidden on the login and sign-up screens and users sign in with email and password. Configuring the organization's own identity providers restores the social buttons on that domain.

{{< alert type="info" >}}
For the custom-domain setup walkthrough and the on-eTLD vs. off-eTLD distinction, see [White-labeling → Social sign-in on a custom domain](/cloud/guides/self-hosted/white-labeling/#social-sign-in-on-a-custom-domain).
{{< /alert >}}
