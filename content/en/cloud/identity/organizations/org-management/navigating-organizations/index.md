---
title: Navigating Organizations
description: >
    Learn how to navigate between different organizations in Layer5 Cloud and understand the order of precedence for organization settings.
weight: 2
categories: [Identity]
tags: [orgs]
---

This guide explains how to switch between organizations in Layer5 Cloud and describes the order of precedence that determines your active organization context.

## Understanding Organization Context

When you work in Layer5 Cloud, your current organization context determines:

- Which resources you can view (designs, environments, connections, workspaces)
- Where new resources are created when you add them
- What permissions and access levels apply to your actions

{{< alert title="Organization-Scoped Experience" type="info" >}}
An organization session scopes the UI, meaning all queries and resources displayed are only from the selected organization. Any new designs, environments, or other resources you create are automatically placed in the currently selected organization.
{{< /alert >}}

## Order of Precedence for Organization Settings

Layer5 Cloud uses the following order of precedence to determine your active organization context:

### 1. Domain (Session Organization)

When you access Layer5 Cloud through a specific domain configured for an organization, that domain setting takes the highest priority in establishing your organization context.

### 2. User Session (Session Organization)

Your user session stores the organization you have actively selected. When you switch organizations using the organization switcher in the UI, this selection is stored in your session and used for subsequent requests.

### 3. Query String (Managed Organizations)

Organization context can be specified via URL query parameters. This is useful for direct links to resources within a specific organization.

### 4. API Parameter (Managed Organizations)

When making API calls, the organization context can be explicitly specified as an API parameter, giving programmatic control over which organization's resources are accessed.

## Switching Organizations

To navigate between organizations in Layer5 Cloud:

1. Locate the organization switcher in the interface (typically found in the navigation area).
2. Click to open the list of organizations you have access to.
3. Select the organization you want to switch to.
4. The UI will refresh to display resources from the newly selected organization.

{{< alert title="Access Requirements" type="info" >}}
You can only switch to organizations where you have active membership. If you need access to an additional organization, contact an Organization Administrator or use an invitation link.
{{< /alert >}}

## Impact of Organization Context

### Resource Visibility

When you switch organizations, the following resources update to reflect the selected organization:

- **Designs**: Only designs belonging to the selected organization are visible.
- **Workspaces**: Only workspaces within the selected organization are accessible.
- **Environments**: Environment configurations specific to the organization are shown.
- **Connections**: Both managed and unmanaged connections scoped to the organization appear.
- **Team Memberships**: Your team memberships and associated permissions within the organization apply.

### Resource Creation

All new resources you create are automatically associated with your currently selected organization:

- New designs are created within the selected organization's context.
- New workspaces are established under the selected organization.
- New connections and credentials are scoped to the selected organization.

{{< alert title="Verify Your Organization Before Creating Resources" type="warning" >}}
Before creating important resources, always verify that you have the correct organization selected. Moving resources between organizations after creation may not always be possible or may require administrative assistance.
{{< /alert >}}

### Permissions and Roles

Your roles and permissions are organization-scoped. This means:

- The same user may have different roles in different organizations.
- Administrative capabilities in one organization do not automatically grant administrative access in another.
- Team memberships and their associated permissions are specific to each organization.

For more details about roles and permissions, see the [Roles documentation](/cloud/security/roles/).
