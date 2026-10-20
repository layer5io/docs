# Identity Services


> Understand identity services prerequisites and how to integrate your existing identity with OIDC.


Layer5 Cloud offers a built-in identity provider (IDP), supporting OIDC for normal users and token-based authentication (access, ID, refresh tokens) for API clients with JSON Web Signature (JWS) for token signing. Layer5 Cloud users can sign-up via email and password in addition to social identity providers (Google and GitHub) via OAuth2. See [Getting Started with a Layer5 Account](/pr-preview/pr-1351/cloud/getting-started/getting-started-with-layer5-account/) for details.

Layer5 Cloud identity services include account recovery, email verification, and social sign-in with Google and GitHub. Password sign-in is on, with a minimum of 8 characters, a check against known-breached passwords, and a rejection when the password is too similar to the account identifier.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Info</h4>
  
      For more information, see <a href="/pr-preview/pr-1351/cloud/concepts/identity-and-security/users/">User Account Linking</a>.
  
</div>



Ory Kratos owns user accounts and sign-in. Ory Hydra issues OAuth2 tokens. The Layer5 Cloud server connects the two to organizations, teams, and roles. Social sign-in is Google and GitHub. Access tokens are JWTs, valid 24 hours. Refresh tokens are valid 1000 hours, ID tokens 1 hour, and authorization codes 1 hour. Login flows must finish within 12 hours (`720m`). Registration flows last 24 hours. Recovery and verification flows last 30 days (`720h`) and use codes.

## Identity providers and custom domains







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Info</h4>
  
      This page covers the <em>mechanics</em> of identity providers and authentication boundaries. For the named, end-to-end <strong>organization configurations</strong> that combine these choices with custom domains  -  and guidance on when to pick each  -  see <a href="/pr-preview/pr-1351/cloud/guides/organizations/configuration-scenarios/">Organization Configuration Scenarios</a>.
  
</div>



By default, every organization signs users in through your deployment's **shared (default) identity providers**  -  the Google and GitHub OAuth applications configured for the Provider Organization. Users see those applications' name and logo on the Google or GitHub consent screen, and no per-organization setup is required.

### Bring Your Own Credentials (BYOC)

