# Explore Services


> Expose a Deployment and two Pods with ClusterIP, NodePort, and LoadBalancer Services in Kanvas and see what each Service type gives you in a live cluster.


In this tutorial you put three Services in front of running workloads: a ClusterIP Service in front of a Deployment, a NodePort Service in front of one Pod, and a LoadBalancer Service in front of another. Pods come and go and change IP addresses every time they are replaced. A Service gives a changing set of Pods one stable address and finds them by label, and its type decides who can reach that address. Building all three side by side makes the difference between the types concrete.

## What you will learn

- A Service selects its backend Pods by label, and any Pod whose labels match joins the Service automatically.
- A ClusterIP Service gets a virtual IP reachable only from inside the cluster.
- A NodePort Service adds a port on every node, and a LoadBalancer Service adds an external load balancer provisioned by the cluster's cloud provider.
- In Kanvas, the Network relationship documents which workload a Service sends traffic to, while the selector is what Kubernetes acts on.

## Before you begin

- **A cluster-backed environment.** Use Meshery Playground (https://play.meshery.io), a shared live cluster, or a self-hosted Meshery with a connected Kubernetes cluster. Hosted kanvas.new has no cluster actions; Validate, Deploy, and Undeploy there open a prompt to self-host instead.
- **An environment that holds your cluster's connection.** Deploy targets Meshery environments and the Kubernetes connections assigned to them. See [Environments](https://docs.meshery.io/concepts/logical/environments).
- **Operator mode** for the inspection phases, which needs Meshery Operator and MeshSync running in the cluster. Where Operator mode is turned off, its switch is disabled; the deploy summary still confirms each object.
- **A unique prefix.** Playground is shared. Use your own prefix in every name and label; this tutorial uses `alex`.
- **The earlier tutorials.** [Explore Pods](/pr-preview/pr-1281/kanvas/tutorials/kubernetes/kubernetes-pods/) and [Explore Deployments](/pr-preview/pr-1281/kanvas/tutorials/kubernetes/kubernetes-deployments/) cover building, deploying, and inspecting workloads, which this tutorial uses without re-explaining.

## The scenario

You build one design with six components and deploy it in three rounds:

| Service | Type | Selector | Backend |
|---|---|---|---|
| `alex-api-cip` | ClusterIP | `app=alex-api` | Deployment `alex-api`, 2 replicas |
| `alex-np` | NodePort | `app=alex-np` | Pod `alex-np-pod` |
| `alex-lb` | LoadBalancer | `app=alex-lb` | Pod `alex-lb-pod` |

Every workload runs `nginx:latest`, which listens on port 80. Every Service listens on port 80 and forwards to target port 80.

What each type exposes, and what you can observe in Meshery Playground:

| Type | Reachable from | Kubernetes allocates | In Playground |
|---|---|---|---|
| ClusterIP | Pods inside the cluster | A cluster IP | Works fully |
| NodePort | Anything that can reach a node | A cluster IP and a port on every node | The node port is assigned; node IPs are often unreachable from your browser |
| LoadBalancer | Clients outside the cluster | A cluster IP, a node port, and an external address from the cloud provider | No external address is assigned; it stays pending |

[Kubernetes request flow](/pr-preview/pr-1281/kanvas/concepts/kubernetes-request-flow/) follows a single request from a client through a Service to a Pod, and [Creating relationships](/pr-preview/pr-1281/kanvas/guides/designing/creating-relationships/) covers every relationship you can draw between components.

## Expose a Deployment with a ClusterIP Service

1. Create a new design named `alex-services`.
2. Add a **Deployment** named `alex-api` with replicas `2`, selector match labels `app: alex-api`, template labels `app: alex-api`, and one container named `web` with image `nginx:latest` and container port `80`. Add the label `app: alex-api` to the Deployment itself in the **Labels** tab.
3. Add a **Service** named `alex-api-cip`. Set its type to `ClusterIP`, add a port with port `80` and target port `80`, and set its selector to `app: alex-api`. Add the label `app: alex-api` to the Service in the **Labels** tab so it shows up with the workload when you filter by label.
4. Draw a **Network** relationship from the Service to the Deployment. Edge handles appear when you hover a component; choose the network option and drag to the Deployment. Compatible targets show a green outline while you drag, and releasing anywhere else creates nothing.
5. Run **Validate**, **Dry Run**, and then **Deploy** from the **Actions** menu, selecting the environment that holds your cluster's connection.

**What just happened.** The Service's selector, `app=alex-api`, matches the labels in the Deployment's Pod template, so both Pods the Deployment creates become backends of the Service. The selector points at Pod labels, not at the Deployment: Kubernetes matches Pods, whoever created them. Port `80` is the port clients use on the Service's address, and target port `80` is the container port that traffic is forwarded to.

The Network relationship records the same connection in the design so that anyone reading the diagram sees where traffic flows. Its edge shows the port values it reads from both components, and Kanvas evaluates relationships after every change; a relationship's registry definition can copy designated fields from one component to the other. Kubernetes routes by the selector alone, so confirm the selector in the Service's configurator after you draw the edge.

**Check your work.** The summary lists `Deployed Deployment "alex-api"` and `Deployed Service "alex-api-cip"`. Switch to **Operator**, select the Service, and switch its details panel to **Details**. It shows the service type `ClusterIP`, a cluster IP, no external IP, and the selector `app=alex-api`. The cluster IP is reachable only from inside the cluster: any Pod can send requests to it, and the cluster's DNS also resolves the name `alex-api-cip.default.svc.cluster.local` to it.

A selector that matches no Pods is not an error. The Service still deploys and gets a cluster IP, but it has no backends and requests to it fail. If you mistype the selector, nothing warns you; compare the selector with the Pod labels.

## Expose a Pod with a NodePort Service

1. Switch to **Designer** and add a **Pod** named `alex-np-pod` with the label `app: alex-np` and one container named `web`, image `nginx:latest`, container port `80`.
2. Add a **Service** named `alex-np`. Set its type to `NodePort`, add a port with port `80` and target port `80`, and set its selector to `app: alex-np`. Leave the node port empty so Kubernetes assigns a free one from the node port range (30000 to 32767 by default).
3. Draw a **Network** relationship from `alex-np` to `alex-np-pod`.
4. Run **Deploy** again with the same environment.

**What just happened.** A NodePort Service is a ClusterIP Service plus one port opened on every node in the cluster. Traffic that arrives at any node on that port is forwarded to the Service's backends, wherever they run. Deploying the design again created the two new objects; Kanvas also resubmitted the Deployment and the ClusterIP Service, which already exist, and those stay as they are.

**Check your work.** Switch to **Operator** and select `alex-np`. Its details show the service type `NodePort`, a cluster IP, the selector `app=alex-np`, and, under its connections, the ports including the node port Kubernetes assigned. The Service is reachable at `http://<node IP>:<node port>` from any machine that can reach a node; the Pod's host IP is one node address. In Playground, node IPs are often not reachable from your browser, and the assigned node port still confirms that Kubernetes exposed the Pod. If you set a fixed node port and another user on the cluster already holds it, the dry run fails with a `Field Value Invalid` error on the node port; clear the field and let Kubernetes choose.

## Expose a Pod with a LoadBalancer Service

1. Switch to **Designer** and add a **Pod** named `alex-lb-pod` with the label `app: alex-lb` and one container named `web`, image `nginx:latest`, container port `80`.
2. Add a **Service** named `alex-lb`. Set its type to `LoadBalancer`, add a port with port `80` and target port `80`, and set its selector to `app: alex-lb`.
3. Draw a **Network** relationship from `alex-lb` to `alex-lb-pod`.
4. Run **Deploy** again.

**What just happened.** A LoadBalancer Service builds on a NodePort Service: Kubernetes allocates a cluster IP and a node port, then asks the cluster's cloud provider integration to create an external load balancer that forwards to those node ports. When the provider finishes, Kubernetes records the load balancer's IP or hostname in the Service's status. A cluster without such an integration, such as Playground, accepts the Service and never assigns an external address.

**Check your work.** In **Operator**, select `alex-lb`. Its details show the service type `LoadBalancer`, a cluster IP, and a node port under its connections. In Playground there is no external IP and no load balancer address, because no cloud provider fulfills the request. On a managed cloud cluster, an external address appears once the provider has created the load balancer; load a fresh snapshot to see it, because Operator does not update on its own.

## Change a deployed Service

Deploy replaces an existing object in place, but Kubernetes rejects some changes to a Service, such as clearing the cluster IP it assigned. Kanvas reports those rejected changes as `Deployed`, and the Service stays as it was. To change a deployed Service's type or ports reliably, undeploy the design and deploy it again.

## Clean up

Run **Undeploy** from the **Actions** menu and select the same environment. Undeploy deletes each component's object by kind, name, and namespace: the Deployment, both Pods, and all three Services. Kubernetes then removes the ReplicaSet and Pods the Deployment owned. Undeploy matches by name, not by the design label, so same-named objects that someone else created in the same namespace are deleted too. If the dry-run step reports objects as not found, they are already gone; select the bypass option to finish.

The design stays in your account until you delete it from the design's file menu. Deleting a design never removes cluster objects.

## What you learned

- A Service gives a changing set of Pods one stable address and finds them by label selector, not by owner.
- ClusterIP serves clients inside the cluster, NodePort adds a port on every node, and LoadBalancer adds an external load balancer that only a cloud provider integration can supply.
- A selector that matches nothing deploys without error, so checking it is your job.
- The Network relationship documents traffic flow in the design; the selector is what Kubernetes routes by.

## Next steps

- Continue with [ConfigMaps and Secrets](/pr-preview/pr-1281/kanvas/tutorials/kubernetes/kubernetes-configmaps-secrets/) to configure workloads without rebuilding images.
- Read [Deploying designs](/pr-preview/pr-1281/kanvas/guides/deploying/deploying-designs/) for every option in the Deploy workflow.
- Read [Operator](/pr-preview/pr-1281/kanvas/concepts/operator/) to understand views, filters, and snapshots.

