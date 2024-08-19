---
title: Identity Services
description: "Understand identity services prerequisites and how to integrate your existing identity with OIDC."
categories: [Self-Hosted]
tags: [identity]
weight: 3
---

{{< front-matter feature_name="Authentication SAML" >}}

Layer5 Cloud offers a built-in identity provider (IDP), supporting OIDC for normal users and token-based authentication (access, ID, refresh tokens) for API clients with JSON Web Signature (JWS) for token signing. Layer5 Cloud users can sign-up via email and password in addition to social identity providers (Google and GitHub) via OAuth2. See [Getting Started with a Layer5 Account](../../getting-started/getting-started-with-layer5-account.md) for details.

Layer5 Cloud identity services include features such as account recovery, email verification, automatica social sign-in account linking, and multi-factor authentication (coming soon).

{{< alert type="info" >}}
For more information, see [User Account Linking](/cloud/identity/users).
{{< /alert >}}

Layer5 Cloud is also working toward being the IDP for Layer5 by supporting OIDC. It will leverage social authentication with Google, GitHub, Twitter, and LinkedIn based on OIDC to authenticate normal users. After authentication, Layer5 Cloud will be able to generate the access token, ID token, and refresh token for normal users. Applications, on the other hand, will use client credential OAUTH2 to get an access token.

The following diagram illustrates the architecture of Layer5 Cloud.

![self-hosted-deployment](../images/self-hosted-deployment.svg "image-center-no-shadow")
