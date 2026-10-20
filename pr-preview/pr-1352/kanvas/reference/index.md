# Reference

> Keyboard shortcuts, troubleshooting, help and support, and Kanvas release notes.


Quick reference for day-to-day Kanvas use: keyboard shortcuts, troubleshooting tips, how to reach help and support, and release notes for Meshery Extensions / Kanvas.

## Which plan includes a capability

Entitlements follow the organization's plan: Free, Team Designer, Team Operator, and Enterprise. A capability is available only when the plan includes it, the role grants it, the provider supports it, and, when the capability needs a cluster, the deployment can reach one. Current pricing is at [layer5.io/pricing](https://layer5.io/pricing).

| Capability | kanvas.new | Meshery you run |
| --- | --- | --- |
| Author and edit designs | Available | Available |
| Validate, dry run, deploy, undeploy | Shows a prompt | Available |
| Connect clusters, Operator mode | Shows a prompt | Available |
| Share, publish | Requires an account | Requires an account |

Component caps, checked on save and import, are Personal 100, Team Designer 200, Team Operator 100, and Enterprise 300. Under the local provider, views, the catalog, sharing, and support requests return HTTP 501 Not Implemented.

## Which role can perform an action

Kanvas checks a permission before it offers these actions. When the user does not hold the key, the toolbar hides the action or shows it disabled, and the action sheet on small screens omits it.

| Action | Permission | Also note |
| --- | --- | --- |
| Validate and Dry run | Validate Design | One key controls both. Disabled while the design is empty. |
| Deploy | Deploy Design | Disabled while the design is empty. |
| Undeploy | Undeploy Design | Disabled while the design is empty. |
| Share | Share Design | Also hidden while the design is empty or published. |
| Publish | Publish Design | Anonymous users get a sign-in prompt instead. |
| Add a comment and reply | Add comments | Anonymous users get a sign-in prompt instead. |
| Resolve and reopen a comment | Resolve a comment | |
| @mention someone in a comment | View All Users and Discuss any design by leaving review comments | Both are required. Without them the composer offers no mention picker. |
| Operator mode | None | The provider enables Operator mode. When it does not, the Operator switch is disabled. |

Layer5 Cloud checks Share Design when a design is shared, View Designs when a user reads other members' private designs, the workspace permissions when designs or views are assigned or removed, and Share Views when a view is shared.

Default roles, from the permission list: User and Team Admin hold Validate, Share, Publish, Clone, and View Designs, and Unpublish only on resources they own. They do not hold Deploy or Undeploy. Workspace Admin, Organization Admin, and Provider Admin hold Validate, Deploy, Undeploy, Share, Publish, Unpublish, Clone, and View Designs. Organization Admin is the Org Admin role. Org Billing Manager and the Academy roles hold none of these. Provider Admin holds every permission.

Anonymous users receive the anonymous role. It holds the same canvas permissions as the User role, plus Screenshot Canvas and View help center. It does not hold the Operator terminal, metrics, component details, Add comments, Resolve a comment, Delete comments, or Lock comments permissions.

Anonymous users can read the comments on a design they open, but cannot add, reply to, resolve, or reopen a comment, and cannot @mention anyone. Adding a comment opens the sign-in prompt. Layer5 Cloud enforces the same boundary on its side: it refuses comment notifications, user search, the online users list, and API token creation for an anonymous session, so no one is emailed on behalf of a guest and a guest cannot look up other users.

Kanvas does not check a permission for individual canvas edits (add, delete, clone, copy, lock, style), except adding and resolving comments, which are checked as listed above. Roles carry keys with those names, but removing them does not prevent the edit. Designer mode allows authoring. Operator mode does not. Live cluster nodes are read-only in every mode. A user edits a design they own or one shared with them.

The Kanvas interface does not check a permission before it opens a terminal session, streams container logs, or runs a performance test. Layer5 Cloud defines Stream container logs, Perform performance test in Operator, and Select performance profile in Operator. By default only Organization Admin and Provider Admin hold them.

A custom role bundles keychains the default roles do not combine, so a group can receive Validate Design without Deploy Design. Only a Provider Admin creates a custom role. On hosted Layer5 Cloud an organization cannot create one itself. On a self-hosted deployment the operator's Provider Admins can. In Kanvas, a custom role changes what is offered only for the actions in the table above. See [Roles](/pr-preview/pr-1352/cloud/concepts/identity-and-security/roles/).

