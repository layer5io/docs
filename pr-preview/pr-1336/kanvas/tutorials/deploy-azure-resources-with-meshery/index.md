# Deploy Azure Resources


> Install Azure Service Operator in your own cluster from a catalog design, then design and deploy an Azure resource group and storage account in Kanvas.


In this tutorial you install Azure Service Operator (ASO) in your own Kubernetes cluster, then design an Azure resource group and a storage account inside it, deploy both from Kanvas, and find them in the Azure portal. You manage real Azure infrastructure with the same design, validate, and deploy loop you use for Kubernetes workloads, and the cluster keeps that infrastructure matched to the design.

The trade-off is indirection. Kanvas never calls Azure. It applies Kubernetes objects to your cluster, and ASO turns those objects into Azure resources in the background. A successful deploy means the cluster accepted the objects; the Azure resources follow a little later, and Azure-side failures surface on the objects in the cluster, not in the deploy summary.

## What you will learn

- ASO is a Kubernetes operator that turns custom resources into Azure resources, authenticating to Azure as a Service Principal whose credentials live in a Kubernetes Secret.
- Kanvas components from the Azure model are those ASO custom resources in design form, and their configurator forms come from the ASO schemas in the Meshery registry.
- Deploy applies custom resources to the cluster in one pass; ASO then reconciles each one with Azure on its own schedule.
- Azure resources have owners: a storage account belongs to a resource group, so the resource group must exist in Azure before the storage account can be created.
- Deleting a custom resource is how you delete the Azure resource it manages, which makes cleanup order matter.

## Before you begin

- **Your own cluster, never Meshery Playground.** This tutorial puts real Azure credentials into a Secret in the cluster. Playground is a shared cluster, so anyone with access to it could read them. Use a self-hosted Meshery with a Kubernetes cluster you control. Hosted kanvas.new has no cluster actions; Validate, Deploy, and Undeploy there open a prompt to self-host instead. To install Meshery, see https://docs.meshery.io/installation.
- **A connected cluster assigned to an environment.** Deploy targets Meshery environments and the Kubernetes connections assigned to them, so your cluster must be a connected Kubernetes connection that belongs to at least one environment.
- **An Azure subscription and the Azure CLI.** You need rights to create a Service Principal with the Contributor role on the subscription. Sign in with `az login` before you start.
- **`kubectl` access to the same cluster.** You install cert-manager and check ASO from the command line.
- **Operator mode for verification (optional).** Operator reads the cluster through Meshery Operator and MeshSync. Deploy does not need them; Operator does.
- **A unique prefix.** Storage account names are global across all of Azure. Pick a short prefix, such as your handle, and use it in every name. This tutorial uses `alex`.

You need basic familiarity with Kubernetes and the Azure portal. You do not need to write YAML.

## The scenario

You work with two designs. The first installs ASO; the second describes the Azure resources ASO creates.

```text
Design 1: Azure Service Operator (cloned from the catalog)
  ASO operator, its custom resource definitions,
  and Secret aso-controller-settings  ---- Service Principal credentials

Design 2: alex-azure-resources (built by you)
  Resource Group    alex-aso-rg      location eastus
      ^
      |  owner
      |
  Storage Account   alexasodemo01    location eastus, access tier Hot

Kanvas Deploy --> Kubernetes custom resources --> ASO --> Azure subscription
```

At the end, the portal shows resource group `alex-aso-rg` containing storage account `alexasodemo01`.

## Phase 1: Create the Service Principal

ASO needs an Azure identity to act on your subscription. Create a Service Principal with the Contributor role scoped to the subscription:

```bash
az ad sp create-for-rbac -n azure-service-operator --role contributor --scopes /subscriptions/<AZURE_SUBSCRIPTION_ID>
```

Keep the output; you need three of its fields plus your subscription ID:

| Output field | Use it as |
|---|---|
| `appId` | `AZURE_CLIENT_ID` |
| `password` | `AZURE_CLIENT_SECRET` |
| `tenant` | `AZURE_TENANT_ID` |
| (your subscription ID) | `AZURE_SUBSCRIPTION_ID` |

**What just happened.** You created a non-human identity in Microsoft Entra ID and granted it Contributor on the subscription. Everything ASO later does in Azure, it does as this identity, so its role assignment is the upper bound on what your designs can create. The `password` is shown only once; treat it like any other secret.

