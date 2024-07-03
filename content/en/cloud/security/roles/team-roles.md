---
title: Default Team Roles
description: >
  By default, Organizations have two roles available: Team Admins and Team Managers.
weight: 3
categories: [Identity]
tags: [teams]
---

{{< cardpane >}}
{{% card header="Default Team Roles" %}}
<img src="/cloud/identity/images/team-admins-and-team-managers.svg" link="images/team-admins-and-team-managers.svg"  width="100%" alt="Team Admin and Team managers" />
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}
{{% card header="## Team Administrator" %}}

**What is the purpose of this role?**

- Administration of teams

**Who can assign this role?**

- Organization Administrator or Team owner

**When this role first assigned?**

- Creation of new team or User Account creation

**How many instances of these roles?**

- Min: 1, Max: many (based on plan)
- Only first Team Admin would be the owner

**Who can remove assignment of this role?**

- Organization Administrator or Team owner

**What permissions does this role have?**

- Check [Permissions Reference](/cloud/reference/default-permissions/)

{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}
{{% card header="## Team Manager" %}}

**What is the purpose of this role?**

- Administration of teams (without delete access)

**Who can assign this role?**

- Organization Administrator or Team Owner

**When this role first assigned?**

- Manually by Organization Administrator or Team Owner

**How many instances of these roles?**

- Min: 0, Max: many (based on plan)

**Who can remove assignment of this role?**

- Organization Owner or Team Owner

**What permissions does this role have?**

- Check [Permissions Reference](/cloud/reference/default-permissions/)

{{% /card %}}
{{< /cardpane >}}
