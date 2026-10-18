---
title: Connect GitHub
linkTitle: Connect GitHub
description: >
  Connect the Layer5 GitHub App to Layer5 Cloud, import infrastructure files from your repositories as designs, and manage or remove the connection.
weight: 10
diataxis: how-to
categories: [integrations]
tags: [github, integrations, import]
aliases:
  - /cloud/getting-started/github-integration/
---

The GitHub integration connects your GitHub account to Layer5 Cloud through the Layer5 GitHub App. Once connected, you can browse the repositories you granted, pick Kubernetes manifests, Helm charts, Docker Compose files, and Meshery designs, and import each file as a design. The same connection can also install a pull-request snapshot workflow in your repositories.

Use it when your infrastructure already lives in Git and you want those files on the canvas without downloading and uploading them one at a time. For a one-off file, [import it directly]({{< ref "kanvas/guides/designs/import-designs/index.md" >}}) instead.

## Before you start

- A Layer5 Cloud account.
- A GitHub account that can install a GitHub App on the user or organization that owns the repositories. For an organization, an owner may have to approve the installation.
- The View Connections permission, which shows the Integrations area in Layer5 Cloud. See [Roles and Permissions]({{< ref "cloud/reference/default-permissions.md" >}}).

A self-hosted deployment needs its own GitHub App credentials in its deployment settings. From Layer5 Cloud v1.0.287 these include the GitHub App's OAuth client ID and client secret, which the deployment uses to ask GitHub which installations your GitHub account can access. Without them no GitHub connection can be created or re-authorized. The App ID, private key, client ID, and client secret must all belong to the same GitHub App. That App must also have **Request user authorization (OAuth) during installation** enabled and its first callback URL set to `https://<host>/api/integrations/github/callback`, where `<host>` is your deployment's public hostname. Layer5 Cloud sends GitHub no `redirect_uri`, so GitHub returns every installation and authorization to the App's first callback URL. Each Layer5 Cloud deployment therefore needs its own GitHub App: an App shared between deployments, such as production and staging, sends users to whichever deployment is listed first. See the GitHub App values in [Helm Chart Values]({{< ref "cloud/guides/self-hosted/deployment/helm-chart-values.md" >}}). The hosted service at cloud.layer5.io provides the Layer5 GitHub App.

## How the connection works

- **The connection belongs to you, not to your organization.** Each user has at most one GitHub connection. A teammate who wants to import from GitHub connects their own account.
- **GitHub confirms which installations are yours.** When you install and authorize the App, GitHub reports which installations of the Layer5 GitHub App your GitHub account can access, and only those are connected. This check ships in Layer5 Cloud v1.0.287.
- **The App sees only what you grant.** At install time GitHub asks whether the App may reach all repositories or only the ones you select. Layer5 Cloud lists exactly those repositories. Widen or narrow the grant at any time by running the setup again.
- **Cloud reads the default branch.** Scans and imports always use each repository's default branch.
- **Import is read-only.** Importing creates designs in Layer5 Cloud. It never writes to your repository. Only the optional snapshot stages commit a file.

## Connect and import

The Connect wizard has seven stages. You can start it from the Integrations area of Spaces in Layer5 Cloud, or from the Extensions page of a Meshery Server by enabling the Kanvas Snapshot GitHub Action.

| Stage | What happens | Required |
| --- | --- | --- |
| Connect GitHub App | GitHub asks you to install the Layer5 GitHub App on a personal or organization account and to choose repository access. | Yes |
| Select Repositories | Lists the repositories the App can reach. **Add Repository** reopens the GitHub installation page so you can change access or install on another account. | Yes |
| Import Designs | Lists the files in the chosen repositories. You select files or whole directories and import them. | Yes |
| Select a design for snapshots | Chooses one file per repository for pull-request snapshots. | Optional |
| Configure Secrets | Generates an API token that you add to the repository as a secret. | Optional |
| Add Workflows | Commits the snapshot workflow to the repository. | Optional |
| Finish | Summarizes what was imported and which repositories received the workflow. | Yes |

