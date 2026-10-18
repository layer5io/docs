# Build a GCP Data Pipeline Design


> Model a Google Cloud data pipeline as a Kanvas design, organize it by architectural layer, validate it, and share it for review.


In this tutorial you follow Zara Osei, Team Admin of the Orbital Labs Infrastructure Team, as she models the team's Google Cloud data pipeline in Kanvas. The pipeline ingests events through Pub/Sub, processes them with Dataflow, writes analytical results to BigQuery, archives raw payloads to Cloud Storage, and runs alongside a GKE cluster. The result is a design named `data-pipeline-gcp`: a reviewable, shareable model of the architecture that lives in the team's workspace instead of in a slide deck.

This is a design-only tutorial. It ends with a validated design shared with a teammate, and it deploys nothing. Deploying Google Cloud resources from a design needs a controller running in the target cluster that reconciles those resources against Google Cloud, the same pattern the [AWS](/pr-preview/pr-1338/kanvas/tutorials/deploy-aws-ec2-instances-with-meshery/) and [Azure](/pr-preview/pr-1338/kanvas/tutorials/deploy-azure-resources-with-meshery/) tutorials walk through. Without that controller, a deploy creates objects that nothing acts on.

## What you will learn

- A Kanvas component is a resource definition from the Meshery registry, and its configuration form is generated from that definition's schema.
- Relationships between components come from the registry. Where the registry defines none, an annotation line documents the flow without changing any configuration.
- Labels carry metadata on a component, while sections group components visually. Neither changes how the components are configured.
- Validate checks each component against its schema and reports problems as warnings that never block you.
- Sharing grants a named person full editing access, and collaborators see each other's changes live.

## Before you begin

