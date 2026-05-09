---
title: Custom Domains
description: >
  How Layer5 Cloud authenticates and routes traffic when a tenant organization is mapped to its own hostname.
weight: 2
categories: [Identity]
tags: [authentication, custom-domains, multi-tenancy, organizations]
---

Layer5 Cloud lets a tenant organization map its own hostname (e.g. `academy.layer5.io`, `exoscale.layer5.io`, or even a non-Layer5-eTLD like `cloud.meshery.io`) so that members of that organization can sign in and work entirely on a domain that is branded for them. This page documents how authentication and request routing behave once a custom domain is in play, and the full set of scenarios that arise when a user's preferred organization differs from the domain they're currently on.

If you haven't already, read [Authentication Flows](/cloud/identity/authentication/authentication-flows) first. This page builds on those flows.

## The contract in one paragraph

> The custom-domain hostname is the strongest **scope** signal — it pins every request to a specific tenant for read/write authorization. The user's preference is the strongest **intent** signal — it answers "what organization does the user want to be looking at right now". When intent and scope conflict, the system **changes the scope** (redirects the URL/domain), not the intent (the preference). Switching the preference to match a wrong scope is always a bug.

## Two related but distinct concepts

| Concept | Meaning | Source of truth |
|---|---|---|
| **Acting org** (scope) | The organization context for the current request — what the server reads from and writes to. | The hostname (custom domain), or the `Layer5-Current-Orgid` header / cookie / preference fallback. |
| **Selected org** (intent) | The organization the user *wants* to be looking at. | `users.preferences.selectedOrganizationId` in the user's profile. |

The custom-domain feature is the place where these two concepts pull hardest in different directions, because the URL the user is on and the preference the user has set can disagree. Everything else on this page is a consequence of how the platform reconciles the two.

---

## What counts as a custom domain

A hostname is a custom domain if **all** of the following hold:

1. It is not the configured default `SERVER_BASE_URL` (e.g. `cloud.layer5.io`).
2. It is not in the `ReservedDomains` list. The reserved set covers Layer5's own infrastructure hostnames so an attacker can't register them as a tenant. The current reserved domains are:

   ```
   cloud.layer5.io           cloud-ws.layer5.io        cloud-staging.layer5.io
   cloud-dev.layer5.io       test.layer5.io            meshery.layer5.io
   meshery-staging.layer5.io dev.layer5.io             staging.layer5.io
   layer5.io                 docs.layer5.io
   ```

3. It is not a raw IP address (those resolve to health-check probes, not tenants).
4. It resolves to a row in the `organizations` table whose `domain` column matches.

Custom-domain registration is performed by Provider Admins via the org-management UI; the `IsCustomDomain` server-side check is what gates every middleware on this page.

---

## The six sources of organization context

A request can carry organization context from any of six places. Each has a different lifetime and a different trust level. The server normalises them into a single `CurrentOrgID` value on the request context; the UI runs a parallel resolution.

| # | Source | Wire shape | Lifetime | Set by | Trust |
|---|--------|------------|----------|--------|-------|
| 1 | URL **path** param `/api/identity/orgs/:orgId/...` | path segment | per-request | route definition | server enforces — must match user-membership |
| 2 | URL **query** param `?orgId=...` (read) or `?currentOrgId=...` (UI nav) | query string | per-request | client | server enforces |
| 3 | `Layer5-Current-Orgid` request **header** | HTTP header | per-request | client | server treats as *suggested* — falls back if invalid |
| 4 | `Layer5-Current-Orgid` **cookie** | Set-Cookie, no Domain → host-only | session-ish | server during Kratos flow / invitation accept | server *suggested*; cookie is dropped on cross-domain redirect |
| 5 | **Custom-domain hostname** (`req.Host`) | the request URL itself | the user's whole session on that domain | DNS + ingress + DB `organizations.domain` | **strongest scope signal** — server pins context unconditionally |
| 6 | `users.preferences.selectedOrganizationId` (DB) | JSONB column on `users` | persistent until user changes it | UI mutation `PUT /api/identity/users/preferences` | trusted intent signal |

### Server-side precedence

Implemented in `server/handlers/middlewares_authz_scope.go`:

```text
CustomDomainOrgResolverMiddleware       (source 5)
        ↓ if no custom-domain match
OrganizationResolverMiddleware
   ├─ already-set short-circuit         (source 5 wins)
   ├─ Layer5-Current-Orgid cookie       (source 4)
   ├─ Layer5-Current-Orgid header       (source 3)
   ├─ user.preferences                  (source 6)
   └─ "all" only if provider admin
```

