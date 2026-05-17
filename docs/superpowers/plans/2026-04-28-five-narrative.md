# Five Narrative Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a continuous narrative in Layer5 Cloud docs built around Five (the mascot) and a cast of six fictional characters across three fictional organizations, with a companion research plan page and 12 filed follow-up GitHub issues.

**Architecture:** A dedicated `/cloud/getting-started/meet-five/` Hugo section hosts the canonical narrative page (`_index.md`) and research plan (`five-narrative-plan.md`). Five SVG assets are copied from the `layer5` repo into `docs/static/images/five/`. The Getting Started index gets a short intro paragraph linking to `/cloud/getting-started/meet-five`. No new Hugo shortcodes are needed — the existing `{{< cardpane >}}`, `{{% card %}}`, and `{{< alert >}}` shortcodes cover all layout needs.

**Tech Stack:** Hugo (static site generator), Markdown, Hugo shortcodes (`cardpane`, `card`, `alert`), GitHub CLI (`gh`) for filing issues.

**Spec:** `docs/superpowers/specs/2026-04-28-five-narrative-design.md`

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Copy | `static/images/five/team-of-fives.svg` | Team illustration for cast header |
| Copy | `static/images/five/layer5-five-mascot-means-business.svg` | Enterprise/admin context illustration |
| Copy | `static/images/five/1.svg` through `19.svg` | Character profile illustrations |
| Copy | `static/images/five/resources-sign.svg` | Sidebar/callout illustration |
| Copy | `static/images/five/stick-figures.svg` | Team overview illustration |
| Create | `content/en/cloud/getting-started/meet-five/_index.md` | Narrative + cast reference page |
| Create | `content/en/cloud/getting-started/meet-five/five-narrative-plan.md` | Research plan / integration roadmap |
| Modify | `content/en/cloud/getting-started/_index.md` | Add intro paragraph + link to /cloud/getting-started/meet-five |

---

## Task 1: Copy Five SVG Assets

**Files:**
- Copy from: `~/code/layer5/src/assets/images/five/SVG/`
- Copy to: `static/images/five/`

- [ ] **Step 1: Create the target directory**

```bash
mkdir -p static/images/five
```

- [ ] **Step 2: Copy all Five SVG assets**

```bash
cp ../layer5/src/assets/images/five/SVG/team-of-fives.svg \
   static/images/five/

cp ../layer5/src/assets/images/five/SVG/layer5-five-mascot-means-business.svg \
   static/images/five/

cp ../layer5/src/assets/images/five/SVG/layer5-five-mascot-means-business.gif \
   static/images/five/

cp ../layer5/src/assets/images/five/SVG/resources-sign.svg \
   static/images/five/

cp ../layer5/src/assets/images/five/SVG/stick-figures.svg \
   static/images/five/

for i in $(seq 1 19); do
  cp ../layer5/src/assets/images/five/SVG/${i}.svg \
     static/images/five/
done
```

- [ ] **Step 3: Verify files are present**

```bash
ls static/images/five/
```

Expected: 24 files (19 numbered SVGs + team-of-fives.svg + layer5-five-mascot-means-business.svg + .gif + resources-sign.svg + stick-figures.svg)

- [ ] **Step 4: Commit**

```bash
cd .
git add static/images/five/
git commit -s -m "[Docs] Add Five mascot SVG assets from layer5 repo"
```

---

## Task 2: Create the About Section Skeleton

**Files:**
- Create: `content/en/cloud/getting-started/meet-five/_index.md`

- [ ] **Step 1: Create the directory and skeleton file**

Create `content/en/cloud/getting-started/meet-five/_index.md` with this exact content:

```markdown
---
title: Meet Five and the Cast
description: >
  The continuous narrative behind Layer5 Cloud documentation — Five, his team at Orbital Labs, and the cloud-native universe they inhabit.
linkTitle: About
weight: 0
categories: [About]
---

<!-- Origin story goes here in Task 3 -->

<!-- Organizations section goes here in Task 4 -->

<!-- Cast section goes here in Task 5 -->

<!-- Hierarchy table goes here in Task 6 -->

<!-- Seed inventory goes here in Task 6 -->

<!-- Using This Narrative callout goes here in Task 7 -->
```

- [ ] **Step 2: Verify Hugo builds without error**

```bash
cd docs
hugo --quiet 2>&1 | grep -i "error\|warn" || echo "Build clean"
```

Expected: `Build clean` (no errors or warnings related to the new file)

- [ ] **Step 3: Commit**

```bash
git add content/en/cloud/getting-started/meet-five/_index.md
git commit -s -m "[Docs] Add cloud/getting-started/meet-five section skeleton for Five narrative"
```

---

## Task 3: Write the Origin Story

