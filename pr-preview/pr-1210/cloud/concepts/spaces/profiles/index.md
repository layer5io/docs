# Profiles


> A profile is a named record that represents one person or persona in an organization, groups the connections it publishes through, and is shared through workspaces.


A profile is a named record that belongs to one organization. It represents a person or a persona, such as the platform accounts someone publishes through, and it groups existing connections under that identity. Profiles are shared with people by assigning them to workspaces.

A profile is not your user account profile, and it is not a Meshery performance profile.

## What a profile holds

- a **name** (required, up to 255 characters, not unique) and an optional **description** (up to 1000 characters)
- an **owner**, who must be a signed-in member of the profile's organization
- optionally, the **user** the profile represents
- free-form **metadata**
- links to **connections**. A profile links to connections that already exist; it never copies them. Removing a link leaves the connection untouched.

A profile can be assigned to any number of workspaces in its own organization. Its organization is fixed for the life of the profile.

## Who can see a profile

A profile is visible to:

- its owner,
- the Organization Admins of its organization, and
- members of any team assigned to a workspace the profile is assigned to.

The owner always sees their own profile, whether or not it is in a workspace and even without the **View Profiles** permission. Organization Admins and workspace members also need **View Profiles**. Provider Admins do not see profiles automatically. Seeing a profile does not give you access to its linked connections, which keep their own access rules.

A profile that is in no workspace is visible only to its owner and the organization's admins. What you can change is never wider than what you can see: a profile you cannot see answers 404, the same as one that does not exist.

## Owner and succession

The owner can always edit their own profile and its connection links. Deleting a profile still needs the **Delete Profile** permission. Changing the owner transfers the profile.

When the owner's account is deleted, the profile passes to the earliest Organization Admin of its organization, or else to its earliest member, the same rule the organization follows for designs. A profile is never deleted because its owner's account was.

## Permissions

| Permission | Allows |
| --- | --- |
| View Profiles | Listing and reading the profiles you can see, and their connections. Owners read their own profiles without it. |
| Create Profile | Creating a profile in an organization |
| Edit Profile | Editing any visible profile, transferring its ownership, and linking or unlinking connections |
| Delete Profile | Deleting a profile |
| Assign profile to workspace | Assigning a visible profile to a workspace |
| Remove profile from workspace | Removing a profile from a workspace |

Every organization member holds **View Profiles**. Workspace Admins, Organization Admins and Provider Admins hold the rest, and Academy Admins can also assign profiles to workspaces and remove them. People using Kanvas without signing in hold none of them, and every profile change refuses a guest session. See [Default Permissions](/pr-preview/pr-1210/cloud/reference/default-permissions/#profile-permissions).

To create and share profiles, see [Managing Profiles](/pr-preview/pr-1210/cloud/guides/workspaces/managing-profiles/).

