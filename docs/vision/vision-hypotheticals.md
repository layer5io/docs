# Layer5 Docs Vision Hypotheticals and Calibration Record

This document records ten stress-test scenarios used to calibrate `VISION.md`. Each scenario tests whether the vision gives a clear answer when accuracy, compatibility, information architecture, or contribution process is under pressure.

---

## Hypothetical 1: Document a behavior from a stale runbook

* **Proposal**: Add a Cloud guide based on an internal runbook even though the current server handler behaves differently.
* **Tested Principle**: Shipped behavior is the source of truth.
* **For**: The runbook is easier to read and already describes the intended workflow.
* **Against**: Readers would receive instructions that do not match the product they are using.
* **Verdict**: **RESIST**
* **Reasoning**:
  > "If the handler and the runbook disagree, the guide must follow the shipped handler behavior and record the mismatch rather than publish the easier secondary description."
* **Changelog Impact**: The vision explicitly makes implementation behavior authoritative over summaries, runbooks, and stale reference material.

---

## Hypothetical 2: Link a private implementation pull request from a public guide

* **Proposal**: Cite a private `meshery-cloud` pull request as proof of a Cloud capability because it contains the clearest implementation discussion.
* **Tested Principle**: Shipped behavior is the source of truth and Scope.
* **For**: Maintainers can verify the implementation quickly from the pull request.
* **Against**: Most readers cannot open the private link, so the public documentation would contain unusable evidence.
* **Verdict**: **RESIST**
* **Reasoning**:
  > "Private implementation evidence can inform the maintainer, but the published page must point readers to evidence they can access, such as a released version or public documentation."
* **Changelog Impact**: The vision separates maintainer evidence from reader-facing references.

---

## Hypothetical 3: Rename a heading that a product UI links to

* **Proposal**: Improve a heading title and allow Hugo to generate a new anchor, even though Layer5 Cloud currently links directly to the old anchor.
* **Tested Principle**: Public links are compatibility contracts.
* **For**: The new generated anchor is cleaner and matches the revised wording.
* **Against**: Existing product links would land on the page without reaching the intended section.
* **Verdict**: **RESIST**
* **Reasoning**:
  > "The wording may change, but a known external anchor is part of the public documentation interface. Preserve the old ID explicitly."
* **Changelog Impact**: The vision names heading anchors alongside page URLs as compatibility surfaces.

---

## Hypothetical 4: Move a page and preserve its old URL

* **Proposal**: Reorganize a Kanvas page into a clearer section and keep the previous path in Hugo `aliases:`.
* **Tested Principle**: Public links are compatibility contracts.
* **For**: Readers get a better information architecture without losing bookmarks or inbound links.
* **Against**: The repository carries an additional redirect entry.
* **Verdict**: **ACCEPT**
* **Reasoning**:
  > "A better location is worthwhile when the old route continues to resolve. The alias is the compatibility cost of improving the structure safely."
* **Changelog Impact**: The vision requires compatible redirects when pages move.

---

## Hypothetical 5: Publish documentation for an inferred future capability

* **Proposal**: Document a feature as available because an enum, schema field, or planning document suggests that support is coming soon.
* **Tested Principle**: Shipped behavior is the source of truth and Scope.
* **For**: The documentation could be ready before launch and reduce release-day work.
* **Against**: A declaration or schema entry does not prove the user-facing behavior ships.
* **Verdict**: **RESIST**
* **Reasoning**:
  > "A future or inferred capability must not be written as current product behavior. Verify a producer in the implementation or clearly label the material as non-shipped direction."
* **Changelog Impact**: The scope now rejects presenting planned or inferred behavior as shipped.

---

## Hypothetical 6: Use released versions to support public behavior claims

* **Proposal**: Verify a Cloud behavior against implementation, then cite the released version that contains it rather than a private source link.
* **Tested Principle**: Shipped behavior is the source of truth.
* **For**: Maintainers retain implementation confidence while readers get a reference they can actually use.
* **Against**: Release references can be less granular than a pull request.
* **Verdict**: **ACCEPT**
* **Reasoning**:
  > "Verification and citation serve different audiences. Use implementation to establish truth, then use an accessible released artifact for the public reference."
* **Changelog Impact**: The vision explicitly distinguishes private maintainer evidence from public destinations.

---

## Hypothetical 7: Copy another project's canonical docs into this repository

* **Proposal**: Copy a substantial Meshery guide into `layer5io/docs` so every Layer5 product appears to have complete documentation in one repository.
* **Tested Principle**: Information architecture serves distinct user journeys and Scope.
* **For**: Readers could remain on one domain and search one repository.
* **Against**: Duplicate documentation can drift while Meshery already maintains its own canonical documentation destination.
* **Verdict**: **RESIST**
* **Reasoning**:
  > "The Layer5 docs site should be a reliable entry point, not a reason to fork canonical documentation. Route readers to the maintained project source when ownership lives elsewhere."
* **Changelog Impact**: The vision defines the site as an entry point that can direct readers to canonical external project docs.

---

## Hypothetical 8: Reorganize content around a real reader journey

* **Proposal**: Split a long page into concept, task, and reference content for operators while preserving old URLs and anchors.
* **Tested Principle**: Information architecture serves distinct user journeys and Public links are compatibility contracts.
* **For**: Operators can find task instructions faster while deeper explanation and reference material remain available.
* **Against**: The change touches several pages and requires compatibility checks.
* **Verdict**: **ACCEPT**
* **Reasoning**:
  > "Information architecture should follow reader goals. A larger edit is justified when it improves the journey and preserves the public routes readers already depend on."
* **Changelog Impact**: The vision ties structural improvement to user journeys and compatibility verification.

---

## Hypothetical 9: Open a documentation pull request without an issue

* **Proposal**: Skip the GitHub issue because the change only adds documentation and can be reviewed directly in the pull request.
* **Tested Principle**: Documentation changes are reproducible and reviewable.
* **For**: The contributor can move from idea to patch faster.
* **Against**: The repository explicitly requires pull requests to reference open issues, and untracked work is harder for other contributors to discover or continue.
* **Verdict**: **RESIST**
* **Reasoning**:
  > "Documentation work follows the same visible contribution flow as other repository changes. Open the issue first so intent, scope, and ownership are discoverable."
* **Changelog Impact**: The vision includes the issue-first workflow as part of reviewability.

---

## Hypothetical 10: Validate a documentation-only change through the normal build path

* **Proposal**: For a Markdown-only change, run the repository build or preview path and let the PR preview workflow validate the rendered result instead of treating source review as sufficient.
* **Tested Principle**: Documentation changes are reproducible and reviewable.
* **For**: Rendering catches problems that plain Markdown review can miss, including broken raw HTML, anchors, and Hugo behavior.
* **Against**: Validation takes more time than reviewing the source diff alone.
* **Verdict**: **ACCEPT**
* **Reasoning**:
  > "Rendered documentation is the product. A documentation-only change still needs the repository's build and preview path because source text alone cannot prove the published result."
* **Changelog Impact**: The vision treats reproducible builds and pull-request previews as part of documentation correctness.
