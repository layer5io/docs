# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Building the site locally

`hugo` alone fails with `binary with name "postcss" not found in PATH`. Run `npm install`
once, then build with the local binaries on PATH:

    npm install
    PATH="$PWD/node_modules/.bin:$PATH" hugo -d <outdir>

`npm run build` (see `package.json` scripts) does the same via the pinned Hugo.

## Keeping old URLs alive

When a page moves or an external system links to a URL this site no longer serves, add the
dead path to the page's `aliases:` front matter rather than leaving a 404 - Hugo emits a
redirect stub for each one. `content/en/kanvas/operator/_index.md` and
`content/en/kanvas/operator/views/index.md` are the working examples. Verify after a build
by checking the generated `<outdir>/<dead-path>/index.html` for the `url=` refresh target.

Heading anchors are linked from outside this repo too, so renaming a heading silently breaks
those links. Goldmark heading attributes are enabled: keep the old anchor by writing
`### New Wording {#old-anchor-slug}`. To prove no anchor was lost, build master and your branch
to separate directories and diff the `id=` attributes of every `<h1>`-`<h6>` across both trees;
`content/en/cloud/academy/creating-content/building-certifications/index.md` is a worked example.

## Appending to a page bundle

Several `index.md` files end without a trailing newline, and some end inside a raw HTML
block. Appending a Markdown heading directly after a closing `</div>` leaves it unparsed and
rendered as literal `## text`. Always leave a blank line between raw HTML and following
Markdown, and check the built HTML for the heading's `id=` anchor.

A literal backslash inside inline HTML is a related trap: Goldmark reads the `\<` in
`<button>\</button>` as an escaped `<` and the tag never closes. Write the key as `&#92;`
(`content/en/kanvas/reference/keyboard-shortcuts.md` is the worked example) and confirm the
built HTML, not the source, before committing.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