**Files:**
- Modify: `content/en/cloud/getting-started/meet-five/_index.md`

- [ ] **Step 1: Replace the origin story comment with the prose**

Replace `<!-- Origin story goes here in Task 3 -->` with:

```markdown
Five is a Platform Engineer at Orbital Labs with an unshakeable belief that every problem is solvable with the right tool, the right permissions, and — ideally — access to production. He arrived at Layer5 Cloud the same way most engineers arrive at operations tooling: via a 3 AM paging incident that politely suggested he learn something new. He did. He also learned about role-based access control the hard way, but that is what the rest of these docs are for.

Orbital Labs is a cloud-native startup on the steeper part of the growth curve — the part where "we'll sort out permissions later" has finally become "we should have sorted out permissions earlier." Orbital Labs runs workloads across AWS, GCP, and a legacy Azure footprint inherited from an acquisition nobody likes to talk about. Their infrastructure is managed through Kanvas, their environments are wrangled by Five and Zara, and their Friday afternoons are protected by Maya Chen.

Orbital Labs operates as a tenant of Constellation Cloud, an MSP whose Provider Admin, Dr. Aiko Sato, manages their account alongside a roster of other organizations — including Stellar Dynamics, Orbital Labs' largest enterprise client. Stellar Dynamics has a Fortune 500 budget, a legacy-everything architecture, and Marcus Webb, an Org Admin who CC's his VP on support tickets. The relationship is productive. Mostly.
```

- [ ] **Step 2: Verify Hugo builds without error**

```bash
cd docs
hugo --quiet 2>&1 | grep -i "error\|warn" || echo "Build clean"
```

Expected: `Build clean`

- [ ] **Step 3: Commit**

```bash
git add content/en/cloud/getting-started/meet-five/_index.md
git commit -s -m "[Docs] Add Five narrative origin story to cloud/getting-started/meet-five"
```

---

## Task 4: Write the Organizations Section

**Files:**
- Modify: `content/en/cloud/getting-started/meet-five/_index.md`

- [ ] **Step 1: Replace the organizations comment with this content**

Replace `<!-- Organizations section goes here in Task 4 -->` with:

```markdown
## The Organizations

{{< cardpane >}}
{{% card header="**Constellation Cloud**" %}}
**Type:** Managed Service Provider  
**Plan:** Enterprise  
**Role in this narrative:** Provider — manages Orbital Labs and Stellar Dynamics as tenants

*"We keep the lights on so you don't have to."*
{{% /card %}}
{{% card header="**Orbital Labs**" %}}
**Type:** Cloud-native startup  
**Plan:** Team  
**Role in this narrative:** Five's employer — primary protagonist organization

*"Moving fast and occasionally breaking staging."*
{{% /card %}}
{{% card header="**Stellar Dynamics**" %}}
**Type:** Enterprise client  
**Plan:** Enterprise  
**Role in this narrative:** Orbital Labs' biggest customer — illustrates cross-org access and enterprise entitlements

*"Fortune 500, cloud-native ambitions, legacy everything."*
{{% /card %}}
{{< /cardpane >}}
```

- [ ] **Step 2: Verify Hugo builds without error**

```bash
cd docs
hugo --quiet 2>&1 | grep -i "error\|warn" || echo "Build clean"
```

Expected: `Build clean`

- [ ] **Step 3: Commit**

```bash
git add content/en/cloud/getting-started/meet-five/_index.md
git commit -s -m "[Docs] Add Organizations section to Five narrative page"
```

---

## Task 5: Write the Cast Section

**Files:**
- Modify: `content/en/cloud/getting-started/meet-five/_index.md`

- [ ] **Step 1: Replace the cast comment with this content**

Replace `<!-- Cast section goes here in Task 5 -->` with:

