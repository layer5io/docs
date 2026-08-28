---
title: Merging and Loading Designs
weight: 14
description: >
  Drag one design onto another to combine them, or open it in place of what is on the canvas.
categories: [Designer]
tags: [designs]
---

Designs are rarely built from nothing. A platform design usually starts from an existing one - a team's base cluster layout, a reference architecture from the catalog, a design a colleague already published - which you then extend. Kanvas supports that by letting you drag a design straight onto the canvas and decide, at that moment, whether it should join what is already there or replace it.

## Dragging a design onto the canvas

Drag a design from the design list, the catalog or your workspace and drop it onto the canvas.

What happens next depends on what is already on the canvas:

- **The canvas is empty.** The dropped design is simply loaded. There is nothing to lose, so Kanvas does not ask.
- **The canvas already has components.** Kanvas opens the **Merge Design** dialog, telling you which design you are about to bring in, how many components it contains, and which design it would be merged into.

## Choosing what happens

The Merge Design dialog offers three choices:

| Choice | Result |
| --- | --- |
| **Merge into current** | The dropped design's components are added to the canvas alongside the existing ones, positioned where you dropped them. |
| **Open as new** | The dropped design is opened on its own, displacing what is currently on the canvas. |
| **Cancel** | Nothing changes. |

### Merge with existing nodes on the canvas

**Merge into current** combines the two designs. Every component and relationship from the dropped design is added to the design you already have open, landing at the point on the canvas where you dropped it so that the incoming components arrive as a group rather than scattered through the existing ones. The merged result is saved to the design you have open as soon as the merge completes.

Merging does not consume the design you dragged. It remains in your design list, unchanged and independently owned - what you have merged is a copy of its contents into the design in front of you.

### Displace the current nodes on the canvas

**Open as new** does the opposite: the dropped design becomes the design you are working on, and whatever was on the canvas is replaced by it. Use it when the drag was really a "let me look at that one instead" rather than a merge.

Because this discards what is on the canvas, Kanvas will not do it silently if you have unsaved changes - you are asked to confirm first. Saved designs are safe either way: the design being displaced is not deleted, only closed, and you can open it again from your design list.

## Importing rather than dragging

The same merge decision appears when you import a design from a file, a Helm chart, a Kubernetes manifest or a Docker Compose file while a design is already open. If the canvas is empty the import is loaded directly; if it is not, you are asked whether to merge or to open the import as a new design. See [Importing Designs]({{< ref "kanvas/getting-started/import-designs/index.md" >}}).

***

### See Also

* **[Saving Designs]({{< ref "kanvas/designer/saving-designs/index.md" >}}):** How Kanvas persists the result.
* **[Starting from scratch]({{< ref "kanvas/getting-started/starting-scratch.md" >}}):** The end-to-end walkthrough of building a design.
