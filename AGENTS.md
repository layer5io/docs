# Project agent memory

This file is the project's committed home for durable agent guidance: build,
authoring, architecture, and sharp-edge notes that should travel with the code.

- Add only repository-wide guidance that will help future agents.
- Prefer rewriting or pruning existing entries over appending new ones.

## What this repository documents

- **Layer5 Cloud**: the Layer5 control plane, identity provider, catalog, and
  tenancy surface.
Cloud docs cover organizations, workspaces, identity and access, self-hosting,
guides, tutorials, reference material, and Academy content.
- **Kanvas**: Layer5's collaborative infrastructure design and operations
  product. Kanvas docs
cover Designer, Operator, tasks, tutorials, reference material, and advanced
topics.
- **Videos**: a dedicated video information architecture under
  `content/en/videos/` with its own
layouts, category/subcategory navigation, and related-video behavior. Treat it
as a first-class docs surface, not an afterthought or a dump of embeds.

## Diátaxis is the content model

This repo uses **Diátaxis** (<https://diataxis.fr/>). Every page should
primarily serve one user need, and its structure should match that quadrant.

- **Tutorials** teach by doing. They are learning-oriented, guided, sequential,
  and outcome-first.
- **How-to guides** solve a known problem. They are task-oriented, goal-driven,
  and pragmatic.
- **Reference** provides facts. It should be structured, exhaustive where
  needed, and low-opinion.
- **Explanation** builds understanding. It should give context, rationale,
  trade-offs, and models.

Rules:

- Choose one dominant quadrant per page before editing.
- Do not mix a tutorial's hand-holding with a reference page's exhaustive option
  dump.
- Use front matter, headings, examples, and related links to reinforce the
  page's quadrant.
- When a subject needs multiple quadrants, create or link multiple pages instead
  of forcing one
page to do everything.

## Relevant skills and helpers

- **gh-axi**: GitHub operations, especially PRs, issues, reviews, and Actions/CI
  inspection.
- **chrome-devtools-axi**: browser-based validation for rendered docs,
  interaction flows, and UI.
- **lavish**: turn plans, audits, and comparisons into reviewable visual
  artifacts when helpful.
- **merge-branch**: update a shallow task branch from its base when normal git
  merge/rebase fails.
- **customize-cloud-agent**: edit Copilot cloud-agent setup when the task is
  about the agent env.
- **quota-axi**: check local provider quota windows before spending scarce model
  capacity.
- **documentation specialist**: use a docs-focused agent or reviewer when a task
  is primarily an
information-architecture or large prose-quality rewrite.

## Hugo authoring rules

- **Shortcodes are the author-facing reuse surface.** Prefer an existing
  shortcode over raw HTML
when one already expresses the pattern.
- **Partials are layout internals.** Edit them for site-wide behavior, not for
  one page's local
formatting need.
- Preserve accessibility: meaningful alt text, semantic headings, keyboard
  behavior, and visible
labels.
- Prefer data-driven sources over hardcoded duplication when a template already
  reads from data,
front matter, or OpenAPI.
- Keep scripts and inline styles out of Markdown unless the existing pattern
  explicitly requires
them.

## Shortcodes in `layouts/shortcodes/`

- **`alert.html`**: standard admonition box. Use `{{< alert >}}`, not `%`, for
  Markdown bodies;
prefer the built-in types (`danger`, `info`, `warning`, `note`, success/default)
instead of ad-hoc HTML callouts.
- **`csvtable.html`**: renders Cloud permission matrices from
  `static/data/csv/keys.csv`. Update
the source CSV or linked role docs, not the generated table markup in content
pages.
- **`csvtable-roles.html`**: renders role-specific permission tables from the
  same CSV source.
Keep role/category names aligned with the CSV headers and role URLs.
- **`custom-org-shortcode.html`**: Academy/example shortcode for
  organization-specific custom
content. Do not use it for general docs unless the task is explicitly about
Academy extensibility.
- **`ecosystem-box.html`**: ecosystem callout box used on landing pages to
  relate Cloud and Kanvas.
Supply a valid `ref` target when linking, use concise inner copy, and avoid
self-links.
- **`local-video.html`**: embeds a local video asset. Use only for locally
  hosted media and set
autoplay/muted/loop deliberately.
- **`meshery-design-embed.html`**: embeds exported Kanvas designs. Use
  trusted/local script assets,
stable IDs, and verify the rendered embed plus the generated "Open Design" link
after building.
- **`pageinfo.html`**: section intro callout. Use the `%` form (`{{% pageinfo
  %}}`) so inner
Markdown renders correctly, and keep the content brief and high-signal.
- **`static.html`**: returns a relURL for files under `static/`. Use it only for
  assets that
physically live under `static/`, never for page-bundle assets under `content/`.
- **`styled-callout.html`**: Academy/example custom callout. Prefer `alert` for
  main docs unless
matching an established Academy styling pattern.
- **`svg.html`**: inlines SVGs from `assets/icons/`. Use only for trusted local
  icons and prefer a
normal image element when descriptive alt text matters.
- **`version.html`**: simple inline version/color wrapper. Use sparingly for
  reused version tokens
or version-specific callouts; do not introduce decorative color-only meaning.

## Partials in `layouts/partials/`

### Global page chrome

- **`breadcrumb.html`**: recursive breadcrumb trail. Preserve hierarchy and
  `aria-current`.
- **`favicon.html`**: site favicon and platform icon declarations. Keep asset
  paths and metadata in
sync.
- **`footer.html`**: global footer, social links, newsletter form, and
  status/edit links. Any edit
here is site-wide.
- **`head-css.html`**: SCSS pipeline and PostCSS/fingerprinting. Preserve the
  production/development
split and do not bypass the asset pipeline.
- **`head.html`**: page metadata, robots rules, OG/Twitter tags, search CSS, and
  head hooks.
Maintain SEO, preview, and accessibility metadata.
- **`hotkey.html`**: search hotkey and placeholder behavior. Keep it aligned
  with the search-input
partials.
- **`navbar-version-selector.html`**: version menu helper. Preserve
  relative-link behavior.
- **`navbar.html`**: primary navigation, resources menu, product switcher,
  sign-in/avatar entry,
and navbar search. Keep labels, links, and accessibility states coherent.
- **`page-meta-links.html`**: "edit this page", "create issue", project issue,
  and print links.
Keep repository path resolution correct.
- **`pager.html`**: previous/next page navigation based on weighted section
  order. Preserve the
section traversal logic.
- **`search-input-nav.html`** and **`search-input.html`**: site search UIs for
  navbar and page
layouts. Configure only one search backend at a time and keep IDs/hotkeys
coordinated.

### Layout and interaction utilities

- **`image-modal.html`**: site-wide image lightbox. By default, images open in
  the modal; add
`data-modal="false"` on logos, icons, and images that should not expand.
- **`kanvas-corner-popup.html`**: homepage/product promotional popup for Kanvas.
  Treat as marketing
UI with accessibility and motion sensitivity in mind.
- **`resizable-start.html`**, **`resizable-end.html`**,
  **`resizable-head-script.html`**, and
**`resizable-script.html`**: paired resizable-pane helpers for docs/video
layouts. Keep the wrappers paired, preserve unique storage keys, and do not
break first-paint width restoration.

### Data-driven product/context helpers

- **`feature-info.html`**: shows Cloud feature/subscription tiers for the
  current page using
`data/feature_data.json`. Update data first; do not hardcode pricing/support
statements in page bodies when this partial already covers them.
- **`plan-info.html`**: plan entitlement callout used on plan pages. Keep
  pricing-plan messaging
aligned with Layer5's current plans.
- **`recent-discussions.html`**: Kanvas discussion feed. Keep it Kanvas-scoped
  unless the data
source intentionally broadens.
- **`related-reading.html`**: related-page list based on Hugo related content
  plus taxonomy
fallback. Prefer metadata quality over hand-curated duplication.

### Video-system partials

- **`video-category-navigation.html`**: maps video section paths to
  category/subcategory hashes.
Preserve stable hash behavior so deep links keep working.
- **`video-landing-page.html`**: the videos home experience, including tabs,
  grids, thumbnails, and
modal playback. Keep required front matter (`videoId`, `videoType`, `thumbnail`,
`duration`, tags/categories) consistent with the template logic.
- **`video-section-index.html`**: section/subsection listings, including
  `videoGrid` behavior.
Respect `simple_list`, `no_list`, and manual-link front matter.
- **`video-section-related.html`**: related-video carousel built from shared
  tags/categories while
deduplicating by `videoId`. Keep taxonomy metadata tidy to improve relevance.

### REST API partials

- **`rest-apis/spec.html`**: loads `data/openapi.yml`. Keep the spec
  authoritative and buildable.
- **`rest-apis/viewer.html`**: full REST API renderer for docs pages. Prefer
  improving the spec or
helper partials over hardcoding API details in prose.
- **`rest-apis/is-operation-included.html`**: filters operations by `x-internal`
  audience values.
Preserve the audience contract.
- **`rest-apis/auth-summary.html`**: turns operation security metadata into
  human-readable auth
summaries.
- **`rest-apis/content-example.html`**: extracts an example payload from
  content/example metadata.
- **`rest-apis/schema-source.html`**: resolves `$ref`, `allOf`, and array item
  schemas.
- **`rest-apis/schema-type.html`**: renders friendly schema type labels from
  resolved schemas.
- **`rest-apis/schema-properties.html`**: returns ordered property rows for
  schema tables.
- **`rest-apis/tag-meta.html`** and **`rest-apis/tag-subsection-meta.html`**:
  normalize tag labels
and subsection labels for the viewer.

## Building the site locally

`hugo` alone fails with `binary with name "postcss" not found in PATH`. Run `npm
install` once, then build with the local binaries on PATH:

    npm install
    PATH="$PWD/node_modules/.bin:$PATH" hugo -d <outdir>

`npm run build` (see the `scripts` section in `package.json`) does the same via
the pinned Hugo. `npm run lint` runs the Markdown linter.

## Keeping old URLs alive

When a page moves or an external system links to a URL this site no longer
serves, add the dead path to the page's `aliases:` front matter rather than
leaving a 404 - Hugo emits a redirect stub for each one.
`content/en/kanvas/operator/_index.md` and
`content/en/kanvas/operator/views/index.md` are the working examples. Verify
after a build by checking the generated `<outdir>/<dead-path>/index.html` for
the `url=` refresh target.

Heading anchors are linked from outside this repo too, so renaming a heading
silently breaks those links. The Layer5 Cloud UI hardcodes some of them:
`MAIL_DOCS_URL` in meshery-cloud's
`ui/components/identity/org-management/org-smtp-tab.tsx` points every "Learn
more" link on the Email tab at
`/cloud/guides/organizations/org-management/#configuring-your-own-mail-server`.
Grep meshery-cloud's `ui/` for `docs.layer5.io` before renaming a heading on a
cloud guide. Goldmark heading attributes are enabled: keep the old anchor by
writing `### New Wording {#old-anchor-slug}`. To prove no anchor was lost, build
master and your branch to separate directories and diff the `id=` attributes of
every `<h1>`-`<h6>` across both trees;
`content/en/cloud/academy/creating-content/building-certifications/index.md` is
a worked example.

## Appending to a page bundle

Several `index.md` files end without a trailing newline, and some end inside a
raw HTML block. Appending a Markdown heading directly after a closing `</div>`
leaves it unparsed and rendered as literal `## text`. Always leave a blank line
between raw HTML and following Markdown, and check the built HTML for the
heading's `id=` anchor.

A literal backslash inside inline HTML is a related trap: Goldmark reads the
`\\<` in `<button>\\</button>` as an escaped `<` and the tag never closes. Write
the key as `&#92;` (`content/en/kanvas/reference/keyboard-shortcuts.md` is the
worked example) and confirm the built HTML, not the source, before committing.

## Documenting Layer5 Cloud behavior

The Cloud guides describe a product that lives in `meshery-cloud`, so every
product claim is verified against `origin/master` there, never against a
summary. Start from the UI and handler code that owns the feature you are
documenting. For organization-management docs specifically, the screen strings
are in `ui/components/identity/org-management/`, and the behavior behind them
is in `server/handlers/`.

That repo's own `docs/reference/` and `docs/runbooks/` are the best starting
point but are not the arbiter - they have described behavior the handlers do not
implement. Confirm a capability has a producer in the Go or TSX before writing
it up: a contract enum member or a runbook sentence is not proof the feature
ships.

`meshery-cloud` is a private repository, so never link one of its pull
requests, issues, or files from published docs content - the link 404s for
readers of docs.layer5.io. Cite the released version instead (`v1.0.253`),
which an operator can check against their own deployment. Private repository
references are still acceptable in commit messages and in the docs pull request
discussion, where the reviewer audience can open them.

Behavior can also disagree with `data/openapi.yml`. The server is the arbiter
for what a response looks like: that file declares `401` as `text/plain` on
every route, while any handler behind `AuthorizationMiddlewareForAdmin` answers
`echo.NewHTTPError`, which Echo serializes as JSON. Document what the handler
sends and flag the specification when they disagree.

## Maintaining this file

Keep this file concise and future-focused. Do not restate obvious codebase facts
unless they save future agents from a known mistake.
