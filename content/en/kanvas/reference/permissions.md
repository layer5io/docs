---
title: Permissions by Role
description: Which Kanvas actions are checked against a permission, which default role grants each permission, what anonymous users can do, and which actions are limited by mode and ownership instead.
weight: 20
diataxis: reference
categories: [reference]
tags: [permissions, roles, keychains]
---

This page tells you which Kanvas actions require a permission, which default roles grant each permission, and which actions are limited by something other than a permission. Use it to find out why an action is missing for a user and which role grants it.

## How permissions work

A permission is a named key, such as Deploy Design, that allows one action. Keys are grouped into keychains, and a role bundles one or more keychains. Your organization assigns roles to users. Before Kanvas offers certain actions, it checks whether the user holds the matching key. Kanvas uses the shared Layer5 permission set and defines no permissions of its own. See [Roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}) and [Keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}).

## Where Kanvas checks a permission

Kanvas checks a permission before it offers each of the following actions:

| Action | Permission checked | Also note |
|---|---|---|
| Validate and Dry run | Validate Design | One permission controls both actions. Disabled while the design is empty. |
| Deploy | Deploy Design | Disabled while the design is empty. |
| Undeploy | Undeploy Design | Disabled while the design is empty. |
| Share | Share Design | Also hidden while the design is empty or published. |
| Publish | Publish Design | Anonymous users get a sign-in prompt instead. |
| Operator mode | None | The provider enables Operator mode. When the provider does not enable it, the Operator switch is disabled. |

When a user does not hold the permission, Kanvas does not offer the action: the toolbar hides it or shows it disabled, and the action sheet on small screens omits it.

Layer5 Cloud also enforces permissions when it receives a request, independently of the Kanvas interface. It checks Share Design when a design is shared, View Designs when a user reads other members' private designs, the workspace permissions when designs or views are assigned to or removed from a workspace, and Share Views when a view is shared.

## Default role access

The tables below show which default roles grant each design and view permission. They are refreshed automatically from the Layer5 permission list.

- A check mark means the role grants the permission.
- A check mark with an asterisk means the role grants the permission only on resources the user owns.
- A dash means the role does not grant the permission.

{{< keys-matrix caption="Design lifecycle" functions="Validate Design|Deploy Design|Undeploy Design|Share Design|Publish Design|Unpublish Design|Clone Design|View Designs|Assign Designs to Workspaces|Remove Designs from Workspaces" >}}

{{< keys-matrix caption="Views and clusters" functions="View Views|Assign Views to Workspace|Unassign Views from Workspace|Add cluster|View All Kubernetes Clusters" >}}

Org Admin is the Organization Admin role. The roles not shown, Org Billing Manager and the Academy roles, hold none of these permissions. Provider Admin holds every permission.

## Anonymous users

A user is anonymous when no one is signed in or the signed-in account has anonymous status. An anonymous user authors and edits designs. Sharing or publishing a design opens a sign-in prompt that names the feature and offers a single Sign in action.

Anonymous users receive the anonymous role. It holds the same canvas permissions as the User role, plus Screenshot Canvas and View help center. It does not hold the Operator terminal, metrics, or component details permissions.

On [kanvas.new](https://kanvas.new), Validate, Dry run, Deploy, Undeploy, connecting a cluster, and Operator mode open a prompt that directs the user to the [Meshery Playground](https://playground.meshery.io) or a self-hosted Meshery deployment. This applies to signed-in users on kanvas.new as well. See [Feature Availability by Plan]({{< ref "kanvas/reference/feature-availability.md" >}}).

## What is not gated per action

### Canvas editing

Kanvas does not check a permission for individual canvas edits: adding, deleting, cloning, copying, locking, and styling components, shapes, text boxes, sections, and comments; undo and redo; and the pen and pencil tools. Roles carry permissions with these names, but removing them from a role does not prevent the edit. Three things limit canvas editing instead:

- **Mode.** Designer mode allows authoring. Operator mode does not.
- **Node kind.** Live nodes, the resources Kanvas reads from a connected cluster, are read-only in every mode.
- **Design ownership and sharing.** A user edits a design they own or one that is shared with them.

### Operator mode

Operator mode blocks canvas authoring: dropping, editing, duplicating, deleting, and renaming nodes are not allowed. Operator mode is not read-only, though. From Operator, a user still opens terminal and exec sessions and generates load.

### Terminal, log streaming, and performance tests

The Kanvas interface does not check a permission before it opens a terminal session, streams container logs, or runs a performance test. Layer5 Cloud defines the permissions Stream container logs, Perform performance test in Operator, and Select performance profile in Operator. By default, only Organization Admin and Provider Admin hold them.

## Customizing access

A custom role bundles keychains that the default roles do not combine, so a group can receive exactly the permissions it needs, such as Validate Design without Deploy Design. Only a Provider Admin creates a custom role. On hosted Layer5 Cloud an organization cannot create one itself; on a self-hosted deployment the operator's Provider Admins can. In the Kanvas interface, a custom role changes what is offered only for the actions listed in [Where Kanvas checks a permission](#where-kanvas-checks-a-permission); Layer5 Cloud applies its own checks to sharing, private designs, and workspace assignments. See [Roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}).
