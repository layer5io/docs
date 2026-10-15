# Deploy and Observe Your First Design


> Validate and dry-run your first design, deploy it to a Kubernetes cluster, find its running resources in Operator mode, and undeploy it.


In this tutorial you take the design you saved in [Create Your First Design](/pr-preview/pr-1290/kanvas/getting-started/starting-scratch/) to a live Kubernetes cluster. You validate it, dry-run it against the cluster, deploy it, and then switch to Operator mode to see the running resources that belong to the design. You finish by undeploying it.

Along the way you learn the difference between checking a design against its schemas and checking it against a cluster, how Kanvas chooses where to deploy, and how Kanvas keeps track of the resources a design creates.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">This tutorial needs a Meshery you run</h4>
  
      Hosted Kanvas at kanvas.new cannot validate, dry-run, deploy, or undeploy designs, and it does not offer Operator mode. On kanvas.new these actions open a prompt that sends you to a Meshery you run instead. Use the <a href="https://playground.meshery.io">Meshery Playground</a> or <a href="https://docs.meshery.io/installation/">install Meshery</a> in your own environment, then open your design there.
  
</div>



## Before you begin

You need:

- **The `web-app` design** from the previous tutorial, saved and open in Designer mode.
- **A Meshery you run**, either the Meshery Playground or a self-hosted Meshery, signed in with Layer5 Cloud as its provider. Operator views are stored in Layer5 Cloud, so the local provider cannot show them.
- **A connected Kubernetes cluster** with Meshery Operator deployed. Meshery Operator installs MeshSync and Meshery Broker in the cluster; MeshSync streams the cluster's live state to Meshery Server, and that stream is what Operator mode displays. See [Operator](/pr-preview/pr-1290/kanvas/operator/).
- **Permissions** in your organization for each action. Validate Design permits both validation and dry runs, Deploy Design permits deploying, and Undeploy Design permits undeploying. When you lack one of these permissions, the matching action is not available to you.

## Step 1: Validate the design

Validate the design from the design's action toolbar. Kanvas shows "Validating design" and opens a dialog titled `Validate design "web-app"`.

**What Kanvas does:** validation checks every component in the design against that component's schema. It does not contact any cluster. Each error is attached to the component and the field that caused it, so you fix problems where they are, not in a separate list. When validation of the whole design completes, Kanvas records a validation event in your Layer5 Cloud event log.

**What you should see:** no errors for this design. If validation finds problems, Kanvas shows "Design validation error" and marks the affected components. Open each marked component, correct the field, and validate again.

## Step 2: Dry-run the design against the cluster

Start a dry run. Kanvas opens a dialog titled `Dryrun design "web-app"`.

**What Kanvas does:** a dry run sends the design to the target cluster for checking without applying anything. It catches problems that schemas cannot, the ones only the cluster knows about. Dry-run errors attach to components in the same way as schema errors, so both kinds appear side by side on the affected component.

Validation answers "is this design well formed?". A dry run answers "would this cluster accept it?". Run both before every deployment.

**What you should see:** a dry run that completes without errors. Nothing has changed in the cluster yet.

## Step 3: Deploy the design

Deploy the design. Kanvas opens a dialog titled `Deploy design "web-app"` that walks you through the deployment.

**What Kanvas does:** Kanvas applies the design to the Kubernetes contexts you select. If you do not select any, Kanvas deploys to **all** connected clusters. Choose your target deliberately when more than one cluster is connected.

Every resource Kanvas creates carries the design's identity:

| Metadata | Key | Value |
|---|---|---|
| Label | `design.meshery.io/id` | The design's ID |
| Annotation | `design.meshery.io/version` | The design version that was deployed |
| Annotation | `component.meshery.io/id` | The ID of the component the resource came from |

The label is what makes a resource "managed by Meshery". It also lets you find the design's resources with your own tools, for example `kubectl get all -l design.meshery.io/id=<design-id>`.

**What you should see:** the deployment completes, and the Deployment, Service, and ConfigMap exist in the cluster.

## Step 4: Observe the design in Operator mode

Switch from Designer to Operator mode.

If the design has unsaved changes, Kanvas asks "You have unsaved changes. Are you sure you want to leave?" before it switches. Confirm only if you are ready to lose those changes; otherwise stay, let the design save, and switch again.

**What Kanvas does:** Operator mode shows live cluster state through views. A view is a saved set of filters. A new, empty view shows Nodes and Namespaces across all connected clusters. A design's view is named after the design, `web-app-View`, and filters on the design's `design.meshery.io/id` label, so it shows only the resources this design created.

**What you should see:** in the design's view, the running Deployment, Service, and ConfigMap from your design, and nothing else from the cluster.

## Step 5: Undeploy the design

Return to Designer mode and undeploy the design. Kanvas opens a dialog titled `Undeploy design "web-app"`.

**What Kanvas does:** undeploy removes the design's resources from the Kubernetes contexts you select. As with deploy, selecting no context targets **all** connected clusters. You can dry-run an undeploy first to see what it would do.

**What you should see:** the undeploy completes and the resources are removed from the cluster. The design itself stays saved, ready to deploy again.

## If something goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| A prompt says Operator mode is not available on kanvas.new. | Hosted Kanvas cannot validate, deploy, undeploy, connect clusters, or open Operator mode. | Open the design in the Meshery Playground or a self-hosted Meshery. |
| Validate, dry run, deploy, and undeploy are disabled. | The design is empty. These actions need at least one component. | Add components to the design, or open the saved `web-app` design. |
| One of the actions is not available to you. | Your role in the organization lacks the matching permission: Validate Design, Deploy Design, or Undeploy Design. | Ask an organization administrator to grant the permission. |
| "Design validation error" appears. | One or more components fail their schema. | Open each marked component, correct the field the error is attached to, and validate again. |
| A dry run reports errors on components. | The target cluster would reject part of the design. | Correct the marked components, then run the dry run again before you deploy. |
| Kanvas asks "You have unsaved changes. Are you sure you want to leave?" | The design has changes that are not saved yet. | Cancel, let autosave finish or save the design, then switch modes. |
| Resources appeared in clusters you did not intend. | No Kubernetes context was selected, so the action targeted all connected clusters. | Undeploy from the unintended clusters, then select contexts explicitly before you deploy again. |

## What you learned

- Validation checks a design against component schemas; a dry run checks it against a cluster. Neither changes the cluster.
- Deploy and undeploy act on the contexts you select, and on every connected cluster when you select none.
- Every deployed resource is labeled with the design's ID, which is how Operator mode filters live state down to one design.
- Switching modes with unsaved changes asks for confirmation.
- Each action is gated by its own permission.

## Next

- [Validating designs](/pr-preview/pr-1290/kanvas/tasks/designs/validating-designs/)
- [Dry-running a design](/pr-preview/pr-1290/kanvas/tasks/designs/dry-running-a-design/)
- [Deploying designs](/pr-preview/pr-1290/kanvas/tasks/designs/deploying-designs/)
- [Undeploying designs](/pr-preview/pr-1290/kanvas/tasks/designs/undeploying-designs/)
- [Operator](/pr-preview/pr-1290/kanvas/operator/), to explore views and live cluster state beyond a single design.

