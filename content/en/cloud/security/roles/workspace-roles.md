---
title: Default Workspace Roles
description: >
  By default, Workspaces have two roles available: Workspace Administrator and Workspace Manager.
weight: 2
categories: [Identity]
tags: [workspaces]
---

{{< cardpane >}}
{{% card header="Default Workspace Roles" %}}
<img src="/cloud/identity/images/organization-administrator-and-organization-billing-manager.svg" link="images/organization-administrator-and-organization-billing-manager.svg"  width="100%" alt="Organization Administrator and Organization Billing Manager " />
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}

{{% card header="## Workspace Administrator" %}}

**What is the purpose of this role?**

- Administration of a workspace along with curation of content for the organization's catalog (for each organization for which the user has this role assigned)

**Who can assign this role?**

- Organization Administrators or Workspace Owner

**When this role first assigned?**

- Creation of a new workspace

**How many instances of these roles?**

- Min: 1, Max: many
- By default, the first Workspace Administrator is the owner (the creator) of the Workspace.

**Who can remove assignment of this role?**

- Organization Administrators or Workspace Owner

**What permissions does this role have?**

- Check [Permissions](cloud/identity/organizations/org-permissions/)

{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}
{{% card header="## Workspace Manager" %}}

**What is the purpose of this role?**

- Management and administration of the various workspace resources

**Who can assign this role?**

- Organization Administrators or Workspace Administrators

**When this role first assigned?**

- Manually by Organization Administrators or Workspace Administrators

**How many instances of these roles?**

- Min: 0, Max: many

**Who can remove assignment of this role?**

- Organization Administrators or Workspace Administrators

**What permissions does this role have?**

- Check [Permissions](/cloud/identity/teams/org-permissions/)

{{% /card %}}
{{< /cardpane >}}
