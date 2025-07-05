---
title: Default Organization Roles
description: >
  By default, Organizations have two roles available: Organization Administrator and Organization Billing Manager.
weight: 2
categories: [Security]
tags: [orgs, roles]
---

{{< cardpane >}}
{{% card header="Default Organization Roles" %}}
<img src="/cloud/security/images/organization-roles.svg" link="images/organization-roles.svg"  width="100%" alt="Organization Roles" />
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

- Check [Permissions Reference](/cloud/reference/default-permissions/)

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

- Check [Permissions Reference](/cloud/reference/default-permissions/)

{{% /card %}}
{{< /cardpane >}}



## Additional Role Behaviors and Management

### What happens if the Users role is removed?

If a user’s user role is removed from an organization, they lose access to:
- organizations dashhboards and data
- Any features restricted to authenticated org members
- Workspace collaboration for that org

The user will still exist on the platform, but will appear unassigned for that organization.


### Role Assignments Across Multiple Organizations

Roles are organizations-specific in Layer5 Cloud. This means:
- A user can have different roles in different orgs (e.g.,admin in one,viewer in another)
- Changes to roles in Org A have no impact on Org B

### Assigning Keychains to Roles

To securely enable access for automations:
1. Navigate to Security → Keychains
2. Choose a keychain from the list
3. Use the asssign role dropdown to select which roles can use it

This lets roles use tokens or credentials for deployments or API usage.


### Creating Custom Roles

Admins can define new roles tailored to their team’s needs:
- Go to Organization Settings → Roles
- Click create role
- Select desired permissions from a checklist
- Save and assign to users
Custom roles allow more control than the default Admin/Billing Manager.

### Updating, Deleting, and Exporting Roles ,

-Update: Open a role, edit permissions, and save.
- Delete: Available only for custom roles not currently in use.
- Export: Download your role definitions (JSON/YAML) for backup or import.