Path/query params (sources 1 and 2) are handled by *route-specific* middlewares that override `OrgID` for the targeted route. They don't influence `CurrentOrgID`; they coexist.

### Client-side precedence

Implemented in `OrganizationSessionProvider`:

```text
?currentOrgId=… in URL                   (source 2)
        ↓
visiting a custom domain                 (source 5)
        ↓
user.preferences.selectedOrganizationId  (source 6)
        ↓
fallback: first active org
```

Note the *asymmetry*: the server's strongest signal (custom domain) is matched on the client by a URL-driven branch — but only because the page is loaded on that hostname. Server and client must agree on what counts as a "custom domain", which is why both consult the same `IsCustomDomain` check.

---

## Special identifier values

The codebase passes around what looks like a UUID, but four out of those five values are actually *sentinels*:

| Value | Meaning | Where it appears |
|---|---|---|
| A real UUID | A specific organization | DB `organizations.id`, `users.preferences.selectedOrganizationId`, route params, cookie |
| `"all"` | "All organizations" view, only valid for **provider admins** | UI Redux/preference, server query string |
| `"11111111-1111-1111-1111-111111111111"` | Provider organization sentinel — alias for "all" | Server context; UI organization utility |
| `""` (empty string) | "Unknown / not set yet" — the resolver should fall through to fallbacks, not error | Cookie present-but-empty, prefs key cleared by canonicalising migration |
| `nil` / undefined | Same as `""`. Code paths must handle both | DB `organizations.domain`, JSON optionals |

The Provider Org UUID and the string `"all"` are **interchangeable on the wire**. The server normalises one to the other on persistence, and the UI normalises the other direction on read. Empty string is never a valid org id; always treat it as "unknown" and fall through.

---

## Cookie scopes

When a user authenticates on Layer5 Cloud, two `provider_token` cookies are set on every successful sign-in:

```go
// First — parent-scoped on eTLD+1
http.SetCookie(res, &http.Cookie{
    Name:   "provider_token",
    Domain: ".layer5.io",                 // AccessTokenCookieDomain()
    Path:   "/",
    Value:  token,
})
// Second — host-scoped on the actual request host
http.SetCookie(res, &http.Cookie{
    Name:   "provider_token",
    Domain: "exoscale.layer5.io",         // AccessTokenCookieForCustomDomain(req)
    Path:   "/",
    Value:  token,                        // (same value)
})
```

The first is **parent-scoped**: a `Domain` of `.layer5.io` means the cookie is sent on *every* `*.layer5.io` request, which is what makes a `cloud.layer5.io` → `exoscale.layer5.io` redirect carry the user's session. The second is **host-scoped**: when the auth completes on the custom domain itself, an extra cookie scoped to that exact host is set so future SameSite tightening doesn't drop it.

### Implications

* **Custom domains that are subdomains of `*.layer5.io`** receive both cookies via `window.location.href` redirects; no special handshake is needed.
* **Custom domains on a different eTLD** (e.g. `cloud.meshery.io`) cannot receive the parent-scoped cookie because eTLD+1 doesn't match. The platform supports them via the **token-handoff redirect** described below.
* The parent-scoped cookie means *any* `*.layer5.io` site that is also on this Hydra/Kratos session can read it. That's intentional (e.g. kanvas.new flows), but worth knowing.

### The token-handoff redirect (cross-eTLD bridge)

For cross-eTLD domains, Layer5 Cloud uses `RedirectWithTokenToCustomOrgdomain` to bridge the cookie:

1. After Hydra completes login on `cloud.layer5.io`, `issueSessionForOtherDomains` builds a redirect URL that bounces through the destination domain so it can set its own cookie. The originating host is threaded through the OAuth2 `state` payload as `origin_host`.
2. The destination calls back to `/auth/redirect/accept` on the original domain with the token. The handler reads the `origin_host` query parameter, validates the value against the `custom_domains` registry (open-redirect guard), then forwards through `RedirectWithTokenToCustomOrgdomain` if the host belongs to a registered tenant.
3. `HandleAuthRedirect` is the symmetric endpoint — it accepts a `?token=` query, sets the cookie on both `.layer5.io` and the current host, and finally redirects to either the original referrer or the org's custom domain. Pre-`origin_host` invocations fall back to the legacy `Layer5-Current-Orgid` cookie path.

This handshake is **not** used for in-session navigation between same-eTLD subdomains. The plain `window.location.href = ...` pattern works there precisely because the parent-scoped cookie carries the session.

---

## End-to-end scenarios

The eight scenarios below cover every combination of "where is the user" and "what is the user's preference". The first column tells you what to expect; the second is the contract; the third is what happens under the hood.