```markdown
## The Cast

### Constellation Cloud

{{< cardpane >}}
{{% card header="**Dr. Aiko Sato** — Provider Admin" %}}
<img src="/images/five/layer5-five-mascot-means-business.svg" alt="Five mascot in business mode" style="width:80px; float:right; margin-left:1rem;" />

**Organization:** Constellation Cloud  
**Role:** Provider Admin  
**Plan:** Enterprise

Has seen every misconfigured RBAC policy known to humankind. Responds to Slack messages with bullet-pointed summaries because prose is inefficient.
{{% /card %}}
{{< /cardpane >}}

### Orbital Labs

{{< cardpane >}}
{{% card header="**Five** — Platform Engineer" %}}
<img src="/images/five/1.svg" alt="Five" style="width:80px; float:right; margin-left:1rem;" />

**Organization:** Orbital Labs  
**Role:** User (Platform Engineer)  
**Plan:** Team

The protagonist — curious, enthusiastic, and reliably the first to discover that a feature works differently than the docs say it does.
{{% /card %}}
{{% card header="**Maya Chen** — Org Admin & Development Team Admin" %}}
<img src="/images/five/2.svg" alt="Maya" style="width:80px; float:right; margin-left:1rem;" />

**Organization:** Orbital Labs  
**Role:** Org Admin + Development Team Admin  
**Plan:** Team

Voice of reason. Has a calendar block called "Preventing Five from touching prod" that recurs every Friday at 4:45 PM. (Org Admins may also administer teams; Maya does both.)
{{% /card %}}
{{< /cardpane >}}

{{< cardpane >}}
{{% card header="**Zara Osei** — Infrastructure Team Admin" %}}
<img src="/images/five/3.svg" alt="Zara" style="width:80px; float:right; margin-left:1rem;" />

**Organization:** Orbital Labs  
**Role:** Team Admin, Infrastructure Team  
**Plan:** Team

Sole keeper of the keychain permission matrix. Responds to access requests with a 48-hour SLA and a knowing look.
{{% /card %}}
{{% card header="**Rex Park** — Developer" %}}
<img src="/images/five/4.svg" alt="Rex" style="width:80px; float:right; margin-left:1rem;" />

**Organization:** Orbital Labs  
**Role:** User, Developer Team  
**Plan:** Team

Opens design review requests and immediately asks Five if they have been approved yet. Deploys with confidence; reads error logs with less.
{{% /card %}}
{{% card header="**Jordan Reyes** — Developer & Designer" %}}
<img src="/images/five/5.svg" alt="Jordan" style="width:80px; float:right; margin-left:1rem;" />

**Organization:** Orbital Labs  
**Role:** User, Developer Team  
**Plan:** Team

Crafts Kanvas designs of alarming elegance. Considers a 47-component architecture diagram "a rough draft."
{{% /card %}}
{{< /cardpane >}}

### Stellar Dynamics

{{< cardpane >}}
{{% card header="**Marcus Webb** — Org Admin" %}}
<img src="/images/five/layer5-five-mascot-means-business.svg" alt="Five mascot in business mode" style="width:80px; float:right; margin-left:1rem;" />

**Organization:** Stellar Dynamics  
**Role:** Org Admin  
**Plan:** Enterprise

Files support tickets with executive summaries, numbered findings, and a risk matrix. CC's his VP on all of them.
{{% /card %}}
{{< /cardpane >}}
```

- [ ] **Step 2: Verify Hugo builds without error**

```bash
cd docs
hugo --quiet 2>&1 | grep -i "error\|warn" || echo "Build clean"
```

Expected: `Build clean`

- [ ] **Step 3: Commit**

```bash
git add content/en/cloud/getting-started/meet-five/_index.md
git commit -s -m "[Docs] Add Cast section to Five narrative page"
```

---

## Task 6: Write the Hierarchy Table and Seed Inventory

**Files:**
- Modify: `content/en/cloud/getting-started/meet-five/_index.md`

- [ ] **Step 1: Replace the hierarchy comment with this content**

Replace `<!-- Hierarchy table goes here in Task 6 -->` with:

```markdown
## Team & Org Hierarchy

| Organization | Team | Members | Roles |
|---|---|---|---|
| Constellation Cloud | — | Dr. Aiko Sato | Provider Admin |
| Orbital Labs | Infrastructure | Five, Zara Osei | Team Admin (Zara), User (Five) |
| Orbital Labs | Development | Rex Park, Jordan Reyes | Team Admin (Maya Chen), User (Rex, Jordan) |
| Stellar Dynamics | Platform | Marcus Webb | Org Admin (Marcus) |
```

- [ ] **Step 2: Replace the seed inventory comment with this content**

Replace `<!-- Seed inventory goes here in Task 6 -->` with:

