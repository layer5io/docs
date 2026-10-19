# Keychains


> How keychains group keys into reusable bundles for roles in Layer5 Cloud, who owns and can change a keychain, and what a change to a keychain affects.



A keychain is a named bundle of keys. It sits between the single permission and the role a person holds:

- A [key](/pr-preview/pr-1345/cloud/concepts/identity-and-security/keys/) allows one action, such as Create Token.
- A keychain groups related keys, such as everything needed to manage teams.
- A [role](/pr-preview/pr-1345/cloud/concepts/identity-and-security/roles/) groups keychains, and users hold roles in an organization or team.

A user's effective keys in an organization are the union of the keys in every keychain of every role the user holds there. A keychain grants nothing by itself. It takes effect only through a role that includes it.

## Why keychains exist

Keychains make permissions reusable. Many roles need the same set of keys: every default user role, for example, needs to view tokens, sessions, keys, and keychains. Instead of attaching those keys to each role one by one, Layer5 Cloud puts them in one keychain and includes that keychain in each role. The same keychain can belong to many roles, and a role can include many keychains.

Reuse also means one change propagates. Adding a key to a keychain grants it to every role that includes the keychain, and removing a key withdraws it from all of them at once.

## Keychains are defined for the whole deployment

Keys, keychains, and roles are records of the whole Layer5 Cloud deployment, not copies inside each organization. What is scoped to an organization is the role assignment. As a result, a change to a keychain, or to the keychains a role includes, applies to every user who holds an affected role in every organization. [Roles](/pr-preview/pr-1345/cloud/concepts/identity-and-security/roles/#changing-a-role-changes-it-everywhere) explains this from the role side.

## Default keychains

Layer5 Cloud ships 30 default keychains, each grouping the keys for one area. The system account owns them. Representative examples:

| Keychain | What it groups |
|---|---|
| User View | Viewing keys every user needs, including View Tokens, View Sessions, View Keys, and View Keychains |
| User Management | Managing users and their roles |
| Team Management | Managing teams and team membership |
| Organization Management | Managing organizations, their teams, and their users |
| Security Management | Token administration, including Create Token, Delete Token, and Download Token |
| Provider Management | Deployment administration, including Edit Key, Delete Key, Create Keychain, Edit Keychain, Delete Keychain, and Assign Keychains to Roles |

The remaining default keychains cover workspaces, environments, the catalog, lifecycle actions, extensions, settings, performance, views, collaboration, infrastructure, curation, the Academy, events, and the Kanvas action sets. The [Roles and Permissions reference](/pr-preview/pr-1345/cloud/reference/default-permissions/) lists them and shows which roles hold which keys.

Only a Provider Admin can change a default keychain, as with every other keychain. See [Who can change a keychain](#who-can-change-a-keychain).

## Custom keychains

A Provider Admin can create keychains beyond the defaults. The Provider Admin who creates a keychain is recorded as its owner, and a custom keychain appears only in its owner's keychain list. Other administrators, including other Provider Admins, do not see it in their list, although any Provider Admin can still change or delete it on the server. Ownership only decides that list: it grants no right to change the keychain. A custom keychain does not belong to an organization.

## Who can change a keychain

Keychains and their assignment to roles apply across the whole provider, not to one organization. Only a Provider Admin can create, edit, or delete a keychain, add or remove its keys, or include it in a role or remove it from one. This is the rule as of Layer5 Cloud **v1.0.280**.

Layer5 Cloud enforces keychain operations in two places. The interface enables or disables each control based on the keys you hold. The server checks the matching key and then confirms that the caller holds the Provider Admin role for the whole deployment. Holding the Provider Admin role inside one organization does not satisfy that check.

| Operation | Who can do it | Where it is enforced |
|---|---|---|
| View the keychain list and a keychain's keys | Anyone holding View Keychains, which every default user role holds through User View. The list shows system-owned keychains and the viewer's own. | Interface: the Keychains tab requires View Keychains. Server: returns only system-owned keychains and the caller's own. |
| Create a keychain | Provider Admin. The interface also requires Create Keychain. | Server and interface |
| Rename a keychain, add keys, remove keys | Provider Admin. The interface also requires Edit Keychain. | Server and interface |
| Delete a keychain | Provider Admin. The interface also requires Delete Keychain. | Server and interface |
| Include a keychain in a role, or remove it | Provider Admin | Server |

When the server refuses a change to a keychain, it answers HTTP 403 with a JSON error. A caller who lacks the route's key receives code `meshery_cloud-1108`. A caller who holds the key without being a Provider Admin for the whole deployment receives code `meshery_cloud-3336`, "Only a Provider Admin can change roles, keychains or permission keys".












<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Note</h4>
  
      Create Keychain, Edit Keychain, Delete Keychain, and Assign Keychains to Roles belong to the Provider Management keychain, so by default only Provider Admins see these controls enabled. Everyone else can still view keychains.
  
</div>



## A keychain takes effect only through a role

Creating a keychain changes no one's permissions. The keychain grants its keys only when a role includes it, and including it in a role changes that role for every holder in every organization.

Creating and editing roles is a Provider Admin action on the server. On hosted Layer5 Cloud, Layer5 operates the Provider Admin role, so an organization cannot build its own custom role from custom keychains. On a self-hosted deployment, the operator's Provider Admins can create custom keychains and the custom roles that use them. To give people a role, see [Roles](/pr-preview/pr-1345/cloud/concepts/identity-and-security/roles/) and [Users](/pr-preview/pr-1345/cloud/concepts/identity-and-security/users/).

## What changes take effect, and when

- **Deleting a keychain** removes its key mappings, so the keychain stops granting anything immediately, in every role that included it.
- **Removing a key from a keychain** stops that key flowing to every role that includes the keychain.
- **Adding a key to a keychain** grants it to every holder of every role that includes the keychain.

Authorization is evaluated on every request, so users gain or lose access on their next action, without signing in again.

## Change keychains deliberately

Default roles carry the default keychains, and every new user receives a default role. A change to a default keychain therefore changes permissions for users across the deployment, regardless of organization. Leave default keychains as shipped unless that is the intended outcome. On a self-hosted deployment, to grant a different combination of keys, a Provider Admin creates a new keychain and includes it in a new role, and then the role is assigned to the users who need it. Keychains and roles are shared by every organization, so per-organization differences come from which roles a user holds in that organization.

The [custom keychains guide](/pr-preview/pr-1345/cloud/guides/security/custom-keychains/) covers creating, editing, and deleting a keychain and including it in a role. To browse keychains in your account, open [Keychains](https://cloud.layer5.io/security/keychains) in Layer5 Cloud.

## Related

- [Keys](/pr-preview/pr-1345/cloud/concepts/identity-and-security/keys/) - the individual permissions and how they are enforced.
- [Roles](/pr-preview/pr-1345/cloud/concepts/identity-and-security/roles/) - how roles bundle keychains and who assigns them.
- [Roles and Permissions](/pr-preview/pr-1345/cloud/reference/default-permissions/) - the default roles, keychains, and keys.
- [Security reference](/pr-preview/pr-1345/cloud/reference/security/) - security permissions, token and session lifetimes, and endpoints.

