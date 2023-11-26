---
title: Roles
description: >
  Roles map permissions to users. Roles contain any number of keychains, which contain any number of keys (permissions). Assign roles to users to grant permissions. 
date: 2023-10-30
categories: [Security]
tags: [roles, permissions]
---
Roles map permissions to users. Roles contain any number of keychains, which contain any number of keys (permissions). Assign roles to users to grant permissions.

![roles](/cloud/security/images/roles-overview.svg "image-center-no-shadow")


## Provider Admin Role

{{< cardpane >}}
{{% card header="### Provider Admin Role" %}}
![](/cloud/security/images/role-provider-admin.svg)
{{% /card %}}
{{% card %}}

**What is the purpose of this role?**

- Used for administration of Layer5 Cloud.
- Used for debugging and monitoring.
- Applicable to platform engineering team and on-prem users.

**Who can assign this role?**

- Provider Admins

**When this role first assigned?**

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
{{% card header="### Organization Adminstrator" %}}

**What is the purpose of this role?**

- Administration of an organization

**Who can assign this role?**

- The Organization Owner

**When this role first assigned?**

- Creation of new organization or User Account creation

**How many instances of these roles?**

- Min: 1, Max: many (based on plan)
- By default, the first Organization Admin is the owner (the creator of the organization).

**Who can remove assignment of this role?**

- Organization Owner

{{% /card %}}
{{% card header="### Organization Billing Manager" %}}

**What is the purpose of this role?**

- Administration of subscriptions, plans, payments, billing methods and information, spending limits, invoice mgmt etc.

**Who can assign this role?**

- Organization Owner

**When this role first assigned?**

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

For more information, see [Organization](/cloud/identity/organizations).
{{< /alert >}}

## Team Roles

{{< cardpane >}}
{{% card header="### Team Adminstrator" %}}
**What is the purpose of this role?**

- Administration of teams

**Who can assign and unassign this role?**

- Organization Administrator or Team owner

**When this role first assigned?**

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

**When this role first assigned?**

- Manually by Organization Administrator or Team Owner

**How many instances of these roles?**

- Min: 0, Max: many
{{% /card %}}
{{< /cardpane >}}

{{< alert title="Owners as entitlements, not roles" >}}
It's essential to understand that owners are not roles, but entitlements.

Team owners carry the team administrator role, and may be joined in their team administration duties by any number of other users carrying the team administrator role. However, the team owner also has the administrative privilege to delete the team.

The entitlement of "team owner" is automatically bestowed to the creator of a team. The individual user who created a given team initially is therefore granted certain administrative privileges beyond that of other team administrators. Specifically, team owners retain the sole permission to delete the team.

For more information, see [Teams](/cloud/identity/teams).
{{< /alert >}}


