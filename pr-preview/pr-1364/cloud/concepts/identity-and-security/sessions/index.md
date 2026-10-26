# Sessions


> User sessions are created each time a user successfully authenticates.



## What sessions are

A session is the credential Layer5 Cloud issues each time someone signs in. It is what keeps a browser tab, a second device, or a connected Meshery Server signed in, and it is what you end when you want one of those sign-ins to stop working. Sessions expire on their own. [API tokens](/pr-preview/pr-1364/cloud/concepts/identity-and-security/tokens/) do not.

Layer5 Cloud sessions use [OAuth 2.0](https://oauth.net/2/) for authentication. OAuth 2.0 is a standard protocol for authorization and focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and so on.

These are the Layer5 Cloud deployment defaults. Operators of a self-hosted deployment can change them.

| Credential | Default lifetime | Behavior |
|---|---|---|
| Access token | 24 hours | The browser session ends when it lapses. Activity in the interface does not extend it, so a browser user signs in again after 24 hours. |
| Refresh token | 1000 hours (about 41 days) | Clients such as Meshery Server use it to obtain a new access token. Each refresh token works once. Every refresh issues a new one. A failed refresh returns an error. |
| Sign-in flow | 12 hours | Time allowed to complete a sign-in. |
| Privileged-action window | Set by the deployment; 15 minutes in the packaged default | Sensitive actions, such as profile changes, ask you to authenticate again once this window has passed since sign-in. |
| Anonymous Kanvas session | 24 hours | For use without signing in. It does not appear on the Sessions tab. |

The browser keeps the session in the `provider_token` cookie. Page scripts cannot read it (HttpOnly), it is sent only over HTTPS, and it uses SameSite Lax, so other sites cannot send it along with their own requests except on ordinary top-level navigation. A second cookie, `has_session`, tells the interface that a session exists. It carries no secret, page scripts can read it, and it lapses with the session.

## Creating and using sessions

Every sign-in creates its own session. Each browser, device, and Meshery Server that signs in through Layer5 Cloud holds a separate session with its own expiry, and any number of them can be active at once. Ending one session leaves the others untouched.

A session acts as the user who signed in. What it can do in an organization is whatever the roles that user holds there allow, checked on every request. See [Keys](/pr-preview/pr-1364/cloud/concepts/identity-and-security/keys/) for how roles grant permissions.

To use a session, sign in to your Layer5 Cloud user account. The session cookie is stored in that browser. Use the same browser until the session expires. You can have multiple sessions active concurrently, on the same device or on different devices. Each session receives its own authentication token and expiry time.

It is possible to use the same account from two sessions at once. For example, you may open the same Kanvas design in two sessions and see your avatar twice in the design, along with your mouse cursor. You can use this to collaborate with yourself or with others.

Users see their own sessions on the [Sessions](https://cloud.layer5.io/security/sessions) tab of the Security page. Each row shows the session's ID, name, purpose, and creation date. The tab requires the View Sessions key, which every default user role holds. The list shows no device, browser, or location for a session. Search filters by name or purpose, and the newest sessions appear first.

## Revoking sessions

A session ends in one of three ways:

- **Expiry.** The access token lapses at its lifetime. Activity does not extend it.
- **Logout from the Sessions tab.** The session's token is revoked immediately. The next request that presents it fails. The action records the same audit event as deleting a token: `<email> revoked token <name>` (category token, action delete). The confirmation reads `Token "<name>" deleted`, because a session is stored as a token.
- **Signing out of the app.** Signing out ends the browser's identity session and revokes its stored grant.

Changing your password does not end your other sessions. Layer5 Cloud has no sign-out-everywhere action and no idle timeout setting. To end your other sessions, log each one out from the Sessions tab.

The deleted session cannot be restored. Whoever used it must sign in again.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Who can use Logout</h4>
  
      The Logout action on the Sessions tab requires the Delete Token key, which only Organization Admins and Provider Admins hold by default. Users, Team Admins, and Workspace Admins see Logout disabled, even though their roles hold the Logout from a Session key. Layer5 Cloud lets each user log out only their own sessions. No role can end another user&rsquo;s session from this tab. The server deletes only your own tokens. Delete Token is enforced by the interface for this control. The server does not test the Delete Token key on the delete request.
  
</div>



See [Sessions](https://cloud.layer5.io/security/sessions) in Layer5 Cloud.

## If you suspect your account is compromised

1. End every session you do not recognize. A creation date you cannot account for means someone else signed in with your credentials.
2. Change your password. Changing the password does not end other sessions, so complete step 1 first and check the list again afterward.
3. Review your [API tokens](/pr-preview/pr-1364/cloud/concepts/identity-and-security/tokens/) and revoke any you did not create. Tokens never expire and are not sessions, so signing out does not revoke them.
4. If you cannot sign in, ask an Organization Admin or Provider Admin to help recover the account.

Layer5 Cloud has no "sign out everywhere" action. End each session from the list.

## How the browser stores a session

| Cookie | Purpose | Attributes |
| --- | --- | --- |
| `provider_token` | The browser session credential | HttpOnly, Secure over HTTPS, SameSite Lax |
| `has_session` | Tells the interface a session exists. Carries no secret and cannot authenticate a request. | Readable by page scripts, SameSite Lax, expires with the session |

The cookie's scope depends on how the organization signs users in:

- **Platform sign-in provider.** The cookie is shared across the platform's hosts, so one sign-in covers them.
- **Organization's own identity provider, or a custom domain outside the platform's domain.** The cookie is host-only and is never sent to any other host.

See [Organizations](/pr-preview/pr-1364/cloud/concepts/identity-and-security/organizations/) for how custom domains and identity providers decide where a user signs in.

## Sessions and API tokens

Sessions and API tokens both authenticate as you, and Layer5 Cloud revokes them through the same mechanism. They differ in how they start and how long they live. Tokens and sessions share one store. `isOauth=false` selects API tokens and `isOauth=true` selects sessions.

| | Session | API token |
|---|---|---|
| Created by | Signing in from a browser, device, or Meshery Server | Creating it on the Tokens tab with a name and purpose |
| Lifetime | 24-hour access token, renewable by clients for up to about 41 days | No expiry |
| Ended by | Expiry, Logout on the Sessions tab, or signing out | Deleting it on the Tokens tab |
| Used for | Interactive use and connected Meshery Servers | Scripts and API clients sending a Bearer token |

The Tokens tab never lists sessions, and the Sessions tab never lists API tokens.

You see only your own sessions. Sessions are scoped to your user account, not to one organization.

## What Layer5 Cloud does not offer

- No organization-level session policy. Lifetimes are set for the whole deployment.
- No idle timeout setting in the product interface.
- No device, browser, or location detail on a session.
- No action that ends every session at once.

## Session endpoints

Paths sit under `/api` unless noted. A missing or revoked credential returns `401` with `{"message": "user must be logged in to perform this operation"}`. When Layer5 Cloud cannot read the revocation record, it refuses the request rather than accept a token it cannot check.

| Method and path | Who may call | Behavior |
| --- | --- | --- |
| `GET /identity/tokens?isOauth=true` | Signed-in user | Lists your sessions. Default order: newest first. `search` matches name and purpose. The response never contains token values. |
| `DELETE /identity/tokens?tokenId=` | Token owner | Revokes the session. A malformed id returns `400` with `invalid token id`. An unknown or already-deleted id returns `400` with `tokens does not exist`. Writes a delete event. |
| `POST /refresh` (outside `/api`) | Holder of a refresh token | Exchanges a refresh token for a new session credential. Returns `400` with a JSON `error` if the token is missing, malformed, or already used. |
| `GET /logout` (outside `/api`) | Signed-in browser | Ends the browser's identity session. |

| Key | Governs | Default holders besides Provider Admin | Enforced by |
| --- | --- | --- | --- |
| View Sessions | The Sessions tab | User, Team Admin, Workspace Admin, Organization Admin | Interface |
| Logout from a Session | Seeded for ending a session | User, Team Admin, Workspace Admin, Organization Admin | Not checked. The interface uses Delete Token for Logout. |
| Delete Token | The Logout control on the Sessions tab, and revoking a token | Organization Admin | Interface only. The server deletes only your own tokens. |

