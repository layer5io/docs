---
title: Layer5 Cloud Documentation
linkTitle: Cloud
description: What Layer5 Cloud does for Kanvas and Meshery, what it leaves to Meshery Server, and where to start.
diataxis: explanation
type: docs
menu: {main: {weight: 2}}
cascade:
    type: docs
---

Layer5 Cloud is the identity, tenancy, and collaboration service behind Kanvas and Meshery. It signs users in, organizes them into organizations, teams, and workspaces, decides what each of them may do, and stores the designs they create and share. Layer5 Cloud runs as a hosted service and as a [self-hosted]({{< ref "cloud/guides/self-hosted/_index.md" >}}) deployment.

{{% pageinfo %}}

## Understanding the Layer5 Ecosystem

{{< ecosystem-box icon="cloud" title="Layer5 Cloud" >}}
is the identity provider and remote provider for Kanvas and Meshery. It owns accounts, organizations, teams, workspaces, roles, and the catalog, and it stores every design and design version. It is available as a hosted service or self-hosted.
{{< /ecosystem-box >}}

{{< ecosystem-box link="kanvas/_index.md" icon="images/logos/kanvas-icon-color.svg" image="true" class="hidden-highlight-box" title="Kanvas" >}}
is a visual designer and operator for Kubernetes and multi-cloud infrastructure. It runs as an extension inside Meshery and uses Layer5 Cloud to store, share, and publish designs.
{{< /ecosystem-box >}}

{{% /pageinfo %}}

## What Layer5 Cloud does

**Sign-in and identity.** Users create an account with an email address and password, with GitHub, or with Google. An organization that configures its own identity providers, including a generic OIDC provider, offers those instead. A signed-in user can link a GitHub or Google account to an existing profile, so either method signs in to the same profile. Email sign-ups verify their address before password sign-in works.

**Tenancy.** Organizations own teams and workspaces. A team belongs to the organization it is created in, a workspace can hold any number of teams, and a team can belong to several workspaces. At first sign-in, every new user receives a default organization, team, and workspace: they hold the Organization Admin role on the organization, the Team Admin role on the team, and own the workspace, so they can start working immediately.

**Authorization.** Roles, keys, and keychains decide what each user may do. A key is a single permission, a keychain groups keys, and a role carries keychains. Users hold roles within an organization, so the same person can have different permissions in different organizations. Built-in roles cover the provider, organization, team, and workspace levels, and organization admins invite users and assign their roles. See [Identity and Security]({{< ref "cloud/concepts/identity-and-security/_index.md" >}}).

**Design storage and sharing for Kanvas.** Layer5 Cloud persists every Kanvas design and every version of it, records who each design is shared with, and keeps the event log. A design belongs to at most one workspace at a time. Real-time collaboration in Kanvas starts with a signaling service that Layer5 Cloud hosts; after participants connect, edits synchronize directly between their browsers.

**The catalog.** The [catalog]({{< ref "cloud/concepts/catalog/_index.md" >}}) publishes reusable designs. Anyone can browse it. A signed-in user with the right permission can clone a published or public design into their own workspace, download it, or open it in Kanvas on the [Meshery Playground](https://playground.meshery.io).

**Remote provider for Meshery Server.** Meshery Server connects to Layer5 Cloud as its remote provider. Users sign in to Meshery through Layer5 Cloud, Meshery Server registers itself as a connection owned by the signed-in user, and Layer5 Cloud returns a capabilities document that tells Meshery which features to enable for that user. Every new user holds the Kanvas role, which enables the Kanvas extension when their Meshery Server connects.

**Academy.** [Academy]({{< ref "cloud/academy/_index.md" >}}) delivers learning paths, challenges, and certifications, and gives content creators the tools to build and publish their own.

## What Layer5 Cloud does not do

- **It does not deploy to or manage your clusters.** Meshery Server, running in your environment, talks to your Kubernetes clusters through Meshery Operator and MeshSync, and performs every dry-run, deploy, and undeploy.
- **It does not run Kanvas.** Kanvas is an extension that runs inside Meshery. Kanvas sends its requests to Meshery Server, which forwards design, catalog, and sharing requests to Layer5 Cloud. Real-time collaboration signaling is the only direct path from the browser to Layer5 Cloud.

[How Layer5 Cloud works]({{< ref "cloud/concepts/architecture/index.md" >}}) explains these boundaries in depth, and [How Kanvas Works with Meshery and Layer5 Cloud]({{< ref "kanvas/concepts/architecture/index.md" >}}) covers them from the Kanvas side.

## Choose your path

| Section | Go here to |
|---|---|
| [Getting Started]({{< ref "cloud/getting-started/_index.md" >}}) | Create an account and learn what Layer5 Cloud sets up for you at first sign-in. |
| [Tutorials]({{< ref "cloud/guides/tutorials/_index.md" >}}) | Work through end-to-end examples that build a working mental model. |
| [How-to Guides]({{< ref "cloud/guides/_index.md" >}}) | Complete a specific task: manage organizations and workspaces, connect integrations, or self-host. |
| [Concepts]({{< ref "cloud/concepts/_index.md" >}}) | Understand organizations, teams, workspaces, roles, the catalog, and how they relate. |
| [Reference]({{< ref "cloud/reference/_index.md" >}}) | Look up default permissions by role and the API. |
| [Academy]({{< ref "cloud/academy/_index.md" >}}) | Take learning paths and certifications, or create and publish your own content. |

To design infrastructure with what Layer5 Cloud stores, go to the [Kanvas documentation]({{< ref "kanvas/_index.md" >}}).

## What each plan includes

The following matrix shows which Layer5 Cloud capabilities each subscription plan includes. For default permissions by role, see the [Reference]({{< ref "cloud/reference/_index.md" >}}) section.

{{< feature-tiers categories="Identity & Access Management|Workspaces|Catalog|Security|Support and Deployment|Academy" >}}
