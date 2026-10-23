# Layer5 Docs Vision Evidence Sheet

This document provides claim-by-claim traceability for `VISION.md` to concrete evidence in `layer5io/docs` and, where product behavior is concerned, to the repository guidance that defines which downstream implementation is authoritative.

---

## Identity and purpose

* **Claim**: "Layer5 Docs exists to give users and contributors a trustworthy path through Layer5 products and their public developer resources."
  * **Evidence**: `README.md` describes `docs.layer5.io` as documentation and developer resources for Layer5 products and explicitly welcomes contributions.
* **Claim**: "It publishes the documentation at `docs.layer5.io`, with first-party Cloud and Kanvas content in this repository and clear routes to canonical documentation for projects such as Meshery and Nighthawk."
  * **Evidence**: `package.json` identifies the project as "Layer5 Product Documentation" with homepage `https://docs.layer5.io`; `content/en/_index.md` links to Cloud Docs and Kanvas Docs in this site, and links readers to `docs.meshery.io` and `getnighthawk.dev`.
* **Claim**: "It owns the public documentation contract for the content maintained here. For Layer5 Cloud content, the implementation remains the authority for what the software actually does."
  * **Evidence**: `AGENTS.md` states that Layer5 Cloud behavior must be verified against `meshery-cloud` implementation and that server behavior is the arbiter when documentation or API descriptions disagree.

---

## Principle 1: Shipped behavior is the source of truth

* **Claim**: "Layer5 Docs documents behavior that can be verified in the relevant implementation or released product."
  * **Evidence**: `AGENTS.md`, "Documenting Layer5 Cloud behavior", requires product claims to be verified against `origin/master` in `meshery-cloud`.
* **Claim**: "When repository reference material disagrees with shipped behavior, documentation follows the implementation and flags the mismatch instead of repeating it."
  * **Evidence**: `AGENTS.md` says repository reference material is a starting point rather than the arbiter and requires contributors to document handler responses and flag the `data/openapi.yml` mismatch.
* **Claim**: "For Layer5 Cloud, behavior claims are checked against the handlers and UI that produce the behavior, not only against secondary descriptions."
  * **Evidence**: `AGENTS.md` points contributors to `ui/components/identity/org-management/` for screen strings and `server/handlers/` for behavior.
* **Claim**: "Private implementation repositories are evidence for maintainers, not public destinations for readers; public pages cite released versions or other reader-accessible references instead."
  * **Evidence**: `AGENTS.md` explicitly prohibits linking private `meshery-cloud` pull requests, issues, or files from public content and directs contributors to cite released versions instead.
* **Claim**: "Release-note automation tracks released Cloud and Kanvas versions so version history remains tied to published artifacts."
  * **Evidence**: `.github/workflows/cloud-release-docs.yml` retrieves the latest `meshery-cloud` release and writes Cloud release notes. `.github/workflows/meshery-extension-release-docs.yml` does the same for Kanvas releases from `meshery-extensions-packages`.

---

## Principle 2: Public links are compatibility contracts

* **Claim**: "Published URLs and heading anchors are treated as interfaces because product UIs, external sites, bookmarks, and existing documentation can link to them."
  * **Evidence**: `AGENTS.md`, "Keeping old URLs alive", records both external URL dependencies and a concrete Layer5 Cloud UI dependency on a heading anchor at `docs.layer5.io`.
* **Claim**: "When a page moves, its previous path is preserved with Hugo aliases rather than being allowed to become a 404."
  * **Evidence**: `AGENTS.md` requires dead paths to be added to `aliases:`; working examples include `content/en/kanvas/operator/_index.md` and `content/en/kanvas/operator/views/index.md`. Alias usage is also present throughout the Kanvas and Cloud sections.
* **Claim**: "When an externally referenced heading is renamed, its established anchor is retained explicitly."
  * **Evidence**: `AGENTS.md` directs contributors to preserve old anchors with Goldmark heading attributes. `hugo.toml` enables Goldmark parser attributes.
* **Claim**: "Redirects and anchors are verified from built output so source changes are not considered safe merely because the Markdown looks correct."
  * **Evidence**: `AGENTS.md` instructs contributors to verify generated redirect stubs and compare built heading IDs between master and a change branch.
* **Claim**: "Documentation restructuring should improve navigation without silently invalidating known entry points."
  * **Evidence**: The alias and preserved-anchor requirements in `AGENTS.md` establish backward-compatible navigation as a repository maintenance rule.

---

## Principle 3: Information architecture serves distinct user journeys

