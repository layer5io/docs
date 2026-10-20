# Integrations

> Guides for connecting Layer5 Cloud and Kanvas to external tools and workflows.


Integrations connect Layer5 Cloud to systems outside it. Today that means GitHub, for importing infrastructure files and posting pull-request snapshots, and the infrastructure connections that Meshery Servers register.

## Integration matrix

| Integration | What it does | Where to start |
| --- | --- | --- |
| GitHub (Layer5 GitHub App) | Reads the repositories you grant, imports Kubernetes manifests, Helm charts, Docker Compose files, and Meshery designs as private designs, and can commit a snapshot workflow to a repository. | [Integrating GitHub with Meshery](/cloud/getting-started/github-integration/) |
| GitHub Actions (Kanvas Snapshot) | Posts a picture of your infrastructure on every pull request. | [GitHub Actions](/cloud/guides/integrations/github-actions/) |
| Meshery Server | Registers each Meshery Server as a connection. | Listed under Meshery on the Integrations tab. |
| Kubernetes | Lists the clusters your Meshery Servers manage, so you can assign them to environments. | [Managing Environments](/cloud/guides/workspaces/managing-environments/) |
| Prometheus | Lists Prometheus connections that Meshery Servers report. | Listed under Prometheus on the Integrations tab. |

Meshery Servers register Meshery, Kubernetes, and Prometheus connections. Layer5 Cloud has no setup wizard for them. The Integrations tab shows what the servers in your organization registered, and you assign those connections to environments to decide which teams can read them.

### Not available

Layer5 Cloud does not offer these integrations:

- **Slack, PagerDuty, and Datadog.** Cloud has no outbound connector for chat, paging, or alerting tools. It notifies people by email, subject to each user's notification preferences, and records activity in the event log.
- **Grafana and Helm.** The Integrations tab shows cards for both, but they cannot be opened. Helm charts are imported as design files through GitHub or a direct import, which is separate from a Helm connection card. The Kanvas Snapshot Helm chart is documented at [Helm Kanvas Snapshot](/kanvas/concepts/helm-kanvas-snapshot/).
- **GitLab, Bitbucket, and GitHub Enterprise Server.** GitHub on github.com is the only supported source host.

## Who can use integrations

The Integrations tab appears for roles that hold the View Connections permission. Deleting a connection needs Delete a connection, and you can delete only connections you own. See [Default Permissions](/cloud/reference/default-permissions/).

The GitHub connection is personal: each user connects their own GitHub account, and no one else in the organization can use it.

