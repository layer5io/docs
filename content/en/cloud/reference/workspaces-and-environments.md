---
title: Workspace and Environment Reference
linkTitle: Workspaces and Environments
description: >
  Defaults, limits, scope, permissions by operation, responses, and deletion effects for workspaces and environments.
weight: 35
diataxis: reference
categories: [reference]
tags: [workspaces, environments, api]
---

This page states how workspaces and environments behave, exactly. For the model, read the [Workspaces]({{< ref "cloud/concepts/workspaces.md" >}}) and [Environments]({{< ref "cloud/concepts/environments.md" >}}) concepts. For tasks, use the [workspace guides]({{< ref "cloud/guides/workspaces/_index.md" >}}). For every endpoint's schema, see the [REST API Reference]({{< ref "cloud/reference/api-reference/rest.md" >}}), and for base URL and authentication see the [Cloud API]({{< ref "cloud/reference/api-reference/_index.md" >}}). All paths below sit under `/api`.

## Fields, defaults, and limits

| Property | Workspace | Environment |
| --- | --- | --- |
| Name | Up to 255 characters. Not required or unique on the API. | Up to 255 characters. Not required or unique on the API. |
| Description | Up to 255 characters. May be empty. | Up to 255 characters. May be empty. |
| Organization | Required on create. Fixed for the life of the workspace. | Required on create (`organizationId is required`). Fixed for the life of the environment. |
| Owner | The user who created it. | Not recorded on create. |
| Starting state | No teams, environments, designs, or views. | No connections, in no workspace. |
| Kind | Single kind. | Ordinary when created through the API. Platform-provisioned environments exist and are protected. |
| Update | Only the fields sent change. | Name and description are both replaced; an omitted field becomes empty. |
| Plan check | None. | None. The feature matrix lists environments under Enterprise. |
| Count limits | None. An organization must keep at least one workspace. | None. |

Layer5 Cloud creates **My Workspace** in any organization that has no workspace.

## Scope and visibility

| Question | Answer |
| --- | --- |
| Who sees a workspace or environment in a list? | Every member of its organization. Team membership does not narrow the list. |
| How is the organization chosen? | A list request carries one organization identifier. The all-organizations value needs View All Organizations and otherwise returns HTTP 403. |
| What does a missing or foreign identifier return? | HTTP 404, `workspace not found` or `environment not found`. |
| Can a workspace or environment move to another organization? | No. |
| Which relationships can cross organizations? | None for teams and environments: both must share the workspace's organization (HTTP 403 otherwise). A design assigned to a workspace takes on that workspace's organization. |

## Permissions by operation

Layer5 Cloud checks each key in the organization that owns the workspace or environment. Operations marked UI only are hidden in the interface but not checked by the server.

| Operation | Permission |
| --- | --- |
| `POST /workspaces` | Create Workspace (organization from the request body) |
| `GET /workspaces`, `GET /workspaces/{id}` | UI only (View Workspace); organization scoping applies |
| `PUT /workspaces/{id}` | Edit Workspace |
| `DELETE /workspaces/{id}` | Delete Workspace |
| `POST`, `DELETE /workspaces/{id}/teams/{teamId}` | Assign team to workspace, Remove team from workspace |
| `POST`, `DELETE /workspaces/{id}/environments/{environmentId}` | Assign environment to workspace, Remove environment from workspace |
| `POST`, `DELETE /workspaces/{id}/designs/{designId}` | Assign Designs to Workspaces, Remove Designs from Workspaces |
| `POST`, `DELETE /workspaces/{id}/views/{viewId}` | Assign Views to Workspace, Unassign Views from Workspace |
| `GET /workspaces/{id}/views`, `GET /workspaces/{id}/events` | View Workspace |
| `GET /workspaces/{id}/teams`, `/environments`, `/designs` | None |
| `POST /environments` | Create Environment (organization from the request body) |
| `GET /environments`, `GET /environments/{id}` | UI only (View Environment); organization scoping applies |
| `PUT /environments/{id}` | Edit Environment |
| `DELETE /environments/{id}` | Delete Environment |
| `POST`, `DELETE /environments/{id}/connections/{connectionId}` | Assign connections to environment, Remove connections from environment |
| `GET /environments/{id}/connections` | View Environment |

Default holders by role:

{{< keys-matrix caption="Workspace and environment permissions" functions="View Workspace|Create Workspace|Edit Workspace|Delete Workspace|Assign team to workspace|Remove team from workspace|Assign environment to workspace|Remove environment from workspace|Assign Designs to Workspaces|Remove Designs from Workspaces|View Environment|Create Environment|Edit Environment|Delete Environment|Assign connections to environment|Remove connections from environment|View Connections" >}}

## List parameters

| Parameter | Applies to | Meaning |
| --- | --- | --- |
| `orgId` | Workspace and environment lists | The organization to list. Required. |
| `search` | All lists | Case-insensitive match on name or description. |
| `order` | All lists | Order by `created_at` or `updated_at`. Environment connection lists also accept `name`. Default is newest first. |
| `page`, `pageSize` | All lists | Zero-based page and page size. |
| `filter` | Lists of a workspace's teams, environments, designs, views, and an environment's connections | `{"assigned": true}` (default) lists what is in; `{"assigned": false}` lists what is not yet in. For designs, the not-yet-in list holds only designs the caller owns. |
| `visibility` | Lists of a workspace's designs and views | Repeatable. Keeps only designs or views with that visibility. |

## Responses

| Operation | Condition | Response |
| --- | --- | --- |
| Create workspace | Organization missing or malformed | HTTP 400, `organizationId is required` or `invalid organizationId format` |
| Create workspace | Name or description over 255 characters | HTTP 500, `Unable to create workspace` |
| Update workspace | Empty or `null` body | HTTP 400, `Unable to update workspace` |
| Update or delete workspace | Not in the caller's organizations | HTTP 404, `workspace not found` |
| Delete workspace | Last live workspace in the organization | HTTP 500, `cannot delete workspace: at least one workspace must exist for the organization` |
| Assign team or environment | Team or environment in another organization | HTTP 403, `unable to add team to workspace` or `unable to add environment to workspace` |
| Assign environment | Platform-provisioned environment | HTTP 403, `this environment is provisioned by the platform and cannot be added to a workspace` |
| Remove environment from workspace | Never attached | HTTP 404, `no such environment assignment` |
| Create environment | Organization missing | HTTP 400, `organizationId is required` |
| Delete environment | Platform-provisioned | HTTP 403, `this environment is provisioned by the platform and cannot be deleted here` |
| Delete environment | No live environment | HTTP 404, `no environment with the requested id` |
| Assign connection | Platform-provisioned environment | HTTP 403, `this connection cannot be assigned to this environment` |
| Remove connection | Platform-provisioned environment | HTTP 403, `this connection cannot be detached from this environment` |
| Remove connection | Never assigned | HTTP 404, `no such connection assignment` |

Assigning a team or environment that is already assigned succeeds and returns the existing assignment. Every workspace create, update, delete, assign, and unassign writes an event to the workspace's activity log, and a failure writes an error event.

## What deletion ends

| Deleting a | Ends | Leaves in place |
| --- | --- | --- |
| Workspace | Team, environment, design, and view assignments | Teams, environments, connections, designs, views, and their owners |
| Environment | Connection assignments and workspace attachments | Connections, credentials, workspaces, and the connections' other environments |

Access that flowed through a deleted or detached link ends at once. See [Access to connections and credentials]({{< ref "cloud/concepts/environments.md#access-to-connections-and-credentials" >}}).
