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
those links. The Layer5 Cloud UI hardcodes some of them: `MAIL_DOCS_URL` in
meshery-cloud's `ui/components/identity/org-management/org-smtp-tab.tsx` points every
"Learn more" link on the Email tab at
`/cloud/guides/organizations/org-management/#configuring-your-own-mail-server`. Grep
meshery-cloud's `ui/` for `docs.layer5.io` before renaming a heading on a cloud guide. Goldmark heading attributes are enabled: keep the old anchor by writing
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

## Documenting Layer5 Cloud behavior

The cloud guides describe a product that lives in `meshery-cloud`, so every product claim is
verified against `origin/master` there, never against a summary. The screen strings are in
`ui/components/identity/org-management/`; the behavior behind them is in `server/handlers/`.

That repo's own `docs/reference/` and `docs/runbooks/` are the best starting point but are not
the arbiter - they have described behavior the handlers do not implement. Confirm a capability
has a producer in the Go or TSX before writing it up: a contract enum member or a runbook
sentence is not proof the feature ships.

`meshery-cloud` is a PRIVATE repository, so never link one of its pull requests, issues or
files from a content page - the link 404s for every reader of docs.layer5.io. Cite the released
version instead (`v1.0.253`), which an operator can check against their own deployment, and keep
the pull-request reference in the commit message and the docs pull request, where the audience
can open it.

Behavior can also disagree with `data/openapi.yml`. The server is the arbiter for what a
response looks like: that file declares `401` as `text/plain` on every route, while any handler
behind `AuthorizationMiddlewareForAdmin` answers `echo.NewHTTPError`, which echo serializes as
JSON. Document what the handler sends and flag the specification.

## Worktrees and landing a change

- **Work in a treehouse worktree, never in the main clone.** Other agent sessions and the
  no-mistakes pipeline share the main clone. Take a worktree with
  `treehouse get --lease -b <branch>` (it prints the path; `--base <branch>` starts it from
  another branch), work there, and release it with `treehouse return <path>` once the change
  has merged. `treehouse status` lists the pool. Never make one with `git worktree add` or a
  second clone.
- **Land every change through no-mistakes, at most three runs per pull request.** Commit in
  the worktree, then run `no-mistakes axi run --intent "<goal>"` (a clone without a
  `no-mistakes` remote needs `no-mistakes init` once). `no-mistakes axi status` shows the step
  and its findings, and `no-mistakes axi respond` answers a review gate. The pipeline reviews,
  tests, pushes and opens the pull request. After the third run, merge the pull request as it
  stands and open an issue for anything still flagged. A run that stopped on a usage limit
  counts; one cancelled before it did anything does not.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