## Phase 2: Install cert-manager

ASO serves admission webhooks that need TLS certificates, and it relies on cert-manager to issue them. Install cert-manager in the cluster before you install ASO:

```bash
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.14.1/cert-manager.yaml
```

Wait until the pods in the `cert-manager` namespace are running (`kubectl get pods -n cert-manager`) before you continue.

**What just happened.** cert-manager is now ready to issue certificates for any workload that asks. If ASO starts before cert-manager can serve its requests, the ASO webhooks have no certificates and the operator does not become ready.

## Phase 3: Install ASO from the catalog

1. Find the **Azure Service Operator** design in the catalog and clone it. The clone is a private copy named `Azure Service Operator (Copy)`, owned by you, in your selected workspace, and independent of the catalog original.
2. Open the clone and select its `aso-controller-settings` Secret. Enter your four values under the keys `AZURE_SUBSCRIPTION_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, and `AZURE_CLIENT_SECRET`. Follow the format the Secret already uses: Kubernetes expects base64-encoded values under `data` and plain text under `stringData`.
3. Deploy the design to the environment that holds your cluster. The Deploy stepper validates the design, asks for target environments, runs a dry run against the cluster, and then applies every component.
4. Confirm the operator is running: its pod reaches the Running state in the operator's namespace (`azureserviceoperator-system` in ASO's standard install).

**What just happened.** Deploy turned each component of the cloned design into a Kubernetes object and applied it: the operator's workloads, the custom resource definitions that teach Kubernetes the Azure kinds, and the Secret. On startup ASO reads `aso-controller-settings` and uses those credentials for every Azure call. From now on, creating one of its custom resources in the cluster is a request to create the matching Azure resource.

The Secret now lives inside your design as well as in the cluster. Do not publish the design, and do not share it: anyone you share a design with can read, edit, clone, and re-share it, credentials included.

## Phase 4: Design the resource group and storage account

1. Create a new design and name it `alex-azure-resources`. Kanvas saves it automatically once it has a name or a component.
2. Search the component palette for **Resource Group** from the Azure model and add it. Its configurator opens as soon as it lands on the canvas.
3. Name the resource group `alex-aso-rg` and set its location to `eastus`.
4. Search the palette for **Storage Account** from the Azure model and add it.
5. Name the storage account with your prefix, for example `alexasodemo01`. Azure requires storage account names to be globally unique, 3 to 24 characters, lowercase letters and digits only.
6. In the storage account's configuration, set the owning resource group to `alex-aso-rg`, set the location to `eastus`, and set the access tier to `Hot` (frequently accessed data) or `Cool` (infrequently accessed data, lower storage cost).
7. Run **Validate** from the Actions menu. It lists every required field you have not set, per component. Fill each one in the configurator and validate again until the list is empty.

**What just happened.** Each component is an ASO custom resource. Its configurator form is generated from that resource's schema in the Meshery registry, which is why the fields are ASO's fields and required ones carry a red asterisk. ASO uses the custom resource's name as the Azure resource name by default. The owner field on the storage account is what places it inside the resource group in Azure; it is a reference by name, not a drawing on the canvas. Validate runs entirely in your browser against those schemas. It catches missing and malformed fields, never blocks you, and does not check Azure rules such as name uniqueness.

## Phase 5: Deploy and let ASO reconcile

1. Deploy `alex-azure-resources` through the stepper to the same environment you used for ASO.
2. On the Dry Run step, the cluster checks each custom resource against the ASO definitions installed in Phase 3. Fix any errors it reports before you continue.
3. Finish the deployment. The summary lists a row per component and cluster, such as `Deployed ResourceGroup "alex-aso-rg"`.

**What just happened.** Deploy applied both custom resources in one pass. Kanvas orders components only by dependencies a design declares, so the storage account can reach the cluster at the same moment as the resource group. That is safe: ASO retries a resource whose owner is not ready yet until the owner exists in Azure, then creates it. The deploy summary reports what the cluster accepted. The Azure resources appear a minute or more later, once ASO has completed its calls to Azure. Every object Deploy applies carries a label with the design's ID, which is how Operator finds them.

Deploy is idempotent: if you change the access tier and deploy again, Kanvas replaces the custom resource in place and ASO updates the storage account in Azure.

## Verify

Check three places, from closest to the design to closest to Azure.

- **Operator.** Open the design-scoped view from the design's file menu (**View in Operator**). It filters on the design's ID label, so it shows only the objects this design applied. Kinds outside the built-in Kubernetes lists appear under **Custom Resources** in the Layers panel. Operator draws a snapshot, not a live stream; reload the view or change a filter to fetch a fresh one.
- **The cluster.** `kubectl get resourcegroups.resources.azure.com,storageaccounts.storage.azure.com -n default` lists both custom resources. ASO reports progress through each resource's Ready condition; `kubectl describe` shows the reason when a resource is not ready.
- **The Azure portal.** Open resource group `alex-aso-rg` and confirm that storage account `alexasodemo01` is in it, in East US, with the access tier you chose.

## Clean up

These resources cost money while they exist. Remove them in this order.

1. **Undeploy `alex-azure-resources`.** Undeploy deletes each component's custom resource from the cluster. ASO deletes the Azure resource when its custom resource is deleted.
2. **Confirm in the portal** that the storage account and the resource group are gone. Azure deletions take a few minutes.
3. **If Undeploy reports an error**, or the custom resources are still in the cluster, delete them directly and confirm in the portal again:

   ```bash
   kubectl delete storageaccounts.storage.azure.com alexasodemo01 -n default
   kubectl delete resourcegroups.resources.azure.com alex-aso-rg -n default
   ```

4. **Undeploy the Azure Service Operator design last.** It removes the operator and its custom resource definitions. If you remove the operator first, nothing is left to delete the Azure resources, and you must remove them in the portal yourself.
5. **Remove the credentials.** Delete the Service Principal in Azure if you no longer need it, and delete your cloned operator design so the credentials no longer live in your workspace.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Dry Run or Deploy fails with `meshery-server-1096` Kubernetes cluster is unavailable. | None of the selected targets resolves to a connected Kubernetes context. | Confirm the cluster's connection status is Connected and that the connection is assigned to the environment you selected. Upload a fresh kubeconfig if the credentials changed. |
| Deploy fails with `meshery-server-1073` Unable to deploy the selected design. | This error wraps most hard deploy failures. A common cause is a connection that is not assigned to the selected environment. | Open the error's **Details** to read the inner error. Assign the connection to the environment and confirm it is Connected. |
| The resources design fails dry run or deploy because the cluster does not recognize the Resource Group or Storage Account kind. | ASO's custom resource definitions are not installed, or the operator design has not finished deploying. | Deploy the Azure Service Operator design first and confirm the operator pod is running, then deploy the resources design again. |
| Operator shows `Uh-oh. Is MeshSync healthy on the selected cluster?` | Operator has no MeshSync data for the selected cluster. | Confirm Meshery Operator and MeshSync are running in the cluster. Deploy does not depend on them; verify with `kubectl` and the portal in the meantime. |
| The deploy succeeded, but nothing appears in Azure and the custom resource's status reports an authorization error. | The Service Principal lacks rights on the subscription, or the Secret holds wrong values. | Check the Contributor role assignment and the four Secret values. Correct the Secret in the operator design and deploy it again; if ASO keeps reporting the old error, restart the operator pod so it rereads the Secret. |
| The storage account never becomes ready and its status reports a name error. | The name is taken elsewhere in Azure or breaks the 3 to 24 lowercase letters and digits rule. | Choose another name with your prefix, update the component, and deploy again. |

## Where to go next

- [Deploying designs](/pr-preview/pr-1336/kanvas/guides/deploying/deploying-designs/) covers the Deploy stepper, targets, and the deploy summary in full.
- [Undeploying designs](/pr-preview/pr-1336/kanvas/guides/deploying/undeploying-designs/) explains what Undeploy removes and what it leaves in place.
- [Cloning a design](/pr-preview/pr-1336/kanvas/guides/designs/cloning-a-design/) describes how catalog clones are owned and stored.
- [Operator](/pr-preview/pr-1336/kanvas/concepts/operator/) explains how Operator draws what runs in your cluster.
- [Deploy AWS EC2 instances](/pr-preview/pr-1336/kanvas/tutorials/deploy-aws-ec2-instances-with-meshery/) applies the same operator pattern to AWS.
- The official ASO documentation at https://azure.github.io/azure-service-operator/ lists every Azure resource kind ASO supports and its fields.

