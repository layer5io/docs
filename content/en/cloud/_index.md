---
title: Cloud Documentation
description: >
  Layer5 Cloud provides a powerful platform for managing and deploying your cloud infrastructure with flexibility and ease.
linkTitle: Cloud
type: docs
menu: {main: {weight: 2}}
cascade:
    type: docs
---

{{% pageinfo %}}

## Understanding the Layer5 Ecosystem

{{< ecosystem-box icon="cloud" title="Layer5 Cloud" >}}
is the identity provider and remote provider for Kanvas and Meshery. It owns accounts, organizations, teams, workspaces, roles, and the catalog, and it stores every design and design version. It is available as a hosted service or self-hosted.
{{< /ecosystem-box >}}

{{< ecosystem-box link="kanvas/_index.md" icon="images/logos/kanvas-icon-color.svg" image="true" class="hidden-highlight-box" title="Kanvas" >}}
is a visual designer and operator for Kubernetes and multi-cloud infrastructure. It runs as an extension inside Meshery and uses Layer5 Cloud to store, share, and publish designs.
{{< /ecosystem-box >}}

{{% /pageinfo %}}

## What is Layer5 Cloud?

Layer5 Cloud is the identity, tenancy, and collaboration service behind Kanvas and Meshery. It signs users in, organizes them into organizations, teams, and workspaces, decides what each of them may do, and stores the designs they create and share. Layer5 Cloud runs as a hosted service and as a [self-hosted]({{< ref "cloud/guides/self-hosted/_index.md" >}}) deployment.

Meshery Server, running in your environment, is what talks to your Kubernetes clusters and performs every dry-run, deploy, and undeploy. Kanvas is an extension that runs inside Meshery. Kanvas sends its requests to Meshery Server, which forwards design, catalog, and sharing requests to Layer5 Cloud. Real-time collaboration signaling is the only direct path from the browser to Layer5 Cloud.

## Why use Layer5 Cloud?

- **Sign-in and identity.** Users create an account with an email address and password, with GitHub, or with Google. An organization that configures its own identity providers, including a generic OIDC provider, offers those instead. A signed-in user can link a GitHub or Google account to an existing profile, so either method signs in to the same profile. Email sign-ups verify their address before password sign-in works. After an email sign-up, Layer5 Cloud signs you in immediately, and opening the verification link verifies the address.
- **Tenancy.** Organizations own teams and workspaces. A team belongs to the organization it is created in, a workspace can hold any number of teams, and a team can belong to several workspaces. At first successful sign-in, every new user receives a default organization, team, and workspace: they hold the Organization Admin role on the organization, the Team Admin role on the team, and own the workspace.
- **Authorization.** Roles, keys, and keychains decide what each user may do. A key is a single permission, a keychain groups keys, and a role carries keychains. Users hold roles within an organization, so the same person can have different permissions in different organizations. Built-in roles cover the provider, organization, team, and workspace levels. See [Identity and Security]({{< ref "cloud/concepts/identity-and-security/_index.md" >}}).
- **Design storage and sharing for Kanvas.** Layer5 Cloud persists every Kanvas design and every version of it, records who each design is shared with, and keeps the event log. A design belongs to at most one workspace at a time. Real-time collaboration in Kanvas starts with a signaling service that Layer5 Cloud hosts. After participants connect, edits synchronize directly between their browsers.
- **The catalog.** Anyone can browse the [catalog]({{< ref "cloud/concepts/catalog/_index.md" >}}). A signed-in user with the Clone Design permission can clone a published or public design into their own workspace, download it, or open it in Kanvas on the [Meshery Playground](https://playground.meshery.io). Opening a design in the Playground does not clone it.
- **Remote provider for Meshery Server.** Users sign in to Meshery through Layer5 Cloud, Meshery Server registers itself as a connection owned by the signed-in user, and Layer5 Cloud returns a capabilities document that tells Meshery which features to enable for that user. Every new user holds the Kanvas role, which enables the Kanvas extension when their Meshery Server connects.
- **Academy.** [Academy]({{< ref "cloud/academy/_index.md" >}}) delivers learning paths, challenges, and certifications, and gives content creators the tools to build and publish their own.

## What Layer5 Cloud does not do

- **Cluster deploy and cluster management stay with Meshery Server.** Meshery Server talks to your Kubernetes clusters through Meshery Operator and MeshSync, and performs every dry-run, deploy, and undeploy.
- **Kanvas runs inside Meshery.** Kanvas sends its requests to Meshery Server, which forwards design, catalog, and sharing requests to Layer5 Cloud. Real-time collaboration signaling is the only direct path from the browser to Layer5 Cloud.

[Concepts]({{< ref "cloud/concepts/_index.md" >}}) explains how the building blocks relate, including how Layer5 Cloud, Meshery Server, and Kanvas divide the work.

## Plans

Layer5 sells four plans: Free, Team Designer, Team Operator, and Enterprise, each with monthly and annual billing. In subscription and entitlement records the Free plan is named Personal. Entitlements follow the organization's plan. Current prices are on the [pricing page](https://layer5.io/pricing).

Layer5 Cloud enforces one plan limit: components per design. The recorded limits are 100 on Free, 200 on Team Designer, 100 on Team Operator, and 300 on Enterprise. Saving or importing a design over the active plan's limit is refused with `Design exeeds maximum limit of N components supported by your current plan`. When an organization holds more than one active subscription, the highest component limit among them applies. An organization with no active subscription cannot save or import a design: the request fails with HTTP 500 and `Org is not entitled to adding components to a design`.

Other recorded quantities (relationships per design, image size, designs per workspace, workspaces per organization) are listed by `GET /api/entitlement/features` and are not enforced. For workspaces per organization on the Free plan, the plan records disagree: the monthly billing record sets 1 and the annual billing record sets 10. Authorization is by permission key. An action your role does not grant is refused with HTTP 403 even when the plan includes the capability. See [Subscriptions and billing]({{< ref "cloud/getting-started/getting-started-with-layer5-account.md#subscriptions-and-billing" >}}) for how a subscription is started, upgraded, and canceled.

<!-- {{< blocks/section color="dark" type="row" >}}
{{% blocks/feature icon="fa-lightbulb" title="Fastest OS **on the planet**!" %}}
The new **TechOS** operating system is an open source project. It is a new project, but with grand ambitions.
Please follow this space for updates!
{{% /blocks/feature %}}
{{% blocks/feature icon="fa-brands fa-github" title="Contributions welcome!" url="https://github.com/gohugoio/hugo" %}}
We do a [Pull Request](https://github.com/gohugoio/hugo/pulls) contributions workflow on **GitHub**. New users are always welcome!
{{% /blocks/feature %}}
{{% blocks/feature icon="./featured-background.png" title="Kanvas" url="/kanvas" %}}
**Kanvas** provides a visual interface that allows users to create and edit Kubernetes manifests, charts and pipelines, as well as monitor the performance and health of their clusters. Kanvas aims to simplify the complexity of Kubernetes and make it accessible to more users, similar to how Figma democratized design tools for web and mobile applications.
{{% /blocks/feature %}}
{{< /blocks/section >}} -->
