# Account Consolidation


> Layer5 Cloud resolves email/password, GitHub sign-in, and Google sign-in to a single account per verified email address.



Account consolidation merges every duplicate Layer5 Cloud account that belongs to one person into a single canonical account. The canonical account takes ownership of the duplicates' designs, connections, memberships, roles, and other data, keeps their email addresses so old sign-ins still land in the right place, and retires the duplicates.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Operator-only</h4>
  
      Consolidation is a command-line tool, <code>consolidate-users</code>, that a deployment operator runs with direct database access. It is not an API, not a UI feature, and not automatic. Customers of the Layer5-hosted service cannot trigger it and have no control over it. Operators of a self-hosted Layer5 Cloud run it themselves.
  
</div>



## What changed

The identity provider behind Layer5 Cloud could create a separate account for each sign-in method one person used. A person who registered with a password and later signed in with GitHub or Google could end up with two or three accounts, even when they shared the same email address. Designs, organizations, and workspaces created under one sign-in method appeared to disappear when the person signed in with another.

Consolidation treats each group of accounts that belong to one person as a cluster and collapses the cluster into one account. For each affected person, resources move to a single retained account, including:

- Designs and views
- Workspaces and environments
- Connections and credentials
- Performance profiles and results
- Schedules
- API tokens
- Organization and team memberships and roles
- Keychains and keys
- Teams the duplicate owns
- Invitations the duplicate created
- Academy registrations and test submissions
- Event trackers
- Resource access grants

Revoked tokens stay on the retired account on purpose and still read as revoked.

Organizations are handled separately from that transfer. An organization owned by a duplicate account with no other active members outside the cluster, typically the organization Layer5 Cloud creates for every new account, is deleted. Before it is deleted, an empty workspace (no designs, environments, or views) is soft-deleted, and a non-empty workspace moves, with its ownership, to the canonical account's earliest-created organization. An organization that does have other active members is preserved, and its ownership transfers to the retained account. Related organizations are deleted leaves first, children before parents.

If a connection name collides during the merge, the duplicate is renamed with a `(merged)` suffix, and `(merged, 2)`, `(merged, 3)`, and so on for any further collisions on the same name, so both remain identifiable.

People whose accounts are merged receive no notification.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Nothing for you to do</h4>
  
      Customers do not run consolidation. If you sign in with a different method and resources appear to be missing, <a href="/pr-preview/pr-1365/cloud/getting-started/support/">contact support</a> with the email addresses you have used to sign in.
  
</div>



## Signing in with multiple methods

Signing in with email and password, GitHub, or Google using the same **verified** email address always resolves to the same account:

1. You create an account with `alice@example.com`, whether by setting a password or signing in with GitHub or Google.
2. Later, you sign in with a different method (for example, Google instead of GitHub) using a provider that returns the same verified email address.
3. Layer5 Cloud recognizes the verified email address and signs you into your existing account rather than creating a new one.