```markdown
## Seed Inventory

Use these canonical names in all screenshots, tutorials, and example walkthroughs. Do not invent alternate names for these resources in other docs pages.

### Workspaces

| Workspace | Owner Org | Teams with Access | Purpose in Docs |
|---|---|---|---|
| `orbital-production` | Orbital Labs | Infrastructure | Prod access controls, environment assignment demos |
| `orbital-staging` | Orbital Labs | Infrastructure, Development | Cross-team workspace sharing demos |
| `orbital-dev` | Orbital Labs | Development | Team-scoped workspace, design iteration tutorials |
| `stellar-main` | Stellar Dynamics | Platform | Enterprise org, cross-org access scenarios |

### Environments

| Environment | Workspace | Connections | Purpose in Docs |
|---|---|---|---|
| `prod-aws` | orbital-production | EKS, RDS (PostgreSQL), S3, CloudFront, SQS | Prod demos; managed AWS service connections |
| `prod-gcp` | orbital-production | GKE, Cloud SQL, Cloud Storage, Pub/Sub | Multi-cloud prod; GCP service connections |
| `staging-aws` | orbital-staging | EKS, S3, ElastiCache | Cross-team staging; feature branch deployments |
| `staging-azure` | orbital-staging | AKS, Azure Blob Storage, Azure Service Bus | Azure connections; Stellar Dynamics mirror environment |
| `dev-local` | orbital-dev | local k8s (kind), LocalStack (AWS emulation) | Getting-started tutorials; no cloud credentials required |
| `stellar-enterprise` | stellar-main | AKS, Azure SQL, Azure API Management, Azure AD | Enterprise entitlements; cross-org access demos |

### Designs

| Design | Owner | Workspace | Cloud Services | Purpose in Docs |
|---|---|---|---|---|
| `microservices-baseline` | Jordan Reyes | orbital-dev | local/kind only | Tutorial: creating and sharing a design |
| `api-platform-aws` | Five | orbital-production | EKS + API Gateway + Lambda + RDS + S3 | Tutorial: deploying a multi-service AWS workload |
| `data-pipeline-gcp` | Zara Osei | orbital-production | GKE + Pub/Sub + BigQuery + Cloud Storage + Dataflow | GCP-native service design; environment assignment |
| `frontend-cdn-azure` | Rex Park | orbital-staging | AKS + Azure Front Door + Azure Blob + Azure CDN | Azure workload; staging → prod promotion |
| `stellar-saas-platform` | Marcus Webb | stellar-main | AKS + Azure SQL + Azure API Management + Azure AD + Event Hub | Cross-org design access; enterprise entitlements |
| `prod-deployment-v2` | Five | orbital-production | EKS + RDS + S3 + CloudFront | Tutorial: promoting a design from staging to prod |
```

- [ ] **Step 3: Verify Hugo builds without error**

```bash
cd docs
hugo --quiet 2>&1 | grep -i "error\|warn" || echo "Build clean"
```

Expected: `Build clean`

- [ ] **Step 4: Commit**

```bash
git add content/en/cloud/getting-started/meet-five/_index.md
git commit -s -m "[Docs] Add hierarchy table and seed inventory to Five narrative page"
```

---

## Task 7: Write the "Using This Narrative" Callout and Finalize Narrative Page

**Files:**
- Modify: `content/en/cloud/getting-started/meet-five/_index.md`

- [ ] **Step 1: Replace the callout comment with this content**

Replace `<!-- Using This Narrative callout goes here in Task 7 -->` with:

```markdown
## Using This Narrative

{{< alert type="info" title="For Documentation Contributors" >}}
The characters, organizations, workspaces, environments, and designs on this page are the canonical reference for all Layer5 Cloud and Kanvas documentation. When writing new docs, updating screenshots, or building tutorials, use these names and scenarios rather than inventing new examples.

See the [Five Narrative Research Plan](five-narrative-plan) for a section-by-section map of where each character and scenario belongs, which Five illustrations to use, and screenshot conventions.
{{< /alert >}}
```

- [ ] **Step 2: Full Hugo build and spot-check the rendered page**

```bash
cd docs
hugo --quiet 2>&1 | grep -i "error\|warn" || echo "Build clean"
```

Expected: `Build clean`

Then run `make site` and open `http://localhost:1313/cloud/getting-started/meet-five/` in a browser. Verify:
- Page appears in the left sidebar under Cloud
- Origin story prose renders
- Three org cards render side-by-side
- Character cards render with images (if images are missing, SVG paths need adjusting)
- Tables render correctly
- Alert callout renders with info styling

- [ ] **Step 3: Commit**

```bash
git add content/en/cloud/getting-started/meet-five/_index.md
git commit -s -m "[Docs] Complete Five narrative page with Using This Narrative callout"
```

---

## Task 8: Create the Research Plan Page

**Files:**
- Create: `content/en/cloud/getting-started/meet-five/five-narrative-plan.md`

- [ ] **Step 1: Create the research plan file with this exact content**

