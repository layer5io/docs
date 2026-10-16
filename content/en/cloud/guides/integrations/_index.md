---
title: Integrations
description: >
  Connect Layer5 Cloud to GitHub and to the infrastructure you manage, and see which integrations exist today.
weight: 50
diataxis: how-to
categories: [integrations]
tags: [integrations, github, connections]
---

Integrations connect Layer5 Cloud to systems outside it. Today that means GitHub, for importing infrastructure files and posting pull-request snapshots, and the infrastructure connections that Meshery Servers register. This page lists every integration the product offers, what each one does, and where to configure it, so you can tell quickly whether Layer5 Cloud can connect to the tool you use.

## Integration matrix

| Integration | What it does | Where to start |
| --- | --- | --- |
| GitHub (Layer5 GitHub App) | Reads the repositories you grant, imports Kubernetes manifests, Helm charts, Docker Compose files, and Meshery designs as private designs, and can commit a snapshot workflow to a repository. | [Connect GitHub]({{< ref "cloud/guides/integrations/github-integration/index.md" >}}) |
| GitHub Actions (Kanvas Snapshot) | Posts a picture of your infrastructure on every pull request. | [Use GitHub Actions]({{< ref "cloud/guides/integrations/github-actions/_index.md" >}}) |
| Meshery Server | Registers each Meshery Server as a connection, so you can see and manage the servers in your organization. | Listed under Meshery on the Integrations tab. |
| Kubernetes | Lists the clusters your Meshery Servers manage, so you can assign them to environments. | [Manage Environments]({{< ref "cloud/guides/workspaces/managing-environments/index.md" >}}) |
| Prometheus | Lists Prometheus connections that Meshery Servers report. | Listed under Prometheus on the Integrations tab. |

Meshery Servers register Meshery, Kubernetes, and Prometheus connections. Layer5 Cloud has no setup wizard for them. The Integrations tab shows what the servers in your organization registered, and you assign those connections to environments to decide which teams reach them.

### Not available

Layer5 Cloud does not offer these integrations:

- **Slack, PagerDuty, and Datadog.** Cloud has no outbound connector for chat, paging, or alerting tools. It notifies people by email, subject to each user's notification preferences, and records activity in the event log.
- **Grafana and Helm.** The Integrations tab shows cards for both, but they cannot be opened.
- **GitLab, Bitbucket, and GitHub Enterprise Server.** GitHub on github.com is the only supported source host.

## Who can use integrations

The Integrations tab appears for roles that hold the View Connections permission. Deleting a connection needs Delete a connection, and you can delete only connections you own.

{{< keys-matrix functions="View Connections|Delete a connection|Assign connections to environment" caption="Integration permissions by role" >}}

The GitHub connection is personal: each user connects their own GitHub account, and no one else in the organization can use it. See [Connect GitHub]({{< ref "cloud/guides/integrations/github-integration/index.md" >}}) for details.

## Next steps

- [Connect GitHub]({{< ref "cloud/guides/integrations/github-integration/index.md" >}}) to import designs from your repositories.
- [Use GitHub Actions]({{< ref "cloud/guides/integrations/github-actions/_index.md" >}}) to add pull-request snapshots.
- [Feature Availability by Plan]({{< ref "cloud/reference/feature-availability.md" >}}) shows which plans include GitOps integrations.
