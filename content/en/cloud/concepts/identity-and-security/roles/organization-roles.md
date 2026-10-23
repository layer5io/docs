---
title: Default Organization Roles
description: >
  Organization-scoped roles include Organization Administrator. There is no Organization Billing Manager role.
weight: 2
categories: [security]
tags: [orgs, roles]
aliases:
  - /cloud/security/roles/organization-roles/

---

{{< cardpane >}}
{{% card header="Default Organization Roles" %}}
<img src="../images/organization-roles.svg" link="../images/organization-roles.svg"  width="100%" alt="Organization Roles" />
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}

{{% card header="## Organization Administrators" %}}

**What is the purpose of this role?**

- Administration of an organization (for each organization for which the user has this role assigned)

**Who can assign this role?**

- An Organization Admin of that organization, a holder of Assign User Roles there, or a Provider Admin. The person must already be a member, unless the caller is a Provider Admin.

**When this role first assigned?**

- When an authorized administrator assigns it. Creating a user does not assign Organization Admin. The creator of an organization is its owner and keeps administrator access through ownership, which is separate from this role.

**How many instances of these roles?**

- Any number, on every plan. Layer5 Cloud does not stop you removing the last Organization Admin. The owner keeps administrator access through ownership.

**Who can remove assignment of this role?**

- The same people who can assign it. The roles you submit replace the roles held in that organization.

**What permissions does this role have?**

- Check [Permissions Reference]({{< ref "cloud/reference/default-permissions.md" >}})

{{% /card %}}
{{< /cardpane >}}

Layer5 Cloud has no Organization Billing Manager role. The other organization-scoped roles are User, Workspace Admin, Workspace Manager, Academy Admin, and Academy Learner. Organization Admins assign them. Provider Admin can assign any of them. See [Roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}).

The owner of an organization is not a role. Ownership cannot be transferred. The owner can delete the organization. An Organization Admin who is not the owner cannot. A role write replaces the member's roles in that scope. An empty list removes every organization role and keeps the membership. Provider roles cannot be granted in an organization row.
