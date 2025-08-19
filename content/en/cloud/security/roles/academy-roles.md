---
title: Default Academy Roles
description: >
  By default, Academy has two roles available: Academy Administrator and Learner.
weight: 4
categories: [Security]
tags: [academy, roles]
---

{{< cardpane >}}
{{% card header="Academy Administrator" %}}
<img src="/cloud/security/images/academy-admin.svg" link="images/academy-admin.svg"  width="100%" alt="Academy Administrator Roles" />
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}

{{% card header="## Academy Administrator" %}}

**What is the purpose of this role?**

- Management of an organization's academy, learner management, and access to academy instructor console.

**Who can assign this role?**

- Organization Administrators

**When this role first assigned?**

- Manually assigned by an Organization Administrator.

**How many instances of these roles?**

- Min: 0, Max: many

**Who can remove assignment of this role?**

- Organization Administrators

**What permissions does this role have?**

- Check [Permissions Reference](/cloud/reference/default-permissions/)

{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}
{{% card header="Learner" %}}
<img src="/cloud/security/images/learner.svg" link="images/learner.svg"  width="100%" alt="Learner Roles" />
{{% /card %}}
{{< /cardpane >}}

{{< alert title="Managing Learner Costs" color="info" >}}
While the maximum number of instances is unlimited, the available seats for Learners is determined by your organization's subscription plan. Please be mindful of your subscription to manage costs effectively.

{{< /alert >}}

{{< cardpane >}}

{{% card header="## Learner" %}}

**What is the purpose of this role?**

- To enroll in academy content within the organization's academy.

**Who can assign this role?**

- Organization Administrators or Academy Administrators

**When this role first assigned?**

- Automatically to users who join through a special learner invite link
- Manually by an Organization Administrator or Academy Administrator

**How many instances of these roles?**

- Min: 0, Max: many

**Who can remove assignment of this role?**

- Organization Administrators or Academy Administrators

**What permissions does this role have?**

- Check [Permissions Reference](/cloud/reference/default-permissions/)

{{% /card %}}
{{< /cardpane >}}