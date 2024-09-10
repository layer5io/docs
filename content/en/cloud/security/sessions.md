---
title: Sessions
description: >
  User sessions are created each time a user successfully authenticates.
weight: 3
categories: [Security]
tags: [sessions, permissions]
---

## What sessions are

A session represents a user authenticated connection to Layer5 Cloud. Sessions are created each time a user successfully authenticates. Sessions expire after a period of 24 hours. Before reaching their expiration time, sessions can be refreshed by an associated refresh token, which is also automatically generated at the time a user authenticates (at the same time that the adjoining session token is generated). Refresh token have an expiration period of 36 hours. Active sessions are automatically refreshed (kept alive) by the refresh token until such time as the refresh token expires, and subsequently, the session token expires thereafter.

Layer5 Cloud sessions use [OAuth 2.0](https://oauth.net/2/) for authentication. OAuth 2.0 is a standard protocol for authorization and focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and so on.

Session OAuth tokens are stored in your user-agent (web browser) in a cookie. The cookie is named `meshery_session` and is a [signed cookie](https://expressjs.com/en/advanced/best-practice-security.html#use-signed-cookies). The cookie is only sent over HTTPS and is not accessible to JavaScript running in the browser.

## Creating and using sessions

A session is created each time a user successfully authenticates. See all active sessions on your [user account's security sessions page](https://meshery.layer5.io/security/sessions).

To use a session, sign into your Layer5 Cloud user account, thereby creating a new session. Your session's token will automatically be stored in your web browser using a cookie. To use that same session, simply use the same browser until the session expires. You can have multiple sessions active concurrently, whether on the same device or different device. Each session receives it's own authentication token and expiry time.

 In this way, it is possible to use your same account to collaborate between different sessions that you have established. For example, you may use those two different sessions to open up the same Kanvas design and you will find that your avatar shows up twice in the design (along with your mouse cursor). You can use this to collaborate with yourself or with others. We recommend collaborating with others, though.

## Revoking sessions

You can revoke your sessions at any time. When you revoke a session, it is immediately invalidated and cannot be used to make requests to the API. Revoking a session also revokes any refresh tokens associated with that session.

See [Sessions](https://meshery.layer5.io/security/sessions) in Layer5 Cloud.
