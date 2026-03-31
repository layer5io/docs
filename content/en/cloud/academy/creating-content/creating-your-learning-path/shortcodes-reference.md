---
title: Shortcodes Reference
weight: 3
description: >
  A definitive reference of all shortcodes available for use in Layer5 Academy content, including those provided by the Academy theme, Docsy, and Hugo.
categories: [Academy]
tags: [Academy]
---

The Layer5 Academy platform supports a wide range of shortcodes for enriching your learning content. Shortcodes are reusable template snippets you invoke in Markdown files to generate HTML output. They come from three sources:

1. **Academy Theme** — custom shortcodes built specifically for the Academy platform.
2. **Docsy Theme** — shortcodes inherited from the [Google Docsy](https://www.docsy.dev/) documentation theme.
3. **Hugo Built-in** — shortcodes included with the [Hugo](https://gohugo.io/) static site generator.

For guidance on creating your own shortcodes, see [Extending the Academy](/cloud/academy/creating-content/extending-the-academy/).

## Academy Theme Shortcodes

These shortcodes are defined in the [`academy-theme`](https://github.com/layer5io/academy-theme) repository and are purpose-built for Academy content.

### alert

Displays styled alert boxes for important information. Supports multiple visual types.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `type` | _(none)_ | Alert style: `danger`, `info`, `warning`, or `note`. |
| `color` | `primary` | Bootstrap color class (used when `type` is not set): `danger`, `warning`, `info`, `primary`, etc. |
| `title` | Auto-set from type | Heading text displayed in the alert. |

**Usage:**

```markdown
{{</* alert type="info" title="Heads Up" */>}}
This content supports **Markdown** formatting.
{{</* /alert */>}}
```

```markdown
{{</* alert type="warning" */>}}
Proceed with caution.
{{</* /alert */>}}
```

```markdown
{{</* alert color="danger" title="Critical" */>}}
This uses the color parameter instead of type.
{{</* /alert */>}}
```

{{< alert type="info" title="Heads Up" >}}
This content supports **Markdown** formatting.
{{< /alert >}}

### chapterstyle

Wraps content in a styled chapter container. Useful for applying custom CSS to a section of content.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `style` | _(none)_ | Inline CSS style string applied to the container. |

**Usage:**

```markdown
{{</* chapterstyle style="background: #f5f5f5; padding: 1rem;" */>}}
Your styled content here.
{{</* /chapterstyle */>}}
```

### details

Creates a collapsible accordion block using the HTML `<details>` element.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `summary` | _(required)_ | Title text shown in the clickable summary bar. |
| `open` | `false` | Set to `"true"` to expand the block by default. |

**Usage:**

```markdown
{{</* details summary="Click to expand" */>}}
Hidden content revealed on click. Supports **Markdown**.
{{</* /details */>}}
```

```markdown
{{</* details summary="Open by default" open="true" */>}}
This section starts expanded.
{{</* /details */>}}
```

### image

Displays an image with optional caption, alignment, sizing, and click-to-expand modal behavior.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `src` | _(required)_ | Image source URL or relative path. |
| `width` | `100%` | CSS width value. |
| `align` | `center` | Text alignment: `left`, `center`, or `right`. |
| `alt` | `""` | Alt text for accessibility. |
| `title` | `""` | Caption displayed below the image. |
| `radius` | `0%` | CSS border-radius value. |

**Usage:**

```markdown
{{</* image src="./images/diagram.png" alt="Architecture diagram" title="System Overview" width="80%" radius="8px" */>}}
```

### local-video

Embeds an HTML5 video player with playback controls.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `src` | _(required)_ | Video file URL or relative path. |
| `muted` | _(flag)_ | Mutes the video when present. |
| `autoplay` | _(flag)_ | Autoplays the video when present. |
| `loop` | _(flag)_ | Loops the video when present. |

**Usage:**

```markdown
{{</* local-video src="./videos/demo.mp4" autoplay muted loop */>}}
```

### meshery-design-embed

Embeds an interactive [Kanvas](https://kanvas.new/) design visualization into the page.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `src` | _(required)_ | Path to the generated embed JavaScript file. |
| `id` | _(required)_ | Unique embed ID (typically `embedded-design-{designId}`). |
| `size` | `full` | Container size: `full` (80% width) or `half` (50% width). |
| `style` | _(none)_ | Custom inline CSS (overrides `size`). |
| `host` | `https://cloud.layer5.io` | Remote provider hostname. |
| `showOpenLink` | `true` | Whether to show the "Open Design" link. |

**Usage:**

```markdown
{{</* meshery-design-embed src="./embed.js" id="embedded-design-abc123" size="full" */>}}
```

### pageinfo

Creates a styled information box.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `color` | `primary` | Color class for styling. |

**Usage:**

```markdown
{{</* pageinfo color="info" */>}}
General information about this section.
{{</* /pageinfo */>}}
```

### svg

Loads and inlines an SVG file from the theme's `assets/icons/` directory.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `name` | _(required)_ | SVG filename without the `.svg` extension. |

**Usage:**

```markdown
{{</* svg name="logo" */>}}
```

### version

Displays a colored text span, typically used for version identifiers.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `color` | _(required)_ | CSS color value for the text. |

**Usage:**

```markdown
{{</* version color="green" */>}}v2.1.0{{</* /version */>}}
```

### lab-intro

Stores inner content as a lab introduction for use by the lab page template. This shortcode does not render output directly; instead, it passes content to the rendering pipeline.

**Usage:**

```markdown
{{</* lab-intro */>}}
Welcome to this hands-on lab. You will learn to deploy a microservice.
{{</* /lab-intro */>}}
```

### csvtable

Generates a permissions table from a CSV data file, grouped by category. Reads from `static/data/csv/keys-backup.csv`. Used internally for permissions documentation.

**Parameters:** None.

### csvtable-roles

Generates a role-based permissions table from a CSV data file. Filters and groups data by role type and links to relevant role documentation pages. Used internally for roles documentation.

**Parameters:** None.

### usestatic

{{< alert type="warning" title="Deprecated" >}}
This shortcode is deprecated and should not be used in new content.
{{< /alert >}}

Resolves the path to a static asset within the current tenant's UUID scope.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| _(positional)_ | _(required)_ | Path to the static asset. |

**Usage:**

```markdown
{{</* usestatic "images/logo.png" */>}}
```

**Output:** `/{tenant-uuid}/images/logo.png`

## Docsy Theme Shortcodes

These shortcodes are provided by the [Docsy](https://www.docsy.dev/) theme. The Academy theme inherits them through Hugo module imports. For full details, see the [Docsy shortcodes documentation](https://www.docsy.dev/docs/adding-content/shortcodes/).

### tabpane / tab

Creates tabbed content panels. Tabs can contain text or code blocks.

**Parameters (tabpane):**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `text` | `false` | Set to `true` for text content (disables code highlighting). |
| `langEqualsHeader` | `false` | Use tab header as the code language. |
| `persistLang` | `true` | Remember selected tab across page loads. |
| `right` | `false` | Right-align tabs. |

**Parameters (tab):**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `name` | _(required)_ | Tab header text. |
| `codelang` | `""` | Language for syntax highlighting. |
| `disabled` | `false` | Disables the tab. |

**Usage:**

```markdown
{{</* tabpane text=true */>}}
{{</* tab name="Linux" */>}}
Run: `sudo apt install meshery`
{{</* /tab */>}}
{{</* tab name="macOS" */>}}
Run: `brew install meshery`
{{</* /tab */>}}
{{</* /tabpane */>}}
```

### card / cardpane

Displays content in Bootstrap-style cards. Use `cardpane` to group multiple cards.

**Parameters (card):**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `header` | _(none)_ | Card header text. |
| `title` | _(none)_ | Card title. |
| `subtitle` | _(none)_ | Card subtitle. |
| `footer` | _(none)_ | Card footer text. |
| `code` | `false` | Set to `true` to enable syntax highlighting for inner content. |

**Usage:**

```markdown
{{</* cardpane */>}}
{{</* card header="Step 1" */>}}
Install the prerequisites.
{{</* /card */>}}
{{</* card header="Step 2" */>}}
Configure your environment.
{{</* /card */>}}
{{</* /cardpane */>}}
```

### readfile

Reads and displays the contents of an external file, with optional syntax highlighting.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `file` | _(required)_ | Path to the file (relative to the page or site root). |
| `code` | `true` | Wrap output in a code block. |
| `lang` | `""` | Language for syntax highlighting. |

**Usage:**

```markdown
{{</* readfile file="config.yaml" code=true lang="yaml" */>}}
```

### imgproc

Processes images using Hugo's built-in image pipeline (resize, crop, fit, fill).

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| _(positional 1)_ | _(required)_ | Image filename (page resource). |
| _(positional 2)_ | _(required)_ | Processing command: `Resize`, `Fit`, `Fill`, or `Crop`. |
| _(positional 3)_ | _(required)_ | Processing options (e.g., `400x400`). |

**Usage:**

```markdown
{{</* imgproc "hero.jpg" Resize "800x" */>}}
Optional caption text.
{{</* /imgproc */>}}
```

### iframe

Embeds external content via an iframe with configurable options.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `src` | _(required)_ | URL to embed. |
| `width` | `100%` | Iframe width. |
| `tryautoheight` | `true` | Attempt to auto-size the iframe height. |
| `sandbox` | `""` | Sandbox attribute for security restrictions. |

**Usage:**

```markdown
{{</* iframe src="https://example.com/embed" width="100%" */>}}
```

### swaggerui

Embeds a Swagger UI instance for interactive API documentation.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `src` | _(required)_ | Path to the OpenAPI/Swagger JSON or YAML spec file. |

**Usage:**

```markdown
{{</* swaggerui src="/api/openapi.yaml" */>}}
```

### redoc

Renders API documentation using [ReDoc](https://github.com/Redocly/redoc).

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `src` | _(required)_ | URL or path to the OpenAPI spec file. |

**Usage:**

```markdown
{{</* redoc src="/api/openapi.yaml" */>}}
```

### comment

Comments out a block of content so it is not rendered in the output.

**Usage:**

```markdown
{{</* comment */>}}
This content will not appear in the rendered page.
{{</* /comment */>}}
```

### conditional-text

Shows or hides content based on a build condition defined in the site configuration.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `include-if` | _(required)_ | Condition name from site config to evaluate. |

**Usage:**

```markdown
{{</* conditional-text include-if="defined-condition" */>}}
This text only appears when the condition is met.
{{</* /conditional-text */>}}
```

### blocks/section

Creates a full-width page section with optional color and height.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `color` | _(none)_ | Section background color: `primary`, `secondary`, `info`, `warning`, `danger`, `light`, `dark`, `white`. |
| `height` | _(none)_ | Section height: `auto`, `min`, `med`, `max`, `full`. |
| `type` | `section` | Section type. |

### blocks/lead

Creates a lead paragraph section for introductory content.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `color` | _(none)_ | Background color. |
| `height` | `auto` | Section height. |

### blocks/cover

Creates a cover/hero section with a background image.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `image_anchor` | `smart` | Image crop anchor point. |
| `height` | _(none)_ | Section height: `auto`, `min`, `med`, `max`, `full`. |
| `color` | _(none)_ | Overlay color. |
| `title` | _(none)_ | Cover title. |
| `subtitle` | _(none)_ | Cover subtitle. |
| `logo` | _(none)_ | Path to a logo image. |
| `byline` | _(none)_ | Byline text. |

### blocks/feature

Creates a feature highlight box with an icon, typically used in groups of three.

**Parameters:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `title` | _(required)_ | Feature title. |
| `url` | _(none)_ | Link URL. |
| `url_text` | _(none)_ | Link text. |
| `icon` | _(none)_ | Font Awesome icon name (e.g., `fa-cogs`). |

### blocks/link-down

Creates a downward navigation arrow that scrolls to the next section. Must be nested inside another block shortcode.

**Parameters:** None.

## Hugo Built-in Shortcodes

These shortcodes are included with Hugo itself and are always available. For full details, see the [Hugo shortcodes documentation](https://gohugo.io/content-management/shortcodes/).

### figure

Renders an HTML `<figure>` element with an image and optional caption, link, and attributes.

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| `src` | Image URL. |
| `link` | URL the image links to. |
| `target` | Link target attribute. |
| `rel` | Link rel attribute. |
| `alt` | Alt text. |
| `title` | Image title. |
| `caption` | Figure caption (supports Markdown). |
| `class` | CSS class for the `<figure>` element. |
| `height` | Image height. |
| `width` | Image width. |
| `attr` | Attribution text. |
| `attrlink` | Attribution link URL. |

**Usage:**

```markdown
{{</* figure src="./images/overview.png" title="System Architecture" caption="High-level view of the platform." */>}}
```

### gist

Embeds a GitHub Gist.

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| _(positional 1)_ | GitHub username. |
| _(positional 2)_ | Gist ID. |
| _(positional 3)_ | _(optional)_ Filename to display from a multi-file gist. |

**Usage:**

```markdown
{{</* gist "username" "gist-id" */>}}
```

### highlight

Renders code with syntax highlighting. Equivalent to fenced code blocks but with more control.

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| _(positional 1)_ | Language for syntax highlighting. |
| `linenos` | Show line numbers (`true`, `false`, `table`, `inline`). |
| `hl_lines` | Lines to highlight (e.g., `"3-5 8"`). |
| `linenostart` | Starting line number. |

**Usage:**

```markdown
{{</* highlight go "linenos=table,hl_lines=3" */>}}
func main() {
    fmt.Println("Hello")
    fmt.Println("Highlighted line")
}
{{</* /highlight */>}}
```

### param

Outputs a site or page parameter value.

**Usage:**

```markdown
{{</* param "description" */>}}
```

### ref / relref

Creates absolute (`ref`) or relative (`relref`) permalinks to other pages.

**Usage:**

```markdown
[Link text]({{</* ref "/cloud/academy" */>}})
[Relative link]({{</* relref "extending-the-academy" */>}})
```

### youtube

Embeds a YouTube video.

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| _(positional 1)_ or `id` | YouTube video ID. |
| `title` | Accessible title for the iframe. |
| `loading` | Loading behavior (`eager` or `lazy`). |

**Usage:**

```markdown
{{</* youtube "dQw4w9WgXcQ" */>}}
```

### vimeo

Embeds a Vimeo video.

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| _(positional 1)_ or `id` | Vimeo video ID. |
| `title` | Accessible title for the iframe. |

**Usage:**

```markdown
{{</* vimeo "12345678" */>}}
```
