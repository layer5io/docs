---
title: Auto-pan on Drag
description: >
    Kanvas automatically pans the viewport while you drag a component past the canvas edge. Learn when it helps, how to toggle it, and the performance gates that decide when it stays active.
weight: 3
categories: [Designer]
tags: [performance, interaction]
---

**Auto-pan on Drag** (autopan, for short) is the behaviour where Kanvas scrolls the canvas for you when you drag a component close to — or past — the visible edge. Instead of having to stop, let go, scroll the canvas, grab the component again, and continue, you keep dragging and the canvas glides along with you.

Autopan is the difference between **"move this component to another part of the design"** being one continuous gesture vs. four separate ones. It is on by default in the Designer, and you can turn it off any time in the **Options** panel.

## Why Auto-pan Matters

Kanvas designs often grow past the size of your viewport. A microservices topology, a multi-cluster Kubernetes landscape, or a Helm-chart expansion can easily produce a design that is ten or twenty screens wide at typical zoom. Without autopan, moving a component from one side of that canvas to the other means:

1. Grab the component.
2. Drag it to the edge of the visible canvas.
3. Release the mouse button.
4. Pan the canvas using two-finger scroll, the middle mouse button, or the on-screen navigation controls.
5. Re-grab the component — which is now well inside the viewport again.
6. Drag it to the next edge.
7. Repeat until you reach the destination.

With autopan enabled, the same action is a single uninterrupted drag. Kanvas detects that the component is leaving the viewport and scrolls the camera in the direction you are dragging, so you never run out of canvas. The further past the edge you push, the faster the canvas pans.

Autopan is most valuable when:

- **Re-organising large designs.** Moving a node from one cluster to another, relocating a group, or reshaping the layout of a design that doesn't fit on screen.
- **Drag-based edge creation.** Pulling a relationship handle from a source component toward a target that is off-screen.
- **Compound drag-and-drop.** Dropping a child component into a parent group that sits past the viewport edge — the autopan keeps the drop target in view as you approach it.

It is least valuable (and most expensive) when:

- The design is **fully visible without scrolling**. There is nothing past the viewport to pan to.
- The design is **very large and very detailed**. Every pan triggers a rerender of the canvas, every badge, and every overlay. On a 500-node design in Full render mode, that cost shows up as input lag.

Kanvas is aware of both cases. The first is harmless — autopan simply never activates because the drag never reaches the edge. The second is managed by **per-render-mode performance gates**, covered below.

## Toggling Auto-pan

Open the **Options** panel (the gear icon in the Designer toolbar) and look under **Canvas Settings** for **Auto-pan on Drag**.

- **On (default)** — autopan activates when you drag past the viewport edge, subject to the per-render-mode size gate.
- **Off** — autopan never activates. You pan manually.

The toggle takes effect immediately. You do not need to refresh the page or re-open the design. If autopan was already running when you flipped the switch, it detaches its drag listeners on the spot; if it was off and you turn it on, it re-attaches them. The switch is per-user (stored as a user preference in your Kanvas profile), so the setting follows you across devices.

{{< alert type="info" title="Finding the setting" >}}
The toggle lives in the **Options** modal under **Canvas Settings**. If you don't see it, make sure you're in Designer mode — autopan is a Designer-only feature because it affects component dragging, which is disabled in read-only Operator views.
{{< /alert >}}

## Advanced Performance Considerations

Autopan is cheap on a small graph and expensive on a large one. The reason is not the autopan extension itself — that work is constant per drag event — but the chain of listeners that react when the canvas pans.

### What autopan actually does under the hood

When you drag a component near the edge of the viewport, the `cytoscape-autopan-on-drag` extension listens for each pointer-move event. If the component has crossed the viewport boundary, it calls `cy.panBy(…)` on the canvas engine. That single call produces a `pan viewport` event inside Cytoscape, which fires **every** listener that is subscribed to that event.

In a production Kanvas Designer, those listeners include:

- **Grid redraw** — the gridGuide extension re-renders the dotted grid at the new viewport origin.
- **Badge and overlay re-layout** — validation warning badges, deployment error badges, inventory badges, comment markers and connection handles are all positioned in canvas space and need to be re-positioned when the camera moves.
- **React state updates from the overlay hook** — overlays that are rendered in the DOM (not on the canvas) need React to push their new screen positions.
- **Renderer dirty-paints** — Cytoscape's internal renderer marks the canvas dirty and schedules a repaint.

Each of those listeners is individually cheap, but they all scale with the number of nodes and edges on the canvas. A single pan on a 1,000-node design does roughly ten times as much work as the same pan on a 100-node design.

