# Explore Deployments


> Build a replicated NGINX Deployment in Kanvas, scale it, roll it to a new image, and watch the ReplicaSets and Pods it manages in Operator.


In this tutorial you build an NGINX Deployment with two replicas, deploy it, scale it to three, and roll it to a new image version, inspecting the result in Operator after each change. A Deployment is the controller most stateless applications run under: you declare how many Pods you want and what they look like, and Kubernetes keeps that many running and replaces them gradually when the template changes. Seeing the ReplicaSets and Pods appear and change shows you what the controller does on your behalf.

## What you will learn

- A Deployment owns ReplicaSets, and each ReplicaSet owns Pods built from one version of the Pod template.
- The Deployment's selector must match its Pod template's labels, and Kubernetes never lets you change the selector afterward.
- Scaling changes how many Pods run without creating a new ReplicaSet; changing the template starts a rolling update with a new ReplicaSet.
- Deploying a changed design from Kanvas replaces the object in place, which is how you update a running workload.

## Before you begin

- **A cluster-backed environment.** Use Meshery Playground (https://play.meshery.io), a shared live cluster, or a self-hosted Meshery with a connected Kubernetes cluster. Hosted kanvas.new has no cluster actions; Validate, Deploy, and Undeploy there open a prompt to self-host instead.
- **An environment that holds your cluster's connection.** Deploy targets Meshery environments and the Kubernetes connections assigned to them. See [Environments](https://docs.meshery.io/concepts/logical/environments).
- **Operator mode** for the inspection phases, which needs Meshery Operator and MeshSync running in the cluster. Where Operator mode is turned off, its switch is disabled; the deploy summary still confirms each object.
- **A unique prefix.** Playground is shared. Use your own prefix in every name and label; this tutorial uses `alex`.
- **The Pods tutorial.** [Explore Pods](/pr-preview/pr-1281/kanvas/tutorials/kubernetes/kubernetes-pods/) introduces the configurator, Validate, Dry Run, Deploy, and Operator, which this tutorial uses without re-explaining.

## The scenario

```text
Deployment  alex-web   replicas 2, selector app=alex-web, label app=alex-web
    |
    +-- ReplicaSet  alex-web-<template hash>          (created by Kubernetes)
            +-- Pod  alex-web-<template hash>-<id>    (created by Kubernetes)
            +-- Pod  alex-web-<template hash>-<id>
```

You design only the Deployment. Kubernetes creates the ReplicaSet and Pods from it.

## Build the Deployment

1. Create a new design named `alex-deployments` and add a **Deployment** component. The configurator opens as soon as the component lands on the canvas.
2. Set the name to `alex-web` and leave the namespace as `default`.
3. Set replicas to `2`.
4. Set the selector's match labels to `app: alex-web`.
5. In the Pod template, set the template's metadata labels to `app: alex-web`, the same pair as the selector.
6. In the Pod template's spec, add one container: name `web`, image `nginx:1.27`, container port `80`.
7. In the configurator's **Labels** tab, add the label `app: alex-web` to the Deployment itself. You use it later to find everything the Deployment owns.

**What just happened.** The Deployment's configuration mirrors its manifest. The selector tells the Deployment which Pods belong to it, and the template is the blueprint for those Pods. Nested objects such as the selector and the template open in their own forms. The component is equivalent to:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: alex-web
  labels:
    app: alex-web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: alex-web
  template:
    metadata:
      labels:
        app: alex-web
    spec:
      containers:
        - name: web
          image: nginx:1.27
          ports:
            - containerPort: 80
```

**Check your work.** Run **Validate** and then **Dry Run** from the **Actions** menu. Validate checks the schema in your browser; Dry Run asks the cluster's API server, which also checks rules the schema cannot express. If the selector and the template labels differ, the dry run fails with a `Field Value Invalid` error on the template labels, stating that the selector does not match the template labels. Fix the pair and run the dry run again.

## Deploy and see what Kubernetes created

1. Run **Deploy** from the **Actions** menu, select the environment that holds your cluster's connection, and confirm once the dry run reports no errors.
2. Switch to **Operator**. With the design open, Operator shows a view scoped to this design: the objects that carry this design's id label.
3. Select the `alex-web` Deployment and switch its details panel to **Details**.
4. Select the `app=alex-web` label chip in the details panel. This adds the label to the view's filter, and the view reloads.

**What just happened.** Kanvas sent one object, the Deployment, and labeled it with the design id. The Deployment controller then created a ReplicaSet, and the ReplicaSet created two Pods. Those objects come from the controller, not from Kanvas, so they carry the template's labels (plus a `pod-template-hash` label that Kubernetes adds) instead of anything Kanvas applies. Label filters in a view match objects that carry any of the listed labels, so adding `app=alex-web` brings the ReplicaSet and the Pods into the view alongside the Deployment.

The names show the ownership chain: the ReplicaSet is named after the Deployment plus a hash of the Pod template, and each Pod is named after its ReplicaSet plus a random suffix.

**Check your work.** The Deployment's details show pods `2 / 2` (available out of desired), the selector `app=alex-web`, and the image `nginx:1.27`. The view holds one ReplicaSet and two `Running` Pods. Operator shows a snapshot, so if Pods are still starting, change a filter or switch back to Operator to load a fresh one. If the summary reported `Failed to deploy Deployment "alex-web"`, open its error card; on a shared cluster the most common cause is a name another user already deployed.

## Scale the Deployment

1. Switch to **Designer** and change replicas from `2` to `3`.
2. Run **Deploy** again with the same environment.
3. Switch to **Operator** to load a fresh snapshot.

**What just happened.** Deploy replaced the existing Deployment in place with your new configuration; it did not create a second one. The controller saw that the desired count rose to three and told the existing ReplicaSet to create one more Pod. Scaling does not touch the Pod template, so no new ReplicaSet appears.

**Check your work.** The Deployment shows pods `3 / 3`, and the same ReplicaSet now owns three Pods. Two Pods keep their original names and ages; the new one is younger.

## Roll out a new image

1. Switch to **Designer** and change the container image from `nginx:1.27` to `nginx:1.28`.
2. Run **Deploy** again.
3. Switch to **Operator** and look at the ReplicaSets and Pods.

**What just happened.** Changing the Pod template gave it a new hash, so the controller created a new ReplicaSet and shifted Pods to it gradually. With the default rolling update strategy, Kubernetes starts new Pods before removing old ones and keeps at least three quarters of the desired Pods available throughout. The old ReplicaSet stays at zero replicas so that Kubernetes can roll back to it.

**Check your work.** The view holds two ReplicaSets: the new one owns three Pods with fresh names, and the old one owns none. The Deployment's details show the image `nginx:1.28`. A snapshot taken mid-rollout shows Pods under both ReplicaSets; load a fresh snapshot to see the finished state. If you mistype the image tag, the new Pods cannot pull it and stay not ready, the rollout stalls, and the old Pods keep serving. Correct the tag and deploy again.

A change to a field Kubernetes treats as immutable, such as the Deployment's selector, does not apply, and the Deploy summary still reports `Deployed`. To change the selector, undeploy the Deployment and deploy it again.

## Clean up

Run **Undeploy** from the **Actions** menu and select the same environment. Undeploy deletes the `alex-web` Deployment by kind, name, and namespace; Kubernetes garbage collection then removes the ReplicaSets and Pods it owns. Undeploy matches by name, not by the design label, so a same-named Deployment created by someone else in the same namespace is deleted too. If the dry-run step reports the Deployment as not found, it is already gone; select the bypass option to finish.

The design stays in your account until you delete it from the design's file menu. Deleting a design never removes cluster objects.

## What you learned

- You declare a Deployment; Kubernetes creates the ReplicaSets and Pods and keeps the desired count running.
- The selector must match the template labels and is immutable once deployed.
- Scaling reuses the existing ReplicaSet; a template change creates a new ReplicaSet and rolls Pods over to it, keeping the old one for rollback.
- Deploying a changed design replaces the object in place, and a label filter in Operator reveals objects that Kubernetes created on your behalf.

## Next steps

- Continue with [Explore Services](/pr-preview/pr-1281/kanvas/tutorials/kubernetes/kubernetes-services/) to put a stable address in front of these Pods.
- Read [Deploying designs](/pr-preview/pr-1281/kanvas/guides/deploying/deploying-designs/) for every option in the Deploy workflow.
- Read [Operator](/pr-preview/pr-1281/kanvas/concepts/operator/) to understand views, filters, and snapshots.

