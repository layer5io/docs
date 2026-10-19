# Deploy a PHP Guestbook with Redis


> Combine six Kubernetes manifests into one Kanvas design, deploy a three-tier guestbook, and learn how Services wire tiers together by label and by name.


In this tutorial you build the Kubernetes guestbook: a PHP frontend that writes entries to a Redis leader and reads them from Redis followers. Six manifests from the Kubernetes examples become one Kanvas design, which you deploy, inspect in Operator, scale, and remove. The application is small, but it carries the pattern behind most multi-tier systems: each tier runs as a Deployment, each tier is reached through a Service, and tiers find each other by Service name, never by Pod address.

## What you will learn

- How a Service selects Pods by label, and why the selector decides where traffic goes.
- How one tier finds another through cluster DNS, using the Service name as the hostname.
- How several manifests become one design that you deploy and remove as a unit.
- How a design acts as desired state: you change the design, deploy again, and Kubernetes converges.
- How Operator shows the live objects your design created.

## Before you begin

- **A cluster-backed Kanvas environment.** Deploying needs a Kubernetes cluster connected to Meshery. Use [Meshery Playground](https://play.meshery.io), a shared live cluster, or a self-hosted Meshery with a connected cluster. Hosted kanvas.new does not run cluster actions: Validate, Deploy, and Undeploy there open a prompt to self-host instead. Operator views and log streaming also need Meshery Operator and MeshSync running in the cluster.
- **Kubernetes basics.** You know what Pods, Deployments, and Services are. If Services are new to you, complete [Exploring Kubernetes Services](/pr-preview/pr-1344/kanvas/tutorials/kubernetes/kubernetes-services/) first.
- **A namespace of your own.** Playground is shared with other users. Deploy replaces any existing object with the same kind, name, and namespace, and Undeploy deletes by kind and name, so two readers deploying the guestbook into `default` would overwrite and delete each other's objects. This tutorial uses the namespace `guestbook-ada`; substitute a unique name of your own, and give your design a unique name too.

## The scenario

You build six objects in three tiers:

```text
                 frontend  (Service, port 80)
                     |
                 frontend  (Deployment, 3 replicas, PHP + Apache)
                /                         \
        writes /                           \ reads
              v                             v
  redis-leader (Service, 6379)     redis-follower (Service, 6379)
         |                                  |
  redis-leader (Deployment, 1)     redis-follower (Deployment, 2)
         \________ replication ____________/
```

Each manifest holds one object. The labels on each Deployment's Pod template are what its Service selects:

| Manifest | Object | Pod labels or Service selector |
|---|---|---|
| [redis-leader-deployment.yaml](https://k8s.io/examples/application/guestbook/redis-leader-deployment.yaml) | Deployment `redis-leader`, 1 replica | `app: redis`, `role: leader`, `tier: backend` |
| [redis-leader-service.yaml](https://k8s.io/examples/application/guestbook/redis-leader-service.yaml) | Service `redis-leader` | selects `app: redis`, `role: leader`, `tier: backend` |
| [redis-follower-deployment.yaml](https://k8s.io/examples/application/guestbook/redis-follower-deployment.yaml) | Deployment `redis-follower`, 2 replicas | `app: redis`, `role: follower`, `tier: backend` |
| [redis-follower-service.yaml](https://k8s.io/examples/application/guestbook/redis-follower-service.yaml) | Service `redis-follower` | selects `app: redis`, `role: follower`, `tier: backend` |
| [frontend-deployment.yaml](https://k8s.io/examples/application/guestbook/frontend-deployment.yaml) | Deployment `frontend`, 3 replicas | `app: guestbook`, `tier: frontend` |
| [frontend-service.yaml](https://k8s.io/examples/application/guestbook/frontend-service.yaml) | Service `frontend` | selects `app: guestbook`, `tier: frontend` |

The frontend connects to Redis at the hostnames `redis-leader` and `redis-follower`. Those names resolve only because Services with exactly those names exist in the same namespace. Renaming a Service breaks the frontend, which is why this tutorial isolates you with a namespace instead of with new object names.

## Import the manifests into one design

1. Start from an empty canvas and open the **Import Design** dialog from the file menu.
2. Import the first manifest by URL. Set the name to your design name (for example `guestbook-ada`), choose **URL Import**, and enter `https://k8s.io/examples/application/guestbook/redis-leader-deployment.yaml`. On an empty canvas the dialog offers **Import**, which loads the result as the open design.
3. Import the other five manifests the same way, naming each import after its file. With a design open, the dialog offers **Import as new** and **Merge into current**; choose **Merge into current** every time so each object joins the open design.
4. Drag the components apart, or apply a layout, until each tier is readable. Merged components keep their internal layout and land slightly offset, so they can overlap what is already on the canvas.

If a URL import fails, Kanvas shows `Failed to import design "<name>"` without a reason. Download the file and import it with **File Upload** instead, keeping the `.yaml` extension, because the server identifies a Kubernetes manifest by its `.yaml` or `.yml` extension. Dragging a downloaded file onto a non-empty canvas also works: Kanvas asks whether to merge it into the open design or open it as new.

**What just happened.** Each import sent one manifest to Meshery Server, which recognized it as a Kubernetes manifest, converted the object into a component, and saved the result as a new design in your account. Merge then copied that design's components into the open design with fresh ids. Merge never matches or de-duplicates, so merging the same manifest twice gives you two copies. The single-manifest designs stay saved in your account after the merge; you can delete them at the end. Kanvas saves the open design automatically a few seconds after each change, and new designs are saved with public visibility.

**Check your work.** The canvas holds six components: three Deployments and three Services. Seven or more means a manifest was merged twice; delete the duplicate.

## Place every object in your namespace

1. Open each of the six components in turn and set its namespace to `guestbook-ada`.

**What just happened.** The example manifests do not set a namespace, so without this step every object would go to `default`. The namespace field appears only on namespaced kinds such as Deployments and Services. You do not need to create the namespace: Deploy creates a missing namespace before it applies the objects. Because the frontend uses short hostnames, it still finds `redis-leader` and `redis-follower`; short Service names resolve within the caller's own namespace.

## Check the wiring before you deploy

1. Open the `frontend` Service and compare its selector with the Pod template labels of the `frontend` Deployment. Do the same for both Redis pairs. Each selector must match its Deployment's labels exactly.
2. Run **Validate**.
3. Run **Dry Run**.

**What just happened.** Validate runs in your browser. It checks each component's configuration against that component's schema and reports problems as advisory warnings; it never contacts the cluster and never checks whether a selector matches anything. Dry Run sends every object to the cluster API server as a server-side dry run: the API server runs its own validation and admission checks but persists nothing.

**Check your work.** Validate reports `No validation errors.` On the first deployment into a new namespace, Dry Run reports a not-found error for every component, because a dry run does not create namespaces and `guestbook-ada` does not exist yet. That error is expected here. Any other dry-run error names the field at fault; selecting it opens the component's configurator at that field.

A mismatched selector passes both checks. The Service deploys, selects no Pods, and silently routes traffic nowhere. Matching selectors to labels is your job, and the comparison in step 1 is how you do it.

## Deploy and verify

1. Run **Deploy**. The deploy dialog steps through validation, the deployment target, a dry run, and a final review.
2. At the target step, select the environment that holds your cluster connection.
3. At the dry-run step, the namespace errors from the previous phase appear again. Select **Bypass errors and initiate deployment** to continue.
4. Confirm the deployment and read the summary.

**What just happened.** Meshery Server applied each component to the cluster. For each object it creates the object, or replaces it in place if one with the same kind, name, and namespace already exists, so deploying the same design twice updates rather than duplicates. Kanvas applies independent components in parallel and does not order them, so the frontend can start before Redis is ready; Kubernetes restarts what fails until the dependencies answer. Every applied object carries a label with your design's id. Kubernetes, not Kanvas, then creates the ReplicaSets and Pods that each Deployment asks for.

**Check your work.** The summary lists six rows, such as `Deployed Deployment "frontend"`. A row that reads `Failed to deploy` carries an error card with the probable cause and a suggested remediation. Read the rows even when the notification says the deployment completed: that notification also appears when some components failed. An error that the Kubernetes cluster is unavailable means no connected cluster was selected.

## Inspect the application in Operator

1. Open the design in Operator, either from **Open In Operator** in the deploy summary or from the design's **View in Operator** action. Operator opens a view scoped to your design.
2. In the Layers panel, filter by your namespace to see every object in it, including the ReplicaSets and Pods that the Deployment controller created.
3. Select the `frontend` Service. The details panel shows its type, cluster IP, and selector.
4. Select a `frontend` Pod. The status chip shows its phase, and the details list the node it runs on, its IP, and its containers.

**What just happened.** Operator draws a snapshot of the cluster as MeshSync last reported it. The design-scoped view filters on the design-id label that Kanvas put on the objects it applied. Operator does not stream changes: it refetches when you open a view, change a filter, or change the selected clusters. To see Pods that were still starting, change a filter or reopen the view.

**Check your work.** Six Pods are Running: three `frontend`, one `redis-leader`, two `redis-follower`. A Pod stuck in Pending usually means the cluster lacks room to schedule it; check its conditions in the details panel. If the canvas reads `Is MeshSync healthy on the selected cluster?`, Operator has no inventory for the cluster.

## Scale the frontend

1. Switch back to Designer, open the `frontend` Deployment, and set its replicas to `5`.
2. Run **Deploy** again. The dry run passes cleanly this time, because the namespace now exists.
3. Return to Operator and refresh the view by changing a filter.

**What just happened.** Deploy replaced the existing `frontend` Deployment with the version in your design. The Deployment controller saw a desired count of five and started two more Pods. The design is your desired state: any change made directly in the cluster, for example with `kubectl scale` or `kubectl set image`, is overwritten the next time you deploy the design. Change the image tag the same way when you need to roll out a new version.

Keep changes to fields Kubernetes allows you to update, such as replicas and images. A change to an immutable field, such as a Deployment's selector, is rejected by Kubernetes, yet the deploy summary reports it as deployed and the old value stays in the cluster.

**Check your work.** Operator shows five `frontend` Pods. The Deployment's details read `5 / 5` once all Pods are available.

## Read the logs

1. In Operator, right-click the `redis-leader` Pod and start a log session (**Initiate Log Session**).
2. Read the session in the panel that opens.

**What just happened.** A log session follows the Pod's output, starting with its most recent 1,000 lines. Each line carries a Kubernetes timestamp and a `[pod:container]` prefix; a Pod with several containers shows all of them in one tab. The leader's log shows Redis accepting connections and the two followers requesting replication, which confirms that the followers found the leader through the `redis-leader` Service name. Search in the panel highlights matches without hiding other lines. Closing the tab stops the stream.

**Check your work.** Lines appear within a few seconds. An empty tab means the stream did not start; the panel does not display stream errors, so confirm that MeshSync is healthy on the cluster and start the session again.

## Clean up

1. In Designer, run **Undeploy**, select the same environment, and confirm.
2. Delete the guestbook design and the five single-manifest designs from your account if you no longer need them. See [Deleting a design](/pr-preview/pr-1344/kanvas/guides/designs/deleting-a-design/).

Undeploy deletes each component's object by kind and name, in that component's namespace, on the clusters you select. It removes the three Deployments and three Services; Kubernetes then garbage-collects the ReplicaSets and Pods those Deployments owned. Undeploy acts only on components in the design, and it matches by kind and name, not by label, so it also deletes a same-named object in your namespace that Kanvas did not create. The namespace `guestbook-ada` remains, empty, because the design has no Namespace component for Undeploy to delete. The design itself is unchanged; you can deploy it again at any time.

## What you learned

- A Service routes to whatever Pods its selector matches. Labels and selectors are the wiring of a multi-tier application, and neither Validate nor a dry run checks that they agree.
- Tiers address each other by Service name through cluster DNS, so names are part of the application's contract and namespaces are the safe way to isolate copies.
- Six manifests imported and merged into one design deploy and undeploy as a unit.
- Deploy creates or replaces each object, so the design is the desired state and redeploying is how you scale and update.
- Operator shows a snapshot of what is running, scoped to your design or filtered by namespace, and streams Pod logs on demand.

## Next steps

- Add storage and secrets to a two-tier application in [Deploy WordPress and MySQL with Persistent Volumes](/pr-preview/pr-1344/kanvas/tutorials/kubernetes/wordpress-mysql-persistentvolume/).
- Review every deploy option and failure mode in [Deploying designs](/pr-preview/pr-1344/kanvas/guides/deploying/deploying-designs/).
- Learn how Operator discovers and draws cluster resources in [Operator](/pr-preview/pr-1344/kanvas/concepts/operator/).