An organization can optionally **bring its own credentials (BYOC)**: its own Google OAuth client, GitHub OAuth App, or an OIDC provider. With BYOC, the upstream consent screen and the exchange can carry the organization's own branding. The organization's administrators register the credentials themselves. Provider Admins can do it for any organization. See [Configuring Identity Providers](/pr-preview/pr-1351/cloud/guides/organizations/org-management/#configuring-identity-providers-bring-your-own-credentials).

### BYOC is always optional

BYOC is **always optional**. Social sign-in (Google and GitHub) works out of the box on every [custom domain](/pr-preview/pr-1351/cloud/guides/self-hosted/white-labeling/#social-sign-in-on-a-custom-domain)  -  including a fully-custom domain on a different **base domain** (the registrable domain, or eTLD+1) from your deployment  -  using the deployment's default identity providers. You bring your own credentials only when you want your own brand, controls, or isolation, never to make social sign-in available:

| Organization's domain | Default identity providers | BYOC |
| --- | --- | --- |
| No custom domain, or a subdomain of the deployment's base domain (e.g. `team.example.com` on a `cloud.example.com` deployment) | Social sign-in works out of the box | **Optional**  -  only for your own branding, scale, or isolation |
| A fully-custom domain on a different base domain (e.g. `meshery.yourcompany.com` pointed at the hosted `cloud.layer5.io`) | Social sign-in works out of the box | **Optional**  -  only for your own branding, scale, or isolation |

On a fully-custom domain, the Google and GitHub buttons are shown alongside email-and-password sign-in and work without any per-organization configuration. Configuring the organization's own identity providers (BYOC) changes *whose* OAuth apps and consent screen are used  -  it does not gate whether social sign-in is available.

### The identity provider is the security boundary

When you are reasoning about which organizations sit inside the *same* authentication boundary, look at the connected identity provider  -  not at the name or DNS shape of the host:

> **Same identity provider source means the same security boundary.**

Organizations that share an identity provider sit within the same authentication boundary; an organization that brings its own provider (BYOC) is a distinct authentication boundary. This holds regardless of which *class* of host an organization is reached on:

| Host class | Example | Identity provider it uses | Authentication boundary |
| --- | --- | --- | --- |
| **Canonical host** | `cloud.layer5.io` | The deployment's shared, central provider | The shared boundary |
| **On-eTLD custom host** (a subdomain under the same base domain as the canonical host) | `partner.layer5.io` on a `cloud.layer5.io` deployment | The same shared, central provider | The **same** shared boundary as the canonical host |
| **Off-eTLD custom host** (a fully-custom domain on a different base domain) | `meshery.yourcompany.com` pointed at `cloud.layer5.io` | The same shared, central provider (unless BYOC is configured) | The **same** shared boundary as the canonical host (unless BYOC is configured) |
| **Any host, with BYOC** | any of the above, after configuring BYOC | The organization's own dedicated provider | A **distinct** boundary |

By default, every host class  -  canonical, on-eTLD, and off-eTLD  -  draws on the shared, central identity provider, so organizations reached through them sit within one shared authentication boundary. An organization with its own (BYOC) identity provider is its own boundary, no matter how its host is named. The DNS shape of the host is not the boundary  -  the identity provider behind it is.

This is the authentication (host-class) view of the boundary. It composes with the **authorization** view  -  where each organization context independently scopes what a user is permitted to do via [keys](/pr-preview/pr-1351/cloud/concepts/identity-and-security/keys/), [keychains](/pr-preview/pr-1351/cloud/concepts/identity-and-security/keychains/), and [roles](/pr-preview/pr-1351/cloud/concepts/identity-and-security/roles/)  -  and with **granular** resource-access sharing that can cross organizations. For the complete picture of how these layers fit together, see [Identity and Security → Security Boundaries](/pr-preview/pr-1351/cloud/concepts/identity-and-security/#security-boundaries).







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Info</h4>
  
      For the custom-domain setup walkthrough and the on-eTLD vs. off-eTLD distinction, see <a href="/pr-preview/pr-1351/cloud/guides/self-hosted/white-labeling/#social-sign-in-on-a-custom-domain">White-labeling: Social sign-in on a custom domain</a>.
  
</div>



## What the chart configures by default

| Capability | Default |
| --- | --- |
| Password sign-in | On. Minimum 8 characters. |
| Email verification | Required before a password sign-in succeeds. Delivered as a code. |
| Account recovery | On, delivered as a code. |
| Social sign-in | Google and GitHub are enabled but have no credentials until you add them. |
| Session lifespan | Not set by the chart. Kratos applies its own default. See [Sessions](/pr-preview/pr-1351/cloud/concepts/identity-and-security/sessions/). |

Change these through `kratos.kratos.config` and `hydra.hydra.config`. Both are passed to the Ory services unchanged.

## Default Google and GitHub sign-in

You supply the defaults as two OAuth applications, and the deployment uses them in two places. Use the same application for both.

| Where | Used for | Configured with |
| --- | --- | --- |
| Kratos | Social sign-in and sign-up on the deployment's own hostname, and social sign-up on every hostname | `client_id` and `client_secret` of the `github` and `google` entries under `kratos.kratos.config.selfservice.methods.oidc.config.providers` |
| Layer5 Cloud server | Social sign-in on organization custom domains | `env.providerOrgGithubKey`, `env.providerOrgGithubSecret`, `env.providerOrgGoogleKey`, `env.providerOrgGoogleSecret` |

| Provider | Addresses to register |
| --- | --- |
| Google | `https://<host>/kratos/self-service/methods/oidc/callback/google` and `https://<host>/oidc/callback/google`. Google matches redirect addresses exactly. |
| GitHub | `https://<host>/`. GitHub matches by path prefix, so the host root covers both callbacks. |

You register addresses on your deployment hostname only. A custom-domain organization that uses the default providers completes the exchange on your hostname and returns to its own domain.

### How the defaults are stored

At every start, the server reads the `env.providerOrg*` values and stores each pair it finds, encrypted with `env.cloudCredentialEncryptionKey`, as a credential and connection in an administrative environment of the provider organization.

- **A provider needs both its key and its secret.** A provider with only one set is skipped.
- **The server needs an administrator first.** The seed waits until the provider organization has a member. [Provider initialization](/pr-preview/pr-1351/cloud/guides/self-hosted/deployment/#provider-initialization) creates that member on first start, and the seed runs on the same start.
- **Stored credentials are not overwritten.** After the first successful seed, changing `env.providerOrg*` and redeploying does not change what the server uses. Replacing them means replacing the stored credential in the database. Ask [support](/pr-preview/pr-1351/cloud/getting-started/support/) when you must rotate.

The seed never blocks startup. When it fails, sign-in on custom domains that rely on the defaults fails until a later start succeeds. Search the startup log for `IdP seed` messages.

