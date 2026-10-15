# Performance Limits


> Reference for what each render mode draws, the design sizes and zoom levels at which Kanvas gates features, how Adaptive mode decides to change modes, the enforced limits on a design, and what to adjust when a design feels slow.


Kanvas draws a design on a canvas and redraws it on every pan, zoom and edit. The cost grows with the number of components and relationships and with how much detail each one carries. Kanvas controls that cost in four ways: the **render mode** you choose, **gates** that turn expensive features off past a design size or below a zoom level, **Adaptive mode**, which changes the render mode for you, and a small number of **enforced limits**.

For the reasoning behind render modes, see [Render Modes](/pr-preview/pr-1317/kanvas/concepts/render-modes/).

## What each render mode draws

Switching render mode never changes the design. Components, relationships, configuration and layers stay as they are. Only what Kanvas draws changes. Full is the default.

| Drawn element | Full | Medium | Wireframe | View-only |
| --- | :---: | :---: | :---: | :---: |
| Component images | Yes | Yes | No | No |
| Gradient fills | Yes | No | No | No |
| Relationship styling (color, curves, arrow style) | Yes | Yes | No. Thin, straight, light gray lines | Yes |
| TagSets | Yes | No | No | No |
| Expand and collapse badges | Yes | Yes | No | No |
| Compound-component, label and external-link badges | Yes | No | No | No |
| Validation and dry-run error badges | Yes | No | No | No |
| Managed-by-Meshery and terminal-session badges (Operator) | Yes | No | No | No |
| Text-box content | Yes | Yes | No | No |
| Animation when a component is added | Yes | No | No | No |
| Animated layouts | Yes, on designs within the limit below | No | No | No |
| Editing and selecting on the canvas | Yes | Yes | Yes | No. Components are locked and take no pointer input |

Layer visibility from the [Layers panel](/pr-preview/pr-1317/kanvas/reference/layout-and-layers/) applies in every mode. A layer you hide stays hidden.

Render mode applies to Designer and Operator alike, and to the whole canvas at once. It is session state: it is not saved in the design, not shared with collaborators and not remembered across sessions. Set it from the render mode switcher, which appears in the Options dialog and in the Designer toolbar, or from the `render` [URL parameter](/pr-preview/pr-1317/kanvas/reference/url-parameters/).

## Size and zoom gates

A gate turns a feature off while a condition holds and turns it back on when the condition clears. Kanvas re-checks gates as the design changes, as you change render mode, and as you zoom, so you never reload to recover a feature.

| Feature | Gate | Applies in |
| --- | --- | --- |
| [Auto-pan on Drag](/pr-preview/pr-1317/kanvas/reference/autopan/) | Needs your setting on, and at most 100 components and 100 relationships drawn in Full, 500 in Medium, 1,000 in Wireframe and View-only | Designer |
| Animated layout | Full mode only, and only while the design has no more than 50 components, no more than 50 relationships and no more than 100 edges drawn. Past that, a layout still applies its positions, without the animation | Designer |
| TagSets | Full mode only, and at most 30 drawn. Past 30, Kanvas skips the rest and shows the warning "Skipped rendering of N matchlabels relationships due to limit of 30" | Designer |
| Feasibility evaluation | Zoom above 0.5 divided by the display pixel ratio. That is 0.5 on a standard display and 0.25 on a display with a pixel ratio of 2 | Every mode |
| Component style toolbar | The same zoom threshold | Every mode |

TagSets are the only relationship type with a rendering limit. See [TagSets](/pr-preview/pr-1317/kanvas/guides/designing/tagsets/).

## Adaptive mode

Adaptive mode lowers the render mode when the canvas becomes slow and raises it again when the canvas recovers.

