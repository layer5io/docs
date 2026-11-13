# Vision

Layer5 Docs exists to give users and contributors a trustworthy path through Layer5 products and their public developer resources.
It publishes the documentation at `docs.layer5.io`, with first-party Cloud and Kanvas content in this repository and clear routes to canonical documentation for projects such as Meshery and Nighthawk.
It owns the public documentation contract for the content maintained here. For Layer5 Cloud content, the implementation remains the authority for what the software actually does.

## Shipped behavior is the source of truth

Layer5 Docs documents behavior that can be verified in the relevant implementation or released product.
When repository reference material disagrees with shipped behavior, documentation follows the implementation and flags the mismatch instead of repeating it.
For Layer5 Cloud, behavior claims are checked against the handlers and UI that produce the behavior, not only against secondary descriptions.
Private implementation repositories are evidence for maintainers, not public destinations for readers; public pages cite released versions or other reader-accessible references instead.
Release-note automation tracks released Cloud and Kanvas versions so version history remains tied to published artifacts.

## Public links are compatibility contracts

Published URLs and heading anchors are treated as interfaces because product UIs, external sites, bookmarks, and existing documentation can link to them.
When a page moves, its previous path is preserved with Hugo aliases rather than being allowed to become a 404.
When an externally referenced heading is renamed, its established anchor is retained explicitly.
Redirects and anchors are verified from built output so source changes are not considered safe merely because the Markdown looks correct.
Documentation restructuring should improve navigation without silently invalidating known entry points.

## Information architecture serves distinct user journeys

Layer5 Docs organizes content for readers with different goals and experience levels, including beginners, developers, administrators, operators, security specialists, and contributors.
The documentation separates task guidance, concepts, tutorials, and reference material so readers can move from learning a product to operating and extending it.
The site acts as a Layer5 documentation entry point while directing readers to canonical project documentation when that material is maintained elsewhere.
Content should favor clear task outcomes and product-specific terminology over generic prose that could belong to any documentation site.

## Documentation changes are reproducible and reviewable

Layer5 Docs is built with Hugo and Docsy, with the published content rooted in `content/en` and repository configuration defining the site.
Contributors can build and preview changes locally before review, and pull requests that affect documentation are built by the docs-preview workflow.
Documentation work follows the repository's issue-first contribution flow so planned changes remain visible and can be continued by other contributors.
Changes should preserve the repository's DCO, review, build, and contribution requirements rather than bypassing them for documentation-only work.

## Scope

Layer5 Docs is not the authority for product behavior when the relevant implementation says otherwise.
Layer5 Docs does not publish links to private implementation artifacts as reader-facing evidence.
Layer5 Docs does not knowingly break established public URLs or heading anchors when compatible redirects or explicit anchors can preserve them.
Layer5 Docs does not present planned or inferred behavior as shipped behavior without clearly identifying its status.
Layer5 Docs does not duplicate another project's canonical documentation merely to make this repository appear self-contained when a maintained canonical destination already exists.

A change aligns when it makes product behavior more accurate, preserves public link compatibility, improves a real reader journey, or strengthens reproducible review and validation.
A change should be resisted when it relies on stale secondary descriptions over implementation evidence, exposes inaccessible references, breaks known URLs or anchors without compatibility handling, or adds generic documentation without a clear Layer5-specific purpose.
