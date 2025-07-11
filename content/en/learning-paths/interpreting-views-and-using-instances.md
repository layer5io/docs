---
title: "Interpreting Views and Using Instances"
description: "Understand the concept of views and how to manage instances within Layer5 and Meshery."
weight: 20
---

## Introduction

This guide provides a detailed understanding of how to interpret **views** and manage **instances** within Layer5 and Meshery. Meshery is a powerful, cloud-native management plane for service meshes that allows users to visualize, configure, deploy, and monitor service mesh components.

In the Meshery UI, views help users make sense of their environments through visual representations, while instances refer to the actual deployed elements like adapters, patterns, or test runs. By learning how to use these features effectively, users can take full advantage of Meshery’s design and operational capabilities.

---

## Interpreting Views

In Meshery, a **view** represents a specific interface or section of the UI designed to help users visualize and interact with components of a service mesh environment.

Views provide focused perspectives depending on what the user is managing or observing.

### Common Views

- **MeshMap (Topology View):** Offers a visual representation of service mesh components, their connections, and dependencies. Users can drag, drop, and modify components to create service mesh patterns or architectural diagrams.

- **Performance View:** Displays the results of performance tests, including metrics such as latency, throughput, and success rate. This helps in benchmarking different service mesh configurations or workloads.

- **Design View:** Presents reusable service mesh patterns and configurations. Users can apply or modify these patterns using MeshMap or YAML editing tools.

These views enable users to analyze system behavior, troubleshoot configurations, and design with greater clarity.

---

## Using Instances

In the Meshery platform, an **instance** typically refers to a deployed component or running configuration within your infrastructure. Instances may represent live components like adapters, patterns, workloads, or testing processes.

### Examples of Instances

- **Meshery Adapter Instance:** Each adapter connects Meshery to a specific service mesh (e.g., Istio, Linkerd). When deployed, these adapters act as interfaces to control and observe your mesh environment.

- **Running Pattern Instance:** When a design or configuration pattern is applied, it becomes a live deployment (an instance) in your cluster.

- **Performance Test Instance:** A scheduled or on-demand test running in your environment.

### Managing Instances

1. Navigate to the **Management** section in the Meshery UI.
2. Go to **Adapters** to view and manage service mesh adapter instances.
3. Use the **Patterns** or **MeshMap** section to create or deploy workload instances.
4. Monitor active instances through the **status indicators** in the dashboard or topology view.

Each instance is interactive—users can inspect logs, monitor status, redeploy, or delete as needed.

---

## Related Documentation

- [Getting Started with Meshery](/getting-started/)
- [MeshMap Overview](/meshmap/)
- [Service Mesh Patterns](/service-mesh-patterns/)
- [Managing Adapters](/adapters/)
