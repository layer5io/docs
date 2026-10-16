# Review and Sign Out Sessions


> See every active sign-in on your account and end the ones you do not recognize or no longer use.



Every sign-in to Layer5 Cloud creates a session, on every browser, device, and Meshery Server you use. This guide reviews your sessions and ends the ones you do not want. For how long sessions last and what a session can reach, read the [Sessions concept](/pr-preview/pr-1281/cloud/concepts/identity-and-security/sessions/).

## Before you start

- You need the **View Sessions** permission to open the Sessions tab. Every default user role holds it.
- Ending another session from the tab requires the **Delete Token** permission, which Organization Admin and Provider Admin hold by default. Other roles see the Logout control disabled. This is how the interface works today.
- You can end only your own sessions.

## Review your sessions

Open the Sessions tab under Security. Each row is one sign-in and shows its ID, name, purpose, and creation date. Search filters by name or purpose, and the newest sessions appear first.

The list shows no device or location. Use the creation date to judge which sessions you started and which you did not. A creation date you cannot account for means someone else signed in with your credentials.

## End a session

Choose Logout on the row and confirm. The session ends at once: the next request that carries its credentials fails. A confirmation reads `Token "<name>" deleted`, because a session is stored as a token.

The deleted session cannot be restored. Whoever used it must sign in again.

## If you suspect your account is compromised

1. End every session you do not recognize.
2. Change your password. Changing the password does not end other sessions, so complete step 1 first and check the list again afterward.
3. Review your [API tokens](/pr-preview/pr-1281/cloud/guides/security/api-tokens/) and revoke any you did not create. Tokens never expire and are not sessions, so signing out does not revoke them.
4. If you cannot sign in, ask an Organization Admin or Provider Admin to help recover the account.

Layer5 Cloud has no "sign out everywhere" action. End each session from the list.

## What ends a session without your action

A session also ends when its access token expires, 24 hours after sign-in by default. See the [Security Reference](/pr-preview/pr-1281/cloud/reference/security/#session-and-token-lifetimes) for the lifetimes.

