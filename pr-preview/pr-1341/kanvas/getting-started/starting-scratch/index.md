# Create Your First Design


> Build a small web application design from an empty canvas, connect its components through relationships, and save it, while learning how Kanvas models and stores designs.


In this tutorial you build a small web application design in Kanvas Designer: a Deployment that runs the application, a ConfigMap that holds its settings, and a Service that exposes it. You start from an empty canvas, connect the components, and save the result. The saved design is the starting point for [Deploy and Observe Your First Design](/pr-preview/pr-1341/kanvas/getting-started/design-to-deployment/).

Along the way you learn what a design is made of, how relationships express the way components depend on each other, and when and how Kanvas saves your work.

## Before you begin

- Open Kanvas in Designer mode, either at kanvas.new or in a Meshery you run. Either works for this tutorial. If you plan to deploy the design in the next tutorial, start in a Meshery you run so the design is already where you need it. See [Where do you want to work?](/pr-preview/pr-1341/kanvas/getting-started/#where-do-you-want-to-work).
- Work inside a specific organization. Kanvas does not create designs while the "all organizations" scope is selected.

## Step 1: Start an empty design

Start a new design. Kanvas opens an empty canvas and names the design "Untitled Design".

That default name matters. Kanvas does not save a new design that has an empty canvas and no name of its own. A new design becomes saveable as soon as it has at least one component, or a name that is not empty and is not "Untitled Design".

Give the design a name that describes its purpose, such as `web-app`. A meaningful name makes the design easy to find later, and Kanvas also uses it to label the design's deploy steps and its Operator view.

**What you should see:** an empty canvas with your design name in place of "Untitled Design".

## Step 2: Add the application components

A **component** is one piece of infrastructure in your design: a single, typed resource such as a Kubernetes Deployment, Service, or ConfigMap, together with its configuration. Each component comes from a model, and many components exist in more than one version. Choose the version that matches the cluster you intend to deploy to.

Add three components from the Kubernetes model to the canvas:

- a **Deployment**, which will run the web application,
- a **ConfigMap**, which will hold the application's settings,
- a **Service**, which will give the application a stable network endpoint.

Kanvas renders each component on the canvas as soon as you place it. Arrange them so you can see all three.

Not everything on a canvas is infrastructure. Shapes, text, and drawings that you add for explanation are **annotation-only**: they make the design easier to read but are not resources. A connector you draw for illustration is an annotation edge for the same reason. Use annotations freely to document a design; they do not change what the design describes.

**What you should see:** three components on the canvas, each showing its kind.

## Step 3: Configure each component

Every component carries configuration based on its schema. Open a component's configuration panel to set its fields. The canvas updates as you change them.

Configure the three components so they refer to each other:

1. On the **ConfigMap**, set a name such as `web-app-config` and add one key, for example `GREETING`.
2. On the **Deployment**, set a name, a container image (for example `nginx`), and a label such as `app: web-app` on its pod template. Reference the ConfigMap by its name so the container reads its settings from it.
3. On the **Service**, add the same label (`app: web-app`) and set a port.

These references are the same ones you would write in Kubernetes manifests. Kanvas evaluates them to work out how the components relate.

**What you should see:** each component shows the name you gave it.

## Step 4: Connect the components with relationships

A **relationship** describes how two components interact or depend on each other. Kanvas draws relationships on the canvas as edges between components, or as nesting when one component contains another. Relationships fall into families:

- **Edge relationships** describe interaction between components. A Service in front of a Deployment is a network relationship. A Deployment that reads a ConfigMap is a reference relationship: one component refers to another by name.
- **Hierarchical relationships** describe containment and inheritance, such as a Namespace that must exist before the Pods inside it.

Relationships come from two sources: configuration you set, and connections you make on the canvas. Components that carry the same label form a label-match relationship automatically, so the Service and the Deployment in this design are now related. You can also drag a connection line from one component to a compatible target to create an edge relationship yourself. [Relationships](/pr-preview/pr-1341/kanvas/concepts/relationships/) describes every kind and what each one means.

Check that your design shows a relationship between the Service and the Deployment, and one between the Deployment and the ConfigMap. If one is missing, compare the names and labels you set in Step 3, or drag a connection between the two components.

In large designs, Kanvas can skip drawing some relationships of one kind once that kind passes its rendering limit. When that happens it shows a warning of the form "Skipped rendering of N &lt;kind&gt; relationships due to limit of M". The relationships still belong to the design; only their drawing is skipped.

**What you should see:** the Deployment connected to both the Service and the ConfigMap.

## Step 5: Save the design

Kanvas saves for you. Once the design is saveable, Kanvas saves pending changes 3 seconds after you stop editing. If a save fails, Kanvas retries with a doubling delay (3 seconds, then 6, then 12, and so on) for up to 100 attempts.

Three things happen when a design is saved:

- **A new version is created.** Every save increments the design's version, so a design accumulates a history of versions as you work.
- **A new design starts as public.** The first save of a new design sets its visibility to public. Later saves keep whatever visibility the design has at that point. Designs can also be private or published; [Saving designs](/pr-preview/pr-1341/kanvas/guides/designs/saving-designs/) explains each.
- **Your plan's component limit is checked.** Each plan sets a maximum number of components per design, and Kanvas checks it on every save and import. A design over the limit is not saved; Kanvas reports "Design exceeds maximum limit of N components supported by your current plan". Reduce the number of components or upgrade the plan. See [Layer5 pricing](https://layer5.io/pricing) for the limit on each plan.

This three-component design is well within every plan's limit.

**What you should see:** your design saved under its new name, with no unsaved changes pending.

## Optional: Merge another design into this one

You can bring an existing design into the canvas you are working on. Kanvas merges its components and relationships into the current design and leaves the original design unchanged. Use this to assemble a larger system from designs you already have. See [Merging designs](/pr-preview/pr-1341/kanvas/guides/designs/import-designs/).

## What you built

You now have a saved design named `web-app` that describes a web application:

- three infrastructure components, each configured from its schema,
- relationships that record how the Service reaches the Deployment and how the Deployment reads the ConfigMap,
- a version history that grows with every save.

You also learned the core rules of saving: a new design needs a component or a real name before it can be saved, autosave runs 3 seconds after you stop editing, a new design starts as public, and your plan limits the number of components in a design.

## Next

Take this design to a cluster in [Deploy and Observe Your First Design](/pr-preview/pr-1341/kanvas/getting-started/design-to-deployment/). You will validate it, dry-run it, deploy it, and watch the resulting resources in Operator mode.

