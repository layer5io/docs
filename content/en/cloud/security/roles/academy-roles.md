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
Learner = A [User](../roles/user-role.md) who has registered for academy content.
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

**Status as a Learner**

A learner in the academy system has two types of status that work together:

1. **[User](../roles/user-role.md) Account Status**
   - **Active**: Can log in and access academy, register for new courses, continue existing courses
   - **Inactive**: Account is disabled/deleted

2. **Academy Registration Status** - Progress in specific content

| Status      | What it means |
|-------------|-------------|
| registered  | They signed up but haven't started |
| completed   | They finished the course |
| failed      | They didn't pass |
| withdrawn   | They left the course |

**What this means:**
1. Active User + Registered = Ready to start learning
2. Active User + Completed = Finished, show achievements
3. Active User + Failed/Withdrawn = May need re-enrollment
4. Inactive User + Any Status = No academy access (show login prompt)

**Reference:** See the complete [Academy Registration Status schema](https://github.com/meshery/schemas/blob/master/models/v1beta1/academy/academy.go#L16) for technical implementation details.

{{% /card %}}
{{< /cardpane >}}

{{< alert title="API Limitation" color="warning" >}}
The current API only returns registrations with "registered" status. We do not currently retrieve completed, failed, or withdrawn registrations through standard endpoints.
{{< /alert >}}