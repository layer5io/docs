---
title: Authentication Flows
description: >
  Step-by-step walkthroughs of every sign-in, sign-up, sign-out, and account-management flow Layer5 Cloud supports.
weight: 1
categories: [Identity]
tags: [authentication, oauth, oidc, kratos, hydra, signup, login, logout, recovery, github, google]
---

This page catalogues every authentication flow Layer5 Cloud exposes to end users. Each flow is described from three perspectives: the user-visible journey, the HTTP / cookie behaviour underneath, and the entry-points and exit-points used by integrators (deep-links, redirect parameters, downstream flows).

## Common architecture

Every authentication action the browser takes is routed through Layer5 Cloud — never directly to Ory Kratos. The hop pattern is the same for every flow:

```
Browser                Cloud Server                       Kratos
   │                       │                                │
   │── GET /login ───────►│                                │
   │                       │── (no flow? no session?) ────►│
   │                       │   GET /api/auth/flow/init     │
   │                       │── CreateBrowserLoginFlow ────►│
   │                       │◄── flow + Set-Cookie ─────────│
   │◄─ 302 /login?flow=<id> + Set-Cookie (Path=/) ────────│
   │                       │                                │
   │── GET /login?flow=<id> ─►│                            │
   │◄─ React page ─────────│                                │
   │                       │                                │
   │── GET /api/auth/flow?type=login&id=<id> ─►│            │
   │                       │── GetLoginFlow ─────►│         │
   │                       │◄── flow JSON ────────│         │
   │◄─ form action="/api/auth/flow/submit?type=login&id=<id>" │
   │                       │                                │
   │── POST /api/auth/flow/submit?type=login&id=<id> ─►│   │
   │                       │── POST /self-service/login ──►│
   │                       │◄── 303 Location: <next> ──────│
   │◄─ 303 Location + Set-Cookie (Path=/) ───────────────│
```

Three properties hold for **every** flow on this page:

1. **The browser never POSTs to Kratos directly.** The form action is always `/api/auth/flow/submit?type=<flow-type>&id=<flow-id>` on the cloud server.
2. **The browser never redirects to a Kratos URL.** Every server hop ends at a cloud-server path (`/api/auth/...`).
3. **Cookies relayed from Kratos are rewritten** so they survive the proxy: the `Domain` attribute is stripped (the cookie binds host-only to the cloud server origin), and `Path` is normalised to `/` so the browser sends them on `/api/auth/flow/submit`. Other attributes — `Name`, `Value`, `MaxAge`, `Expires`, `Secure`, `HttpOnly`, `SameSite` — pass through unchanged.

These invariants are what allow Layer5 Cloud to look like a first-party application even though Kratos and Hydra are doing the heavy lifting under the hood.

### Flow types and the pages they back

The cloud server's flow proxy maps the five Kratos flow types onto the five corresponding pages on Layer5 Cloud:

| Flow type   | Kratos endpoint        | Layer5 Cloud page | Lifespan      |
|-------------|------------------------|-------------------|---------------|
| `login`        | `/self-service/login`        | `/login`          | 12 hours       |
| `registration` | `/self-service/registration` | `/registration`   | 24 hours       |
| `verification` | `/self-service/verification` | `/verification`   | 30 days        |
| `recovery`     | `/self-service/recovery`     | `/recovery`       | 30 days        |
| `settings`     | `/self-service/settings`     | `/reset`          | 24 h privileged window |

The submit-proxy (`/api/auth/flow/submit`) enforces a 1 MiB request-body cap and a 30-second timeout to Kratos. Oversize bodies return `413 Request Entity Too Large`; transport failures to Kratos return `502 Bad Gateway`.

### Cookies set during authentication

