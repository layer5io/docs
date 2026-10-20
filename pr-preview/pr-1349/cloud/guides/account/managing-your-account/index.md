# Manage Your Account


> Edit your profile, change your password, link GitHub or Google sign-in, and delete your account, with what each change does and what it leaves behind.



Your profile belongs to you, not to an organization. A change applies in every organization you belong to. This guide covers the four things you can change about your account: the profile, the password, the linked sign-in providers, and the account itself.

## Before you start

- You need the **View Profile** permission to open the profile. The default user role holds it.
- Changing your password needs **Reset Password**. Deleting the account needs **Delete Account**. The default user role holds both.
- Layer5 Cloud signs you in through an identity service. Password changes and account deletion need a live browser sign-in. A script that holds only an API token cannot do either.
- Changing a password or linking a provider is a privileged action. If your sign-in is older than the privileged-session window, Layer5 Cloud asks you to sign in again first. The window is 24 hours on hosted Layer5 Cloud and 15 minutes by default in the self-hosted chart.
- A user's profile can also be edited by an administrator who holds **Update User Profile** in an organization you share with them. Only a Provider Admin can change another user's email address.

## Edit your profile

The profile form saves itself. About one second after you stop typing, Layer5 Cloud saves the change and confirms it with a short message. There is no Save button, and edits made during a save are queued, not lost.

| Field | Behavior |
| --- | --- |
| First Name, Last Name | Free text. An empty value never overwrites the stored name. |
| Username | Read-only. It is the identifier assigned to the account and cannot be edited. |
| E-mail | Must look like an address (`name@host.domain`). An invalid value blocks saving and shows "Please enter a valid email address". |
| Country, Region | Optional. Pick a country, then a region of that country. |
| Avatar URL | Optional. A public URL to a JPEG, PNG, GIF, SVG, or WEBP image. Layer5 Cloud loads the image before it saves. An address that does not load as an image is rejected. |
| Avatar color | The background color shown when you have no avatar image. Saved as a user preference. |
| Tagline | A short public line about you. |
| Social Links | Up to 5 links, each with a type (GitHub, LinkedIn, X, Company or Organization, or Personal Website) and a URL. An empty URL is allowed; a malformed one is rejected. |

Your avatar, tagline, and social links appear on your public profile.

### Change your email address

Changing the email address changes the identifier you sign in with. Layer5 Cloud marks the new address as unverified and sends it a verification message. The confirmation reads "Profile updated. Please check your new email address to verify it." Verify the new address before you rely on it. If the verification message cannot be sent, the change still completes.

Layer5 Cloud writes the change to the identity service first and to your profile second, so a rejected address never leaves the two out of step.

## Change your password

Use the Reset Password control on the profile. Enter the new password twice. The two entries must match, or the form reports "Your new passwords do not match".

The identity service enforces the password policy:

- At least 8 characters.
- Not a password found in known breaches.
- Not too similar to your email address.

A strength bar (Very weak to Strong) shows how guessable the password is. It is advice only and does not block you; the policy above does. A rejected password returns the identity service's reason. A successful change shows "Password updated".

Changing your password does not end your other sessions or revoke your API tokens. To cut off a device or script, end the session or revoke the token yourself with [Review and Sign Out Sessions](/pr-preview/pr-1349/cloud/guides/security/sessions/) and [Create and Use an API Token](/pr-preview/pr-1349/cloud/guides/security/api-tokens/).

If you forgot your password, use the recovery flow from the sign-in page instead. It emails a one-time code and link that stay valid for 30 days.

## Link or unlink a sign-in provider

Link GitHub or Google to sign in with whichever you prefer. Either method opens the same account, with the same organizations, designs, and roles. GitHub and Google are the only supported providers.

The profile lists a **Link** option for each provider you have not linked and an **Unlink** option for each provider you have linked. The provider you used to create the account appears in neither list: you cannot unlink it, and it is already linked.

Linking sends you to the provider to approve access, then returns you to Layer5 Cloud. Layer5 Cloud asks GitHub for your profile and email address and Google for your email and profile. Unlinking removes the provider from your account. Your password and the other linked provider keep working.

A provider account can be linked to one Layer5 Cloud account only. Linking depends on the provider reporting a verified email address. For how Layer5 Cloud resolves sign-ins that share an email address, read [Account Consolidation](/pr-preview/pr-1349/cloud/concepts/identity-and-security/users/account-consolidation/) and the [Account Linking](/pr-preview/pr-1349/cloud/concepts/identity-and-security/users/#account-linking) rules.

## Delete your account

Deletion is permanent. Layer5 Cloud asks you to confirm, and then does not offer recovery.

What deletion does, in one step that either completes or changes nothing:

1. Hands on every organization and team you own (see [Organizations and teams you own](#organizations-and-teams-you-own)).
2. Hands any credential you hold on behalf of an organization to that organization's owner, or else its longest-standing Organization Admin, so the organization keeps working. For an organization you owned, that is its new owner.
3. Marks your account as deleted and ends your memberships in every organization and team, which removes your roles with them, along with any provider-wide role. Each membership is kept as an ended record, so organization history shows when your access ended.
4. Revokes every API token you created, so none of them works afterwards.
5. Releases your email address, so it can be used to sign up again.
6. Records the deletion, and each organization or team handed on or deleted, in the audit trail.
7. Removes your sign-in identity, including linked GitHub and Google sign-in, and signs you out.

What deletion leaves behind:

- Published content, such as items you published to the catalog, stays public.
- The audit trail keeps its entries.

### Organizations and teams you own

Each organization you own passes to someone who still belongs to it:

1. Its longest-standing Organization Admin, if it has one.
2. Otherwise its longest-standing member.
3. Otherwise, when nobody else belongs to it, the organization is deleted.

"Longest-standing" means the membership that was created first. Members whose own accounts are deleted, and guest (anonymous) accounts, are never chosen. The new owner keeps the roles they already had; ownership does not change anyone's roles.

Teams you own follow the same rule, with Team Admin in place of Organization Admin.

An organization that is the parent of another live organization is never deleted this way, because child organizations are never deleted or moved along with their parent. If such an organization has nobody else in it, it keeps you as its owner and the audit trail records why. Your account is still deleted.

### When deletion is refused

Because organizations you own are handed on first, a refusal is rare. Layer5 Cloud refuses the deletion, and changes nothing, when you hold credentials designated to an organization you do not own and that organization has no live owner or Organization Admin to receive them. The message begins "Refusing to delete your account" and names the organization. Without a successor, those credentials would be orphaned.

Resolve it, then retry:

- Ask that organization's members to promote someone to Organization Admin.
- Or release the credentials from the organization, or delete them.

### Signing up again

Signing up again with the same email address, by email and password or with GitHub or Google, on Layer5 Cloud or on an organization's custom domain, creates a new, empty account with a new account ID and its own personal organization (or the placement an organization's open invitation gives any new account). It inherits nothing from the deleted one: no profile, preferences, memberships, roles, or ownership, and no linked sign-in providers. An account is identified by its account ID, not by its email address, so the deleted account cannot be restored this way. To regain access to an organization, ask one of its administrators to invite you again.

## See also

- [Users](/pr-preview/pr-1349/cloud/concepts/identity-and-security/users/) explains accounts, memberships, and sign-in methods.
- [Set Notification Preferences](/pr-preview/pr-1349/cloud/guides/account/notification-preferences/) controls the email you receive.
- [Security](/pr-preview/pr-1349/cloud/guides/security/) covers sessions and API tokens.

