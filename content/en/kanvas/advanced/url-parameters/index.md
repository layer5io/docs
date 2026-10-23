---
title: Design Render Quality
description: >
    Control the level of detail in Kanvas design rendering using advanced URL query parameters.
weight: 2
categories: [designer, operator]
tags: [performance]
aliases:
  - /kanvas/reference/url-parameters/
---

By default, Kanvas opens a design in **Full** render mode. Full already draws TagSets, badges, and animations. You do not add `render=full` to reveal them. Add a `render` value only when you want the canvas to draw less.

> To learn more about defining relationships between components, including the detailed use and creation of **TagSets**, please see the [Creating Relationships | Layer5 Documentation](https://docs.layer5.io/kanvas/getting-started/creating-relationships/).

## Enable Full Render Mode

Full is already the mode a link uses when it has no `render` parameter. A link such as `https://kanvas.new/extension/meshmap?mode=design&design=xxxx` opens in Full.

TagSets can still be hidden when the mode is not Full, when the TagSets layer is off, or when the design draws more than 30 of them. In that last case Kanvas skips the rest and shows "Skipped rendering of N matchlabels relationships due to limit of 30". See [Render Modes]({{< ref "kanvas/advanced/render-modes.md" >}}) and [Performance Limits and Tuning]({{< ref "kanvas/advanced/performance/index.md" >}}).

{{< alert title="Advanced Usage Note" type="info">}}
This is an advanced feature primarily intended for power users, debugging scenarios, or system-level integrations. You will not need to manually adjust this parameter for everyday design work.
{{< /alert >}}

## Why Use Full Render Mode?

This capability is particularly valuable for:

* **Detailed Inspection & Debugging:** When you need to meticulously review, debug, or verify all components, relationships, and intricate details within a design.
* **Comprehensive Documentation:** For creating thorough screenshots or technical documentation that requires all visual elements to be accurately represented.
* **System & Integration Testing:** During testing phases to ensure all parts of a design are processed and displayed by the rendering engine exactly as expected.

## Best Practices

To use full render mode effectively:

1. **Use Selectively for Performance**  
   Full is the default and draws the most. On a large design, set `render=medium` or `render=wireframe`, or turn on Adaptive mode, so the canvas draws less.

2. **Promote Consistent Shared Views**  
   When sharing a design link with `render=full` for review, advise collaborators to also enable the relevant toggles in their **Layers panel**. This helps prevent discrepancies caused by individual layer settings, ensuring everyone sees the same details.

3. **Check the Layers Panel if Details Are Missing**  
   If `render=full` is active in your URL but expected elements (like **TagSets**) are not visible, verify that their visibility is enabled in your **Layers panel**. Your Layers settings can hide elements even when full render is requested.

## Additional Render Mode Parameters

You can specify render modes via the `render` parameter:

- `render=full` -- Full rendering with all details. This is the default when the parameter is omitted.
- `render=medium` -- Style-only rendering without TagSets and most badges
- `render=wireframe` -- Outline-only rendering
- `render=view-only` -- Non-interactive view. Spell it with a hyphen. Kanvas does not validate the value, and any other spelling, including `viewOnly`, is unsupported.

For example: `https://kanvas.new/extension/meshmap?render=wireframe&mode=design&design=xxxx`

See [Render Modes]({{< ref "kanvas/advanced/render-modes.md" >}}) for detailed descriptions of each mode.

## Adaptive Mode Parameter

You can enable Adaptive mode via URL parameter:

`https://kanvas.new/extension/meshmap?adaptive=true&mode=design&design=xxxx`

When `adaptive=true` is set, Kanvas monitors how long the canvas takes to produce the next frame after a pan or zoom and switches modes as needed. A link cannot set the ceiling: `adaptive=true` always starts with a Full ceiling, and `render` only sets the starting mode. Choose a different ceiling in the render mode switcher after the canvas loads. Adaptive is off unless the link or the switcher turns it on. See [Render Modes]({{< ref "kanvas/advanced/render-modes.md" >}}) for details.

`render=view-only` locks components for that session. It does not change who may edit the design. Anyone with edit access can switch the mode back.

## Other parameters Kanvas reads

Append parameters to the Kanvas route. On the hosted app that route is `https://kanvas.new/extension/meshmap`. On the Meshery Playground or a self-hosted Meshery it is `/extension/meshmap` on that host.

| Parameters | Result |
| --- | --- |
| `mode=design&design=<design-id>` | Opens the design in Designer. This is the form the Share dialog produces. `name=<design-name>` is optional. |
| `mode=design&type=design&id=<design-id>&name=<design-name>` | Older form that Kanvas still accepts. |
| `mode=design&type=catalog&id=<catalog-id>&name=<name>` | Clones the catalog design into the opener's workspace and opens the copy. |
| `catalog-design=<catalog-id>` | Opens the catalog dialog focused on that design. |
| `mode=operator` | Opens Operator. |
| `mode=operator&type=view&id=<view-id>&name=<view-name>` | Opens Operator on a saved view. |
| `mode=operator&type=view&design_id=<design-id>&design_name=<design-name>` | Opens Operator on a view scoped to a design. |
| `viewport=<encoded>` | Restores the zoom and pan Copy Link recorded. Copy the value from a link rather than writing it by hand. |

A link to a private design opens only for people who can read it. For anyone else the load fails with "Failed to render design", followed by the reason. Public designs open for anonymous visitors. Render mode and `adaptive` stay in the address when Kanvas rewrites it, and neither is saved in the design.