# Design: Five Narrative — Establishing a Continuous Docs Narrative

**Date:** 2026-04-28  
**Issue:** [layer5io/docs#457](https://github.com/layer5io/docs/issues/457)  
**Status:** Approved — ready for implementation planning

---

## Overview

Layer5 Docs will adopt a continuous narrative centered on Five (Layer5's intergalactic Cloud Native Hero mascot) and a cast of fictional characters across three fictional organizations. Every major docs section will reference these characters and their scenarios rather than generic placeholders, giving readers a consistent, imaginative universe to follow across the full documentation lifecycle.

The approach mirrors Microsoft's use of "Contoso" but goes further: Five has a personality, a rocketship, colleagues with opinions, and a demanding enterprise client. Tone is witty sarcasm and dry humor — enough to bring a smile without obscuring the technical content.

---

## Approach

**Hybrid: origin story + structured reference** (Option C, selected)

- A tight prose origin section sets the scene and establishes personality.
- Structured character cards, org/team tables, and a seed inventory below the prose serve as the canonical quick-reference for doc writers and screenshot-takers.
- A separate research plan page (same PR) maps every existing docs section to the characters and scenarios that should be used there.

---

## File Layout

### New files

```
content/en/cloud/about/_index.md              ← narrative + cast reference page
content/en/cloud/about/five-narrative-plan.md ← research plan / integration roadmap
```

### Modified files

```
content/en/cloud/getting-started/_index.md   ← short intro paragraph + link to /cloud/about
```

---

## Narrative Page Structure (`content/en/cloud/about/_index.md`)

### Section 1 — Origin Story (prose)
Three paragraphs:
1. Introduce Five: who he is, what he does at Orbital Labs, why he chose a rocketship when everyone else took the shuttle.
2. Introduce Orbital Labs: scrappy cloud-native startup, moving fast, occasionally breaking staging, managed by their MSP overlords at Constellation Cloud.
3. Introduce Stellar Dynamics: Fortune 500, cloud-native ambitions, legacy everything — Orbital Labs' biggest client, source of Five's most educational Friday afternoons.

Tone: witty, dry, warm. No jargon in the prose section itself.

### Section 2 — The Organizations
Three `{{< cardpane >}}` cards:

| Org | Type | Plan | Tagline |
|---|---|---|---|
| Constellation Cloud | MSP / Provider | Enterprise | "We keep the lights on so you don't have to." |
| Orbital Labs | Cloud-native startup | Team | "Moving fast and occasionally breaking staging." |
| Stellar Dynamics | Enterprise client | Enterprise | "Fortune 500, cloud-native ambitions, legacy everything." |

### Section 3 — The Cast
Character profile cards using `{{< cardpane >}}`. Each card: name, org, role, plan tier, personality quip, Five SVG illustration where appropriate.

**Constellation Cloud**

| Name | Role | Personality |
|---|---|---|
| Dr. Aiko Sato | Provider Admin | Has seen every misconfigured RBAC policy known to humankind. Responds to Slack messages with bullet-pointed summaries because prose is inefficient. |

**Orbital Labs**

| Name | Role | Personality |
|---|---|---|
| Five | Platform Engineer (User) | The protagonist — curious, enthusiastic, reliably the first to discover a feature works differently than the docs say it does. |
| Maya Chen | Org Admin | Voice of reason. Has a calendar block called "Preventing Five from touching prod" that recurs every Friday at 4:45 PM. |
| Zara Osei | Team Admin, Infrastructure Team | Sole keeper of the keychain permission matrix. Responds to access requests with a 48-hour SLA and a knowing look. |
| Rex Park | User, Developer Team | Opens design review requests and immediately asks Five if they've been approved yet. Deploys with confidence; reads error logs with less. |
| Jordan Reyes | User, Developer Team | Crafts Kanvas designs of alarming elegance. Considers a 47-component architecture diagram "a rough draft." |

**Stellar Dynamics**

| Name | Role | Personality |
|---|---|---|
| Marcus Webb | Org Admin | Files support tickets with executive summaries, numbered findings, and a risk matrix. CC's his VP on all of them. |

### Section 4 — Team & Org Hierarchy

| Org | Team | Members | Roles |
|---|---|---|---|
| Orbital Labs | Infrastructure | Five, Zara Osei | Team Admin (Zara), User (Five) |
| Orbital Labs | Development | Rex Park, Jordan Reyes | Team Admin (Maya Chen), User (Rex, Jordan) |
| Stellar Dynamics | Platform | Marcus Webb | Org Admin (Marcus) |
| Constellation Cloud | — | Dr. Aiko Sato | Provider Admin |

### Section 5 — Seed Inventory

**Environments**

| Environment | Workspace | Connections | Purpose |
|---|---|---|---|
| `prod-aws` | orbital-production | EKS, RDS (PostgreSQL), S3, CloudFront, SQS | Prod demos; managed AWS service connections |
| `prod-gcp` | orbital-production | GKE, Cloud SQL, Cloud Storage, Pub/Sub | Multi-cloud prod; GCP service connections |
| `staging-aws` | orbital-staging | EKS, S3, ElastiCache | Cross-team staging; feature branch deployments |
| `staging-azure` | orbital-staging | AKS, Azure Blob Storage, Azure Service Bus | Azure connections; Stellar Dynamics mirror env |
| `dev-local` | orbital-dev | local k8s (kind), LocalStack (AWS emulation) | Getting-started tutorials; no cloud credentials required |
| `stellar-enterprise` | stellar-main | AKS, Azure SQL, Azure API Management, Azure AD | Enterprise entitlements; cross-org access demos |

**Workspaces**

| Workspace | Owner Org | Teams with Access | Purpose |
|---|---|---|---|
| `orbital-production` | Orbital Labs | Infrastructure | Prod access controls, environment assignment |
| `orbital-staging` | Orbital Labs | Infrastructure, Development | Cross-team workspace sharing |
| `orbital-dev` | Orbital Labs | Development | Team-scoped workspace, design iteration |
| `stellar-main` | Stellar Dynamics | Marcus's team | Enterprise org, cross-org scenarios |

**Designs**

| Design | Owner | Workspace | Cloud Services | Purpose |
|---|---|---|---|---|
| `microservices-baseline` | Jordan Reyes | orbital-dev | local/kind only | Tutorial: creating and sharing a design |
| `api-platform-aws` | Five | orbital-production | EKS + API Gateway + Lambda + RDS + S3 | Tutorial: deploying a multi-service AWS workload |
| `data-pipeline-gcp` | Zara Osei | orbital-production | GKE + Pub/Sub + BigQuery + Cloud Storage + Dataflow | GCP-native service design; environment assignment |
| `frontend-cdn-azure` | Rex Park | orbital-staging | AKS + Azure Front Door + Azure Blob + Azure CDN | Azure workload; staging → prod promotion |
| `stellar-saas-platform` | Marcus Webb | stellar-main | AKS + Azure SQL + Azure API Management + Azure AD + Event Hub | Cross-org design access; enterprise entitlements |
| `prod-deployment-v2` | Five | orbital-production | EKS + RDS + S3 + CloudFront | Tutorial: promoting a design from staging to prod |

### Section 6 — Using This Narrative
Short `{{< alert type="info" >}}` callout pointing to `five-narrative-plan.md` with a one-line summary of how to use it.

---

## Research Plan Page Structure (`content/en/cloud/about/five-narrative-plan.md`)

### Section 1 — Objective
Why this narrative exists, what problem it solves, how to use this plan.

### Section 2 — Integration Map

| Docs Section | Characters | Scenario | Five Illustration | Difficulty | Status |
|---|---|---|---|---|---|
| `cloud/identity/users` | Five, Maya | Five's profile card; Maya as Org Admin | SVG 1 (meet Five) | Low | Open |
| `cloud/identity/organizations` | Maya, Marcus | Orbital Labs org creation; Stellar Dynamics as enterprise tenant | — | Low | Open |
| `cloud/identity/teams` | Zara, Rex, Jordan | Infrastructure vs. Dev team setup | team-of-fives.svg | Low | Open |
| `cloud/security/roles` | Dr. Aiko, Zara | Provider Admin → Org Admin → Team Admin chain | business-mode.svg | Medium | Open |
| `cloud/security/keychains` | Zara | Zara configuring keychain for Infrastructure team | — | Medium | Open |
| `cloud/spaces/workspaces` | Five, Maya | Creating `orbital-staging`; assigning teams | — | Medium | Open |
| `cloud/spaces/environments` | Five, Zara | Connecting `prod-aws` and `prod-gcp`; assigning to workspace | — | Medium | Open |
| `cloud/getting-started` | Five | Five's first login, first workspace, first design | SVG (rocketship) | Low | Open |
| `cloud/tutorials/sharing-a-workspace` | Five, Rex | Five shares `orbital-dev` with Rex's team | — | Low | Open |
| `kanvas/getting-started` | Jordan, Five | Jordan opens `microservices-baseline`; Five reviews | — | Medium | Open |
| `kanvas/designer` | Jordan, Rex | `api-platform-aws` design walkthrough | — | High | Open |

### Section 3 — Mascot Usage Guide
Reference table mapping each Five SVG (1–19) plus named pieces (business-mode, team-of-fives, resources-sign) to appropriate doc contexts.

### Section 4 — Screenshot Standards
- Which user account to be logged in as per category of screenshot
- Which workspace/environment to use per section
- File naming conventions for screenshots

### Section 5 — Priority Order
- **Ship with this PR:** getting-started reference link
- **Next sprint (Batch 1–2):** identity section, roles, keychains, workspaces, environments
- **Backlog (Batch 3–4):** tutorials, screenshot replacement, Kanvas integration

---

## Follow-up GitHub Issues (to be filed with this PR)

### Batch 1 — Identity (Low difficulty)
1. `[Docs] Add Five's user profile card to cloud/identity/users` — Replace `<!-- TODO -->` placeholder with Five's character card, avatar, and link to `/cloud/about`.
2. `[Docs] Illustrate cloud/identity/organizations with Orbital Labs and Stellar Dynamics examples`
3. `[Docs] Illustrate cloud/identity/teams with Infrastructure and Development team examples`

### Batch 2 — Security & Spaces (Medium difficulty)
4. `[Docs] Illustrate cloud/security/roles with Provider Admin → Org Admin → Team Admin chain`
5. `[Docs] Illustrate cloud/security/keychains with Zara's Infrastructure team keychain`
6. `[Docs] Illustrate cloud/spaces/workspaces with orbital-staging creation and team assignment`
7. `[Docs] Illustrate cloud/spaces/environments with prod-aws and prod-gcp environment setup`

### Batch 3 — Tutorials & Screenshots (Medium-High)
8. `[Docs] Update cloud/tutorials/sharing-a-workspace with Five + Rex scenario`
9. `[Docs] Add tutorial: Promoting a design from staging to prod` — Uses `prod-deployment-v2`, Five, Zara, `prod-aws`
10. `[Docs] Update kanvas/getting-started to reference narrative characters`

### Batch 4 — Kanvas Deep Integration (High, Backlog)
11. `[Docs] Illustrate Kanvas Designer docs with api-platform-aws design walkthrough`
12. `[Docs] Illustrate data-pipeline-gcp and stellar-saas-platform designs in advanced Kanvas tutorials`

---

## Constraints & Notes

- All Five SVG illustrations source from `layer5` repo at `src/assets/images/five/SVG/`. Files must be copied into `static/images/five/` in the `docs` repo.
- Hugo shortcodes in use: `{{< cardpane >}}`, `{{< alert >}}`, `{{< svg >}}`. No new shortcodes needed.
- The narrative page is the single source of truth. Character names, roles, and seed data defined here must not be contradicted elsewhere in the docs.
- The `kanvas` docs reference this narrative but the canonical home is in `cloud/about`. Kanvas pages link to `/cloud/about` rather than duplicating the cast.
- Tone standard: witty sarcasm and dry humor as tools to keep the reader engaged. Never obscures technical content. One well-placed quip per page is enough.
