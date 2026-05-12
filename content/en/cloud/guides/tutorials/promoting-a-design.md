---
title: Promoting a Design from Staging to Prod
description: >
  Learn how to move a design from a staging workspace to a production workspace, with environment assignment and access approval.
weight: 2
categories: [Tutorials]
tags: [designs, workspaces, environments]
aliases:
  - /cloud/tutorials/promoting-a-design/
  - /cloud/guides/workspaces/promoting-a-design/

---

This guide walks through how Five promotes the `prod-deployment-v2` design from the `orbital-staging` workspace to `orbital-production`, with Zara Osei (Infrastructure Team Admin) approving the environment assignment.

See [Meet Five and the Cast](/cloud/getting-started/meet-five) for the full Orbital Labs narrative reference.

## Overview

At Orbital Labs, workspaces mirror the deployment pipeline:

| Workspace | Environment | Teams with Access |
|---|---|---|
| `orbital-staging` | `staging-aws` (EKS + S3 + ElastiCache), `staging-azure` (AKS + Azure Blob + Azure Service Bus) | Infrastructure + Development |
| `orbital-production` | `prod-aws` (EKS + RDS + S3 + CloudFront + SQS), `prod-gcp` (GKE + Cloud SQL + Cloud Storage + Pub/Sub) | Infrastructure only |

Five has finished validating `prod-deployment-v2` in staging. The design deploys an EKS cluster, an RDS PostgreSQL database, an S3 bucket, and a CloudFront distribution — the core of Orbital Labs' AWS production platform.

## Prerequisites

- You have a design ready in a staging workspace that has been tested and reviewed.
- You have access to the target production workspace (Infrastructure team membership at Orbital Labs).
- The production workspace has at least one environment assigned with the target cloud connections.

## Steps

### Step 1 — Open the design in staging

1. Navigate to [Layer5 Cloud](https://cloud.layer5.io) and open the `orbital-staging` workspace.
2. Find `prod-deployment-v2` in the **Designs** tab.
3. Open the design and confirm it is in the expected state — all components connected, no validation errors.

### Step 2 — Transfer the design to the production workspace

Designs belong to exactly one workspace at a time. To promote the design, transfer it.

1. From the design's menu (⋮), click **Move to Workspace**.
2. Select `orbital-production` from the workspace list.
3. Confirm the transfer.

{{< alert type="info" >}}
Only users with access to **both** the source and destination workspace can transfer a design. Five is a member of the Infrastructure team, which has access to both `orbital-staging` and `orbital-production`.
{{< /alert >}}

### Step 3 — Select the target environment

With `prod-deployment-v2` now in `orbital-production`, assign the environment where it will deploy.

1. Open the design in `orbital-production`.
2. Click **Deploy** and select the target environment — in this case, `prod-aws`.
3. Review the connection list: EKS cluster, RDS (PostgreSQL), S3, CloudFront, SQS.

### Step 4 — Zara approves (if required)

If your organization requires Team Admin approval before production deployments, Zara receives a review request.

1. Zara opens the pending deployment request in her notifications.
2. She reviews the design diff and the target environment.
3. She clicks **Approve** — the deployment proceeds to `prod-aws`.

{{< alert type="info" title="Why does Zara need to approve?" >}}
The Infrastructure team's keychain grants `orbital-production` workspace access and `prod-aws` environment deployment rights only to members who have been explicitly granted those keys. Zara, as Team Admin, holds the approval authority for production environment assignments. See [Keychains](/cloud/concepts/identity-and-security/keychains/) for how this is configured.
{{< /alert >}}

### Step 5 — Verify the deployment

After approval:

1. Navigate to the **Deployments** tab in `orbital-production`.
2. Confirm that `prod-deployment-v2` shows a **Deployed** status against `prod-aws`.
3. Verify the connected resources (EKS, RDS, S3, CloudFront, SQS) show healthy connection status.

## What's Next

- To give the Development team visibility into the production design (read-only), Five can share the design individually with Rex and Jordan. See [Sharing a Workspace](/cloud/guides/tutorials/sharing-a-workspace/).
- To set up a parallel deployment to `prod-gcp`, Five repeats Steps 3–5 selecting `prod-gcp` as the environment.
- To roll back, Five transfers `prod-deployment-v2` back to `orbital-staging` and deploys the previous version from there.
