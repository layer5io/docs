---
title: Render Modes
description: >
    Control rendering fidelity and performance in Kanvas with four render modes and an intelligent Adaptive mode that automatically optimizes the experience.
weight: 3
categories: [Designer, Operator]
tags: [performance, rendering]
---

Kanvas supports multiple render modes that control the level of visual detail and interactivity on the canvas. Higher-fidelity modes show more detail but require more processing power, while lower-fidelity modes strip visual elements for better performance on large designs.

The Adaptive mode acts like an automatic transmission -- it monitors render performance in real time and seamlessly shifts between modes to maintain smooth interactivity.

## Render Modes

Kanvas provides four render modes, each offering a different balance of visual fidelity and performance:

| Mode | Fidelity | Description |
|------|----------|-------------|
| Full | Highest | Complete rendering with all details, badges, TagSets, animations |
| Medium (Style-Only) | High | Full component styles but no badges, TagSets, or animations |
| Wireframe | Low | Simple outlines and straight-line connections, no SVGs or styling |
| View Only | Lowest | Static wireframe snapshot with no interactivity |

### Full Mode

Full mode renders every visual element in your design:

- **SVG backgrounds** and gradient fills on all components
- **All badges** -- compound node, label, external link, expand/collapse, managed-by-Meshery, terminal session, and error badges
- **TagSets** (BubbleSets) showing visual groupings of related components
- **Mount animations** when components appear on the canvas
- **Edge styling** with bezier curves and colored arrows

Full mode is best for reviewing final visuals, detailed inspection, and pixel-perfect output. It uses the most resources and may impact performance on large or complex designs.

### Medium Mode (Style-Only)

Medium mode preserves component appearance while stripping decorative overlays:

- **Kept:** Component SVG backgrounds, node shapes, and edge styling
- **Kept:** Expand/collapse badges (essential for navigating compound nodes) and error badges
- **Stripped:** Decorative badges (compound node, label, external link, managed-by-Meshery, terminal session)
- **Stripped:** TagSets, mount animations, and gradient fills

Medium mode is ideal for everyday editing where you want to see component detail without visual clutter. It is significantly lighter than Full mode.

### Wireframe Mode

Wireframe mode reduces the canvas to basic structural outlines:

- **No SVG background images** on any components
- **Edges rendered as straight gray lines** -- no bezier curves or colored arrows
- **All badges stripped**
- **All TagSets disabled**
- **Layout animations disabled**

Wireframe mode is best for quick layout work, performance-critical scenarios, and focusing purely on design structure. It is very lightweight and handles large designs well.

### View Only Mode

View Only mode extends Wireframe rendering with complete removal of interactivity:

- Same visual rendering as Wireframe mode
- **All nodes locked** -- cannot be moved or resized
- **All event handlers removed** -- no click, hover, grab, drag, resize, or double-click responses

View Only mode is best for embedding designs, sharing read-only views, and generating static documentation screenshots. It uses minimal resources.

{{< alert type="info" >}}
In View Only mode, users cannot interact with the canvas at all. Switch to another mode to resume editing.
{{< /alert >}}

## Switching Render Modes

### Using the Layers Panel

The **Render Mode Switcher** is located in the Layers panel in the left sidebar. To change modes:

1. Click the current mode icon in the Layers panel to open the mode selector.
2. Select the desired mode from the dropdown menu.
3. The canvas updates immediately.

### Using URL Parameters

You can also set the render mode via URL query parameter. Append the `render` parameter to your Kanvas design URL:

- `render=full` -- Full rendering with all details
- `render=medium` -- Style-only rendering without badges and TagSets
- `render=wireframe` -- Outline-only rendering
- `render=viewOnly` -- Non-interactive wireframe snapshot

For example: `https://kanvas.new/extension/meshmap?render=wireframe&mode=design&design=xxxx`

For more details on URL parameters, see [Design Render Quality](/kanvas/advanced/url-parameters/).

## Adaptive Mode

Adaptive mode automatically adjusts the render mode based on real-time performance measurements. When enabled, Kanvas monitors canvas responsiveness and shifts between modes to maintain smooth interactivity -- downshifting when performance degrades and upshifting when it recovers.

### How It Works

Adaptive mode monitors two performance metrics in real time:

- **Render latency** -- the time to complete a render cycle (measured at the p95 percentile)
- **Interaction latency** -- the time from user input (pan, zoom) to visual response (measured at the p95 percentile)