| Cookie | Set by | Scope | Lifetime | Purpose |
|---|---|---|---|---|
| `session_cookie` | Kratos (relayed) | host-only on cloud-server origin, `Path=/` | 12 h (login session) | Kratos session for the browser; gates `/account` settings access. |
| `provider_token` | Cloud server (`HandleAuthRedirect`, `HydraCallback`) | `.layer5.io` (eTLD+1) | 24 h | Hydra-issued OAuth2 access token. Read by every cloud-server API handler and forwarded to Meshery clients. |
| `provider_token` (custom-domain) | Cloud server (`HandleAuthRedirect`) | host-only on the custom domain | 24 h | Second copy of the same token, scoped to the exact custom-domain host so SameSite tightening doesn't drop it. |
| `Layer5-Current-Orgid` | Cloud server | host-only on whichever domain is being themed | session | Theming hint for the auth pages and a continuity hint across the Kratos handshake. **Not** an authorization signal. |
| `new_user` | Cloud server (`HandleRegister`) | host-only, `Path=/` | session | Marks a freshly-registered identity so the `/registered` page can show the right onboarding state. Cleared at `HandleAuthRedirect`. |
| `source_ref` / `return_to` / `meshery_ref` / `_meshery_saas_ref` | Cloud server | host-only | up to 30 minutes | Capture the URL that initiated the auth flow so the user lands back where they started after sign-in. Cleared at `HandleAuthRedirect` / `HydraCallback`. |
| `anonymousUserID` | Cloud server (during anonymous flow) | host-only | until claimed | Identifies the anonymous identity whose content will be migrated onto the new account at sign-up. |

## Flow inventory

