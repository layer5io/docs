---
title: Security
description: What can your user do with your project?
date: 2023-10-30
weight: 4
categories: [Security]
tags: [permissions]
---

![roles](roles-overview.svg "image-center-no-shadow")

![provider](images/role-provider-admin.svg#float-left "image-center-no-shadow")


## Default roles and their purpose

{{< cardpane >}}
{{% card header="## Provider Administrators" %}}

**What is the purpose of this role?**

- Administration and operation of Remote Provider. Commonly used by the consulting organization (e.g. platform engineering team) or hosting company.

**Who can assign and unassign this role?**

- Other Provider Admins

**When this role first assigned?**

- Upon initial deployment of the Remote Provider

**How many instances of these roles?**

- Min: 1, Max: many

**What permissions does this role have?**

- Full permission. This role has full control over every organization and all resources

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

{{% /card %}}

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

{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}

{{% card header="## Team Administrators" %}}

**What is the purpose of this role?**

- Administration of teams

**Who can assign and unassign this role?**

- Organization Administrator or Team owner

**When this role first assigned?**

- Creation of new team or User Account creation
- By default, the first Team Admin is owner (the team creator)

**How many instances of these roles?**

- Min: 1, Max: many

{{% /card %}}

{{% card header="## Team Managers" %}}

**What is the purpose of this role?**

- Administration of teams (without delete access)

**Who can assign and unassign this role?**

- Organization Administrators or Team Owner

**When this role first assigned?**

- Upon Team creation.
- Manually by Organization Administrator or Team Owner

**How many instances of these roles?**

- Min: 0, Max: many

{{% /card %}}
{{< /cardpane >}}