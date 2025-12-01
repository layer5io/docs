---
title: Tokens
description: >
  API Tokens are used to authenticate to Layer5 Cloud's REST API. Generated on your user account's security tokens page. Tokens can be revoked at any time.
weight: 3
---

## What tokens are

For authentication and authorization, a token is a digital object that contains information about the identity of the principal making the request and what kind of access they are authorized for. In most authentication flows, the application—or a library used by the application—exchanges a credential for a token, which determines which resources the application is authorized to access.

## Access tokens

Layer5 Cloud REST API uses [OAuth 2.0](https://oauth.net/2/) for authentication and authorization. OAuth 2.0 is a standard protocol for authorization and focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and so on.

Access tokens are opaque tokens that conform to the OAuth 2.0 framework. They contain authorization information, but not identity information. They are used to authenticate and provide authorization information to Layer5 APIs. Access tokens are associated with a user account. They have an unlimited lifetime and can be revoked at any time.

{{< alert type="info" title="API Tokens are User-Scoped, Not Organization-Scoped" >}}
Layer5 Cloud API tokens are scoped to your user account, not to a specific organization. This means a single API token provides access to all organizations you are a member of, similar to how [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) work. For users who belong to multiple organizations, this is an important consideration when using API tokens for automation or integrations.

To explicitly control which organization your API requests operate on, you can:
- Use the `layer5-current-orgid` header to specify the target organization for each request
- Set your `selectedOrganization` and `selectedWorkspace` preferences via the [Preferences API](/cloud/reference/api-reference/#specifying-organization-context)

See [Specifying Organization Context](/cloud/reference/api-reference/#specifying-organization-context) in the REST API documentation for detailed examples.
{{< /alert >}}

## Creating tokens

You can create a token for your user account at any time. Tokens never expire, but can be revoked. You can also give the token a descriptive label. This label will be shown in the list of tokens on your user account's security tokens page.

See [Tokens](https://cloud.layer5.io/security/tokens) in Layer5 Cloud.

## Using tokens

To use a token to authenticate to Layer5 Cloud's REST API, pass the token as a Bearer token in the Authorization header of your HTTP request:

```bash
Authorization: mdJhY2Nlc3NfdG9rgW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5CMVlteHBZem81T1dJNE1XSTBOeTA1TTJaaExUUTBNRE10T0RjMU15MHhOelU1TkRGaFptWmpOV0lpTJNKMGVYQWlPaUpLVjFRaWZRLmV5SmhkV1FpT2x0ZExDSmpiR2xsYm5SZmFXUWlPaUp0WlhOb1pYSjVMV05zYjNWa0lpd2laWGgwSWpwN2ZTd2lhV0YwSWpveE56RTROemsxTVRFMUxDSnBjM01pT2lKb2RIUndjem92TDIxbGMyaGxjbmt1YkdGNVpYSTFMbWx2TDJoNVpISmhJaXdpYW5
```

## Revoking tokens

You can revoke an access token at any time. When you revoke an access token, it is immediately invalidated and cannot be used to make requests to the API. Revoking an access token also revokes any refresh tokens associated with that access token.

See [Tokens](https://cloud.layer5.io/security/tokens) in Layer5 Cloud.