| Property | Value |
| --- | --- |
| Turn on | The Adaptive switch in the render mode switcher, or `adaptive=true` in the URL |
| Default | Off |
| Ladder | Full, Medium, Wireframe. View-only is never entered or left automatically |
| Ceiling | The highest mode Adaptive may use. It starts at Full. While Adaptive is on, the switcher shows the ceiling, labeled AUTO, not the mode currently in use |
| Signal | How long the canvas takes to produce the next frame after each pan or zoom, taken as the 95th percentile of the last 20 samples |
| Idle cost | None. Kanvas samples only when you pan or zoom |
| Step down | When the 95th percentile exceeds 80 ms. After a step down, Kanvas ignores samples for 3 seconds |
| Step up | When the 95th percentile stays under 30 ms for 10 consecutive samples, more than 5 seconds after the last change, and the next mode is not above the ceiling |
| Notification | "Switched to *mode* mode for better performance" on a step down. "Performance improved - switched to *mode* mode" on a step up |

Behavior to plan around:

- **Turning Adaptive on sets the canvas to the ceiling at once.** With the default ceiling, that is Full.
- **Recovery is one step.** After a step down, Adaptive recovers at most one step on its own. It steps down again if the canvas slows again, and it does not climb further until then. To return to a higher mode, turn Adaptive off and choose the mode.
- **A new ceiling applies the next time you turn Adaptive on.** Choosing a ceiling in the switcher while Adaptive is already on updates the label but does not change the running behavior. Turn Adaptive off and on to apply it.
- **Turning Adaptive off keeps the current mode.** The canvas stays in whichever mode Adaptive last chose, and manual selection resumes.
- **The thresholds are fixed.** You cannot set them per user or per design.

## Enforced limits

| Limit | Value | Where it is enforced |
| --- | --- | --- |
| Components per design | Set by the organization's plan: 100, 200, 100 and 300 for Personal, Team Designer, Team Operator and Enterprise | Layer5 Cloud, when a design is saved or imported. See [Components per design](/pr-preview/pr-1317/kanvas/concepts/designs/) |
| Image or text file added to a design | 512,000 bytes (about 500 KB) each, the same on every plan | The Kanvas canvas, when a file is dropped, pasted or uploaded. Images are embedded in the design, so each one adds to its size |
| TagSets drawn | 30 | The canvas, as described above |
| Canvas zoom | Minimum 0.1 (adjustable from 0.1 to 5), maximum 30 (adjustable from 0.1 to 30) | The Options dialog. Each person sets their own |

Kanvas enforces no cap on the number of relationships in a design or on how many images it holds. Large designs and embedded images still enlarge what Kanvas saves and synchronizes with collaborators, so loading, saving and live editing slow down as a design grows.

## What to change when a design is slow

Work from the cheapest change to the most disruptive.

| If | Then |
| --- | --- |
| Panning and zooming feel heavy | Switch to Medium, or turn on Adaptive. Switch to Wireframe for a layout pass on a very large design |
| Dragging a component to the edge does not scroll | Count components and relationships against the [auto-pan limit](/pr-preview/pr-1317/kanvas/reference/autopan/) for your mode |
| Only part of the design matters right now | Hide the layers you do not need in the Layers panel. Hidden components and relationships come off the canvas, and the design keeps them |
| TagSets are missing | Check the mode is Full, the TagSets layer is on, and the design has no more than 30 |
| The design saves slowly or collaboration lags | Remove unused embedded images, and prefer SVG or WebP images over PNG, JPEG and GIF files |
| The design keeps outgrowing the mode you prefer | Split it into several designs |
| Screenshots or demos need a steady picture | Turn Adaptive off and choose Full, so the mode cannot change mid-capture |

## Experimental WebGL renderer

Kanvas can draw the canvas with WebGL instead of the standard 2D canvas. It is an advanced option for diagnosing rendering, off by default, and available only from the Debug Mode panel, which appears when **Enable Debugger** is on in the Options dialog.

- **Scope.** The choice is stored in your browser, not your account, and applies the next time a canvas loads. Reload after changing it.
- **Trade-offs.** The WebGL path draws dashed and dotted relationship lines as solid lines, draws every arrowhead as a triangle, and does not hide labels at low zoom.
- **Fallback.** Above a zoom of 7.99 Kanvas draws with the standard canvas. After a browser loses its WebGL context, Kanvas uses the standard canvas for the rest of the browser session.
- **Browser support.** The panel reports when the browser does not support WebGL 2.

