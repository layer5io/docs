# Concepts

> The core mental model behind Kanvas: designs, components, relationships, the two modes, and how Kanvas works with Meshery and Layer5 Cloud.



Kanvas rests on one idea: a design is a declarative description of infrastructure. It records which components exist, how they relate to each other, how each one is configured, and any annotations that explain the intent. A design describes the state you want; it is not a script of steps to run.

Each part of Kanvas plays one role around that design:

- **Designer authors the design.** You place components, connect them, and configure them on a shared canvas. Every save creates a new version, and collaborators can edit the same design at the same time.
- **Meshery validates and deploys the design.** It checks the design against component schemas, dry-runs it against target clusters, and deploys or undeploys it on the Kubernetes contexts you choose.
- **Operator shows the running result.** It displays live cluster state and links it back to the design: every resource Kanvas deploys carries the identity of its source design, so Operator can show exactly what one design produced.

Layer5 Cloud, as the remote provider, stores designs and their versions and governs who can see them. Every new design starts public; [Designs and Components](/kanvas/concepts/designs/) explains visibility in full.

## Concept pages

- **[Designs and Components](/kanvas/concepts/designs/)** - what a design contains, how it is saved and versioned, what components are, and how a design maps to deployed resources.
- **[How Kanvas Works with Meshery and Layer5 Cloud](/kanvas/concepts/architecture/)** - the extension model, where designs live, what talks to your clusters, and what differs between kanvas.new and self-hosted Meshery.
- **[Relationships](/kanvas/concepts/relationships/)** - how Kanvas maps the ways connected components interact.
- **[Designer](/kanvas/designer/)** - the authoring mode: its purpose, scope, and tools.
- **[Operator](/kanvas/operator/)** - the operating mode: live cluster state and per-design views.

