# Environments


> Environments are how you organize your deployment targets (whether on-premises servers or cloud services) into resource groups.


An environment is a named group of connections, such as Kubernetes clusters, together with the credentials those connections use. Environments matter for two reasons:

- **An environment is a deploy target.** When you deploy a design, you choose the environment to deploy it to, and the design deploys to that environment's connections.
- **An environment is how a workspace exposes connections.** A workspace never holds connections directly. It holds environments, and teams assigned to the workspace reach the connections inside them.

Group connections the way you deploy: one environment per pipeline stage, region, or purpose. An environment belongs to one organization for its whole life. Editing an environment never changes its organization. Every member of the organization can list and open every environment in it. Team membership does not narrow the list.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Looking for Practical Environment Management?</h4>
  
      For step-by-step instructions on how to view, create, and edit environments, and how to assign connections to an environment or remove them from it, see the <a href="/pr-preview/pr-1356/cloud/guides/workspaces/managing-environments/">Managing Environments</a> guide.
  
</div>



### Assigning Resources to Environments

Assign any number of Connections to an environment whether that Connection is managed or unmanaged (see [MeshSync](https://docs.meshery.io/concepts/architecture/meshsync) to learn more about managed and unmanaged Connections). In-turn, assign any number of Environments to one or more [Workspaces](/pr-preview/pr-1356/cloud/concepts/spaces/workspaces/). Connections (and any associated Credentials) that are assigned to an Environment become immediately available for use in any associated Workspace.

### Sharing Resources between Environments

Environments can share resources. For example, you might create an environment named "production" and assign three connections: a GitHub connection, a Kubernetes connection, and a Prometheus connection. Subsequently, you also define an environment named "dev/test" and assign three connections: a different Kubernetes connection, a different Prometheus connection, _and_ the same GitHub connection that is also assigned to the "production" environment.

### Deleting an Environment

Deleting an environment does not delete any resources (e.g. connections) currently contained in the environment. Resources that belong to other environments will continue to belong to those other environments. Learn more about the behavior of [lifecycle of connections](https://docs.meshery.io/concepts/logical/connections). For the steps themselves, see [Delete an Environment](/pr-preview/pr-1356/cloud/guides/workspaces/managing-environments/#delete-an-environment).

## Summary

Environments represent a collection of resources in the form of Connections - both of managed and unmanaged Connections. Environment resources are comprised of Connections (and implicitly any Credentials used by those assigned Connections). Create and use environments to organize your connections and credentials into groups, and then make these resources available to you and your teams by assigning environments to Workspaces.

## Key Features

- **Logical Grouping** Environments allow you to logically group related connections and their associated credentials. This makes it easier to manage, share, and work with a subset of resources instead of dealing with all your connections individually.

- **Resource Sharing** Environments can be seamlessly assigned to [Workspaces](/pr-preview/pr-1356/cloud/concepts/spaces/workspaces/), another essential concept in Meshery. When you assign an Environment to a Workspace, you enable resource sharing among team members. This collaborative approach simplifies the sharing of connections and resources, making it easier to work together in cloud native environments.

## Key Components

### Connections

Connections are an integral part of Environment. These are cloud native resources that can be both managed and unmanaged, and they're registered by the Meshery Server. Examples of connections include Kubernetes clusters, Prometheus instances, Jaeger tracers, and Nginx web servers.

> See "[Connections](https://docs.meshery.io/concepts/logical/connections)" in Meshery Docs for more information.

### Credentials

Credentials in an Environment are the keys to securely authenticate and access managed connections. For example, valid Prometheus secrets or Kubernetes API tokens are essential credentials for securely interacting with these managed resources.

> See "[Credentials](https://docs.meshery.io/concepts/logical/credentials)" in Meshery Docs for more information.

## Access Control for Connections and Credentials

Access to a Connection, and therefore to its associated Credentials, is granted through any one of the following, evaluated independently:

1. **Direct ownership**  -  the Connection's owner (User ID) matches the current user's ID. Ownership grants full read and write access, including deleting the Connection and its Credentials.
2. **Indirect access through a shared Workspace**  -  the Connection is assigned to an Environment linked to a Workspace, and the current user belongs to a Team with access to that Workspace. This grants **read-only** access; Team membership alone does not grant the right to modify or delete the Connection or its Credentials.
3. **The "View All Organizations" key**  -  a user holding this [key](/pr-preview/pr-1356/cloud/concepts/identity-and-security/keys/) can access every Connection and Credential across all organizations, bypassing the ownership and Team checks above.

> Designs and Views are governed by a separate mechanism  -  resource-access mappings  -  rather than inheriting through Workspace/Team membership. See [Identity and Security → Security Boundaries](/pr-preview/pr-1356/cloud/concepts/identity-and-security/#security-boundaries) for how these mechanisms fit together.

## Example: Orbital Labs Environment Setup

The following illustrates how Five and Zara set up multi-cloud environments at Orbital Labs, spanning AWS, GCP, and Azure. See [Meet Five and the Cast](/pr-preview/pr-1356/cloud/getting-started/meet-five/) for the full seed inventory.

### Environment Inventory

| Environment | Workspace | Cloud Provider | Connections |
|---|---|---|---|
| `prod-aws` | orbital-production | AWS | EKS cluster, RDS (PostgreSQL), S3, CloudFront, SQS |
| `prod-gcp` | orbital-production | GCP | GKE cluster, Cloud SQL, Cloud Storage, Pub/Sub |
| `staging-aws` | orbital-staging | AWS | EKS cluster, S3, ElastiCache |
| `staging-azure` | orbital-staging | Azure | AKS cluster, Azure Blob Storage, Azure Service Bus |
| `dev-local` | orbital-dev | Local | kind (local Kubernetes), LocalStack (AWS emulation) |
| `stellar-enterprise` | stellar-main | Azure | AKS, Azure SQL, Azure API Management, Azure AD |

### Connecting prod-aws

Five connects Orbital Labs' primary AWS production environment to Layer5 Cloud:

1. Navigate to **Environments** and click **Create** (see [Create an Environment](/pr-preview/pr-1356/cloud/guides/workspaces/managing-environments/#create-an-environment))
2. Name it `prod-aws` and save
3. Add connections one at a time  -  each connection is a discrete cloud resource:
   - **EKS cluster**: the compute layer for deployed workloads
   - **RDS (PostgreSQL)**: the managed database instance
   - **S3 bucket**: object storage for design artifacts and state
   - **CloudFront distribution**: CDN layer for the frontend
   - **SQS queue**: async messaging between services
4. Zara assigns `prod-aws` to the `orbital-production` workspace, making all five connections available to Infrastructure team members

### Adding prod-gcp for Multi-Cloud Coverage

Five repeats the process for GCP to give Orbital Labs multi-cloud flexibility:

1. Create environment `prod-gcp`
2. Add connections:
   - **GKE cluster**: Google Kubernetes Engine compute
   - **Cloud SQL**: managed relational database on GCP
   - **Cloud Storage bucket**: GCP object storage
   - **Pub/Sub topic**: async messaging on GCP
3. Zara assigns `prod-gcp` to `orbital-production` alongside `prod-aws`

Both environments are now readable by teams assigned to the `orbital-production` workspace. Deploying a design still offers environments from the organization's whole list, so choose the target deliberately.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">dev-local for Getting Started</h4>
  
      The <code>dev-local</code> environment uses a local Kubernetes cluster (kind) and LocalStack to emulate AWS services, with no cloud credentials required. If you are following along with these docs for the first time, start with <code>dev-local</code> in the <code>orbital-dev</code> workspace.
  
</div>



## Choosing an environment at deploy time

Deploying a design happens in Kanvas. The deploy action offers environments from your organization's whole list at the moment you deploy. The workspace the design sits in does not limit that choice, so a design in a staging workspace can still be deployed to a production environment. Choose the target deliberately. See [Deploying Designs](/pr-preview/pr-1356/kanvas/tasks/designs/deploying-designs/).

## Platform-provisioned environments

Some environments are created by Layer5 Cloud itself to hold organization configuration, such as sign-in providers or the mail server. They appear in your organization's environment list, but they are not deploy targets you manage:

- They cannot be deleted. The attempt is refused with `this environment is provisioned by the platform and cannot be deleted here`.
- Connections cannot be assigned to them or detached from them through the normal environment controls.
- They cannot be added to a workspace. If one is already in a workspace, you can remove it.

Every environment you create is an ordinary environment.

## Limits and behavior

- Names and descriptions are limited to 255 characters. Names are not unique: two environments in one organization can share a name.
- **Editing replaces both fields.** An environment edit sets both the name and the description. A field left out of the request becomes empty, so always send both.
- **Organization is fixed.** An edit never moves an environment to another organization.
- A connection can be in any number of environments. Adding it to one does not remove it from another.
- An environment can be in any number of workspaces in its organization.
- **Removing a connection that was never assigned** is refused with `no such connection assignment`.
- Deleting an environment ends its connection assignments and its workspace assignments in one step. The connections remain, and keep their membership in any other environment.

## Permissions

Every environment action is checked in the organization that owns the environment. The keys are View Environment, Create Environment, Edit Environment, Delete Environment, Assign connections to environment, Remove connections from environment, Assign environment to workspace, and Remove environment from workspace. Default holders are in [Default Permissions](/pr-preview/pr-1356/cloud/reference/default-permissions/).

The feature matrix lists environments under the Enterprise plan. Layer5 Cloud does not refuse environment actions by plan: creating, editing, deleting, and assigning environments are governed only by the permissions above.

