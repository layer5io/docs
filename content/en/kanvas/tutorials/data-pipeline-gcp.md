---
title: "Building a GCP Data Pipeline Design"
description: >
  Walk through creating the data-pipeline-gcp design in Kanvas, connecting GCP services in orbital-production.
weight: 6
categories: [Designer, Tutorials]
---

Zara Osei is the Team Admin for Orbital Labs' Infrastructure Team. Her mandate: model the team's GCP-native data pipeline in Kanvas so that the architecture lives alongside the infrastructure it describes — versioned, shareable, and auditable. The pipeline ingests events via Cloud Pub/Sub, processes them with Dataflow, stores analytical results in BigQuery, and archives raw payloads to Cloud Storage — all orchestrated on a GKE cluster. This tutorial walks through how Zara builds that design, `data-pipeline-gcp`, in the `orbital-production` workspace.

## Prerequisites

- Access to the `orbital-production` workspace in Orbital Labs
- The `prod-gcp` environment configured with active connections for GKE, Cloud SQL, Cloud Storage, and Cloud Pub/Sub
- Designer or higher permission on the `orbital-production` workspace

## Tutorial

### Step 1: Create the design

Zara opens Kanvas and navigates to the **Designer** view. From the workspace selector she picks `orbital-production` — the workspace where Orbital Labs' production infrastructure designs live.

She selects **New Design**, enters `data-pipeline-gcp` as the design name, and confirms. Kanvas creates the design and opens a blank canvas. From this point everything she does is auto-saved and tracked in design history.

### Step 2: Add GCP components

With the canvas open, Zara opens the **Component Library** panel and filters by provider: `GCP`. She drags the following components onto the canvas, giving each a descriptive display name as she goes:

- **GKE Cluster** — named `pipeline-cluster`; this is the compute backbone that will host Dataflow workers and any auxiliary services
- **Cloud Pub/Sub Topic** — named `events-ingest`; the entry point for incoming event streams
- **Dataflow Job** — named `stream-processor`; the managed pipeline that reads from Pub/Sub and writes downstream
- **BigQuery Dataset** — named `analytics-store`; the long-term destination for processed records
- **Cloud Storage Bucket** — named `raw-archive`; stores unprocessed event payloads for replay and compliance

She arranges them left-to-right to mirror the data flow direction, which makes the diagram readable at a glance.

### Step 3: Draw data-flow edges

Zara switches to **edge mode** and draws the connections that define how data moves:

1. An edge from **events-ingest** (Pub/Sub) to **stream-processor** (Dataflow) — representing the subscription pull
2. An edge from **stream-processor** to **analytics-store** (BigQuery) — the primary write path for processed records
3. A second edge from **stream-processor** to **raw-archive** (Cloud Storage) — the archive branch for raw payloads
4. An edge from **pipeline-cluster** (GKE) to **stream-processor** — indicating that the Dataflow worker pool runs inside the GKE cluster

She annotates the Pub/Sub → Dataflow edge with the label `subscription-pull` so reviewers immediately understand the consumption pattern.

### Step 4: Attach the prod-gcp environment

With the topology drawn, Zara needs to bind the design to live infrastructure connections so that Kanvas can resolve the GKE cluster reference and flag configuration mismatches.

She opens **Design Settings → Environments**, selects `prod-gcp` from the dropdown, and saves. The `prod-gcp` environment carries active connections for GKE, Cloud SQL, Cloud Storage, and Pub/Sub — once attached, Kanvas overlays connection status indicators on each bound component, and the `pipeline-cluster` node immediately shows its live cluster version.

### Step 5: Apply tagset labels

Zara uses Kanvas tagsets to group components by architectural layer, which makes it easy for teammates to filter the diagram by concern:

- She selects **events-ingest** and applies the tag `ingestion-layer`
- She selects **stream-processor** and applies `processing-layer`
- She selects **analytics-store** and **raw-archive** and applies `storage-layer` to both
- She selects **pipeline-cluster** and applies `compute-layer`

Tags are visible in the component inspector panel and can be used as filter criteria when viewing the design in summary or list mode.

### Step 6: Validate the design

Before sharing, Zara runs **Validate Design** from the toolbar. Kanvas checks each component for:

- Required fields that are empty (e.g., a GKE cluster with no node pool configuration)
- Dangling edges — connections that reference a component that no longer exists
- Environment binding gaps — components that reference a connection type not present in the attached environment

The validator returns one warning: the `pipeline-cluster` GKE component has no node pool defined. Zara adds a default node pool configuration inline and re-runs validation. It passes cleanly.

### Step 7: Save and share with Five

With validation passing, Zara opens the **Share** panel. She searches for Five (her Orbital Labs teammate with Platform Engineer access) and grants him **view + comment** permissions. She adds a note: "First pass on the pipeline topology — please flag anything that looks off before I wire up the Dataflow job config."

Five receives an in-app notification. When he opens the design, he can see all five components and their connections, inspect the `prod-gcp` environment bindings, and leave threaded comments — but the canvas is read-only for him until Zara promotes his permission to editor.

The `data-pipeline-gcp` design is now live in `orbital-production`, connected to real infrastructure, and ready for collaborative review.

{{< alert type="info" >}}
Meet Zara and the rest of the team at [Meet Five and the Cast](/cloud/getting-started/meet-five).
{{< /alert >}}
