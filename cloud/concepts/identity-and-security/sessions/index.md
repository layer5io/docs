# Sessions


> How long a Layer5 Cloud sign-in lasts, what ends it, how the browser stores it, and how sessions differ from API tokens.



A session is the credential Layer5 Cloud issues each time someone signs in. It is what keeps a browser tab, a second device, or a connected Meshery Server signed in, and it is what you end when you want one of those sign-ins to stop working. Sessions expire on their own; API tokens do not.

## One session per sign-in

Every sign-in creates its own session. Each browser, device, and Meshery Server that signs in through Layer5 Cloud holds a separate session with its own expiry, and any number of them can be active at once. Ending one session leaves the others untouched.

A session acts as the user who signed in. What it can do in an organization is whatever the roles that user holds there allow, checked on every request. See [Keys](/cloud/concepts/identity-and-security/keys/) for how roles grant permissions.

Users see their own sessions on the [Sessions](https://cloud.layer5.io/security/sessions) tab of the Security page, which lists each session's ID, name, purpose, and creation date. The tab requires the View Sessions key, which every default user role holds. The list shows no device, browser, or location for a session.

## How long a session lasts

These are the Layer5 Cloud deployment defaults. Operators of a self-hosted deployment can change them.

| Credential | Default lifetime | Behavior |
|---|---|---|
| Access token | 24 hours | The browser session ends when it lapses. Activity in the interface does not extend it, so a browser user signs in again after 24 hours. |
| Refresh token | 1000 hours (about 41 days) | Clients such as Meshery Server use it to obtain a new access token. Each refresh token works once; every refresh issues a new one. A failed refresh returns an error. |
| Privileged-action window | Set by the deployment; 15 minutes in the packaged default | Sensitive actions, such as profile changes, ask you to authenticate again once this window has passed since sign-in. |

Anonymous Kanvas use, without signing in, lasts 24 hours and does not appear on the Sessions tab.

## What ends a session

A session ends in one of three ways:

- **Expiry.** The access token lapses at its lifetime, as described above.
- **Logout from the Sessions tab.** The session's token is revoked immediately; the next request that presents it fails. The action records the same audit event as deleting a token.
- **Signing out of the app.** Signing out ends the browser's identity session and revokes its stored grant.

Changing your password does not end your other sessions. Layer5 Cloud has no sign-out-everywhere action and no idle timeout setting. To end your other sessions, log each one out from the Sessions tab. [Review and sign out sessions](/cloud/guides/security/sessions/) covers the task.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Who can use Logout</h4>
  
      The Logout action on the Sessions tab requires the Delete Token key, which only Organization Admins and Provider Admins hold by default. Users, Team Admins, and Workspace Admins see Logout disabled, even though their roles hold the Logout from a Session key. Layer5 Cloud lets each user log out only their own sessions; no role can end another user&rsquo;s session from this tab.
  
</div>



## How the browser stores a session

The browser keeps the session in a cookie that page scripts cannot read (HttpOnly), that is sent only over HTTPS, and that uses SameSite Lax, so other sites cannot send it along with their own requests except on ordinary top-level navigation. A second, companion cookie tells the interface that a session exists. It carries no secret and lapses with the session.

The cookie's scope depends on how the organization signs users in:

- **Platform sign-in provider.** The cookie is shared across the platform's hosts, so one sign-in covers them.
- **Organization's own identity provider, or a custom domain outside the platform's domain.** The cookie is host-only and is never sent to any other host.

See [Organizations](/cloud/concepts/identity-and-security/organizations/) for how custom domains and identity providers decide where a user signs in.

## Sessions and API tokens

Sessions and API tokens both authenticate as you, and Layer5 Cloud revokes them through the same mechanism. They differ in how they start and how long they live.

| | Session | API token |
|---|---|---|
| Created by | Signing in from a browser, device, or Meshery Server | Creating it on the Tokens tab with a name and purpose |
| Lifetime | 24-hour access token, renewable by clients for up to about 41 days | No expiry |
| Ended by | Expiry, Logout on the Sessions tab, or signing out | Deleting it on the Tokens tab |
| Used for | Interactive use and connected Meshery Servers | Scripts and API clients sending a Bearer token |

The Tokens tab never lists sessions, and the Sessions tab never lists API tokens. See [Tokens](/cloud/concepts/identity-and-security/tokens/) for how API tokens behave.

## What Layer5 Cloud does not offer

- No organization-level session policy. Lifetimes are set for the whole deployment.
- No idle timeout setting in the product interface.
- No device, browser, or location detail on a session.
- No action that ends every session at once.

The [security reference](/cloud/reference/security/) lists the session keys, default lifetimes, and cookie attributes in one place.

