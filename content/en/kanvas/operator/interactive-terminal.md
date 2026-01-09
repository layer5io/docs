---
title: Interactive Terminal
description: >
  Learn about Interactive Terminal in Operator mode 
categories: [Operator]
---

When operating cloud native infrastructure, deep diagnostics often require direct access to the container shell. The **Interactive Terminal** in Kanvas enables you to execute commands and inspect the filesystem of your running containers directly from the visual topology. By integrating terminal sessions into the Kanvas interface, you can troubleshoot issues, verify configurations, and test network connectivity without switching context to external CLI tools like `kubectl`.

## Overview

The Kanvas Interactive Terminal allows operators to establish a secure, low-latency shell session with one or more pods simultaneously. This feature is essential for "last mile" debugging where metrics and logs alone are insufficient.

### Key Features

* **Direct Shell Access:** Instantly `exec` into any running container within your Kubernetes cluster to run standard shell commands (e.g., `ls`, `curl`, `top`).
* **Multi-Session Support:** Open concurrent terminal sessions for different pods to compare environments or run simultaneous tests.
* **Integrated Workflow:** Debug specific nodes while maintaining visibility of the surrounding infrastructure topology.
* **Session Management:** Configure preferences such as "Auto-close Terminal Sessions" to manage resources efficiently.

## How to Access the Terminal

To use the Interactive Terminal, ensure you are in **Operator Mode** (Visualizer) and have a connected Kubernetes cluster.

1. **Navigate to Visualizer:** Open Kanvas and switch to **Operator** mode to view your active cluster resources.
2. **Select a Workload:** Click on a **Pod** or **Deployment** node within your design.
3. **Launch the Session:**
    * Expand the **Details** panel (bottom drawer).
    * Select the **Terminal** tab (located alongside *Performance* and *Log Stream*).
    * If the pod contains multiple containers, select the specific container you wish to access.
    * Click **Connect** to initialize the session.

## Use Cases and Examples

### 1. Verifying Network Connectivity

**Scenario:** A backend service is failing to connect to a database, but the service status appears green.
**Action:** Open a terminal in the backend pod and use `curl` or `nc` (netcat) to attempt a connection to the database endpoint.
**Benefit:** Confirms whether the issue is a network policy blocking traffic, a DNS resolution failure, or an application-layer configuration error, all while visualizing the connection in Kanvas.

### 2. Inspecting Configuration Files

**Scenario:** An application is behaving unexpectedly, and you suspect the mounted ConfigMap data is incorrect.
**Action:** Use the terminal to `cat` the configuration files located in the file system (e.g., `/etc/config/app.conf`).
**Benefit:** Verifies exactly what the application sees at runtime, ensuring that the latest ConfigMap updates have actually propagated to the pod.

### 3. Real-Time Resource Monitoring

**Scenario:** A specific pod is triggering high-memory alerts, but you need to know which process is the culprit.
**Action:** Exec into the container and run `top` or `ps aux`.
**Benefit:** Provides granular visibility into process-level resource consumption that aggregate metrics might miss.

### 4. Environment Variable Validation

**Scenario:** A deployment fails to authenticate with an external API.
**Action:** Run the `env` command within the container's terminal.
**Benefit:** Allows you to instantly verify if secret keys and API endpoints were injected correctly as environment variables during startup.

## Technical Architecture

The Interactive Terminal is built on an event-driven architecture designed for security and responsiveness:

1. **Session Initiation:** When a user initiates a session, the Meshery Server receives the request via the GraphQL API.
2. **Orchestration:** The request is brokered to the **Meshery Operator**, which signals the **MeshSync** controller running inside the cluster to start the interactive session.
3. **Data Transport:** Input and output data are streamed via **NATS** through the Meshery Broker. Shell output is preprocessed and transcribed before being delivered to the UI.
4. **Session Isolation:** Each terminal session is mapped to a unique topic ID within the subscription, ensuring that data streams for multiple open terminals do not overlap.

***

### See Also

* **[Log Streaming](/kanvas/operator/log-streaming):** Learn how to live-tail logs for real-time application monitoring.
<!-- * **[Performance Management](/kanvas/performance):** Run load tests and analyze performance profiles. -->
