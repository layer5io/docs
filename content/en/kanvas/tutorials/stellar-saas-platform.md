---
title: "Cross-Org Design Access: stellar-saas-platform"
description: >
  Learn how Stellar Dynamics accesses and collaborates on a shared design with Orbital Labs using cross-org permissions in Kanvas.
weight: 7
categories: [Designer, Tutorials]
---

Stellar Dynamics is Orbital Labs' biggest enterprise client — and its most exacting one. Marcus Webb, Org Admin for Stellar Dynamics, needs to build `stellar-saas-platform` in Kanvas: a full Azure-native SaaS architecture that his engineering team will own and operate, but that Orbital Labs' Infrastructure Team needs to review for architectural alignment. The twist is that Marcus and Five work for different organizations. This tutorial demonstrates how Kanvas cross-organization design access makes that collaboration possible without collapsing the permission boundary between the two orgs.

## Architecture overview

The `stellar-saas-platform` design models Stellar Dynamics' production SaaS stack. It spans five Azure services:

| Component | Role |
|-----------|------|
| AKS (Azure Kubernetes Service) | Compute backbone — application workloads |
| Azure SQL | Relational data layer |
| Azure API Management | API gateway — external and internal traffic |
| Azure AD | Identity and access management |
| Event Hub | Event streaming and async messaging |

Marcus owns the design in the `stellar-main` workspace under the Stellar Dynamics org. The `stellar-enterprise` environment holds active connections for AKS, Azure SQL, Azure API Management, and Azure AD — making it the natural binding target.

## Tutorial

### Step 1: Marcus opens Kanvas as Stellar Dynamics Org Admin

Marcus logs into Layer5 Cloud using his Stellar Dynamics credentials. His account carries the Org Admin role for Stellar Dynamics, which gives him full design and workspace management permissions within that org.

He navigates to **Kanvas → Designer** and confirms that the workspace selector shows `stellar-main` — the workspace designated for Stellar Dynamics' primary architecture work.

### Step 2: Create the stellar-saas-platform design

Marcus selects **New Design** from the Designer toolbar. He names the design `stellar-saas-platform` and, because `stellar-main` is already selected as his active workspace, the design is created there automatically.

He adds a short description — "Azure SaaS platform: AKS, SQL, APIM, AAD, Event Hub" — so the design is identifiable in the workspace list without opening it.

### Step 3: Add Azure components and draw connections

Marcus opens the **Component Library** and filters by provider: `Azure`. He places five components on the canvas:

- **AKS Cluster** — named `saas-aks`; the compute layer running all application microservices
- **Azure SQL** — named `saas-sql`; relational persistence for the SaaS data model
- **Azure API Management** — named `saas-apim`; the API gateway handling all inbound traffic from external clients
- **Azure AD** — named `saas-aad`; identity provider and RBAC authority for both the platform and its tenants
- **Event Hub** — named `saas-events`; the event streaming backbone for async workloads and audit logging

With all five components on the canvas, Marcus draws the connection edges:

1. **saas-apim → saas-aks** — API Management routes validated requests to AKS workloads
2. **saas-aks → saas-sql** — application microservices read and write to Azure SQL
3. **saas-aks → saas-events** — microservices publish domain events to Event Hub
4. **saas-aad → saas-apim** — API Management delegates authentication to Azure AD (OAuth 2.0 / OIDC)
5. **saas-aad → saas-aks** — workload identity is managed through Azure AD for pod-level auth

He annotates the **saas-aad → saas-apim** edge with `oauth2/oidc` to make the authentication protocol explicit for reviewers.

### Step 4: Attach the stellar-enterprise environment

Marcus opens **Design Settings → Environments** and selects `stellar-enterprise` from the list. This environment carries live connections for AKS, Azure SQL, Azure API Management, and Azure AD — once attached, Kanvas resolves those components against real infrastructure and surfaces connection status on the canvas.

He saves the environment binding. The `saas-aks` node now shows the live AKS cluster version and node count pulled from the `stellar-enterprise` connection.

### Step 5: Cross-org sharing with Orbital Labs

This is the step that makes the tutorial interesting. Marcus wants Five — a Platform Engineer at Orbital Labs — to review the design. But Five is not a member of Stellar Dynamics; he belongs to a completely separate organization.

Cross-org sharing is possible here because both Stellar Dynamics and Orbital Labs are managed under **Constellation Cloud**, a shared MSP provider. Dr. Aiko Sato, Constellation Cloud's Provider Admin, has already configured cross-org access permissions that allow design sharing across the two orgs. Without that provider-level configuration, the Share dialog would not surface users from the other organization at all.

Marcus opens the **Share** panel on `stellar-saas-platform`. He types Five's name in the user search field. Because Dr. Aiko Sato has established the cross-org trust relationship, Five appears as a valid share target even though he belongs to Orbital Labs. Marcus selects **view + comment** as the permission level — Five will be able to read the design and leave comments, but not move components or edit connections.

Marcus clicks **Share**. Five receives an in-app notification in his Orbital Labs account.

{{< alert type="info" title="Cross-Org Access" >}}
Cross-organization design sharing requires that both organizations exist under a shared Provider (Constellation Cloud in this scenario). The Provider Admin (Dr. Aiko Sato) must have configured cross-org permissions before sharing can occur. See [Roles and Keychains](/cloud/concepts/identity-and-security/roles/) for the permission model.
{{< /alert >}}

### Step 6: Five reviews the design from Orbital Labs

Five opens the shared design notification from his Orbital Labs account. The `stellar-saas-platform` design loads in Kanvas with a read-only canvas — he can inspect all five Azure components, explore their configuration panels, and view the connection annotations, but the drag, connect, and delete controls are disabled for him.

After a few minutes of review, Five leaves a comment pinned to the **saas-apim** component:

> "You're missing a WAF in front of API Management — Zara is going to notice."

He also adds a general design comment noting that the Event Hub retention period should be explicitly configured if the audit logging use case requires replay beyond the default 24-hour window.

Marcus receives a notification that Five has left comments and opens the comment thread.

### Step 7: Marcus acts on the review

Marcus reads Five's comments. The WAF observation is valid — Stellar Dynamics' security baseline requires a Web Application Firewall in front of any public API endpoint. He adds an **Azure Application Gateway** component (with WAF tier selected in the configuration panel) to the canvas:

- He names it `saas-waf-gateway`
- He draws an edge from **saas-waf-gateway → saas-apim**, replacing the implicit external-client entry point with an explicit WAF-gated path
- He annotates the new edge with `waf-v2` to indicate the WAF policy tier

Marcus resolves Five's WAF comment and replies: "Added Application Gateway (WAF v2) in front of APIM. Retention on Event Hub is set to 7 days in the environment config — will surface that in the design next pass."

The `stellar-saas-platform` design now reflects the correct architecture, the review loop is documented in the comment history, and the cross-org collaboration happened entirely within Kanvas — no design files exported, no screenshots emailed.

{{< alert type="info" >}}
Meet Marcus, Five, Dr. Aiko, and the rest of the cast at [Meet Five and the Cast](/cloud/getting-started/meet-five).
{{< /alert >}}
