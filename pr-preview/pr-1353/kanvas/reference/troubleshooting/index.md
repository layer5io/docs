# Troubleshooting Kanvas


> Learn to Troubleshoot the Kanvas








<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Asking for help from within Kanvas</h4>
  
      Kanvas&rsquo;s <strong>Get Help</strong> action opens the Help and Support form. It requires a remote provider and a resolved signed-in identity - see <a href="/pr-preview/pr-1353/kanvas/reference/help-and-support/">Help and Support</a> if the form does not open or a submission is rejected.
  
</div>



## Meshery Extension

### Designer Mode

Upon Meshery extension's first load, a GET request initializes the Kanvas plugin. Errors are classified into two types: plugin not found or built on a different version. Kanvas loads, and Designer is functional if no errors occur.

### Operator Mode

GraphQL queries fetch header data and view data for the Operator canvas. Checks ensure data types and properties are correct, enabling canvas display. If no clusters are connected, a modal prompts the user to select one.

## Fault Scenarios Explained for Kanvas Extension

### 1. MISSING PLUGIN

- **MODE STATE:** Operator and Designer: Inactive, Not Interactable.
- **CAUSED WHEN:** plugin.so is not in the desired folder.
- **REMEDIATION:** Confirm plugin versions, run make dev or make prod on the local meshery-extension folder.

### 2. INCOMPATIBLE PLUGIN

- **MODE STATE:** Operator and Designer: Inactive, Not Interactable.
- **CAUSED WHEN:** go.mod mismatches between meshery/meshery and layer5labs/meshery-extensions.
- **REMEDIATION:** Ensure identical go.mod files and plugin version matching.

### 3. NO ACTIVE CLUSTER CONNECTIONS

- **MODE STATE:** Operator: Active, Not Interactable; Designer: Active, Interactable.
- **CAUSED WHEN:** No active Kubernetes cluster connections.
- **REMEDIATION:** Connect a Kubernetes cluster from settings.

### 4. MISSING MESHSYNC DATA / NATS NOT RUNNING

- **MODE STATE:** Operator: Active, Not Interactable; Designer: Active, Interactable.
- **CAUSED WHEN:** Meshery Broker lacks an external IP address or networking issues.
- **REMEDIATION:** Delete meshery-meshsync pod, use Docker Desktop/Kind/Minikube/external cloud provider.

### 5. CORRUPT DATABASE

- **MODE STATE:** Operator: Inactive, Not Interactable; Designer: Active, Interactable.
- **CAUSED WHEN:** Unable to save/query database.
- **REMEDIATION:** Use System Reset button or remove the config folder and rebuild Meshery.

### 6. INCOMPATIBLE MESHMAP AND MESHERY VERSION

- **MODE STATE:** Operator and Designer: Active, Interactable.
- **CAUSED WHEN:** Meshery and Kanvas version mismatches.
- **REMEDIATION:** Pull/build the latest Kanvas, update Mesheryctl and Meshery.

## Messages you will see

Kanvas has no version-mismatch screen. If features are missing after an upgrade, update Meshery, `mesheryctl`, and Kanvas together. The Help Center footer shows the installed Kanvas version.

| Symptom | Cause | Fix |
| --- | --- | --- |
| `Uh-oh! Something went wrong..` | The Kanvas bundle failed to download, or the bundle has no default component. | Reload. If you build Kanvas yourself, rebuild it and confirm the provider serves the new bundle. |
| Dry run, deploy, or undeploy fails with `meshery-server-1096` | No selected context resolved to a connected cluster. | Connect a cluster and select an environment that contains it. |
| `meshery-server-1073` | The connection is not assigned to the environment, or it cannot reach the cluster. | Assign the connection, or upload a new kubeconfig. |
| `meshery-server-1095` | The kubeconfig is invalid. | Upload a new kubeconfig. |
| Step 2 shows `No environments found` | The organization has no environment. | Create one and assign a connection. This needs Create Environment and Edit Environment. |
| A prompt titled `SELF-HOSTED FEATURE` | You are on kanvas.new. | Use a Meshery you run. |
| `No data available for the current view` | The view's filters or the search hide every object. | Change the filters or the search. |
| `No container found to create <type> session` | A terminal or log session needs a container and the object has none. | Pick an object that runs a container. |

