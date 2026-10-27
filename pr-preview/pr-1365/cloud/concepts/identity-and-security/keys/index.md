# Keys


> Keys are the atomic unit of access control


In Layer5 Cloud, permissions are represented as keys, each serving as a unique identifier for a specific permission. One or more keys can be grouped together and assigned to a [keychain](/pr-preview/pr-1365/cloud/concepts/identity-and-security/keychains/). Then this keychain can be assigned to a [role](/pr-preview/pr-1365/cloud/concepts/identity-and-security/roles/) and that role can be assigned to a user. A user never receives a key directly. This is the general flow of how keys reach a user.

Keys, keychains, and roles are defined once for the whole Layer5 Cloud deployment. They are not copied or customized per organization. What varies per organization is which roles a user holds there. A user's effective keys in an organization are the union of the keys from every role they hold in that organization, so the same person can hold a key in one organization and lack it in another. Holding an additional role only adds keys. It never removes any. Provider Admin holds every key and passes every check in every organization. For how this fits with authentication and cross-organization resource sharing, see [Security Boundaries](/pr-preview/pr-1365/cloud/concepts/identity-and-security/#security-boundaries).

For instance, consider the system-shipped default key `Create Organization`, which corresponds to the permission to create an organization in the Cloud. To create an organization, you need the `Create Organization` key in a keychain that is assigned to a role associated with your user account in that organization.












<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Note</h4>
  
      <ol>
<li>The same key can be assigned to multiple keychains.</li>
<li>One or more keys can be assigned to a keychain.</li>
<li>Keys are deployment-wide. The organization context decides which of your roles, and therefore which keys, apply to a request.</li>
</ol>

  
</div>



A default installation ships more than 240 keys grouped into 30 default keychains. The system account owns every default key and keychain.

### Keys Types

Keys follow one of four shapes. A few grant an action that is not a simple change to a resource.

1. **Create** - Create keys permit you to create resources. For example, the `Create Organization` key allows you to create an organization.
2. **View** - View keys permit you to access and retrieve resources. For example, the `View All Teams` key lets you see all the teams within a selected organization.
3. **Edit** - Edit keys permit you to change resources. For instance, the `Edit Organization` key allows you to update an organization's details.
4. **Delete** - Delete keys permit you to remove resources. For instance, the `Delete Token` key allows you to revoke a token.
5. **Action** - Action keys grant a workflow step. For example, the `Approve Catalog Request` key allows you to approve a catalog request to publish a cloud-native design to [Cloud Catalog](/pr-preview/pr-1365/cloud/concepts/catalog/), and the `Connect GitHub Account to Workspace` key enables you to connect your GitHub account to your [workspace](/pr-preview/pr-1365/cloud/concepts/spaces/workspaces/).

### Keys Enforcement

A key has an effect only where something checks it. Two places do.

- **The server.** On a guarded action, the server resolves the organization of the request and tests whether the user holds the required key there. A missing key returns HTTP 403 with a JSON body. This check is what actually protects the action.
- **The interface.** The Layer5 Cloud UI reads your effective keys for the organization in context and disables or hides controls for actions you cannot perform. For more on the organization context switcher, see [Organizations](/pr-preview/pr-1365/cloud/concepts/identity-and-security/organizations/).

