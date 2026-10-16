---
title: Manage Environments
description: >
  Create environments, assign and remove connections, edit and delete environments, and know which environments you cannot change.
weight: 20
diataxis: how-to
categories: [spaces]
tags: [environments, connections]
aliases:
  - /cloud/spaces/managing-environments/
  - /cloud/concepts/spaces/managing-environments/
---

An environment groups connections into a deploy target and is the means by which a workspace exposes those connections to its teams. This guide covers every task on an environment. For the model behind it, read the [Environments concept]({{< ref "cloud/concepts/environments.md" >}}).

Each task names the permission it needs. Layer5 Cloud checks the permission in the organization that owns the environment.

{{< keys-matrix caption="Environment permissions" functions="View Environment|Create Environment|Edit Environment|Delete Environment|Assign connections to environment|Remove connections from environment|View Connections" >}}

The feature matrix lists environments under the Enterprise plan. Layer5 Cloud does not refuse environment actions because of the plan.

## Find environments {#view-environments}

**Needs:** View Environment to see the Environments page. The API lists environments for any signed-in member of the organization.

Every member of an organization can list every environment in it, whether or not the environment is attached to a workspace they belong to. A list request names one organization; View All Organizations widens it to every organization. You can search by name or description, order by creation or update time, and page through results.

Environments that Layer5 Cloud provisions for itself appear in the list too. See [Environments you cannot change](#environments-you-cannot-change).

## Create an environment

**Needs:** Create Environment in the organization that will own the environment.

An environment takes a name, a description, and an organization. The organization is required; without it the request fails with `organizationId is required`. The environment stays in that organization for its whole life.

- The Environments page requires a name and an organization. The API does not check that the name is non-empty or unique.
- Name and description are each limited to 255 characters.
- A new environment is empty and attached to no workspace. It is an ordinary environment, which means you can edit and delete it and manage its connections.

## Edit an environment

**Needs:** Edit Environment.

An update replaces both the name and the description with the values you send. A field you leave out becomes empty, so send both every time. Editing never changes the organization and never changes the connections.

## Assign connections to an environment

**Needs:** Assign connections to environment.

Assigning a connection places it in the environment, whether the connection is managed or discovered. One connection can be in any number of environments, and an environment can hold any number of connections.

Assigning a connection also makes its credentials reachable. Who can use it follows the [access rules for connections]({{< ref "cloud/concepts/environments.md#access-to-connections-and-credentials" >}}): the owner, members of teams assigned to a workspace that holds the environment, and holders of View All Organizations.

Layer5 Cloud answers an assignment this way:

| Condition | Result |
| --- | --- |
| The environment exists and is ordinary | The connection is assigned |
| No live environment has that identifier | HTTP 404, `no environment with the requested id` |
| The environment is provisioned by the platform | HTTP 403, `this connection cannot be assigned to this environment` |

Layer5 Cloud checks the permission in the environment's organization. It does not compare the connection's organization with the environment's, and it does not check who owns the connection.

## View the connections in an environment

**Needs:** View Environment.

The connection list of an environment defaults to the connections assigned to it. Switch the filter to see the connections not yet in it, which is the pick list for an assignment. You can search, order by creation time, update time, or name, and page through results.

## Remove connections from an environment

**Needs:** Remove connections from environment.

Removing a connection takes it out of this environment only. The connection and its credential remain, and so does its membership in any other environment. Team members who reached the connection only through this environment lose that access.

| Condition | Result |
| --- | --- |
| The connection is in the environment | It is removed |
| The connection was never assigned | HTTP 404, `no such connection assignment` |
| The environment is provisioned by the platform | HTTP 403, `this connection cannot be detached from this environment` |

## See the environments in a workspace {#see-the-environments-in-a-workspace}

The environments attached to a workspace default to the list of its environments. Switch the filter to list the organization's environments not yet attached, which is the pick list for an attachment. Attaching and detaching are workspace tasks. See [Attach an environment to a workspace]({{< ref "cloud/guides/workspaces/managing-workspaces/index.md#link-environments-to-a-workspace" >}}).

## Delete an environment

**Needs:** Delete Environment.

Deleting an environment ends every connection assignment and every workspace attachment it holds. It deletes no connection, credential, or workspace. Connections that also belong to other environments stay in those. Team members lose the access the environment gave them through workspaces.

| Condition | Result |
| --- | --- |
| The environment is ordinary and live | It is deleted |
| No live environment has that identifier | HTTP 404, `no environment with the requested id` |
| The environment is provisioned by the platform | HTTP 403, `this environment is provisioned by the platform and cannot be deleted here` |
| Any other failure | HTTP 400, `unable to delete environment` |

## Environments you cannot change

Layer5 Cloud provisions some environments itself to hold organization configuration, such as the mail server or sign-in providers. They show in the environment list like any other. The controls on this page refuse them:

- You cannot delete one.
- You cannot assign connections to one or remove connections from one.
- You cannot attach one to a workspace.

An existing attachment of one to a workspace can still be removed. Manage the configuration they hold through the organization guides: [Bring Your Own Mail Server]({{< ref "cloud/guides/organizations/org-management/bring-your-own-mail-server.md" >}}) and [Organization Configuration Scenarios]({{< ref "cloud/guides/organizations/configuration-scenarios/index.md" >}}).