```markdown
---
title: Five Narrative — Research Plan
description: >
  Section-by-section map for infusing the Five narrative into Layer5 Cloud and Kanvas documentation.
linkTitle: Narrative Research Plan
weight: 1
categories: [About]
---

{{< alert type="info" >}}
This page is a working document for documentation contributors. For the narrative itself — characters, organizations, and seed data — see [Meet Five and the Cast](.).
{{< /alert >}}

## Objective

Layer5 Cloud and Kanvas documentation adopts a continuous narrative centered on Five and his colleagues at Orbital Labs. Rather than using generic placeholders ("User A", "Organization X"), every major docs section uses the canonical cast and scenarios defined in [Meet Five and the Cast](.). This plan maps which characters and scenarios belong in which sections, which Five illustrations to use, and the priority order for rolling out updates.

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

Five's illustrations are sourced from `static/images/five/` in this repo (copied from the `layer5` repo). Use this guide to select the right illustration for context. Open each SVG in a browser to preview before assigning.

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

When capturing screenshots for any section that references the Five narrative, follow these conventions:

**Which account to use:**

| Screenshot Type | Log in as | Account email pattern |
|---|---|---|
| Getting started, user profile | Five | `five@orbital-labs.example` |
| Org Admin actions | Maya | `maya@orbital-labs.example` |
| Team Admin / keychain / permissions | Zara | `zara@orbital-labs.example` |
| Developer workflow, design review | Rex or Jordan | `rex@orbital-labs.example` / `jordan@orbital-labs.example` |
| Provider Admin, cross-tenant | Dr. Aiko | `aiko@constellation-cloud.example` |
| Enterprise org, cross-org access | Marcus | `marcus@stellar-dynamics.example` |

**Which workspace/environment to use:** Match the section's purpose to the Seed Inventory table in [Meet Five and the Cast](.). Use `dev-local` for all getting-started screenshots (no real cloud credentials required).

**File naming:** `<section>-<scenario>-<YYYY-MM-DD>.png`, e.g., `workspaces-orbital-staging-creation-2026-04-28.png`. Store in the `images/` subdirectory of the relevant content section.

## Priority Order

### Ship with this PR
- `cloud/getting-started` — add intro paragraph + link to `/cloud/getting-started/meet-five` (see Task 10 of the implementation plan)

### Next Sprint — Batch 1: Identity (Low difficulty)
1. `cloud/identity/users` — Five's profile card
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
```

- [ ] **Step 2: Verify Hugo builds without error**

```bash
cd docs
hugo --quiet 2>&1 | grep -i "error\|warn" || echo "Build clean"
```

Expected: `Build clean`

Then verify `http://localhost:1313/cloud/getting-started/meet-five/five-narrative-plan/` renders and the integration map table is readable.

- [ ] **Step 3: Commit**

```bash
git add content/en/cloud/getting-started/meet-five/five-narrative-plan.md
git commit -s -m "[Docs] Add Five narrative research plan page"
```

---

## Task 9: Update the Getting Started Page

**Files:**
- Modify: `content/en/cloud/getting-started/_index.md`

- [ ] **Step 1: Add the intro paragraph before the existing image**

In `content/en/cloud/getting-started/_index.md`, insert the following **before** the line `## Core Workflow`:

```markdown
{{< alert type="info" title="Follow Along with Five" >}}
Throughout these docs you'll follow Five — a Platform Engineer at Orbital Labs — and his colleagues as they set up organizations, configure workspaces, deploy designs, and navigate the occasional Friday-afternoon incident. [Meet Five and the full cast →](/cloud/getting-started/meet-five)
{{< /alert >}}

```

The final file should read:

```markdown
---
title: Getting Started
description: Learn how to effectively manage your organizations, teams, users, workspaces, environments, and more.
weight: 1
---
<!-- ... existing comments ... -->
{{< alert type="info" title="Follow Along with Five" >}}
Throughout these docs you'll follow Five — a Platform Engineer at Orbital Labs — and his colleagues as they set up organizations, configure workspaces, deploy designs, and navigate the occasional Friday-afternoon incident. [Meet Five and the full cast →](/cloud/getting-started/meet-five)
{{< /alert >}}

![layer5-cloud-provider](images/layer5-cloud-provider.svg "image-center-shadow")
```

- [ ] **Step 2: Verify Hugo builds without error**

```bash
cd docs
hugo --quiet 2>&1 | grep -i "error\|warn" || echo "Build clean"
```

Expected: `Build clean`

Then verify `http://localhost:1313/cloud/getting-started/` shows the alert callout with the link to `/cloud/getting-started/meet-five`.

- [ ] **Step 3: Commit**

```bash
git add content/en/cloud/getting-started/_index.md
git commit -s -m "[Docs] Add Five narrative intro callout to cloud/getting-started"
```

---

## Task 10: File the 12 Follow-up GitHub Issues

Run these `gh issue create` commands. Each command opens a new issue on `layer5io/docs`.

- [ ] **Step 1: File Batch 1 — Identity issues**