Not every key is checked in both places. Some security keys are enforced only by the interface: the server does not test Delete Token, and tests Create Token only when you approve a desktop app or CLI sign-in. For that approval, Create Token must be held in at least one organization you belong to. The organization you have selected, or the one a custom domain belongs to, does not matter. Changes to keys, keychains, and roles are checked on the server, which also requires the Provider Admin role for the whole deployment. The [security permission keys](/pr-preview/pr-1365/cloud/reference/#permission-keys) table lists which security keys the server enforces.

Because a key grants nothing unless a check names it, a custom key is only a record. Adding one to a keychain and a role changes no behavior anywhere.

Each key that the interface does check is enforced at specific UI elements. For instance, the `Create Organization` key is enforced at the **Create Organization** button on the **Organizations** page. The button is disabled if you do not hold `Create Organization` through a role in the selected organization.

### Keys Management

#### View Keys

Review keys by navigating to the [Keys](https://cloud.layer5.io/security/keys) page. Every signed-in user can open the Keys tab. It lists the system's keys plus any keys you created, and searches by key name. Viewing keys requires no key on the server.

#### Review Key Usage

Keys themselves do not carry a usage counter. There is no "last used" column on the Keys page. What a key's use leaves behind is the event that the action itself produced, and those events are what you audit.

Every action a user takes is recorded on the [Audit Logs](https://cloud.layer5.io/events/audit) page, which answers who did what, and when:

- **User ID** - the account that performed the action, which is the account whose key was exercised.
- **Category** and **Action** - what was done, for example a workspace being created or a team being deleted. These correspond to the capability the key grants.
- **Acted Upon** - the resource the action was performed on.
- **Description** and **Created At** - the detail of the event and the time it occurred.

Filter by **Actor ID** to follow one user's activity, or by **Category** and **Action** to see everyone who exercised a particular capability over a period. Because keys are evaluated in the context of an organization, the log you are reading is the log for the organization you currently have selected.

Workspaces additionally keep their own activity log, scoped to that one workspace. See [View Recent Activity](/pr-preview/pr-1365/cloud/guides/workspaces/managing-workspaces/#view-recent-activity).

Key and keychain changes do not write audit events. Creating, downloading, and deleting a token do. See [Tokens](/pr-preview/pr-1365/cloud/concepts/identity-and-security/tokens/).

#### Assign Keys

Changing which keys a keychain carries, or which keychains a role includes, is a Provider Admin action for the whole deployment. Holding Provider Admin inside one organization does not satisfy that check. On hosted Layer5 Cloud, Layer5 operates the Provider Admin role, so organizations cannot change keys. On a self-hosted deployment, the operator's Provider Admins can.

To grant an existing key to a user, assign a role that already carries it. Do not add the keychain to a shared role unless every holder of that role in every organization should gain it.

1. Select the organization in the organization context switcher in the top navigation bar.
2. Confirm which role already carries the key. The [Default Permissions](/pr-preview/pr-1365/cloud/reference/default-permissions/) matrix lists the default roles. [Keychains](/pr-preview/pr-1365/cloud/concepts/identity-and-security/keychains/) explains how keys are grouped.
3. Open the [Users](https://cloud.layer5.io/identity/users) page and assign that role to the user in this organization. You can also invite a user and assign the role separately. See [Users](/pr-preview/pr-1365/cloud/concepts/identity-and-security/users/) and [Roles](/pr-preview/pr-1365/cloud/concepts/identity-and-security/roles/).

A Provider Admin who needs a new combination of keys creates a keychain, includes it in a role, and then assigns that role. See [Keychains](/pr-preview/pr-1365/cloud/concepts/identity-and-security/keychains/#create-keychains).












<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Permission Assignment at Teams, Organization and Provider Levels</h4>
  
      <ol>
<li>Team Admin can assign roles to users in a team. Team Admin cannot edit keys or keychains.</li>
<li>Organization Admin can assign roles to users in an organization. Organization Admin cannot edit keys or keychains.</li>
<li>Only Provider Admin can create, edit, or delete keys, change which keys a keychain carries, or change which keychains a role includes. The server checks that role across the whole deployment.</li>
</ol>

  
</div>



### Keys Lifecycle

Layer5 Cloud ships with more than 240 default keys. Default keys are owned by the system. Each key is uniquely identified by a UUID, which is how the system references the key.

Creating or editing a key, including changing which keychains carry it, requires the Edit Key key. Deleting a key requires the Delete Key key. Both belong to the Provider Management keychain, which only Provider Admin holds by default, and the server also requires the caller to hold the Provider Admin role for the whole deployment. As of Layer5 Cloud v1.0.280, only a Provider Admin can change keys.

Deleting a key is a soft delete. The key stops granting access immediately and disappears from every keychain that contained it. Because keys are deployment-wide, editing or deleting one changes access for every organization at once.

### Anatomy of a key

The Keys tab lists each key with these fields:

| Field | Meaning |
|---|---|
| Key ID | A UUID that identifies the key. |
| Name | The action the key grants, for example Create Token. |
| Description | What the action does. |
| Category | The resource the key acts on, for example Token or Keychains. |
| Subcategory | The default keychain family the key belongs to, for example Security Management. |
| Owner | The account that owns the key. Default keys are owned by the system. |
| Created At, Deleted At | When the key was created and, if deleted, when. |

### Who can see and change keys

| Key | Governs | Default holders besides Provider Admin | Enforced by |
| --- | --- | --- | --- |
| View Keys | Seeded for the Keys tab | User, Team Admin, Workspace Admin, Organization Admin | Not checked. Every signed-in user sees the Keys tab. |
| Edit Key | Creating and changing a key | None | Interface and server. The server also requires the Provider Admin role. |
| Delete Key | Deleting a key | None | Interface and server. The server also requires the Provider Admin role. |

The list shows system-owned default keys, plus keys you created. Keys are deployment-wide, not per organization.

When the server refuses a change to a key, it answers HTTP 403 with a JSON error. A caller who lacks the route's key receives code `meshery_cloud-1108`. A caller who holds the key but is not a Provider Admin for the whole deployment receives code `meshery_cloud-3336`, "Only a Provider Admin can change roles, keychains or permission keys".

### Tracing a missing permission

When a user cannot perform an action, work from the key outward:

1. Identify the key the action requires. A 403 response or a disabled control both point to a missing key.
2. Find the roles that carry that key in [Default Permissions](/pr-preview/pr-1365/cloud/reference/default-permissions/). Security keys are listed above and on [Keychains](/pr-preview/pr-1365/cloud/concepts/identity-and-security/keychains/), [Sessions](/pr-preview/pr-1365/cloud/concepts/identity-and-security/sessions/), and [Tokens](/pr-preview/pr-1365/cloud/concepts/identity-and-security/tokens/).
3. Check which roles the user holds in the organization the request ran in, not in the organization they usually work in.
4. Grant a role that carries the key in that organization.

### Limits

- Keys do not rotate or expire. A key grants its action until it is deleted or removed from the user's roles.
- Keys have no per-key usage counter. Use the Audit Logs page instead.
- On hosted Layer5 Cloud, only Provider Admins edit or delete keys.
- A key and its keychains are deployment-wide. Organizations tailor access by assigning roles, not by changing keys.

### Key endpoints

Success responses are JSON unless stated. Errors from these handlers return a plain-text message. Refusals from the authorization layer return JSON. Paths sit under `/api`.

| Method and path | Who may call | Behavior |
| --- | --- | --- |
| `GET /auth/keys` | Signed-in user | Lists keys you can see. Parameters: `page`, `pageSize`, `order`, `search` (matches the key name). Default order: most recently updated first. |
| `GET /auth/keys/{keyId}` | Signed-in user | Returns one key. A malformed id returns `400`. |
| `POST /auth/keys` | Provider Admin holding Edit Key | Creates or updates a key. |
| `DELETE /auth/keys/{keyId}` | Provider Admin holding Delete Key | Soft-deletes the key. Returns `204`. |
| `GET /identity/orgs/{orgId}/users/keys` | Signed-in user | Returns your effective keys in the organization. The interface uses it to enable controls. |

For a Provider Admin, a malformed id on a write returns `400` with a plain-text message. See [Cloud API](/pr-preview/pr-1365/cloud/reference/api-reference/) for authentication and the organization header.

