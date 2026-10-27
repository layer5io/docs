# Workspaces


> Understand the core concepts of Workspaces.



A workspace is a named grouping inside an organization. It brings together the teams who do a piece of work, the environments they deploy to, and the designs and views they work on. A workspace does two separate jobs:

- **It organizes resources.** Designs and views live in a workspace, and the workspace decides which organization they are listed under.
- **It grants connection access.** Assigning a team to a workspace gives that team's members read-only access to the connections in the workspace's environments. That is the only access a team assignment grants.

You can create Workspaces to group related Designs and Environments and to decide which teams can read which connections.

## Key Features

- **Connection access:** Assigning a team grants read-only access to the connections, and their credentials, in the workspace's environments.
- **Logical Grouping:** Within Workspaces, you can group related environments, designs, and views.
- **Organization-wide visibility:** Every member of an organization can list and open every workspace in that organization. Team assignment does not narrow what you see.
- **One design, one workspace:** A design or view belongs to at most one workspace. Assigning it moves it.
- **The last workspace stays:** An organization always keeps at least one workspace.

### Workspace Relationships and Restrictions

- Every member of the organization can list and open every workspace. Team membership does not hide workspaces.
- A workspace may have zero or more environments. Creating a workspace assigns no team and no environment.
- A team assignment grants read-only access to connections in those environments. It does not grant access to designs or views.
- One or more teams can be assigned to a workspace, and the same team can be assigned to more than one workspace. The team must belong to the workspace's organization.

After creating a Workspace, assign teams, move designs into the Workspace, and associate one or more Environments so those Environments' connections become readable by the workspace's teams.

Like a shared drive (or shared collection of files), Workspaces are your Google Drive, while Designs are your Google Docs.

## Key Workspace Components

### Environments

- Environments are a central part of a workspace. They serve as a logical grouping for managing connections. A connection, in this context, can be either managed or discovered. Examples of connections include Kubernetes clusters, Prometheus instances, Jaeger traces, Nginx servers, and more.
- One or more environments can be assigned to a workspace.
- Same environment can be assigned to multiple workspaces.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Assigning Environments to Workspaces</h4>
  
      Assign any number of Environments to one or more Workspaces. See <a href="/pr-preview/pr-1365/cloud/concepts/spaces/environments/">Environments</a> section for more information.
  
</div>



### Profiles

- A profile represents a person or persona in the organization and groups the connections it publishes through.
- Assigning a profile to a workspace makes it visible to the members of the workspace's teams.
- The same profile can be assigned to multiple workspaces. See [Profiles](/pr-preview/pr-1365/cloud/concepts/spaces/profiles/).

### Designs

- A design or view belongs to at most one workspace. Assigning it to a workspace is a move, not a copy: Layer5 Cloud removes every earlier workspace assignment, then adds the new one.
- The workspace a design sits in decides the organization under which the design is listed, and the organization in which the Share Design permission is checked.
- Placing a private design in a workspace does not open it to the workspace's teams. Share the design to give someone access. See [Sharing Designs](/pr-preview/pr-1365/kanvas/designer/sharing/).
- When you list the designs you can add to a workspace, the list shows only designs you own that are not already in it.
- Moving a design requires the Assign Designs to Workspaces permission in the destination workspace's organization. Layer5 Cloud does not also require access to the workspace the design leaves.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Design Ownership in Workspaces</h4>
  
      Designs belong to only one Workspace at any given time. Ownership does not change when a design moves. See <a href="https://docs.meshery.io/concepts/designs">Designs</a> section for more information.
  
</div>



### Teams

- A Workspace is closely associated with Teams. Teams are groups of users with varying permissions, and they are at the center of resource access and management within a Workspace.
- One or more teams can be assigned to a workspace.
- Same team can be assigned to multiple workspaces.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Team Access Control in Workspaces</h4>
  
      Team assignment grants read-only access to the connections in the workspace&rsquo;s environments. It does not grant access to designs, and it does not decide who can see the workspace. See <a href="/pr-preview/pr-1365/cloud/concepts/identity-and-security/teams/">Teams</a>.
  
</div>



### Connections

- Connections refer to various resources that can be either managed or unmanaged, but are discovered and made accessible for use. Examples of Connections include Kubernetes clusters, Prometheus instances, Jaeger services, Nginx deployments, and more. These Connections serve as a fundamental part of Workspaces, as users can deploy infrastructure designs within the context of these Connections.
- Connections can be assigned to one or more environments.
- Same connection can be assigned to multiple environments.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Learn More About Connections</h4>
  
      See <a href="https://docs.meshery.io/concepts/logical/connections">Connections</a> section for more information.
  
</div>



## Best Practices

To make the most of Workspaces, here are some best practices:

- Clearly define permissions in the form of team assignment to ensure proper access control.
- Use Infrastructure Designs to standardize resource deployments.
- Regularly review and update your Workspace's resources and configurations.

Workspaces enhance collaboration within your teams, providing a structured environment for sharing and managing resources. By following best practices and understanding the core components of Workspaces, you can maximize the benefits of this feature.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Looking for Practical Workspace Management?</h4>
  
      For a step-by-step guide on how to create, edit, and manage your workspaces, see the <a href="/pr-preview/pr-1365/cloud/guides/workspaces/managing-workspaces/">Managing Workspaces</a> documentation.
  