```bash
gh issue create --repo layer5io/docs \
  --title "[Docs] Add Five's user profile card to cloud/identity/users" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
The `cloud/identity/users` page has an existing `<!-- TODO -->` placeholder for Five's user profile. Replace it with a character card using the canonical Five profile defined in https://docs.layer5.io/cloud/getting-started/meet-five.

## Tasks
- [ ] Remove the `<!-- TODO -->` comment block from `content/en/cloud/identity/users/_index.md`
- [ ] Add a `{{< cardpane >}}` character card for Five showing: name, role (Platform Engineer, User), org (Orbital Labs), plan (Team), and `/images/five/1.svg`
- [ ] Add a second card for Maya Chen as the Org Admin example
- [ ] Link both cards to `/cloud/getting-started/meet-five` for full cast reference

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: Low
EOF
)"

gh issue create --repo layer5io/docs \
  --title "[Docs] Illustrate cloud/identity/organizations with Orbital Labs and Stellar Dynamics examples" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Update `cloud/identity/organizations` to use Orbital Labs and Stellar Dynamics as the example organizations throughout, replacing generic placeholders.

## Tasks
- [ ] Add Orbital Labs as the example org in the org-creation walkthrough
- [ ] Add Stellar Dynamics as the enterprise tenant example (cross-org access scenario)
- [ ] Reference the org chart with Constellation Cloud as the provider/MSP
- [ ] Link to `/cloud/getting-started/meet-five` for full narrative context

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: Low
EOF
)"

gh issue create --repo layer5io/docs \
  --title "[Docs] Illustrate cloud/identity/teams with Infrastructure and Development team examples" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Update `cloud/identity/teams` to use Orbital Labs' Infrastructure team (Zara, Five) and Development team (Rex, Jordan) as examples throughout.

## Tasks
- [ ] Add the Infrastructure team (admin: Zara Osei, members: Five) as the primary team example
- [ ] Add the Development team (admin: Maya Chen, members: Rex Park, Jordan Reyes) as a second example
- [ ] Add `team-of-fives.svg` illustration (`/images/five/team-of-fives.svg`) at an appropriate point
- [ ] Link to `/cloud/getting-started/meet-five` for full cast reference

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: Low
EOF
)"
```

- [ ] **Step 2: File Batch 2 — Security & Spaces issues**

```bash
gh issue create --repo layer5io/docs \
  --title "[Docs] Illustrate cloud/security/roles with Provider Admin → Org Admin → Team Admin chain" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Update `cloud/security/roles` to use Dr. Aiko Sato (Provider Admin at Constellation Cloud) → Maya Chen (Org Admin at Orbital Labs) → Zara Osei (Team Admin) as the concrete role-chain example.

## Tasks
- [ ] Add Dr. Aiko Sato as the Provider Admin example in the Provider Admin Role section
- [ ] Add Maya Chen as the Org Admin example
- [ ] Add Zara Osei as the Team Admin example
- [ ] Use `layer5-five-mascot-means-business.svg` in the admin section header
- [ ] Link to `/cloud/getting-started/meet-five` for full cast context

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: Medium
EOF
)"

gh issue create --repo layer5io/docs \
  --title "[Docs] Illustrate cloud/security/keychains with Zara's Infrastructure team keychain" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Update `cloud/security/keychains` to use Zara Osei configuring a keychain scoped to the Orbital Labs Infrastructure team, controlling access to the `prod-aws` environment, as the primary worked example.

## Tasks
- [ ] Add scenario: Zara creates a keychain for the Infrastructure team
- [ ] Show keychain scoped to `orbital-production` workspace and `prod-aws` environment
- [ ] Add screenshot (log in as Zara: `zara@orbital-labs.example`) following screenshot standards in `/cloud/getting-started/meet-five/five-narrative-plan`
- [ ] Link to `/cloud/getting-started/meet-five` for cast context

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: Medium
EOF
)"

gh issue create --repo layer5io/docs \
  --title "[Docs] Illustrate cloud/spaces/workspaces with orbital-staging creation and team assignment" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Update `cloud/spaces/workspaces` to use Five creating `orbital-staging` and Maya assigning both the Infrastructure and Development teams as the primary worked example.

## Tasks
- [ ] Add scenario: Five creates the `orbital-staging` workspace
- [ ] Show Maya assigning Infrastructure team and Development team to the workspace
- [ ] Add screenshot(s) following screenshot standards in `/cloud/getting-started/meet-five/five-narrative-plan`
- [ ] Link to `/cloud/getting-started/meet-five` for cast context

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: Medium
EOF
)"

gh issue create --repo layer5io/docs \
  --title "[Docs] Illustrate cloud/spaces/environments with prod-aws and prod-gcp environment setup" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Update `cloud/spaces/environments` to use Five connecting `prod-aws` (EKS + RDS + S3 + CloudFront + SQS) and `prod-gcp` (GKE + Cloud SQL + Cloud Storage + Pub/Sub) as the primary multi-cloud environment examples.

## Tasks
- [ ] Add scenario: Five connects the `prod-aws` environment (AWS services: EKS, RDS, S3, CloudFront, SQS)
- [ ] Add scenario: Five connects the `prod-gcp` environment (GCP services: GKE, Cloud SQL, Cloud Storage, Pub/Sub)
- [ ] Show both environments assigned to the `orbital-production` workspace
- [ ] Add screenshots following screenshot standards in `/cloud/getting-started/meet-five/five-narrative-plan`
- [ ] Link to `/cloud/getting-started/meet-five` for cast context

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: Medium
EOF
)"
```

