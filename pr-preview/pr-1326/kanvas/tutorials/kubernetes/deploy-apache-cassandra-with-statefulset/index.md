# Deploy Cassandra with a StatefulSet


> Deploy a three-node Apache Cassandra ring from Kanvas and learn how a StatefulSet and a headless Service give each replica a stable name, a stable volume, and an ordered start.


In this tutorial you deploy Apache Cassandra as a three-node ring. A Deployment treats its Pods as interchangeable; Cassandra cannot, because each node owns part of the data and other nodes must find it at a known address. A StatefulSet gives every replica a fixed ordinal, a fixed DNS name, and its own volume, and starts the replicas one at a time. You import the Kubernetes example manifests into a Kanvas design, adapt them to your cluster, deploy, and watch the ring form.

## What you will learn

- How a headless Service gives each StatefulSet Pod its own DNS name.
- Why ordinals and stable network identity let a clustered database find its peers.
- How a StatefulSet starts replicas in order and why that matters for a seed node.
- How volume claim templates give each replica its own persistent storage, and why that storage outlives the StatefulSet.

## Before you begin

- **A cluster-backed Kanvas environment.** Deploying needs a Kubernetes cluster connected to Meshery. Use [Meshery Playground](https://play.meshery.io), a shared live cluster, or a self-hosted Meshery with a connected cluster. Hosted kanvas.new does not run cluster actions: Validate, Deploy, and Undeploy there open a prompt to self-host instead. Operator views and terminal sessions also need Meshery Operator and MeshSync running in the cluster.
- **Dynamic storage.** The cluster needs a default StorageClass that provisions volumes on demand, because each Cassandra node claims its own volume.
- **Capacity.** Each Cassandra Pod requests half a CPU and 1Gi of memory, three Pods in total.
- **Persistence basics.** You have completed [Deploy WordPress and MySQL with Persistent Volumes](/pr-preview/pr-1326/kanvas/tutorials/kubernetes/wordpress-mysql-persistentvolume/), or you know how claims bind to volumes.
- **A namespace of your own.** Playground is shared, and Deploy and Undeploy act on objects by kind and name. This tutorial uses the namespace `cassandra-ada`; substitute your own.

## The scenario

```text
  cassandra (Service, clusterIP: None, port 9042)
      |  gives each Pod a DNS name: <pod>.cassandra.<namespace>.svc.cluster.local
      |
  cassandra (StatefulSet, 3 replicas, serviceName: cassandra)
      |
      +-- cassandra-0  -->  cassandra-data-cassandra-0 (PVC, 1Gi)   seed node, starts first
      +-- cassandra-1  -->  cassandra-data-cassandra-1 (PVC, 1Gi)   starts when cassandra-0 is Ready
      +-- cassandra-2  -->  cassandra-data-cassandra-2 (PVC, 1Gi)   starts when cassandra-1 is Ready
```

[cassandra-service.yaml](https://kubernetes.io/examples/application/cassandra/cassandra-service.yaml) holds the headless Service. [cassandra-statefulset.yaml](https://kubernetes.io/examples/application/cassandra/cassandra-statefulset.yaml) holds the StatefulSet and a StorageClass named `fast`. The Pods and claims in the diagram are not in either manifest: the StatefulSet controller creates them from the StatefulSet's Pod template and volume claim template.

## Import and merge the manifests

1. On an empty canvas, import `https://kubernetes.io/examples/application/cassandra/cassandra-service.yaml` with the **Import Design** dialog (URL Import), named after your design, for example `cassandra-ada`.
2. Import `https://kubernetes.io/examples/application/cassandra/cassandra-statefulset.yaml` and choose **Merge into current**.

**What just happened.** Each import converted a manifest into components and saved it as its own design in your account; the merge copied the StatefulSet manifest's components into the open design. If an import fails with `Failed to import design "<name>"`, download the file and import it with File Upload, keeping the `.yaml` extension.

**Check your work.** The canvas shows three components: a Service, a StatefulSet, and a StorageClass.

## Adapt the manifests to your cluster

The example targets a single-node minikube cluster in the `default` namespace. Three changes make it portable.

1. **Namespace.** Set the namespace of the Service and the StatefulSet to `cassandra-ada`.
2. **Seed address.** In the StatefulSet's container environment variables, change `CASSANDRA_SEEDS` from `cassandra-0.cassandra.default.svc.cluster.local` to `cassandra-0.cassandra.cassandra-ada.svc.cluster.local`.
3. **Storage.** Delete the `fast` StorageClass component, and clear the storage class name in the StatefulSet's volume claim template so each claim uses the cluster's default StorageClass.

**What just happened.** The seed address is the heart of this tutorial. A new Cassandra node joins the ring by contacting a seed, so the seed's address must be known before any Pod exists. A StatefulSet makes that possible: its Pods are named `<statefulset>-<ordinal>`, and the headless Service named in `serviceName` gives each one the DNS name `<pod>.<service>.<namespace>.svc.cluster.local`. `cassandra-0` therefore always answers at the same name, even after it is rescheduled to another node with a new IP address. The name includes the namespace, which is why the seed must change with it.

The `fast` StorageClass uses the minikube host-path provisioner, which provisions nothing on other clusters; claims against it stay Pending, and so do the Pods. A StorageClass is also cluster-scoped, so on a shared cluster its name can collide with another reader's. If you run minikube and keep the StorageClass, expect the dry run to report a not-found error for it even though the object is valid; bypass that error at the dry-run step.

**Check your work.** The design holds two components, both in `cassandra-ada`, and the seed address names your namespace.

## Deploy the ring

1. Run **Validate**, then **Deploy**, and select the environment that holds your cluster connection.
2. At the dry-run step, expect a not-found error for both components on the first deployment, because a dry run does not create namespaces and `cassandra-ada` does not exist yet. Select **Bypass errors and initiate deployment**.
3. Confirm the deployment and read the summary.

**What just happened.** Meshery Server created the namespace and applied both objects, in parallel and in no particular order. Kanvas applies only the two objects in your design. Everything after that is the StatefulSet controller's work: it creates `cassandra-0` and its claim, waits until that Pod is Running and Ready, then creates `cassandra-1`, then `cassandra-2`. Ordered start matters here because `cassandra-0` is the seed; the later nodes join a ring that already exists instead of racing to form separate ones. The readiness probe in the Pod template tells the controller when a node is ready.

**Check your work.** The summary lists two `Deployed` rows: Service `cassandra` and StatefulSet `cassandra`. A `Failed to deploy` row carries an error card with the cause and remediation.

## Watch ordered startup in Operator

1. Open the design in Operator, then filter by your namespace in the Layers panel so the view includes the Pods and claims the controller created.
2. Change a filter every minute or so to refresh the snapshot, and watch `cassandra-0`, `cassandra-1`, and `cassandra-2` appear in turn. Cassandra takes a few minutes to bootstrap each node.
3. Select the StatefulSet. Its details show available Pods out of replicas, the selector, the image, and the update strategy.
4. Open the **Storage** group in the Layers panel and select `cassandra-data-cassandra-0`. Its details show the requested size, storage class, and access modes.
5. Right-click `cassandra-0`, start a terminal session, and run `nodetool status`.

**What just happened.** Operator draws a snapshot from MeshSync and refetches only when you open a view, change a filter, or change clusters, which is why you refresh to follow the rollout. Each claim is named `<template>-<pod>`, so `cassandra-0` always mounts `cassandra-data-cassandra-0`. Ordinal, DNS name, and volume form one identity: if `cassandra-0` is deleted, its replacement gets the same name, the same address, and the same data.

**Check your work.** Three Pods are Running and Ready, three claims are Bound, and `nodetool status` lists three nodes with status `UN` (up, normal). If only `cassandra-0` exists after several minutes, it has not passed its readiness probe, so the controller is holding the others back; read its logs with a log session. If `cassandra-0` is Pending, its claim is Pending: the cluster has no default StorageClass, or it is out of CPU or memory.

## Clean up

1. Run **Undeploy** and select the same environment.
2. Delete the design and the single-manifest Cassandra design if you no longer need them. See [Deleting a design](/pr-preview/pr-1326/kanvas/guides/designs/deleting-a-design/).
3. Delete the claims, if you have `kubectl` access to the cluster: `kubectl delete pvc -l app=cassandra -n cassandra-ada`.

Undeploy deletes each component's object by kind and name, so it removes the Service and the StatefulSet; Kubernetes then deletes the StatefulSet's Pods. It does not remove the three claims. They are not components in the design, and Kubernetes keeps volume claims when a StatefulSet is deleted, by design, so that a database's data is never lost by accident. If you deploy the design again, the new `cassandra-0` mounts the old `cassandra-data-cassandra-0` and finds its data. The namespace also remains, because the design has no Namespace component. See [Undeploying designs](/pr-preview/pr-1326/kanvas/guides/deploying/undeploying-designs/) for the full removal behavior.

## What you learned

- A headless Service plus a StatefulSet gives every replica a DNS name built from its ordinal, so peers can be configured before they exist.
- Stable identity means name, address, and volume travel together across rescheduling.
- The StatefulSet controller starts replicas in order and waits for readiness, which lets the seed node form the ring before others join.
- Volume claim templates give each replica its own claim, and those claims outlive both the StatefulSet and Undeploy.
- Kanvas deploys and removes only the objects in the design; controllers create and own the rest.

## Next steps

- Review every deploy option and failure mode in [Deploying designs](/pr-preview/pr-1326/kanvas/guides/deploying/deploying-designs/).
- Learn how Operator discovers and draws cluster resources in [Operator](/pr-preview/pr-1326/kanvas/concepts/operator/).
- Revisit storage binding and reclaim behavior in [Deploy WordPress and MySQL with Persistent Volumes](/pr-preview/pr-1326/kanvas/tutorials/kubernetes/wordpress-mysql-persistentvolume/).

