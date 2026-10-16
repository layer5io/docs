# Organization Configuration Scenarios


> Choose how an organization is reached and who authenticates its users, then set up a custom domain. Covers the Hosted, Branded, and White-Label scenarios.



Every organization in Layer5 Cloud is configured by two choices: **where your users sign in** (the front door) and **whose identity provider authenticates them**. The combinations form five named scenarios. This guide helps you pick one and then walks through the settings that implement it, including who is allowed to change each setting.

For the mechanics behind the choices, see [White-labeling](/cloud/guides/self-hosted/white-labeling/) (themes, logos, custom domains) and [Identity Services](/cloud/guides/self-hosted/planning/identity-services/) (bring-your-own-credentials and authentication boundaries).

## Provider and tenant organizations {#first-the-two-organization-types}

These scenarios configure a **tenant organization**, which is every organization except one.

- **Provider organization.** The single top-level organization that operates the deployment. On the hosted service it is Layer5. On a self-hosted deployment it is your platform team. It owns the deployment's default identity providers, the Google and GitHub applications every other organization falls back to. A Provider Admin manages platform-wide settings.
- **Tenant organization.** Every other organization: a customer, partner, or business unit. A tenant is what you configure into one of the scenarios below.

The provider organization always signs in on the deployment's canonical address with the default identity providers.

## The two choices

| Choice | Options |
| --- | --- |
| **Front door**: where users sign in | **Shared**: the deployment's own address, such as `cloud.layer5.io`. **Branded subdomain**: a subdomain of the deployment's base domain, such as `acme.layer5.io`. **Custom domain**: your own domain, such as `cloud.acme.com`. |
| **Identity provider**: who runs sign-in | **Shared**: the deployment's Google and GitHub applications. **Your own (BYOC)**: your own Google, GitHub, or OIDC single sign-on. |

Email-and-password sign-in and the Google and GitHub buttons work in every scenario, including on a custom domain that uses the default identity providers. The scenarios differ in whose identity provider authenticates users and whose brand appears on the consent screen, not in whether social sign-in is available.

## The scenarios at a glance

| Scenario | Front door | Identity provider | Branded sign-in pages | Consent screen shows | Setting needed |
| --- | --- | --- | --- | --- | --- |
| **Hosted** | Shared | Shared | No (shared page) | Platform name | None. This is the default. |
| **Branded** | Branded subdomain | Shared | Yes | Platform name | Domain (Provider Admin) |
| **Branded + BYOC** | Branded subdomain | Your own | Yes | Your brand | Domain (Provider Admin) and identity providers |
| **White-Label** | Custom domain | Shared | Yes | Platform name | Domain (Provider Admin) |
| **White-Label + BYOC** | Custom domain | Your own | Yes | Your brand | Domain (Provider Admin) and identity providers |

One combination does not exist: the shared front door always uses the shared identity provider, so there is no "Shared + your own identity provider". To use your own identity provider, give the organization a branded subdomain or a custom domain first.

## Choose a scenario {#how-to-choose}

1. **Do you need a branded address?**
   - No: use **Hosted**. Nothing to configure.
   - A subdomain of the platform is fine: continue with **Branded**.
   - It must be your own domain: continue with **White-Label**.
2. **Do you need your own identity provider?** You need one for your own consent-screen branding, your own OAuth rate limits and audit trail, corporate single sign-on, or a distinct authentication boundary.
   - On a subdomain: no means **Branded**, yes means **Branded + BYOC**.
   - On your own domain: no means **White-Label**, yes means **White-Label + BYOC**.

Bringing your own identity provider is always optional, whatever the domain.

## What each scenario means for your users {#the-scenarios-in-detail}

### Hosted

Users sign in at the deployment's address and pick your organization in the organization switcher. Theme colors and logo appear inside the app. The sign-in page itself is the platform's, shared by every organization on that address. This is the default and needs no configuration.

### Branded

The organization has its own subdomain of the deployment's base domain. Sign-in, sign-up, and error pages carry your colors, logo, and links. Social buttons use the platform's applications, so the consent screen shows the platform's name.

### Branded + BYOC

