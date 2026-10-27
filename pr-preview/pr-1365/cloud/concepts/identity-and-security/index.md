# Identity and Security

> Organizations, teams, users, roles, keychains, keys, sessions, and tokens.



Organizations are the basic unit of multi-tenancy inside of Layer5 Cloud. The identity structure is flexible: an organization has any number of teams, a team has any number of members, and a user can belong to any number of teams and organizations.

Identity and security answer two questions for every request: who is acting, and what that person may do in the organization the request runs in. Organization membership, the roles a person holds in that organization, and resources shared with them directly each contribute. The same person can hold different access in each organization they belong to.

## Identity

The organization is the unit of multi-tenancy. Teams and workspaces belong to one organization. Users hold roles in it. Roles, keychains, and keys are defined once for the whole deployment, while resources, billing, and access control are isolated per organization.

Layer5 Cloud does not limit how many organizations a person may belong to, and it does not block organization actions by plan.

Outside of grouping users together, teams offer controlled access to workspaces and to workspace resources such as environments and managed and unmanaged connections. Teams do not nest.

Each user account represents an individual collaborator. The account exists beyond the bounds of organizations and belongs to the person, not to any organization. Anyone who uses Layer5 Cloud signs in to a user account. Every action is attributed to that account, regardless of which teams or organizations it belongs to. An account can own resources such as workspaces, designs, connections, and tokens. Layer5 Cloud allows one active account per email address. A person can sign in with a password, GitHub, or Google. See [Users](/pr-preview/pr-1365/cloud/concepts/identity-and-security/users/) and [Account Consolidation](/pr-preview/pr-1365/cloud/concepts/identity-and-security/users/account-consolidation/).

Joining or leaving an organization changes membership only. The account, and everything it owns outside that organization, stay.

## Organizational Units

Layer5 Cloud uses these units to isolate resources and manage users:

| Unit | What it is | Who administers it |
|---|---|---|
| Provider organization | The single top-level organization that operates a deployment. It owns the deployment's default identity providers, which tenant organizations use unless they bring their own. It is never a child, and its child list is always empty. | Provider Admins |
| Tenant organization | Every other organization. It is the boundary for resources, billing, and access control. Each is configured as Hosted, Branded, or White-Label. | Its owner, who created it, and its Organization Admins |
| Child organization | A tenant organization created inside another tenant organization. Nesting has no depth limit. | Its own Organization Admins, plus the Organization Admin or owner of its direct parent |
| Team | A named group of organization members that receives roles and workspace access together. Teams do not nest. | The team's owner and Team Admins manage membership. Organization Admins create and delete teams. |
| Workspace | A group of shared resources, such as environments, connections, and designs, inside one organization. Teams are assigned to workspaces. | Organization Admins, Workspace Admins, and Workspace Managers |
| User | An individual's account. It exists independently of any organization. | The person who owns it. Organization Admins edit the profiles of their members. Only a Provider Admin deletes another person's account. A person can delete their own account. |

Read [Organizations](/pr-preview/pr-1365/cloud/concepts/identity-and-security/organizations/), [Teams](/pr-preview/pr-1365/cloud/concepts/identity-and-security/teams/), and [Workspaces](/pr-preview/pr-1365/cloud/concepts/spaces/workspaces/).

## Role and Access Control

Access is granted through roles. A role is what you assign to a person. Roles are defined once for the whole deployment, but every assignment is scoped: a person holds a role in a particular organization or a particular team.

| Scope | Roles | Assigned by |
|---|---|---|
| Provider | Provider Admin, Kanvas, Curator | Provider Admins. Every new account receives the Kanvas role automatically at sign-up. |
| Organization | Organization Admin, User, Workspace Admin, Workspace Manager, Academy Admin, Academy Learner | Organization Admins, within their organization |
| Team | Team Admin | Team Admins, within their team |
| None | Anonymous User | Applied automatically to people who use Kanvas without signing in. It cannot be assigned. |

There is no Organization Billing Manager role and no Team Manager role.

Provider Admin passes every permission check, so a Provider Admin can assign any role in any scope. A role held in a team applies across every organization the team is mapped into, not only inside the team. [Roles](/pr-preview/pr-1365/cloud/concepts/identity-and-security/roles/) explains what each role is for, and [Roles and Permissions](/pr-preview/pr-1365/cloud/reference/default-permissions/) lists the keys each one holds.

Creating or changing a role, and adding or removing a keychain on a role, are Provider Admin actions. On hosted Layer5 Cloud an organization cannot create a custom role itself. Self-hosted operators can. A change to a role or keychain applies to every holder of that role, in every organization.

## How Identity, Access, and Authorization Fit Together

Organization membership alone does not decide what a user can see and do. Three independent mechanisms compose on top of the organization:

* **Authentication: the organization's connected identity provider.** The identity provider establishes who a user is. Many organizations share the deployment's identity provider. An organization can instead bring its own, in which case its users authenticate against that dedicated provider. See [Identity Services](/pr-preview/pr-1365/cloud/guides/self-hosted/planning/identity-services/).
* **Authorization: keys, keychains, and roles, evaluated per organization.** [Keys](/pr-preview/pr-1365/cloud/concepts/identity-and-security/keys/) roll up into [keychains](/pr-preview/pr-1365/cloud/concepts/identity-and-security/keychains/), keychains roll up into [roles](/pr-preview/pr-1365/cloud/concepts/identity-and-security/roles/), and users hold roles. This layer decides which operations a user may perform. A user's permissions in an organization are the union of the keys from every role they hold there, so the same person can hold a different set of capabilities in each organization.
* **Granular access: resource-access mappings.** A single resource, such as one design, can be shared with an individual user. The mapping grants access to that one resource and deliberately crosses organization boundaries: the recipient does not need to be a member of the resource's organization. This is what makes collaboration between organizations possible. A mapping does not make the recipient a member, give them a role, or reach any other resource.

The result: one person can be a member of several organizations with different capabilities in each, and can also open individual resources shared with them in organizations they do not belong to.

## Security Boundaries

Because identity and authorization are layered, the question "where is the boundary?" has an answer for each layer.

**The organization is the unit of tenancy and the core security boundary.** Teams, workspaces, and role assignments compose on top of the organization. Resources, billing, and access control are isolated per organization.

**For authorization, each organization context is its own boundary.** Keys, keychains, and roles are evaluated per user and organization pair. A user acting in one organization has a capability set scoped independently from the same user acting in another, including when those organizations are reached through different per-organization subdomains. Working on one organization's subdomain does not bring along permissions held in another organization.

**For authentication, the connected identity provider sets the boundary, not the shape of the URL.** An organization can be reached on the canonical host, on a custom subdomain under the same base domain as that host, or on a fully custom domain under a different base domain. Across all of these:

> **Same identity provider source means the same security boundary.**

Organizations that share an identity provider, which is typical for the canonical host and for custom subdomains that use the shared provider, sit inside the same authentication boundary. An organization that brings its own identity provider is a distinct authentication boundary, whatever its host is named. See [Identity Services](/pr-preview/pr-1365/cloud/guides/self-hosted/planning/identity-services/) and [Social sign-in on a custom domain](/pr-preview/pr-1365/cloud/guides/self-hosted/white-labeling/#social-sign-in-on-a-custom-domain) for how this plays out on each host type.

## Key Management and Tokens

Four building blocks carry authorization and authentication. Sessions and tokens carry no permissions of their own. Layer5 Cloud evaluates the user's roles on every request, so a role change takes effect on the next request.

### Keychains

A keychain is a named bundle of keys. Roles include keychains. A keychain grants nothing on its own. A change to a keychain applies to every holder of every role that includes it, in every organization. Only a Provider Admin changes keychains or which keychains a role includes.

### Keys

A key is the atomic permission. A key allows one action, such as Create Team. Every permission check tests a key in the organization of the request. Keys are deployment-wide, and only a Provider Admin changes them. A role's name grants nothing by itself. Only its keys do.

### Tokens

Two credentials carry a signed-in user:

* **Sessions.** The credential issued at each sign-in, one per browser, device, or Meshery Server. A browser session lasts 24 hours by default, and activity does not extend it. It ends on expiry, on Logout from the Sessions tab, or on signing out.
* **API tokens.** A credential for scripts, CI/CD pipelines, and Meshery clients. A token acts as your user account in every organization you belong to, with no scopes. It never expires and stays valid until you delete it. A token cannot be limited to one organization or to read-only access. To give automation narrower authority, issue the token from an account whose roles are narrower.

### Need more detail?

See [Roles and Permissions](/pr-preview/pr-1365/cloud/reference/default-permissions/) for the keys held by each default role.

## Common questions

**Why does one person have different capabilities in two organizations?**
Roles are assigned per organization, and every check tests the keys the person holds in the organization of the request. Holding Organization Admin in one organization grants nothing in another.

**Why is an action refused even though the person holds the role I expected?**
A role's name grants nothing by itself. Either none of the person's roles holds the key the action requires, or the request ran in a different organization than intended.

**Does a role held in a team apply only inside that team?**
No. A role held in a team applies across every organization the team is mapped into. See [Teams](/pr-preview/pr-1365/cloud/concepts/identity-and-security/teams/#how-a-team-grants-access).

**Can someone outside my organization open one of our designs?**
Yes, when the design is shared with them through a resource-access mapping. The mapping covers that design only and does not make them a member. See [Cross-organization access](/pr-preview/pr-1365/cloud/concepts/identity-and-security/organizations/#cross-organization-access).

**What does removing someone from an organization end?**
Their membership in the organization, their organization roles, and their membership and roles in that organization's teams. Their account, their memberships in other organizations, and the resources they created remain. See [User Management](/pr-preview/pr-1365/cloud/concepts/identity-and-security/users/user-management/#what-removal-ends).

**How do I delete someone's account entirely?**
Account deletion is separate from removal. A person deletes their own account. Only a Provider Admin deletes another person's account. See [Users](/pr-preview/pr-1365/cloud/concepts/identity-and-security/users/#account-deletion) and [Delete an account](/pr-preview/pr-1365/cloud/concepts/identity-and-security/users/user-management/#delete-an-account).

