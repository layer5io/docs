---
title: Render Modes
description: >
    Kanvas renders a design at four distinct levels of detail. Learn what each render mode shows, what it hides, the feature size gates tied to each mode, and how Adaptive Render Mode picks the right one automatically based on live performance signals.
weight: 4
categories: [Designer, Operator]
tags: [performance, rendering]
---

Kanvas can draw the same design at **four different levels of visual fidelity**. The level is called the **render mode**, and it controls how much of Kanvas's visual machinery — badges, overlays, textures, grid, relationship animations — actually runs on each frame. Lower-fidelity modes paint less, so they stay fast on larger designs. Higher-fidelity modes show everything, which is what you want on a design you're polishing or presenting.

The render mode is a **performance tool**, not a document property. Switching modes does not change your design — components, relationships, layers, and metadata are identical. It only changes what Kanvas chooses to render on screen.

## The four render modes

You can switch modes through the **render-mode switcher** in the Options panel (the gear icon on the toolbar, at the bottom of the dialog). Each mode has a distinct purpose.

### Full

**Use when:** finalizing a design, reviewing it with colleagues, publishing, exporting a snapshot, working on the visual polish.

**What renders:** everything Kanvas has — SVG backgrounds and gradient fills, component icons with full texture, feasibility indicators, all badges (compound node, label, external link, expand/collapse, managed-by-Meshery, terminal session, and error badges), TagSets (BubbleSets), mount animations, relationship animations with bezier curves and colored arrows, grid lines, compound-group outlines, and hover overlays. Labels render in their full fidelity with font rendering and shadows where applicable.

**Cost:** highest. Every pan, zoom, or layout update touches every overlay and badge in the visible area. Designed to look best, not go fastest.

**Default:** this is the default mode when you open a design unless adaptive mode has downshifted you — see below.

### Medium

**Use when:** day-to-day editing, adding or arranging components, when you want enough detail to orient yourself but not every live overlay running.

**What renders:** component SVG backgrounds, node shapes, edge styling, expand/collapse badges (essential for navigating compound nodes), error badges, and core interactions. **Suppressed:** decorative badges (compound node, label, external link, managed-by-Meshery, terminal session), TagSets, mount animations, gradient fills, validation / inventory badges, and feasibility indicators. You keep the visual identity of each component but stop paying the per-frame cost of re-positioning dozens of badges.

**Cost:** moderate. Fan-out on pan/zoom is roughly half of Full because the badge and overlay layers don't react to every viewport change.

### Wireframe

**Use when:** working with large designs where structure matters more than detail, doing layout passes, or exporting simplified views. Also the right mode when you are about to pan or zoom heavily on a design with hundreds of components.

**What renders:** component outlines, component shapes, and relationships as straight gray lines. **Suppressed:** SVG background images, textures, images, bezier-curve edge styling, badges, overlays, layout animations, TagSets, and most styling. The canvas effectively becomes a schematic of your design.

**Cost:** low. Only the renderer paints; no badges, no overlays, no image decoding.

### View-Only

**Use when:** embedding a design, sharing a read-only snapshot, presenting a design to an audience, or viewing a design where nobody should be able to accidentally edit.

**What renders:** the same minimal set as Wireframe — outlines, shapes, relationships — but with **every interactive affordance disabled**. All nodes are locked (cannot be moved or resized), all event handlers are removed (no click, hover, grab, drag, resize, or double-click responses), and no keyboard shortcuts that would mutate the design are active. The canvas is visible and pannable but not editable.

**Cost:** lowest. Same paint budget as Wireframe plus the interaction layer is disabled entirely.

{{< alert type="info" >}}
In View Only mode, users cannot interact with the canvas at all. Switch to another mode to resume editing.
{{< /alert >}}

