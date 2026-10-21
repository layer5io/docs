# Reference

> References for using Layer5 Cloud’s various features and components.


These pages state facts about Layer5 Cloud: which plan includes a capability, which role holds a permission, and how to call the REST API. Start with [Concepts](/pr-preview/pr-1353/cloud/concepts/) for how the pieces fit together.

| Page | Use it to |
|---|---|
| [Default Permissions](/pr-preview/pr-1353/cloud/reference/default-permissions/) | Find out which default role holds a permission in the permission list. |
| [Keys](/pr-preview/pr-1353/cloud/concepts/identity-and-security/keys/) | See how a key reaches a user, which security keys the server enforces, and the key endpoints. |
| [Keychains](/pr-preview/pr-1353/cloud/concepts/identity-and-security/keychains/) | See who can change a keychain and the keychain endpoints. |
| [Sessions](/pr-preview/pr-1353/cloud/concepts/identity-and-security/sessions/) | Check session lifetimes, cookies, and how to sign out a session. |
| [Tokens](/pr-preview/pr-1353/cloud/concepts/identity-and-security/tokens/) | Create, list, rotate, and revoke API tokens. |
| [Cloud API](/pr-preview/pr-1353/cloud/reference/api-reference/) | Authenticate, set the organization, page through results, and handle errors. |

## Security permission keys {#permission-keys}

Provider Admin holds every key. The table lists the default holders of the other roles, as of Layer5 Cloud v1.0.280. "Interface" means the control or tab is disabled or replaced by a permission error screen. "Server" means the Layer5 Cloud server refuses the request with HTTP 403.

| Key | Governs | Default holders besides Provider Admin | Enforced by |
| --- | --- | --- | --- |
| View Tokens | The Tokens tab | User, Team Admin, Workspace Admin, Organization Admin | Interface |
| Create Token | Creating an API token, and approving a desktop app or CLI sign-in | User, Team Admin, Workspace Admin, Organization Admin | Interface for the Tokens tab. Server for approving a desktop app or CLI sign-in, which requires Create Token in at least one organization you belong to. The selected organization, and the organization a custom domain belongs to, do not matter. |
| Download Token | Downloading a token file | User, Team Admin, Workspace Admin, Organization Admin | Interface; the server returns only your own tokens |
| Delete Token | Revoking a token, and the Logout control on the Sessions tab | Organization Admin | Interface only; the server deletes only your own tokens |
| View Sessions | The Sessions tab | User, Team Admin, Workspace Admin, Organization Admin | Interface |
| Logout from a Session | Seeded for ending a session | User, Team Admin, Workspace Admin, Organization Admin | Not checked. The interface uses Delete Token for Logout. |
| View Keys | Seeded for the Keys tab | User, Team Admin, Workspace Admin, Organization Admin | Not checked. Every signed-in user sees the Keys tab. |
| Edit Key | Creating and changing a key | None | Interface and server. The server also requires the Provider Admin role. |
| Delete Key | Deleting a key | None | Interface and server. The server also requires the Provider Admin role. |
| View Keychains | The Keychains tab | User, Team Admin, Workspace Admin, Organization Admin | Interface |
| Create Keychain | Creating a keychain | None | Interface and server. The server also requires the Provider Admin role. |
| Edit Keychain | Renaming a keychain, adding or removing its keys | None | Interface and server. The server also requires the Provider Admin role. |
| Delete Keychain | Deleting a keychain | None | Interface and server. The server also requires the Provider Admin role. |
| Assign Keychains to Roles | Adding or removing a keychain on a role | None | Server. The server also requires the Provider Admin role. |

Roles that hold the keys come from the default keychains: View keys sit in User View, Delete Token in Security Management, Create Token and Download Token in Security Management and User Edit, and the key and keychain management keys, including Assign Keychains to Roles, in Provider Management. Where the server requires the Provider Admin role, it checks the role across the whole deployment, not the role held in one organization. See [Default Permissions](/pr-preview/pr-1353/cloud/reference/default-permissions/) for the role matrix, and [Keys](/pr-preview/pr-1353/cloud/concepts/identity-and-security/keys/), [Keychains](/pr-preview/pr-1353/cloud/concepts/identity-and-security/keychains/), [Sessions](/pr-preview/pr-1353/cloud/concepts/identity-and-security/sessions/), and [Tokens](/pr-preview/pr-1353/cloud/concepts/identity-and-security/tokens/) for lifetimes, cookies, and endpoints.

## Visibility rules {#visibility-rules}

| Resource | Who sees it | Scope |
| --- | --- | --- |
| Keys | System-owned default keys, plus keys you created | Deployment-wide; not per organization |
| Keychains | System-owned default keychains, plus keychains you own | Deployment-wide; not per organization |
| API tokens | Your own, never the token value in the list | User account |
| Sessions | Your own | User account |

Default keys and keychains are owned by the system. Deleting a key or keychain is a soft delete, and a deleted key or keychain stops granting access immediately.

## Feature availability by plan {#feature-availability-by-plan}

Your plan is one condition for using a capability. Your role and where your Layer5 Cloud deployment runs also decide what you can do. Those conditions follow the matrix and the limits table.

