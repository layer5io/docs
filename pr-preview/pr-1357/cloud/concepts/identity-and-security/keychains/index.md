# Keychains


> Keychains are a collection of keys


In Layer5 Cloud, a collection of permissions is represented as a keychain. One or more keychains are grouped together and assigned to a [role](/pr-preview/pr-1357/cloud/concepts/identity-and-security/roles/). Later, a role can be assigned to a user. This is the general flow of how keychains reach a user.

- A [key](/pr-preview/pr-1357/cloud/concepts/identity-and-security/keys/) allows one action, such as Create Token.
- A keychain groups related keys, such as everything needed to manage teams.
- A role groups keychains, and users hold roles in an organization or team.

A user's effective keys in an organization are the union of the keys in every keychain of every role the user holds there. A keychain grants nothing by itself. It takes effect only through a role that includes it.

Keychains make permissions reusable. Many roles need the same set of keys. Instead of attaching those keys to each role one by one, Layer5 Cloud puts them in one keychain and includes that keychain in each role. The same keychain can belong to many roles, and a role can include many keychains. Adding a key to a keychain grants it to every role that includes the keychain, and removing a key withdraws it from all of them at once.

Keys, keychains, and roles are records of the whole Layer5 Cloud deployment, not copies inside each organization. What is scoped to an organization is the role assignment. A change to a keychain, or to the keychains a role includes, applies to every user who holds an affected role in every organization.

For instance, the system-shipped `Team Management` keychain groups the keys for managing teams and team membership, including `View Team`, `View Teams`, `Add User to Team`, `Invite User to Team`, `Remove User from Team`, `Create Team`, `Delete Team`, `Edit Team`, `Assign Roles to Team members`, and `Remove Roles from Team members`. You can perform those operations when your user account holds a role that includes `Team Management` in the organization the request runs in. `View All Teams` is part of Organization Management, not Team Management.












<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Note</h4>
  
      <ol>
<li>The same keychain can be assigned to multiple roles.</li>
<li>One or more keychains can be assigned to a role.</li>
<li>Keychains are deployment-wide. They are not assigned inside one organization. The organization context decides which roles, and therefore which keychains, apply.</li>
</ol>

  
</div>



### Keychains Types

Layer5 Cloud ships 30 default keychains, each grouping the keys for one area. The system account owns them. Representative examples:

| Keychain | What it groups |
|---|---|
| User View | Viewing keys every user needs, including View Tokens, View Sessions, View Keys, and View Keychains |
| User Management | Managing users and their roles |
| Team View | Viewing teams and their members |
| Team Management | Managing teams and team membership |
| Organization Management | Managing organizations, their teams, and their users |
| Security Management | Token administration, including Create Token, Delete Token, and Download Token |
| Provider Management | Deployment administration, including Edit Key, Delete Key, Create Keychain, Edit Keychain, Delete Keychain, and Assign Keychains to Roles |
| Environment Management | Managing environments assigned to a workspace |
| Workspace Management | Managing workspaces of your organization |
| Events Management | Event statistics, audit, and summaries |

The remaining default keychains cover the catalog, lifecycle actions, extensions, settings, performance, views, collaboration, infrastructure, curation, the Academy, and the Kanvas action sets (Designer Actions and Operator Actions). [Default Permissions](/pr-preview/pr-1357/cloud/reference/default-permissions/) lists the permission rows the docs matrix is built from and shows which roles hold which of those keys. Catalog approval keys such as `Approve Catalog Request` are grouped in the Chargeback keychain in the permission list, not in Provider Management.