- **A Kanvas environment that supports Validate.** Use Meshery Playground (https://play.meshery.io) or a self-hosted Meshery. Validate runs entirely in your browser and needs no cluster, but hosted kanvas.new offers no cluster actions: its Validate opens a prompt to use Meshery Playground or self-host instead. Playground is shared with other users, so never enter real cloud credentials there. This tutorial needs none.
- **A workspace.** Kanvas creates a new design in your currently selected workspace in the current organization. Zara uses `orbital-production`. Select yours before you start.
- **Permission to share designs.** Sharing requires the Share Design permission in the organization that owns the workspace. The Organization Admin role carries it by default. See [Permissions](/pr-preview/pr-1338/kanvas/reference/permissions/).
- **A teammate with an account.** You share with a named user. Zara shares with Five.
- **Your plan's component limit.** Each plan limits the number of components in one design, and Kanvas enforces the limit when it saves the design. This design holds well under a dozen components, plus a few annotation objects. See [Feature availability](/pr-preview/pr-1338/kanvas/reference/feature-availability/).

You need a working knowledge of the Google Cloud services involved. You do not need a Google Cloud project or credentials.

## The scenario

At the end, the design contains five Google Cloud components, grouped into four sections by layer, with the data flow drawn between them:

```text
[ Ingestion ]          [ Processing ]            [ Storage ]
Pub/Sub topic   --->   Dataflow job      --->    BigQuery dataset
events-ingest          stream-processor          analytics-store
                              |
                              +------------->    Cloud Storage bucket
                                                 raw-archive

[ Compute ]
GKE cluster
pipeline-cluster
```

Each component also carries a `layer` label (`ingestion`, `processing`, `storage`, or `compute`). The design is validated and shared with Five, who leaves a review comment.

### A note on environments

The design does not name a cluster or an environment, and it does not need to. Kanvas stores no environment on a design. You choose environments when you deploy: the Deploy stepper asks which environments to target, and deploys to the Kubernetes connections assigned to them. That separation lets one design go to staging and production unchanged. See [Environments](https://docs.meshery.io/concepts/logical/environments).

## Phase 1: Create the design

Create a new design and name it `data-pipeline-gcp`.

Kanvas saves the design automatically: a new design is saved once it has a name or a component, and every later change is saved after a short pause in editing. There is no Save button. The design lands in your selected workspace, `orbital-production` in Zara's case.

**What just happened.** A design is a single document that holds every component, relationship, and annotation you add. Autosave writes that document after each pause, and the save is where your plan's component limit is checked: a design over the limit cannot be saved. Placing the design in a workspace organizes it; it does not give the workspace's teams access to it. Access comes from sharing, which you do in Phase 6.

## Phase 2: Add the Google Cloud components

Add one component for each service in the pipeline:

| Name | Service | Role in the pipeline |
|---|---|---|
| `events-ingest` | Pub/Sub topic | Entry point for incoming event streams |
| `stream-processor` | Dataflow job | Reads events and writes them downstream |
| `analytics-store` | BigQuery dataset | Long-term store for processed records |
| `raw-archive` | Cloud Storage bucket | Raw payloads kept for replay and compliance |
| `pipeline-cluster` | GKE cluster | The team's Kubernetes cluster for the pipeline's supporting services |

Find each one by typing the service name into the component palette search. The search runs against the Meshery registry after you pause typing for about a second, and returns matching models and components. Pick the Google Cloud component for each service, not a similarly named component from another model. If a model offers several versions, the palette lists the newest first.

Give each component the name from the table, and arrange the components left to right in the direction data flows.

**What just happened.** Every component in the palette comes from a model registered in the Meshery registry. The component's name, its available versions, and every field in its configuration form come from that model, so they can differ between registry versions and between Meshery deployments. That is why this tutorial names services rather than exact component kinds or fields: match what your registry shows. When a component lands on the canvas, its configurator opens with a form generated from the component's schema.

## Phase 3: Fill in required configuration

Open each component's configurator (double-click the component) and fill in the fields its schema marks as required. Required fields carry a red asterisk. Set the values your team actually uses, such as the project, region, or resource name the form asks for.

You do not have to complete every field now. Phase 5 lists anything required that is still missing.

**What just happened.** Each edit is written to the design after a short pause. Kanvas checks the edited component against its schema and marks problems beside the field. Those marks are warnings: Kanvas never stops you from saving an incomplete component, because a design is often a work in progress.

## Phase 4: Draw the data flow

Draw three connections: `events-ingest` to `stream-processor`, `stream-processor` to `analytics-store`, and `stream-processor` to `raw-archive`. How you draw them depends on what the registry defines for each pair.

**Try a relationship first.** Hover over the source component to reveal its edge handles, and open the handle menu. The menu lists only the edge relationships the registry defines that can start from that component. If one fits, pick it and drag to the target. Compatible targets in view get a green outline. Releasing on a compatible target creates the relationship; releasing anywhere else creates nothing.

**Fall back to an annotation line.** If the menu offers nothing that connects the two services, document the flow with the Pen tool (Ctrl/Cmd+E toggles it, Escape exits). Pen places points where you click and draws an annotation line between each consecutive pair, so you can trace the path from one component to the next.

Whichever kind you draw, select the line and use **Rename** in the edge toolbar to label it. Zara labels the first connection `subscription-pull` so reviewers see the consumption pattern at a glance, and the others `processed-records` and `raw-payloads`. The same toolbar sets line color, line style, and an animated marching-ants effect, which suits a data flow.

**What just happened.** The two kinds of line look alike but behave differently. A registry relationship is part of the model: Kanvas evaluates it after each change and can write values from one component's configuration into the other's. An annotation line is a drawing. It is saved with the design and seen by collaborators, but it changes no configuration and is never deployed. Whether the registry offers a relationship between two Google Cloud services depends on the models your registry holds, so check the handle menu rather than assuming either way. See [Relationships](/pr-preview/pr-1338/kanvas/concepts/relationships/).

## Phase 5: Organize by architectural layer

Give the design two kinds of structure: metadata on each component and a visual grouping on the canvas.

**Labels for metadata.** In each component's configurator, open the **Labels** tab and add the key `layer` with the value for that component: `ingestion` for `events-ingest`, `processing` for `stream-processor`, `storage` for `analytics-store` and `raw-archive`, and `compute` for `pipeline-cluster`. Labels are free-form key-value pairs, so add others your team relies on, such as an owner or cost center.

**Sections for visual grouping.** Press **S** to add a section, size it around a group of components, and name it for its layer. Create four: Ingestion, Processing, Storage, and Compute.

**What just happened.** Labels and sections answer different questions. A label is data on the component, carried in its configuration. A section is an annotation object on the canvas that groups components for the reader's eye; like every annotation, it is saved with the design and never deployed. Kanvas does not filter the design canvas by label.

You may also see a translucent shaded region appear around components that share labels. That region is a TagSet, and Kanvas draws it automatically only when a registry relationship defines a label match for those components. You cannot draw a TagSet yourself, and many models define none.

## Phase 6: Validate the design

Run **Validate** from the **Actions** menu. Kanvas opens a validation report for `data-pipeline-gcp`.

The report states how many components and annotations it found and how many errors. With no errors, it reads "No validation errors." Otherwise it lists each component that has errors, with a count, and each error names the field path and the problem, for example a required property that is missing.

Resolve each required field the report lists by opening that component's configurator and filling in the value, then run Validate again. Components with errors also show a warning badge on the canvas in Full render mode; selecting the badge opens the configurator at the offending field.

**What just happened.** Validate runs in your browser against each component's schema from the registry. It checks configuration only: it skips annotation objects such as sections and Pen lines, and it does not check relationships, namespaces, cross-references, or any cluster. Its findings are warnings and never block saving or sharing. A clean report means every component's configuration matches its schema. It does not mean the pipeline would deploy successfully; a Dry Run against a cluster tests that.

## Phase 7: Share the design for review

Open **Share** and add Five by searching for his name or email. Share is not available until the design has content, so it appears once you have added components.

Five now has the same access to the design as any editor: he can open, edit, comment on, and clone it, and he can share it with others. Kanvas has no read-only or comment-only share level. When you and Five have the design open at the same time, each of you appears as an avatar in the toolbar, and you see each other's cursors and changes live.

Five reviews the topology and presses **M** to place a comment next to `stream-processor`: "Do we need a dead-letter topic for events Dataflow cannot parse?" Zara replies in the same thread.

**What just happened.** A share is a grant to one named user, not to a team or a workspace, and it carries no permission level. Share only with people you trust to edit. Comments are Comment components stored in the design itself, so the review conversation is saved with the design, syncs live, and travels with it when someone clones or exports it. See [Collaboration](/pr-preview/pr-1338/kanvas/concepts/collaboration/).

## Verify

Open `data-pipeline-gcp` and confirm:

- **Components.** Five Google Cloud components, named `events-ingest`, `stream-processor`, `analytics-store`, `raw-archive`, and `pipeline-cluster`.
- **Data flow.** Three connections from Pub/Sub to Dataflow and from Dataflow to BigQuery and Cloud Storage, each either a registry relationship or a Pen annotation line, labeled `subscription-pull`, `processed-records`, and `raw-payloads`.
- **Sections.** Four sections, Ingestion, Processing, Storage, and Compute, each enclosing its components.
- **Labels.** Each component's Labels tab shows the `layer` key with the correct value.
- **Validation.** Validate reports "No validation errors.", or lists only fields you have deliberately left for later.
- **Sharing.** The Share dialog lists Five among the people with access, and his comment thread appears beside `stream-processor`.
- **Workspace.** The design appears in `orbital-production`.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Palette search for a Google Cloud service returns "Sorry, no matching records found". | The registry in your Meshery deployment does not hold that model, or the search term does not match its name. | Try another form of the service name. If nothing matches, the model is not registered in this deployment; ask your Meshery administrator to import it. |
| The edge handle menu offers nothing that connects two components. | The registry defines no edge relationship between that pair. | Draw an annotation line with the Pen tool and label it. |
| Releasing a drag on the target creates no edge. | The target is not compatible with the relationship you picked. | Release only on a component with a green outline, or use the Pen tool. |
| Validate lists missing required properties. | Required fields in a component's schema are empty. | Open the component's configurator, fill in each listed field, and validate again. |
| Validate opens a prompt instead of a report. | You are on hosted kanvas.new, which has no cluster actions. | Open the design in Meshery Playground or a self-hosted Meshery. |
| The Actions menu is disabled. | The design is empty. | Add at least one component. |
| Share does not appear. | The design is empty, or it is published to the catalog. | Add components first. A published design is not shared from this dialog. |
| Five cannot open the design. | He was not granted access, or the grant failed. Workspace membership alone does not grant access. | Share the design with Five by name and confirm he appears in the access list. |
| Changes stop saving and Kanvas reports an error. | The design exceeds your plan's components-per-design limit. Annotation objects such as sections and comments are components in the design too. | Remove components or annotations you do not need, or move to a plan with a higher limit. |
| A shaded TagSet region appears or disappears as you edit labels. | A registry relationship matches those labels, and evaluation redraws the group after each change. | This is expected. Change the labels if you do not want the grouping, or hide TagSets in the Layers panel. |

## Where to go next

- [Deploy AWS EC2 instances](/pr-preview/pr-1338/kanvas/tutorials/deploy-aws-ec2-instances-with-meshery/) and [Deploy Azure resources](/pr-preview/pr-1338/kanvas/tutorials/deploy-azure-resources-with-meshery/) show the controller pattern you need before a cloud design like this one can be deployed.
- [Configuring components](/pr-preview/pr-1338/kanvas/designer/configuring-components/) covers the configurator, its tabs, and the Labels tab in depth.
- [Whiteboarding](/pr-preview/pr-1338/kanvas/designer/whiteboarding/) covers the Pen tool, sections, text boxes, and other annotation objects.
- [Relationships](/pr-preview/pr-1338/kanvas/concepts/relationships/) explains how the registry defines relationships and how Kanvas evaluates them.
- [Designs](/pr-preview/pr-1338/kanvas/concepts/designs/) explains how designs, workspaces, and autosave fit together.