- [ ] **Step 3: File Batch 3 — Tutorials issues**

```bash
gh issue create --repo layer5io/docs \
  --title "[Docs] Update cloud/tutorials/sharing-a-workspace with Five + Rex scenario" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Rewrite `cloud/tutorials/sharing-a-workspace` so Five shares `orbital-dev` with Rex Park's Developer team, replacing any generic example currently in place.

## Tasks
- [ ] Rewrite tutorial using Five as the workspace owner sharing `orbital-dev`
- [ ] Add Rex Park (Developer team) as the recipient
- [ ] Update or replace screenshots (log in as Five: `five@orbital-labs.example`)
- [ ] Link to `/cloud/getting-started/meet-five` for cast context

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: Low–Medium
EOF
)"

gh issue create --repo layer5io/docs \
  --title "[Docs] Add tutorial: Promoting a design from staging to prod" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Add a new tutorial to `cloud/tutorials/` covering the promotion of `prod-deployment-v2` (EKS + RDS + S3 + CloudFront) from the `orbital-staging` workspace to `orbital-production`, with Five initiating and Zara approving.

## Tasks
- [ ] Create `content/en/cloud/tutorials/promoting-a-design.md`
- [ ] Scenario: Five promotes `prod-deployment-v2` from `orbital-staging` to `orbital-production`
- [ ] Show Zara's approval step (Team Admin of Infrastructure, which controls prod access)
- [ ] Add screenshots (Five: `five@orbital-labs.example`; Zara: `zara@orbital-labs.example`)
- [ ] Cloud services in scope: EKS, RDS (PostgreSQL), S3, CloudFront
- [ ] Link to `/cloud/getting-started/meet-five` for cast context

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: Medium
EOF
)"

gh issue create --repo layer5io/docs \
  --title "[Docs] Update kanvas/getting-started to reference narrative characters" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Update `kanvas/getting-started` so Jordan Reyes opens the `microservices-baseline` design and Five reviews it, replacing any generic user references.

## Tasks
- [ ] Introduce Jordan as the user opening Kanvas Designer with `microservices-baseline`
- [ ] Add Five as the reviewer/collaborator
- [ ] Update screenshots to use narrative accounts
- [ ] Link to `/cloud/getting-started/meet-five` for full cast context

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: Medium
EOF
)"
```

- [ ] **Step 4: File Batch 4 — Kanvas deep integration issues**

```bash
gh issue create --repo layer5io/docs \
  --title "[Docs] Illustrate Kanvas Designer docs with api-platform-aws design walkthrough" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Update the Kanvas Designer documentation to use Jordan Reyes and Rex Park walking through the `api-platform-aws` design (EKS + API Gateway + Lambda + RDS + S3) as the primary example.

## Tasks
- [ ] Replace generic design examples with `api-platform-aws`
- [ ] Use Jordan as the designer, Rex as the collaborator/reviewer
- [ ] Cover: opening the design, adding/connecting AWS components, sharing for review
- [ ] Update screenshots (Jordan: `jordan@orbital-labs.example`)
- [ ] Link to `/cloud/getting-started/meet-five` for cast context

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: High
EOF
)"

gh issue create --repo layer5io/docs \
  --title "[Docs] Illustrate data-pipeline-gcp and stellar-saas-platform in advanced Kanvas tutorials" \
  --label "kind/enhancement,help wanted,issue/willfix" \
  --body "$(cat <<'EOF'
## Overview
Add or update advanced Kanvas tutorials using `data-pipeline-gcp` (Zara's GCP workload: GKE + Pub/Sub + BigQuery + Cloud Storage + Dataflow) and `stellar-saas-platform` (Marcus Webb's Azure enterprise workload: AKS + Azure SQL + Azure API Management + Azure AD + Event Hub) as worked examples.

## Tasks
- [ ] Add/update a tutorial covering `data-pipeline-gcp` (owner: Zara Osei, workspace: `orbital-production`)
- [ ] Add/update a tutorial covering `stellar-saas-platform` (owner: Marcus Webb, workspace: `stellar-main`) to demonstrate cross-org design access
- [ ] Add screenshots per screenshot standards in `/cloud/getting-started/meet-five/five-narrative-plan`
- [ ] Link to `/cloud/getting-started/meet-five` for cast context

## Reference
- Narrative: `/cloud/getting-started/meet-five`
- Spec: `docs/superpowers/specs/2026-04-28-five-narrative-design.md`
- Difficulty: High
EOF
)"
```

