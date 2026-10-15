---
title: Feature Availability by Plan
description: Which Layer5 Cloud capabilities each Layer5 plan includes, the limits each plan records, and the role and deployment conditions that also decide whether a capability is available to you.
weight: 10
diataxis: reference
categories: [reference]
tags: [plans, subscriptions, limits]
---

This page tells you which Layer5 Cloud capabilities each Layer5 plan includes. Your plan is one condition for using a capability, not the only one: your role and where your Layer5 Cloud deployment runs also decide what you can do. Those conditions follow the matrix and the limits table.

## Plans

The matrix has one column for each of the four Layer5 plans: Free, Team Designer, Team Operator, and Enterprise. Each plan is offered with monthly and annual billing. The Free plan is the plan that Layer5 Cloud calls Personal in its plan records, so you see that name in subscription and entitlement data. Entitlements follow your organization's plan. Current pricing and plan details are listed at [layer5.io/pricing](https://layer5.io/pricing).

## Reading the matrix

- A check mark means the plan includes the capability.
- A dash means the plan does not include it.
- Each table covers one category of capability. The **What it does** column describes the capability in one sentence.

The matrix is refreshed automatically from the Layer5 product feature list. It lists the capabilities that have a documentation page. A capability that does not appear here is not necessarily unavailable; check the page that documents it.

This page covers the Layer5 Cloud categories. For design, deployment, collaboration, and performance capabilities, see [Kanvas Feature Availability by Plan]({{< ref "kanvas/reference/feature-availability.md" >}}).

## Capabilities by plan

{{< feature-tiers categories="Identity & Access Management|Workspaces|Catalog|Security|Managed Service Provider|Support and Deployment|Academy" >}}

## Limits by plan

Each plan records a quantity for the following entitlements.

| Entitlement | Free | Team Designer | Team Operator | Enterprise |
|---|---|---|---|---|
| Components per design | 100 | 200 | 100 | 300 |
| Relationships per design | 100 | 200 | 100 | 300 |
| Image size in a design | 250 KB | 1 MiB | 1 MiB | 10 MiB |
| Designs per workspace | Unlimited | Unlimited | Unlimited | Unlimited |
| Workspaces per organization | See note | 10 | 10 | Unlimited |

For workspaces per organization on the Free plan, the plan records disagree: the monthly billing record sets 1 and the annual billing record sets 10.

### Which limits Layer5 Cloud enforces

Layer5 Cloud enforces one limit today: components per design. When you save or import a design, Layer5 Cloud compares its component count with the limit of your organization's active plan. A design that exceeds the limit is refused with the error `Design exeeds maximum limit of N components supported by your current plan`, where N is the limit. To proceed, reduce the number of components in the design or upgrade the plan. When an organization holds more than one active subscription, the highest component limit among them applies. An organization with no active subscription cannot save or import a design; the request fails with HTTP 500 and the error `Org is not entitled to adding components to a design`.

Layer5 Cloud records every other quantity in the table and lists it through the entitlements API (`GET /api/entitlement/features`), but it does not refuse an action because of any of them. For the API's base URL and authentication, see the [API Reference]({{< ref "cloud/reference/api-reference/_index.md" >}}).

## Availability depends on more than your plan

### Your role

Authorization in Layer5 Cloud is by permission key. Each role you hold grants a set of keys, and your effective permissions are the union of the keys from every role you hold in the organization you are working in. An action your role does not grant is refused with HTTP 403, even when your plan includes the capability. See [Roles and Permissions]({{< ref "cloud/reference/default-permissions.md" >}}) for which role holds which permission.

### Where your deployment runs

Layer5 Cloud runs either as the hosted service that Layer5 operates or as a [self-hosted deployment]({{< ref "cloud/guides/self-hosted/_index.md" >}}) that you operate. Self-hosted Deployment is listed under the Enterprise plan in the **Support and Deployment** table. The difference that matters most for availability is provider administration. The Provider Admin role administers the deployment and passes every permission check; on a self-hosted deployment, your operators assign it.

### Custom roles

Only Provider Admins create custom roles. Layer5 Cloud refuses a role creation request from anyone else with HTTP 403. On hosted Layer5 Cloud, an organization therefore cannot create a custom role itself; on a self-hosted deployment, the operator's Provider Admins can. Roles are defined for the whole deployment, not per organization, so a role change applies in every organization where the role is held.

The **Custom Roles** and **User-defined Roles** rows in the **Identity & Access Management** table describe how those capabilities are packaged into plans. Layer5 Cloud does not check your plan when a custom role is created.

### Plan rows and enforcement

The component limit is the only entitlement Layer5 Cloud enforces by plan. The capability rows in the matrix describe how Layer5 packages its plans. When an action is unavailable and the plan is not the component limit, check your role and your deployment first.

## Support by plan

The support channels and response commitments each plan includes are listed in [Support]({{< ref "cloud/reference/support.md" >}}).
