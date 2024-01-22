---
title: Sessions
description: >
  User sessions are created each time a user successfully authenticates.
date: 2024-01-24
weight: 3
---

## What sessions are

A session is a period of time in which a user is authenticated to Layer5 Cloud. Sessions are created each time a user successfully authenticates. Sessions expire after a period of inactivity, which defaults to 72 hours but can be configured to any value between 15 minutes and 72 hours.

Layer5 Cloud sessions use [OAuth 2.0](https://oauth.net/2/) for authentication. OAuth 2.0 is a standard protocol for authorization and focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and so on.

Session OAuth tokens are stored in your user-agent (web browser) in a cookie. The cookie is named `meshery_session` and is a [signed cookie](https://expressjs.com/en/advanced/best-practice-security.html#use-signed-cookies). The cookie is only sent over HTTPS and is not accessible to JavaScript running in the browser.

## Creating and using sessions

A session is created each time a user successfully authenticates. See all active sessions on your [user account's security sessions page](https://meshery.layer5.io/security/sessions).

To use a session, sign into your Layer5 Cloud user account, thereby creating a new session. Your session's token will automatically be stored in your web browser using a cookie. To use that same session, simply use the same browser until the session expires. You can have multiple sessions active concurrently, whether on the same device or different device. Each session recevies it's own authentication token and expiry time.

 In this way, it is possible to use your same account to collaborate between different sessions that you have established. For example, you may use those two different sessions to open up the same MeshMap design and you will find that your avatar shows up twice in the design (along with your mouse cursor). You can use this to collaborate with yourself or with others. We recommend collaborating with others, though.

## Revoking sessions

You can revoke your sessions at any time. When you revoke a session, it is immediately invalidated and cannot be used to make requests to the API. Revoking a session also revokes any refresh tokens associated with that session.

See [Sessions](https://meshery.layer5.io/security/sessions) in Layer5 Cloud.
