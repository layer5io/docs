---
title: Navigating Operator
weight: 5
description: >
  Operator mode is for operating your Kubernetes clusters and cloud native infrastructure. 
categories: [Operator]
aliases:
  - /meshmap/operator
---

Discover and examine your Kubernetes clusters and cloud native infrastructure using Operator mode.

## Using Filters

Using filters you can select the Kubernetes resources you want to view. Apply one or more filters to narrow down the resources you want to view.

## Search and Select Specific Resources

Using the search bar, you can search for specific resources and select them. The selected resources are highlighted in the Operator canvas. Details of the selected resources are displayed in the right panel.

<!-- {{< figure src="images/operator-filters.png" link="images/operator-filters.png"  width="100%"  >}} -->

## Connecting with Kubernetes Pods

Operator supports connecting to Kubernetes pods via the following methods.

### Understanding Log Streamer

<!-- {{< figure src="images/log-stream-sequence-diagram.svg" link="images/log-stream-sequence-diagram.svg"  width="100%" alt="log-stream-sequence-diagram" >}} -->

![log-stream-sequence-diagram](images/log-stream-sequence-diagram.svg)

### Understanding Interactive Terminal

The interactive terminal behaves in a fashion similar to similar to the behavior of the `kubectl exec` command, but web-based.

{{< alert type="note" title="Distinct Capabilities" >}} Note that each component offers its own capabilities, and that these capabilities differ between Designer mode and Operator mode. For example, in operator mode, if you right-click (and hold) on a Kubernetes pod, you will see actions unique to the Pod component, which are to open either an interactive terminal to one or all of the containers in the pod or to start streaming logs from any/all of the containers in the pod. {{< /alert >}}

While using using the interactive terminal, understand that you can only open one session per container. Each session's data is streamed via Meshery Broker (NATS) from MeshSync to Meshery Server / Kanvas. The GraphQL subscription between your web browser running Kanvas and Meshery Server provides isolation between other users who might be concurrently sharing an interactive terminal. Each connection established a unique session ID.

<!-- {{< figure src="images/interactive-terminal-sequence-diagram.svg" link="images/interactive-terminal-sequence-diagram.svg"  width="100%" alt="interactive-terminal-sequence-diagram" >}} -->

![interactive-terminal-sequence-diagram](images/interactive-terminal-sequence-diagram.svg)