Only a Provider Admin can change a default keychain, as with every other keychain. See [Who can change a keychain](#who-can-change-a-keychain).

### Keychains Management

#### Create Keychains

Only a Provider Admin can create a keychain. The interface also requires the Create Keychain key, which only Provider Admin holds by default. This is the rule as of Layer5 Cloud v1.0.280.

Open the [Keychains](https://cloud.layer5.io/security/keychains) tab and create a keychain. Give it a name and choose the keys it bundles. Layer5 Cloud creates the keychain and adds each key to it. If adding a key fails, the interface reports it as "Failed to add key to keychain". Open the keychain and confirm every key you chose is present.

You are recorded as the keychain's owner. A custom keychain appears only in its owner's keychain list, together with the system-owned keychains. Other administrators, including other Provider Admins, do not see it in their list, although any Provider Admin can still change or delete it on the server. Ownership only decides that list. It grants no right to change the keychain. A custom keychain does not belong to an organization.

A keychain does nothing until a role includes it. Creating and editing roles is a Provider Admin action. On hosted Layer5 Cloud, an organization cannot complete this path alone. On a self-hosted deployment, your Provider Admins can. Keychains are not organization-scoped. A role that includes your keychain grants its keys to every user who holds that role, in every organization.












<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Note</h4>
  
      If you do not hold View Keychains in the selected organization, the Keychains tab shows a permission error. Every default user role holds View Keychains through User View. Create Keychain stays disabled until you use a Provider Admin account.
  
</div>



#### View Keychains

Review keychains by navigating to the [Keychains](https://cloud.layer5.io/security/keychains) page. Anyone holding View Keychains can open the tab. The list shows system-owned keychains and the viewer's own.












<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Note</h4>
  
      If you do not hold View Keychains for your selected organization, you will see a disabled Keychains tab. Switch to an organization where your role includes View Keychains, or ask an Organization Admin to check your role.
  
</div>



#### Assign Keychains

Including a keychain in a role, or removing it, is a Provider Admin action. The server requires the Provider Admin role for the whole deployment. Organization Admin does not hold Assign Keychains to Roles.

1. Open the [Roles](https://cloud.layer5.io/security/roles) page as a Provider Admin.
2. Add the keychain to a role, or remove it. See [Roles](/pr-preview/pr-1357/cloud/concepts/identity-and-security/roles/). The change applies to that role in every organization, because roles are global.
3. Assign the role to the users who need it, in the organization where they need it. See [Users](/pr-preview/pr-1357/cloud/concepts/identity-and-security/users/).

Test with a user who holds the role. Sign in as that user in a specific organization and confirm the controls the keys govern are enabled.












<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Permission Assignment at Teams, Organization and Provider Levels</h4>
  
      <ol>
<li>Team Admin can assign roles to users in a team. Team Admin cannot create, edit, or assign keychains.</li>
<li>Organization Admin can assign roles to users in an organization. Organization Admin cannot create, edit, or assign keychains.</li>
<li>Only Provider Admin can create, edit, or delete a keychain, add or remove its keys, or include it in a role. The server checks that role across the whole deployment.</li>
</ol>

  
</div>



### Keychains Lifecycle

Layer5 Cloud ships with 30 default keychains. The system account owns them. Only a Provider Admin can add or remove keys on a default keychain, or on any other keychain.

- **Deleting a keychain** removes its key mappings, so the keychain stops granting anything immediately, in every role that included it. Deleting is a soft delete.
- **Removing a key from a keychain** stops that key flowing to every role that includes the keychain.
- **Adding a key to a keychain** grants it to every holder of every role that includes the keychain.

Authorization is evaluated on every request, so users gain or lose access on their next action, without signing in again.












<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Best Practice</h4>
  
      <p>Default roles carry the default keychains, and every new user receives a default role. A change to a default keychain therefore changes permissions for users across the deployment, regardless of organization. Leave default keychains as shipped unless that is the intended outcome.</p>
<p>On a self-hosted deployment, to grant a different combination of keys, a Provider Admin creates a new keychain and includes it in a new role, and then the role is assigned to the users who need it. Keychains and roles are shared by every organization, so per-organization differences come from which roles a user holds in that organization.</p>

  
</div>



### Who can change a keychain

Keychains and their assignment to roles apply across the whole provider, not to one organization. Only a Provider Admin can create, edit, or delete a keychain, add or remove its keys, or include it in a role or remove it from one. This is the rule as of Layer5 Cloud v1.0.280.

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



### Change the keys in a keychain

**Needs:** the Provider Admin role. The interface also requires Edit Keychain.

Open the keychain's update dialog, rename it, or change the selected keys. The interface adds and removes only the difference. Removing a key stops that key flowing to every role that includes the keychain, immediately.

### Delete a keychain

**Needs:** the Provider Admin role. The interface also requires Delete Keychain.

Delete the keychain from its row and confirm in the "Delete Keychain" dialog. Deleting removes the keychain's key mappings. The keychain stops granting anything at once, for every role that included it.

As with every keychain, only a Provider Admin can edit or delete a default keychain.

### Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| The Keychains tab shows a permission error | You lack View Keychains in the selected organization. | Ask an Organization Admin to check your role. |
| Create Keychain is disabled | You lack the Create Keychain key. | Use a Provider Admin account. |
| `403` with code `meshery_cloud-1108` or `meshery_cloud-3336` | You are not a Provider Admin for the whole deployment. Keychains and their assignment to roles apply across the whole provider. | Ask a Provider Admin to make the change. |
| A user still lacks a capability | The keychain is not on the user's role, or the user holds the role in a different organization. | Add the keychain to the role, and check the role is held in the organization in use. |

### Keychain endpoints

Success responses are JSON unless stated. Errors from these handlers return a plain-text message. Refusals from the authorization layer return JSON. Paths sit under `/api`. Owning a keychain does not authorize a change to it. For a Provider Admin, a malformed keychain id on these routes returns `400` with a plain-text message.

| Method and path | Who may call | Behavior |
| --- | --- | --- |
| `GET /auth/keychains` | Signed-in user | Lists keychains you can see. Parameters: `page`, `pageSize`, `order`, `search` (matches the keychain name). |
| `GET /auth/keychains/{keychainId}` | Signed-in user | Returns one keychain. |
| `GET /auth/keychains/{keychainId}/keys` | Signed-in user | Lists the keys in a keychain. `search` matches the key description. |
| `POST /auth/keychains` | Provider Admin holding Create Keychain | Creates a keychain owned by the caller. Only the `name` in the body is used. |
| `PUT /auth/keychains/{keychainId}` | Provider Admin holding Edit Keychain | Updates the keychain name. |
| `POST /auth/keychains/{keychainId}/{keyId}` | Provider Admin holding Edit Keychain | Adds a key. |
| `DELETE /auth/keychains/{keychainId}/{keyId}` | Provider Admin holding Edit Keychain | Removes a key. |
| `DELETE /auth/keychains/{keychainId}` | Provider Admin holding Delete Keychain | Soft-deletes the keychain and its key mappings. |
| `POST` and `DELETE /identity/orgs/{orgId}/roles/{roleId}/keychains/{keychainId}` | Provider Admin holding Assign Keychains to Roles | Adds or removes a keychain on a role. Roles are global, so the change applies in every organization. |

See [Keys](/pr-preview/pr-1357/cloud/concepts/identity-and-security/keys/) for the individual permissions, and [Cloud API](/pr-preview/pr-1357/cloud/reference/api-reference/) for authentication and the organization header.

