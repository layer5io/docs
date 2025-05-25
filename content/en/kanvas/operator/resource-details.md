---
title: Instance Details
weight: 5
description: >
  Learn about Instance Details in Operator mode
categories: [Operator]
---

In Kanvas, the Instance Details tab provides a detailed view of Kubernetes resources such as Nodes, Pods, Deployments, and more. This tab is essential for understanding the configuration and status of individual resources within your Kubernetes cluster.
The Instance Details tab is accessible when you select a specific Kubernetes resource from the Resources tab. It allows you to view and manage the details of that resource, including its configuration, status, and associated events.

Depending on the type of resource selected, the Instance Details tab will display relevant information. For example, if you select a Node, it will show details about the node's status, capacity, and conditions. If you select a Pod, it will display information about the pod's containers, their statuses, and any associated labels.

<div style="display:flex;justify-content:center;">
{{< cardpane >}}
  {{< card header="Node Details" >}}
    <img src="/kanvas/operator/images/operator-node-details.png" alt="Example description" />
    <p><i>Example: Kubernetes Node details.</i></p>
  {{< /card >}}
    </a>
  
  {{< card header="Container Details" >}}  
    <img src="/kanvas/operator/images/operator-container-details.png" alt="Example description" />
    <p><i>Example: Kubernetes Pod Container details.</i></p>
  {{< /card >}}
  </a>
{{< /cardpane >}}
</div>