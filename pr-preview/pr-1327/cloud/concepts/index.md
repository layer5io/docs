# Concepts

> How users, organizations, teams, workspaces, environments, designs, the catalog, and roles relate to each other in Layer5 Cloud.


Layer5 Cloud organizes people, infrastructure, and designs into a small set of building blocks. Every permission check, every sharing decision, and every page in the rest of this documentation assumes you know how those blocks fit together. This page gives you that mental model in one place, then points you to the concept page for each block.

## The building blocks

- **User.** One person's account and identity. A user exists independently of any organization, can own resources such as workspaces, designs, connections, and tokens, and is the actor every action is attributed to.
- **Organization.** The unit of tenancy and the core security boundary. Teams and workspaces belong to an organization, and resources, billing, and access control are isolated per organization.
- **Team.** A group of users inside one organization. Teams are how you grant a set of people access to workspaces and to the resources in them.
- **Workspace.** A shared space inside an organization where teams collaborate. A workspace groups designs and environments, much as a shared drive groups documents.
- **Environment.** A named group of connections, such as Kubernetes clusters or Prometheus instances, and the credentials they use. Assigning an environment to a workspace makes its connections available to that workspace.
- **Design.** A description of infrastructure that you author in Kanvas and deploy through Meshery. A design is owned by a user and lives in at most one workspace.
- **Catalog.** The public collection of published designs. Anyone can browse it; signed-in users with the right permission can clone from it.
- **Connection.** A resource that Meshery Server registers with Cloud, including the Meshery Server itself. A connection is owned by the user who registered it.

## How the building blocks relate

| Relationship | Cardinality | What it means |
| :--- | :--- | :--- |
| User and organization | Many-to-many | A user can belong to any number of organizations, and an organization has any number of users. |
| Organization to team | One-to-many | A team belongs to the organization it is created in. An organization can have any number of teams. |
| User and team | Many-to-many | A team can have any number of users, and a user can belong to any number of teams. |
| Organization to workspace | One-to-many | Organizations own workspaces. Each workspace belongs to one organization. |
| Team and workspace | Many-to-many | A workspace can have zero or more teams, and a team can have access to several workspaces. |
| Workspace and environment | Many-to-many | A workspace can have zero or more environments, and the same environment can be assigned to several workspaces. |
| Environment and connection | Many-to-many | An environment groups any number of connections, and the same connection can be assigned to several environments. |
| Workspace to design | One-to-many | A design belongs to at most one workspace at a time. Assigning a design to a workspace moves it out of its previous workspace. |
| User to connection | One-to-many | Connections, including registered Meshery Servers, are owned by a user. Each user sees their own connections. |
| Design to catalog | Many-to-one | Published designs appear in the one public catalog, where others can view them and clone them. |

Team membership grants access through workspaces, not directly. A user who does not own a connection reaches it through a team that has access to a workspace, which has an environment, which contains the connection. That path grants read-only access to the connection.

## How roles, keys, and keychains attach

Authorization in Layer5 Cloud has three layers, and each attaches to a different block:

- **Keys** are the atomic permissions. Each key names one operation, such as creating a workspace or cloning a design.
- **Keychains** group related keys.
- **Roles** carry keychains and are assigned to users. Roles are evaluated per organization, so the same person can hold different roles, and therefore different capabilities, in each organization they belong to. Roles are assigned at different levels of the hierarchy: provider, organization, team, and workspace.

The built-in roles are Provider Admin, Organization Admin, Organization User, Team Admin, Workspace Admin, Workspace Manager, Environment Management, Curator, and Kanvas. The Kanvas role is global rather than scoped to an organization: it grants the Kanvas extension capabilities when a Meshery Server connects to Cloud on your behalf.

Separately from roles, an individual resource such as a single design can be shared with a specific user. That grant covers only that resource and works across organization boundaries, which is what makes cross-organization collaboration possible.

## What every new account gets

Cloud provisions a default organization, team, and workspace the first time a new account signs in successfully, not when the sign-up form is submitted. You can rename the organization and the workspace at any time.

| Created | Name and description | Your relationship to it |
| :--- | :--- | :--- |
| Organization | My Organization, "Default Organization" | Owner, with the Organization Admin role |
| Team | My Team, "Default Team", attached to My Organization | Team Admin role |
| Workspace | My Workspace, "Default Workspace", in My Organization | Owner |
| Global role | Kanvas | Assigned to every new user |

If any of your organizations has no workspace, Cloud creates My Workspace in it for you.

## Explore each concept

- [Identity and Security](/pr-preview/pr-1327/cloud/concepts/identity-and-security/) explains organizations, teams, users, roles, keychains, keys, sessions, and tokens.
- [Workspaces](/pr-preview/pr-1327/cloud/concepts/workspaces/) explains the collaboration boundary for teams, environments, and designs, and [Environments](/pr-preview/pr-1327/cloud/concepts/environments/) explains how connections are grouped into deploy targets.
- [Catalog](/pr-preview/pr-1327/cloud/concepts/catalog/) explains how designs are published, discovered, and cloned.
- [Meshery Server Registration](/pr-preview/pr-1327/cloud/concepts/meshery-server-registration/) explains how a Meshery Server registers with Cloud and how Cloud recognizes it on every later connection.

## How the pieces run

To see how Layer5 Cloud, Meshery Server, and Kanvas divide the work between them, read [How Layer5 Cloud Works with Meshery and Kanvas](/pr-preview/pr-1327/cloud/concepts/architecture/) and [How Kanvas Works with Meshery and Layer5 Cloud](/pr-preview/pr-1327/kanvas/concepts/architecture/).