### Plans

The matrix has one column for each of the four Layer5 plans: Free, Team Designer, Team Operator, and Enterprise. Each plan is offered with monthly and annual billing. The Free plan is the plan that Layer5 Cloud calls Personal in its plan records, so you see that name in subscription and entitlement data. Entitlements follow your organization's plan. Current pricing and plan details are listed at [layer5.io/pricing](https://layer5.io/pricing).

### Reading the matrix

- A check mark means the plan includes the capability.
- A dash means the plan does not include it.
- Each table covers one category of capability. The **What it does** column describes the capability in one sentence. An empty cell means the plan list records no description.

The matrix is taken from the Layer5 product feature list. It lists the capabilities that have a documentation page. A capability that does not appear here is not necessarily unavailable. Check the page that documents it.

This section covers the Layer5 Cloud categories. For design, deployment, collaboration, and performance capabilities, see [Kanvas reference](/pr-preview/pr-1353/kanvas/reference/).

### Capabilities by plan

### Identity & Access Management

| Capability | What it does | Free | Team Designer | Team Operator | Enterprise |
|---|---|---|---|---|---|
| Built-in Roles | Predefined user roles: Organization Admin, Team Admin, Workspace Admin | ✅ | ✅ | ✅ | ✅ |
| Identity through OAuth | Use third-party identity providers, Google and GitHub, to manage the identities of your organization's members. | ✅ | ✅ | ✅ | ✅ |
| Teams | Establish new team for organizing groups of users and resource access. Single organization, multiple teams. | - | ✅ | ✅ | ✅ |
| Custom Roles | Assign User Roles, Assign Keychains to Roles | - | - | ✅ | ✅ |
| User-defined Roles | Customizable roles for specific permission assignments | - | - | - | ✅ |
| Cloud as an IDP | Own and control the user accounts of your enterprise members with Cloud your identity provider (IdP). | - | - | - | ✅ |
| Organizations | Participate as a member of multiple organizations each with their own accounting and billing structure. Multiple organizations, multiple teams. | - | - | - | ✅ |
| Organizations | Establish new organization for organizing teams, users, and resource access. | - | - | - | ✅ |
| Direct Add or Invite User to Organization | Directly create a new user account within an organization. Send a request for a user to join an organization. | - | - | - | - |

### Workspaces

| Capability | What it does | Free | Team Designer | Team Operator | Enterprise |
|---|---|---|---|---|---|
| My Workspace | My Workspace is your always available, primary space for storing designs, views, and models that you own. | ✅ | ✅ | ✅ | ✅ |
| GitOps Snapshots | Visual insights in your pull requests in GitHub. Verify your workload designs and Kubernetes cluster configurations prior to accepting and merging pull requests. | - | ✅ | - | ✅ |
| Manage Workspace Team and Environment Access | Assign designs, views, users, and environments to shared workspaces. | - | ✅ | ✅ | ✅ |
| Shared Workspaces | Shared Workspaces are collaborative spaces that you can use to store and collaborate on files within and between teams. Easily share files with customizable permissions (edit, comment, view). Create up to 10 shared workspaces per organization. | - | ✅ | ✅ | ✅ |
| GitOps Integrations | Initiate deployment with creation of pull request, ArgoEvents, Flux sync, or webhook. | - | - | - | ✅ |

### Catalog

| Capability | What it does | Free | Team Designer | Team Operator | Enterprise |
|---|---|---|---|---|---|
| Public Catalog: 400 Cloud Native Patterns | A library of pre-built design patterns and operational templates for common deployment scenarios, simplifying the configuration process and ensuring best practices. | ✅ | ✅ | ✅ | ✅ |
| Organization Private Catalog | Privately publish and share reusable design patterns and operational templates within your organization. | - | - | - | ✅ |
| Share Design | Share design with anyone within your organization, and make your design easily accessible to all relevant team members. | ✅ | ✅ | - | ✅ |
| Clone Design | Clone any published design to customise it according to your use cases | ✅ | ✅ | - | ✅ |
| Publish Design | Publish a design | - | - | - | - |
| View Designs | View all public and published designs of other team members and private of signed-in user | - | - | - | - |
| View Filters | View all public and published filters of other team members and private of signed-in user | - | - | ✅ | ✅ |
| Approve Catalog Request | Change management for the curation of content published in the catalog. | - | - | - | ✅ |
| Single and multiple approvers |  | - | - | - | - |
| Import Filter | Import a publish WASM filter | - | - | - | - |

### Security

| Capability | What it does | Free | Team Designer | Team Operator | Enterprise |
|---|---|---|---|---|---|
| Event Audit Trail | Detailed accounting of user activity. Historical record or each action taken. | - | - | - | ✅ |
| Customizable Permissions: Keys, Keychains and Roles | Highly flexible permissioning. Organize keys into custom keychains and assign to existing or custom roles that you define. | - | - | - | ✅ |
| User Session and API Token Oversight | Expiring and non-expiring API tokens. Visibility into active and expired user sessions. | - | - | - | ✅ |

### Managed Service Provider

