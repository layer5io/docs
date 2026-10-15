# Dry-run a Design


> Preview what a deployment would do by having each target cluster's Kubernetes API check your design without applying it.


A dry run submits every component in the design to the Kubernetes API server of each target cluster as a server-side dry-run request. The API server validates the object exactly as it would on a real apply, including schema, field values, and admission, and then discards it. Nothing is created, updated, or persisted, so you can repeat a dry run as often as you like.

## Before you start

- **A connected cluster.** Meshery must hold at least one connected Kubernetes context. With none, the request fails with error `meshery-server-1096`, Kubernetes cluster is unavailable.
- **A non-empty design.** The Actions menu is disabled for an empty design.
- **Permission.** Dry run is gated by the Validate Design permission. See [Permissions by Role](/pr-preview/pr-1315/kanvas/reference/permissions/).
- **A Meshery you run.** The hosted kanvas.new site does not run dry runs.

Meshery Server performs the dry run with the kubeconfig it holds. Meshery Operator, MeshSync, and the broker are not required.

## Run a dry run

You reach a dry run in two ways.

**On its own.** Choose Dry Run from the design's Actions menu. This opens `Dryrun design "<name>"` and runs a deploy-type dry run against your current cluster selection, or against all connected clusters when none is selected. There is no cluster-selection step.

**Inside a deploy or undeploy.** Step 3 of both steppers is a dry run against the environments you chose in step 2. In the deploy stepper it simulates creating the resources. In the undeploy stepper it simulates deleting them. See [Deploy a Design](/pr-preview/pr-1315/kanvas/guides/deploying/deploying-designs/) and [Undeploy a Design](/pr-preview/pr-1315/kanvas/guides/deploying/undeploying-designs/).

On mobile, Dry Run runs without a modal and shows its results as badges on the canvas.

## What the server does

| Stage | Behavior |
|---|---|
| Components | Annotation components are dropped. Each remaining component becomes a Kubernetes object. |
| Clusters | The object goes to every selected cluster. |
| Deploy-type | A create with strict field validation and field manager `meshery`. |
| Undeploy-type | A delete by name. |
| Namespace | The component's own `metadata.namespace`. Otherwise `default` for namespaced kinds, and none for cluster-scoped kinds. |
| Persistence | None. The dry run does not create namespaces. |

## Read the results

The summary shows `<N> component(s) and <M> annotations` and the error count. With no errors it reads `No deployment errors.`

Each failing component is an expandable row, `<name> (<count>)`. A component fails when any selected cluster returns a Kubernetes failure for it. Each error shows a bold type and field path, then the message the API server returned:

- The type is the Kubernetes cause in words: Field Value Required, Field Value Invalid, Field Value Not Supported. Anything else shows as Failure.
- The path reads `<component> > settings > <field>`. Metadata name, namespace, labels, and annotations map to those names. When Kubernetes names no field the path is `unknown`.
- When the API gives no causes, its status messages appear as plain text.

If the whole call fails rather than a component, a structured error block appears with the entry type `RequestError`, not a per-component row.

Selecting an error closes the results and opens the component's configuration at the field. Errors also feed the red octagon badge on the canvas. See [Validate a Design](/pr-preview/pr-1315/kanvas/guides/deploying/validating-designs/) for where badges appear.

Each dry run records an event: `Dry Run completed for design '<name>'.` at informational severity, even when components failed, or `Failed to dry-run design '<name>'.` at error severity when the call itself failed. A dry run does not change the design's deployment count.

## Common errors

| Error | Cause | Fix |
|---|---|---|
| Field Value Invalid | A value is outside what Kubernetes accepts, for example a Service port of 0 where 1 to 65535 is required. | Correct the value in the component's configuration. |
| Field Value Required | A required field is empty. | Fill in the field. |
| Resource not found for a component of a kind with an irregular plural | See the limits below. | Bypass the error if the kind is correct. |
| Missing custom resource definition | The design uses a custom resource whose definition is not on the cluster. | Install the definition on the cluster first, then run the dry run again. |

## Limits of a dry run

- **Irregular plurals.** Dry run builds each resource name from the lowercase kind plus "s". Kinds with irregular plurals, such as Ingress, NetworkPolicy, StorageClass, and Endpoints, can return a not-found error even when the component is correct.
- **Namespaces the design creates.** A dry run never creates a namespace. A component placed in a namespace that the same design would create reports an error, because the namespace does not exist yet.
- **Undeploy-type runs.** Deleting an object that is absent returns NotFound. Dry-running the undeploy of a design that was never deployed, or is already removed, shows an error for every component. A real undeploy ignores objects that are already absent.
- **The Include Dependencies option.** The dry-run step shows an Include Dependencies checkbox. It has no effect on the dry run.

## Bypass errors

In the deploy and undeploy steppers, when a dry run reports errors, the step shows a checkbox, `Bypass errors and initiate deployment`. Next stays disabled while the dry run is running, or while errors exist and the checkbox is off. Use the bypass when you know the errors are false positives from the limits above. The cluster raised each of them, and the real deployment may fail for the same reason.

