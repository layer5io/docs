# Render Modes


> How render modes trade visual detail for canvas speed, how Adaptive mode moves between them, and how render mode interacts with size gates, Layers, Designer, and Operator.


Render mode sets how much detail Kanvas draws for a design. It works as a fidelity dial for your current session, not a property of the design. Switching modes never changes components, relationships, configuration, or layers, and the mode is not saved with the design. Every session starts in Full unless the URL sets a different mode. The switcher appears in the Options dialog and in the Designer toolbar.

## What each mode trades away

Kanvas has four render modes. Each of the first three gives up something the mode above it draws.

- **Full** draws everything: component images and gradient fills, every badge, TagSets, mount animations on new components, and animated layouts on designs that are small enough.
- **Medium** keeps component images and relationship styling but drops gradient fills, TagSets, animations, and most badges, including validation and dry-run error badges. It keeps expand and collapse badges so you can still navigate compound components.
- **Wireframe** reduces the design to its structure. Component images, all badges, and text-box overlays disappear, and edges become thin, straight, light gray lines with simple arrowheads. You can still edit everything.
- **View-only** draws as sparsely as Wireframe but keeps relationship styling on edges. It also removes interaction: components are locked, and nothing can be grabbed, dragged, selected, resized, or double-clicked.

The exact element-by-element breakdown is on [Performance Limits](/pr-preview/pr-1345/kanvas/reference/performance/).

## Why less detail is faster

Panning and zooming move the viewport, and every visible element must follow. In Full, that means repositioning badges, redrawing images and gradients, and tracing curved, colored edges on every frame of the gesture. Each mode below Full removes some of that per-frame work, so the same design responds faster as fidelity drops. The design's size does not change; the cost of looking at it does.

## Adaptive mode

Adaptive mode lets Kanvas turn the dial for you. Turning it on in the switcher shows an AUTO chip, and the mode you pick from then on becomes the **ceiling**: the highest fidelity Adaptive mode may use. The default ceiling is Full, and the canvas switches to the ceiling as soon as Adaptive mode turns on.

**What it measures.** While Adaptive mode is on, Kanvas measures how long the canvas takes to show the next frame after each pan or zoom. It keeps the last 20 measurements and acts on the 95th percentile, so a single slow frame does not trigger a change. It measures nothing while the canvas is idle.

**The ladder.** Adaptive mode moves one step at a time between Full, Medium, and Wireframe. It never enters or leaves View-only; that mode is always your choice.

**Down fast, up slow.** When the 95th percentile exceeds 80 ms, Kanvas drops one step, and it can drop another step 3 seconds later if the canvas is still slow. Climbing back requires 10 consecutive fast measurements (under 30 ms), at least 5 seconds since the last change, and a next mode no higher than the ceiling. The asymmetry is deliberate: lag is an immediate problem, and returning too early causes the canvas to flicker between modes.

**How it behaves today:**

- Each automatic change shows a notification, such as "Switched to Medium mode for better performance" or "Performance improved - switched to Full mode".
- The switcher shows the ceiling, not the mode currently drawn. Use the notifications to tell which mode is active.
- After a slowdown, Kanvas climbs back at most one step. It stays at that mode until the next slowdown, even when the canvas is fast again.
- Changing the ceiling while Adaptive mode is on updates the switcher, but the new ceiling takes effect the next time you turn Adaptive mode on.
- Turning Adaptive mode off leaves the canvas in whichever mode Adaptive mode last chose.

You can also start a session in a given mode or with Adaptive mode on through the URL. When a URL sets both, Adaptive mode starts with a Full ceiling and the URL's mode as the starting mode. See [URL Parameters](/pr-preview/pr-1345/kanvas/reference/url-parameters/).

## How render mode interacts with other features

**Size gates.** Some features turn themselves off on large designs, and render mode moves the threshold. Auto-pan on drag, which is off by default, runs only while the design's component and edge counts stay under a per-mode limit that rises as fidelity drops. Kanvas re-checks the limit whenever you add or remove elements or change modes, so the feature returns without a reload. Animated layout runs only in Full and only on small designs; in every other case, layouts apply instantly. See [Auto-pan on Drag](/pr-preview/pr-1345/kanvas/reference/autopan/) and [Performance Limits](/pr-preview/pr-1345/kanvas/reference/performance/) for the numbers.

**Zoom.** Feasibility evaluation and component style editing depend on zoom level, not render mode. They become available only once you zoom in past a fixed level, in every mode.

**Layers.** Layer visibility is saved with the design and applies in every mode. A hidden layer stays hidden in Full, and switching modes never brings it back. TagSets need both conditions: the TagSets layer must be visible and the mode must be Full. See [Layout and Layers](/pr-preview/pr-1345/kanvas/reference/layout-and-layers/).

## Designer and Operator

Render mode works the same way in [Designer](/pr-preview/pr-1345/kanvas/concepts/designer/) and [Operator](/pr-preview/pr-1345/kanvas/concepts/operator/). Operator's badges, which show resources managed by Meshery and terminal sessions, appear only in Full, like the other decorative badges.

## Choosing a mode

- **Full** - reviewing, presenting, or capturing a design when every badge and TagSet matters.
- **Medium** - everyday editing on a design large enough that Full feels slow.
- **Wireframe** - layout passes and heavy panning on large designs where structure matters more than appearance.
- **View-only** - showing a design to others when nobody should move anything by accident.
- **Adaptive, Full ceiling** - general work when you would rather not manage the dial. Turn it off for screenshots, recordings, and side-by-side comparisons, where a mode change in the middle would mislead.

## Related pages

- [Performance Limits](/pr-preview/pr-1345/kanvas/reference/performance/): render-mode matrix, size gates, and limits.
- [URL Parameters](/pr-preview/pr-1345/kanvas/reference/url-parameters/): set the render mode and Adaptive mode on load.
- [Auto-pan on Drag](/pr-preview/pr-1345/kanvas/reference/autopan/): the setting and its per-mode thresholds.
- [Layout and Layers](/pr-preview/pr-1345/kanvas/reference/layout-and-layers/): layer visibility and layout behavior.

