# Users

> A user account is one person's identity in Layer5 Cloud. It exists outside any organization, owns resources, gains permissions through the roles it holds in each organization and team, and follows defined rules when it is removed or deleted.



A user account is one person's identity in Layer5 Cloud. Every action in Layer5 Cloud is taken by a user account, every resource has a user account behind it, and every permission check starts from the user account and the roles it holds. Understanding what an account is, and what it is not, explains why removing someone from an organization leaves their account intact, why the same person can have different permissions in two organizations, and what survives when an account is deleted.

## User accounts

Each person has one user account. The account belongs to the person, not to an organization: it exists before the person joins any organization and continues to exist after they leave one. An account that belongs to no organization is still a valid account.

A user account:

- **Owns resources.** Designs, connections, credentials, and API tokens are owned by the account that created them.
- **Is the actor of record.** Creating a design, changing a member's roles, or removing a member writes an audit event that names the account that acted.
- **Carries a profile.** First and last name, email address, avatar, tagline, country, region, and social links. The person edits their own profile in [Manage Your Account](/pr-preview/pr-1350/cloud/guides/account/managing-your-account/).
- **Has a fixed username.** The username shown on the profile is the account's identifier. It cannot be edited by the person or by an administrator. A person who needs a different sign-in address changes their email address instead, and the new address must be verified before it becomes active.

### Account status

Every account has one status. The status decides whether the account appears in member lists, counts toward billing, and can sign in.

| Status | Meaning |
| --- | --- |
| `active` | A working account. Only active accounts appear in member lists by default, in the public user directory, and in the billable user count. |
| `pending` | An account that has been created or invited but has not yet signed in, or a password registration whose email address is not yet verified. Pending accounts are hidden from member lists until an administrator applies a filter. |
| `inactive` | A deleted account. It cannot sign in, its public profile is no longer served, and API requests made with its tokens fail. |
| `anonymous` | An anonymous account. It never appears in member lists, user search, or the active users list, and it sees only the public portion of other users' profiles. |

## Membership in organizations and teams

A user account can belong to any number of [organizations](/pr-preview/pr-1350/cloud/concepts/identity-and-security/organizations/) and any number of [teams](/pr-preview/pr-1350/cloud/concepts/identity-and-security/teams/). Membership and roles are separate: a membership places the person in the organization or team, and roles attached to that membership grant permissions. A person added without a role is a member who holds no role.

Roles are held per scope:

- **Organization roles** are held in one organization. The same person can be an Organization Admin in one organization and hold only the User role in another.
- **The team role**, Team Admin, is held in one team.
- **Provider roles**, such as Provider Admin, apply across the whole deployment.

A person's permissions in an organization are the union of the keys from every role they hold in the organization in context. Their roles in other organizations do not count. [Roles](/pr-preview/pr-1350/cloud/concepts/identity-and-security/roles/) explains how roles, keychains, and keys combine.

### How people join an organization

Layer5 Cloud offers three paths, each suited to a different starting point:

| Path | Starting point | Result |
| --- | --- | --- |
| Create a user | The person has no account | Layer5 Cloud creates a `pending` account and emails the person a link to set a password. The new account belongs to no organization until someone adds it. See [Create a user](/pr-preview/pr-1350/cloud/guides/organizations/managing-users/#create-a-user). |
| Add an existing user | The person already has an account | The account becomes a member of the organization with no role, and roles and teams are assigned as separate steps. See [Add an existing user](/pr-preview/pr-1350/cloud/guides/organizations/managing-users/#add-an-existing-user). |
| Invite | The person has an email address, a link, or an address in an allowed domain | The person joins when they accept, with the roles and teams the invitation lists. See [Invite Users](/pr-preview/pr-1350/cloud/guides/organizations/inviting-users/). |

Creating user accounts requires the Create User permission, which Organization Admin and Provider Admin hold by default. Team Admins do not create user accounts; they manage the membership of their own team.

## What others can see

A user account is visible beyond the organizations it belongs to. Every account has a public profile, and some of it is shown to anyone, including people who are not signed in.

| Information | Signed-out or anonymous viewer | Signed-in viewer |
| --- | --- | --- |
| Display name and avatar | Visible | Visible |
| Tagline, country, region, social links, and join date | Visible | Visible |
| Badges and public activity | Visible | Visible |
| Email address | Hidden | Visible |
| Role names, teams, and organizations | Hidden | Visible |

The public user directory lists active accounts by display name and avatar only, and can be searched without signing in. It never shows email addresses. An account without a first or last name appears as "Meshery User" followed by the first eight characters of its identifier.

Badges are public claims about a person. No one can grant a badge to their own account, a Provider Admin included. See [Assign User Badges](/pr-preview/pr-1350/cloud/guides/organizations/assigning-user-badges/).

**Active users** are accounts that signed in within the last 24 hours. The list does not reflect a live connection: a person who signed in this morning and closed their browser still appears. The **Last Active** time on the Users page has the same meaning: the most recent sign-in.

## Account linking

A person signs in to their account with any of three methods:

- Email address and password
- GitHub
- Google

GitHub and Google are the only supported sign-in providers. Every method a person has linked opens the same account, with the same organizations, roles, and resources. A person links or unlinks a provider from their profile; see [Link or unlink a sign-in provider](/pr-preview/pr-1350/cloud/guides/account/managing-your-account/#link-or-unlink-a-sign-in-provider).

Linking follows these rules:

- **The registration provider stays linked.** The provider a person used to create the account cannot be unlinked.
- **Only verified email addresses count.** When GitHub or Google reports an email address it has not verified, Layer5 Cloud does not record that address on the account.
- **Each active email address belongs to one account.** The database refuses a second active account for an address that already belongs to one. [Account Consolidation](/pr-preview/pr-1350/cloud/concepts/identity-and-security/users/account-consolidation/) describes how earlier duplicate accounts are merged.

### Sign-in through an organization's custom domain

When a person signs in with GitHub or Google through an organization's custom domain, Layer5 Cloud resolves the provider's verified email address to an account itself:

| Situation | Result |
| --- | --- |
| No account has the verified email address | Layer5 Cloud creates an account. |
| The account already has this provider attached | Layer5 Cloud signs the person in. |
| An account has the same verified email address but not this provider | Layer5 Cloud attaches the provider to that account and signs the person in, without a prompt. |
| An attached provider later reports a different verified email address | Layer5 Cloud signs the person in to the same account, keeps the stored email address unchanged, and records an audit entry. |

## Removal from an organization

Removing a person from an organization ends their access to that organization only. Their membership, their organization roles, and their membership in the organization's teams end. Their account, their memberships in other organizations, the resources they created, and the audit trail remain. An organization's owner cannot be removed. See [Remove a user from an organization](/pr-preview/pr-1350/cloud/guides/organizations/managing-users/#remove-a-user-from-an-organization).

Deletion is different: it ends the account itself, in every organization at once.

## Account deletion

A person deletes their own account from their profile. Only a Provider Admin deletes another person's account; Organization Admins remove members from their organization instead. Deletion is permanent, and Layer5 Cloud offers no recovery.

### What deletion removes and what it keeps

| Item | After deletion |
| --- | --- |
| Organization memberships and organization roles | Removed in every organization |
| Team memberships and team roles | Removed in every team |
| Sign-in identity, password, and linked GitHub and Google sign-in | Removed |
| The account record | Marked deleted and set to `inactive`. Its public profile is no longer served. |
| Sessions and API tokens | Stop working. The person is signed out. |
| Credentials designated to an organization | Handed to the organization's successor: its owner, or else its longest-standing Organization Admin |
| Organizations the person owns | Remain. Deletion neither deletes nor transfers them. |
| Designs and other resources the person authored | Remain |
| Content published to the catalog | Remains public |
| Audit events | Remain, including an entry for the deletion |

### When deletion is refused

Layer5 Cloud refuses to delete an account that holds a credential designated to an organization with no other owner or Organization Admin to receive it, because the credential would be orphaned. The refusal names the organization and changes nothing. The same rule applies when a Provider Admin deletes someone else's account. To proceed, promote another member of that organization to Organization Admin, or release the credentials, then retry. See [Delete your account](/pr-preview/pr-1350/cloud/guides/account/managing-your-account/#delete-your-account) and [When deletion is refused](/pr-preview/pr-1350/cloud/guides/account/managing-your-account/#when-deletion-is-refused).

### Registering again with the same email address

Registering again with the email address of a deleted account creates a new, separate account. The new account does not regain the deleted account's organization or team memberships, roles, linked sign-in providers, or access to its resources. An administrator must add the new account to each organization and assign its roles again.

## Users and plans

Layer5 Cloud enforces no limit on the number of users, seats, or organizations when people are created, added, or invited. Seats are a billing concept: a subscription's billable user count is derived from the organization's active members, and the count adjusts the subscription quantity without blocking anyone from joining. See [How the billable user count works](/pr-preview/pr-1350/cloud/guides/account/managing-subscriptions/#how-the-billable-user-count-works).

## Where to look next

- [Manage Users](/pr-preview/pr-1350/cloud/guides/organizations/managing-users/) covers creating, adding, editing, and removing members.
- [Invite Users](/pr-preview/pr-1350/cloud/guides/organizations/inviting-users/) covers invitation links and direct invites.
- [Manage Your Account](/pr-preview/pr-1350/cloud/guides/account/managing-your-account/) covers editing your profile, changing your password, linking providers, and deleting your account.
- [Roles](/pr-preview/pr-1350/cloud/concepts/identity-and-security/roles/) and [Roles and Permissions](/pr-preview/pr-1350/cloud/reference/default-permissions/) list what each role allows.

