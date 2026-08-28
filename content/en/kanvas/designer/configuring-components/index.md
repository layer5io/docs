---
title: Configuring Components
weight: 16
description: >
  Edit a component's configuration on the canvas, using the schema-driven form and its inline help.
categories: [Designer]
tags: [designs]
---

A component is the fundamental building block of a design - it represents one piece of the infrastructure under management, and its configuration is what will actually be applied when the design is deployed. The component configurator is where that configuration is edited.

Kanvas does not ask you to write YAML for this. The form is generated from the component's own schema, which comes from the model that defines it, so the fields you see are exactly the fields that component supports, in the version of the model you have selected.

## Opening the configurator

With a component on the canvas:

- **Double-click** the component, or
- **Right-click** it and choose **Configure**.

The configurator opens in a panel beside the canvas. The component stays selected while it is open, so you can see what you are editing.

<!-- SCREENSHOT NEEDED: Kanvas Designer, component configurator open for a Kubernetes Deployment, showing the header (icon, name, search, help, expand) and the Config tab with several fields -->

## The header

| Control | What it does |
| --- | --- |
| Component icon | Hovering shows the model version the component is using. |
| Version menu | Appears when the model has more than one version available. Switching versions re-generates the form against that version's schema. |
| Search | Filters the form down to matching fields. On a large schema this is far quicker than scrolling; if nothing matches, the form says so rather than appearing empty. |
| Help | Shows the component's own description, as published by its model. |
| Expand / collapse | Maximises the configurator to fill the workspace, and restores it. |
| Delete | Removes the component from the design. |

## Tabs

The configurator is organised into tabs. Which are present depends on the component and on your permissions:

- **Config** - the component's specification. This is where the substantive configuration is done.
- **Labels** - Kubernetes labels and annotations for the component, edited separately from the rest of the spec so that metadata does not crowd out configuration.
- **Json Schema** - the raw schema the form was generated from, in a JSON viewer. Useful when you want to see exactly what a field expects, and it links out to the component's entry in the Meshery registry.
- **Relationships** - the relationships this component participates in, and the components at the other end of them.

## Field help and validation

Each field carries its documentation with it. A **?** icon at the right of a field opens a tooltip containing that field's description, taken straight from the component's schema - so the guidance you get is the upstream project's own, not a Kanvas paraphrase. Nested objects and arrays carry the same help on their group headings.

When a value does not satisfy the schema, a red error icon appears alongside, and its tooltip gives the validation message. The component itself also picks up a validation warning badge on the canvas, so a problem you scroll past in the form is still visible when you close the panel. See [Interpreting Component Badges]({{< ref "kanvas/designer/interpreting-component-badges/index.md" >}}).

<!-- SCREENSHOT NEEDED: Kanvas Designer, component configurator with a field's "?" help tooltip open showing the schema description, and ideally a second field showing a validation error tooltip -->

## Changes take effect as you type

There is no Apply button. Edits are written into the design shortly after you stop typing, the canvas updates to match, and the design is saved to your account - see [Saving Designs]({{< ref "kanvas/designer/saving-designs/index.md" >}}). Undo reverses a configuration change like any other edit.

***

### See Also

* **[Understanding Design Components]({{< ref "kanvas/designer/understanding-design-component/index.md" >}}):** What the components on the palette represent.
* **[Understanding Tool Modes]({{< ref "kanvas/designer/understanding-tool-modes/index.md" >}}):** Every mouse interaction available on the canvas, including the ones that open this panel.