| Capability | What it does | Free | Team Designer | Team Operator | Enterprise |
|---|---|---|---|---|---|
| Public Profiles for Users | See public user profile details, public activities and public resources. | - | - | - | ✅ |
| Recognition Program Badges | Badges are visual indicators of achievements or milestones that users can earn in order to recognizing activity milestones, encouraging positive behavior, mark progress, and gamifying platform experience. | - | - | - | ✅ |
| Self-service User Accounts | New user sign-up verification. Self-service password recovery. | - | - | - | ✅ |

### Support and Deployment

| Capability | What it does | Free | Team Designer | Team Operator | Enterprise |
|---|---|---|---|---|---|
| Community Support | Get help with most of your questions and issues in our Community Forum. | ✅ | ✅ | ✅ | ✅ |
| Standard Support | Support can help you troubleshoot issues you run into. Get support via email. | - | ✅ | ✅ | ✅ |
| Managed Service Provider | White Label: Customize the appearance and branding of your engineering platform powered by Cloud. Multi-tenancy: Hierarchical organizations, teams, users and customizable permissioning. | - | - | - | ✅ |
| Premium Support | With Premium, get a 2-hour SLA and 24/7 web and phone support. | - | - | - | ✅ |
| Self-hosted Deployment | Self-hosted Cloud for on-prem appliances or self-managed cloud tenants. Keep your designs internal to your workplace. Get remote support when you need it. | - | - | - | ✅ |

### Academy

| Capability | What it does | Free | Team Designer | Team Operator | Enterprise |
|---|---|---|---|---|---|
| Academy Theoretical Learning | A comprehensive learning management system for creators and instructors on how to build, manage, and extend educational content like learning paths, challenges, and certifications. | - | - | - | ✅ |
| Academy Practical Learning | An inclusive, collaborative, hands-on learning environment for students. | - | - | - | ✅ |

### Limits by plan {#limits-by-plan}

Each plan records a quantity for the following entitlements.

| Entitlement | Free | Team Designer | Team Operator | Enterprise |
|---|---|---|---|---|
| Components per design | 100 | 200 | 100 | 300 |
| Relationships per design | 100 | 200 | 100 | 300 |
| Image size in a design | 250 KB | 1 MiB | 1 MiB | 10 MiB |
| Designs per workspace | Unlimited | Unlimited | Unlimited | Unlimited |
| Workspaces per organization | See note | 10 | 10 | Unlimited |

For workspaces per organization on the Free plan, the plan records disagree: the monthly billing record sets 1 and the annual billing record sets 10.

#### Which limits Layer5 Cloud enforces

Layer5 Cloud enforces one limit today: components per design. When you save or import a design, Layer5 Cloud compares its component count with the limit of your organization's active plan. A design that exceeds the limit is refused with the error `Design exeeds maximum limit of N components supported by your current plan`, where N is the limit. To proceed, reduce the number of components in the design or upgrade the plan. When an organization holds more than one active subscription, the highest component limit among them applies. An organization with no active subscription cannot save or import a design. The request fails with HTTP 500 and the error `Org is not entitled to adding components to a design`.

Layer5 Cloud records every other quantity in the table and lists it through the entitlements API (`GET /api/entitlement/features`), but it does not refuse an action because of any of them. For the API's base URL and authentication, see the [Cloud API](/pr-preview/pr-1353/cloud/reference/api-reference/).

### Availability depends on more than your plan

#### Your role

Authorization in Layer5 Cloud is by permission key. Each role you hold grants a set of keys, and your effective permissions are the union of the keys from every role you hold in the organization you are working in. An action your role does not grant is refused with HTTP 403, even when your plan includes the capability. See [Default Permissions](/pr-preview/pr-1353/cloud/reference/default-permissions/) for which role holds which permission.

#### Where your deployment runs

Layer5 Cloud runs either as the hosted service that Layer5 operates or as a [self-hosted deployment](/pr-preview/pr-1353/cloud/guides/self-hosted/) that you operate. Self-hosted Deployment is listed under the Enterprise plan in the Support and Deployment table. The difference that matters most for availability is provider administration. The Provider Admin role administers the deployment and passes every permission check. On a self-hosted deployment, your operators assign it.

#### Custom roles

Only Provider Admins create custom roles. Layer5 Cloud refuses a role creation request from anyone else with HTTP 403. On hosted Layer5 Cloud, an organization cannot create a custom role itself. On a self-hosted deployment, the operator's Provider Admins can. Roles are defined for the whole deployment, not per organization, so a role change applies in every organization where the role is held.

The Custom Roles and User-defined Roles rows in the Identity and Access Management table describe how those capabilities are packaged into plans. Layer5 Cloud does not check your plan when a custom role is created.

#### Plan rows and enforcement

The component limit is the only entitlement Layer5 Cloud enforces by plan. The capability rows in the matrix describe how Layer5 packages its plans. When an action is unavailable and the plan is not the component limit, check your role and your deployment first.

### Support by plan

The support channels and response commitments each plan includes are listed in [Support](/pr-preview/pr-1353/cloud/getting-started/support/).

