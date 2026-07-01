---
title: Kubernetes Components Reference
description: A no-fluff guide to configuring Kubernetes components in Kanvas.
weight: 20
categories: [Designer, Reference]
tags: [kubernetes, configuration]
---

When designing infrastructure in Kanvas, dragging complex Kubernetes components (like a Service or Deployment) onto the canvas opens a configuration panel. This panel exposes the underlying YAML specification as editable fields. 

This reference guide explains the most commonly used configuration properties for Kubernetes components, providing clarity on expected syntax, typical values, and how these settings affect your cluster's behavior.

## Kubernetes Deployment

A Deployment provides declarative updates for Pods and ReplicaSets. It allows you to describe an application's lifecycle, such as which images to run, how many replicas there should be, and the strategy for updating them.

### General Configurations

* **`replicas`** *(integer)*
  * **What it does:** Specifies the desired number of identical Pods to run concurrently.
  * **Behavior:** If set to `3`, Kubernetes' control loop continuously monitors the cluster to ensure exactly 3 Pods are running. If a Pod crashes or is deleted, a replacement is automatically provisioned.

* **`selector`** *(object)*
  * **What it does:** A label query over Pods that should match the replica count.
  * **Behavior:** This tells the Deployment exactly *which* Pods it is responsible for managing. The selector must exactly match the labels defined in the `template`.

* **`template`** *(object)*
  * **What it does:** The blueprint used to create new Pods.
  * **Behavior:** It contains the metadata (like labels) and the `spec` (like `containers`, `images`, and `ports`) for every Pod managed by this Deployment.

* **`revisionHistoryLimit`** *(integer)*
  * **What it does:** Specifies the number of old ReplicaSets to retain to allow rollback.
  * **Behavior:** Defaults to `10`. If set to `0`, you cannot roll back to previous versions of the Deployment.

* **`paused`** *(boolean)*
  * **What it does:** Indicates whether the deployment is paused.
  * **Behavior:** If set to `true`, you can apply multiple updates to the Deployment without triggering a rollout until it is unpaused. Useful for batching multiple changes at once.

### Rollout Strategies and Health

* **`strategy`** *(object)*
  * **What it does:** Describes the update strategy used to replace existing Pods with new ones when the Deployment is updated (e.g., when changing the container image).
  * **Expected values:**
    * `RollingUpdate` (Default): Gradually replaces old Pods with new ones, ensuring zero downtime.
    * `Recreate`: Terminates all existing Pods before creating new ones, causing temporary downtime but avoiding version mixing.

* **`minReadySeconds`** *(integer)*
  * **What it does:** The minimum number of seconds a newly created Pod should be "ready" (without any of its containers crashing) for it to be considered fully available.
  * **Behavior:** This is crucial for rolling updates. It artificially slows down the rollout to ensure the newly started application actually remains stable before tearing down the older instances.

* **`progressDeadlineSeconds`** *(integer)*
  * **What it does:** The maximum time in seconds the Deployment controller waits for a rollout to make progress before considering it "failed".
  * **Behavior:** If a new Pod gets stuck in a crash loop due to a bad configuration or image, the Deployment will stop trying to roll out after this deadline (defaults to `600s`) and report a `ProgressDeadlineExceeded` error condition.

---

## Kubernetes Service

A Service is an abstract way to expose an application running on a set of Pods as a network service. Since Pods are ephemeral and their IP addresses change, a Service provides a stable endpoint.

### Networking and Routing

* **`type`** *(string)*
  * **What it does:** Determines how the Service is exposed to the network.
  * **Expected values:**
    * `ClusterIP` (Default): Exposes the Service on an internal IP. Only reachable from within the cluster.
    * `NodePort`: Exposes the Service on a static port on each Node's IP. Reachable from outside the cluster.
    * `LoadBalancer`: Provisions a cloud provider's external load balancer to expose the Service to the public internet.
    * `ExternalName`: Maps the Service to a DNS name (e.g., `db.example.com`).

* **`selector`** *(object)*
  * **What it does:** Key-value pairs used to identify which Pods this Service should route traffic to.
  * **Behavior:** If a Service has a selector of `app: frontend`, it will automatically discover and load-balance traffic across all Pods in the namespace that possess the `app: frontend` label.

* **`ports`** *(array)*
  * **What it does:** Defines the network ports exposed by the Service.
  * **Expected values:** Contains objects with the following keys:
    * `port`: The stable port exposed by the Service itself.
    * `targetPort`: The port on the underlying Pod that the traffic is forwarded to.
    * `protocol`: Typically `TCP`, `UDP`, or `SCTP`.

* **`clusterIP`** *(string)*
  * **What it does:** The stable internal IP address of the service.
  * **Behavior:** Usually left blank to be assigned automatically by Kubernetes. It can be explicitly set to `None` to create a "Headless Service." Headless Services bypass the typical load-balancing proxy and instead allow clients to directly resolve the IP addresses of the individual backing Pods via DNS.