* **Claim**: "Layer5 Docs organizes content for readers with different goals and experience levels, including beginners, developers, administrators, operators, security specialists, and contributors."
  * **Evidence**: `README.md`, "Documentation Structure", explicitly lists these personas and states a goal of comprehensive, organized, and accessible documentation for audiences from new users to expert contributors.
* **Claim**: "The documentation separates task guidance, concepts, tutorials, and reference material so readers can move from learning a product to operating and extending it."
  * **Evidence**: `README.md` documents the Cloud and Kanvas information architecture with Getting Started, Concepts, Tutorials or Core Tasks, and Reference sections.
* **Claim**: "The site acts as a Layer5 documentation entry point while directing readers to canonical project documentation when that material is maintained elsewhere."
  * **Evidence**: `content/en/_index.md` presents Cloud Docs and Kanvas Docs locally while linking Meshery Docs to `docs.meshery.io` and Nighthawk Docs to `getnighthawk.dev`.
* **Claim**: "Content should favor clear task outcomes and product-specific terminology over generic prose that could belong to any documentation site."
  * **Evidence**: `README.md` defines product-specific information architectures and task categories for Layer5 Cloud and Kanvas; issue #1272 also sets the quality bar that repository vision content must not be generic.

---

## Principle 4: Documentation changes are reproducible and reviewable

* **Claim**: "Layer5 Docs is built with Hugo and Docsy, with the published content rooted in `content/en` and repository configuration defining the site."
  * **Evidence**: `CONTRIBUTING.md` states that Layer5 documentation is built with Hugo and the Docsy theme. `hugo.toml` sets `contentDir = "content/en"` and imports Docsy.
* **Claim**: "Contributors can build and preview changes locally before review, and pull requests that affect documentation are built by the docs-preview workflow."
  * **Evidence**: `README.md` and `CONTRIBUTING.md` document local setup and site commands. `package.json` defines build and preview scripts. `.github/workflows/build-docs-preview.yml` builds PR previews for documentation-related changes.
* **Claim**: "Documentation work follows the repository's issue-first contribution flow so planned changes remain visible and can be continued by other contributors."
  * **Evidence**: `CONTRIBUTING.md` says all pull requests should reference an open issue and tells contributors to create a new issue when needed.
* **Claim**: "Changes should preserve the repository's DCO, review, build, and contribution requirements rather than bypassing them for documentation-only work."
  * **Evidence**: `CONTRIBUTING.md` requires DCO sign-off for each commit, documents local tests and preview steps, and describes the fork-and-pull-request review flow.

---

## Scope and non-goals

* **Claim**: "Layer5 Docs is not the authority for product behavior when the relevant implementation says otherwise."
  * **Evidence**: `AGENTS.md` identifies implementation handlers as the arbiter for behavior.
* **Claim**: "Layer5 Docs does not publish links to private implementation artifacts as reader-facing evidence."
  * **Evidence**: `AGENTS.md` explicitly prohibits public content from linking private `meshery-cloud` pull requests, issues, or files.
* **Claim**: "Layer5 Docs does not knowingly break established public URLs or heading anchors when compatible redirects or explicit anchors can preserve them."
  * **Evidence**: `AGENTS.md` requires aliases for moved pages and preserved IDs for externally referenced headings.
* **Claim**: "Layer5 Docs does not present planned or inferred behavior as shipped behavior without clearly identifying its status."
  * **Evidence**: `AGENTS.md` requires a concrete producer in Go or TSX before documenting a capability as shipped and warns that a contract enum or runbook sentence alone is not proof.
* **Claim**: "Layer5 Docs does not duplicate another project's canonical documentation merely to make this repository appear self-contained when a maintained canonical destination already exists."
  * **Evidence**: `content/en/_index.md` deliberately routes Meshery and Nighthawk readers to their separate canonical documentation sites rather than mirroring those docs here.

---

## Alignment and resistance criteria

* **Claim**: "A change aligns when it makes product behavior more accurate, preserves public link compatibility, improves a real reader journey, or strengthens reproducible review and validation."
  * **Evidence**: This summarizes the documented maintenance rules in `AGENTS.md`, information architecture goals in `README.md`, and contribution and validation flow in `CONTRIBUTING.md` and `.github/workflows/build-docs-preview.yml`.
* **Claim**: "A change should be resisted when it relies on stale secondary descriptions over implementation evidence, exposes inaccessible references, breaks known URLs or anchors without compatibility handling, or adds generic documentation without a clear Layer5-specific purpose."
  * **Evidence**: `AGENTS.md` covers source authority, private links, URL and anchor preservation; issue #1272 establishes the repository-specific quality bar.