{{< alert type="note" title="Render mode vs. Operator mode" >}}
Don't confuse render mode with **Operator mode**. Operator mode is a separate top-level mode of Kanvas (alongside Designer mode) that visualizes **live infrastructure** rather than authored designs. Render mode is orthogonal — it works the same way inside Designer and Operator.
{{< /alert >}}

## Switching render modes

### Using the Options panel

The **Render Mode Switcher** is located in the Options panel (the gear icon on the toolbar). To change modes:

1. Open the Options panel from the toolbar.
2. Click the current mode to open the mode selector.
3. Select the desired mode. The canvas updates immediately.

### Using URL parameters

You can also set the render mode via URL query parameter. Append the `render` parameter to your Kanvas design URL:

- `render=full` — Full rendering with all details
- `render=medium` — Style-only rendering without badges and TagSets
- `render=wireframe` — Outline-only rendering
- `render=viewOnly` — Non-interactive wireframe snapshot

For example: `https://kanvas.new/extension/meshmap?render=wireframe&mode=design&design=xxxx`

For more details on URL parameters, see [Design Render Quality](/kanvas/advanced/url-parameters/).

## Feature size gates by render mode

Several Kanvas features are too expensive to run unconditionally on large graphs. Each gated feature has a **size threshold** — a node/edge count past which the feature disables itself for the current render mode. The threshold is chosen for the amount of work that feature does per frame and the listener fan-out at that render mode.

Threshold table:

| Feature                      | Full                     | Medium                   | Wireframe                | View-Only                | Notes                                                                                           |
| ---------------------------- | -----------------------: | -----------------------: | -----------------------: | -----------------------: | ----------------------------------------------------------------------------------------------- |
| **Auto-pan on Drag**         |                      100 |                      500 |                    1,000 |                    1,000 | See [Auto-pan on Drag](/kanvas/advanced/autopan/).                                              |
| **Layout animation**         |                      100 |                       —¹ |                       —¹ |                       —¹ | Animated layouts only run in Full mode with ≤100 edges.                                         |
| **TagSet visual grouping**   |                    20²  |                      20²  |                      20²  |                      20²  | TagSets display auto-disables past 20 tags; re-enable via **Group Components** in the dock.    |
| **Feasibility evaluation**   |      zoom-gated³       |      zoom-gated³       |      zoom-gated³       |      zoom-gated³       | Gated on zoom, not size — hidden when you zoom out past the detail threshold.                   |
| **Component style editing**  |      zoom-gated³       |      zoom-gated³       |      zoom-gated³       |      zoom-gated³       | Same: revealed only at detailed zoom levels.                                                    |

¹ *Layout animation is a Full-mode-only feature by design. Kanvas falls back to instant (unanimated) layouts in other modes, so the per-mode threshold doesn't apply.*
² *TagSet threshold is tag count, not node count. See [Working with Tags](/kanvas/designer/tagsets/).*
³ *Zoom-gated features activate when your zoom level is above `MIN_ZOOM_FOR_DETAILED_RENDERING`. Zooming out suppresses them regardless of render mode.*

### How size gates interact with render modes

Two rules to remember:

1. **Lower-fidelity render modes raise the size threshold.** Moving from Full to Wireframe is a ten-fold increase in the autopan threshold, because Wireframe isn't doing the badge and overlay work that dominates the pan cost in Full. The same design that feels laggy under Full autopan can feel fine under Wireframe autopan.

2. **Every gate is bidirectionally reactive.** If a gated feature was off because your graph was too big, and you then delete components, cut a subgroup, or simply switch render modes, Kanvas notices and re-enables the feature on the spot. You never need to refresh or re-open the design to recover a feature you've lost to a threshold.

### How to check whether a feature is gated off

The render-mode switcher shows the current mode, and each gated feature exposes its own state — the autopan toggle in Options is a boolean preference, not a live status light. If something feels like it should be working and isn't, the fastest check is:

1. Look at the current render mode in the switcher.
2. Count roughly how many components/relationships are in your design.
3. Cross-reference with the threshold table above.

