# Tutorials

> Guided Kanvas tutorials grouped by what you build, from collaborative designs to cloud resources and Kubernetes workloads running in a live cluster.


A Kanvas tutorial is a guided path to a realistic outcome. You build something real, such as a shared design, a cloud architecture, or a running application, and you learn how Kanvas works by doing it. Each tutorial explains what Kanvas does at every step, so you finish with both the result and the mental model behind it.

Tutorials are for learning. When you already know what you want to do, other parts of the Kanvas docs serve you better:

- New to Kanvas? Start with [Getting Started](/pr-preview/pr-1337/kanvas/getting-started/) to reach your first design quickly.
- [How-to guides](/pr-preview/pr-1337/kanvas/guides/) accomplish one specific task for a reader who knows the basics.
- [Concepts](/pr-preview/pr-1337/kanvas/concepts/) explain how Kanvas works and why it behaves the way it does.
- [Reference](/pr-preview/pr-1337/kanvas/reference/) lists exact options, limits, permissions, and shortcuts.

## The scenario

The collaboration and GCP tutorials follow two fictional organizations: Orbital Labs, a cloud-native startup on the Team plan, and Stellar Dynamics, their enterprise client on the Enterprise plan. Both organizations are managed under the Constellation Cloud provider. A cast of named characters builds, shares, and reviews designs, so you see how permissions, workspaces, and cross-organization access work together in practice. The cloud deployment and Kubernetes tutorials do not use this scenario.


## Collaborate on a design

These tutorials teach how people work together on one design. Neither deploys anything, so they run anywhere Kanvas runs.

| Tutorial | You build | Before you begin |
|---|---|---|
| [Collaborative Editing](/pr-preview/pr-1337/kanvas/tutorials/collaborative-editing/) | A design that you and a teammate edit at the same time, ending with a review resolved in a comment thread. You learn the four mechanisms behind collaboration: the live session, access, comments, and saving. | A Kanvas account and a teammate with their own account. |
| [Share a Design Across Organizations](/pr-preview/pr-1337/kanvas/tutorials/stellar-saas-platform/) | A private design that a reviewer in another organization can open, a review held in comments, and the removal of that access when the review ends. You learn what a grant gives someone and where Kanvas checks permissions. | A Kanvas account in your organization and a reviewer with an account in a different organization. |

## Model a cloud architecture without deploying

This tutorial teaches design as documentation. You model an architecture in Designer and share it, without connecting a cluster or a cloud account.

| Tutorial | You build | Before you begin |
|---|---|---|
| [Build a GCP Data Pipeline Design](/pr-preview/pr-1337/kanvas/tutorials/data-pipeline-gcp/) | A design of a GCP data pipeline: Pub/Sub ingests events, Dataflow processes them, BigQuery stores results, and Cloud Storage archives raw payloads, all on GKE. You place components, connect them with relationships or annotation lines, group them into sections, add labels, check the design with Validate, and share it. | A Kanvas account and a workspace. No cluster and no GCP account. |

## Deploy cloud resources from Kubernetes

These tutorials provision real cloud resources by deploying a cloud provider's Kubernetes operator to your cluster and then deploying resource definitions that the operator turns into cloud infrastructure.

| Tutorial | You build | Before you begin |
|---|---|---|
| [Deploy AWS EC2 Instances](/pr-preview/pr-1337/kanvas/tutorials/deploy-aws-ec2-instances-with-meshery/) | EC2 instances managed from Kubernetes through AWS Controllers for Kubernetes. | A self-hosted Meshery with your own connected Kubernetes cluster, AWS credentials, and awareness of the cost of the instances you create. |
| [Deploy Azure Resources](/pr-preview/pr-1337/kanvas/tutorials/deploy-azure-resources-with-meshery/) | Azure resources managed from Kubernetes through Azure Service Operator. | A self-hosted Meshery with your own connected Kubernetes cluster, Azure credentials, and awareness of the cost of the resources you create. |







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Warning</h4>
  
      Never run the AWS or Azure tutorials on Meshery Playground. Both tutorials store real cloud credentials in a Kubernetes Secret, and Playground is a cluster shared with other users. Use your own cluster, and delete the cloud resources when you finish so they stop accruing charges.
  
</div>



## Run Kubernetes workloads

These tutorials teach core Kubernetes objects by building them in Kanvas, deploying them to a live cluster, and inspecting the result in Operator.

| Tutorial | You build | Before you begin |
|---|---|---|
| [Kubernetes tutorials](/pr-preview/pr-1337/kanvas/tutorials/kubernetes/) | A learning path from a single Pod through Deployments, Services, ConfigMaps and Secrets, and CronJobs to complete multi-tier applications. | Meshery Playground, or a self-hosted Meshery with at least one connected Kubernetes cluster. |

The [Kubernetes request flow](/pr-preview/pr-1337/kanvas/concepts/kubernetes-request-flow/) explanation describes what happens inside the cluster when those objects receive traffic. Read it before the Services tutorial.

## Choose where to run

Hosted Kanvas at kanvas.new has no cluster actions: Validate, Deploy, Undeploy, and Operator prompt you to use Meshery Playground or self-host Meshery instead. Only the design-only tutorials run there in full. Meshery Playground is a shared live cluster for the Kubernetes tutorials. The AWS and Azure tutorials need your own cluster.

| Tutorial group | Hosted kanvas.new (designing only) | Meshery Playground | Self-hosted Meshery with your own cluster | Needs cloud credentials | Deploys to a cluster |
|---|---|---|---|---|---|
| Collaborate on a design | Yes | Yes | Yes | No | No |
| Model a cloud architecture (GCP) | Yes | Yes | Yes | No | No |
| Deploy cloud resources (AWS, Azure) | No | No, never | Yes | Yes | Yes |
| Run Kubernetes workloads | Drawing only, no deploy | Yes | Yes | No | Yes |

## What every tutorial assumes

- You can sign in to Kanvas.
- You have a workspace. Every design belongs to one workspace, the one selected in your current organization.
- Kanvas saves designs automatically. A design saves after a 3 second pause in editing, and a new design saves once it has a name or a component.
- Your plan limits the number of components in a design. Kanvas enforces the limit when it saves the design, and it cannot save a design that exceeds the limit.