The three optional stages are covered in [Visualize Pull Requests with Kanvas Snapshot]({{< ref "kanvas/guides/snapshots/kanvas-snapshot/index.md" >}}).

### What you can import

A checkbox switches the file list between every file and only the types Layer5 Cloud can import.

| Type | Notes |
| --- | --- |
| Meshery design | Becomes a design immediately. |
| Kubernetes manifest | Kept as source and converted when you open it. |
| Helm chart | Kept as source and converted when you open it. |
| Docker Compose file | Kept as source and converted when you open it. |
| Kustomize | Kept as source and converted when you open it. |

Layer5 Cloud accepts files with these extensions: `.yml`, `.yaml`, `.json`, `.tar`, `.tar.gz`, `.tar.tgz`, `.zip`, and `.gz`. A file that fails sanitizing or identification is reported as invalid or unsupported.

### What an import produces

- **One design per file.** The design is named after the file, including its extension.
- **Private by default.** The importing user owns it. Publish or share it when you are ready. See [Publish Designs]({{< ref "kanvas/guides/designs/publishing-designs/index.md" >}}).
- **Traceable to its source.** The design records its repository, path, and branch.
- **Directories import recursively.** Selecting a directory imports every supported file beneath it.
- **Failures are per file.** An unsupported or invalid file produces an error entry and does not stop the other files. The result screen lists what succeeded and what failed.

