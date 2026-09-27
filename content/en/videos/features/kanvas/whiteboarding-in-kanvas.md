---
title: "Whiteboarding in Kanvas"
description: >
  One late-night alert, worked from page to postmortem on a single live design: sketch the blast radius, style the flow, put the evidence in context, and fix the configuration where the team can see it.
videoId: "o58hO4RDCR4"
videoType: youtube
categories: [Designer]
formats: [video]
tags: [whiteboarding, annotations, shapes, collaboration]
duration: "3:41"
---

{{< youtube id=o58hO4RDCR4 class="yt-embed-container" >}}

At 2:47 AM, checkout latency is climbing and the architecture diagram cannot be trusted. Five, Mia, and Raj open the live checkout design in Kanvas and work the incident together on one canvas, using the whiteboarding tools that are on by default in every design. By morning, that same canvas is the incident record, the postmortem starting point, and the onboarding guide. (The incident and its telemetry are a demo scenario.)

## Chapters

- [0:00](https://www.youtube.com/watch?v=o58hO4RDCR4&t=0s) Three sources of truth
- [0:37](https://www.youtube.com/watch?v=o58hO4RDCR4&t=37s) Kanvas becomes the war room
- [1:12](https://www.youtube.com/watch?v=o58hO4RDCR4&t=72s) Sketch the blast radius
- [1:48](https://www.youtube.com/watch?v=o58hO4RDCR4&t=108s) Style without changing configuration
- [2:17](https://www.youtube.com/watch?v=o58hO4RDCR4&t=137s) Put the evidence in context
- [2:47](https://www.youtube.com/watch?v=o58hO4RDCR4&t=167s) Find, fix, and remember
- [3:22](https://www.youtube.com/watch?v=o58hO4RDCR4&t=202s) The whiteboard that never goes stale

## What You Will See

- **Three tool modes.** Default mode selects, moves, and configures; Pencil mode draws freeform notes without connecting components; Connector mode (<kbd>Command</kbd>+<kbd>E</kbd> or <kbd>Ctrl</kbd>+<kbd>E</kbd>) draws annotation edges that explain relationships and flow. See [Understanding Tool Modes]({{< ref "kanvas/designer/understanding-tool-modes/index.md" >}}).
- **Shapes.** A warning shape dropped from the shapes palette, then switched to a different outline without rebuilding it. See [Working with Canvas Objects]({{< ref "kanvas/designer/canvas-objects/index.md" >}}).
- **Annotation edges.** The request flow traced with edges, then styled with a dashed line, arrowheads, and the marching ants animation. See [Whiteboarding]({{< ref "kanvas/designer/whiteboarding/index.md" >}}).
- **Styling is not configuration.** Fill, borders, text, edges, and animation change how the design looks, never how it is configured.
- **Evidence on the canvas.** A Grafana panel image and the runbook text placed beside the affected path, so the metric, the guidance, and the architecture share one frame.
- **The fix, made in the design.** A connection-pool setting raised in the component's configuration, then validated and deployed. See [Configuring Components]({{< ref "kanvas/designer/configuring-components/index.md" >}}), [Validating Designs]({{< ref "kanvas/tasks/designs/validating-designs/index.md" >}}), and [Deploying Designs]({{< ref "kanvas/tasks/designs/deploying-designs/index.md" >}}).
- **Annotations as a layer.** Hide the annotations and the infrastructure stays; show them again and the context is intact. See [Layout and Layers]({{< ref "kanvas/designer/layout-and-layers/index.md" >}}).
- **Real-time collaboration.** Every cursor and every edit stays visible to the whole team. See [Collaborative Editing]({{< ref "kanvas/tutorials/collaborative-editing.md" >}}).

## Transcript

**Narrator:** Whiteboarding in Kanvas, through one late-night alert on the billing system's checkout service.

**Narrator:** At 2:47 AM, Five gets the page every SRE dreads: checkout latency is climbing, but the architecture diagram cannot be trusted. The runbook is in a wiki, the evidence is buried in Slack, and the deployment lives across walls of YAML. The team has plenty of information - just no shared context.

**Five:** Three sources of truth, and none of them agree.

**Narrator:** Five opens the live design in Kanvas. Whiteboard is on by default for everyone, so the tools are already waiting in the bottom dock. Mia and Raj join; now everyone can investigate on the same canvas.

**Narrator:** Default mode is for selecting, moving, and configuring. Pencil mode draws freeform notes without connecting components. And Connector mode - Command-E or Control-E - creates annotation edges that explain relationships and flow.

**Five:** Default to arrange. Pencil to think. Connector to explain.

**Narrator:** Five circles the failing path with the Pencil. Mia drops a warning shape from the palette and switches its outline without rebuilding it. Raj traces the request flow with annotation edges, then adds a dashed line, arrowheads, and marching ants to make direction and movement unmistakable.

**Raj:** The flow slows after checkout hands off to fraud-check.

**Narrator:** Five inspects the fraud-check Deployment and marks it red. Styles can change fill, borders, text, edges, and animation - but styling never changes configuration. All the while, every cursor and edit stays visible to the whole team.

**Mia:** That matches the alert window.

**Narrator:** Mia drops the Grafana image beside the affected path, then adds the runbook text directly to the canvas. The metric, the operational guidance, and the architecture finally share one frame.

**Narrator:** The animated trail points to an exhausted connection pool on the fraud-check sidecar. Five updates the setting in the design; the team validates and applies the fix through its normal deployment controls; latency recovers.

**Narrator:** By morning, the same canvas is the incident record, the postmortem starting point, and the onboarding guide. The reasoning stays attached to the infrastructure instead of disappearing into yesterday's screen share.

**Narrator:** Kanvas gives engineers one visual place to investigate, decide, and remember - together and in real time. This is Infrastructure as Design: the whiteboard that never goes stale.
