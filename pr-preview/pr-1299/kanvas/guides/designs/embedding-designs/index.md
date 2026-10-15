# Embed Designs


> Show a design on a web page, blog, or documentation site with an exported JavaScript snapshot, including WordPress, React, and Hugo.


An embedded design is an interactive picture of a design on your own page. Readers can pan and zoom it, but cannot edit it. It is a static export: Kanvas gives you a JavaScript module file and a snippet that loads it.

## How an embed works

- **It is a snapshot.** The file holds the canvas as it was at export time: node positions, element styles, and inline background images converted to data URLs where the fetch succeeded. Later edits to the design do not change an exported file. Re-export to refresh it.
- **It needs no Layer5 Cloud at view time.** The page makes no request to Layer5 Cloud, so the embed works for private designs and keeps working if the design is deleted. Anyone who can read your page can read the embedded design data.
- **It is view only.** Layout is fixed to the exported positions. Selection and box selection are disabled, zoom is limited to 0.5x to 6.6x, and there is no editing, component configuration, relationship evaluation, or live cluster data.
- **It loads one library.** The page fetches the Cytoscape library (version 3.27.0) from a public CDN, so viewers need outbound access to it. A Meshery logo link, which opens meshery.io, is drawn at the bottom right of the canvas. No option removes it.
- **It has no parameters.** Width, height, theme, background, and zoom are not options. The container's CSS sets the size.
- **There is no iframe embed.** Kanvas offers no embed URL for the app itself.

Embedding needs no permission key and no paid plan.

## Embed a design in an HTML page

1. Open the design, choose Export, and select **Embed Design**. Kanvas loads the design if it is not the open one, waits for it to render plus 3 seconds, and then generates the file. A failure shows "Failed to generate Embed Code for <name>".
2. Download the JavaScript file, then copy the embed code.
3. Place the file next to your page, or anywhere your page can reference, and paste the snippet:

```html
<div id="embedded-design-<design id>" style="height:100%;width:100%"></div>
<script src="./embedded-design-<design name>.js" type="module"></script>
```

The container id is `embedded-design-` plus the design id, lowercased, with spaces replaced by hyphens. The script file name is `embedded-design-` plus the design name, lowercased, with spaces replaced by hyphens, plus `.js`. Other characters in the name are not changed, so avoid unusual characters in design names. Keep the `id` in the snippet equal to the id the script expects.

Two requirements follow from this snippet:

- Serve the page over HTTP or HTTPS. Module scripts do not load from `file://`.
- Give the container a real height. The div fills 100 percent of its parent, which collapses to zero in a parent with no height.

## Embed in WordPress

WordPress has no Kanvas-specific plugin. You add the script to your theme and the snippet to a Custom HTML block.

1. Create a `js` folder in your active theme and copy the downloaded file into it.
2. Enqueue the file as a script module from the theme's `functions.php`, replacing `design.js` with your file name:

```php
function kanvas_design_script() {
    $script_uri = get_template_directory_uri() . '/js/design.js';
    wp_enqueue_script_module('kanvas-design', $script_uri, array(), '1.1.0');
}
add_action('wp_enqueue_scripts', 'kanvas_design_script');
```

3. In the post, add a Custom HTML block containing only the `<div>` from the snippet. Because the theme already loads the module, leave out the `<script>` tag.

## Embed in a React project

Install the component package and point it at the exported file and container id.

```bash
npm i @layer5/meshery-design-embed
```

```jsx
import MesheryDesignEmbed from '@layer5/meshery-design-embed'

function Design() {
  return (
    <MesheryDesignEmbed
      embedScriptSrc="embedded-design-embed1.js"
      embedId="embedded-design-a3d3f26e-4366-44e6-b211-1ba4e1a3e644"
    />
  )
}
```

`embedScriptSrc` is the path to the exported file, typically in your static folder. `embedId` is the container id from the snippet.

## Embed in a Hugo site

Hugo sites wrap the snippet in a shortcode. Add this definition once to your site's shortcodes, as `meshery-design-embed.html`.

<details>
<summary>Click to expand the full Shortcode Definition</summary>

```html
{{ $script := .Get "src" }}
{{ $id := .Get "id" }}
{{ $size := .Get "size" | default "full" }}
{{ $style := .Get "style" }}

<style>
.meshery-embed-container {
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 0rem auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.meshery-embed-container.full {
  width: 80%;
  height: 30rem;
}
.meshery-embed-container.half {
  width: 50%;
  height: 25rem;
}
.meshery-embed-container .cy-container {
  width: 100%;
  height: 100%;
}
</style>

<div
    id="{{ $id }}"
    {{- if $style -}}
        style="{{ $style | safeCSS }}"
    {{- else -}}
        class="meshery-embed-container {{ $size }}"
    {{- end -}}
></div>

<script src="{{ $script }}" type="module"></script>
```
</details>

| Parameter | Required | Meaning |
|---|---|---|
| `src` | Yes | Path to the exported JavaScript file. |
| `id` | Yes | Unique container id for this embed on the page. |
| `size` | No | `full` (default, 80 percent wide) or `half` (50 percent wide). Ignored when `style` is set. |
| `style` | No | Inline CSS for the container. Overrides `size`. |

Place the exported file near the page and reference it:

```html
{{< meshery-design-embed
    src="../path/to/your-design.js"
    id="your-unique-design-id"
    size="half"
>}}
```

A live example, rendered from a design exported from Kanvas:
























<style>
.meshery-embed-container {
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 0rem auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.meshery-embed-container.full {
  width: 80%;
  height: 30rem;
}
.meshery-embed-container.half {
  width: 50%;
  height: 25rem;
}
.meshery-embed-container .cy-container {
  width: 100%;
  height: 100%;
}

</style>


<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
<div
    id="embedded-design-7d183e77-09e1-4b69-a5ee-3e3870e9c5f4"class="meshery-embed-container full"></div>

<a href="https://cloud.layer5.io/catalog/content/design/7d183e77-09e1-4b69-a5ee-3e3870e9c5f4" target="_blank" rel="noopener noreferrer">
  Open Design
</a>

</div>


<script src="../export-designs/embedded-design-dapr.js" type="module"></script>


## Related

- [Export Designs](/pr-preview/pr-1299/kanvas/guides/designs/export-designs/) covers the other formats.
- [Share Designs](/pr-preview/pr-1299/kanvas/designer/sharing/) covers live access to a design for specific people.

