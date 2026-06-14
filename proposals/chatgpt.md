```markdown
# Layer5 Cloud Documentation — Diátaxis-Aligned Structure

## /cloud/
```

/cloud/ ├── \_index.md ├── tutorials/ ├── how-to/ ├── reference/ ├──
explanation/ └── features/

```

---

## Cloud Landing Page

### `/cloud/_index.md`

**Purpose**
- Introduce Layer5 Cloud
- Route users by intent (learn, do, look up, understand)

**Sections**
- What is Layer5 Cloud?
- Choose your path:
  - Learn Layer5 Cloud → Tutorials
  - Perform a task → How-to Guides
  - Look something up → Reference
  - Understand how it works → Explanation
- Feature index (cross-links only)

---

## Tutorials (Learning-Oriented)

📍 Goal: Guided, end-to-end learning journeys
📍 Audience: New users or users learning a workflow

```

/cloud/tutorials/ ├── \_index.md ├── onboarding-to-layer5-cloud.md ├──
first-organization-and-space.md ├── collaborating-with-teams.md ├──
securing-your-first-workspace.md ├── publishing-and-sharing-designs.md └──
integrating-cloud-with-meshery.md

```

---

## How-to Guides (Task-Oriented)

📍 Goal: Solve a specific problem
📍 Audience: Users who already understand the system

```

/cloud/how-to/ ├── \_index.md ├── identity/ │ ├── invite-users.md │ ├──
manage-teams.md │ ├── configure-roles.md │ └── revoke-access.md ├── security/ │
├── configure-sso.md │ ├── manage-api-tokens.md │ ├── audit-access-logs.md │ └──
rotate-credentials.md ├── spaces/ │ ├── create-and-delete-spaces.md │ ├──
move-assets-between-spaces.md │ └── manage-space-permissions.md ├── catalog/ │
├── publish-to-catalog.md │ ├── import-from-catalog.md │ └── version-assets.md
├── automation/ │ ├── use-github-actions.md │ └── trigger-cloud-workflows.md └──
self-hosted/ ├── connect-self-hosted-meshery.md └── configure-cloud-sync.md

```

---

## Reference (Authoritative Lookup)

📍 Goal: Precise, complete, factual information
📍 Audience: Users who need to look something up

```

/cloud/reference/ ├── \_index.md ├── api/ │ ├── rest-api.md │ ├──
authentication.md │ └── rate-limits.md ├── identity/ │ ├──
roles-and-permissions.md │ ├── role-matrix.md │ └── permission-definitions.md
├── objects/ │ ├── organization.md │ ├── space.md │ ├── user.md │ └── asset.md
├── configuration/ │ ├── environment-variables.md │ └── feature-flags.md └──
limits-and-quotas.md

```

---

## Explanation (Conceptual & Architectural)

📍 Goal: Build understanding and mental models
📍 Audience: Users who want to understand “why” and “how”

```

/cloud/explanation/ ├── \_index.md ├── cloud-architecture.md ├──
identity-and-access-model.md ├── multi-tenancy-and-spaces.md ├──
security-model.md ├── data-ownership-and-isolation.md ├──
cloud-vs-self-hosted.md └── infrastructure-as-design-in-cloud.md

```

---

## Feature Index (Non-Diátaxis Routing Layer)

📍 Goal: Cross-reference entry points
📍 Not a primary documentation type

```

/cloud/features/ ├── identity.md ├── security.md ├── spaces.md ├── catalog.md
└── automation.md

```

Each feature page:
- Brief description
- Links to:
  - Relevant Tutorials
  - Relevant How-to Guides
  - Relevant Explanation pages
  - Relevant Reference pages

---

## Mapping from Current Docs → Diátaxis Structure

| Current Section | New Location |
|-----------------|--------------|
| Getting Started | Tutorials |
| Tutorials | Tutorials (rewritten as learning paths) |
| Identity | How-to + Reference + Explanation |
| Security | How-to + Explanation |
| Spaces | How-to + Explanation |
| Catalog | How-to |
| Academy | Tutorials (or external) |
| GitHub Actions | How-to → Automation |
| Self-Hosted | Explanation + How-to |
| Reference | Reference (expanded and cleaned) |
```

If you want, I can next:

- Convert **one existing Cloud doc page** into all four Diátaxis forms, or
- Draft a **Docusaurus sidebar configuration** matching this structure.