### Scenario 1 — Default domain, default-domain org

> User logs in on `cloud.layer5.io`. Their preferred org has no custom domain.

```
Browser → /login on cloud.layer5.io
   Kratos flow → Hydra issues token
   Server sets provider_token cookie on .layer5.io
   Server → 302 to /dashboard (preserves ref)
   Browser → GET /dashboard on cloud.layer5.io
     _app.js mounts OrganizationSessionProvider
     Queries: getUser, getOrgs
     useGetSelectedOrganization → selectedOrganization = user's default org (no custom domain)
     Effect:
       P1 (?currentOrgId): no   → skip
       P2 (custom domain): no   → skip
       P3 (selected has domain): no → skip
       Steady state.
```

This is the simplest case. There's no scope/intent conflict to reconcile.

### Scenario 2 — Default domain, custom-domain org

> User logs in on `cloud.layer5.io`. Their preferred org is `Orbital Labs`, which is mapped to `exoscale.layer5.io`.

The user authenticates as in Scenario 1, but on the post-auth dashboard render the client detects that `selectedOrganization.domain = exoscale.layer5.io` and the current hostname is `cloud.layer5.io`. The contract says: **change scope to match intent**.

```
Browser → /dashboard on cloud.layer5.io   (post-login)
   useGetSelectedOrganization → selectedOrganization = academy_org (with domain)
   Effect P3: selectedOrganization.domain non-empty
              → SyncBrowserUrlWithOrgDomain(selectedOrganization)
              → window.location.href = "https://exoscale.layer5.io/dashboard"

Browser → /dashboard on exoscale.layer5.io
   New page load. CustomDomainOrgResolverMiddleware sets CurrentOrgID = academy_org.id
   useGetSelectedOrganization → selectedOrganization = academy_org
   Effect P2: hostname matches academy_org.domain, IDs match → steady state.
```

The `provider_token` parent-scoped cookie carries the session across the redirect. The user is signed in by the time the dashboard loads on the custom domain.

### Scenario 3 — Custom domain, member of that org

> User signs in on `exoscale.layer5.io` and is a member of the `Orbital Labs` org that owns it.

```
Browser → /login on exoscale.layer5.io
   Server: CustomDomainOrgResolverMiddleware → CurrentOrgID = academy_org.id
           (auth pages are themed with academy branding via buildOrgAuthData)
   Kratos flow → Hydra issues token
   Server sets provider_token cookie on .layer5.io AND on exoscale.layer5.io
   Browser → /dashboard on exoscale.layer5.io
   Effect P2: hostname matches selected, IDs match → steady state.
```

This is the steady-state custom-domain experience — the user logs in directly on the tenant hostname and never sees the default domain.

### Scenario 4 — Custom domain, **not** a member

> Visitor lands on `exoscale.layer5.io` but is not a member of `Orbital Labs`.

The contract is: **surface the authorization error**, do not silently redirect. The custom-domain resolver still pins `CurrentOrgID = academy_org.id`, but the per-handler authorization check (every DAO call carries a `userID` and filters by `users_organizations_mappings`) rejects the request. The UI shows a real "you don't have access to this organization" page rather than bouncing the user back to the default domain.

This is intentional: a silent bounce would mask a misconfiguration (e.g. an invitation link that was accepted under the wrong account, or a stale custom-domain registration).

### Scenario 5 — Switching org via the header switcher

> Authenticated user picks a different org from the header dropdown.

```
User picks "Academy Org" from header switcher
   onClick → useUpdateSelectedOrganization.handleUpdate(academyOrgId)
       1. invalidate organizations cache and refetch
       2. validate academyOrgId is in the refetched list
          (refuses to switch to an org the user isn't a member of)
       3. PUT /api/identity/users/preferences  (selectedOrganizationId = academyOrgId)
          Server: UpdateUserPreference → "Saved user … preferences"
       4. SyncBrowserUrlWithOrgDomain(academy_org)
          → window.location.href = "https://exoscale.layer5.io/<current-path>"
   exoscale.layer5.io page load → P2 steady state (same as Scenario 3 tail).
```

The persistence (PUT preferences) happens **before** the redirect, so by the time the new domain loads, the DB row already matches what the user picked. If the new org has no custom domain, step 4 redirects to the default domain instead.

### Scenario 6 — Academy enrolment with a custom domain

> User is on `cloud.layer5.io/academy/<academyOrgId>/learning-path/<slug>`, **not yet a member** of `academyOrgId`. They click **Enroll Now**.

