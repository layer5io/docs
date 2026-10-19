# Identity Services


> Plan the identity services of a self-hosted deployment: Kratos accounts, Hydra tokens, the default Google and GitHub sign-in, and where organizations bring their own.


A self-hosted deployment is its own identity provider. Ory Kratos owns user accounts and sign-in, Ory Hydra issues OAuth2 tokens, and the Layer5 Cloud server connects the two to organizations, teams, and roles. Users can sign up with an email address and password, or with Google or GitHub. For how identity fits together as a concept, see [Identity and Security](/pr-preview/pr-1346/cloud/concepts/identity-and-security/).

## What the chart configures by default

| Capability | Default |
| --- | --- |
| Password sign-in | On. Minimum 8 characters, checked against known-breached passwords, and rejected when too similar to the account identifier. |
| Email verification | Required before a password sign-in succeeds. Delivered as a code. |
| Account recovery | On, delivered as a code. |
| Social sign-in | Google and GitHub are enabled but have no credentials until you add them. |
| Login flow lifespan | A started sign-in must finish within 12 hours (`720m`). |
| Recovery and verification flow lifespan | A recovery or verification request stays valid for 30 days (`720h`). |
| Registration flow lifespan | A started sign-up must finish within 24 hours. |
| Session lifespan | Not set by the chart. Kratos applies its own default. See [Sessions](/pr-preview/pr-1346/cloud/concepts/identity-and-security/sessions/). |
| Access tokens | JWT, valid 24 hours. Refresh tokens are valid 1000 hours, ID tokens 1 hour, and authorization codes 1 hour. |

Change any of these through the `kratos.kratos.config` and `hydra.hydra.config` values. Both are passed to the Ory services unchanged, so the [Kratos](https://www.ory.sh/docs/kratos/reference/configuration) and [Hydra](https://www.ory.sh/docs/hydra/reference/configuration) configuration references apply.

## Default Google and GitHub sign-in

Every organization signs in through the deployment's default providers until the organization registers its own. You supply those defaults as two OAuth applications, one for Google and one for GitHub, and the deployment uses them in two places:

| Where | Used for | Configured with |
| --- | --- | --- |
| Kratos | Social sign-in and sign-up on the deployment's own hostname, and social sign-up on every hostname | `client_id` and `client_secret` of the `github` and `google` entries under `kratos.kratos.config.selfservice.methods.oidc.config.providers` |
| Layer5 Cloud server | Social sign-in on organization custom domains | `env.providerOrgGithubKey`, `env.providerOrgGithubSecret`, `env.providerOrgGoogleKey`, `env.providerOrgGoogleSecret` |

Use the same OAuth application for both. Register these redirect addresses on it, replacing `<host>` with your deployment hostname:

| Provider | Addresses to register |
| --- | --- |
| Google | `https://<host>/kratos/self-service/methods/oidc/callback/google` and `https://<host>/oidc/callback/google`. Google matches redirect addresses exactly. |
| GitHub | `https://<host>/`. GitHub matches by path prefix, so the host root covers both callbacks. |

You register addresses on your deployment hostname only. A custom-domain organization that uses the default providers completes the exchange on your hostname and returns to its own domain.

### How the defaults are stored

At every start, the server reads the `env.providerOrg*` values and stores each pair it finds, encrypted with `env.cloudCredentialEncryptionKey`, as a credential and connection in an administrative environment of the provider organization. Three behaviors follow:

- **A provider needs both its key and its secret.** A provider with only one set is skipped, and the log says so.
- **The server needs an administrator first.** The seed records which user created the rows, so it waits until the provider organization has a member. On a new deployment, [provider initialization](/pr-preview/pr-1346/cloud/guides/self-hosted/deployment/provider-initialization/) creates that member on first start, and the seed runs on the same start.
- **Stored credentials are not overwritten.** After the first successful seed, changing `env.providerOrg*` and redeploying does not change what the server uses. There is no self-service rotation of the defaults today: replacing them means replacing the stored credential directly in the database, so plan their lifetime before you go live and ask Layer5 support for guidance when you must rotate.

The seed never blocks startup. When it fails, the server starts and sign-in on custom domains that rely on the defaults fails until a later start succeeds. Search the startup log for `IdP seed` messages.

## Bring your own credentials

An organization can register its own Google or GitHub OAuth application, or an OIDC provider, so that the consent screen carries its own brand and the whole exchange stays on its own domain. The organization's administrators do this themselves; Provider Admins can do it for any organization. See [Configuring Identity Providers](/pr-preview/pr-1346/cloud/guides/organizations/org-management/#configuring-identity-providers-bring-your-own-credentials).

Bringing your own credentials is always optional. Social sign-in works on every custom domain with the deployment's defaults, including a custom domain on a different registrable domain from your deployment. An organization brings its own credentials for its brand, its own rate limits and audit trail, or a separate authentication boundary, never to make social sign-in available.

| Organization's domain | Default providers | Own credentials |
| --- | --- | --- |
| None, or a subdomain of the deployment's base domain (`team.example.com` on a `cloud.example.com` deployment) | Work out of the box | Optional |
| A different registrable domain (`meshery.yourcompany.com` pointed at your deployment) | Work out of the box | Optional |

For the named combinations and when to choose each, see [Organization Configuration Scenarios](/pr-preview/pr-1346/cloud/guides/organizations/configuration-scenarios/).

## The identity provider is the security boundary

Organizations that sign in through the same identity provider sit inside the same authentication boundary. An organization that brings its own credentials is a distinct boundary. The shape of the host name does not decide this; the identity provider behind it does.

| Host class | Example | Identity provider | Authentication boundary |
| --- | --- | --- | --- |
| Canonical host | `cloud.example.com` | The deployment's default providers | The shared boundary |
| Subdomain of the same base domain | `partner.example.com` | The default providers | The shared boundary |
| Different base domain | `meshery.yourcompany.com` | The default providers, unless the organization brings its own | The shared boundary, unless it brings its own |
| Any host, with own credentials | Any of the above | The organization's own provider | A distinct boundary |

The authentication boundary combines with authorization: each organization context scopes what a user may do through [keys](/pr-preview/pr-1346/cloud/concepts/identity-and-security/keys/), [keychains](/pr-preview/pr-1346/cloud/concepts/identity-and-security/keychains/), and [roles](/pr-preview/pr-1346/cloud/concepts/identity-and-security/roles/). See [Security Boundaries](/pr-preview/pr-1346/cloud/concepts/identity-and-security/#security-boundaries) for the full picture.

## Custom domains

Setting up a custom domain for an organization is a Provider Admin task. See [White-label Layer5 Cloud](/pr-preview/pr-1346/cloud/guides/self-hosted/white-labeling/#configuring-a-subdomain) for the steps and [Social sign-in on a custom domain](/pr-preview/pr-1346/cloud/guides/self-hosted/white-labeling/#social-sign-in-on-a-custom-domain) for how sign-in behaves there.

