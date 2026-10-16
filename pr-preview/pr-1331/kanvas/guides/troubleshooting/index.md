# Troubleshoot Kanvas


> Find the symptom you see, learn what causes it, and apply the fix. Covers loading failures, missing cluster data, and failed deployments.


Kanvas separates two kinds of failure. A design action that fails, such as a dry run or a deployment, produces an event with an error code and a remediation. A Kanvas that fails to load, or an Operator view with no data, produces an in-product message. This page covers both.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Ask for help from within Kanvas</h4>
  
      The <strong>Get Help</strong> action opens the Help and Support form. It needs a remote provider and a signed-in identity. See <a href="/pr-preview/pr-1331/kanvas/reference/help-and-support/">Help and Support</a>.
  
</div>



## Kanvas does not load

If an unhandled error occurs, or the extension fails to load in the Meshery shell, Kanvas shows `Uh-oh! Something went wrong..` (`Uh-oh! Please pardon our mesh.` in the shell) with the error text. The screen offers:

- **Troubleshooting Guide**, a dialog with the checks below.
- **Get Help**, which opens the Help and Support form.
- **Switch To Designer**, when Designer mode is available.

| Symptom | Cause | Fix |
|---|---|---|
| The Kanvas bundle fails to download, or the error says the bundle has no default component | The Meshery shell downloads the Kanvas UI from the provider. A failed download, or a bundle that was built incorrectly, leaves nothing to render. | Reload. If you build Kanvas yourself, rebuild it and confirm the provider serves the new bundle. |
| Missing or stale data after an update | The browser holds a previous version. | Hard-reload the page, or open Kanvas in a private window. |
| Features missing, or errors after upgrading Meshery or Kanvas | The Kanvas version and the Meshery version are out of step. Kanvas has no version-mismatch screen. | Update Meshery, `mesheryctl`, and Kanvas together. The Help Center footer shows the installed Kanvas version. |
| Operator backend fails to start on a self-built Meshery | The server-side plugin is loaded from the provider's package path. A missing file, or dependency versions that differ from your Meshery build, make Meshery reject it. | Build the plugin from the same version as your Meshery server and place it in the provider package path. |

Designer mode does not depend on a connected cluster. Designing, saving, and validating work with none connected.

## A deployment fails

| Symptom | Cause | Fix |
|---|---|---|
| Dry run, deploy, or undeploy fails with `meshery-server-1096` | No selected context resolved to a connected cluster. | Connect a cluster in Meshery, check that its status is Connected, and select an environment that contains it. |
| `meshery-server-1073` with a note about the environment | The connection is not assigned to the environment you selected, or it cannot reach the cluster. | Assign the connection to the environment, or upload a new kubeconfig. |
| `meshery-server-1095` | The kubeconfig is invalid. | Upload a new kubeconfig. |
| Step 2 shows `No environments found` | Your organization has no environment. | Create an environment and assign a connection to it. This needs the Create Environment and Edit Environment permissions. |
| The Finish step spins and never reports | The request failed before the server raised an event, for example when your session expired. | Sign in again and retry. Check the notification center and the server logs. |
| A prompt titled `SELF-HOSTED FEATURE` opens | You are on kanvas.new, which does not run validate, dry run, deploy, undeploy, or Operator. | Use a Meshery you run. |
| Every component fails an undeploy dry run | The objects are not on the cluster. | Check that the design was deployed, or bypass the errors. |

Error cards, codes, and remediations are described in [Deploy a Design](/pr-preview/pr-1331/kanvas/guides/deploying/deploying-designs/). The notification center's Error Docs entry opens the [Meshery error code reference](https://docs.meshery.io/reference/error-codes).

## Operator mode shows no data

Operator reads the cluster inventory that MeshSync reports through the Meshery broker. Designer keeps working when this is down.

| Message | Cause | Fix |
|---|---|---|
| `No Kubernetes context selected`, `Please select one or more Kubernetes clusters.` | No cluster is selected in the context picker. | Select one or more clusters. |
| `No data available for the current view` | The view's filters or the search hide every object. | Change the filters or the search. |
| `Uh-oh. Is MeshSync healthy on the selected cluster?` or `No MeshSync data available for the selected cluster` | MeshSync has reported no objects for the cluster. The broker may be unreachable. | Check that the Meshery broker service has an external address with `kubectl get svc -n meshery`, and check firewalls and VPN software. Docker Desktop commonly fails to give the broker an address. |
| Toast `Failed to fetch resources: <reason>` | The request for cluster resources failed. | Read the reason, then check the connection and MeshSync as above. |
| Toast `No container found to create <type> session` | A terminal or log session needs a container and the object has none. | Pick an object that runs a container. |

The Troubleshooting Guide dialog repeats the data checks. It also suggests removing the local Meshery configuration folder as a last resort when stored data is corrupt. That step deletes your local Meshery configuration, so use it only when nothing else restores the data.

