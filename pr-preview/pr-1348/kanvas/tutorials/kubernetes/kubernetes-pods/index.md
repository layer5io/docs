# Explore Pods


> Design, deploy, expose, and inspect a standalone NGINX Pod to learn how a Kanvas component becomes a running Kubernetes object.


In this tutorial you build a single NGINX Pod in Kanvas, deploy it to a live cluster, expose it with a NodePort Service, and inspect the running Pod in Operator: its details, a shell inside its container, and its log stream. A Pod is the smallest unit Kubernetes schedules, and every workload controller you meet later (Deployments, StatefulSets, CronJobs) exists to create and replace Pods. Working with a bare Pod first shows you exactly what those controllers automate.

The Pod in this tutorial is standalone: no controller watches it, so if it fails or is deleted, nothing recreates it. That trade-off suits learning and does not suit production.

## What you will learn

- A Pod wraps one or more containers that share a network address and are scheduled together onto one node.
- A Kanvas component is a Kubernetes object in design form: its configuration is the object's manifest, and Deploy turns it into a live object.
- Labels identify objects, and a Service's selector uses labels to find the Pods it sends traffic to.
- Deploying a design again updates the cluster in place instead of creating duplicates.
- Operator shows what actually runs in the cluster, which is the ground truth when it differs from the design.

## Before you begin

