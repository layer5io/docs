# Promoting a Design from Staging to Prod


> Learn how to move a design from a staging workspace to a production workspace and deploy it to a production environment.



This guide walks through how Five promotes the `prod-deployment-v2` design from the `orbital-staging` workspace to `orbital-production`, then deploys it to the `prod-aws` environment.

Promotion is a move. A design lives in at most one workspace, so assigning it to production removes it from staging. There is no approval step and no copy.

See [Meet Five and the Cast](/pr-preview/pr-1362/cloud/getting-started/meet-five/) for the full Orbital Labs narrative reference.

## Overview

At Orbital Labs, workspaces mirror the deployment pipeline. A workspace decides where a design lives and which teams can read which connections. An environment is the deploy target. A team assignment gives read-only access to connections. It does not give access to designs.

| Workspace | Environment | Teams with Access |
|---|---|---|
| `orbital-staging` | `staging-aws` (EKS + S3 + ElastiCache), `staging-azure` (AKS + Azure Blob + Azure Service Bus) | Infrastructure + Development |
| `orbital-production` | `prod-aws` (EKS + RDS + S3 + CloudFront + SQS), `prod-gcp` (GKE + Cloud SQL + Cloud Storage + Pub/Sub) | Infrastructure only |

Five has finished validating `prod-deployment-v2` in staging. The design deploys an EKS cluster, an RDS PostgreSQL database, an S3 bucket, and a CloudFront distribution, the core of Orbital Labs' AWS production platform.

Every member of the organization can already see both workspaces. Visibility is organization-wide. What a workspace grants comes from the teams and environments assigned to it.

## Prerequisites

- You have a design ready in a staging workspace that has been tested.
- You hold **Assign Designs to Workspaces** in the production workspace's organization. That is the only permission Layer5 Cloud checks for the move. You do not also need access to the workspace the design leaves.
- The production workspace has at least one environment assigned with the target cloud connections.
- To deploy, you run a Meshery Server that holds the cluster connection. The hosted kanvas.new site does not deploy designs.

## Steps

### Step 1: Open the design in staging

1. Navigate to [Layer5 Cloud](https://cloud.layer5.io) and open the `orbital-staging` workspace.
2. Find `prod-deployment-v2` in the designs assigned to that workspace.
3. Open the design and confirm it is in the expected state, with components connected and no validation errors.

The staging team cannot open a private design just because the team is assigned to the workspace. Five can open it because Five owns it.

### Step 2: Transfer the design to the production workspace

Designs belong to at most one workspace at a time. To promote the design, move it.

1. On the `orbital-production` workspace, open **Designs/Views**.
2. Select `prod-deployment-v2` from the designs you own that are not already in that workspace.
3. Move it into `orbital-production` and save.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Info</h4>
  
      Layer5 Cloud checks Assign Designs to Workspaces in the destination organization&rsquo;s workspace. Anyone who holds it can promote, so grant it only to the people who should decide what reaches production. The design disappears from <code>orbital-staging</code> because the move is not a copy.
  
</div>



### Step 3: Select the target environment

With `prod-deployment-v2` now in `orbital-production`, deploy it from Kanvas.

1. Open the design in Kanvas.
2. Click **Deploy** and select the target environment, in this case `prod-aws`.
3. Review the connection list: EKS cluster, RDS (PostgreSQL), S3, CloudFront, SQS.

The deploy action offers environments from the organization's whole list at the moment you deploy. It does not limit the list to the design's workspace, so select `prod-aws` yourself. See [Deploying Designs](/pr-preview/pr-1362/kanvas/tasks/designs/deploying-designs/).

The workspace decided where the design lives. The environment you choose decides where it runs.

### Step 4: Verify the deployment

1. Open the `orbital-production` workspace's recent activity.
2. Confirm the log lists the design assignment, with the email address of the person who moved it. Reading the log requires the View Workspace permission.
3. In Kanvas, confirm the deploy to `prod-aws` completed for the connections you selected.

## What's Next

- The production team can read the production connections but still cannot open a private design. To give Rex or Jordan access, share the design with each of them. See [Sharing a Workspace](/pr-preview/pr-1362/cloud/guides/tutorials/sharing-a-workspace/).
- To deploy the same design to `prod-gcp`, repeat the deploy and select `prod-gcp`. Do not copy the design.
- To roll back, assign `prod-deployment-v2` to `orbital-staging` again. It leaves production the same way it left staging.

