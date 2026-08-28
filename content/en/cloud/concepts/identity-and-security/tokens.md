---
title: Tokens
description: >
  API Tokens are used to authenticate to Layer5 Cloud's REST API. Generated on your user account's security tokens page. Tokens can be revoked at any time.
weight: 8
aliases:
  - /cloud/security/tokens/

---

## What tokens are

For authentication and authorization, a token is a digital object that contains information about the identity of the principal making the request and what kind of access they are authorized for. In most authentication flows, the application—or a library used by the application—exchanges a credential for a token, which determines which resources the application is authorized to access.

## Access tokens

Layer5 Cloud REST API uses [OAuth 2.0](https://oauth.net/2/) for authentication and authorization. OAuth 2.0 is a standard protocol for authorization and focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and so on.

Access tokens are opaque tokens that conform to the OAuth 2.0 framework. They contain authorization information, but not identity information. They are used to authenticate and provide authorization information to Layer5 APIs. Access tokens are associated with a user account. They have an unlimited lifetime and can be revoked at any time.

{{< alert type="info" title="API Tokens are User-Scoped, Not Organization-Scoped" >}}
Layer5 Cloud API tokens are scoped to your user account, not to a specific organization. This means a single API token provides access to all organizations you are a member of, similar to how [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) work. For users who belong to multiple organizations, see [Specifying Organization Context]({{< ref "cloud/reference/api-reference/_index.md#specifying-organization-context" >}}) in the REST API documentation to learn how to control which organization your API requests operate on.
{{< /alert >}}

## Creating tokens

You can create a token for your user account at any time. Tokens never expire, but can be revoked. You can also give the token a descriptive label. This label will be shown in the list of tokens on your user account's security tokens page.

See [Tokens](https://cloud.layer5.io/security/tokens) in Layer5 Cloud.

## Using tokens

To use a token to authenticate to Layer5 Cloud's REST API, pass the token as a Bearer token in the Authorization header of your HTTP request:

```bash
Authorization: mdJhY2Nlc3NfdG9rgW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5CMVlteHBZem81T1dJNE1XSTBOeTA1TTJaaExUUTBNRE10T0RjMU15MHhOelU1TkRGaFptWmpOV0lpTJNKMGVYQWlPaUpLVjFRaWZRLmV5SmhkV1FpT2x0ZExDSmpiR2xsYm5SZmFXUWlPaUp0WlhOb1pYSjVMV05zYjNWa0lpd2laWGgwSWpwN2ZTd2lhV0YwSWpveE56RTROemsxTVRFMUxDSnBjM01pT2lKb2RIUndjem92TDIxbGMyaGxjbmt1YkdGNVpYSTFMbWx2TDJoNVpISmhJaXdpYW5
```

## Deleting tokens

Deleting a token is how you revoke it. A deleted token is immediately invalidated and cannot be used to make requests to the API again, and any refresh tokens associated with it are revoked along with it. There is no way to restore a deleted token; anything still authenticating with it will start failing, so replace it with a newly created token first if it is in use.

To delete a token:

1. Go to the [Tokens](https://cloud.layer5.io/security/tokens) page in Layer5 Cloud. Each row shows the token's **ID**, **Name**, **Purpose** and **Creation Date**.
2. Find the token you want to remove. The list is searchable and sortable, and shows the newest tokens first by default.
3. Click the **trash can** icon in that row's **Actions** column.
4. Confirm in the **Delete Token** dialog, which names the token it is about to delete. Click **Proceed**.

A confirmation notification reports the deleted token by name.

{{< alert type="info" title="Permissions Required" >}}
Deleting a token requires the **Delete Token** key. Without it the trash can icon is disabled. See [Keys]({{< ref "cloud/concepts/identity-and-security/keys.md" >}}).
{{< /alert >}}

{{< alert type="info" title="Sessions Are Deleted the Same Way" >}}
Your browser sign-ins are represented by their own tokens and are listed on the [Sessions](https://cloud.layer5.io/security/sessions) page rather than here. There the same action is presented as **Logout** instead of Delete, and it ends that session. See [Sessions]({{< ref "cloud/concepts/identity-and-security/sessions.md" >}}).
{{< /alert >}}

<!-- SCREENSHOT NEEDED: Layer5 Cloud Tokens page (https://cloud.layer5.io/security/tokens) with at least two tokens listed, must show the ID / Name / Purpose / Creation Date columns and the download and trash can icons in the Actions column -->

<!-- SCREENSHOT NEEDED: Delete Token confirmation dialog on the Tokens page, must show the "Are you sure you want to delete the following token?" text with the token name and the Proceed button -->
