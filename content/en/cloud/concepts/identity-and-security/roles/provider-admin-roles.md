---
title: Provider Admin Role
description: >
  Provider Administrator Role is used for administration of Layer5 Cloud.
weight: 1
categories: [security]
tags: [permissions]
draft: true

---

{{< cardpane >}}
{{% card %}}
<img src="../images/role-provider-admin.svg" />
{{% /card %}}
{{% card header="## Provider Administrator" %}}

**What is the purpose of this role?**

- Used for administration of Layer5 Cloud.
- Used for debugging and monitoring.
- Applicable to platform engineering team and on-prem users.

**Who can assign this role?**

- Provider Admins

**When this role first assigned?**

- On ☁️ boot-up (using build args)

**How many instances of these roles?**

- Any number, on every plan. Layer5 Cloud does not guard the last Provider Admin. A Provider Admin can remove the role from every Provider Admin, themselves included. Only a Provider Admin assigns or removes provider roles (Provider Admin, Kanvas, and Curator). Kanvas is granted automatically at sign-up and holds no keychains. Curator holds no keychains in a default install.

**Who can remove assignment of this role?**

- Provider Admins

**What permissions does this role have?**

- Can create, view, edit and delete every resource

{{% /card %}}
{{< /cardpane >}}
