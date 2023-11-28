---
title: Troubleshooting MeshMap
description: Troubleshooting MeshMap

---

## Fault Scenarios Explained for MeshMap Extension

### 1. MISSING PLUGIN

- **MODE STATE:** Visualizer and Designer: Inactive, Not Interactable.
- **CAUSED WHEN:** plugin.so is not in the desired folder.
- **REMEDIATION:** Confirm plugin versions, run make dev or make prod on the local meshery-extension folder.

### 2. INCOMPATIBLE PLUGIN

- **MODE STATE:** Visualizer and Designer: Inactive, Not Interactable.
- **CAUSED WHEN:** go.mod mismatches between meshery/meshery and layer5labs/meshery-extensions.
- **REMEDIATION:** Ensure identical go.mod files and plugin version matching.

### 3. NO ACTIVE CLUSTER CONNECTIONS

- **MODE STATE:** Visualizer: Active, Not Interactable; Designer: Active, Interactable.
- **CAUSED WHEN:** No active Kubernetes cluster connections.
- **REMEDIATION:** Connect a Kubernetes cluster from settings.

### 4. MISSING MESHSYNC DATA / NATS NOT RUNNING

- **MODE STATE:** Visualizer: Active, Not Interactable; Designer: Active, Interactable.
- **CAUSED WHEN:** Meshery Broker lacks an external IP address or networking issues.
- **REMEDIATION:** Delete meshery-meshsync pod, use Docker Desktop/Kind/Minikube/external cloud provider.

### 5. CORRUPT DATABASE

- **MODE STATE:** Visualizer: Inactive, Not Interactable; Designer: Active, Interactable.
- **CAUSED WHEN:** Unable to save/query database.
- **REMEDIATION:** Use System Reset button or remove the config folder and rebuild Meshery.

### 6. INCOMPATIBLE MESHMAP AND MESHERY VERSION

- **MODE STATE:** Visualizer and Designer: Active, Interactable.
- **CAUSED WHEN:** Meshery and MeshMap version mismatches.
- **REMEDIATION:** Pull/build the latest MeshMap, update Mesheryctl and Meshery.