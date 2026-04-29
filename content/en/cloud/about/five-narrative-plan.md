---
title: Five Narrative — Research Plan
description: >
  Section-by-section map for infusing the Five narrative into Layer5 Cloud and Kanvas documentation.
linkTitle: Narrative Research Plan
weight: 1
categories: [About]
---

{{< alert type="info" >}}
This page is a working document for documentation contributors. For the narrative itself — characters, organizations, and seed data — see [Meet Five and the Cast](/cloud/about/).
{{< /alert >}}

## Objective

Layer5 Cloud and Kanvas documentation adopts a continuous narrative centered on Five and his colleagues at Orbital Labs. Rather than using generic placeholders ("User A", "Organization X"), every major docs section uses the canonical cast and scenarios defined in [Meet Five and the Cast](/cloud/about/). This plan maps which characters and scenarios belong in which sections, which Five illustrations to use, and the priority order for rolling out updates.

## Integration Map

The **Difficulty** column rates the effort to update that section:
- **Low** — add character names and a short scenario sentence; no screenshot changes needed
- **Medium** — rewrite examples with scenario context; one or more screenshots need updating
- **High** — significant content restructuring or new tutorial content required

| Docs Section | Characters | Scenario | Five Illustration | Difficulty | Status |
|---|---|---|---|---|---|
| `cloud/identity/users` | Five, Maya | Five's profile card; Maya as Org Admin example | `/images/five/1.svg` | Low | Open |
| `cloud/identity/organizations` | Maya, Marcus | Orbital Labs org creation walkthrough; Stellar Dynamics as enterprise tenant | — | Low | Open |
| `cloud/identity/teams` | Zara, Rex, Jordan | Infrastructure team vs. Development team setup | `/images/five/team-of-fives.svg` | Low | Open |
| `cloud/security/roles` | Dr. Aiko, Maya, Zara | Provider Admin (Dr. Aiko) → Org Admin (Maya) → Team Admin (Zara) chain | `/images/five/layer5-five-mascot-means-business.svg` | Medium | Open |
| `cloud/security/keychains` | Zara | Zara configuring a keychain scoped to the Infrastructure team, locking down `prod-aws` access | — | Medium | Open |
| `cloud/spaces/workspaces` | Five, Maya | Five creates `orbital-staging`; Maya assigns Infrastructure and Development teams | — | Medium | Open |
| `cloud/spaces/environments` | Five, Zara | Five connects `prod-aws` (EKS + RDS + S3) and `prod-gcp` (GKE + Pub/Sub); Zara approves | — | Medium | Open |
| `cloud/getting-started` | Five | Five's first login, first workspace (`orbital-dev`), first design (`microservices-baseline`) | `/images/five/1.svg` | Low | Open |
| `cloud/tutorials/sharing-a-workspace` | Five, Rex | Five shares `orbital-dev` with Rex's Developer team | — | Low | Open |
| `kanvas/getting-started` | Jordan, Five | Jordan opens `microservices-baseline` in Designer; Five reviews and leaves a comment | — | Medium | Open |
| `kanvas/designer` | Jordan, Rex | Full walkthrough of `api-platform-aws` design (EKS + API Gateway + Lambda + RDS + S3) | — | High | Open |

## Mascot Usage Guide

Five's illustrations are sourced from `static/images/five/` in this repo (copied from the `layer5` repo at `src/assets/images/five/SVG/`). Use this guide to select the right illustration for context. Open each SVG in a browser to preview before assigning.

| File | Best Used For |
|---|---|
| `1.svg` | Five's personal profile card; general protagonist introduction |
| `2.svg`–`5.svg` | Orbital Labs team member illustrations (Maya, Zara, Rex, Jordan respectively) |
| `6.svg`–`10.svg` | Action/task illustrations: deploying, connecting, configuring |
| `11.svg`–`15.svg` | Learning/exploration illustrations: getting-started, tutorials |
| `16.svg`–`19.svg` | Warning/error/pitfall illustrations: common mistakes, troubleshooting |
| `team-of-fives.svg` | Team-level concepts: teams, organizations, multi-user collaboration |
| `layer5-five-mascot-means-business.svg` | Admin-level concepts: Provider Admin, Org Admin, Enterprise features |
| `resources-sign.svg` | Reference pages, callouts pointing to external resources |
| `stick-figures.svg` | General collaboration, multi-user scenarios |

{{< alert type="warning" title="Preview Before Using" >}}
The numbered SVG assignments above (6–19) are directional guidance. Open each SVG to confirm it fits the context before publishing. Update this table as assignments are confirmed.
{{< /alert >}}

## Screenshot Standards

When capturing screenshots for any section that references the Five narrative, follow these conventions.

**Which account to use:**

| Screenshot Type | Log in as | Account email pattern |
|---|---|---|
| Getting started, user profile | Five | `five@orbital-labs.example` |
| Org Admin actions | Maya | `maya@orbital-labs.example` |
| Team Admin / keychain / permissions | Zara | `zara@orbital-labs.example` |
| Developer workflow, design review | Rex or Jordan | `rex@orbital-labs.example` / `jordan@orbital-labs.example` |
| Provider Admin, cross-tenant | Dr. Aiko | `aiko@constellation-cloud.example` |
| Enterprise org, cross-org access | Marcus | `marcus@stellar-dynamics.example` |

**Which workspace/environment to use:** Match the section's purpose to the Seed Inventory table in [Meet Five and the Cast](/cloud/about). Use `dev-local` for all getting-started screenshots (no real cloud credentials required).

**File naming:** `<section>-<scenario>-<YYYY-MM-DD>.png`, e.g., `workspaces-orbital-staging-creation-2026-04-28.png`. Store in the `images/` subdirectory of the relevant content section.

## Priority Order

### Ship with This PR
- `cloud/getting-started` — add intro paragraph and link to `/cloud/about` ✓ (done in this PR)

### Next Sprint — Batch 1: Identity (Low difficulty)
1. `cloud/identity/users` — Five's profile card (replaces existing `<!-- TODO -->` placeholder)
2. `cloud/identity/organizations` — Orbital Labs + Stellar Dynamics examples
3. `cloud/identity/teams` — Infrastructure + Development team examples

### Next Sprint — Batch 2: Security & Spaces (Medium difficulty)
4. `cloud/security/roles` — Provider Admin → Org Admin → Team Admin chain
5. `cloud/security/keychains` — Zara's Infrastructure team keychain
6. `cloud/spaces/workspaces` — `orbital-staging` creation and team assignment
7. `cloud/spaces/environments` — `prod-aws` and `prod-gcp` setup

### Backlog — Batch 3: Tutorials & Screenshots (Medium–High)
8. `cloud/tutorials/sharing-a-workspace` — Five + Rex scenario
9. New tutorial: Promoting a design from staging to prod
10. `kanvas/getting-started` — narrative character references

### Backlog — Batch 4: Kanvas Deep Integration (High)
11. `kanvas/designer` — `api-platform-aws` design walkthrough
12. Advanced Kanvas tutorials — `data-pipeline-gcp` and `stellar-saas-platform`
