---
title: Assign and Manage Roles
description: >
  Assign organization, team, and provider roles to people, remove them, and create or edit custom roles. Covers who can do each, what the server enforces, and how to confirm a change took effect.
weight: 60
diataxis: how-to
categories: [identity]
tags: [roles, permissions, users]
---

Roles decide what a person can do in an organization. This guide covers the two jobs an administrator does with them: giving people roles (and taking roles away), and defining the roles themselves. The first is an everyday organization task. The second changes a definition shared by every organization on the deployment, so it belongs to the Provider Admin.

For how roles, keychains, and keys fit together, read the [Roles concept]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}). For the keys each built-in role holds, see [Roles and Permissions]({{< ref "cloud/reference/default-permissions.md" >}}).

## Availability

Built-in roles are available on every plan. Custom roles are listed for the plans below, and the Provider Admin requirement applies on all of them.

{{< feature-tiers functions="Built-in Roles|Custom Roles|User-defined Roles" >}}

## Choose the scope

Every assignment has a scope, and the scope decides who may make it and which roles it accepts.

| Scope | Roles you can assign | Who assigns | The person must |
| --- | --- | --- | --- |
| Provider | Provider Admin, Kanvas, Curator | Provider Admin | Have an account |
| Organization | Every role except the provider roles and Anonymous User, custom roles included | Organization Admin of the organization, a holder of Assign User Roles, or Provider Admin | Be a live member of the organization, unless you are a Provider Admin |
| Team | Team Admin only | Team Admin of that team, Organization Admin or holder of Assign User Roles for a team mapped to the organization, or Provider Admin | Be a live member of the organization, unless you are a Provider Admin |

A person's permissions in an organization are the union of the roles they hold in the organization and in every team mapped into it. A Team Admin role held on one team therefore adds its keys across the organization, not only inside the team. Grant it with that reach in mind.

## What each administrator can do

| Action | Organization Admin or Assign User Roles holder | Team Admin | Provider Admin |
| --- | --- | --- | --- |
| Assign or remove organization roles | Yes, for members of their organization | No | Yes, in any organization |
| Assign or remove Team Admin | Yes, for teams mapped to their organization | Yes, for their own team | Yes, for any team |
| Assign or remove provider roles | No | No | Yes |
| Create or edit a custom role | No | No | Yes |
| Add or remove a keychain on a role | No | No | Yes |
| Delete a role | Not available | Not available | Not available |

Organization Admin and Provider Admin hold Assign User Roles by default. The server decides each of these by the caller's role in the scope, so holding the matching key through a custom role is not enough for the Provider Admin rows.

## Assign or change organization roles

Use this to make someone an administrator, give them workspace or academy responsibilities, or move them between roles. Open the member on the Users page and edit their roles.

1. Confirm the organization in your session is the one you mean to change. Role writes act on the selected organization.
2. Choose the complete set of roles the member should hold. The list you submit replaces the roles they hold in that scope.
3. Save. Layer5 Cloud checks every row of the request before it writes any of them.

Rules that apply to every organization role change:

| Rule | Behavior |
| --- | --- |
| Replace, not append | Roles you leave out are removed. An empty list removes every role in the scope and keeps the membership. |
| Membership required | The person must already be a member of the organization. A Provider Admin is exempt. An unauthorized or non-member row is skipped and reported in the result, not applied. |
| Provider roles refused | A request that names Provider Admin, Kanvas, Curator, or Anonymous User in an organization or team row is refused with HTTP 403 for every caller, a Provider Admin included, and nothing in the request is applied. |
| Unknown role | A role name that does not exist is refused with HTTP 400 and nothing is applied. |
| Role the member already holds | Accepted without change. |
| All or nothing for refusals | One refused row stops the whole request before any write. |
| Not transactional across failures | If a write fails after screening, rows written earlier in the same request stay written. Check the result. |

The role list the interface offers for organization scope is limited to Organization Admins and Provider Admins. A holder of Assign User Roles who is neither is offered an empty list, although the server accepts the assignment.

### Notify the member

A role change can email the person. The email is sent only when you ask for it in the request. A failed send is reported in the result and does not undo the role change. The welcome email option is honored only for Provider Admins.

## Assign Team Admin

Team Admin is the only role a team accepts. Assigning it sets the person's role list in that team, with the same replace behavior as organization roles. Granting it to a person who is in the organization but not yet on the team also adds them to the team, so this action can pull an organization member into a team. See [Manage Teams]({{< ref "cloud/guides/organizations/managing-teams/index.md" >}}) for team membership and the rest of the team lifecycle.

Each team row in a request writes only to its own team, so one request can set different roles on different teams for the same person.

## Assign provider roles

Provider roles are deployment-wide. Only a Provider Admin writes them, and they never appear in an organization or team assignment.

| Role | Purpose |
| --- | --- |
| Provider Admin | Administers the whole deployment and passes every permission check |
| Kanvas | Makes the Kanvas extension available when a Meshery Server connects; every new user receives it at sign-up |
| Curator | Manages catalog content |

