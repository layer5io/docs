# Create and Use an API Token


> Create an API token, hand it to a script or CI job, rotate it without downtime, and revoke it.



An API token lets a script, a CI job, or a Meshery client act as your user account against Layer5 Cloud. This guide creates one, uses it, rotates it, and revokes it. For what a token can reach and why it never expires, read the [Tokens concept](/pr-preview/pr-1329/cloud/concepts/identity-and-security/tokens/).

## Before you start

- You need the **Create Token** permission to create a token in the interface. Organization Admin and Provider Admin hold it by default. A user without it sees the create control disabled.
- You need **View Tokens** to open the Tokens tab. Every default user role holds it.
- Decide which consumer gets this token. Create one token per consumer so you can revoke one without breaking the others.

## Create a token

Open the Tokens tab under Security and start a new token. Enter a name and a purpose. Both are labels that appear in the token list: name the consumer ("ci-snapshots"), and state what it does in the purpose.

Layer5 Cloud creates the token for your user account. It has no expiry and no scope settings. The list shows the ID, name, purpose, and creation date. It never shows the token value.

## Get the token value

Download the token from its row in the list. This needs the **Download Token** permission, which User, Team Admin, Workspace Admin, Organization Admin, and Provider Admin hold by default.

The download is a JSON file named `token_<id>.json` in the format Meshery clients read:

```json
{
  "meshery-provider": "Layer5",
  "token": "<token>"
}
```

You can download a live token again at any time. A revoked token cannot be downloaded. Treat the file like a password: put the `token` value in your CI secret store and delete the file.

## Use the token

Send the token as a bearer token in the `Authorization` header:

```bash
curl -H "Authorization: Bearer <token>" \
  -H "X-Current-Orgid: <organization-id>" \
  https://cloud.layer5.io/api/environments
```

The token authenticates you, not an organization. It reaches every organization you belong to. Name the organization for each request with the `X-Current-Orgid` header. See [Specifying Organization Context](/pr-preview/pr-1329/cloud/reference/api-reference/#organization-context).

What the token can do equals what you can do in that organization. If your role changes, the token's reach changes on the next request.

For GitHub Actions, store the token as a repository secret. See [Use GitHub Actions](/pr-preview/pr-1329/cloud/guides/integrations/github-actions/).

## Rotate a token

Rotate on a schedule you set, and whenever a person with access to the secret leaves. Layer5 Cloud has no built-in rotation, so rotate in three steps:

1. Create a new token for the same consumer.
2. Update the consumer to use the new token and confirm it works.
3. Revoke the old token.

Revoking last keeps the consumer running the whole time.

## Revoke a token

**Needs:** the **Delete Token** permission (Organization Admin and Provider Admin by default).

Delete the token from its row in the Tokens list and confirm in the dialog, which names the token. Revocation is immediate and permanent:

- Requests that present the token fail from the next request on.
- The token cannot be downloaded or restored. Create a new one instead.
- The deletion appears as an event in your audit log.

Revoke at once if a token value leaked. You can delete only your own tokens, so the owner of a leaked token must revoke it. The server does not let another user, including a Provider Admin, delete it for them.












<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Permissions are enforced by the interface</h4>
  
      The interface requires Create Token, Delete Token, and Download Token. The Layer5 Cloud server accepts requests to create and delete your own tokens without checking those keys. The restriction is current behavior, not a security boundary. See the <a href="/pr-preview/pr-1329/cloud/reference/security/#permission-keys">Security Reference</a>.
  
</div>



## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| The create control is disabled | You lack Create Token in the selected organization. | Ask an Organization Admin to create the token or to grant the key through a role. |
| `401` with "user must be logged in to perform this operation" | The token was revoked, is malformed, or the header is wrong. | Check the header reads `Authorization: Bearer <token>`. If it does, create a new token. |
| `403` on a specific action | You lack the permission for that action in the organization named by `X-Current-Orgid`. | Check your role in that organization. See [Roles and Permissions](/pr-preview/pr-1329/cloud/reference/default-permissions/). |
| A token worked before and now fails | The token was revoked, or its owner account was removed. | Create a new token from an active account and replace it in the consumer. |

