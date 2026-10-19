# Identity and Security

> How organizations, teams, users, roles, keychains, keys, sessions, and tokens fit together in Layer5 Cloud, where the security boundaries sit, and which page answers each question.



Identity and security in Layer5 Cloud answer two questions for every request: who is acting, and what that person may do in the organization the request runs in. The answer is never decided by one thing. Organization membership, the roles a person holds in that organization, and resources shared with them directly each contribute, and the same person can hold different access in each organization they belong to. This page gives you that mental model and the boundaries it creates. To go straight to a task or a lookup, use [Choose the right page](#choose-the-right-page).

## The building blocks

The organization is the unit of multi-tenancy. Everything else either lives inside an organization or is evaluated in the context of one. The structure is flexible: an organization has any number of teams, a team has any number of members, and a user can belong to any number of teams and organizations.

| Unit | What it is | Who administers it |
|---|---|---|
| Provider organization | The single top-level organization that operates a Layer5 Cloud deployment. It owns the deployment's default identity providers, which tenant organizations use unless they bring their own. | Provider Admins |
| Tenant organization | Every other organization: the boundary for resources, billing, and access control. Each is configured as Hosted, Branded, or White-Label. | Its owner, who created it, and its Organization Admins |
| Child organization | A tenant organization created inside another tenant organization. Nesting has no depth limit. | Its own Organization Admins, plus the Organization Admin or owner of its direct parent |
| Team | A named group of organization members that receives roles and workspace access together. Teams do not nest. | The team's owner and Team Admins manage membership. Organization Admins create and delete teams. |
| Workspace | A group of shared resources, such as environments, connections, and designs, inside one organization. Teams are assigned to workspaces. | Organization Admins, Workspace Admins, and Workspace Managers |
| User | An individual's account. It exists independently of any organization. | The person who owns it. Organization Admins edit the profiles of their members; only a Provider Admin deletes an account. |

Read [Organizations](/cloud/concepts/identity-and-security/organizations/), [Teams](/cloud/concepts/identity-and-security/teams/), and [Workspaces](/cloud/concepts/workspaces/) for the full behavior of each unit.

## Users and accounts

Everyone who uses Layer5 Cloud signs in to a user account. The account is the person's identity on the platform, and it belongs to the person, not to any organization. Every action, such as creating a design or reviewing a deployment request, is attributed to the account that performed it, regardless of which teams or organizations that account belongs to. An account can own resources of its own, including workspaces, designs, connections, and tokens.

Layer5 Cloud allows one active account per email address, and a person can sign in to it with a password, GitHub, or Google. See [Users](/cloud/concepts/identity-and-security/users/) and [Account Consolidation](/cloud/concepts/identity-and-security/users/account-consolidation/).

Membership and account are separate. Joining or leaving an organization changes membership only; the account and everything it owns outside that organization are unaffected.

## Roles and where they apply

A role is what you assign to a person. Roles are defined once for the whole deployment, but every assignment is scoped: a person holds a role in a particular organization or a particular team. Roles fall into three scopes by who assigns them.

| Scope | Roles | Assigned by |
|---|---|---|
| Provider | Provider Admin, Kanvas, Curator | Provider Admins. Every new account receives the Kanvas role automatically at sign-up. |
| Organization | Organization Admin, User, Workspace Admin, Workspace Manager, Academy Admin, Academy Learner | Organization Admins, within their organization |
| Team | Team Admin | Team Admins, within their team |
| None | Anonymous User | Applied automatically to people who use Kanvas without signing in. It cannot be assigned. |

Provider Admin passes every permission check, so a Provider Admin can assign any role in any scope. A role held in a team applies across every organization the team is mapped into, not only inside the team. [Roles](/cloud/concepts/identity-and-security/roles/) explains what each role is for, and [Roles and Permissions](/cloud/reference/default-permissions/) lists the keys each one holds.

## How Identity, Access, and Authorization Fit Together

Organization membership alone does not decide what a user can see and do. Three independent mechanisms compose on top of the organization:

* **Authentication: the organization's connected identity provider.** The identity provider establishes who a user is. Many organizations share the deployment's identity provider. An organization can instead bring its own, in which case its users authenticate against that dedicated provider. See [Identity Services](/cloud/guides/self-hosted/planning/identity-services/).
* **Authorization: keys, keychains, and roles, evaluated per organization.** [Keys](/cloud/concepts/identity-and-security/keys/) roll up into [keychains](/cloud/concepts/identity-and-security/keychains/), keychains roll up into [roles](/cloud/concepts/identity-and-security/roles/), and users hold roles. This layer decides which operations a user may perform. A user's permissions in an organization are the union of the keys from every role they hold there, so the same person can hold a different set of capabilities in each organization.
* **Granular access: resource-access mappings.** A single resource, such as one design, can be shared with an individual user. The mapping grants access to that one resource and deliberately crosses organization boundaries: the recipient does not need to be a member of the resource's organization. This is what makes collaboration between organizations possible. A mapping does not make the recipient a member, give them a role, or reach any other resource.

The result: one person can be a member of several organizations with different capabilities in each, and can also open individual resources shared with them in organizations they do not belong to.

## Security Boundaries

Because identity and authorization are layered, the question "where is the boundary?" has an answer for each layer.

**The organization is the unit of tenancy and the core security boundary.** Teams, workspaces, and role assignments compose on top of the organization. Resources, billing, and access control are isolated per organization.

**For authorization, each organization context is its own boundary.** Keys, keychains, and roles are evaluated per user and organization pair. A user acting in one organization has a capability set scoped independently from the same user acting in another, including when those organizations are reached through different per-organization subdomains. Working on one organization's subdomain does not bring along permissions held in another organization.

**For authentication, the connected identity provider sets the boundary, not the shape of the URL.** An organization can be reached on the canonical host, on a custom subdomain under the same base domain as that host, or on a fully custom domain under a different base domain. Across all of these:

> **Same identity provider source means the same security boundary.**

Organizations that share an identity provider, which is typical for the canonical host and for custom subdomains that use the shared provider, sit inside the same authentication boundary. An organization that brings its own identity provider is a distinct authentication boundary, whatever its host is named. See [Identity Services](/cloud/guides/self-hosted/planning/identity-services/) and [Social sign-in on a custom domain](/cloud/guides/self-hosted/white-labeling/#social-sign-in-on-a-custom-domain) for how this plays out on each host type.

## Keys, Keychains, Sessions, and Tokens

Four building blocks carry authorization and authentication.

| Building block | What it is | Behavior to know |
|---|---|---|
| [Keys](/cloud/concepts/identity-and-security/keys/) | The atomic permission. A key allows one action, such as Create Team. | Every permission check tests a key in the organization of the request. Keys are deployment-wide, and only a Provider Admin changes them. |
| [Keychains](/cloud/concepts/identity-and-security/keychains/) | A named bundle of keys. Roles include keychains. | A keychain grants nothing on its own. A change to a keychain applies to every holder of every role that includes it, in every organization. |
| [Sessions](/cloud/concepts/identity-and-security/sessions/) | The credential issued at each sign-in, one per browser, device, or Meshery Server. | A browser session lasts 24 hours by default, and activity does not extend it. It ends on expiry, on Logout from the Sessions tab, or on signing out. |
| [API tokens](/cloud/concepts/identity-and-security/tokens/) | A credential for scripts, CI/CD pipelines, and Meshery clients. | A token acts as your user account in every organization you belong to, with no scopes. It never expires and stays valid until you delete it. |

Sessions and tokens carry no permissions of their own. Layer5 Cloud evaluates the user's roles on every request, so role changes take effect on the next request. The [Security Reference](/cloud/reference/security/) lists security keys, lifetimes, and endpoints in one place.

## Choose the right page

| Question | Page | Type |
|---|---|---|
| How do I get from sign-up to a working organization? | [Getting Started](/cloud/getting-started/) and [Set Up Your Organization](/cloud/getting-started/setting-up-your-organization/) | Tutorial |
| What is an organization, who owns it, and how does a request find its organization? | [Organizations](/cloud/concepts/identity-and-security/organizations/) | Explanation |
| How do teams grant roles and workspace access? | [Teams](/cloud/concepts/identity-and-security/teams/) | Explanation |
| What is a user account, and what happens when it is deleted? | [Users](/cloud/concepts/identity-and-security/users/) | Explanation |
| Why do my password and social sign-ins reach the same account? | [Account Consolidation](/cloud/concepts/identity-and-security/users/account-consolidation/) | Explanation |
| What is each role for, and who can assign it? | [Roles](/cloud/concepts/identity-and-security/roles/) | Explanation |
| How do permissions reach a user, and how do I trace a missing one? | [Keys](/cloud/concepts/identity-and-security/keys/) | Explanation |
| What does a keychain change, and who can change it? | [Keychains](/cloud/concepts/identity-and-security/keychains/) | Explanation |
| How long does a sign-in last, and what ends it? | [Sessions](/cloud/concepts/identity-and-security/sessions/) | Explanation |
| How does an API token behave, and how risky is it? | [Tokens](/cloud/concepts/identity-and-security/tokens/) | Explanation |
| How do I add, create, edit, or remove people in an organization? | [Manage Users](/cloud/guides/organizations/managing-users/) | How-to |
| How do I bring new people in by invitation? | [Invite Users](/cloud/guides/organizations/inviting-users/) | How-to |
| How do I approve or deny product access requests? | [Review Access Requests](/cloud/guides/organizations/access-requests/) | How-to |
| How do I create teams and manage their members? | [Manage Teams](/cloud/guides/organizations/managing-teams/) | How-to |
| How do I give someone a role or take one away? | [Assign and Manage Roles](/cloud/guides/organizations/managing-roles/) | How-to |
| How do I create, edit, brand, switch, or delete an organization? | [Manage an Organization](/cloud/guides/organizations/org-management/) | How-to |
| Which configuration fits my domain and identity provider? | [Organization Configuration Scenarios](/cloud/guides/organizations/configuration-scenarios/) | How-to |
| How do I create or revoke a token, sign out a session, or build a keychain? | [Security guides](/cloud/guides/security/) | How-to |
| Which keys does each default role hold? | [Roles and Permissions](/cloud/reference/default-permissions/) | Reference |
| What are the security keys, lifetimes, cookies, and endpoints? | [Security Reference](/cloud/reference/security/) | Reference |

## Common questions

**Why does one person have different capabilities in two organizations?**
Roles are assigned per organization, and every check tests the keys the person holds in the organization of the request. Holding Organization Admin in one organization grants nothing in another. See [Roles](/cloud/concepts/identity-and-security/roles/).

**Why is an action refused even though the person holds the role I expected?**
A role's name grants nothing by itself; only its keys do. Either none of the person's roles holds the key the action requires, or the request ran in a different organization than intended. See [Why checks test keys, not role names](/cloud/concepts/identity-and-security/roles/#why-checks-test-keys-not-role-names) and [Tracing a missing permission](/cloud/concepts/identity-and-security/keys/#tracing-a-missing-permission).

**Does a role held in a team apply only inside that team?**
No. A role held in a team applies across every organization the team is mapped into. See [Teams](/cloud/concepts/identity-and-security/teams/#how-a-team-grants-access).

**Can someone outside my organization open one of our designs?**
Yes, when the design is shared with them through a resource-access mapping. The mapping covers that design only and does not make them a member. See [Cross-organization access](/cloud/concepts/identity-and-security/organizations/#cross-organization-access).

**What does removing someone from an organization end?**
Their membership in the organization, their organization roles, and their membership and roles in that organization's teams. Their account, their memberships in other organizations, and the resources they created remain. See [What removal ends](/cloud/guides/organizations/managing-users/#what-removal-ends).

**How do I delete someone's account entirely?**
Account deletion is separate from removal and is a Provider Admin capability. A person can also delete their own account. See [Delete an account](/cloud/guides/organizations/managing-users/#delete-an-account) and [Users](/cloud/concepts/identity-and-security/users/).

**Can I limit an API token to one organization or to read-only access?**
No. A token acts with your full authority in every organization you belong to. To give automation narrower authority, issue the token from an account whose roles are narrower. See [What a token can do](/cloud/concepts/identity-and-security/tokens/#what-a-token-can-do).

**Can my organization create its own custom role on hosted Layer5 Cloud?**
No. Creating or changing a role is a Provider Admin action, and Layer5 operates that role on hosted Layer5 Cloud. Self-hosted operators can create custom roles. See [Custom roles](/cloud/concepts/identity-and-security/roles/#custom-roles).

## Need more detail?

See [Roles and Permissions](/cloud/reference/default-permissions/) for the complete matrix of keys held by each default role.