Performance is tracked using a rolling window of the last 20 samples. When the p95 render latency exceeds 150ms or the p95 interaction latency exceeds 80ms, the mode automatically downshifts (for example, Full to Medium, or Medium to Wireframe). When performance recovers -- render latency drops below 60ms and interaction latency drops below 30ms for 10 consecutive samples -- the mode upshifts.

### Hysteresis (Preventing Flicker)

Adaptive mode uses asymmetric thresholds to prevent rapid mode switching:

- **Downshifting happens quickly** -- with a 3-second cooldown between shifts. Users notice lag immediately, so the system responds fast.
- **Upshifting is cautious** -- requiring 10 consecutive good samples before shifting up. This prevents the mode from flickering back and forth at the boundary.

The result is fast response to performance problems and careful, stable recovery.

### Ceiling Mode

When you enable Adaptive mode, your currently selected render mode becomes the **ceiling** -- the highest fidelity that Adaptive will use. Adaptive mode will never upshift above your ceiling.

For example, if you set the ceiling to Medium, Adaptive will shift between Medium and Wireframe as needed but will never go to Full mode. This is useful when you know you do not need badges or tagsets and want to prevent unnecessary rendering overhead.

### Enabling Adaptive Mode

To enable Adaptive mode:

1. Open the **Render Mode Switcher** in the Layers panel.
2. Toggle the **Adaptive** switch.
3. When active, an "AUTO" indicator appears next to the current mode.

Manual mode selections while Adaptive is active set the new ceiling. For example, switching from Full to Medium while Adaptive is on means Adaptive will now treat Medium as the highest mode it can use.

You can also enable Adaptive mode via URL parameter: `?adaptive=true`

For example: `https://kanvas.new/extension/meshmap?adaptive=true&mode=design&design=xxxx`

{{< alert type="note" >}}
Adaptive mode is event-driven -- it only samples performance when you interact with the canvas (pan, zoom, edit). There is zero overhead when the canvas is idle.
{{< /alert >}}

## Performance Guidance

When Adaptive mode downshifts, Kanvas may display suggestions to help you optimize your design. These appear as toast notifications with actionable recommendations:

- **"N tagsets detected"** -- Large numbers of TagSets (BubbleSets) are computationally expensive. Consider disabling some via the Layers panel.
- **"N parent nodes detected"** -- Deeply nested compound nodes increase render complexity. Collapsing some parent nodes may help.
- **"N components visible"** -- High-density designs benefit from layer filtering to hide components you are not currently working with.
- **"N relationships"** -- Designs with many relationships render faster in Wireframe mode.

Each suggestion is shown at most once per minute to avoid notification fatigue.

## Best Practices

1. **Start with Adaptive mode** for everyday work -- it handles performance automatically and keeps the canvas responsive.
2. **Use Full mode selectively** -- reserve it for final visual review or documentation screenshots.
3. **Switch to Wireframe for layout work** -- it is the fastest mode for rearranging large designs.
4. **Use View Only for sharing** -- when embedding designs or sharing read-only snapshots where editing should be prevented.
5. **Set an appropriate ceiling** -- if you do not need badges or tagsets, set the ceiling to Medium to avoid unnecessary rendering overhead.
6. **Break large designs into smaller ones** -- designs beyond 500 components benefit from being split regardless of render mode. See [Performance Limits and Tuning](/kanvas/advanced/performance/) for more guidance.

## Known Limitations

- Render mode applies globally to the entire canvas -- you cannot set different modes for different areas of a design.
- View Only mode strips all interactivity. You must switch to another mode to resume editing.
- Adaptive mode thresholds are fixed and cannot be customized per-user or per-design.
- Mode transitions may cause a brief visual flash as styles update across all elements.
- The performance guidance system analyzes design structure, not actual GPU or CPU load -- suggestions are heuristic-based.

## Render Modes in Designer vs Operator

All four render modes work in both Designer and Operator contexts:

- In **Designer mode**, render modes control the fidelity of your editable design canvas. All modes except View Only allow full editing.
- In **Operator mode**, the `managed-by-Meshery` and `terminal session` badges follow the same suppression rules as in Designer -- they are visible in Full mode and hidden in Medium, Wireframe, and View Only modes.
- **View Only mode is particularly useful in Operator** for monitoring dashboards where accidental edits should be prevented.
