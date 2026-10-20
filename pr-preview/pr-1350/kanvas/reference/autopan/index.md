# Auto-pan on Drag


> Reference for the Auto-pan on Drag setting - what triggers it, its default, where it is stored, the design size at which Kanvas turns it off for each render mode, and how it recovers.


**Auto-pan on Drag** scrolls the canvas for you while you drag a component toward the edge of the view. Without it, moving a component to a part of the design that is off screen takes a drag, a manual pan, and another drag. With it, one continuous drag carries the component there.

Auto-pan is **off by default**. You turn it on as a personal setting, and Kanvas still switches it off while a design is too large for the current [render mode](/pr-preview/pr-1350/kanvas/concepts/render-modes/).

## Behavior

| Property | Value |
| --- | --- |
| Default | Off |
| Scope | Per user. The setting is stored in your Kanvas preferences on the server and follows you across browsers and devices. It is not stored in the design and is not shared with collaborators. |
| Trigger | Dragging a component to within 50 pixels of the edge of the visible canvas. |
| Pan speed | Fixed. It is not configurable. |
| Acts on | Component drags. |
| Applies in | Designer. The setting is listed with the Designer canvas settings in the Options dialog. |
| Takes effect | Immediately. Changing the setting needs no reload and no reopened design. |







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Check where the component lands</h4>
  
      Auto-pan ships off because, while it is on, panning during a drag can move the dragged component lower than you intended. Review the final position after a long drag, and turn the setting off if components drift. Undo (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd>) restores the previous position.
  
</div>



## When Kanvas turns it off

Every pan moves the whole canvas, and every layer that depends on the viewport redraws with it: the grid, badges, overlays and the drawing surface. The work grows with the number of components and relationships, so auto-pan on a large design makes dragging lag instead of helping it.

Kanvas therefore allows auto-pan only while **both** the number of components and the number of relationships drawn on the canvas are at or below a limit set by the render mode:

| Render mode | Auto-pan limit (components and relationships) |
| --- | ---: |
| Full | 100 |
| Medium | 500 |
| Wireframe | 1,000 |
| View-only | 1,000 |

The limit rises as the mode draws less, because fewer layers redraw on each pan.

Auto-pan runs only when your setting is on **and** the design is within the limit for the current mode. Kanvas re-checks this continuously:

- **The design grows past the limit.** Pasting a large group, importing a fragment, or receiving a collaborator's bulk change turns auto-pan off. Kanvas checks once per animation frame, so a burst of changes causes one decision, not many.
- **The design shrinks under the limit.** Deleting components turns auto-pan back on.
- **You change the render mode.** Moving from Full to Wireframe raises the limit from 100 to 1,000, so a design that blocked auto-pan in Full can allow it in Wireframe.
- **You change the setting.** The change applies at once.

Nothing on the canvas shows that auto-pan has been turned off by size. If it is on in your settings but does not scroll at the edge, count the components and relationships against the table for your current mode.

## Regain auto-pan on a large design

1. Switch to a lower-fidelity [render mode](/pr-preview/pr-1350/kanvas/reference/performance/). Wireframe and View-only allow 1,000.
2. Reduce what draws. Hiding layers in the [Layers panel](/pr-preview/pr-1350/kanvas/reference/layout-and-layers/) takes their components and relationships off the canvas, which lowers the counts Kanvas compares against the limit. Deleting components does the same.
3. Split the design. A design that regularly passes the limit of the mode you prefer is a candidate for several smaller designs.

## Known discrepancies

- The setting's description in the Options dialog says auto-pan is disabled "outside Full render mode". Kanvas does not behave that way: it allows auto-pan in Medium, Wireframe and View-only within the limits above.

