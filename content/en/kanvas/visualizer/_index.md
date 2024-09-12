---
title: Navigating Visualizer
weight: 5
description: >
  Visualizer mode is for operating your Kubernetes clusters and cloud native infrastructure. 
categories: [Visualizer]
aliases:
  - /meshmap/visualizer
---

Discover and examine your Kubernetes clusters and cloud native infrastructure using Visualizer mode.

## Using Filters

Using filters you can select the Kubernetes resources you want to view. Apply one or more filters to narrow down the resources you want to view.

## Search and Select Specific Resources

Using the search bar, you can search for specific resources and select them. The selected resources are highlighted in the Visualizer canvas. Details of the selected resources are displayed in the right panel.

<!-- {{< figure src="images/visualizer-filters.png" link="images/visualizer-filters.png"  width="100%"  >}} -->

## Connecting with Kubernetes Pods

Visualizer supports connecting to Kubernetes pods via the following methods.

### Understanding Log Streamer

{{< figure src="images/log-stream-sequence-diagram.svg" link="images/log-stream-sequence-diagram.svg"  width="100%" alt="log-stream-sequence-diagram" >}}

### Understanding Interactive Terminal

The interactive terminal behaves in a fashion similar to similar to the behavior of the `kubectl exec` command, but web-based.

While using using the interactive terminal, understand that you can only open one session per container.
Each session's data is streamed via Meshery Broker (NATS) from MeshSync to Meshery Server / Kanvas.
The GraphQL subscription between your web browser running Kanvas and Meshery Server provides isolation between other users who might be concurrently sharing an interactive terminal. Each connection established a unique session ID.

{{< figure src="images/interactive-terminal-sequence-diagram.svg" link="images/interactive-terminal-sequence-diagram.svg"  width="100%" alt="interactive-terminal-sequence-diagram" >}}