If you're past the threshold for the mode, the feature is gated off. Switch render modes or shrink the graph to get it back.

## Adaptive Render Mode

**Adaptive Render Mode** is Kanvas's automatic fidelity-management system. Instead of you picking a render mode manually and living with it, Kanvas watches its own performance telemetry and slides the render mode up or down to match real conditions — your machine, your browser, your current design's size, and whatever else is running on the page.

### How to turn it on

In the render-mode switcher (Options panel), there is an **Adaptive** toggle at the top. Flip it on and Kanvas enters adaptive mode. Instead of selecting a render mode directly, the mode you pick in the switcher becomes the **ceiling** — the maximum fidelity adaptive mode is allowed to use. An `AUTO` chip appears next to the current mode so you know adaptive is driving.

If you pick Full as your ceiling, adaptive mode will use Full when performance allows and downshift to Medium or Wireframe when it needs to. If you pick Medium as the ceiling, it will never go above Medium but will still downshift to Wireframe under load.

You can also enable Adaptive mode via URL parameter: `?adaptive=true`

For example: `https://kanvas.new/extension/meshmap?adaptive=true&mode=design&design=xxxx`

### What signals does adaptive mode watch?

Kanvas's performance monitor emits a rolling window of samples covering two latency metrics:

- **Render latency** — the time it takes to paint a single frame (measured at the p95 percentile).
- **Interaction latency** — the time between a user input (pan, zoom, click, drag, hotkey) and the visible response (measured at the p95 percentile).

Both are tracked as **p95** across a rolling window of the last 20 samples, so a one-off hiccup doesn't trigger a mode change — the metric has to stay bad across many frames before adaptive reacts.

Two thresholds on each metric govern the decision:

- **Downshift** — p95 render latency above about 150 ms, or p95 interaction latency above about 80 ms, means the current mode is too expensive. Adaptive moves to the next lower mode after a short 3-second cooldown.
- **Upshift** — p95 render latency below about 60 ms **and** p95 interaction latency below about 30 ms, sustained across 10 consecutive good samples, means there is headroom to paint more detail. Adaptive moves to the next higher mode (capped by your ceiling) after a longer delay.

The downshift is fast because a laggy canvas is an immediate problem; the upshift is deliberately slow because you don't want to bounce back into Full the moment things calm down, only to downshift again three seconds later.

{{< alert type="note" >}}
Adaptive mode is event-driven — it only samples performance when you interact with the canvas (pan, zoom, edit). There is zero overhead when the canvas is idle.
{{< /alert >}}

### The mode ladder

Adaptive mode climbs and descends this ladder:

```
Full  ↕  Medium  ↕  Wireframe
```

View-Only is **not** part of the ladder. It is a deliberate operator choice (for embedding, sharing, or presenting) rather than a performance tier, so adaptive mode never drops you into View-Only automatically.

### Cooldowns and debouncing

Mode changes are throttled:

- After a downshift, adaptive waits before considering the next change. This prevents a runaway descent from Full → Medium → Wireframe in a single bad second.
- Upshifts require a **sustained** run of good samples. A momentary improvement doesn't pull you back up to Full.

The combination keeps adaptive mode stable — it reacts to real performance trends, not individual frame jitter.

### When to use adaptive mode

Adaptive is the right default for most users. Turn it on once and forget about it; Kanvas picks the mode that keeps interactions snappy. You only need to revisit the ceiling when:

- **You want to cap the fidelity** — for example, on a shared machine where you know you'll always be below Full capability. Set the ceiling to Medium.
- **You are presenting or exporting** — for a screenshot, a demo, or a final review, you want a deterministic render mode. Turn adaptive off and pick Full manually so you're not midway through a mode transition when you take the screenshot.
- **You are debugging a performance problem** — turning adaptive off and manually selecting each mode gives you a clean A/B comparison to isolate what is actually causing the slowdown.

