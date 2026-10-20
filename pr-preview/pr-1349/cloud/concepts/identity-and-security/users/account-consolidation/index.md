# Account Consolidation


> Account consolidation merges duplicate Layer5 Cloud accounts that belong to one person into a single canonical account. It is an operator-run command, not a customer-facing feature.



Account consolidation merges every duplicate Layer5 Cloud account that belongs to one person into a single canonical account. The canonical account takes ownership of the duplicates' designs, connections, memberships, roles, and other data, keeps their email addresses so old sign-ins still land in the right place, and retires the duplicates. Consolidation exists so that each person has exactly one account, and so that Layer5 Cloud can enforce one active account per email address.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Operator-only</h4>
  
      Consolidation is a command-line tool, <code>consolidate-users</code>, that a deployment operator runs with direct database access. It is not an API, not a UI feature, and not automatic. Customers of the Layer5-hosted service cannot trigger it and have no control over it. Operators of a self-hosted Layer5 Cloud run it themselves.
  
</div>



## Why duplicate accounts exist

The identity provider behind Layer5 Cloud could create a separate Layer5 Cloud account for each sign-in method one person used. A person who registered with a password and later signed in with GitHub or Google could end up with two or three accounts. Each account owned only what was created while signed in that way, so designs, organizations, and workspaces appeared to disappear when the person switched sign-in methods.

Consolidation treats each group of accounts that belong to one person as a cluster and collapses the cluster into one account.

## Why consolidation is required

A Layer5 Cloud database migration enforces one active account per email address. That migration refuses to apply while duplicate accounts remain, and reports:

> Refusing to enforce email uniqueness: N live duplicate-email cluster(s) remain in users. Run the consolidate-users command (default mode, then --by-email) to clear them first

A second variant of the check refuses when two active entries in the email-address records share one address. Self-hosted operators who upgrade across this migration must run consolidation first. Once the migration applies, Layer5 Cloud cannot create a second active account for an address that already belongs to one.

## How consolidation works

Consolidation runs in four phases: discovery, planning, merging, and linking the identity. Discovery and planning only read data. Merging and linking write only in a live run.

### Discovery

Discovery finds clusters of accounts that belong to one person.

- **Candidates.** Every live, non-anonymous account that has not already been merged is a candidate. Accounts with no email address are ignored.
- **Grouping.** Accounts are grouped by the identity-provider identity they share. An account matches an identity when its email address matches the identity's email or any of its verifiable addresses, compared case-insensitively.
- **Pending accounts.** An account in Pending status (registered but not yet verified) joins a cluster only when its email exactly matches an active account already in that cluster.
- **Cluster size.** A cluster needs two or more accounts. A person with a single account is never touched.
- **Ambiguities.** Two situations are never merged and are reported for review instead: an active account whose email resolves to no identity, and an email address that maps to more than one identity.

Discovery orders clusters by identity, so repeated runs see the same clusters in the same order.

### Choosing the canonical account

Each cluster keeps one canonical account. The rule is applied in order:

1. An account in Active status wins over one that is not.
2. Among the remaining accounts, the earliest-created account wins.
3. If creation times tie, the account with the lowest id wins.

Every other account in the cluster is a duplicate and is retired by the merge.

### Planning

For each cluster, consolidation computes and, in a dry run, prints a plan:

- How many records of each kind move from the duplicates to the canonical account.
- Roles the canonical account already holds, which are dropped from the duplicates instead of moved.
- Connections that are renamed because their names collide with a connection the canonical account already owns.
- Organization and team memberships that would duplicate after the move.
- For each organization a duplicate owns, whether it is deleted or transferred, with the number of other active members.
- The duplicates' email addresses to preserve on the canonical account, each marked verified or not by the identity provider.

### Merging a cluster

Each cluster merges inside one database transaction, in this order:

1. **Guard.** Every duplicate must still be live and unmerged. If any changed since planning, the cluster is skipped with the message "skipped (already merged / changed since planning)". A skip does not stop the run.
2. **Roles.** Duplicate role assignments the canonical account already holds are soft-deleted. The rest move to the canonical account.
3. **Connection renames.** A duplicate's connection whose name collides with one of the canonical account's connections becomes `<name> (merged)`. Further collisions on the same name become `<name> (merged, 2)`, `<name> (merged, 3)`, and so on.
4. **Ownership.** Every live record a duplicate owns moves to the canonical account (see [What moves, what changes, and what is deleted](#what-moves-what-changes-and-what-is-deleted)).
5. **Memberships.** Organization and team memberships are recomputed inside the transaction, because sign-ins can add memberships while the run is in progress. Two memberships are duplicates when they share the same organization or team and the same role. A different role in the same scope is kept. When two memberships duplicate, the higher-privilege role wins, ranked from highest: Provider Admin, Organization Admin, Team Admin, Workspace Admin, Workspace Manager, Academy Admin, User, Academy Learner. Unknown role names tie, and the older membership wins.
6. **Organizations.** An organization a duplicate owns is deleted when it has no other active members outside the cluster; every account in the cluster counts as the same person. Otherwise, its ownership transfers to the canonical account. Before an organization is deleted, its workspaces are handled: an empty workspace (no designs, environments, or views) is soft-deleted, and a non-empty workspace moves, with its ownership, to the canonical account's earliest-created organization. Related organizations are deleted leaves first, children before parents.
7. **Retire email records.** Each duplicate's live email-address records are retired.
8. **Preserve email addresses.** Each distinct email address the duplicates used is added to the canonical account as a non-primary address with source `consolidation`. The canonical account's own address is not duplicated.
9. **Retire duplicates.** Each duplicate account is soft-deleted, and one audit record is written per duplicate. The audit record names the canonical account, the duplicate, and the identity, and details every count moved, role dropped, connection renamed, membership dropped, organization decision, address preserved or retired, and workspace moved or deleted.

### Linking the identity

After the transaction commits, consolidation records the canonical account on the person's identity-provider identity, so later sign-ins resolve to it. The link is written only when the identity has no linked account yet or is linked to an account in the same cluster. An identity already linked to an account outside the cluster is left alone, and the run reports why. Clusters merged in `--by-email` mode that have no identity skip this step.

### Failure and re-running

- **A failed step rolls back that cluster only.** The cluster stays unmerged, earlier clusters stay merged, and the run stops so the operator can investigate.
- **A guard skip is not a failure.** The cluster is skipped and the run continues.
- **Re-running is safe.** The guard and the audit record make a finished cluster a no-op on the next run.
- **A failed identity link does not undo the merge.** The data has already moved. Re-running the tool retries the link.

## What moves, what changes, and what is deleted

| Outcome | What it applies to |
|---|---|
| **Moves to the canonical account** | Designs, filters, views, and design resources; workspaces and environments; connections and credentials; performance profiles and results; schedules; API tokens; keychains and keys; teams the duplicate owns; invitations the duplicate created; academy registrations and test submissions; event trackers; resource access grants; roles, organization memberships, and team memberships (after duplicates are dropped) |
| **Stays on the old account** | Revoked tokens. They remain on the retired account on purpose and still read as revoked. |
| **Renamed** | Connections whose names collide with the canonical account's connections gain a `(merged)`, `(merged, 2)`, ... suffix. |
| **Transferred** | Organizations a duplicate owns that have other active members. The organization is kept and the canonical account becomes its owner. |
| **Deleted** | Organizations a duplicate owns with no other active members, typically the default organization created with every new account. Non-empty workspaces in them move to the canonical account's earliest-created organization first; empty workspaces are soft-deleted. |
| **Retired** | The duplicate accounts are soft-deleted, not erased, and their email-address records are retired. Each duplicate leaves an audit record. |

## What changes for people whose accounts were merged

People whose accounts are merged receive no notification. After the merge:

- **One account owns everything.** Designs, workspaces, connections, memberships, and roles from every duplicate are available under the canonical account.
- **Old sign-in addresses still work.** Signing in with, or looking up, an address a duplicate used resolves to the canonical account. For how sign-in methods attach to one account, see [Account Linking](/pr-preview/pr-1349/cloud/concepts/identity-and-security/users/#account-linking).
- **Duplicate accounts are retired.** They are soft-deleted, and their own email-address records are retired.

### Email addresses

The canonical account has exactly one primary email address. That address is shown on the profile and identifies the account.

Addresses preserved from duplicates are non-primary. Each continues to work for:

- Accepting invitations sent to that address
- Role assignments made against that address

Preserved addresses are not shown in the Layer5 Cloud interface. The account holder, or a Provider Admin, can list them through the API at `GET /api/identity/users/{userId}/emails`.

### Seat counts and billing

The billable user count follows organization membership and counts distinct people, so a person who had several accounts in one organization counts once after the merge. The count is recalculated on its regular schedule and never falls below the plan's minimum number of users. See [How the billable user count works](/pr-preview/pr-1349/cloud/guides/account/managing-subscriptions/#how-the-billable-user-count-works).

### Keeping separate accounts

Each email address belongs to exactly one active account. To keep separate accounts on purpose, for example one for testing and one for production, register each with a distinct email address.

## Running it (self-hosted operators)

### Prerequisites

- The identity-anchor backfill tool has been run.
- Ambiguities from a dry run have been reviewed.
- A full database backup has been taken.
- A separate identity-provider database URL is configured. The tool reads the same database configuration as the server. Without a separate identity-provider URL, it falls back to the main database connection, which is valid only in local development where both databases share one instance.

### Flags

| Flag | Default | Behavior |
|---|---|---|
| `--dry-run` | `true` | Prints the plan and writes nothing. |
| `--yes` | `false` | Confirms writes. A live run needs both `--dry-run=false` and `--yes`. `--yes` alone is still a dry run. `--dry-run=false` without `--yes` aborts with "refusing to run live without --yes; pass --yes to confirm writes, or keep --dry-run". |
| `--limit N` | `0` (all) | Caps the number of clusters processed per run. Ignored with `--cluster`, and a note says so. |
| `--cluster <email or identity id>` | none | Processes one cluster, matched by the canonical account's email, a duplicate's email, or the identity id. `--limit` cannot hide the target. With no match, the tool warns that no cluster matches and that the account may already be merged or ambiguous. |
| `--by-email` | `false` | Residual mode, run after the default mode. Merges duplicate-email clusters that have no identity, or a single identity with no active link (for example, accounts that are all still Pending), keyed on the shared email. An email shared by more than one identity is skipped and reported. Ignores `--cluster`, and a note says so. |

Run the default mode first, then `--by-email`. Run each as a dry run before running it live.

### Output

Each run prints whether it is a dry run or live, the number of clusters and ambiguities discovered, then a plan per cluster (dry run) or one merge line per cluster with the identity-link result (live). It lists the ambiguities it skipped and ends with a summary: clusters planned or merged, accounts retired, organizations deleted, organizations transferred, addresses preserved, identities linked, clusters skipped, and ambiguities remaining. The audit records hold the full detail of every merge.

On error, the tool prints `consolidate-users: <error>` and exits with status 1.

### Error messages

Every merge-time error below, apart from the identity-link failure, means the cluster's transaction rolled back and the run is safe to repeat.

| Message | Meaning |
|---|---|
| Failed to discover user-consolidation clusters | Discovery failed. Nothing was written. |
| Failed to build a merge plan | Planning failed for a cluster. |
| Failed to execute a user-consolidation merge | A merge step failed. |
| Failed to apply an organization consolidation decision | An organization delete or transfer failed, including when an organization being deleted has a live child organization outside the delete set. |
| Canonical user has no live organization to re-home a non-empty workspace into | A non-empty workspace needs a destination, and the canonical account owns no live organization. |
| Failed to re-point an ownership column during a merge | Moving a kind of record to the canonical account failed. |
| Failed to record the user-consolidation audit row | The audit record could not be written. |
| Refusing to execute a merge with no canonical user | The cluster had no canonical account. |
| Failed to preserve a merged-away email address | Adding a duplicate's address to the canonical account failed. |
| Failed to stamp the identity's external id after a committed merge (paraphrased) | The merge committed, but the identity link failed. Unlike the errors above, nothing rolled back. Re-run to retry the link. |

## If resources look missing

If designs, workspaces, connections, or organizations you expect are missing after a merge, [contact support](/pr-preview/pr-1349/cloud/reference/support/) with the email addresses you have used to sign in.