</div>



## Example: Orbital Labs Workspace Setup

The following illustrates how Five and Maya set up workspaces at Orbital Labs to segment access across infrastructure and development workflows. See [Meet Five and the Cast](/pr-preview/pr-1365/cloud/getting-started/meet-five/) for the full seed inventory.

### Workspace Inventory

| Workspace | Owner Org | Teams with Access | Environments |
|---|---|---|---|
| `orbital-production` | Orbital Labs | Infrastructure only | `prod-aws` (EKS + RDS + S3 + CloudFront + SQS), `prod-gcp` (GKE + Cloud SQL + Cloud Storage + Pub/Sub) |
| `orbital-staging` | Orbital Labs | Infrastructure + Development | `staging-aws` (EKS + S3 + ElastiCache), `staging-azure` (AKS + Azure Blob + Azure Service Bus) |
| `orbital-dev` | Orbital Labs | Development only | `dev-local` (kind + LocalStack) |

### Creating orbital-staging

Five creates the `orbital-staging` workspace to give the Development team a shared environment for feature-branch testing  -  without handing them the keys to production.

**Steps Five follows:**
1. Navigate to **Workspaces** and click **Create Workspace**
2. Name the workspace `orbital-staging`
3. Save  -  the workspace is created with no team access and no environments assigned

**Maya then assigns team access:**
1. Open the `orbital-staging` workspace settings
2. Add the **Infrastructure** team so its members can read the connections in the workspace's environments
3. Add the **Development** team so its members can read those same connections







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Why both teams?</h4>
  
      Assigning a team grants read-only connection access, not design access. Infrastructure and Development can both read the staging connections. Development still cannot read production connections, because it is not assigned to <code>orbital-production</code>. To let Rex or Jordan open a private design, share that design with them.
  
</div>



## Organization-wide visibility

Workspace visibility is organization-wide. Every member of an organization can list and open every workspace in that organization, whether or not one of their teams is assigned to it. The Workspaces, Environments, and connection areas of the Cloud UI appear only to people who hold the matching View Workspace, View Environment, and View Connections permissions.

A workspace belongs to exactly one organization for its whole life. Editing a workspace changes its name, description, or metadata, never its organization.

## What a team assignment grants

A member of a team reaches a connection through four live links. Breaking any one of them ends the access.

| Link | Created by | Broken by |
| --- | --- | --- |
| 1. User is a member of a team | Adding the user to the team | Removing the user from the team |
| 2. Team is assigned to a workspace | Assign team to workspace | Removing the team from the workspace, or deleting the workspace |
| 3. Environment is assigned to the workspace | Assign environment to workspace | Removing the environment from the workspace, or deleting either one |
| 4. Connection is assigned to the environment | Assign connections to environment | Removing the connection from the environment, or deleting the environment |

The result is read-only. Modifying or deleting a connection still requires owning it. Two other routes reach a connection independently of this chain: owning it, and holding the View All Organizations key. See [Environments](/pr-preview/pr-1365/cloud/concepts/spaces/environments/).

## One workspace per design

Because a design sits in at most one workspace, promotion from one workspace to another is a move. There is no approval step and no copy. The same rule applies to views. Removing a design from its workspace leaves it with no workspace. The design and its owner are unaffected.

## The last workspace

Every organization receives a workspace when it is created, so designs always have somewhere to live. Layer5 Cloud creates **My Workspace** in any organization that has no workspace.

An organization always keeps at least one workspace. Deleting the last one is refused with `cannot delete workspace: at least one workspace must exist for the organization`. Two simultaneous deletes cannot both succeed and leave the organization empty.

Deleting a workspace ends every team, environment, design, and view assignment it holds, in one step. The teams, environments, designs, views, and connections themselves remain. Designs and views that were in the workspace are left in no workspace until you assign them to another one. Team members lose any connection access that flowed through the deleted workspace.

## Names, edits, and activity

A name and description are each limited to 255 characters. Names are not unique: two workspaces in one organization can share a name. An edit changes only the fields you send.

Each workspace records an activity log: creating, editing, and deleting the workspace, and assigning or removing teams, environments, designs, and views. Every entry carries the email address of the person who acted. Reading the log requires the View Workspace permission.

## Permissions

Every workspace action is checked in the organization that owns the workspace. Creating a workspace is checked in the organization you create it in. The keys are View Workspace, Create Workspace, Edit Workspace, Delete Workspace, Assign team to workspace, Remove team from workspace, Assign environment to workspace, Remove environment from workspace, Assign Designs to Workspaces, Remove Designs from Workspaces, Assign Views to Workspace, and Unassign Views from Workspace. Default holders are in [Default Permissions](/pr-preview/pr-1365/cloud/reference/default-permissions/).

Layer5 Cloud enforces no plan check on workspace actions. Creating, editing, deleting, and assigning work the same on every plan, governed only by those permissions.

## Related

- [Managing Workspaces](/pr-preview/pr-1365/cloud/guides/workspaces/managing-workspaces/) covers creating, editing, and deleting workspaces and assigning their members.
- [Environments](/pr-preview/pr-1365/cloud/concepts/spaces/environments/) explains the deploy targets a workspace exposes.
- [Promote a Design](/pr-preview/pr-1365/cloud/guides/tutorials/promoting-a-design/) moves a design from a staging workspace to a production workspace.