Your designs, organizations, and workspaces are available regardless of which sign-in method you used to create them. Each email address belongs to a single active account, so a second account can no longer be created for an address that already belongs to one. For how sign-in methods attach to one account, see [Account Linking](/pr-preview/pr-1365/cloud/concepts/identity-and-security/users/#account-linking).

## Your email addresses

Your account has exactly one **primary** email address at a time. That is the address shown on your profile and the one used to identify you.

If your account absorbed a duplicate during consolidation, Layer5 Cloud also keeps a record of the addresses that duplicate used. Each of those addresses continues to work for:

- Accepting invitations sent to that address
- Role assignments made against that address

These additional addresses are not displayed in the Layer5 Cloud interface. The account holder, or a Provider Admin, can list them through the API at `GET /api/identity/users/{userId}/emails`.

## Wanting separate accounts

Each email address maps to exactly one active account. If you deliberately want separate accounts, for example to keep a testing environment separate from production, use a distinct email address for each account.

## For organization admins: billing impact

The billable user count follows organization membership and counts distinct people, so a person who had several accounts in one organization counts once after the merge. The count is recalculated on its regular schedule and never falls below the plan's minimum number of users. There is nothing to adjust manually.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Minimum-seat plans</h4>
  
      Billable seats never drop below your plan&rsquo;s minimum. If your plan was already at its minimum-seat floor, consolidation has no effect on your seat count or billing.
  
</div>



## Why consolidation is required

A Layer5 Cloud database migration enforces one active account per email address. That migration refuses to apply while duplicate accounts remain, and reports:

> Refusing to enforce email uniqueness: N live duplicate-email cluster(s) remain in users. Run the consolidate-users command (default mode, then --by-email) to clear them first

A second variant of the check refuses when two active entries in the email-address records share one address. Self-hosted operators who upgrade across this migration must run consolidation first. Once the migration applies, Layer5 Cloud cannot create a second active account for an address that already belongs to one.

## How consolidation works

Consolidation runs in four phases: discovery, planning, merging, and linking the identity. Discovery and planning only read data. Merging and linking write only in a live run.

Discovery groups live, non-anonymous accounts that have not already been merged by the identity-provider identity they share. Accounts with no email address are ignored. An account in Pending status joins a cluster only when its email exactly matches an active account already in that cluster. A cluster needs two or more accounts. An active account whose email resolves to no identity, and an email address that maps to more than one identity, are never merged. They are reported for review.

Each cluster keeps one canonical account, in this order: an Active account wins over one that is not, then the earliest-created account, then the account with the lowest id. Every other account in the cluster is retired.

Each cluster merges inside one database transaction:

1. Every duplicate must still be live and unmerged. If any changed since planning, the cluster is skipped with "skipped (already merged / changed since planning)". A skip does not stop the run.
2. Duplicate role assignments the canonical account already holds are soft-deleted. The rest move.
3. Colliding connection names are renamed as described above.
4. Every live record a duplicate owns moves to the canonical account.
5. Organization and team memberships are recomputed inside the transaction. Two memberships duplicate when they share the same organization or team and the same role. A different role in the same scope is kept. When two memberships duplicate, the higher-privilege role wins, ranked from highest: Provider Admin, Organization Admin, Team Admin, Workspace Admin, Workspace Manager, Academy Admin, User, Academy Learner. Unknown role names tie, and the older membership wins.
6. Organizations a duplicate owns are deleted or transferred as described in [What changed](#what-changed).
7. Each duplicate's live email-address records are retired, and each distinct address the duplicates used is added to the canonical account as a non-primary address with source `consolidation`.
8. Each duplicate account is soft-deleted, and one audit record is written per duplicate.

After the transaction commits, consolidation records the canonical account on the person's identity-provider identity, so later sign-ins resolve to it. The link is written only when the identity has no linked account yet or is linked to an account in the same cluster. A failed identity link does not undo the merge. Re-running the tool retries the link. A failed merge step rolls back that cluster only and stops the run. Re-running is safe: a finished cluster is a no-op.

## Running it (self-hosted operators)

Prerequisites: the identity-anchor backfill tool has been run, ambiguities from a dry run have been reviewed, a full database backup has been taken, and a separate identity-provider database URL is configured. Without a separate identity-provider URL, the tool falls back to the main database connection, which is valid only in local development where both databases share one instance.

| Flag | Default | Behavior |
|---|---|---|
| `--dry-run` | `true` | Prints the plan and writes nothing. |
| `--yes` | `false` | Confirms writes. A live run needs both `--dry-run=false` and `--yes`. `--yes` alone is still a dry run. `--dry-run=false` without `--yes` aborts with "refusing to run live without --yes; pass --yes to confirm writes, or keep --dry-run". |
| `--limit N` | `0` (all) | Caps the number of clusters processed per run. Ignored with `--cluster`. |
| `--cluster <email or identity id>` | none | Processes one cluster, matched by the canonical account's email, a duplicate's email, or the identity id. |
| `--by-email` | `false` | Residual mode, run after the default mode. Merges duplicate-email clusters that have no identity, or a single identity with no active link, keyed on the shared email. An email shared by more than one identity is skipped and reported. Ignores `--cluster`. |

Run the default mode first, then `--by-email`. Run each as a dry run before running it live.

Each run prints whether it is a dry run or live, the number of clusters and ambiguities, then a plan per cluster or one merge line per cluster. On error, the tool prints `consolidate-users: <error>` and exits with status 1. Apart from a failed identity link, a merge-time error means that cluster's transaction rolled back and the run is safe to repeat. One refusal to know: "Canonical user has no live organization to re-home a non-empty workspace into" means a non-empty workspace needs a destination and the canonical account owns no live organization. "Failed to apply an organization consolidation decision" includes the case where an organization being deleted has a live child organization outside the delete set.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Related reading</h4>
  
      For how sign-in providers link to your account, see <a href="/pr-preview/pr-1365/cloud/concepts/identity-and-security/users/#account-linking">Account Linking</a>.
  
</div>



