# Deploy a Design


> Apply a design to one or more Kubernetes clusters, and understand targets, ordering, dependencies, results, and failure behavior.


Deploying applies the components in a design to the Kubernetes clusters in the environments you choose. Meshery Server does the work with the kubeconfig it holds: it creates each object, or updates it in place when it already exists. Deploying the same design again is safe and idempotent.

## Before you start

- **A Meshery you run, with a connected cluster.** The hosted kanvas.new site does not deploy; it shows a self-hosted-feature prompt. Meshery needs at least one connected Kubernetes context that belongs to an environment in your organization.
- **A non-empty design.** The Actions menu is disabled for an empty design. An unsaved design deploys as it stands on the canvas.
- **Permission.** The Deploy Design permission gates the action. See [Permissions by Role](/pr-preview/pr-1349/kanvas/reference/permissions/). Selecting environments from the empty state also needs the Create Environment and Edit Environment permissions.
- **A provider session.** Without a signed-in session the request fails before any event is raised.

Deploying does not need Meshery Operator, MeshSync, or the broker. Those make the result visible in Operator mode.

Validate and dry-run the design first. See [Validate a Design](/pr-preview/pr-1349/kanvas/guides/deploying/validating-designs/) and [Dry-run a Design](/pr-preview/pr-1349/kanvas/guides/deploying/dry-running-a-design/). The deploy flow runs both for you.

## The deploy flow

Choose Deploy from the design's Actions menu. The `Deploy design "<name>"` stepper has five steps, with Back and Next throughout.

| Step | What it does |
|---|---|
| 1. Validate Design | Runs [validation](/pr-preview/pr-1349/kanvas/guides/deploying/validating-designs/) inline. Next is always enabled, because validation errors are warnings. |
| 2. Identify Environments | Lists your organization's environments as cards. Ticking an environment selects all of its Kubernetes connections. You need at least one. |
| 3. Dry Run | Runs a deploy-type [dry run](/pr-preview/pr-1349/kanvas/guides/deploying/dry-running-a-design/) against the selected clusters. Next stays disabled while it runs, or when errors exist and the bypass checkbox is off. |
| 4. Finalize Deployment | Shows the environments you chose and the component count, excluding annotations. The button reads Deploy. A Schedule Deployment checkbox is shown disabled. |
| 5. Finish | Starts the deployment and shows the results. |

Step 2 shows only Kubernetes connections. When your organization has no environments, it shows `No environments found. Add a new environment.` When an environment has no connections, it shows `No connections configured. Add a connection to get started.` Your selection persists for the session. A cluster that belongs to two selected environments is listed twice and targeted twice.

## Targets

The stepper always sends the explicit clusters you selected. Where no selection exists, such as a one-click action or the mobile sheet, the target is `all`. The server expands a lone `all` to every connected Kubernetes context. Otherwise it keeps only the ids that match a connected context and silently drops unknown ones. If none remain, the request fails with `meshery-server-1096`.

Clusters are deployed in parallel.

## How components are applied

| Aspect | Behavior |
|---|---|
| Ordering | Components form a dependency graph. A component starts when every component it depends on has succeeded. Independent components run in parallel. Kanvas applies no other ordering, so deploy custom resource definitions before the resources that use them. |
| Failed dependency | A component whose dependency failed is withheld: `Withheld <component>: <dependency> did not deploy successfully` (`meshery-server-1480`). |
| Invalid dependencies | A malformed, unknown, ambiguous, or circular dependency fails the whole request before anything is applied (`meshery-server-1475` through `1479`). |
| Existing objects | The object is replaced in place. An update to an immutable field, or an attempt to unset a Service's cluster IP, is reported as success but does not take effect. |
| Namespaces | A missing target namespace is created before the object is applied. A namespaced component with no namespace goes to `default`. |
| Annotation components | Never applied. |

### Dependencies of non-Kubernetes models

For a component whose model is not the built-in Kubernetes model and whose registrant is an Artifact Hub source, Meshery installs the model's source Helm chart into the component's namespace, creating the namespace if needed. This brings in the custom resource definitions and operators the component needs. The step is fail-forward: if the chart fails, Meshery still applies the component and adds a row to the results, `error deploying dependent helm chart for <component>`.

Meshery always processes these dependencies. The Include Dependencies checkbox in the dry-run step does not change this.

### What Meshery marks on applied objects

| Mark | Value |
|---|---|
| Label `design.meshery.io/id` | The design's id |
| Annotation `design.meshery.io/version` | The design's version |
| Annotation `component.meshery.io/id` | The component's id |

Operator's per-design view filters on the design-id label. A component carrying it is shown as managed by Meshery.

## Read the results

Every deployment raises an event from Meshery Server. It appears as a toast and as an entry in the notification center. In the Finish step, a summary lists one row per component and cluster: `Deployed <Kind> "<name>"`, or `Failed to deploy <Kind> "<name>"` with an error card. When Operator is enabled, the step offers Open In Operator.

| Outcome | Event |
|---|---|
| The request completed | `Deployment completed for design '<name>'.` at informational severity |
| The request failed before applying (cluster client, dependency graph, malformed design) | `Failed to deploy design '<name>'.` at error severity, with an error card |

A deployment in which some components failed in Kubernetes still raises the completed event. Read the per-component rows in the Finish step to see which ones failed.

Each persisted deploy event, including an error event, adds 1 to the design's deployment count in Layer5 Cloud. Dry runs and undeploys do not change it. The count drives the catalog sort Most Deployed.

### Error cards

An error card shows the event description, then Details, then Probable Cause and Suggested Remediation side by side. In the notification center, the Error Docs menu item opens the matching entry in the [Meshery error code reference](https://docs.meshery.io/reference/error-codes).

| Code | Meaning | Fix |
|---|---|---|
| `meshery-server-1073` | Unable to deploy the design. Wraps most hard failures; Details holds the inner error. | Confirm the connection's status is Connected or upload a new kubeconfig, and assign the connection to the selected environment. |
| `meshery-server-1096` | Kubernetes cluster is unavailable: no selected context resolved. | Upload a new kubeconfig, check the network and the cluster, and verify the server's credentials. |
| `meshery-server-1095` | Invalid kubeconfig. | Upload a new kubeconfig and make sure the server can reach the API server. |
| `meshery-server-1070` | Failed to parse the design file. | Check the design definition. |
| `meshkit-11190` | Error applying a manifest. The Kubernetes API's own reason and remediation replace the generic text. | Make sure the manifest is valid. |
| `meshery-server-1475` to `1480` | A dependency problem in the design. | Open the design, fix, rename, or remove the dependency, and retry. For 1480, resolve the dependency's failure first. |

## When nothing happens

The Finish step waits for the next deploy event from the server. If the request fails before the server raises an event, such as an expired session, a proxy error, or no provider, Kanvas shows no error and the Finish step keeps spinning. The step has no timeout. Close it, sign in again if your session expired, and check the notification center and the Meshery Server logs.

## Related

- [Undeploy a Design](/pr-preview/pr-1349/kanvas/guides/deploying/undeploying-designs/) removes what a deployment created.
- [Troubleshoot Kanvas](/pr-preview/pr-1349/kanvas/guides/troubleshooting/) covers connection and loading problems.

