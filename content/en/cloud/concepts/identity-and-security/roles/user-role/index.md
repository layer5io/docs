---
title: Default User Role
description: >
  By default, members of an Organization are provided a User role.
weight: 3
categories: [security]
tags: [user, roles]
aliases:
  - /cloud/security/roles/user-role/

---

{{< cardpane >}}
{{% card header="Default User Role" %}}
<img src="images/user-role.svg" link="images/user-role.svg"  width="100%" alt="User Role" />
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}
{{% card header="## User" %}}

**What is the purpose of this role?**

- To grant Organization members access to basic features and resources within the context of that Organization.

**Who can assign this role?**

- An Organization Admin of that organization, a holder of Assign User Roles there, or a Provider Admin. Workspace Admin and Team Admin do not assign organization roles. Team scope accepts only Team Admin.

**When this role first assigned?**

- When an authorized administrator assigns it, or when an invitation lists it. Joining an organization does not assign User automatically. A person added with no role is a member who holds no role.

**How many instances of these roles?**

- Any number, on every plan

**Who can remove assignment of this role?**

- The same people who can assign it. Removing the role does not end the membership.

**What permissions does this role have?**

- Check [Permissions Reference]({{< ref "cloud/reference/default-permissions.md" >}})

{{% /card %}}
{{< /cardpane >}}