### When to turn it off

Adaptive mode is dynamic by design. That means the canvas you're looking at may change fidelity between one minute and the next. Turn it off when:

- You are **recording a video or capturing screenshots** where mid-capture mode changes would be distracting.
- You are **teaching or demoing** Kanvas and you want viewers to see a specific render mode.
- You are **comparing two designs** side-by-side and you want to be sure they are both rendered at the same fidelity.

## Performance guidance

When Adaptive mode downshifts, Kanvas may display suggestions to help you optimize your design. These appear as toast notifications with actionable recommendations:

- **"N tagsets detected"** — Large numbers of TagSets (BubbleSets) are computationally expensive. Consider disabling some via the Layers panel.
- **"N parent nodes detected"** — Deeply nested compound nodes increase render complexity. Collapsing some parent nodes may help.
- **"N components visible"** — High-density designs benefit from layer filtering to hide components you are not currently working with.
- **"N relationships"** — Designs with many relationships render faster in Wireframe mode.

Each suggestion is shown at most once per minute to avoid notification fatigue.

## Cheat sheet

| If you want to…                                            | Do this                                                                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Keep the canvas snappy without thinking about it           | Turn on **Adaptive** with **Full** as the ceiling.                                                                  |
| Polish a design visually before sharing                    | Turn off Adaptive. Pick **Full** manually.                                                                          |
| Lay out a 500+ component design efficiently                | Switch to **Wireframe** for the layout pass, then bump back to Medium or Full for the detail pass.                  |
| Share a read-only view                                     | Pick **View-Only** and share the design URL.                                                                        |
| Recover autopan that stopped working                       | Either switch to a lower-fidelity render mode or delete/hide components to drop below the per-mode size threshold.  |
| Make a snapshot with all badges and TagSets forced visible | Use `?render=full` in the URL — see [Design Render Quality](/kanvas/advanced/url-parameters/).                     |

## Best practices

1. **Start with Adaptive mode** for everyday work — it handles performance automatically and keeps the canvas responsive.
2. **Use Full mode selectively** — reserve it for final visual review or documentation screenshots.
3. **Switch to Wireframe for layout work** — it is the fastest mode for rearranging large designs.
4. **Use View Only for sharing** — when embedding designs or sharing read-only snapshots where editing should be prevented.
5. **Set an appropriate ceiling** — if you do not need badges or tagsets, set the ceiling to Medium to avoid unnecessary rendering overhead.
6. **Break large designs into smaller ones** — designs beyond 500 components benefit from being split regardless of render mode. See [Performance Limits and Tuning](/kanvas/advanced/performance/) for more guidance.

## Known limitations

- Render mode applies globally to the entire canvas — you cannot set different modes for different areas of a design.
- View Only mode strips all interactivity. You must switch to another mode to resume editing.
- Adaptive mode thresholds are fixed and cannot be customized per-user or per-design.
- Mode transitions may cause a brief visual flash as styles update across all elements.
- The performance guidance system analyzes design structure, not actual GPU or CPU load — suggestions are heuristic-based.

## Render modes in Designer vs Operator

All four render modes work in both Designer and Operator contexts:

- In **Designer mode**, render modes control the fidelity of your editable design canvas. All modes except View Only allow full editing.
- In **Operator mode**, the `managed-by-Meshery` and `terminal session` badges follow the same suppression rules as in Designer — they are visible in Full mode and hidden in Medium, Wireframe, and View Only modes.
- **View Only mode is particularly useful in Operator** for monitoring dashboards where accidental edits should be prevented.

## Related pages

- [Auto-pan on Drag](/kanvas/advanced/autopan/) — the most visible feature gated per render mode.
- [Performance Limits and Tuning](/kanvas/advanced/performance/) — full performance envelope and the Layers Panel.
- [Design Render Quality](/kanvas/advanced/url-parameters/) — URL parameter overrides for render mode.
