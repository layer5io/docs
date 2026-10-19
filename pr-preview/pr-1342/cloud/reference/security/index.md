# Security Reference


> Security permission keys and who holds them, session and token lifetimes, cookies, visibility rules, and the endpoints behind keys, keychains, tokens, and sessions.



This page states how keys, keychains, tokens, and sessions behave, exactly, as of Layer5 Cloud v1.0.280. For the model, read the [Keys](/pr-preview/pr-1342/cloud/concepts/identity-and-security/keys/), [Keychains](/pr-preview/pr-1342/cloud/concepts/identity-and-security/keychains/), [Sessions](/pr-preview/pr-1342/cloud/concepts/identity-and-security/sessions/), and [Tokens](/pr-preview/pr-1342/cloud/concepts/identity-and-security/tokens/) concepts. For tasks, use the [security guides](/pr-preview/pr-1342/cloud/guides/security/). For base URL, authentication, and the organization header, see the [Cloud API](/pr-preview/pr-1342/cloud/reference/api-reference/). All paths below sit under `/api` unless noted.

## Permission keys

Provider Admin holds every key. The table lists the default holders of the other roles. "Interface" means the control or tab is disabled or replaced by a permission error screen. "Server" means the Layer5 Cloud server refuses the request with HTTP 403.

| Key | Governs | Default holders besides Provider Admin | Enforced by |
| --- | --- | --- | --- |
| View Tokens | The Tokens tab | User, Team Admin, Workspace Admin, Organization Admin | Interface |
| Create Token | Creating an API token | Organization Admin | Interface only |
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

Roles that hold the keys come from the default keychains: View keys sit in User View, Create Token and Delete Token in Security Management, Download Token in Security Management and User Edit, and the key and keychain management keys, including Assign Keychains to Roles, in Provider Management. Where the server requires the Provider Admin role, it checks the role across the whole deployment, not the role held in one organization. See [Roles and Permissions](/pr-preview/pr-1342/cloud/reference/default-permissions/) for the full role-by-keychain mapping.

## Visibility rules

| Resource | Who sees it | Scope |
| --- | --- | --- |
| Keys | System-owned default keys, plus keys you created | Deployment-wide; not per organization |
| Keychains | System-owned default keychains, plus keychains you own | Deployment-wide; not per organization |
| API tokens | Your own, never the token value in the list | User account |
| Sessions | Your own | User account |

Default keys and keychains are owned by the system. Deleting a key or keychain is a soft delete, and a deleted key or keychain stops granting access immediately.

## Session and token lifetimes

The values are the defaults of the Layer5 Cloud deployment configuration. Operators of self-hosted deployments can change them.

| Credential | Lifetime | Notes |
| --- | --- | --- |
| Browser session (access token) | 24 hours | Not extended by activity. The user signs in again after it lapses. |
| Refresh token | 1000 hours | Single-use. Each refresh issues a new refresh token. Meshery Server uses it to renew without a new sign-in. |
| API token | No expiry | Ends only when deleted. |
| Sign-in flow | 12 hours | Time allowed to complete a sign-in. |
| Privileged-action window | 15 minutes in the packaged default | After the window, sensitive account changes ask the user to sign in again. A deployment can set a different value. |
| Anonymous Kanvas session | 24 hours | For use without signing in. It does not appear in the Sessions list. |

## Cookies

| Cookie | Purpose | Attributes |
| --- | --- | --- |
| `provider_token` | The browser session credential | HttpOnly, Secure over HTTPS, SameSite Lax |
| `has_session` | Tells the interface a session exists. Carries no secret and cannot authenticate a request. | Readable by page scripts, SameSite Lax, expires with the session |

The cookie domain is shared across the platform's hosts for organizations that use the platform sign-in provider. It is host-only for organizations that bring their own identity provider, and for custom domains outside the platform's domain.

## Endpoints

Success responses are JSON unless stated. Errors from the handlers below return a plain-text message. Refusals from the authorization layer return JSON. A missing or revoked credential returns `401` with `{"message": "user must be logged in to perform this operation"}`.

### Keys

| Method and path | Who may call | Behavior |
| --- | --- | --- |
| `GET /auth/keys` | Signed-in user | Lists keys you can see. Parameters: `page`, `pageSize`, `order`, `search` (matches the key name). Default order: most recently updated first. |
| `GET /auth/keys/{keyId}` | Signed-in user | Returns one key. A malformed id returns `400`. |
| `POST /auth/keys` | Provider Admin holding Edit Key | Creates or updates a key. |
| `DELETE /auth/keys/{keyId}` | Provider Admin holding Delete Key | Soft-deletes the key. Returns `204`. |
| `GET /identity/orgs/{orgId}/users/keys` | Signed-in user | Returns your effective keys in the organization. The interface uses it to enable controls. |

### Keychains

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

These key, keychain, and role writes refuse with `403` and a JSON error. A caller who lacks the route's key receives code `meshery_cloud-1108`. A caller who holds the key but is not a Provider Admin for the whole deployment receives code `meshery_cloud-3336`, "Only a Provider Admin can change roles, keychains or permission keys". Owning a keychain does not authorize a change to it. For a Provider Admin, a malformed keychain id on these routes returns `400` with a plain-text message.

### Tokens and sessions

Tokens and sessions share one store. `isOauth=false` selects API tokens and `isOauth=true` selects sessions.

| Method and path | Who may call | Behavior |
| --- | --- | --- |
| `POST /identity/tokens?name=&purpose=` | Signed-in user | Creates a token for the caller. `name` is required: an empty name returns `400` with `Token name missing.` `purpose` is optional. Writes a create event. |
| `GET /identity/tokens?isOauth=` | Signed-in user | Lists your tokens or sessions. Default order: newest first. `search` matches name and purpose. The response never contains token values. |
| `GET /identity/tokens/{id}` | Token owner | Returns the token for download. Returns `404` for an unknown or revoked token and `400` for a malformed id. Writes a download event. |
| `DELETE /identity/tokens?tokenId=` | Token owner | Revokes the token or session. A malformed id returns `400` with `invalid token id`. An unknown or already-deleted id returns `400` with `tokens does not exist`. Writes a delete event. |
| `GET /identity/tokens/infinite?userId=&provider=` | Provider Admin | Issues a non-expiring token for another account. The token is listed under that account. Others receive `403`. |
| `POST /refresh` (outside `/api`) | Holder of a refresh token | Exchanges a refresh token for a new session credential. Returns `400` with a JSON `error` if the token is missing, malformed, or already used. |
| `GET /logout` (outside `/api`) | Signed-in browser | Ends the browser's identity session. |

When Layer5 Cloud cannot read the revocation record, it refuses the request rather than accept a token it cannot check.

## Audit events

| Action | Event |
| --- | --- |
| Create a token | `<email> generated token <name>` (category token, action create) |
| Download a token | `Token <name> downloaded` (category token, action download). A failed download is also recorded, with an error severity. |
| Delete a token or log out a session | `<email> revoked token <name>` (category token, action delete) |

Key and keychain changes do not write audit events.

