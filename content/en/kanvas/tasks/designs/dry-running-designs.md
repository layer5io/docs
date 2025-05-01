---
title: Dry Running Designs
description: >
  Try out your design without applying it—Dry Run helps you safely test deployments across one or more clusters.
weight: 7
categories: [Designer]
tags: [designs]
---

Dry Run lets you try out your design without making any changes to your Kubernetes clusters.  
It’s a safe way to check if everything is set up correctly before you actually deploy.

![Find Dry Run Menu](/kanvas/tasks/designs/images/find-dry-run-menu.gif)

## Why you should perform Dry Runs

- **Catch mistakes early** before real resources are created or modified.  
- **Validate permissions** to ensure your service account can perform the intended actions.  
- **Ensure compatibility** with your cluster’s API versions and admission policies.  
- **Speed up reviews** by sharing simulation results instead of waiting for full deployments.  

> Dry Run does not create, update, or delete any live resources.

## How to Perform a Dry Run

In Kanvas, there are two ways to start a Dry Run:

### Using the Actions Dropdown Menu

- In [kanvas](https://playground.meshery.io/extension/meshmap), click the **Actions** dropdown.  
- Select **Dry Run** from the list.

![Actions menu showing Dry Run option](/kanvas/tasks/designs/images/actions-dropdown-menu.png)

- After clicking, results of your simulated deployment will appear:

![Actions menu next result ](/kanvas/tasks/designs/images/actions-dropdown-result.png)

### Using the Arrow Dropdown Menu

- At the top-right corner of the design mode in [kanvas](https://playground.meshery.io/extension/meshmap), click the **arrow-shaped dropdown button**. 
- Select **Dry Run** from the list.

![Dropdown Menu Shortcut](/kanvas/tasks/designs/images/arrow-dropdown-menu.png)

- The simulation will be triggered immediately based on the clusters selected in your current context.
- You will receive feedback via the **[Notification Center](https://docs.meshery.io/guides/infrastructure-management/notification-management)**, where you can view results for each component[^1].

## How It Works

When you trigger a Dry Run in Meshery, the following steps happen behind the scenes:

1. **Frontend Sends a Dry Run Request**  
   Meshery’s UI sends your design and selected Kubernetes clusters to the server, with the Dry Run option enabled.

2. **Backend Simulates Deployment**  
   Meshery reads your design and prepares it for deployment, but instead of applying changes, it simulates the actions against the selected Kubernetes clusters.

3. **Kubernetes Validates the Changes**  
   Meshery asks Kubernetes to review the deployment using its built-in dry-run feature, checking if the resources would succeed without actually creating or modifying anything.

4. **Results Are Returned**  
   Simulation results for each component and each cluster are collected and sent back to the UI. You can view any errors or warnings directly in the Notification Center.

> Meshery’s Dry Run feature leverages Kubernetes' native dry-run support to ensure highly accurate and cluster-aware simulations.

## Q&A

#### Q: What’s the difference between Validate, Dry Run, and Deploy? 
- **Validate** checks whether the design’s structure and schema are correct based on MeshModel component definitions. It does not contact the cluster.  
- **Dry Run** simulates the deployment against real clusters without changing any resources. It checks compatibility, permissions, and configuration issues.  
- **Deploy** actually applies the design to the cluster, creating or updating resources as needed.

{{< alert type="info" title="Simply put:" >}}
- *Validate* checks “Did I fill out this design correctly?”  
- *Dry Run* asks “If I try to apply this, will Kubernetes accept it?”  
- *Deploy* means “Go ahead and create the actual resources now.”
{{< /alert >}}

#### Q: Is Dry Run 100% accurate?
Dry Run is highly accurate because it uses Kubernetes’ official `dryRun=All` API flag.  
However, certain dynamic behaviors (e.g., runtime environment differences, sidecar injection) may still only surface during real deployment.

#### Q: Does Dry Run include the schema Validate step? Should I click both?*  
No, Dry Run and Validate are separate steps.  
Dry Run does **not** include schema validation.  
We recommend clicking **Validate first**, then **Dry Run**, then **Deploy**.

## Best Practices & Tips

1. As a best practice, always **Validate → Dry Run → Deploy** - in that order.   
2. Use Dry Run in your CI pipelines to catch issues before merge.  
3. Ensure your Kubernetes context is correctly configured and you have network access to the clusters you are targeting.  

[^1]: In the current release, you may occasionally encounter a case where the Arrow Dropdown Menu does not respond as expected. This is a known issue and is currently being addressed. In the meantime, please use the Actions Dropdown Menu as an alternative for triggering a Dry Run.