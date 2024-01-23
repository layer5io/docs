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

## Creating tokens

You can create a token for your user account at any time. Tokens never expire, but can be revoked. You can also give the token a descriptive label. This label will be shown in the list of tokens on your user account's security tokens page.

See [Tokens](https://meshery.layer5.io/security/tokens) in Layer5 Cloud.

## Using tokens

To use a token to authenticate to Layer5 Cloud's REST API, pass the token as a Bearer token in the Authorization header of your HTTP request:

```bash

```

## Revoking tokens

You can revoke an access token at any time. When you revoke an access token, it is immediately invalidated and cannot be used to make requests to the API. Revoking an access token also revokes any refresh tokens associated with that access token.

See [Tokens](https://meshery.layer5.io/security/tokens) in Layer5 Cloud.
