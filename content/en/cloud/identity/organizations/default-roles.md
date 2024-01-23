---
title: Default Roles
description: >
  By default, Organizations have two roles available: Organization Administrator and Organization Billing Manager.
date: 2024-01-21
weight: 3
categories: [Identity]
tags: [orgs]
---
{{< cardpane >}}
{{% card header="Default Organization Roles" %}}
<img src="/cloud/identity/images/organization-administrator-and-organization-billing-manager.svg" link="images/organization-administrator-and-organization-billing-manager.svg"  width="100%" alt="Organization Administrator and Organization Billing Manager " />
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}

{{% card header="## Organization Administrators" %}}

**What is the purpose of this role?**

- Administration of an organization (for each organization for which the user has this role assigned)

**Who can assign this role?**

- The Organization Owner

**When this role first assigned?**

- Creation of new organization or User Account creation

**How many instances of these roles?**

- Min: 1, Max: many (based on plan)
- By default, the first Organization Admin is the owner (the creator of the organization).

**Who can remove assignment of this role?**

- Organization Owner

**What permissions does this role have?**

- Check [Organization Permissions](cloud/identity/organizations/org-permissions/)

{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}
{{% card header="## Organization Billing Managers" %}}

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

**What permissions does this role have?**

- Check [Organization Permissions](/cloud/identity/teams/org-permissions/)

{{% /card %}}
{{< /cardpane >}}