```
Click "Enroll Now"
  → registerToContent({ contentId, … })
        Server: POST /api/academy/register
          orgId = <user's currently-selected org>   (the *acting* org, not the academy org)
          create academy_registration row
          if curricula.InviteId != nil:
              InvitationService.AcceptInvitation(user, curricula.InviteId)
                AddUserToOrganization(user.ID, academy_org.ID)   ← user becomes member
                AssignRoleToUserInOrg(...)
                AddUserToTeam(...)
          return 200 OK
  → updateSelectedOrg(curricula.org_id)         ← academy_org.ID
        PUT /api/identity/users/preferences
        SyncBrowserUrlWithOrgDomain(academy_org)
  → window.location.href = "https://exoscale.layer5.io/academy/<academyOrgId>/learning-path/<slug>"

exoscale.layer5.io page load:
  CustomDomainOrgResolverMiddleware → CurrentOrgID = academy_org.ID
  Queries:
     getUser → preferences.selectedOrganizationId = academy_org.ID  ✓
     getOrgs → must include academy_org (membership was just written)
  useGetSelectedOrganization → selectedOrganization = academy_org
  P2: hostname matches → steady state.
```

The membership write **must** complete before the redirect; otherwise the post-redirect page-load on the custom domain sees `getOrgs` returning a list that doesn't include the academy org and the user lands in the unauth state covered by Scenario 4.

### Scenario 7 — Invitation acceptance via email link

> User clicks an **Accept invitation** link from an email. The inviting org (`Orbital Labs`) has a custom domain (`exoscale.layer5.io`), but the email link points at `cloud.layer5.io`.

The email link is on the default domain because the invitee is **not yet a member** and therefore can't be served from the custom domain.

```
Email link → /invitations/<inviteId>/accept on cloud.layer5.io
  /accept page:
     useAcceptInvitationMutation()  → POST /api/identity/invitations/<id>/accept
        Server: write users_organizations_mappings row
                assign role / team if specified
                set Layer5-Current-Orgid cookie = inviteOrg.id
                                         (host-only on cloud.layer5.io,
                                          carries org context through Kratos handshake
                                          if user needs to authenticate first)
     await updateSelectedOrg(acceptedInvite.orgId)
                                       PUT preferences
     SyncBrowserUrlWithOrgDomain(inviteOrg)
                                       → exoscale.layer5.io/dashboard
  exoscale.layer5.io: P2 steady state.
```

