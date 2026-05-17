---
title: Organizations
description: >
  Organizations serve as the fundamental component of multi-tenancy within the Layer5 Cloud.
weight: 1
categories: [Identity]
tags: [orgs]
aliases:
  - /cloud/identity/organizations/

---

Organizations are the basic unit of multi-tenancy inside of Layer5 Cloud. Organizations can have any number of teams. Teams can have any number of users. Users can belong to any number of teams. Users may belong to any number of organizations.

Outside of grouping users together, teams offer control access to workspaces and to workspace resources such as environments and managed and unmanaged connections

<img src="/cloud/concepts/identity-and-security/images/organization_units.svg" alt="Organizational units" style="width: 35%;" />

## Example: The Orbital Labs Ecosystem

The following organizations illustrate how multi-tenancy works across provider, startup, and enterprise tiers. Follow along in the rest of the docs using [Five and the cast at Orbital Labs](/cloud/getting-started/meet-five).

{{< cardpane >}}
{{% card header="**Constellation Cloud** — Provider" %}}
**Type:** Managed Service Provider  
**Plan:** Enterprise  
**Provider Admin:** Dr. Aiko Sato

Constellation Cloud manages multiple tenant organizations, including Orbital Labs and Stellar Dynamics. As the provider, it controls the top-level entitlement configuration for all tenants.

*"We keep the lights on so you don't have to."*
{{% /card %}}
{{% card header="**Orbital Labs** — Startup Tenant" %}}
**Type:** Cloud-native startup  
**Plan:** Team  
**Org Admin:** Maya Chen

Orbital Labs is a tenant of Constellation Cloud. Users at Orbital Labs belong to one or more teams (Infrastructure, Development) and access workspaces within their organization.

*"Moving fast and occasionally breaking staging."*
{{% /card %}}
{{% card header="**Stellar Dynamics** — Enterprise Tenant" %}}
**Type:** Enterprise client  
**Plan:** Enterprise  
**Org Admin:** Marcus Webb

Stellar Dynamics is a separate tenant of Constellation Cloud and an enterprise client of Orbital Labs. Users at Stellar Dynamics can be granted access to specific Orbital Labs workspaces and designs via cross-org access controls.

*"Fortune 500, cloud-native ambitions, legacy everything."*
{{% /card %}}
{{< /cardpane >}}

### Cross-Organization Access

Users of one organization may be granted access to resources (workspaces, designs) in another organization. Entitlements are org-scoped: the permissions a user has in Orbital Labs do not automatically apply in Stellar Dynamics, and vice versa.

{{< alert type="info" >}}
See [Meet Five and the Cast](/cloud/getting-started/meet-five) for the full narrative reference, including team structure and workspace inventory.
{{< /alert >}}
