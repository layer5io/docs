# Deploy WordPress and MySQL with Persistent Volumes


> Build a stateful two-tier application in Kanvas with a Secret and PersistentVolumes, deploy it, and learn what persists, where, and what Undeploy leaves behind.


In this tutorial you deploy WordPress backed by a MySQL database, and you give both tiers storage that outlives their Pods. You import the two Kubernetes example manifests into one design, add the Secret that holds the database password, and add the PersistentVolumes that the claims bind to. Stateless Pods can be replaced at any moment; a database cannot lose its files when that happens. This tutorial shows how Kubernetes separates the data from the Pod, and exactly which pieces a deploy creates and an undeploy removes.

## What you will learn

- How a PersistentVolumeClaim requests storage and how Kubernetes binds it to a PersistentVolume.
- Why data on a volume survives Pod restarts, and where it physically lives with a `hostPath` volume.
- How a Secret passes a password to containers without writing it into the Deployment, and what a Secret does not protect.
- How labels and sections organize a design without changing what it deploys.
- What Undeploy removes and what it leaves in place.

## Before you begin

- **A cluster-backed Kanvas environment.** Deploying needs a Kubernetes cluster connected to Meshery. Use [Meshery Playground](https://play.meshery.io), a shared live cluster, or a self-hosted Meshery with a connected cluster. Hosted kanvas.new does not run cluster actions: Validate, Deploy, and Undeploy there open a prompt to self-host instead. Operator views and terminal sessions also need Meshery Operator and MeshSync running in the cluster.
- **The multi-tier pattern.** You have completed [Deploy a PHP Guestbook with Redis](/pr-preview/pr-1342/kanvas/tutorials/kubernetes/deploy-php-redis/), or you already know how to import and merge manifests and how Services select Pods. [Understanding Kubernetes ConfigMaps and Secrets](/pr-preview/pr-1342/kanvas/tutorials/kubernetes/kubernetes-configmaps-secrets/) covers Secrets in more depth.
- **Unique names.** Playground is shared. Deploy replaces any object with the same kind, name, and namespace, and Undeploy deletes by kind and name. This tutorial uses the namespace `wordpress-ada` and the prefix `ada` for cluster-wide names; substitute your own.

## The scenario

You build nine objects. Two of them, the PersistentVolumes, are cluster-scoped; the rest live in your namespace.

```text
  wordpress (Service, LoadBalancer, port 80)          mysql-pass (Secret)
        |                                              /          \
  wordpress (Deployment) ---- WORDPRESS_DB_PASSWORD --'            '-- MYSQL_ROOT_PASSWORD
        |        \                                                       |
        |         '-- connects to host "wordpress-mysql" -->  wordpress-mysql (Service, headless, 3306)
        |                                                                |
  wp-pv-claim (PVC, 20Gi)                                  wordpress-mysql (Deployment, Recreate)
        |                                                                |
  ada-wp-pv (PV, hostPath)                                 mysql-pv-claim (PVC, 20Gi)
                                                                         |
                                                           ada-mysql-pv (PV, hostPath)
```

The two manifests, [mysql-deployment.yaml](https://kubernetes.io/examples/application/wordpress/mysql-deployment.yaml) and [wordpress-deployment.yaml](https://kubernetes.io/examples/application/wordpress/wordpress-deployment.yaml), each hold a Service, a PersistentVolumeClaim, and a Deployment. They do not include the Secret or any PersistentVolume: both Deployments expect a Secret named `mysql-pass`, and the claims expect the cluster to provide storage. You add those pieces yourself.

## Import and merge the manifests

1. On an empty canvas, import `https://kubernetes.io/examples/application/wordpress/mysql-deployment.yaml` with the **Import Design** dialog (URL Import). Name it after your design, for example `wordpress-ada`.
2. Import `https://kubernetes.io/examples/application/wordpress/wordpress-deployment.yaml` and choose **Merge into current**.
3. Set the namespace of all six components to `wordpress-ada`.

**What just happened.** Each import converted one multi-document manifest into components and saved it as its own design; merging copied the second design's components into the open one. The open design now holds six components, and your account also holds the single-manifest WordPress design, which you can delete at the end. Deploy creates the `wordpress-ada` namespace if it does not exist.

**Check your work.** The canvas shows two Deployments, two Services, and two PersistentVolumeClaims. If an import fails with `Failed to import design "<name>"`, download the file and import it with File Upload, keeping the `.yaml` extension.

## Add the Secret for the database password

Both Deployments read the password from the Secret `mysql-pass`, key `password`:

```yaml
env:
- name: MYSQL_ROOT_PASSWORD
  valueFrom:
    secretKeyRef:
      name: mysql-pass
      key: password
```

1. Encode a throwaway password in base64, for example `echo -n 'tutorial-only' | base64`.
2. Add a **Secret** component from the Kubernetes components in the dock.
3. Set its name to `mysql-pass`, its namespace to `wordpress-ada`, and its type to `Opaque`.
4. Add one data entry with the key `password` and your base64 value.

**What just happened.** The Deployments refer to the password by Secret name and key, so the password never appears in either Deployment, and you can change it without editing them. Base64 is an encoding, not encryption. The value is stored in your design, and new designs are saved with public visibility, so anyone who can open the design can decode it. Use a password that protects nothing else. In Operator, the details panel shows a Secret's type but not its values; the resource download from the details panel does include them.

**Check your work.** The Secret's name and key match the `secretKeyRef` exactly. A mismatch does not fail Validate or the dry run; it shows up after deployment as Pods that never start, with a status such as `CreateContainerConfigError`.

## Add PersistentVolumes and bind the claims

The claims in the manifests request 20Gi each and name no storage class, which means "use the cluster's default dynamic provisioner". Instead, you provide the volumes yourself and bind each claim to them through a storage class name of your own.

1. Add two **PersistentVolume** components. They are cluster-scoped, so they have no namespace field, and their names must be unique across the whole cluster: name them `ada-wp-pv` and `ada-mysql-pv`.
2. On both, set the storage class name to `ada-manual`, add the access mode `ReadWriteOnce`, and set the capacity to `storage: 20Gi`.
3. Give each a `hostPath` volume source with type `DirectoryOrCreate`: path `/mnt/data/ada-wp-pv` for the WordPress volume and `/mnt/data/ada-mysql-pv` for the MySQL volume.
4. Set the storage class name of both claims, `wp-pv-claim` and `mysql-pv-claim`, to `ada-manual`.

**What just happened.** A claim is a request: "20Gi, mounted read-write by one node, from class `ada-manual`." The Kubernetes control plane binds each claim to an available volume of the same class with a compatible access mode and at least the requested capacity. The class name needs no StorageClass object behind it; it only has to match. A class name unique to you keeps another reader's claim from binding your volume. A `hostPath` volume is a directory on the node where the Pod runs, so the data belongs to that node. That is acceptable for learning and wrong for production, where a node failure takes the data with it.

**Check your work.** You have two PersistentVolumes and two claims, all with the class `ada-manual`, and each volume's capacity is at least its claim's request.

## Label and group the components

1. Add the label `tutorial: wordpress-ada` to every component in its **Labels** tab.
2. Add two sections (the Section tool in the dock, or press `S`). Name one `web tier` and the other `database tier`, and drag the WordPress and MySQL components into their sections.

**What just happened.** Labels on a component become labels on the object it deploys, so you can filter for all of your objects at once in Operator, across kinds. These labels change object metadata only. They do not change any Deployment's Pod template or any Service's selector, so they do not affect traffic. Sections are annotations: a section is saved with the design, components inside it move with it, and Deploy skips it because annotations are never applied to the cluster.

**Check your work.** The design has nine Kubernetes components inside two sections, and each component lists the new label.

## Deploy and verify

1. Run **Validate**, then **Deploy**. Select the environment that holds your cluster connection.
2. At the dry-run step, expect a not-found error for each namespaced component on the first deployment: a dry run does not create namespaces, and `wordpress-ada` does not exist yet. Select **Bypass errors and initiate deployment**. Any other error names the field at fault.
3. Confirm the deployment and read the summary.

**What just happened.** Meshery Server created the namespace, then created each object, or replaced it in place if it already existed. Independent components are applied in parallel, with no ordering. Kubernetes reconciles the rest: a Pod waits for its claim to bind, a container that starts before its Secret exists retries, and WordPress restarts until MySQL accepts connections. The MySQL Deployment uses the `Recreate` strategy so that an update stops the old Pod before the new one mounts the same `ReadWriteOnce` volume.

**Check your work.** The summary lists nine `Deployed` rows. A `Failed to deploy` row carries an error card with the cause and remediation. Read the rows even when the notification says the deployment completed, since it also says so when some components failed.

## Inspect storage in Operator

1. Open the design in Operator. The view is scoped to the objects your design created.
2. In the Layers panel, open the **Storage** group and turn on PersistentVolumes and PersistentVolumeClaims, or filter by the label `tutorial=wordpress-ada`.
3. Select `ada-mysql-pv`. Its details show capacity, the bound claim and its namespace, access modes, and storage class.
4. Select the `wordpress` Service. Its type is `LoadBalancer`.
5. Optional: right-click the MySQL Pod, start a terminal session, and run `ls /var/lib/mysql` to see the database files on the mounted volume.

**What just happened.** Operator shows a snapshot of the cluster from MeshSync, refetched when you open a view, change a filter, or change clusters; it does not stream. Change a filter to see Pods that were still starting. A `LoadBalancer` Service receives an external address only when the cluster has a load balancer integration, so on Playground the load balancer field stays empty and WordPress is reachable only inside the cluster.

**Check your work.** Both claims and both volumes show `Bound`, and both Pods are Running. A claim stuck in Pending means no volume matched its class, access mode, or size; compare the claim's storage class with the volume's. A Pod stuck in Pending is usually waiting for that claim.

## What persistence means here

MySQL writes its files to `/var/lib/mysql`, which is the mounted claim, which is bound to `ada-mysql-pv`, which is the directory `/mnt/data/ada-mysql-pv` on a node. When the Pod is replaced, for a crash, an update, or a rescheduling, the new Pod mounts the same claim and finds the same files. The data's lifetime is tied to the volume and the directory, not to any Pod.

The limit of this setup is the node. A `hostPath` directory exists on one node only. If the replacement Pod lands on a different node, it gets a different, empty directory. Production clusters use a storage class backed by network or cloud storage, which can follow a Pod from node to node. The Kubernetes documentation on [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) covers binding, reclaim policies, and dynamic provisioning in full.

## Clean up

1. Run **Undeploy** and select the same environment.
2. Delete the design and the single-manifest WordPress design if you no longer need them. See [Deleting a design](/pr-preview/pr-1342/kanvas/guides/designs/deleting-a-design/).

Undeploy deletes each component's object by kind and name. This design has a component for every object you built, so Undeploy removes both Deployments, both Services, the Secret, both claims, and both PersistentVolumes. Kubernetes holds a claim's deletion until no Pod uses it, and a volume's until no claim is bound to it, so the order resolves itself. Sections were never deployed, so there is nothing to remove for them. [Undeploying designs](/pr-preview/pr-1342/kanvas/guides/deploying/undeploying-designs/) describes removal in full.

Undeploy does not remove:

- **The data.** Deleting a manually created PersistentVolume object does not delete the files under `/mnt/data/ada-wp-pv` and `/mnt/data/ada-mysql-pv`. If you deploy again and the Pods land on the same node, MySQL starts with its old database.
- **The namespace.** `wordpress-ada` remains, empty, because the design has no Namespace component.
- **Anything not in the design.** Undeploy acts only on components it finds in the design. Had you removed the PersistentVolume components before undeploying, the volumes would stay in the cluster.

## What you learned

- A claim requests storage by class, access mode, and size; the control plane binds it to a matching volume, and a unique class name keeps the binding yours.
- Data lives on the volume, not in the Pod, so it survives Pod replacement; with `hostPath` it is also tied to one node.
- A Secret decouples a password from the Deployments that use it, but base64 is not encryption, and a Secret component stores its value in the design.
- Labels and sections organize a design. Labels also mark the deployed objects; sections never reach the cluster.
- Undeploy removes exactly the components in the design, by kind and name, and leaves volume data and unlisted objects in place.

## Next steps

- Give each replica its own identity and its own volume in [Deploy Cassandra with a StatefulSet](/pr-preview/pr-1342/kanvas/tutorials/kubernetes/deploy-apache-cassandra-with-statefulset/).
- Review every deploy option and failure mode in [Deploying designs](/pr-preview/pr-1342/kanvas/guides/deploying/deploying-designs/).
- Learn how Operator discovers and draws cluster resources in [Operator](/pr-preview/pr-1342/kanvas/concepts/operator/).