If the invitee was not signed in when they clicked the link, the auth chain runs first ([email login](/cloud/identity/authentication/authentication-flows/#email-login), or one of the OAuth flows). The `Layer5-Current-Orgid` cookie set during the invitation-accept request is what themes the auth pages with the inviting org's branding.

### Scenario 8 — Cross-eTLD custom domain (e.g. `cloud.meshery.io`)

> Tenant org has a custom domain on a different eTLD than the platform — e.g. `cloud.meshery.io` rather than `*.layer5.io`. The parent-scoped cookie can't follow.

This is the case the **token-handoff redirect** exists for. The user authenticates on `cloud.layer5.io` (or the cross-eTLD host directly); the cloud server threads the originating host through the OAuth2 `state` as `origin_host`, and `HandleAuthRedirect` validates that host against the `custom_domains` registry before issuing `RedirectWithTokenToCustomOrgdomain`. The destination calls back to `/auth/redirect/accept` with the token; the handler sets the `provider_token` cookie host-only on the cross-eTLD host, then redirects to the original referrer or the dashboard.

A misconfigured `origin_host` (e.g. a host not in the registry) causes the bridge to be skipped and the legacy `Layer5-Current-Orgid` cookie path to take over. A warning is logged so the misconfiguration surfaces in operations.

---

## Sequence diagrams

### Steady-state read on a custom domain

```
Browser              Ingress               Cloud server                  DB
   │                    │                       │                         │
   │  GET /api/orgs     │  Host: exoscale...    │                         │
   │ ───────────────►   │ ────────────────────► │                         │
   │                    │                       │ CustomDomainOrgResolver │
   │                    │                       │ → GetOrganizationByDomain
   │                    │                       │ ──────────────────────► │
   │                    │                       │ ctx.CurrentOrgID = academy_org_id
   │                    │                       │                         │
   │                    │                       │ OrganizationResolver: short-circuit
   │                    │                       │                         │
   │                    │                       │ Handler: GetOrganizations(userID)
   │                    │                       │ ──────────────────────► │
   │ ◄───────────────── │ ◄──────────────────── │ 200 OK                  │
```

### Org switch with a domain hop

```
Browser            cloud.layer5.io            exoscale.layer5.io
   │                    │                          │
   │ click switcher     │                          │
   │                    │                          │
   │ PUT /preferences ─►│                          │
   │ ◄────── 201 ────── │                          │
   │                    │                          │
   │ getOrgs (refetch) ►│                          │
   │ ◄──── 200 ──────── │                          │
   │                    │                          │
   │ window.location.href = exoscale.layer5.io/...
   │ ─────────────────────────────────────────────►│
   │                                               │
   │                        page load              │
   │                        getUser, getOrgs ─────►│
   │                        ◄────────────────── 200│
   │                        P2 steady state        │
```

### Cross-eTLD token handoff

```
Browser              cloud.layer5.io              cloud.meshery.io
   │                      │                            │
   │ OIDC complete on cloud.layer5.io                  │
   │ ◄──────────────────── │ provider_token cookie set │
   │                       │ on .layer5.io             │
   │                       │                           │
   │ HydraCallback decodes state.origin_host = cloud.meshery.io
   │ issueSessionForOtherDomains → 302 to /auth/redirect/accept
   │ ◄──────────────────── │                           │
   │                       │                           │
   │ /auth/redirect/accept on cloud.layer5.io          │
   │ validates origin_host against custom_domains      │
   │ RedirectWithTokenToCustomOrgdomain → 303          │
   │ ──────────────────────────────────────────────────►
   │                                                   │
   │           cloud.meshery.io/auth/redirect/accept   │
   │           sets provider_token host-only            │
   │           302 → /dashboard                        │
   │ ◄─────────────────────────────────────────────────│
   │                                                   │
   │           dashboard on cloud.meshery.io           │
   │ ──────────────────────────────────────────────────►
```

---

## Persistence — writes to `selectedOrganizationId`

There are exactly four code paths that write `users.preferences.selectedOrganizationId`:

| Caller | Trigger | Notes |
|---|---|---|
| `UpdateUserPreference` handler | `PUT /api/identity/users/preferences` from UI | Normalises `"all"` → `PROVIDER_ORG_ID` before persisting. |
| `useUpdateSelectedOrganization` (UI) | Org switcher, academy enrol, invitation accept | Calls the handler above; persistence completes before `SyncBrowserUrlWithOrgDomain` triggers the redirect. |
| `OrganizationSessionProvider` priorities | Page-load reconciliation | Writes only when the URL explicitly asked for a different org, or when canonicalising preference to a domain-pinned org the user is a member of. |
| Historical migration | One-shot | Removes invalid pre-canonical preference values (empty string, JSON null, malformed UUID). |

The `Layer5-Current-Orgid` cookie is written by the start of the Kratos auth flow and the invitation acceptance redirect. **It is not** a session-scoped cookie that follows the user around — treat it as a hint for theming and Kratos flow continuity, not as a source of truth for authorization scope.

---

## Cross-organization access

Users of one organization may be granted access to resources (workspaces, designs) in another organization, but **entitlements are org-scoped**: the permissions a user has in `Orbital Labs` do not automatically apply in `Stellar Dynamics`, and vice versa. When a user with cross-org access switches to a different org via the header switcher, they will be redirected to the matching custom domain (Scenario 5) — or stay on the default domain if the destination org has no custom domain.

See [Identity → Organizations](/cloud/identity/organizations) for cross-organization access controls and the example tenant structure (`Constellation Cloud` → `Orbital Labs` / `Stellar Dynamics`).

---

## Glossary

* **Default domain** — the value of `SERVER_BASE_URL` (e.g. `cloud.layer5.io`). The platform's canonical entry point.
* **Custom domain** — any hostname that resolves through `IsCustomDomain` to an org with `organizations.domain` set, *and* is not in `ReservedDomains`.
* **Acting org** — the org context for the current request as derived by the server middlewares (`CurrentOrgID`).
* **Selected org** — the user's persisted preference (`users.preferences.selectedOrganizationId`).
* **Provider org** — the synthetic org with id `11111111-1111-1111-1111-111111111111`, used as the parent / fallback context for provider admins. Synonymous with `"all"` on the wire.
* **Membership** — a non-deleted row in `users_organizations_mappings` for `(user_id, organization_id)`.
* **Run-once page-load reconciliation** — `OrganizationSessionProvider`'s effect that aligns selected org and current domain at most once per full page load.

{{< alert type="info" >}}
For the underlying authentication mechanics that get a user signed in to a custom-domain org, see [Authentication Flows](/cloud/identity/authentication/authentication-flows). For the role-based access control that gates what a user can do once they're scoped to an org, see [Roles](/cloud/security/roles).
{{< /alert >}}
