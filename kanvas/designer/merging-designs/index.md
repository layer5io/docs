# Merging and Loading Designs


> Drag one design onto another to combine them, or open it in place of what is on the canvas.



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

**Merge into current** combines the two designs. Every component and relationship from the dropped design is added to the design you already have open. The block's top-left corner moves to the drop position when you dropped a file. Otherwise it lands 50 pixels right and 50 pixels down from its original coordinates, and it can overlap existing components. Every component and relationship in the incoming design receives a new identifier. Kanvas does not match or de-duplicate against existing components, so merging the same design twice doubles its components. Names, kinds, configuration, styles, and the internal layout of the incoming block are preserved. The incoming design's name, id, version, visibility, catalog data, layer preferences, and workspace are not carried over. Relationship evaluation runs as for any edit, and autosave persists the result after three seconds. If the merged design exceeds your plan's component limit, the save fails and the merged components remain unsaved on the canvas. Merging needs no permission key, but the incoming design must be one you can read: your own, public, published, or shared with you. Cancel on a merge prompt does not delete a design the import already saved. A failed merge shows `Failed to merge design: <reason>`.

Merging does not consume the design you dragged. It remains in your design list, unchanged and independently owned - what you have merged is a copy of its contents into the design in front of you.

### Displace the current nodes on the canvas

**Open as new** does the opposite: the dropped design becomes the design you are working on, and whatever was on the canvas is replaced by it. Use it when the drag was really a "let me look at that one instead" rather than a merge.

Because this discards what is on the canvas, Kanvas will not do it silently if you have unsaved changes - you are asked to confirm first. Saved designs are safe either way: the design being displaced is not deleted, only closed, and you can open it again from your design list.

## Importing rather than dragging

The same merge decision appears when you import a design from a file, a Helm chart, a Kubernetes manifest or a Docker Compose file while a design is already open. If the canvas is empty the import is loaded directly; if it is not, you are asked whether to merge or to open the import as a new design. See [Importing Designs](/kanvas/getting-started/import-designs/).

***

### See Also

* **[Saving Designs](/kanvas/designer/saving-designs/):** How Kanvas persists the result.
* **[Starting from scratch](/kanvas/getting-started/starting-scratch/):** The end-to-end walkthrough of building a design.

