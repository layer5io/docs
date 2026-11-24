# Google Drive

> Connect a Google account to Layer5 Cloud so it can fetch the files you pick from your Google Drive, and learn how to disconnect or revoke that access.




<div class="pageinfo">
<p>The Google Drive connection is rolling out. It needs a Layer5 Cloud release that includes it, so you may not see it on a Layer5 Cloud deployment that has not been updated yet. The connection screens are still being finished, so the steps below describe each step in general terms rather than quoting button labels.</p>

</div>

A Google Drive connection lets Layer5 Cloud fetch media files that you pick from your Google Drive. Your files stay in your Drive. Layer5 does not copy them into long-term storage.

Each connection is one Google account that you have authorized. It appears in your connections, named after the account's email address (or **Google Drive** when Google does not share an email).

## What Layer5 Cloud can access

When you connect, Google shows a consent screen. Layer5 Cloud asks for three permissions, which Google calls scopes. A scope is a named permission that limits what an application may do with your account.

| Scope | What it allows |
| --- | --- |
| `drive.file` | Access to the files you explicitly pick, and files the application itself created. |
| `openid` and `email` | Identify which Google account you connected, so the connection can be named and so the same account is not added twice. |

`drive.file` is the narrow Drive permission. It does **not** give Layer5 Cloud access to your whole Drive. Files you did not pick stay invisible to it, and it cannot browse or search your other folders.

Layer5 Cloud cannot widen this request. Only these scopes are accepted.

## Connecting a Google account

1. Sign in to Layer5 Cloud and open your connections.
2. Choose to connect Google Drive. Layer5 Cloud sends you to Google.
3. Pick the Google account, and review and approve the permissions on the consent screen.
4. Google returns you to Layer5 Cloud, and the new connection is listed as connected.

Google shows the consent screen on every connect, including a reconnect. This is expected: it is how Google issues Layer5 Cloud a fresh long-lived credential.

Start and finish the connection in the same browser, on the same Layer5 Cloud address, within a few minutes. If you take too long, open a second tab partway, or switch to a different address, Layer5 Cloud rejects the return from Google as stale and asks you to connect again.

### Several accounts, and reconnecting

- You can connect several Google accounts. Each is its own connection.
- You can have one connection per Google account in each organization. The same Google account in another organization is a separate connection.
- Connecting a Google account that is already connected updates the existing connection (status, account details, and credential) instead of creating a duplicate, and the connection keeps its name.
- Every connection belongs to one organization. If you belong to several organizations, or none, select an organization first.

### If a connection fails

Layer5 Cloud reports one of these outcomes when it returns you from Google.

| Message in short | Meaning |
| --- | --- |
| Authorization could not be completed | Google reported an error, you declined, or the exchange failed. Connect again. |
| Not started from this session, took too long, or already used | The connection attempt expired (it lasts five minutes) or came from a different session. Connect again. |
| Account could not be identified | Google did not return a usable account identifier. Connect again. |
| Connection could not be saved | Layer5 Cloud could not store the connection. Try again. |
| Select an organization | Choose the organization the connection will belong to, then connect. |
| Authorization is not configured | This deployment has no Google Drive client set up. Contact your administrator or support. |

## How your credentials are protected

Connecting gives Layer5 Cloud a token. A token is a secret string that proves Google allowed the access, so Layer5 Cloud does not need your Google password. Layer5 Cloud keeps two kinds: a long-lived refresh token, and a short-lived access token it obtains from the refresh token when needed.

- Tokens are encrypted at rest.
- Tokens are never sent to your browser. Layer5 Cloud's connection list shows the account email and status, not the credential.
- The credential is personal to you. Other members of your organization cannot use your Google Drive connection.

## Disconnecting a connection

To disconnect, delete the connection from your connections. You can delete only a connection you own, and you need the Delete a connection permission. See [Default Permissions](/pr-preview/pr-1384/cloud/reference/default-permissions/).

When you delete a Google Drive connection, Layer5 Cloud:

1. Asks Google to revoke the token, so it stops working everywhere.
2. Only after Google confirms, removes the connection and its stored credential.

If Google cannot be reached, or refuses the request, the delete fails. The connection and its credential stay in place, nothing is half-removed, and you can try again later. If Google reports that the token is already invalid (for example because you revoked it on the Google side), the delete still completes.

After you disconnect, connecting the same Google account again creates a new connection.

## Revoking access from Google

You can also remove access from your Google account at any time:

1. Open [myaccount.google.com/connections](https://myaccount.google.com/connections), which is under **Google Account** > **Security** > **Third-party apps and services**.
2. Select Layer5 Cloud and remove its access.

Layer5 Cloud does not learn about this immediately. The next time it tries to refresh the token, Google rejects the request, and Layer5 Cloud marks the connection as disconnected. To restore it, connect the same Google account again, which updates the existing connection. You can delete the disconnected connection at any time.

## For self-hosted operators

A self-hosted Layer5 Cloud needs its own Google OAuth client for Drive. OAuth is the standard sign-in-and-permission protocol Google uses. Without these values, the connection cannot be started and users see "Authorization is not configured".

Create a Google OAuth client of type Web application that is **dedicated to Drive**. Do not reuse the client you use for Google sign-in, because that would attach Drive access to sign-in. Then set these Helm values:

| Helm value | Environment variable | Purpose |
| --- | --- | --- |
| `env.gdriveOAuthClientId` | `GDRIVE_OAUTH_CLIENT_ID` | Client ID of the Drive client. |
| `env.gdriveOAuthClientSecret` | `GDRIVE_OAUTH_CLIENT_SECRET` | Client secret of the Drive client. Stored in the chart Secret. |
| `env.gdriveOAuthRedirectUrl` | `GDRIVE_OAUTH_REDIRECT_URL` | The callback address, `https://<your Cloud host>/api/integrations/gdrive/callback`. |

Register the same redirect URI at Google, character for character. It must use `https` (plain `http` is accepted only for `localhost`) and must be the host users sign in on, because the session cookie is tied to that host. See [Customizing Layer5 Cloud Deployment with Helm](/pr-preview/pr-1384/cloud/guides/self-hosted/deployment/helm-chart-values/) for the other values, and keep `env.cloudCredentialEncryptionKey` and `env.cloudOidcStateHmacKey` set, since they encrypt the stored tokens and sign the connection attempt.

