---
title: Performance Testing in Operator
weight: 6
description: >
  Measure the behaviour of a running service from the Operator canvas, using saved performance profiles.
categories: [Operator]
tags: [performance]
---

Operator mode gives you continuous visibility across all of your clusters and workloads: MeshSync discovers every resource in every connected cluster and streams changes back to Kanvas, so the canvas is a live picture rather than a periodic snapshot. Performance testing closes the loop on that picture. Having found the service you are interested in, you can generate load against it in place and keep the result as a reusable performance profile.

## Continuous visibility across clusters and workloads

The Operator canvas draws every resource MeshSync has discovered across the Kubernetes clusters connected to your Meshery deployment. Filters in the Layers panel narrow that down to the clusters, namespaces and kinds you care about, and a saved [view]({{< ref "kanvas/operator/views/index.md" >}}) makes a given slice repeatable. Because discovery is continuous, resources appear, change status and disappear on the canvas as they do in the cluster - you are never looking at a stale export.

From there, the Details panel gives you the state of any single resource, [log streaming]({{< ref "kanvas/operator/log-streaming/index.md" >}}) and the [interactive terminal]({{< ref "kanvas/operator/interactive-terminal/index.md" >}}) give you its behaviour, and performance testing gives you its response under load.

## Initiating a performance test

Performance tests are run against the resources that expose an endpoint, so the action is available on **Service** and **Ingress** components. It is not offered on Pods, Deployments or other kinds.

1. Switch Kanvas to **Operator** mode and locate the Service or Ingress you want to test.
2. Either right-click the component and choose **Initiate Performance Test**, or select the component and click the performance action in the header of the Details panel.
3. The Performance panel opens on the right of the canvas, pre-filled from the resource you selected.

Kanvas derives the target URL from the service itself rather than asking you to type it. It reads the service's type, cluster IP, node ports or load balancer ingress addresses and its declared ports, and offers the resulting endpoint as the URL to test. For a `ClusterIP` service that is `http://<clusterIP>:<port>`; for a `LoadBalancer` service it is the ingress address and port.

<!-- SCREENSHOT NEEDED: Kanvas Operator, right-click context menu open on a Kubernetes Service component, with "Initiate Performance Test" visible -->

## Selecting a performance profile

The Performance panel is Meshery's performance test form, loaded in performance-profile mode: the settings you run with are saved as a named profile, and existing profiles can be selected and re-run instead of being retyped. That is what makes a test repeatable - the same load, against the same endpoint, before and after a change.

Kanvas seeds a new profile from the selected component so that a first run needs no configuration at all:

| Setting | Seeded value |
| --- | --- |
| Profile name | `<Kind> - <component name>`, for example `Service - checkout` |
| URL to test | The first endpoint derived from the service |
| Concurrent requests | 10 |
| Queries per second | 20 |
| Duration | 30s |
| Load generator | `fortio` |

Every one of these can be changed before you run. The form also exposes request headers, cookies, content type and body, a CA certificate upload for TLS endpoints, and additional load-generator options. Nothing runs until you start the test explicitly - opening the panel does not generate load.

Saved profiles, historical results and comparisons between runs live in Meshery's performance management screens. For the full description of profiles, load generators and how results are interpreted, see [Performance Management](https://docs.meshery.io/guides/performance-management) in the Meshery documentation.

<!-- SCREENSHOT NEEDED: Kanvas Operator, Performance panel open beside the canvas with the seeded profile name, URL, concurrency, QPS, duration and load generator fields visible -->

***

### See Also

* **[Instance Details]({{< ref "kanvas/operator/resource-details/index.md" >}}):** Inspect the live state of the resource you are testing.
* **[Performance Limits and Tuning]({{< ref "kanvas/advanced/performance/index.md" >}}):** Understand the limits of Kanvas itself when working with large designs.