A request from anyone else that includes provider roles skips those rows and reports `<email> unauthorized to assign provider roles`. This message also appears in the result of ordinary organization role changes made by a non-Provider-Admin, because the provider portion of the request is skipped for them. It is expected and does not indicate that the organization change failed.

Layer5 Cloud does not guard the last Provider Admin. A Provider Admin can remove the Provider Admin role from every Provider Admin, themselves included. Confirm another Provider Admin exists first.

## Remove roles

To remove roles, assign the set the person should keep. Removing every role in a scope leaves the member in the organization or team with no role in that scope; their membership and their other scopes are unchanged. To end a person's access to an organization altogether, remove them from it instead: see [Manage Users]({{< ref "cloud/guides/organizations/managing-users/index.md#remove-a-user-from-an-organization" >}}).

Layer5 Cloud does not stop you removing the last Organization Admin or the last Team Admin. An organization's owner keeps administrator access through ownership, so the owner cannot lock themselves out. Anyone else can. Confirm a second administrator holds the role before you remove it from the first.

## Confirm the change

A role write answers with HTTP 200 and a JSON array of strings. An empty array means every row was applied. Each string is a row that was skipped or a step that failed, for example `<email> unauthorized to assign org roles` or `role assigned:role change notification failed`.

The Users page reports success whenever the answer is 200, so it does not display the strings. After a role change, check the member's roles in the Users table, and for automation read the array. The audit trail records each change as `<actor> assigned roles: [<names>] to <person>` or `<actor> removed roles for <person>`.

## Create a custom role

**Needs:** Provider Admin.

A custom role is a name, a description, and a set of keychains. It holds keychains, not individual keys, so build it from the [keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}) that already group the permissions you want.

| Field | Behavior |
| --- | --- |
| Name | At most 50 characters. The server checks no other rule: an empty name is not rejected up front, and a duplicate name is accepted. |
| Description | Free text. |
| Keychains | Chosen from the deployment's keychains. |

Creating a role is two steps: the role is saved, then each keychain is attached. The interface reports "Role created" as soon as the first step succeeds, and it does not report a failure in the second. Open the role afterward and confirm the keychains listed are the ones you chose.

Consider these before you create one:

- **Roles are global.** A custom role appears in the role list of every organization on the deployment, not only the one you were working in.
- **Use unique names.** Layer5 Cloud resolves a role by its name when you assign it, and it does not enforce uniqueness. Two roles with the same name make assignment ambiguous.
- **A custom role is assigned at organization scope.** Teams accept only Team Admin, and the provider roles are fixed.
- **On hosted Layer5 Cloud, an organization cannot create a custom role.** The Provider Admin of a self-hosted deployment creates them for that deployment.

## Edit a role or its keychains

**Needs:** Provider Admin.

You can rename a role, change its description, and add or remove keychains. Every change applies to every person who holds the role in every organization at once, built-in roles included.

- The interface refuses to edit Provider Admin, Kanvas, and Curator. The server does not distinguish them from other roles, so do not rely on the interface for protection when you automate.
- Renaming a role changes the name that assignment looks up. Existing holders keep the role, and later assignments must use the new name.
- To change what people in one organization can do without changing a shared role, change which roles they hold in that organization.

Only a Provider Admin can attach or detach keychains. Organization Admins and Team Admins cannot, whatever keys their roles hold.

## Delete a role

Layer5 Cloud has no way to delete a role. The delete control on the Roles page is disabled. To retire a role, remove it from every member who holds it and stop assigning it. A retired role cannot be granted again once it is soft-deleted in the database, but no operation in the product soft-deletes one today.

## Failure reference

| Symptom | Cause | Fix |
| --- | --- | --- |
| HTTP 403 `You do not hold the permission this action requires in this organization` | The route needs a key you do not hold in the organization of your session | Switch organization or ask an administrator who holds it |
| HTTP 403 with a provider role named | A provider role was submitted in an organization or team row | Remove the provider role from the row; assign provider roles separately as a Provider Admin |
| HTTP 403 for a non-Team-Admin role in a team row | Teams accept only Team Admin | Assign the other role at organization scope |
| HTTP 400 for an unknown role | The role name does not exist, or it was renamed | List roles and use the current name |
| 200 with `unauthorized to assign org roles` or `team roles` | You lack authority for that member or team, or the member is not in the organization | Add the member to the organization first, or ask an administrator with authority |
| 200 with `error: ... assign provider roles` after an organization change | A write failed and earlier rows may already be written | Re-read the member's roles and resubmit the full set |
| Custom role created without its keychains | An attach step failed and the interface did not report it | Edit the role and attach the keychains again |

## Related

- [Manage Users]({{< ref "cloud/guides/organizations/managing-users/index.md" >}}) - add, remove, and edit members.
- [Manage Teams]({{< ref "cloud/guides/organizations/managing-teams/index.md" >}}) - team membership and Team Admin.
- [Roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}) - the model behind scope and keys.
- [Keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}) - what a custom role is built from.
- [Roles and Permissions]({{< ref "cloud/reference/default-permissions.md" >}}) - keys held by each built-in role.
- [Security Reference]({{< ref "cloud/reference/security.md" >}}) - key holders and responses for role routes.
