# Deploy AWS EC2 Instances


> Deploy an AWS EC2 controller, a VPC network, and EC2 instances from three catalog designs to learn how Kubernetes custom resources manage real AWS infrastructure.


In this tutorial you create a VPC network and EC2 instances in your AWS account without leaving Kanvas. You deploy three designs from the catalog, in order, to your own Kubernetes cluster: a controller that talks to AWS, a VPC network, and the EC2 instances that run inside it. Each AWS resource is a Kubernetes custom resource in the design, and a controller in the cluster turns that resource into real infrastructure.

The bridge is [AWS Controllers for Kubernetes (ACK)](https://aws.amazon.com/blogs/containers/aws-controllers-for-kubernetes-ack/). ACK lets you manage AWS resources with the same declarative model you use for Pods and Services: you declare the desired state in the cluster, and the controller makes AWS match it. The trade-off is that the cluster now holds AWS credentials and creates resources that cost money, so this tutorial runs only on a cluster you control and ends with a full cleanup.

## What you will learn

- An ACK controller watches custom resources in the cluster and creates, updates, and deletes the matching AWS resources.
- A custom resource can exist only after its definition (CRD) is installed, so designs that depend on each other deploy in a deliberate order.
- Deploy applies only the ordering a design declares; it does not sort designs or install CRDs ahead of the custom resources that need them.
- A Pod reads credentials from a Secret through environment variables that reference the Secret's keys.
- Operator shows what Deploy put in the cluster, and the AWS console shows what the controller built in AWS.

## Before you begin

- **A self-hosted Meshery with a connected Kubernetes cluster.** Install Meshery by following the [Meshery installation guide](https://docs.meshery.io/installation). Minikube and Amazon EKS both work. The cluster must appear in Meshery as a connected Kubernetes connection assigned to a Meshery environment, because Deploy targets environments and the Kubernetes connections they hold. See [Environments](https://docs.meshery.io/concepts/logical/environments).
- **Not Meshery Playground, and not kanvas.new.** You put real AWS keys into a Secret in this tutorial. Meshery Playground is a shared cluster, so never deploy credentials there. Hosted kanvas.new has no cluster actions: Deploy, Undeploy, and Operator open a prompt to self-host instead.
- **Meshery Operator and MeshSync in the cluster.** Operator reads the cluster through them. Deploy works without them; only the inspection steps need them.
- **An AWS account and a dedicated IAM identity.** Create an IAM user or role for this tutorial with the minimum permissions needed to manage VPCs, subnets, gateways, elastic IPs, route tables, security groups, and EC2 instances. Do not use root or administrator keys. You need its access key ID and secret access key.
- **Budget for a short-lived bill.** The VPC design creates a NAT gateway and an elastic IP, and both incur AWS charges for as long as they exist. EC2 instances incur charges while they exist too. Plan to finish the tutorial and its cleanup in one sitting.

## The scenario

You deploy three designs. Each one depends on the one before it:

```text
1. EC2 controller design          namespace ack-system
   +-- CRDs                       teach the cluster the AWS kinds (VPC, Subnet, Instance, ...)
   +-- Service account            identity the controller Pod runs as
   +-- Secret                     AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
   +-- Controller Pod             reads the Secret, calls the AWS API

2. VPC workflow design            region us-east-1 by default
   +-- 1 VPC
   +-- 1 internet gateway
   +-- 1 NAT gateway + 1 elastic IP
   +-- 2 route tables             public, private
   +-- 2 subnets                  public, private
   +-- 1 security group

3. EC2 instances design           instances placed in the VPC network
```

At the end, the cluster holds the controller and a set of custom resources, and your AWS account holds the matching VPC network and running instances.

## Clone the designs

The catalog holds the three designs this tutorial uses:

- [EC2 controller design](https://meshery.io/catalog/deployment/ec2-controller-design-8f7e1431-3885-4ebf-9ef7-d2ec64bd4eb5.html)
- [VPC workflow design](https://cloud.meshery.io/catalog/content/catalog/vpc-workflow-design-50cac19e-209c-4acf-b91c-4784281db033)
- [EC2 instances design](https://cloud.meshery.io/catalog/content/catalog/ec2-instances-design-a344f109-2d92-41da-8644-3bc285c3ca9e)

Clone each design into your workspace from its catalog page, then open the clone in Kanvas on your self-hosted Meshery.

**What just happened.** Only published designs can be cloned. Each clone is a new private design named `<name> (Copy)`, owned by you and placed in your selected workspace. It is independent of the catalog original: your edits never reach the source, and later changes to the source never reach your copy. That independence matters here, because you are about to put credentials into the controller design.

## Phase 1: Configure the EC2 controller

Open your copy of the EC2 controller design. Its components deploy to the `ack-system` namespace: the CRDs that define the AWS resource kinds, a service account for the controller, a Secret for your AWS credentials, and the controller Pod itself.

1. Open the Secret component's configurator by double-clicking the Secret. In its data, set exactly two keys:

    | Key | Value |
    |---|---|
    | `AWS_ACCESS_KEY_ID` | `<base64-encoded-key>` |
    | `AWS_SECRET_ACCESS_KEY` | `<base64-encoded-secret>` |

    Secret data values are base64 encoded. Encode each value locally rather than pasting keys into a website, and avoid a trailing newline:

    ```bash
    printf '%s' 'YOUR_ACCESS_KEY_ID' | base64
    printf '%s' 'YOUR_SECRET_ACCESS_KEY' | base64
    ```

2. Open the controller Pod's configurator and inspect its container's environment variables. You find two entries, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. Each takes its value from a `secretKeyRef` that names the credentials Secret and one of its keys. The design already contains this wiring; you change nothing here.

**What just happened.** The controller never reads the Secret directly. When the kubelet starts the controller's container, it resolves each `secretKeyRef`, decodes the matching value from the Secret, and sets it as an environment variable. The AWS SDK inside the controller reads `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` from the environment and signs every AWS API call with them. In manifest form, the wiring looks like this:

```yaml
env:
  - name: AWS_ACCESS_KEY_ID
    valueFrom:
      secretKeyRef:
        name: <credentials-secret-name>
        key: AWS_ACCESS_KEY_ID
  - name: AWS_SECRET_ACCESS_KEY
    valueFrom:
      secretKeyRef:
        name: <credentials-secret-name>
        key: AWS_SECRET_ACCESS_KEY
```

The key names in the Secret and in the `secretKeyRef` entries must match exactly. A typo leaves the variable unset or the container unable to start, and the controller cannot authenticate.

The Secret's values are now stored in your design, and Kanvas saves the design automatically. Base64 is an encoding, not encryption: anyone who can open the design can read your keys. Do not publish this design, do not share it, and do not keep it in a workspace other people use.

## Phase 2: Deploy the EC2 controller

Deploy the controller design from the **Actions** menu. The Deploy stepper validates the design, asks you to pick the environment that holds your cluster's connection, runs a dry run against that cluster, and then deploys.

On a first deploy, the dry run can report errors for objects in `ack-system`. A dry run creates nothing, including namespaces, so the cluster rejects objects aimed at a namespace that does not exist yet. If those are the only errors, tick the box that bypasses dry-run errors and continue. Deploy itself creates the missing `ack-system` namespace before it applies the objects.

The Finish step lists one row per component, such as `Deployed Secret "<name>"`, or a failure row with an error card.

**What just happened.** Meshery Server turned each component into a Kubernetes object and applied it to every cluster in the environment you picked: create the object, or replace it in place if it already exists. Deploying the same design again therefore updates the cluster instead of duplicating objects. Deploy also labeled every object it applied with the design's id, which is how Operator finds them next. The cluster now knows the AWS kinds through the new CRDs, and the controller Pod is starting with your credentials in its environment.

## Phase 3: Verify the controller in Operator

Open the design-scoped Operator view with **View in Operator** from the design's file menu. It shows only the objects this design deployed, because it filters on the design-id label that Deploy added. Confirm the Pod, the Secret, and the service account in `ack-system`, and open the controller Pod's details to check that it is running.

As an alternative, open the **Layers** panel in Operator and filter on the `ack-system` namespace and the kinds you care about. The AWS kinds that the CRDs define appear under Custom Resources once MeshSync reports them.

**What just happened.** Operator draws a snapshot of what MeshSync reports from the cluster, not a live stream. It fetches a new snapshot when a view loads, when a filter changes, or when the selected clusters change, and it draws at most 100 resources per snapshot. If the Pod was still starting when the view loaded, change a filter or reload the view to fetch a fresh snapshot.

## Phase 4: Deploy the VPC workflow

Open your copy of the VPC workflow design. It holds one custom resource per AWS networking resource: a VPC, an internet gateway, a NAT gateway, an elastic IP, a public and a private route table, a public and a private subnet, and a security group. The design targets the `us-east-1` region by default. Adjust CIDR blocks or the region in each component's configurator if your account needs different values, and keep all three designs in the same region.

Deploy the design to the same environment.

**What just happened.** This design contains no controller and no CRDs. It is a set of custom resources whose kinds exist only because Phase 2 installed their definitions. Deploy did not install those definitions for you and would not have reordered anything across designs: it applies only the ordering a design declares. Had you deployed this design first, the cluster would have rejected every component because it did not know their kinds.

Once the custom resources exist, the EC2 controller sees them and calls the AWS API to create each resource. The Finish step confirms that Kubernetes accepted the custom resources; AWS creation happens afterward, asynchronously, and can take several minutes for the NAT gateway. Open the VPC console in `us-east-1` and confirm the VPC, both subnets, both route tables, the gateways, the elastic IP, and the security group.

## Phase 5: Deploy the EC2 instances

Open your copy of the EC2 instances design and deploy it to the same environment. The design places its instances in the network you created in Phase 4.

**What just happened.** The same mechanism ran a third time. Kubernetes accepted the instance custom resources because the controller design installed their definition, and the controller created the instances in AWS inside your VPC network. The dependency chain is now complete: credentials, then controller and definitions, then network, then instances.

## Verify

- **In AWS.** Open the EC2 console in the region the designs use. Confirm that the instances are running and that they sit in the VPC and subnets from Phase 4.
- **In Operator.** Open the design-scoped view for each design to see the custom resources it deployed. Each view shows only that design's objects.
- **In the cluster.** List the AWS kinds the controller installed, then read a resource's status. ACK reports in each resource's status conditions whether it has synced with AWS:

    ```bash
    kubectl api-resources --api-group=ec2.services.k8s.aws
    kubectl describe <kind> <name> -n <namespace>
    ```

## Clean up

Remove everything in reverse order: instances, then the VPC network, then the controller. The order matters for the same reason it mattered on the way in. ACK deletes an AWS resource when its custom resource is deleted, and the controller is what makes that AWS call. If you remove the controller first, nothing is left to delete the instances, the NAT gateway, or the elastic IP, and they keep running and keep billing.

1. Undeploy the EC2 instances design, then the VPC workflow design, then the EC2 controller design, each from the **Actions** menu. Undeploy deletes each object in the design by kind and name on every cluster you select, and it ignores objects that are already gone.
2. If Undeploy reports an error, delete the custom resources with `kubectl` instead, in the same order, while the controller is still running. Use `kubectl api-resources --api-group=ec2.services.k8s.aws` to find the kinds, then `kubectl delete` the instances first and the networking resources after them. Remove the controller design only when no AWS custom resources remain.
3. Confirm in the AWS console that the instances are terminated and that the NAT gateway, the elastic IP, and the VPC are gone. The AWS console is the final word on what you are still paying for.
4. Deactivate or delete the access key you created for this tutorial, and delete your copy of the controller design or clear its Secret values.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Deploy fails with `meshery-server-1096` Kubernetes cluster is unavailable. | No cluster in the selected environment resolves to a connected Kubernetes connection. | Check that your cluster's connection status is Connected and that the connection is assigned to the environment you picked in the Deploy stepper. |
| Deploy fails with `meshery-server-1073` Unable to deploy the selected design. | This error wraps most hard deploy failures. | Read the Details section of the error card for the inner error. The most likely cause is a connection that is not assigned to the selected environment. |
| The dry run or deploy rejects the VPC or EC2 components because their kind is unknown. | The CRDs are missing: the controller design was not deployed first, or it was undeployed. | Deploy the EC2 controller design, confirm it in Operator, then deploy the dependent design again. |
| Custom resources exist, but nothing appears in AWS and their status never reports synced. | The controller cannot authenticate: wrong or badly encoded keys, a key name that does not match, or an IAM identity without the needed permissions. | Re-encode both values without a trailing newline, check the two key names in the Secret and in the Pod's `secretKeyRef` entries, check the IAM permissions, and deploy the controller design again. Read the controller Pod's log for the AWS error. |
| AWS resources appear in a region other than the one you expected. | The designs target `us-east-1` by default. | Look in `us-east-1`, or set the region in each design's configurators before you deploy. |
| Operator shows `Uh-oh. Is MeshSync healthy on the selected cluster?` | Operator received no objects for the selected cluster. | Confirm that Meshery Operator and MeshSync run in the cluster and that the cluster is selected in Operator. |
| Undeploy reports an error. | Undeploy failed for one or more objects. | Delete the custom resources with `kubectl` in reverse order while the controller still runs, then confirm in the AWS console. |

## Where to go next

- [Deploying designs](/pr-preview/pr-1313/kanvas/guides/deploying/deploying-designs/) covers the Deploy stepper, environments, and the deployment summary in full.
- [Undeploying designs](/pr-preview/pr-1313/kanvas/guides/deploying/undeploying-designs/) explains what Undeploy removes and what it leaves behind.
- [Operator](/pr-preview/pr-1313/kanvas/concepts/operator/) explains how Operator builds its view of a live cluster.
- [Deploy Azure resources](/pr-preview/pr-1313/kanvas/tutorials/deploy-azure-resources-with-meshery/) applies the same controller pattern to Azure.
- [Kubernetes tutorials](/pr-preview/pr-1313/kanvas/tutorials/kubernetes/) build the Kubernetes fundamentals this tutorial relies on.

