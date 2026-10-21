# Building a GCP Data Pipeline Design


> Walk through creating the data-pipeline-gcp design in Kanvas, connecting GCP services in orbital-production.



Zara Osei is the Team Admin for Orbital Labs' Infrastructure Team. Her mandate: model the team's GCP-native data pipeline in Kanvas so that the architecture lives alongside the infrastructure it describes — versioned, shareable, and auditable. The pipeline ingests events via Cloud Pub/Sub, processes them with Dataflow, stores analytical results in BigQuery, and archives raw payloads to Cloud Storage — all orchestrated on a GKE cluster. This tutorial walks through how Zara builds that design, `data-pipeline-gcp`, in the `orbital-production` workspace.

## Prerequisites

- A Kanvas account and access to the `orbital-production` workspace in Orbital Labs
- No cluster and no GCP account. This tutorial only draws and shares a design.

Kanvas stores no environment on a design. Zara does not attach `prod-gcp`, and the canvas does not overlay connection status or a live cluster version onto components. Environments are chosen when someone deploys: the Deploy stepper asks which environments to target and deploys to the Kubernetes connections assigned to them. This tutorial does not deploy.

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

1. An edge from **events-ingest** (Pub/Sub) to **stream-processor** (Dataflow), representing the subscription pull
2. An edge from **stream-processor** to **analytics-store** (BigQuery), the primary write path for processed records
3. A second edge from **stream-processor** to **raw-archive** (Cloud Storage), the archive branch for raw payloads
4. An edge from **pipeline-cluster** (GKE) to **stream-processor**, indicating that the Dataflow worker pool runs inside the GKE cluster

She labels the Pub/Sub to Dataflow edge `subscription-pull` so reviewers immediately understand the consumption pattern.

A line is a registry relationship only when the edge menu offers one between those two components. A registry relationship is part of the model: Kanvas can write values from one component's configuration into the other's. If the menu offers nothing that connects the pair, document the flow with the Pen tool. An annotation line is saved with the design and seen by collaborators, but it changes no configuration and is never deployed.

### Step 4: Leave the design unbound from an environment

With the topology drawn, Zara does not open Design Settings to attach `prod-gcp`. Kanvas has no environment stored on the design, so there is no connection-status overlay and `pipeline-cluster` does not show a live cluster version. The design can later be deployed to more than one environment without changing the drawing.

### Step 5: Add labels

Zara adds labels so teammates can see which architectural layer each component belongs to:

- She selects **events-ingest** and sets the label `ingestion-layer`
- She selects **stream-processor** and sets `processing-layer`
- She selects **analytics-store** and **raw-archive** and sets `storage-layer` on both
- She selects **pipeline-cluster** and sets `compute-layer`

A label is data on the component. It is not a TagSet, and Designer does not filter the canvas by label. A TagSet is a shaded region Kanvas draws on its own when a registry relationship defines a label match for those components. Zara cannot draw a TagSet, and many models define none. Labels stay visible in the component configurator.

### Step 6: Validate the design

Before sharing, Zara runs **Validate** from the toolbar. Validate runs in the browser against each component's schema. It checks configuration only. It skips annotation objects such as Pen lines, and it does not check relationships, edges, namespaces, or any environment binding.

The report lists each component that has errors. With no errors it reads "No validation errors." A missing required field is a warning. Warnings never block saving or sharing. A clean report means every component's configuration matches its schema. It does not mean the pipeline would deploy.

### Step 7: Share with Five

With validation passing, Zara opens **Share**. Share is available once the design has components. She searches for Five by name or email and adds him. A share is a grant to one named user. It carries no permission level: there is no view-and-comment option, and the canvas is not read-only for him. Share only with people who should be able to edit. Five can open the design, change it, and leave comments. Comments are Comment components stored in the design, so the thread is saved with the design.

The `data-pipeline-gcp` design is now in `orbital-production` and ready for collaborative review. It is not connected to live infrastructure.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Info</h4>
  
      Meet Zara and the rest of the team at <a href="/pr-preview/pr-1354/cloud/getting-started/meet-five/">Meet Five and the Cast</a>.
  
</div>



