# Keys


> How keys work as the unit of permission in Layer5 Cloud: how a key reaches a user, where it takes effect, who can change it, and how to trace a missing permission.



A key is a named permission for exactly one action, such as Create Organization, Approve Catalog Request, or Download Token. Every authorization decision in Layer5 Cloud comes down to one question: does this user hold the key this action requires, in this organization? Understanding keys tells you why a user can or cannot do something, and whether the model fits the access rules you need.

## How a key reaches a user

Keys roll up in three layers. A [keychain](/cloud/concepts/identity-and-security/keychains/) groups related keys, a [role](/cloud/concepts/identity-and-security/roles/) groups keychains, and a user holds roles in an organization or a team. A user never receives a key directly: granting a key means placing it in a keychain that belongs to a role the user holds.

Keys, keychains, and roles are defined once for the whole Layer5 Cloud deployment. They are not copied or customized per organization. What varies per organization is which roles a user holds there. A user's effective keys in an organization are the union of the keys from every role they hold in that organization, so the same person can hold a key in one organization and lack it in another. Holding an additional role only adds keys; it never removes any. Provider Admin holds every key and passes every check in every organization. [Security Boundaries](/cloud/concepts/identity-and-security/#security-boundaries) explains why the organization is the authorization boundary.

A default installation ships more than 240 keys grouped into 30 default keychains. The system account owns every default key and keychain.

## Anatomy of a key

The Keys tab of the Security page lists each key with these fields:

| Field | Meaning |
|---|---|
| Key ID | A UUID that identifies the key. |
| Name | The action the key grants, for example Create Token. |
| Description | What the action does. |
| Category | The resource the key acts on, for example Token or Keychains. |
| Subcategory | The default keychain family the key belongs to, for example Security Management. |
| Owner | The account that owns the key. Default keys are owned by the system. |
| Created At, Deleted At | When the key was created and, if deleted, when. |

Most keys follow one of four shapes. A few grant an action that is not a simple change to a resource.

| Type | Grants | Example |
|---|---|---|
| Create | Creating a resource | Create Organization |
| View | Seeing a resource or a list | View Keys |
| Edit | Changing a resource | Edit Keychain |
| Delete | Removing a resource | Delete Token |
| Action | A workflow step | Approve Catalog Request |

## Where a key takes effect

A key has an effect only where something checks it. Two places do:

- **The server.** On a guarded action, the server resolves the organization of the request and tests whether the user holds the required key there. A missing key returns HTTP 403 with a JSON body. This check is what actually protects the action.
- **The interface.** The Layer5 Cloud UI reads your effective keys for the organization in context and disables or hides controls for actions you cannot perform.

Not every key is checked in both places. Some security keys are enforced only by the interface: the server does not test Create Token, Delete Token, or Create Keychain, and it governs keychain changes by ownership rather than by the Edit Keychain and Delete Keychain keys. The [Security reference](/cloud/reference/security/) lists which security keys the server enforces.

Because a key grants nothing unless a check names it, a custom key is only a record. Adding one to a keychain and a role changes no behavior anywhere.

## Who can see and change keys

Every signed-in user can open the [Keys](https://cloud.layer5.io/security/keys) tab. It lists the system's keys plus any keys you created, and searches by key name. Viewing keys requires no key on the server.

Creating or editing a key, including changing which keychains carry it, requires the Edit Key key. Deleting a key requires the Delete Key key. Both belong to the Provider Management keychain, which only Provider Admin holds by default. On hosted Layer5 Cloud, Layer5 operates the Provider Admin role, so organizations cannot change keys. On a self-hosted deployment, the operator's Provider Admins can.

Deleting a key is a soft delete. The key stops granting access immediately and disappears from every keychain that contained it. Because keys are deployment-wide, editing or deleting one changes access for every organization at once.

## Auditing key use

Keys do not carry a usage counter; the Keys tab has no "last used" column. What a key's use leaves behind is the event the action produced, and those events are what you audit. The Audit Logs page answers who did what, and when:

- **User ID** - the account that performed the action, which is the account whose key was exercised.
- **Category** and **Action** - what was done, for example a workspace being created or a team being deleted. These correspond to the capability the key grants.
- **Acted Upon** - the resource the action affected.
- **Description** and **Created At** - the detail of the event and when it occurred.

Filter by actor to follow one user's activity, or by category and action to see everyone who exercised a capability over a period. The log you read belongs to the organization you currently have selected.

## Tracing a missing permission

When a user cannot perform an action, work from the key outward:

1. Identify the key the action requires. A 403 response or a disabled control both point to a missing key.
2. Find the default keychain and the roles that carry that key in the [Roles and Permissions reference](/cloud/reference/default-permissions/).
3. Check which roles the user holds in the organization the request ran in, not in the organization they usually work in.
4. Grant a role that carries the key in that organization. Do not add the keychain to a shared role unless every holder of that role in every organization should gain it.

## Limits

- Keys do not rotate or expire. A key grants its action until it is deleted or removed from the user's roles.
- Keys have no per-key usage counter. Use the Audit Logs page instead.
- On hosted Layer5 Cloud, only Provider Admins edit or delete keys.
- A key and its keychains are deployment-wide. Organizations tailor access by assigning roles, not by changing keys.