Pointer-move events fire fast — up to around 120 times a second on high-refresh-rate trackpads. The per-event budget for a smooth 60 fps interaction is about 16 milliseconds, and pointer-move dispatch eats into that budget. When the work done by downstream listeners gets too expensive, autopan stops being a feature and starts being a source of input lag.

### Why the threshold depends on the render mode

Not every Kanvas render mode attaches the same listeners to the pan event. In **Full** mode, every overlay, every badge, and the grid are all live. In **Medium**, overlays and badges are suppressed — the grid and renderer are still active. In **Wireframe** and **View-Only**, even the grid is dropped, leaving only the renderer's own paint.

Since the per-mode listener fan-out differs by a factor of roughly four between Full and Wireframe, the graph size at which autopan starts to lag also differs by about that factor. Kanvas encodes this in a per-mode threshold table, applied automatically: autopan disables itself when the graph exceeds the threshold for the current render mode.

| Render mode            | Safe node/edge count with autopan | Rationale                                                                |
| ---------------------- | --------------------------------: | ------------------------------------------------------------------------ |
| Full                   |                               100 | Grid + badges + overlays + renderer all react to every pan               |
| Medium                 |                               500 | Badges and overlays suppressed — ~2× fan-out reduction                   |
| Wireframe              |                             1,000 | Grid and overlays suppressed — only the renderer paints                  |
| View-Only              |                             1,000 | Same fan-out profile as Wireframe, non-interactive                       |

These numbers are empirical — derived from the `autopanPerf_spec.ts` performance-gate test, which measures per-event cost across listener fan-outs and asserts that each threshold stays within the per-event budget. If you modify a downstream listener to do more work on pan (for example, you add a new badge type that redraws on every viewport change), the test will flag which thresholds need to move.

### Automatic disable and re-enable

Autopan is not a static decision taken when you load a design. Kanvas re-evaluates the gate continuously:

- **When the graph grows past the threshold** — for example, paste in a large subtree, import a design fragment, or accept a collaborator's bulk update — Kanvas detects the new element count and disables autopan on the next animation frame. Bursty operations are coalesced into a single re-evaluation rather than thrashing through enable/disable on every element.
- **When the graph shrinks back under the threshold** — deleting elements or cutting a subgroup drops the count. Kanvas notices and re-enables autopan if your preference allows it.
- **When you switch render mode** — switching from Full to Wireframe on the same design can shift the gate from "disabled" to "enabled" because the threshold is higher in Wireframe. Kanvas re-evaluates and applies the right state instantly.
- **When you flip the preference** — toggling **Auto-pan on Drag** in the Options panel takes effect immediately without a remount.

This is driven by the shared `useReactiveFeatureGate` hook in Kanvas's source, which any future feature gated by (user preference × render mode × graph size) can reuse.

{{< alert type="note" title="When autopan is disabled automatically" >}}
If you are working on a large design and autopan seems to not kick in at the edge, check the [Render Modes](/kanvas/advanced/render-modes/) page. Your graph has probably exceeded the threshold for the current render mode and Kanvas has disabled autopan for performance. You can either switch to a lower-fidelity render mode — which raises the threshold — or pan manually for the remaining operations.
{{< /alert >}}

### Tuning autopan for your design

If autopan is disabled on a design where you would like it to be active, you have three levers:

1. **Switch to a lower-fidelity render mode.** Wireframe and View-Only raise the threshold to 1,000 nodes. See the [Render Modes](/kanvas/advanced/render-modes/) page for what each mode costs and what it hides.
2. **Reduce the live listener count.** The [Layers Panel](/kanvas/advanced/performance/) lets you disable layers of visual information (badges, tags, feasibility indicators) that contribute to the pan fan-out. Turning off a layer effectively moves the threshold upward because there are fewer listeners to amplify each pan.
3. **Break the design into smaller designs.** If you are consistently bumping the threshold in your preferred render mode, the design might be past the scale Kanvas targets for interactive editing. Splitting it into referenced sub-designs keeps each one within the sweet spot.

### Related pages

- [Render Modes](/kanvas/advanced/render-modes/) — what each mode renders, what it hides, and how Adaptive Render Mode flips between them automatically.
- [Performance Limits and Tuning](/kanvas/advanced/performance/) — overall Kanvas performance envelope and the Layers Panel.
- [Design Render Quality](/kanvas/advanced/url-parameters/) — overriding the render mode via URL parameters (useful for snapshots and embeds).
