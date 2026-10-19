# Tokens


> An API token is a long-lived credential that authenticates scripts, pipelines and Meshery clients to Layer5 Cloud as your user account. It never expires and ends only when you delete it.



An API token lets software act as you. Scripts, CI/CD pipelines, `mesheryctl` and other Meshery clients present it to Layer5 Cloud instead of signing in through a browser. Because a token carries your full authority and never expires, deciding how many tokens to create, who holds them and when to delete them is a security decision. This page explains how tokens behave so you can make it.

## What a token is

A token is a credential bound to your user account. A client sends it as a bearer token in the `Authorization` header of each request; the [Cloud API reference](/pr-preview/pr-1326/cloud/reference/api-reference/) shows the exact form.

A token is not scoped to an organization. One token reaches every organization you belong to. Each request chooses the organization it runs in, so a single pipeline token can act in several organizations if you are a member of each. See [Organization context](/pr-preview/pr-1326/cloud/reference/api-reference/#organization-context) for how Layer5 Cloud selects it.

## What a token can do

A token can do exactly what you can do, no more and no less. Layer5 Cloud does not record permissions inside the token. It evaluates your roles at the moment of each call, in the organization of that request.

- **Role changes apply at once.** When an administrator grants or removes a role, the next request made with your token reflects the change.
- **Removing the user ends the token.** If your account is disabled or deleted, Layer5 Cloud refuses every request that presents your tokens.
- **There are no token scopes.** You cannot limit a token to read-only access, to one organization or to a subset of your permissions. To give automation narrower authority, give it a token from an account whose roles are narrower.

## Lifetime

Tokens never expire. Layer5 Cloud offers no expiry setting, and a token remains valid until it is deleted. This differs from [sessions](/pr-preview/pr-1326/cloud/concepts/identity-and-security/sessions/), which Layer5 Cloud creates at each sign-in and which lapse on their own. A token is the right credential for unattended automation; a session is the right one for a person at a browser.

## Name, purpose and retrieval

Every token has a name, which is required. The Tokens tab also asks for a purpose. Both are labels: they appear in your token list and help you recognize each token later, and they have no effect on what the token can do.

The token list never shows a token's value. Instead, you can download any live token you own as a JSON file at any time after creation. The file uses the Meshery provider format, so Meshery clients read it directly. Anyone who obtains the file can act as you, so protect it like a password.

Creating, downloading and deleting a token each write an audit event, so your organization's audit trail records who generated a token, who retrieved it and who revoked it.

## Revocation

Deleting a token revokes it. Revocation takes effect immediately and cannot be undone.

- Layer5 Cloud removes the stored credential, so a deleted token cannot be downloaded again.
- Every request that presents the deleted token fails.
- Layer5 Cloud checks revocation on every request. If it cannot complete that check, it refuses the request rather than accept a token that might be revoked.

To rotate a token without downtime, create the replacement first, switch each consumer to it, then delete the old token. The [API tokens guide](/pr-preview/pr-1326/cloud/guides/security/api-tokens/) walks through creating, downloading, rotating and deleting tokens.

## Who can manage tokens by default

Each action on the Tokens tab is governed by a [key](/pr-preview/pr-1326/cloud/concepts/identity-and-security/keys/). With the default roles:

- **View Tokens**, which opens the Tokens tab, is held by every default user role.
- **Download Token** is held by User, Team Admin, Workspace Admin and Organization Admin.
- **Create Token** and **Delete Token** are held by Organization Admin and Provider Admin only. For every other role, the interface disables the create and delete controls.

Every token action applies only to your own tokens. You cannot list, download or delete another user's token.







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Current behavior: Create Token and Delete Token are enforced in the interface only</h4>
  
      The Layer5 Cloud server allows any signed-in user to create and delete their own tokens through the API. It does not itself check the Create Token or Delete Token keys. Withholding those keys hides the controls in the interface; it does not prevent a user from minting a token.
  
</div>



The [security reference](/pr-preview/pr-1326/cloud/reference/security/) lists every security key and the roles that hold it.

A Provider Admin can mint a token on behalf of another account; that token appears in the account holder's token list, and the account holder can revoke it.

## Practices that limit risk

- **Create one token per consumer.** A separate token for each pipeline, script or Meshery Server lets you revoke one without breaking the others.
- **Name each token after its consumer.** The name is the only way to tell tokens apart in the list.
- **Delete a token when its consumer is retired.** A token never expires, so an unused token remains a live credential until you delete it.

For storing a token as a pipeline secret, see [GitHub Actions](/pr-preview/pr-1326/cloud/guides/integrations/github-actions/). Manage your tokens at [cloud.layer5.io/security/tokens](https://cloud.layer5.io/security/tokens).

