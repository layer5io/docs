# Tokens


> API Tokens are used to authenticate to Layer5 Cloud's REST API. Generated on your user account's security tokens page. Tokens can be revoked at any time.



## What tokens are

An API token lets software act as you. Scripts, CI/CD pipelines, `mesheryctl`, and other Meshery clients present it to Layer5 Cloud instead of signing in through a browser. Because a token carries your full authority and never expires, deciding how many tokens to create, who holds them, and when to delete them is a security decision.

A token is a credential bound to your user account. A client sends it as a bearer token in the `Authorization` header of each request. The [Cloud API reference](/pr-preview/pr-1356/cloud/reference/api-reference/) shows the exact form.

A token is not scoped to an organization. One token reaches every organization you belong to. Each request chooses the organization it runs in, so a single pipeline token can act in several organizations if you are a member of each. See [Specifying Organization Context](/pr-preview/pr-1356/cloud/reference/api-reference/#specifying-organization-context).

Layer5 Cloud does not record permissions inside the token. It evaluates your roles at the moment of each call, in the organization of that request. There are no token scopes. You cannot limit a token to read-only access, to one organization, or to a subset of your permissions. To give automation narrower authority, give it a token from an account whose roles are narrower.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">API Tokens are User-Scoped, Not Organization-Scoped</h4>
  
      Layer5 Cloud API tokens are scoped to your user account, not to a specific organization. This means a single API token provides access to all organizations you are a member of, similar to how <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">GitHub Personal Access Tokens</a> work. For users who belong to multiple organizations, see <a href="/pr-preview/pr-1356/cloud/reference/api-reference/#specifying-organization-context">Specifying Organization Context</a> in the REST API documentation to learn how to control which organization your API requests operate on.
  
</div>



## Access tokens

Layer5 Cloud REST API uses [OAuth 2.0](https://oauth.net/2/) access tokens for authentication and authorization. Access tokens are opaque tokens that conform to the OAuth 2.0 framework. They are used to authenticate requests to Layer5 APIs and are associated with a user account.

Tokens never expire. Layer5 Cloud offers no expiry setting, and a token remains valid until it is deleted. This differs from [sessions](/pr-preview/pr-1356/cloud/concepts/identity-and-security/sessions/), which Layer5 Cloud creates at each sign-in and which lapse on their own. A token is the right credential for unattended automation. A session is the right one for a person at a browser.

- **Role changes apply at once.** When an administrator grants or removes a role, the next request made with your token reflects the change.
- **Removing the user ends the token.** If your account is disabled or deleted, Layer5 Cloud refuses every request that presents your tokens.

## Creating tokens

You can create a token for your user account at any time. Tokens never expire, but can be revoked. Every token has a name, which is required. The Tokens tab also asks for a purpose. Both are labels. They appear in your token list and help you recognize each token later, and they have no effect on what the token can do. Name the consumer (for example, `ci-snapshots`) and state what it does in the purpose.

Layer5 Cloud creates the token for your user account. It has no expiry and no scope settings. The list shows the ID, name, purpose, and creation date. It never shows the token value. The list is searchable and sortable, and shows the newest tokens first by default.

See [Tokens](https://cloud.layer5.io/security/tokens) in Layer5 Cloud.

### Before you start

- You need the **Create Token** permission to create a token in the interface. User, Team Admin, Workspace Admin, Organization Admin, and Provider Admin hold it by default. A user without it sees the create control disabled.
- You need **View Tokens** to open the Tokens tab. Every default user role holds it.
- Decide which consumer gets this token. Create one token per consumer so you can revoke one without breaking the others.

Open the Tokens tab under Security and start a new token. Enter a name and a purpose.

## Using tokens

To use a token to authenticate to Layer5 Cloud's REST API, pass the token as a Bearer token in the Authorization header of your HTTP request:

```bash
curl -H "Authorization: Bearer <token>" \
  -H "X-Current-Orgid: <organization-id>" \
  https://cloud.layer5.io/api/environments
```

The token authenticates you, not an organization. It reaches every organization you belong to. Name the organization for each request with the `X-Current-Orgid` header. Layer5 Cloud reads that header name only. See [Specifying Organization Context](/pr-preview/pr-1356/cloud/reference/api-reference/#specifying-organization-context).

What the token can do equals what you can do in that organization. If your role changes, the token's reach changes on the next request.

For GitHub Actions, store the token as a repository secret. See [Use GitHub Actions](/pr-preview/pr-1356/cloud/guides/integrations/github-actions/).

## Deleting tokens

Deleting a token is how you revoke it. Revocation takes effect immediately and cannot be undone. A deleted token cannot be downloaded again, and every request that presents it fails. There is no way to restore a deleted token. Anything still authenticating with it will start failing, so replace it with a newly created token first if it is in use.

Layer5 Cloud checks revocation on every request. If it cannot complete that check, it refuses the request rather than accept a token that might be revoked.

To delete a token:

1. Go to the [Tokens](https://cloud.layer5.io/security/tokens) page in Layer5 Cloud. Each row shows the token's **ID**, **Name**, **Purpose**, and **Creation Date**.
2. Find the token you want to remove. The list is searchable and sortable, and shows the newest tokens first by default.
3. Click the **trash can** icon in that row's **Actions** column.
4. Confirm in the **Delete Token** dialog, which names the token it is about to delete. Click **Proceed**.

A confirmation notification reports the deleted token by name. The deletion appears as an event in your audit log.

You can delete only your own tokens. The server does not let another user, including a Provider Admin, delete a token for its owner. The owner of a leaked token must revoke it.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Permissions Required</h4>
  
      Deleting a token in the interface requires the <strong>Delete Token</strong> key, which Organization Admin and Provider Admin hold by default. Without it the trash can icon is disabled. See <a href="/pr-preview/pr-1356/cloud/concepts/identity-and-security/keys/">Keys</a>.
  
</div>









<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Sessions Are Deleted the Same Way</h4>
  
      Your browser sign-ins are represented by their own tokens and are listed on the <a href="https://cloud.layer5.io/security/sessions">Sessions</a> page rather than here. There the same action is presented as <strong>Logout</strong> instead of Delete, and it ends that session. See <a href="/pr-preview/pr-1356/cloud/concepts/identity-and-security/sessions/">Sessions</a>.
  
</div>














<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Permissions are enforced by the interface</h4>
  
      The interface requires Create Token, Delete Token, and Download Token. The Layer5 Cloud server accepts requests to create and delete your own tokens without checking those keys. The restriction is current behavior, not a security boundary. See <a href="/pr-preview/pr-1356/cloud/reference/#permission-keys">security permission keys</a>.
  
</div>



## Get the token value

Download the token from its row in the list. This needs the **Download Token** permission, which User, Team Admin, Workspace Admin, Organization Admin, and Provider Admin hold by default.

The download is a JSON file named `token_<id>.json` in the format Meshery clients read:

```json
{
  "meshery-provider": "Layer5",
  "token": "<token>"
}
```

You can download a live token again at any time. A revoked token cannot be downloaded. Treat the file like a password: put the `token` value in your CI secret store and delete the file. Anyone who obtains the file can act as you.

The token list never shows a token's value. Creating, downloading, and deleting a token each write an audit event, so your organization's audit trail records who generated a token, who retrieved it, and who revoked it.

## List your tokens over the API

A script can list the tokens your account holds, for example to find old ones before rotating:

```bash
curl -H "Authorization: Bearer <token>" \
  "https://cloud.layer5.io/api/identity/tokens?purpose=ci-snapshots"
```

The answer lists each token's ID, name, purpose, and creation date, never its value. `purpose` keeps only tokens created with exactly that purpose, matched case-sensitively. Leave it out to list every token. `search` matches part of a name or purpose. The list holds API tokens unless you send `isOauth=true`, which lists sign-in sessions instead.

Desktop clients that sign in through Layer5 Cloud create their token with the client's name as its purpose, so the same filter lists the tokens a client created for itself.

## Rotate a token

To rotate a token without downtime, create the replacement first, switch each consumer to it, then delete the old token.

Rotate on a schedule you set, and whenever a person with access to the secret leaves. Layer5 Cloud has no built-in rotation, so rotate in three steps:

1. Create a new token for the same consumer.
2. Update the consumer to use the new token and confirm it works.
3. Revoke the old token.

Revoking last keeps the consumer running the whole time. Revoke at once if a token value leaked.

## Who can manage tokens by default

Each action on the Tokens tab is governed by a [key](/pr-preview/pr-1356/cloud/concepts/identity-and-security/keys/). Provider Admin holds every key. With the default roles:

- **View Tokens**, which opens the Tokens tab, is held by every default user role.
- **Download Token** is held by User, Team Admin, Workspace Admin, and Organization Admin.
- **Create Token** is held by User, Team Admin, Workspace Admin, Organization Admin, and Provider Admin.
- **Delete Token** is held by Organization Admin and Provider Admin only. For every other role, the interface disables the delete control.

Every token action applies only to your own tokens. You cannot list, download, or delete another user's token. The list shows your own tokens and never the token value.

Roles that hold the keys come from the default keychains: View Tokens sits in User View, Delete Token in Security Management, and Create Token and Download Token in Security Management and User Edit.







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Current behavior: token create and delete requests are not checked against the keys</h4>
  
      The Layer5 Cloud server allows any signed-in user to create and delete their own tokens through the API. It does not check the Create Token or Delete Token keys on those requests. Withholding those keys hides the controls in the interface. It does not prevent a user from minting a token. Approving a desktop app or CLI sign-in is different: the server requires Create Token in at least one organization you belong to. The organization you have selected, or the one a custom domain belongs to, does not matter, so a member of a child organization can approve a sign-in on its parent&rsquo;s custom domain.
  
</div>



A Provider Admin can mint a token on behalf of another account. That token appears in the account holder's token list, and the account holder can revoke it.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| The create control is disabled | You lack Create Token in the selected organization. | Ask an Organization Admin to create the token or to grant the key through a role. |
| `401` with "user must be logged in to perform this operation" | The token was revoked, is malformed, or the header is wrong. | Check the header reads `Authorization: Bearer <token>`. If it does, create a new token. |
| `403` on a specific action | You lack the permission for that action in the organization named by `X-Current-Orgid`. | Check your role in that organization. See [Default Permissions](/pr-preview/pr-1356/cloud/reference/default-permissions/). |
| A token worked before and now fails | The token was revoked, or its owner account was removed. | Create a new token from an active account and replace it in the consumer. |

## Practices that limit risk

- **Create one token per consumer.** A separate token for each pipeline, script, or Meshery Server lets you revoke one without breaking the others.
- **Name each token after its consumer.** The name is the only way to tell tokens apart in the list.
- **Delete a token when its consumer is retired.** A token never expires, so an unused token remains a live credential until you delete it.

Manage your tokens at [cloud.layer5.io/security/tokens](https://cloud.layer5.io/security/tokens).

## Token endpoints

Paths sit under `/api` unless noted. Success responses are JSON unless stated. A missing or revoked credential returns `401` with `{"message": "user must be logged in to perform this operation"}`. When Layer5 Cloud cannot read the revocation record, it refuses the request rather than accept a token it cannot check.

| Method and path | Who may call | Behavior |
| --- | --- | --- |
| `POST /identity/tokens?name=&purpose=` | Signed-in user | Creates a token for the caller. `name` is required: an empty name returns `400` with `Token name missing.` `purpose` is optional. Writes a create event. |
| `GET /identity/tokens?isOauth=` | Signed-in user | Lists your tokens or sessions. Default order: newest first. `search` matches name and purpose. `purpose` matches exactly, case-sensitively. The response never contains token values. `isOauth=false` selects API tokens. `isOauth=true` selects sessions. |
| `GET /identity/tokens/{id}` | Token owner | Returns the token for download. Returns `404` for an unknown or revoked token and `400` for a malformed id. Writes a download event. |
| `DELETE /identity/tokens?tokenId=` | Token owner | Revokes the token or session. A malformed id returns `400` with `invalid token id`. An unknown or already-deleted id returns `400` with `tokens does not exist`. Writes a delete event. |
| `GET /identity/tokens/infinite?userId=&provider=` | Provider Admin | Issues a non-expiring token for another account. The token is listed under that account. Others receive `403`. |

## Audit events

| Action | Event |
| --- | --- |
| Create a token | `<email> generated token <name>` (category token, action create) |
| Download a token | `Token <name> downloaded` (category token, action download). A failed download is also recorded, with an error severity. |
| Delete a token or log out a session | `<email> revoked token <name>` (category token, action delete) |