| Flow | Trigger | Pages involved |
|------|---------|----------------|
| [Email registration](#email-registration) | `/registration` | `registration` → `registered` → `verification` |
| [Email verification](#email-verification) | Click on verification email | `verification` (`sent_email` → `passed_challenge`) |
| [Email login](#email-login) | `/login` | `login` → `dashboard` |
| [GitHub OAuth signup](#github-oauth-signup) | `/registration` → "Sign up with GitHub" | `registration` → GitHub → `registered` → `dashboard` |
| [GitHub OAuth login](#github-oauth-login) | `/login` → "Sign in with GitHub" | `login` → GitHub → `dashboard` |
| [Google OAuth signup](#google-oauth-signup) | `/registration` → "Sign up with Google" | `registration` → Google → `registered` → `dashboard` |
| [Google OAuth login](#google-oauth-login) | `/login` → "Sign in with Google" | `login` → Google → `dashboard` |
| [Password recovery](#password-recovery) | `/recovery` | `recovery` → email → `password-reset` |
| [Password reset](#password-reset) | Click on recovery email | `password-reset` → `login` |
| [Account settings (link / unlink / change password)](#account-settings-link--unlink--change-password) | `/account` from logged-in profile | `account` → `reset` |
| [Anonymous handover](#anonymous-handover) | Anonymous user signs up / logs in | `registration?anonymousUserID=<id>` |
| [Invitation acceptance](#invitation-acceptance) | Click on invitation email | `/invitations/<id>/accept` |
| [Logout](#logout) | Click "Sign out" in the user menu | `dashboard` → `login` |

---

## Email registration

The user creates a Layer5 Cloud account from scratch using an email address and a password.

**User journey**

1. Navigate to `/registration` (linked from the marketing site or from the "Sign up" toggle on `/login`).
2. Fill in first name, last name, email, and password. If reCAPTCHA is configured (controlled by the `RECAPTCHA_SITE_KEY` setting), solve the challenge — the **Sign up** button stays disabled until you do.
3. Submit. You land on `/registered` and Layer5 Cloud sends a verification email. A `new_user=true` cookie is set so the next page can show the right onboarding state.
4. Open the email, click **Verify**, and you'll be bounced through the [email-verification flow](#email-verification) into `/login`.
5. Log in with the credentials you just set. You land on `/dashboard`.

**Behaviour notes**

* The form posts to `/api/auth/flow/submit?type=registration&id=<flow-id>`.
* Validation happens client-side first: name regex (`^[\p{L}\p{M}\s]{1,50}$/u`, accepts unicode letters and marks but no digits or symbols), an RFC-leaning email regex, and a spam filter that blocks listed names and email domains.
* Password rules are enforced server-side by Kratos: minimum 8 characters, identifier-similarity check (your password may not be substantially similar to your email), and a "have I been pwned" check against the public breach corpus.
* The reCAPTCHA token, when present, is sent as a hidden input named `transient_payload` with value `{"recaptcha_token":"<token>"}`.
* The flow lasts 24 hours from creation; expired flows return a fresh one via `/api/auth/flow/init`.
* If the registration includes an `anonymousUserID` query parameter (see [Anonymous handover](#anonymous-handover)), it survives every flow init and restart so designs created before signup can be claimed afterwards.

---

## Email verification

Verifying an email address is the second half of [email registration](#email-registration), and is also retriggerable from the **Resend verification email** link on `/login`.

**User journey**

1. Open the verification email and click the link. It points at `/verification?flow=<id>` on Layer5 Cloud.
2. The page server-renders the `passed_challenge` state and immediately redirects you to `/login`.
3. Sign in normally.

**Behaviour notes**

* Verification flows are valid for 30 days but each `flow=<id>` is single-use. If the link has expired or been used, the cloud server bounces the browser through `/api/auth/flow/init` to mint a fresh flow that asks the user to re-enter their email.
* For users who registered via OAuth, email verification is implicit — the OAuth provider has already attested the address, so Kratos marks the identity as verified at registration time.
* The verification flow recipe is `code` (a one-time code embedded in the email link); there is no separate "enter the code" UI.

---

## Email login

The standard sign-in flow for users who registered with an email address and password.

**User journey**

1. Navigate to `/login`.
2. The page renders helper links — **Forgot password?**, **Resend verification email**, and a **Sign up** toggle for users who don't yet have an account.
3. Enter your email and password and submit.
4. On success, Hydra issues an OAuth2 access token. The cloud server sets the `provider_token` cookie (twice — see [Custom domains → Cookie scopes](/cloud/identity/authentication/custom-domains/#cookie-scopes)) and redirects you to your post-login destination.

**Where you land after signing in**

The post-login destination is selected in this order:

1. **`?ref=` query parameter** on the URL that started the auth flow — used by trusted upstream systems (e.g. a Meshery server) to hand off a deep-link.
2. **`meshery_ref` cookie** set by a Meshery instance acting as a Layer5 Cloud client.
3. **`return_to` / `source_ref` cookie** captured at the start of the flow from the request URL — but **only** when the original request was a real top-level browser navigation (`Sec-Fetch-Dest: document`, method `GET`, and not a static-asset path or a `/.well-known/...` probe). Background fetches (favicon requests, service-worker probes, the Chrome DevTools `/.well-known/appspecific/com.chrome.devtools.json` probe, XHR, sub-resource loads) are deliberately ignored so they don't poison the post-login destination.
4. **`/dashboard`** as the default fallback.

The capture step also explicitly skips paths that *are* the auth flow itself (`/login`, `/registration`, `/callback`, `/logout`) so the user can't end up looped back into sign-in after they finish signing in.

**Behaviour notes**

* On invalid password, Kratos returns the existing flow with an error message attached and the user re-renders the same `/login?flow=<id>` page with the message inlined next to the relevant field.
* On expired flow (HTTP `410 Gone` from Kratos), the cloud server bounces the browser back through `/api/auth/flow/init` to mint a new one — the user sees a fresh `/login` page, never an error.
* Login flows last 12 hours; this is the maximum time between landing on `/login` and submitting the form.
* The login flow's `after.password.hooks` configuration includes `require_verified_address`, so a password login submitted before email verification redirects to the verification page rather than completing.

---

## GitHub OAuth signup

Single sign-on registration via GitHub, using OAuth 2.0 / OpenID Connect.

**User journey**

1. Navigate to `/registration`.
2. Click **Sign up with GitHub**. The button is rendered with `formNoValidate` so HTML5 client-side validation does not block the OAuth submit.
3. The browser is redirected to GitHub's consent screen. Kratos requests scopes `read:user` and `user:email`, plus the OIDC claims `name`, `profile`, `picture`, `email`, and `email_verified`.
4. After consent, GitHub redirects back to Layer5 Cloud's OIDC callback (reverse-proxied through the cloud server's `/.ory/...` path). Kratos consumes the callback and creates the identity.
5. A registration webhook fires server-side, creating the corresponding row in the `users` table and provisioning the user's default workspace.
6. Hydra issues the access token, the cloud server sets the `provider_token` cookie, and you land on `/registered` (and then `/dashboard`).

**Behaviour notes**

* The button label `Sign up with GitHub` comes directly from Kratos's flow JSON (`flow.ui.nodes[].meta.label.text`). Login flows return "Sign in with GitHub"; registration flows return "Sign up with GitHub".
* OIDC submits skip the registration page's name/email/spam-filter validation entirely — GitHub supplies those fields, and they're populated server-side after the callback.
* The user's `provider` field is set to `github` (derived from the OIDC issuer) and their `userId` to the GitHub username.

---

## GitHub OAuth login

Subsequent sign-ins for an account that was either originally registered via GitHub or has had GitHub [linked](#account-settings-link--unlink--change-password) afterwards.

**User journey**

1. Navigate to `/login`.
2. Click **Sign in with GitHub**.
3. GitHub consent (skipped if you have an active GitHub session and previously authorized Layer5 Cloud).
4. Land on `/dashboard` with a valid access token.

**Critical assertion**: after the OIDC round-trip the browser must not see a `401`. If it does, the most likely cause is the cookie `Path` attribute — the cloud server's cookie-relay normalises Kratos's native `Path=/.ory/kratos/public/` to `Path=/`; if that has been bypassed, the next form post will fail CSRF.

---

## Google OAuth signup

Single sign-on registration via Google, using OAuth 2.0 / OpenID Connect.

**User journey**

1. Navigate to `/registration`.
2. Click **Sign up with Google**.
3. Google consent. Kratos requests scopes `email` and `profile`, plus the OIDC claims `email`, `email_verified`, and `given_name`.
4. After consent, Google redirects back through Kratos's OIDC callback.
5. The same registration webhook as the GitHub flow fires, creating the user record and the default workspace.
6. Hydra issues the access token, the cloud server sets the `provider_token` cookie, and you land on `/registered` (and then `/dashboard`).

**Behaviour notes**

* The button label `Sign up with Google` is supplied by Kratos's flow JSON.
* The user's `provider` field is set to `google`; their `userId` is set to the Google account's stable identifier.
* The `family_name` claim is requested but optional — accounts with no family name will still complete signup.

---

## Google OAuth login

Subsequent sign-ins for an account that was either originally registered via Google or has had Google [linked](#account-settings-link--unlink--change-password) afterwards.

**User journey**

1. Navigate to `/login`.
2. Click **Sign in with Google**.
3. Google consent (skipped if you have an active Google session and previously authorized Layer5 Cloud).
4. Land on `/dashboard` with a valid access token.

---

## Password recovery

Self-service flow for users who have forgotten their password.

**User journey**

1. Click **Forgot password?** on `/login`. You land on `/recovery`.
2. Enter the email address associated with your account and submit. You see a confirmation screen ("We've sent you a recovery email if an account exists with that address.")
3. Open the recovery email and click the link. It points to `/password-reset?flow=<id>` (a `code` recipe — the URL contains a one-time code).
4. Enter and confirm a new password, then submit.
5. You're redirected to `/login`. Sign in with the new password.

**Behaviour notes**

* The wording at step 2 is intentionally non-committal — the response does not disclose whether the email is registered, to prevent enumeration.
* Recovery flows are valid for 30 days, but the one-time code in the email link is single-use.
* A single email may receive multiple recovery requests; only the most recent code remains valid.

---

## Password reset

The second half of [password recovery](#password-recovery), reachable directly via the recovery-email link.

If the link is expired or already-used, the `/password-reset` page detects the `410 Gone` from Kratos and bounces back through `/api/auth/flow/init` to start a fresh recovery flow — the user is asked to re-enter their email address and a new email is sent.

---

## Account settings (link / unlink / change password)

Lets a signed-in user change their password, attach an additional credential method (e.g. add Google to a password-only account), or remove an existing one.

**User journey**

1. Sign in to your account.
2. Navigate to `/account`. The page surfaces three operations: **change password**, **link provider**, **unlink provider**. The list of currently linked providers is rendered from your Kratos identity.
3. Pick an operation. Layer5 Cloud calls `/api/auth/flow/init?type=settings`, which returns a settings flow ID that the page submits via `/api/auth/flow/submit?type=settings&id=<flow-id>`.
4. **Linking a new provider** — provider consent fires (GitHub or Google), and on completion your Kratos identity now carries both credential methods.
5. **Unlinking a provider** — Kratos validates that you still have at least one usable credential method left. You can never remove the only credential method on the account.
6. **Changing a password** — Kratos enforces the same minimum-length / leaked-credential rules as the registration flow.

**Behaviour notes**

* The settings flow has a 24-hour `privileged_session_max_age`. If you signed in more than 24 hours ago, Kratos will require a fresh sign-in before allowing destructive changes (set/change password, unlink, etc.).
* Linking is keyed on the email address Kratos receives from the provider — so if you sign up with `alice@example.com` via password and later try to **sign in** (not link) with a GitHub account whose primary email is `alice@example.com`, you'll be prompted for the existing password and the linking happens automatically. See [User Accounts → Account Linking](/cloud/identity/users/#account-linking) for the full rules.
* When you delete your Layer5 Cloud account entirely, all linked OAuth providers are automatically unlinked. Re-registering with the same email does **not** automatically re-link previously linked providers; you must re-do the linking flow.

---

## Anonymous handover

Layer5 Cloud lets a visitor create a design, fork a published catalog item, or start a Kanvas snapshot **before** signing up. Behind the scenes the platform mints an anonymous user (an unbound identity) and threads an `anonymousUserID` query parameter through every subsequent navigation. When the visitor decides to sign up, the anonymous content is migrated onto the new account.

**User journey**

1. As an anonymous visitor, create a design. Layer5 Cloud calls `POST /api/identity/users/anonymous` and returns a UUID it stores in a cookie.
2. The visitor clicks **Sign up**. The link is constructed as `/registration?anonymousUserID=<uuid>`.
3. Complete [email registration](#email-registration) or [GitHub](#github-oauth-signup) / [Google](#google-oauth-signup) OAuth signup as normal. The `anonymousUserID` parameter survives every redirect — the flow-init proxy explicitly preserves it through Kratos's flow handoff and through the post-auth bounce.
4. After Hydra issues the access token, `HydraCallback` invokes `MigrateUserResourceToCurrentUser` to reattach the anonymous identity's content (designs, snapshots) to the new account, then deletes the anonymous identity.

**Other parameters that survive flow restarts**

The same allowlist that preserves `anonymousUserID` also carries:

* `login_challenge` — Hydra OAuth2 continuation token. Dropping it would force a fresh OAuth flow and the user would land on `/login` instead of completing the in-progress flow.
* `refresh=true` — instructs Kratos to enforce re-authentication regardless of the existing session.
* `return_to` — explicit deep-link to land on after authentication.
* `program` — used by enrolment flows tied to specific learning programmes.
* `orgId` — pre-selects an organization context for the auth pages (see [Custom domains](/cloud/identity/authentication/custom-domains)).

---

## Invitation acceptance

Org admins can invite a user to an organization by email, optionally pre-assigning a role and a team. The invitation email points at a URL on the **default domain** (`cloud.layer5.io`) even when the inviting organization has a custom domain — the recipient is not yet a member and therefore cannot be served from the custom domain.

**User journey**

1. The invitee receives an email with an **Accept invitation** link, which points at `/invitations/<inviteId>/accept`.
2. If the invitee is not signed in, the page first runs the standard [email login](#email-login) (or signs them up via [email registration](#email-registration), [GitHub](#github-oauth-signup), or [Google](#google-oauth-signup) if they don't yet have an account). The flow sets a `Layer5-Current-Orgid` cookie carrying the inviting org's UUID so the auth pages can be themed for that org.
3. Once signed in, the page calls `POST /api/identity/invitations/<id>/accept`. Layer5 Cloud:
   * Adds the user to the inviting organization (writes a row to `users_organizations_mappings`).
   * Assigns the role specified in the invitation, if any.
   * Adds the user to the team specified in the invitation, if any.
4. The page sets `selectedOrganizationId = <inviting-org-id>` in the user's preferences.
5. If the inviting organization has a custom domain, the page redirects the browser to that domain's `/dashboard`. If not, it stays on the default domain. See [Custom domains → Invitation acceptance via email link](/cloud/identity/authentication/custom-domains/#invitation-acceptance-via-email-link) for the full sequence.

---

## Logout

Logout terminates the user's session on Layer5 Cloud and revokes the OAuth2 access token at Hydra so it can't be used to call the API afterwards.

**User journey**

1. Click your avatar in the header and choose **Sign out**.
2. The browser hits Layer5 Cloud's logout handler. Three things happen in order:
   * The cloud server calls Hydra's `RevokeToken` endpoint with the current `provider_token`. Hydra invalidates the token; subsequent calls with that token return `401 Unauthorized` even before the cookie expires.
   * The Kratos session cookie is cleared by sending a `Set-Cookie: <name>=; Max-Age=-1; Path=/`. This terminates the Kratos session that backs the `/account` settings flow.
   * The `provider_token` cookie is cleared on every domain it was set on (the eTLD+1-scoped copy and the host-scoped copy).
3. Kratos's `flows.logout.after.default_browser_return_url` is configured to `/login`, so the browser lands on the login page.

**Behaviour notes**

* Logout is a single-page event — the user's browser is the only client invalidated. If you are signed in on a different device, that session is unaffected; revoke it from [Sessions](https://cloud.layer5.io/security/sessions) instead.
* API tokens (Personal Access Tokens) are not affected by the browser logout. To revoke an API token, see [Tokens](/cloud/security/tokens).
* If a Meshery instance is using your Layer5 Cloud session, that Meshery instance will receive `401` responses for its next API call and prompt the user to re-authenticate.

---

## Failure modes and diagnostics

| Symptom | First thing to check |
|---|---|
| `401 Unauthorized` immediately after an OIDC round-trip | The session cookie set by Kratos must have `Path=/` (so the browser sends it on `/api/auth/flow/submit`). The cloud server's cookie-relay normalises this; if it has been bypassed, you'll see the cookie restricted to `/.ory/...` and the next form post will fail CSRF. |
| OAuth button does nothing on the registration page | HTML5 form validation is blocking. The OIDC submit button must carry `formNoValidate`. |
| Form submit fails CSRF on the very first attempt | The `/api/auth/flow/init` response must include the CSRF cookie — check `Set-Cookie` is present and `Path=/`. |
| `/registration?flow=<id>` redirects to a 404 page | `KRATOS_BROWSER_URL` has been re-exposed to the JavaScript bundle by mistake. The public UI must treat Kratos as if it doesn't exist. |
| Anonymous designs disappear after signup | Trace `anonymousUserID` through every redirect. It must appear in `/api/auth/flow/init`, in the post-init bounce-back, and in the `source_ref` cookie that the post-auth handler reads to trigger `MigrateUserResourceToCurrentUser`. |
| `413 Request Entity Too Large` on form submit | Body exceeded the 1 MiB cap on the submit proxy. Legitimate flows do not approach this; investigate what is being submitted. |
| Form submit hangs | The cloud server enforces a 30-second timeout to Kratos. A hang past this point indicates Kratos itself is slow or unreachable. |
| Logout button "did nothing" — user is still signed in | Check both `provider_token` cookies (eTLD+1-scoped and host-scoped, on custom domains). Both must be cleared. |
| User lands on a junk page after sign-in (e.g. `/.well-known/appspecific/com.chrome.devtools.json`) | Background-fetch URL was captured as `refURL`. The `isNavigationRequest` filter in `GetRefURL` should drop this. |

{{< alert type="info" >}}
For background on how the access tokens issued at the end of these flows are used, see [Tokens](/cloud/security/tokens) and [Sessions](/cloud/security/sessions). For how the same flows behave when a user belongs to an organization with a custom domain, see [Custom domains](/cloud/identity/authentication/custom-domains).
{{< /alert >}}
