# Undeploy a Design


> Remove the resources a design describes from your clusters, and understand exactly what is and is not deleted.


Undeploying deletes the Kubernetes objects that each component in a design describes, from every cluster in the environments you select. It does not touch the design itself. The design record, its versions, and its Operator view are unchanged.

## Before you start

The prerequisites match [Deploy a Design](/pr-preview/pr-1322/kanvas/guides/deploying/deploying-designs/): a Meshery you run with a connected cluster, a non-empty design, and the **Undeploy Design** permission. The hosted kanvas.new site does not run undeploy. See [Permissions by Role](/pr-preview/pr-1322/kanvas/reference/permissions/).

## The undeploy flow

Choose Undeploy from the design's Actions menu. The `Undeploy design "<name>"` stepper has the same five steps and gates as the deploy stepper:

1. **Validate Design.** Runs validation inline.
2. **Identify Environments.** Selects the environments, and so the clusters, to remove from.
3. **Dry Run.** An undeploy-type [dry run](/pr-preview/pr-1322/kanvas/guides/deploying/dry-running-a-design/) that deletes by name with server-side dry run. Because an absent object returns NotFound, a design that was never deployed, or is already removed, shows an error for every component here and needs the bypass checkbox to continue.
4. **Finalize.** Confirms the environments and component count. The button reads Undeploy.
5. **Finish.** Runs the removal and shows the results.

## What gets deleted

| Behavior | Detail |
|---|---|
| What is removed | One delete for each non-annotation component's object, in its namespace, on every selected cluster. |
| How it is matched | By kind and name from the design, not by label. An object with the same kind and name that was created some other way is deleted too. |
| Order | Reverse dependency order. A component whose dependent failed to delete is withheld: `Withheld <component>: <dependent> did not undeploy successfully`. |
| Objects already gone | Ignored. |
| Namespaces, custom resource definitions, volume claims, Secrets | Deleted only when the design has a component for them. |
| Dependency charts | For components of non-Kubernetes models, Meshery uninstalls the model's Helm chart: `Undeployed dependent helm chart for <component>`. This can remove custom resource definitions and operators that other designs on the cluster use. |
| Missing namespace | Created before the delete is attempted. |

Meshery always processes dependency charts on undeploy. The Include Dependencies checkbox in the dry-run step does not change this. Before you undeploy a design that uses custom resource models, check what else on the cluster depends on its definitions.

## Read the results

Success raises the event `undeployed design '<name>'.` at success severity. Failure raises `Failed to undeploy design '<name>'.` at error severity, with an error card. The error codes match those in [Deploy a Design](/pr-preview/pr-1322/kanvas/guides/deploying/deploying-designs/). The deployment count of the design is not decremented.

In Operator mode, the resources leave the live view once MeshSync reports their deletion.

## Limits

- There is no undeploy-type dry run outside the stepper.
- Deleting a design does not undeploy it. Undeploy first if you want the resources gone. See [Delete a Design](/pr-preview/pr-1322/kanvas/guides/designs/deleting-a-design/).
- As with deploy, the Finish step waits for a server event. If the request fails before the server raises one, the step keeps spinning with no error. See [Deploy a Design](/pr-preview/pr-1322/kanvas/guides/deploying/deploying-designs/).

