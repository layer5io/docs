---
title: Starting from Existing Infrastructure
description: Learn how to import your existing Kubernetes pods and infrastructure into Kanvas.
weight: 3
categories: [Designer]
tags: [designs]
aliases:
  - /kanvas/getting-started/starting-from-existing-infrastructure
---

Kanvas now **supports importing existing Kubernetes resource manifests** (including Pods) from your cluster. To bring an existing pod into Kanvas, first export it from Kubernetes, then import the YAML into Kanvas. This allows you to visualize and edit live infrastructure as a design. In the example below, we export Pods from namespace `default` and then import them into Kanvas to create a new design:

```shell
kubectl get pods -n default -o yaml > exported-pods.yaml
```

This command saves all Pods in the `default` namespace into a YAML file. You can now open Kanvas (Designer) and use the **Import** feature to load `exported-pods.yaml`. The Kanvas UI (☰ hamburger menu → **Import** or drag and drop the file onto the canvas) will read the file and render each Pod as a node on the canvas.

* **Example:** If `exported-pods.yaml` contains two Pod definitions (`frontend-pod` and `backend-pod`), Kanvas will create two corresponding components on the canvas, labeled "frontend-pod" and "backend-pod".

After importing, each Pod appears as a stand-alone node. If the Pod YAML included metadata (labels, ownerReferences, etc.), Kanvas may automatically create relationships. For example, if multiple Pods share a common label (e.g. `app: my-app`), you might see grouping or filtered views by that label in Kanvas (see [Kubernetes labels documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)). However, since we only exported Pods (and not their owning ReplicaSets or Deployments), there will be no parent/child edges in this design unless you import those resources too.

### Key points when importing Pods:

* **File format:** Kanvas accepts standard Kubernetes manifests in YAML. In practice, using `kubectl get pods -o yaml` produces a multi-document YAML file with all Pods. Kanvas parses each `---` document as a separate resource.
* **Supported resources:** Although this example is about Pods, Kanvas's import supports any Kubernetes resource in a manifest (e.g. Deployments, Services, ConfigMaps, etc.). All such resources in the file will be added.
* **Import methods:** You can import via the Kanvas **Import** dialog (hamburger menu), via drag and drop, or via a cloud URL. For example, dragging `exported-pods.yaml` directly onto a blank Kanvas canvas will also load it. (The Kanvas Import dialog offers flexibility to choose file or URL inputs.)
* **Resulting canvas:** Once imported, Kanvas displays each Pod with its name and key details. You can click a Pod node to view its spec and metadata. Kanvas might also arrange related components automatically (e.g. grouping by namespace or label) depending on current design filters.
* **Namespace handling:** The namespace in the metadata is preserved. If you import pods from a different namespace, Kanvas can filter or color-code by namespace.
* **Re-importing:** If you later edit the manifest or get updated YAML, you can re-import. Kanvas will create new nodes; you may need to delete or reconcile duplicates manually.

### Example YAML and Kanvas Design

Suppose our `exported-pods.yaml` looks like this (two simple Pods):

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: frontend-pod
  namespace: default
  labels:
    app: my-app
spec:
  containers:
  - name: web
    image: nginx
---
apiVersion: v1
kind: Pod
metadata:
  name: backend-pod
  namespace: default
  labels:
    app: my-app
spec:
  containers:
  - name: api
    image: my-api-image
```

Dragging or importing this file into Kanvas will produce two pod components. Each node is named after the Pod (e.g. **frontend-pod**, **backend-pod**), and their details (like container images) show in the side panel when selected. Because both Pods share the label `app: my-app`, Kanvas may visually indicate that common label, but without importing the owning Deployment, there are no edges drawn for an owner relationship.

*(Figure: Kanvas canvas after importing two Pods from YAML. Each Pod appears as a separate component. Nodes and relationships are automatically laid out by Kanvas.)*

### Best Practices and Notes

* **Check YAML validity:** Ensure the exported YAML is valid (no missing fields). Kanvas will report errors if it cannot parse a document.
* **Multiple resource kinds:** You can combine multiple kinds in one file (e.g. Pods and Services). Kanvas will import all of them. If a file contains unsupported resource types, those entries are simply ignored.

### Limits and Performance

* **Component limits and performance:** While Kanvas's import parser does not impose a fixed technical limit on the number of components it can process, your subscription plan may limit the total number of components in a design (e.g., free accounts are limited to 100 components). For larger clusters, we recommend breaking imports into smaller designs or upgrading your plan. Additionally, very large designs (thousands of components) may slow down browser rendering, so we recommend using Kanvas's filtering to manage complexity.
* **Relationship complexity:** The more resources (and relationship definitions) you import, the more edges Kanvas must draw. Kanvas's layout engine will draw all defined relationships (e.g. ownerReferences, label matches, or manually created connections). A higher number of edges primarily affects render time and visual complexity but does not otherwise limit import. For most use cases, the practical limit is the browser's ability to display and interact with the graph. If you notice performance issues, try reducing the number of resources per design.

### "kubectl describe" is Not Supported

Importantly, **Kanvas only accepts static manifest YAML** (like the output of `kubectl get -o yaml`). The output of `kubectl describe` is a human-readable status report (with events and conditions) rather than a pure manifest. Therefore:

* **Do not use `kubectl describe`:** Kanvas cannot parse the `describe` format and will report errors if you try. Stick to `kubectl get <resource> -o yaml`.
* **Static state only:** Remember that imported YAML captures the state at export time. Kanvas will not automatically update if the cluster changes after import (unless you re-export and re-import).

### Summary

By following these steps, you can **visualize live Pods** in Kanvas:

1. Run `kubectl get pods -n <namespace> -o yaml > pods.yaml`.
2. In Kanvas, click **Import** (☰ menu) or drag `pods.yaml` into the canvas.
3. Kanvas loads each Pod as a component. Review and adjust as needed.

This "Starting from Existing Infrastructure" approach helps onboard users by converting real cluster resources into a Kanvas design. It demonstrates how Kanvas bridges the gap between YAML and diagrams, making it easy to explore and edit running infrastructure visually.
