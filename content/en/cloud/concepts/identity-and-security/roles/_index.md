---
title: Roles
description: >
  Roles map permissions to users. Roles contain any number of keychains, which contain any number of keys (permissions). Assign roles to users to grant permissions.
weight: 4
categories: [Security]
tags: [roles, permissions]
aliases:
  - /cloud/security/roles/

---

Roles map permissions to users. Roles contain any number of keychains, which contain any number of keys (permissions). Assign roles to users to grant permissions.

![roles](/cloud/concepts/identity-and-security/images/roles-overview.svg "image-center-no-shadow")

## Provider Admin Role

{{< cardpane >}}
{{% card header="<a href='https://docs.layer5.io/cloud/reference/default-permissions/#Provider+Admin' target='_blank'>Provider Admin Role</a>" %}}
![role-provider](/cloud/concepts/identity-and-security/images/role-provider-admin.svg)
{{% /card %}}
{{% card %}}

**What is the purpose of this role?**

- Used for administration of Layer5 Cloud.
- Used for debugging and monitoring.
- Applicable to platform engineering team and on-prem users.

**Who can assign this role?**

- Provider Admins

**When this role is first assigned?**

- On ☁️ boot-up (using build args)

**How many instances of these roles?**

- Min: 1, Max: many (based on plan)

**Who can remove assignment of this role?**

- Provider Admins

**What permissions does this role have?**

- Can perform CRUD on all resources

{{% /card %}}
{{< /cardpane >}}

## Organization Roles

{{< cardpane >}}
{{% card %}}
![organization-administrator and manager](/cloud/concepts/identity-and-security/images/organization-roles.svg)
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}
{{% card header="### <a href='https://docs.layer5.io/cloud/reference/default-permissions/#Org+Admin' target='_blank'>Organization Administrator</a>" %}}

**What is the purpose of this role?**

- Administration of an organization

**Who can assign this role?**

- The Organization Owner

**When this role is first assigned?**

- Creation of new organization or User Account creation

**How many instances of these roles?**

- Min: 1, Max: many (based on plan)
- By default, the first Organization Admin is the owner (the creator of the organization).

**Who can remove assignment of this role?**

- Organization Owner

{{% /card %}}
{{% card header="### <a href='https://docs.layer5.io/cloud/reference/default-permissions/#Org+Billing+Manager' target='_blank'>Organization Billing Manager</a>" %}}

**What is the purpose of this role?**

- Administration of subscriptions, plans, payments, billing methods and information, spending limits, invoice mgmt etc.

**Who can assign this role?**

- Organization Owner

**When this role is first assigned?**

- Manually by Organization Owner

**How many instances of these roles?**

- Min: 0, Max: many

**Who can remove assignment of this role?**

- Organization Owner

{{% /card %}}
{{< /cardpane >}}

{{< alert title="Organization owners as entitlements" >}}
It's essential to understand that owners are not roles, but entitlements.

Organization owners carry the organization administrator role, and may be joined in their organization administration duties by any number of other users carrying the organization administrator role. However, the organization owner also has the administrative privilege to delete the organization.

The entitlement of "organization owner" is automatically bestowed to the creator of a organization. The individual user who created a given organization initially is therefore granted certain administrative privileges beyond that of other organization administrators. Specifically, organization owners retain the sole permission to delete the organization.

For more information, see [Organization](/cloud/concepts/identity-and-security/organizations).
{{< /alert >}}

## Workspace Roles

{{< cardpane >}}
{{% card %}}
![workspace-administrator](/cloud/concepts/identity-and-security/images/workspace-roles.svg)
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}
{{% card header="### <a href='https://docs.layer5.io/cloud/reference/default-permissions/#Workspace+Admin' target='_blank'>Workspace Administrator</a>" %}}

**What is the purpose of this role?**

- Administration of a workspace along with curation of content for an organization's catalog (for each organization for which the user has this role assigned)

**Who can assign this role?**

- Organization Administrators or Workspace Owner

**When this role is first assigned?**

- Creation of new workspace

**How many instances of these roles?**

- Min: 1, Max: many
- By default, the first Workspace Administrator is the owner (the creator) of the workspace.

**Who can remove assignment of this role?**

- Organization Administrators or Workspace Owner

{{% /card %}}
{{< /cardpane >}}

