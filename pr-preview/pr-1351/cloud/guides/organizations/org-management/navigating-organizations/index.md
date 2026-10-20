# Navigating Organizations


> Learn how to navigate between different organizations in Layer5 Cloud and understand the order of precedence for organization settings.



This guide explains how to switch between organizations in Layer5 Cloud and describes the order of precedence that determines your active organization context.

## Understanding Organization Context

When you work in Layer5 Cloud, your current organization context determines:

- Which resources you can view (designs, environments, connections, workspaces)
- Where new resources are created when you add them
- What permissions and access levels apply to your actions







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Organization-Scoped Experience</h4>
  
      An organization session scopes the UI, meaning all queries and resources displayed are only from the selected organization. Any new designs, environments, or other resources you create are automatically placed in the currently selected organization.
  
</div>



An organization can also have child organizations. Your active organization is always the one you have selected, and you can switch only into organizations you are a member of, so see [Child Organizations](../child-organizations/) for how a parent administrator relates to a child.

## Order of Precedence for Organization Settings

Layer5 Cloud resolves the organization for each request from these sources, in this order, and the first source that applies wins. The numbered headings below keep their original names. The order that actually applies is domain, then the `X-Current-Orgid` header, then the saved preference, then the browser session. Layer5 Cloud reads no organization from the query string.

### 1. Domain (Session Organization)

When you access Layer5 Cloud through a specific domain configured for an organization, that domain wins over every other source, including a selection you make in the switcher. The host is matched exactly, with the protocol and port removed. A sign-in page on that domain shows that organization's branding, uses its identity provider, and applies its open invitation. Resolving by domain does not check membership. Every guarded action still checks the permissions you hold in that organization.

The deployment's own base host, IP addresses, and the provider's reserved domains are never treated as custom domains. A domain belongs to at most one organization, including deleted organizations. Lookups are cached for five minutes.

### 2. User Session (Session Organization)

The browser session stores the organization you last selected in the switcher. That value is the fourth source, after the domain, the `X-Current-Orgid` header, and the saved preference. It applies only when it names an organization you are a live member of. Otherwise the request runs with no organization scope. Holders of View All Organizations can name any organization.

Switching organizations also stores a preference, which is a separate, earlier source than the session cookie.

### 3. Query String (Managed Organizations)

Layer5 Cloud does not read an organization from the query string or from any other URL parameter. A link cannot select an organization that way. Use the domain, the `X-Current-Orgid` header, the saved preference, or the session.

### 4. API Parameter (Managed Organizations)

API clients name the organization with the `X-Current-Orgid` header. That header is the second source, after the domain and ahead of the saved preference and the browser session. The value must name an organization you are a live member of, unless you hold View All Organizations, in which case you can name any organization or `all`. The request format is in the [API reference](/pr-preview/pr-1351/cloud/reference/api-reference/).

## Switching Organizations

To navigate between organizations in Layer5 Cloud:

1. Locate the organization switcher in the interface (typically found in the navigation area).
2. Click to open the list of organizations you have access to.
3. Select the organization you want to switch to.
4. The UI will refresh to display resources from the newly selected organization.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Access Requirements</h4>
  
      You can only switch to organizations where you have active membership. Members who hold View All Organizations, a Provider Admin by default, can also select All Organizations. If you need access to an additional organization, contact an Organization Administrator or use an invitation link. A parent administrator who is not a member of a child can edit that child&rsquo;s settings from the parent but cannot switch into the child.
  
</div>



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







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Verify Your Organization Before Creating Resources</h4>
  
      Before creating important resources, verify that you have the correct organization selected. New resources are created in the selected organization and do not follow you when you switch.
  
</div>



### Permissions and Roles

Your roles and permissions are organization-scoped. This means:

- The same user may have different roles in different organizations.
- Administrative capabilities in one organization do not automatically grant administrative access in another.
- Team memberships and their associated permissions follow the selected organization. A role held in a team applies across every organization that team is mapped into.

For more details about roles and permissions, see the [Roles documentation](/pr-preview/pr-1351/cloud/concepts/identity-and-security/roles/).

