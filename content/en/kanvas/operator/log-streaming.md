---
title: Log Streaming
description: >
  Learn about Log Streaming in Operator mode 
categories: [Operator]
---

Efficient troubleshooting requires immediate visibility into your application's behavior. The **Log Streamer** in Kanvas allows you to live-tail logs from your Kubernetes pods and containers directly within the visual topology. Unlike static log files, this feature provides a real-time, multiplexed view of your infrastructure's activities, enabling you to debug interactions between services without leaving the Kanvas interface.

## Overview

Kanvas Log Streaming is part of the **Operator** mode (Visualizer). It establishes a persistent, low-latency connection to your cluster resources, allowing you to stream `stdout` and `stderr` logs from one or multiple pods simultaneously.

### Key Features

* **Real-time Tailing:** Watch logs generation instantly as events occur in your cluster.
* **Multi-Pod Streaming:** Stream logs from a single specific pod or multiplex logs from several pods at once to correlate events across different services.
* **Keyword Filtering:** Apply search filters to the log stream to isolate specific error codes, transaction IDs, or warning messages.
* **Playback Controls:** Interactive controls to **Play**, **Pause**, **Stop**, and **Clear** the stream, giving you control over the flow of information during high-volume events.

## How to Access Log Streaming

To utilize the Log Streamer, ensure you are in **Operator Mode** and have a connected Kubernetes cluster with MeshSync active.

1. **Navigate to Visualizer:** Open Kanvas and toggle to **Operator** mode (Visualizer) to view your running cluster topology.
2. **Select a Resource:** Click on a **Pod** or **Deployment** node within your design.
3. **Open the Log Stream:**
    * **Via Context Menu:** Right-click the node and select **Stream Logs** from the context menu.
    * **Via Details Panel:** With the node selected, expand the bottom panel or the **Details** drawer. Locate the **Log Stream** tab next to the Terminal and Performance tabs.

## Using the Interface

Once the stream is active, the Log Streamer panel will display the output.

* **Search/Filter:** Use the search bar within the panel to highlight or filter lines containing specific strings (e.g., `Error`, `Exception`, or specific request IDs).
* **Toggle State:** Use the toggle switches to pause the live feed to inspect a specific log line without losing your place, then resume to catch up with the live tail.
* **Copy Logs:** Use the copy function to capture the current log buffer to your clipboard for external analysis or ticket submission.

## Use Cases and Examples

### 1. Troubleshooting CrashLoopBackOff

**Scenario:** A newly deployed pod is failing to start, entering a `CrashLoopBackOff` state.
**Action:** Select the failing pod in Kanvas. The Log Streamer immediately captures the container's startup output.
**Benefit:** You can instantly see the specific runtime error or missing environment variable causing the crash without manually running `kubectl logs -f` commands in a separate terminal window.

### 2. Correlating Microservice Interactions

**Scenario:** A frontend service is returning a 500 error, but the issue likely originates in a backend dependency.
**Action:** Multi-select both the Frontend Pod and the Backend Pod in the visualizer and activate log streaming.
**Benefit:** Kanvas multiplexes the streams. You can watch the request leave the frontend and fail at the backend in a single view, allowing you to pinpoint exactly where the transaction breaks.

### 3. Monitoring Real-time Traffic Patterns

**Scenario:** You have applied a new canary rollout pattern and want to verify traffic distribution.
**Action:** Stream logs from the new version of your deployment while filtering for specific traffic headers or successful HTTP 200 codes.
**Benefit:** Visually verify that the application logic is processing requests as expected during the deployment window.

## Technical Note

The Log Streamer utilizes a robust architecture where the **Meshery Operator** signals the **MeshSync** controller to start the log flow. Data is streamed using **NATS** to the Meshery Broker, preprocessed, and then delivered to your browser via a **WebSocket** connection using GraphQL subscriptions. This ensures minimal latency and high performance, even when streaming data from multiple active containers.

![log-stream-sequence-diagram](images/log-stream-sequence-diagram.svg)

***

### See Also

* **[Interactive Terminal](/kanvas/terminal):** Learn how to establish an interactive shell session with your containers.
* **[Performance Management](/kanvas/performance):** Run ad-hoc performance tests alongside your log monitoring.