{{< alert title="Workspace owners as entitlements" >}}
It's essential to understand that owners are not roles, but entitlements.

Workspace owners carry the organization administrator role, and may be joined in their workspace administration duties by any number of other users carrying the workspace administrator role. However, the workspace owner also has the administrative privilege to delete the workspace.

The entitlement of "workspace owner" is automatically bestowed to the creator of a workspace. The individual user who created a given workspace initially is therefore granted certain administrative privileges beyond that of other workspace administrators. Specifically, workspace owners retain the sole permission to delete the workspace.
{{< /alert >}}

## Team Roles

{{< cardpane >}}
{{% card %}}
![team-admins-and-manager](/cloud/concepts/identity-and-security/images/team-roles.svg)
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}
{{% card header="<a href='https://docs.layer5.io/cloud/reference/default-permissions/#Team+Admin' target='_blank'>Team Administrator</a>" %}}
**What is the purpose of this role?**

- Administration of teams

**Who can assign and unassign this role?**

- Organization Administrator or Team owner

**When is this role first assigned?**

- Creation of new team or User Account creation
- By default, the first Team Admin is owner (the team creator)

**How many instances of these roles?**
Min: 1, Max: many

{{% /card %}}
{{% card header="### Team Manager" %}}
**What is the purpose of this role?**

- Administration of teams (without delete access)

**Who can assign and unassign this role?**

- Organization Administrators or Team Owner

**When is this role first assigned?**

- Manually by Organization Administrator or Team Owner

**How many instances of these roles?**

- Min: 0, Max: many
  {{% /card %}}
  {{< /cardpane >}}

{{< alert title="Owners as entitlements, not roles" >}}
It's essential to understand that owners are not roles, but entitlements.

Team owners carry the team administrator role, and may be joined in their team administration duties by any number of other users carrying the team administrator role. However, the team owner also has the administrative privilege to delete the team.

The entitlement of "team owner" is automatically bestowed to the creator of a team. The individual user who created a given team initially is therefore granted certain administrative privileges beyond that of other team administrators. Specifically, team owners retain the sole permission to delete the team.

For more information, see [Teams](/cloud/concepts/identity-and-security/teams).
{{< /alert >}}

## Example: The Orbital Labs Role Hierarchy

The following illustrates how Provider Admin, Org Admin, and Team Admin roles stack in practice across the Orbital Labs ecosystem. See [Meet Five and the Cast](/cloud/getting-started/meet-five) for the full narrative.

<img src="/images/five/layer5-five-mascot-means-business.svg" alt="Five means business" style="width:90px; float:right; margin-left:1.5rem; margin-bottom:1rem;" />

{{< cardpane >}}
{{% card header="**Dr. Aiko Sato** — Provider Admin" %}}
**Organization:** Constellation Cloud  
**Scope:** All tenants (Orbital Labs, Stellar Dynamics, and others)

Dr. Aiko Sato holds the Provider Admin role at Constellation Cloud, the MSP that manages Orbital Labs as a tenant. Provider Admins can perform CRUD on all resources across all tenant organizations. Dr. Sato has seen every misconfigured RBAC policy known to humankind, which is why she documents each one.
{{% /card %}}
{{% card header="**Maya Chen** — Organization Administrator" %}}
**Organization:** Orbital Labs  
**Scope:** All resources within Orbital Labs

Maya Chen holds the Org Admin role for Orbital Labs. She manages user accounts, team membership, workspace creation, and role assignments within Orbital Labs. She also serves as Team Admin for the Development team — an Org Admin may administer any team in their organization.
{{% /card %}}
{{% card header="**Zara Osei** — Team Administrator" %}}
**Organization:** Orbital Labs  
**Team:** Infrastructure  
**Scope:** Infrastructure team members and their workspace access

Zara Osei holds the Team Admin role for Orbital Labs' Infrastructure team. She manages keychain assignments for Five and controls which environments the Infrastructure team can access. Access requests go through Zara's 48-hour SLA — no exceptions, no matter how urgent Five thinks the situation is.
{{% /card %}}
{{< /cardpane >}}

{{< alert type="info" >}}
Role assignments are org-scoped. Dr. Aiko's Provider Admin role spans all tenants; Maya's Org Admin role applies only within Orbital Labs; Zara's Team Admin role applies only to the Infrastructure team within Orbital Labs.
{{< /alert >}}
