---
title: Default Workspace Roles
description: >
  Workspace Administrator and Workspace Manager are organization-scoped roles.
weight: 2
categories: [security]
tags: [workspaces, roles]
aliases:
  - /cloud/security/roles/workspace-roles/

---

{{< cardpane >}}
{{% card %}}
<img src="../images/workspace-roles.svg" link="../images/workspace-roles.svg"  width="100%" alt="Workspace Roles" />
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}

{{% card header="## Workspace Administrator" %}}

**What is the purpose of this role?**

- Managing workspaces, environments, teams, and lifecycle actions, and reviewing catalog requests, in each organization where the user holds the role. It is not limited to a single workspace, and there is no Workspace Owner role that assigns it.

**Who can assign this role?**

- An Organization Admin of that organization, a holder of Assign User Roles there, or a Provider Admin

**When this role first assigned?**

- When an authorized administrator assigns it. Creating a workspace does not assign Workspace Admin.

**How many instances of these roles?**

- Any number, on every plan

**Who can remove assignment of this role?**

- The same people who can assign it

**Workspace Manager**

Workspace Manager is the other workspace role. It includes workspace, environment, team, and lifecycle management, plus management of designs, environments, and connections inside the workspaces where the user holds the role. It does not include catalog curation. Organization Admins assign it the same way they assign Workspace Admin. See [Roles and Permissions]({{< ref "cloud/reference/default-permissions.md" >}}).

**What permissions does this role have?**

- Check [Permissions Reference]({{< ref "cloud/reference/default-permissions.md" >}})

{{% /card %}}
{{< /cardpane >}}