A branded subdomain plus your own OAuth clients or OIDC provider. The consent screen shows your brand, and the organization becomes a distinct authentication boundary. See [The identity provider is the security boundary](/cloud/guides/self-hosted/planning/identity-services/#the-identity-provider-is-the-security-boundary).

### White-Label

The organization runs on your own domain, on a different base domain from the deployment, with the platform's identity providers. Social sign-in works without extra setup and shows the platform's name on the consent screen.

### White-Label + BYOC

Your domain and your identity provider. The organization is branded end to end. This is the usual choice for a partner or reseller that offers the platform under its own name.

## Set up a custom domain

A domain routes users who arrive at that address into your organization. The scenarios other than Hosted all depend on it.

### Who can set it

Only a **Provider Admin** can set a domain to a new value. An Organization Admin sees the domain field in the organization settings, but the save fails with a 403 error that says the domain requires a Provider Admin. Organization administrators can keep the stored value and can clear it. Ask the provider to set the domain, and tell them the exact hostname.

### What a valid domain looks like

Layer5 Cloud checks the domain when it changes:

| Rule | Detail |
| --- | --- |
| Length | 3 to 253 characters. |
| Labels | Dot-separated, each 1 to 63 ASCII letters, digits, or hyphens, not starting or ending with a hyphen. |
| Format | A hostname. Email-shaped input with `@` is rejected. The value cannot start with `http`, `https`, or `www`. |
| Internationalized names | Write them in Punycode (`xn--`). |
| Reserved hosts | The provider's own hosts, including the canonical Layer5 Cloud address and the Layer5 marketing and documentation hosts, are rejected. |
| Uniqueness | One organization per domain. Deleted organizations keep their domain, so clear the domain before you delete an organization if the address must be reused. |

The check is syntactic. Layer5 Cloud does not resolve the name when you save, so a valid hostname whose DNS is not ready yet is accepted. Point the domain's DNS at your Layer5 Cloud deployment, as described in [White-labeling](/cloud/guides/self-hosted/white-labeling/).

### How the domain is used

- **Exact match.** Layer5 Cloud compares the host of each request, with the protocol and port removed, to organization domains. The match is exact, so `cloud.acme.com` and `www.cloud.acme.com` are different hosts.
- **The domain wins.** A request that arrives on an organization's domain runs in that organization, ahead of the request header, the saved preference, and the browser session. See [Switching Between Organizations](/cloud/guides/organizations/org-management/#switching-between-organizations).
- **Never custom.** The deployment's own address, IP addresses, and reserved hosts are never treated as custom domains.
- **Cache.** Lookups, including misses, are cached for five minutes. Creating, updating, or deleting an organization clears the affected entry on the server that handled the change, so the change is visible there immediately and everywhere within the cache window.
- **Clearing.** Emptying the field removes the assignment. Users who arrive on the old address no longer land in the organization.
- **Open invitation.** When an organization has an [open invitation](/cloud/guides/organizations/org-management/#using-the-open-organization-invitation-link), a non-member who signs in on its domain joins through it.

Changing a domain that users already rely on can break their routing and bookmarks. Announce the change first.

### Verify the assignment

The by-domain lookup is public and needs no credentials. It returns the organization record when the domain is assigned and `null` with a 200 status when it is not:

```bash
curl "https://cloud.layer5.io/api/identity/orgs/by-domain?domain=cloud.acme.com"
```

Substitute your deployment's address and your hostname. A `null` result means the domain is unassigned, mistyped, or still inside the cache window for a recent change.

## Add your own identity provider

Organization Admins and Owners add, rotate, and remove identity providers without the provider's help. The procedure is in [Configuring Identity Providers](/cloud/guides/organizations/org-management/#configuring-identity-providers-bring-your-own-credentials). The first provider you save switches the organization to its own identity providers. Removing the last one returns it to the platform's defaults.

## Membership policy is independent {#these-choices-are-independent-of-who-can-join}

The scenario controls where and how users sign in. It does not control who may join. Membership is governed by invitations, open sign-up, and the roles and teams an invitation grants. Any scenario pairs with any membership policy. See [Using the Open Organization Invitation Link](/cloud/guides/organizations/org-management/#using-the-open-organization-invitation-link) and [User Invitations](/cloud/guides/organizations/inviting-users/).