- **A cluster-backed environment.** Use Meshery Playground (https://play.meshery.io), a shared live cluster, or a self-hosted Meshery with a connected Kubernetes cluster. Hosted kanvas.new has no cluster actions; Validate, Deploy, and Undeploy there open a prompt to self-host instead.
- **An environment that holds your cluster's connection.** Deploy targets Meshery environments and the Kubernetes connections assigned to them. See [Environments](https://docs.meshery.io/concepts/logical/environments).
- **Operator mode for the inspection phases.** Operator reads the cluster through Meshery Operator and MeshSync, which must run in the cluster. Where Operator mode is turned off, its switch is disabled; the deploy summary still confirms each object.
- **A unique prefix.** Playground is shared with other users. Pick a short prefix, such as your handle, and use it in every name and label. This tutorial uses `alex`.

You need basic familiarity with containers and Kubernetes manifests. You do not need to write YAML.

## The scenario

You build two objects in one design:

```text
Service  alex-nginx-np   type NodePort, port 80, selector app=alex-nginx
    |
    |  Network relationship (traffic flows from the Service to the Pod)
    v
Pod      alex-nginx      label app=alex-nginx
    +-- container nginx  image nginx:latest, port 80
```

You deploy the Pod first, inspect it, then add the Service and deploy again.

## Build the Pod

1. Create a new design and name it `alex-pods`. Kanvas saves the design automatically as soon as it has a name or a component; there is no Save button.
2. Add a **Pod** component. The Kubernetes icon in the dock lists every Kubernetes kind, and the component palette search finds it too. The component's configurator opens as soon as the Pod lands on the canvas.
3. Set the Pod's name to `alex-nginx` and leave the namespace as `default`.
4. Add one entry to the Pod's containers: name `nginx`, image `nginx:latest`, and a container port of `80`. Containers is a list, so each entry opens in its own form.
5. In the configurator's **Labels** tab, add the label `app` with the value `alex-nginx`.

**What just happened.** The configurator form is generated from the Pod's schema in the Meshery registry, so its fields are the Kubernetes API fields. Required fields carry a red asterisk. Each edit is written to the design after a short pause; Kanvas then checks the changed component against its schema and marks problems beside the field. Those marks are warnings and never block you. The component you built is equivalent to this manifest:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: alex-nginx
  namespace: default
  labels:
    app: alex-nginx
spec:
  containers:
    - name: nginx
      image: nginx:latest
      ports:
        - containerPort: 80
```

**Check your work.** The Pod sits on the canvas without a warning badge. If a badge with an error count appears on the component, select it to see each error; it leads to the field that needs attention.

## Check the design before deploying

1. Run **Validate** from the design's **Actions** menu.
2. Run **Dry Run** from the same menu.

**What just happened.** Validate runs in your browser. It checks each component against its schema and never contacts the cluster, so it cannot catch cluster-side problems such as a missing namespace or a name already in use. Its errors are advisory. Dry Run sends each object to the cluster's API server as a server-side dry run: the API server applies its full validation and admission checks and persists nothing. Dry Run from the Actions menu targets the clusters selected in Meshery's context selector.

**Check your work.** Validate reports `No validation errors.` and Dry Run reports `No deployment errors.` A Pod without any container fails the dry run with a `Field Value Required` error on the containers field; add the container and run it again.

## Deploy and verify

1. Run **Deploy** from the **Actions** menu. The Deploy workflow has five steps: validation, choosing deployment targets, a dry run, a final review, and a summary.
2. Select the environment that holds your cluster's connection. Selecting an environment targets every Kubernetes connection assigned to it.
3. Continue past the dry run once it reports no errors, then confirm the deployment.

**What just happened.** Meshery Server turned each component into a Kubernetes object and sent it to every selected cluster. For each object it creates the object, or replaces it in place if an object of that kind and name already exists. It labels every object it applies with `design.meshery.io/id=<design id>` and records the design version and component id as annotations. That label is how Operator finds the objects that came from this design.

**Check your work.** The summary lists `Deployed Pod "alex-nginx"`, and a notification reads `Deployment completed for design 'alex-pods'.` Read the per-object rows, not only the notification: the notification reads "completed" even when individual objects failed, and failures appear only as `Failed to deploy` rows with an error card. If the summary spinner never finishes, the request failed before it reached the cluster, most often because your session expired; reload Kanvas, sign in, and deploy again.

## Inspect the Pod in Operator

1. Switch to **Operator**, either with the mode switch or with **Open In Operator** on the deploy summary. With the design open, Operator shows a view scoped to this design: only objects that carry this design's id label.
2. Select the `alex-nginx` Pod to open its details panel, and switch the panel from **Summary** to **Details** to see every field.

**What just happened.** Operator draws the objects that MeshSync reports from the cluster, not the objects in your design. For a Pod, the details panel shows its phase as a status chip, the Pod IP, the host IP of its node, its QoS class, restart count, and each container's image, ports, start time, and image pull policy. The QoS class is `BestEffort` because the container sets no resource requests or limits. The view is a snapshot: Operator loads it when you open a view, change a filter, or change the selected cluster, and it does not update on its own. To see later changes, change a filter or switch back to Operator.

**Check your work.** The status chip reads `Running`. A `Pending` Pod is not scheduled yet or is still pulling its image; load a fresh snapshot after a few seconds. If it stays `Pending`, the container status shows why, for example an image pull failure caused by a mistyped image name. If the canvas reads `No data available for the current view`, the snapshot found no objects with this design's label: MeshSync has not reported the Pod yet, or the deploy failed. If it reads `No Kubernetes context selected`, select your cluster in Meshery's context selector.

## Open a shell and stream logs

1. Start a terminal on the Pod with **Initiate Terminal Session**, which is in the Pod's right-click menu and in the details panel header. A terminal panel opens with one tab per container in the Pod.
2. Run `hostname`. It prints `alex-nginx`, because a Pod's name is the hostname of its containers.
3. Run `cat /usr/share/nginx/html/index.html` to read the page NGINX serves.
4. Start a log stream on the same Pod with **Initiate Log Session**. A log tab opens in the same panel.

**What just happened.** Kanvas asks MeshSync, inside the cluster, to open `/bin/sh` in the container through the Kubernetes exec API, the same mechanism `kubectl exec` uses. The shell runs with MeshSync's cluster permissions. The terminal sends each line when you press Enter and `Ctrl+C` sends an interrupt, so line-based commands work and full-screen programs such as `vim`, `top`, and `less` do not. Images without `/bin/sh`, such as distroless images, cannot open a shell.

The log tab shows the last 1,000 lines from every container in the Pod and then follows new output. Each line starts with `[alex-nginx:nginx]` and a Kubernetes timestamp; stdout and stderr are combined. NGINX's container entrypoint writes its startup messages here. Closing the panel hides it without ending the sessions; the trash icon on a tab ends that session.

**Check your work.** The shell prints the Pod name and the HTML page. If the terminal tab stays blank, the session did not start, and Kanvas does not display the reason. The usual causes are a container without `/bin/sh`, a Pod that is not `Running`, or MeshSync not connected. When a Pod is deleted, its log stream stops without a notice.

## Expose the Pod with a NodePort Service

1. Switch back to **Designer** and add a **Service** component named `alex-nginx-np`.
2. Set the Service type to `NodePort` and add one port with port `80` and target port `80`. Leave the node port empty so Kubernetes assigns a free one from the node port range (30000 to 32767 by default). On a shared cluster, a fixed node port that someone else holds fails the dry run.
3. Set the Service's selector to `app: alex-nginx`, the same label the Pod carries.
4. Draw a **Network** relationship from the Service to the Pod. Edge handles appear when you hover a component; choose the network option and drag to the Pod. Compatible targets show a green outline while you drag, and releasing anywhere else creates nothing.
5. Run **Deploy** again with the same environment.

**What just happened.** Kubernetes routes Service traffic by the selector alone: every `Running` Pod whose labels match the selector becomes a backend of the Service. The Network relationship records the same connection in the design so that readers of the diagram see where traffic flows, and its edge shows the port values it reads from both components. Kanvas evaluates relationships after every change, and a relationship's registry definition can copy designated fields from one component to the other. The selector you set is what Kubernetes acts on, so confirm it in the Service's configurator after you draw the edge.

Deploying the same design again creates objects that are missing and replaces objects that already exist. The Service is created; the Pod is submitted unchanged and keeps running. Kubernetes treats almost every field of a running Pod as immutable, so changing a Pod beyond its container image means deleting it and creating it again, one of the reasons real workloads use Deployments.

**Check your work.** The summary lists `Deployed Service "alex-nginx-np"`. Switch to Operator and select the Service. Its details show the service type `NodePort`, a cluster IP, the selector `app=alex-nginx`, and, under its connections, the ports including the node port Kubernetes assigned. The Service is reachable at `http://<node IP>:<node port>` from any machine that can reach the node; the Pod's host IP is one such node address. In Playground, node IPs are often not reachable from your browser. The assigned node port still confirms that Kubernetes exposed the Pod.

## Clean up

Run **Undeploy** from the **Actions** menu and select the same environment. The Undeploy workflow has the same five steps as Deploy, and its dry run checks the deletions.

Undeploy deletes each component's object by kind, name, and namespace: here, the Pod and the Service. It matches by name, not by the design label, so an object with the same kind, name, and namespace that someone else created is deleted too. That is another reason to use unique names on a shared cluster. Namespaces are removed only when the design contains a Namespace component. If an object is already gone, the dry-run step reports it as not found; select the bypass option to continue, because the real undeploy ignores missing objects.

The design itself stays in your account. Delete it from the design's file menu if you no longer need it. Deleting a design never removes objects from a cluster, so undeploy first.

## What you learned

- A Pod is one or more containers that share a hostname and network address. A standalone Pod has no controller, so nothing replaces it.
- Each Kanvas component maps to one Kubernetes object, and its configurator edits that object's manifest.
- Validate checks schemas in the browser; Dry Run asks the cluster's API server; Deploy creates or replaces each object and labels it with the design id.
- A Service finds its Pods by label selector. The Network relationship documents the connection in the design.
- Operator shows a snapshot of what runs in the cluster, and it is where you open a shell and stream logs.

## Next steps

- Continue with [Explore Deployments](/pr-preview/pr-1348/kanvas/tutorials/kubernetes/kubernetes-deployments/) to let a controller manage your Pods.
- Read [Deploying designs](/pr-preview/pr-1348/kanvas/guides/deploying/deploying-designs/) for every option in the Deploy workflow.
- Read [Operator](/pr-preview/pr-1348/kanvas/concepts/operator/) to understand how Operator sees a cluster, and [Interactive terminal](/pr-preview/pr-1348/kanvas/guides/operating/interactive-terminal/) and [Log streaming](/pr-preview/pr-1348/kanvas/guides/operating/log-streaming/) for the full session behavior.

