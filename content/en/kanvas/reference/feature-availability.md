---
title: Feature Availability by Plan
description: Which Kanvas capabilities each Layer5 plan includes, and the role, provider, and hosting conditions that also decide whether a capability is available to you.
weight: 10
diataxis: reference
categories: [reference]
tags: [plans, subscriptions, limits]
---

This page tells you which Kanvas capabilities each Layer5 plan includes. Your plan is the first condition for using a capability, not the only one: your role, your provider, and where you run Kanvas also decide what you can do. Those conditions follow the matrix.

## Plans

The matrix has one column for each of the four Layer5 plans: Free, Team Designer, Team Operator, and Enterprise. Entitlements follow your organization's plan. Current pricing and plan details are listed at [layer5.io/pricing](https://layer5.io/pricing).

## Reading the matrix

- A check mark means the plan includes the capability.
- A dash means the plan does not include it.
- Each table covers one category of capability. The **What it does** column describes the capability in one sentence.

The matrix is refreshed automatically from the Layer5 product feature list. It lists the capabilities that have a documentation page. A capability that does not appear here is not necessarily unavailable; check the page that documents it.

## Capabilities by plan

{{< feature-tiers categories="Configuration Management|Lifecycle Management|Kanvas|Collaboration|Performance Management" >}}

## Availability depends on more than your plan

A capability is available to you only when all of the following hold: your plan includes it, your role grants it, your provider supports it, and your Kanvas deployment can reach a cluster when the capability needs one.

### Your role

Your organization assigns you roles, and each role grants a set of permissions. Kanvas checks a permission before it offers Validate, Dry run, Deploy, Undeploy, Share, and Publish. An action your role does not grant is not offered, even when your plan includes it. See [Permissions by Role]({{< ref "kanvas/reference/permissions.md" >}}) for which role holds which permission.

### Your provider

Kanvas stores designs, views, the catalog, and sharing records with a remote provider, Layer5 Cloud. Meshery can also run with a local provider, which has no remote service behind it. Under the local provider, every provider-bound feature, including views, the catalog, sharing, and support requests, returns HTTP 501 Not Implemented. Run Meshery with a remote provider to use these features.

### Where you run Kanvas

The hosted Kanvas at [kanvas.new](https://kanvas.new) is for authoring designs. Every capability that needs a cluster requires a Meshery deployment that you run: the [Meshery Playground](https://playground.meshery.io) or your own self-hosted Meshery.

| Capability | kanvas.new | Meshery you run |
|---|---|---|
| Author and edit designs | Available | Available |
| Validate | Shows a prompt | Available |
| Dry run | Shows a prompt | Available |
| Deploy | Shows a prompt | Available |
| Undeploy | Shows a prompt | Available |
| Connect clusters | Shows a prompt | Available |
| Operator mode | Shows a prompt | Available |
| Share | Requires an account | Requires an account |
| Publish | Requires an account | Requires an account |

On kanvas.new, a cluster-bound capability opens a prompt that directs you to the Meshery Playground or a self-hosted Meshery deployment. Share and Publish open a sign-in prompt when you are not signed in. For why the hosted site differs, see [How Kanvas Works with Meshery and Layer5 Cloud]({{< ref "kanvas/concepts/architecture/index.md" >}}).

## Limits by plan

Each plan caps the number of components in a single design, and Kanvas enforces the cap whenever you save or import a design. The limit for each plan and the error you receive when a design exceeds it are in [Components per design]({{< ref "kanvas/concepts/designs/index.md#components-per-design" >}}).

## Support by plan

The support channels and response commitments each plan includes are listed in [Support channels by plan]({{< ref "kanvas/reference/help-and-support.md#support-channels-by-plan" >}}).