- [ ] **Step 5: Verify all 12 issues were filed**

```bash
gh issue list --repo layer5io/docs --label "kind/enhancement" --limit 15 \
  --json number,title \
  --jq '.[] | "\(.number): \(.title)"' | grep -E "Five|narrative|orbital|five|cast|Zara|Jordan|Marcus|Kanvas.*aws|pipeline"
```

Expected: 12 issue numbers with the titles from Steps 1–4.

---

## Task 11: Final Build Verification

- [ ] **Step 1: Full clean build**

```bash
cd docs
make clean 2>&1 | tail -5
```

Expected: Build completes without errors.

- [ ] **Step 2: Verify all internal links from the about page resolve**

```bash
cd docs
hugo --quiet 2>&1 | grep -i "error\|warn\|ref.*not found\|anchor.*not found" || echo "All clear"
```

Expected: `All clear`

- [ ] **Step 3: Check the about page appears in navigation**

Start `make site` and verify:
- `http://localhost:1313/cloud/getting-started/meet-five/` — narrative page loads, all 3 org cards visible, all 6 character cards visible, images render
- `http://localhost:1313/cloud/getting-started/meet-five/five-narrative-plan/` — research plan loads, integration map table renders
- `http://localhost:1313/cloud/getting-started/` — alert callout with Five link is visible
- Click the "Meet Five and the full cast →" link from Getting Started — navigates to `/cloud/getting-started/meet-five/`

- [ ] **Step 4: Final commit (if any fixes were needed)**

```bash
git add -p
git commit -s -m "[Docs] Fix any build issues found during final verification"
```

---

## Task 12: Open Pull Request

- [ ] **Step 1: Push the branch**

```bash
git push -u origin HEAD
```

- [ ] **Step 2: Open the PR**

```bash
gh pr create \
  --repo layer5io/docs \
  --title "[Docs] Establish Five and Orbital Labs as continuous docs narrative (issue #457)" \
  --body "$(cat <<'EOF'
## Summary

Implements [issue #457](https://github.com/layer5io/docs/issues/457) — establishes a continuous narrative in Layer5 Cloud docs built around Five (the mascot) and a cast of fictional characters.

- Adds `/cloud/getting-started/meet-five` — the canonical "Meet Five and the Cast" reference page with origin story, three fictional orgs (Constellation Cloud, Orbital Labs, Stellar Dynamics), six named characters with role/personality profiles, and a seed inventory of canonical workspace/environment/design names for use across all docs
- Adds `/cloud/getting-started/meet-five/five-narrative-plan` — section-by-section integration map, mascot usage guide, screenshot standards, and priority order for rolling out narrative updates
- Updates `cloud/getting-started` with a Five intro callout linking to `/cloud/getting-started/meet-five`
- Copies Five SVG assets from `layer5` repo into `static/images/five/`
- Files 12 follow-up issues (4 batches) for phased narrative integration across Cloud and Kanvas docs

## Three Orgs
| Org | Type | Plan |
|---|---|---|
| Constellation Cloud | MSP / Provider | Enterprise |
| Orbital Labs | Five's startup | Team |
| Stellar Dynamics | Enterprise client | Enterprise |

## Six Characters
Dr. Aiko Sato (Provider Admin), Five (Platform Engineer), Maya Chen (Org Admin + Dev Team Admin), Zara Osei (Infra Team Admin), Rex Park (Developer), Jordan Reyes (Designer), Marcus Webb (Enterprise Org Admin)

## Test plan
- [ ] `make clean` completes without errors
- [ ] `/cloud/getting-started/meet-five/` renders: org cards, character cards, hierarchy table, seed inventory, callout
- [ ] `/cloud/getting-started/meet-five/five-narrative-plan/` renders: integration map table, mascot guide, screenshot standards
- [ ] `/cloud/getting-started/` shows Five intro callout with working link to `/cloud/getting-started/meet-five`
- [ ] All 12 follow-up issues filed and visible in repo issue tracker

Closes #457
EOF
)"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Narrative page with origin story, orgs, cast, hierarchy, seed inventory — Tasks 2–7
- [x] Research plan page — Task 8
- [x] Getting Started modification — Task 9
- [x] 12 follow-up GitHub issues — Task 10
- [x] SVG assets copied — Task 1

**Placeholder scan:** No TBD/TODO in any task steps. The mascot guide SVG assignments (6–19) are marked as directional with an explicit alert to preview before using — intentional, not a placeholder.

**Type consistency:** No code types; all file paths, shortcode names, and image paths are consistent throughout (e.g., `/images/five/1.svg` used identically in Tasks 5 and 8).
