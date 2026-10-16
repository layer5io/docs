# URL Parameters


> Every query parameter Kanvas reads from its address - which design or view to open, how to draw it, and which viewport to restore - with accepted values, defaults and how parameters combine.


Kanvas reads its starting state from the query string of its address. A link can open a specific design, open Operator on a view, choose how much detail the canvas draws, and restore a zoom and pan position. The links produced by the Share dialog and by Copy Link are built from these parameters.

Append parameters to the Kanvas route of the Meshery you are using. On the hosted app that route is `https://kanvas.new/extension/meshmap`; on the Meshery Playground or a self-hosted Meshery it is `/extension/meshmap` on that host.

```
https://kanvas.new/extension/meshmap?mode=design&design=<design-id>&render=wireframe
```

## What to open

| Parameters | Result |
| --- | --- |
| `mode=design&design=<design-id>` | Opens the design in Designer. This is the form the Share dialog produces. `name=<design-name>` is optional. |
| `mode=design&type=design&id=<design-id>&name=<design-name>` | Opens the design. An older form that Kanvas still accepts. |
| `mode=design&type=catalog&id=<catalog-id>&name=<name>` | Clones the catalog design into the opener's workspace and opens the copy. |
| `catalog-design=<catalog-id>` | Opens the catalog dialog focused on that design. |
| `mode=operator` | Opens Operator. |
| `mode=operator&type=view&id=<view-id>&name=<view-name>` | Opens Operator on a saved view. |
| `mode=operator&type=view&design_id=<design-id>&design_name=<design-name>` | Opens Operator on a view scoped to a design. |

A link to a private design opens only for people who can read the design. For anyone else the load fails with the message "Failed to render design", followed by the reason. Public designs open for anonymous visitors. See [Collaboration Model](/pr-preview/pr-1332/kanvas/concepts/collaboration/) for who can read what.

## How to draw it

| Parameter | Values | Default | Effect |
| --- | --- | --- | --- |
| `render` | `full`, `medium`, `wireframe`, `view-only` | `full` | Sets the render mode when the canvas loads. |
| `adaptive` | `true` | off | Turns on Adaptive mode when the canvas loads. |

- **Spell the `render` value exactly.** The accepted value for the read-only mode is `view-only`, with a hyphen. Kanvas does not validate the value, and behavior with any other value is unsupported - for example, [auto-pan](/pr-preview/pr-1332/kanvas/reference/autopan/) stays off.
- **Full is the default.** A link with no `render` parameter opens in Full, which already draws TagSets, badges and animations. Add `render` to draw less, not to draw more.
- **`adaptive=true` always starts with a Full ceiling.** Adaptive mode may never exceed its ceiling, and a link cannot set it. Combine the two parameters and `render` sets the starting mode while the ceiling stays Full. Choose a different ceiling in the render mode switcher after the canvas loads.
- **Both parameters survive navigation inside Kanvas.** Kanvas keeps them in the address when it rewrites it, for example when it changes the mode or the open design.
- **Neither parameter is stored.** Render mode is session state. It is not saved in the design, not shared with collaborators, and not remembered the next time you open Kanvas without the parameter.

What each mode draws, and what Adaptive mode measures, is on [Performance Limits](/pr-preview/pr-1332/kanvas/reference/performance/). The reasoning behind the modes is in [Render Modes](/pr-preview/pr-1332/kanvas/concepts/render-modes/).

## Where to restore the view

| Parameter | Value | Effect |
| --- | --- | --- |
| `viewport` | An encoded zoom and pan position | Restores that zoom and pan on load. Copy Link adds it so the person who opens the link sees the same region you were looking at. |

The value is produced by Kanvas. Copy it from a link rather than writing it by hand.

## Common links

| Goal | Link |
| --- | --- |
| Open a large design without waiting for badges and overlays | `...?mode=design&design=<id>&render=wireframe` |
| Open a design for review and let Kanvas manage fidelity | `...?mode=design&design=<id>&adaptive=true` |
| Share a design that nobody should edit by accident | `...?mode=design&design=<id>&render=view-only` |
| Give a reader a catalog design as a starting point | `...?mode=design&type=catalog&id=<catalog-id>&name=<name>` |







<div class="alert alert-custom" style="border-color: #7A848E;" role="alert">
  <h4 class="alert-heading" style="color: #7A848E;">View-only is a display choice, not an access control</h4>
  
      <code>render=view-only</code> locks the components on the canvas for that session. It does not change who may edit the design. Anyone with edit access can switch the mode back. Control who can edit with <a href="/pr-preview/pr-1332/kanvas/concepts/collaboration/">design access</a>.
  
</div>




