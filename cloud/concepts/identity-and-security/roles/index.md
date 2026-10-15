# Roles

> How roles grant permissions in Layer5 Cloud: what each built-in role is for, who can assign it, how custom roles behave, and why every permission check tests a key rather than a role name.



A role is the unit you assign to people. It answers the question "what is this person here to do?" and translates that answer into permissions. Layer5 Cloud builds every role from the same three layers:

- A **key** allows exactly one action, such as creating a team or approving a catalog request. See [Keys](/cloud/concepts/identity-and-security/keys/).
- A **keychain** bundles related keys, such as everything needed to manage teams. See [Keychains](/cloud/concepts/identity-and-security/keychains/).
- A **role** bundles keychains.

A user's permissions in an organization are the union of the keys from every role they hold in that organization. Holding two roles never removes anything; it only adds. The organization in context decides which roles count: the same person can administer one organization and hold only the User role in another, and their permissions differ accordingly. When a request names an organization, that organization is the context, even if the session points at a different one. [Security Boundaries](/cloud/concepts/identity-and-security/#security-boundaries) explains why the organization is an authorization boundary.

## How roles are scoped

Roles, keychains, and keys are defined once for the whole Layer5 Cloud deployment. They are not copied per organization. Assignment, on the other hand, is always scoped: a user holds a role in a particular organization or in a particular team. Roles fall into three groups by who assigns them.

- **Provider roles** - Provider Admin, Kanvas, and Curator. Only Provider Admins assign them.
- **Organization roles** - Organization Admin, User, Workspace Admin, Workspace Manager, Academy Admin, and Academy Learner. Organization Admins assign them within their organization.
- **Team role** - Team Admin. Team Admins assign it within their team.

Provider Admin passes every permission check, so a Provider Admin can assign any role in any scope.

The role list each person sees follows the same split. Viewing the list requires the View All Roles key, which the User, Team Admin, Workspace Admin, Organization Admin, and Provider Admin roles hold by default.

| Role list | Roles shown | Shown to |
|---|---|---|
| Provider | Provider Admin, Kanvas, Curator | Provider Admins |
| Organization | Every role except the three provider roles | Organization Admins and Provider Admins |
| Team | Team Admin | Team Admins and Provider Admins |

One more role, **Anonymous User**, exists for people who use Kanvas without signing in. Layer5 Cloud applies it automatically. It never appears in any role list and nobody can assign it.

## Built-in roles

Every default installation ships with the following roles. Built-in roles are available on every plan.

| Role | What it is for | Assigned by | Holds by default |
|---|---|---|---|
| Provider Admin | Administering the Layer5 Cloud deployment | Provider Admin | Every keychain |
| Kanvas | Making the Kanvas extension available when a Meshery Server connects | Provider Admin, automatically at sign-up | No keychains |
| Curator | Managing Cloud Native Catalog content: publishing, unpublishing, and approving or denying publish requests | Provider Admin | No keychains; catalog curation keys come through the Organization Admin and Workspace Admin roles |
| Organization Admin | Creating, managing, and deleting organizations, teams, users, and workspaces | Organization Admin | User, team, organization, workspace, environment, catalog, lifecycle, extension, settings, performance, view, collaboration, infrastructure, security, and academy administration, plus Designer and Operator actions |
| User | Viewing, creating, updating, and deleting basic cloud resources | Organization Admin | Viewing and editing users, plus learning paths and challenges |
| Workspace Admin | Managing basic cloud resources and workspaces, and reviewing catalog requests | Organization Admin | Viewing and editing users, plus team, workspace, environment, and lifecycle management and catalog curation |
| Workspace Manager | Managing basic cloud resources and the designs, environments, connections, and teams inside the workspaces where the user holds this role | Organization Admin | Viewing and editing users, plus team, workspace, environment, lifecycle, and workspace resource management; no catalog curation |
| Academy Admin | Managing the organization's academy | Organization Admin | Academy, team, and workspace management |
| Academy Learner | Accessing and registering for Academy content | Organization Admin | Academy content access |
| Team Admin | Administering one team | Team Admin | Viewing, editing, and managing users, plus team viewing, team management, and security management |
| Anonymous User | Using Kanvas without signing in | Applied automatically; not assignable | Anonymous viewing and editing |

The [Roles and Permissions reference](/cloud/reference/default-permissions/) lists the individual keys behind these keychains.

### Provider Admin is the superuser

Provider Admin holds every key and passes every permission check. A Provider Admin works in any organization scope, including organizations they are not a member of. Treat this role as administration of the deployment itself, not of a single organization, and grant it accordingly.

### Kanvas is held by everyone

Every new user receives the Kanvas role at sign-up, and anonymous accounts receive it alongside Anonymous User. The role holds no keychains. Its purpose is to make the Kanvas extension available when the user's Meshery Server connects to Layer5 Cloud.

## Custom roles

The Roles page of the Layer5 Cloud UI offers creating a role (a name, a description, and a set of keychains), editing it, and deleting it. The UI gates each of these actions on the matching key: Create Custom Roles, Update Custom Roles, or Delete Custom Roles.

The server is stricter than the UI. It accepts a new role only from a Provider Admin and refuses everyone else with HTTP 403. The three custom role keys also belong to the Provider Management keychain, which only Provider Admin holds by default. The practical result depends on where Layer5 Cloud runs:

- **Hosted Layer5 Cloud** - an organization cannot create a custom role itself.
- **Self-hosted Layer5 Cloud** - the operator's Provider Admins create custom roles for their deployment.

[Feature Availability by Plan](/cloud/reference/feature-availability/) lists Custom Roles for the Team Operator and Enterprise plans. The Provider Admin requirement applies on every plan.

### Changing a role changes it everywhere

Because roles and keychains are defined for the whole deployment, a role is the same object in every organization that uses it. Adding a keychain to a role, or removing one, changes that role for every user who holds it in every organization. This applies to built-in roles as much as to custom ones.

Assigning keychains to a role requires the Assign Keychains to Roles key, which the Organization Admin, Team Admin, and Provider Admin roles hold by default. Anyone exercising that key is editing a deployment-wide definition, not an organization-local copy. To change what people in one organization can do, change which roles they hold in that organization rather than what a shared role contains.

## Why checks test keys, not role names

Layer5 Cloud never asks "is this user an Organization Admin?" It asks "does this user hold the key this action requires, in this organization?" Every key-guarded route resolves the organization of the request first and then tests whether the user holds the required key there.

This design keeps the role catalog flexible. A role's name grants nothing on its own; only its keys do. A custom role that holds the same keys as a built-in role passes the same checks, and a change to a role's keychains changes what its holders can do without any change to the checks themselves.

A refused action returns HTTP 403 with a JSON body that names the problem:

```json
{
  "error": "You do not hold the permission this action requires in this organization",
  "code": "<error code>"
}
```

The body can also carry `severity`, `probableCause`, and `suggestedRemediation` fields. A 403 means the user is signed in but none of their roles in the organization in context holds the required key. Either the user needs a role that holds that key, or the request is running in a different organization than intended.

## Where to look next

- [Roles and Permissions](/cloud/reference/default-permissions/) - the key-by-role matrix.
- [Keychains](/cloud/concepts/identity-and-security/keychains/) - how keys are grouped.
- [Keys](/cloud/concepts/identity-and-security/keys/) - the individual permissions and how they are enforced.
- [Feature Availability by Plan](/cloud/reference/feature-availability/) - which plans list built-in roles, custom roles, and teams.