Imported designs appear in [My Designs](https://cloud.layer5.io/catalog/content/my-designs).

### Large repositories

Layer5 Cloud scans a repository by reading its full file tree from GitHub and keeps the result for five minutes. GitHub truncates the tree for very large repositories. When that happens, the file list is partial and Cloud answers with HTTP status 206. If a file you need is missing, select its directory or import it directly.

## Check or reconfigure the connection

Layer5 Cloud verifies with GitHub that the App installation the wizard opens on still exists. If you uninstalled the App from that account in GitHub, Cloud removes only that installation from the connection and opens the wizard on the next installation your connection holds. Cloud deletes the connection only once none of its installations remain. Run the wizard again to reconnect.

To change which repositories the App can read, rerun the wizard and use **Add Repository**. GitHub keeps the App installed and updates its grant. When you install the App on another account, the connection is updated with every installation your GitHub account can access, so the new installation joins the ones you already had.

### Re-authorize an existing connection

A connection created before Layer5 Cloud v1.0.287 opens the wizard on **Re-authorize your GitHub connection**, and its repositories cannot be used until GitHub confirms which installations your GitHub account can access. Click **Re-authorize**. GitHub returns you to the wizard, without asking again if you have already authorized the App, and your repository settings are kept.

## Remove the connection

Delete the GitHub connection from the Integrations area, or from the Connections page of a Meshery Server. You can delete only a connection you own, and you need the Delete a connection permission.

Deleting the connection removes it from Layer5 Cloud. It does **not** uninstall the App from GitHub, delete imported designs, or remove a workflow already committed to a repository. To revoke the App's access to your repositories, uninstall the Layer5 GitHub App in your GitHub account settings. Delete `.github/workflows/kanvas.yml` from a repository to stop its snapshots.

## Troubleshooting

| You see | Cause | What to do |
| --- | --- | --- |
| A repository is missing from the list | The App is not installed on it. | Use **Add Repository** and grant access in GitHub. |
| `invalid or unsupported file` for a file | The extension or content is not an importable type. | Check the file against the table above. |
| A partial file list | GitHub truncated the tree of a large repository. | Select the directory you need, or import the file directly. |
| `GitHub did not confirm that your GitHub account can access that installation, so it was not connected.` | The GitHub account you are signed in with cannot access the installation you chose. | Sign in to GitHub with an account that can access it, then connect GitHub again. |
| `Your GitHub account cannot access any installation of the GitHub App. Install the app on your account or organization to connect a repository.` | GitHub reports no installation of the App that your GitHub account can access. | Install the App on your account or organization, then connect GitHub again. |
| `GitHub authorization is not configured for this environment, so GitHub cannot be connected. Please contact support.` | The deployment is missing the GitHub App's OAuth client ID or client secret. | On the hosted service, contact support. On a self-hosted deployment, set `env.githubAppClientId` and `env.githubAppClientSecret`. |
| `GitHub authorization could not be completed, so GitHub was not connected. Please connect GitHub again.` | Layer5 Cloud could not finish the authorization. Causes: you declined the authorization on GitHub. On a self-hosted deployment, also: the GitHub App does not have **Request user authorization (OAuth) during installation** enabled, so after Connect or **Add Repository** GitHub returns to the App's Setup URL, `https://<host>/api/integrations/github/callback`, without an authorization code; the App ID or private key is wrong, so Connect fails before your browser reaches GitHub; or the client ID or client secret is wrong or belongs to another application, such as the sign-in GitHub OAuth application, so GitHub rejects the code exchange. | Connect GitHub again and approve the authorization. On a self-hosted deployment, enable that setting in the GitHub App's settings, and check that the App ID, private key, client ID and client secret all come from the same GitHub App. See [Helm Chart Values]({{< ref "cloud/guides/self-hosted/deployment/helm-chart-values.md" >}}). |
| `This GitHub connection was not started from this session, took too long, or was already used, so GitHub was not connected. Please connect GitHub again.` | GitHub returned you with a request Layer5 Cloud did not start for you: you spent more than five minutes on GitHub, reopened a return page that was already used, are signed in to Layer5 Cloud as a different user than the one who started, or changed the App's installation in GitHub's own settings. On a self-hosted deployment, the GitHub App can also be shared between deployments, such as production and staging. Layer5 Cloud sends GitHub no `redirect_uri`, so GitHub returns every connection to the App's first callback URL, and a connection started on one deployment ends on whichever deployment that URL belongs to. | Connect GitHub again from the wizard and finish on GitHub within five minutes. Change repository access with **Add Repository**, not in GitHub's settings. On a self-hosted deployment, give each deployment its own GitHub App whose first callback URL is that deployment's `https://<host>/api/integrations/github/callback`, then connect GitHub again from the deployment you mean to use. |
| GitHub shows a `redirect_uri` error page instead of returning you to Layer5 Cloud | On a self-hosted deployment, the GitHub App has no callback URL registered. | Add `https://<host>/api/integrations/github/callback` as the first callback URL of a GitHub App that only this deployment uses. GitHub returns every installation and authorization to that first URL, so an App shared with another deployment sends users to whichever deployment is listed first. |
| The wizard shows **Re-authorize your GitHub connection** | The connection predates installation confirmation. | Click **Re-authorize**. See [Re-authorize an existing connection](#re-authorize-an-existing-connection). |
| The connection vanished | The App was uninstalled from every account it was connected through. | Run the wizard again. |
| `unable to create JWT for GitHub integration, please uninstall app and try again` | The deployment cannot sign requests as the GitHub App. | On the hosted service, uninstall and reinstall the App. On a self-hosted deployment, check the GitHub App credentials in the deployment settings. |
| `Workflow already exists, try deleting it first at ./.github/workflows/kanvas.yml` | GitHub refused to write the snapshot workflow. | See the troubleshooting table in [Visualize Pull Requests with Kanvas Snapshot]({{< ref "kanvas/guides/snapshots/kanvas-snapshot/index.md" >}}). |

## Permissions

| Task | Requirement |
| --- | --- |
| See the Integrations area | View Connections |
| Run the wizard, scan, and import | Signed in. The server checks no permission key for these routes. |
| Delete the connection | Own the connection and hold Delete a connection |

{{< keys-matrix functions="View Connections|Delete a connection" caption="Connection permissions by role" >}}

## Next steps

- [Visualize Pull Requests with Kanvas Snapshot]({{< ref "kanvas/guides/snapshots/kanvas-snapshot/index.md" >}}) finishes the optional stages.
- [Integrations]({{< ref "cloud/guides/integrations/_index.md" >}}) lists every connection Layer5 Cloud supports.
- [Find and Use Catalog Designs]({{< ref "cloud/guides/exploring-the-catalog/index.md" >}}) shows how to open and clone what you imported.
