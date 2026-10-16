---
title: Self-Hosted Deployments
linkTitle: Self-Hosted
description: >
  Run Layer5 Cloud on your own Kubernetes cluster so identity, designs, and organization data stay inside your network. Find what you deploy, what you operate, and where to start.
weight: 60
diataxis: how-to
categories: [self-hosted]
tags: [self-hosted, helm, deployment]
aliases:
  - /cloud/self-hosted/
---

A self-hosted deployment runs the same Layer5 Cloud that Layer5 operates, on infrastructure you control. Your users sign in against your identity services, your organizations and designs live in your database, and Meshery Servers in your network connect to your deployment as their [remote provider](https://docs.meshery.io/extensibility/providers). Your data stays in your database.

Self-hosting is part of the Enterprise plan.

{{< feature-tiers functions="Self-hosted Deployment|Managed Service Provider|Cloud as an IDP" >}}

## What you deploy

One Helm chart, `layer5-cloud`, installs the identity-aware application and its two identity services. You supply the database, the ingress, and the TLS certificate.

| Component | Provided by | What it does |
| --- | --- | --- |
| Layer5 Cloud server | `layer5-cloud` chart | Serves the web UI and the API, enforces organizations, teams, roles, and keys, and runs the signaling endpoint for real-time co-editing. Listens on port 9876. |
| Kratos | Subchart | Owns accounts: password sign-in, social sign-in, email verification, and account recovery. |
| Hydra | Subchart | Issues OAuth2 tokens to the UI, to Meshery Servers, and to API clients. |
| PostgreSQL | You | Holds three databases on one server: `meshery`, `kratos`, and `hydra`. |
| Ingress controller and TLS | You | Publishes one hostname. Routes `/` to the server, `/kratos` to Kratos, `/hydra` to Hydra, and passes WebSocket upgrades on `/collaboration`. |
| SMTP relay | You | Sends invitations, notifications, and identity mail (verification and recovery). |
| Webhook receivers | You | Optional endpoints that receive support requests, signup decisions, and Kanvas entitlement events. |

Meshery Server is deployed separately and is not part of this chart. See [Meshery Server registration]({{< ref "cloud/concepts/meshery-server-registration.md" >}}) for how a Meshery Server attaches to a provider.

## What changes when you host it

| Area | On your deployment |
| --- | --- |
| Provider administration | Your operators hold the Provider Admin role. They create the first organization, assign custom roles, and approve signup requests. See [Roles and Permissions]({{< ref "cloud/reference/default-permissions.md" >}}). |
| Default sign-in providers | You register the Google and GitHub OAuth applications that every organization without its own credentials uses. See [Identity Services]({{< ref "cloud/guides/self-hosted/planning/identity-services/index.md" >}}). |
| Mail | The shared relay is yours. Organizations can still register their own. See [Troubleshoot Email Delivery]({{< ref "cloud/guides/self-hosted/operating/smtp.md" >}}). |
| Branding and domains | Organizations apply their own theme and domain; you set the provider-level defaults. See [White-label Layer5 Cloud]({{< ref "cloud/guides/self-hosted/white-labeling/_index.md" >}}). |
| Upgrades | You choose when to upgrade. The server applies database migrations at startup. |
| Billing | Plan entitlements are not enforced by the deployment beyond the component limit. See [Feature Availability]({{< ref "cloud/reference/feature-availability.md" >}}). |

## Plan, deploy, operate

1. **[Plan a deployment]({{< ref "cloud/guides/self-hosted/planning/_index.md" >}}).** Decide on the database, hostname, identity providers, mail relay, provider administrator, and network paths.
2. **[Deploy Layer5 Cloud]({{< ref "cloud/guides/self-hosted/deployment/_index.md" >}}).** Install with Helm, create the Hydra client, and confirm the deployment is ready.
3. **Configure.** Set [chart values]({{< ref "cloud/guides/self-hosted/deployment/helm-chart-values.md" >}}), [provider initialization]({{< ref "cloud/guides/self-hosted/deployment/provider-initialization.md" >}}), and [webhooks]({{< ref "cloud/guides/self-hosted/customizing-webhooks.md" >}}).
4. **Operate.** Watch [health and logs]({{< ref "cloud/guides/self-hosted/planning/monitoring.md" >}}) and diagnose [mail delivery]({{< ref "cloud/guides/self-hosted/operating/smtp.md" >}}).

Real-time co-editing has one network dependency outside your cluster: browsers must reach public STUN and TURN hosts to connect to each other. See [Networking]({{< ref "cloud/guides/self-hosted/planning/peer-to-peer-communication/index.md" >}}) before you deploy into a restricted network.
