# Integrating GitHub with Meshery


> Discover how to seamlessly connect your GitHub repository with Meshery, enabling easy import and management of your configuration files.


## Introduction

The GitHub integration connects your GitHub account to Layer5 Cloud through the Layer5 GitHub App. Once connected, you can browse the repositories you granted, pick Kubernetes manifests, Helm charts, Docker Compose files, Kustomize, and Meshery designs, and import each file as a design. The same connection can also install a pull-request snapshot workflow.

Use it when your infrastructure already lives in Git. For a one-off file, [import it directly](/pr-preview/pr-1362/kanvas/getting-started/import-designs/) instead.

You need:

- A Layer5 Cloud account.
- A GitHub account that can install a GitHub App on the user or organization that owns the repositories. For an organization, an owner may have to approve the installation.
- The View Connections permission, which shows the Integrations area. See [Default Permissions](/pr-preview/pr-1362/cloud/reference/default-permissions/).

The hosted service at cloud.layer5.io provides the Layer5 GitHub App. A self-hosted deployment uses its own App. See [Self-hosted GitHub App requirements](#self-hosted-github-app-requirements).

## How to Integrate GitHub with Meshery

You can start the Connect wizard from the Integrations area of Spaces in Layer5 Cloud, or from the Extensions page of a Meshery Server by enabling the Kanvas Snapshot GitHub Action.

The wizard has seven stages.

| Stage | What happens | Required |
| --- | --- | --- |
| Connect GitHub App | GitHub asks you to install the App and to choose repository access. | Yes |
| Select Repositories | Lists the repositories the App can reach. **Add Repository** reopens the GitHub installation page. | Yes |
| Import Designs | Lists the files in the chosen repositories. You select files or whole directories and import them. | Yes |
| Select a design for snapshots | Chooses one file per repository for pull-request snapshots. | Optional |
| Configure Secrets | Generates an API token that you add to the repository as a secret. | Optional |
| Add Workflows | Commits the snapshot workflow to the repository. | Optional |
| Finish | Summarizes what was imported and which repositories received the workflow. | Yes |

If you open the GitHub card's connection count before you have connected, the **GitHub Connections** window reads "No GitHub connections yet". Click **Connect GitHub** there to start the wizard.

The three optional stages are covered in [Kanvas Snapshot](/pr-preview/pr-1362/kanvas/concepts/kanvas-snapshot/).

### Access Integrations Page from the Meshery Extensions Page

1. Go to [Extensions](https://playground.meshery.io/extensions).
1. Click **Enable** for **GitHub Action: Kanvas Snapshot**.
1. You will be redirected to the Integrations page.

### Navigate to the Integrations Page via the Layer5 Cloud Dashboard

1. On [Layer5 Cloud](https://cloud.layer5.io), open Spaces and select **Integrations**. The page is shown to roles that hold View Connections.
1. Click **Connect** to begin, or open the GitHub card.

### Connect GitHub and Import Designs

1. **Connect GitHub App**. GitHub asks you to install the Layer5 GitHub App on a personal or organization account and to choose whether the App may reach all repositories or only the ones you select. From Layer5 Cloud v1.0.287, GitHub reports which installations your GitHub account can access, and only those are connected.
1. **Select Repositories**. Select the repositories, then click **Next**. **Add Repository** reopens the GitHub installation page so you can change access or install on another account. When you install the App on another account, the new installation joins the ones you already had.
1. **Import Designs**. A checkbox switches the file list between every file and only the types Layer5 Cloud can import. Select files or a directory, then click **Import**. Selecting a directory imports every supported file beneath it. A file selected both on its own and through its directory is imported once.

Layer5 Cloud accepts `.yml`, `.yaml`, `.json`, `.tar`, `.tar.gz`, `.tar.tgz`, `.zip`, and `.gz`. A file that fails sanitizing or identification is reported as invalid or unsupported and does not stop the other files.

| Type | Notes |
| --- | --- |
| Meshery design | Becomes a design immediately. |
| Kubernetes manifest | Kept as source and converted when you open it. |
| Helm chart | Kept as source and converted when you open it. |
| Docker Compose file | Kept as source and converted when you open it. |
| Kustomize | Kept as source and converted when you open it. |

Layer5 Cloud scans a repository by reading its full file tree from GitHub and keeps the result for five minutes. Scans and imports always use each repository's default branch. GitHub truncates the tree for very large repositories. When that happens, the file list is partial and Cloud answers with HTTP status 206. If a file you need is missing, select its directory or import it directly.

### [Optional] Enabling Snapshots

These steps are optional. They commit a workflow so pull requests can show a Kanvas snapshot. Import itself never writes to your repository. Only these stages commit a file.

1. **Select Designs**. Select the design from the repository you want to enable snapshots for, then click **Next**.
1. **Configure Secrets**. Copy the **API TOKEN** and add it to the repository secrets. Tick the checkbox to confirm.
1. **Add workflows**. The workflow runs when a pull request is opened, synchronized, or reopened. See [Kanvas Snapshot](/pr-preview/pr-1362/kanvas/concepts/kanvas-snapshot/).

If the workflow file is already present, GitHub refuses the write with `Workflow already exists, try deleting it first at ./.github/workflows/kanvas.yml`. Delete that file first. The wizard does not overwrite it.

### Finish Setup

The finish stage summarizes what was imported and which repositories received the workflow. Click **Finish** when it looks right.

## View Imported Designs

Imported designs appear in [My Designs](https://cloud.layer5.io/catalog/content/my-designs). After the import, a notification sums up the result, for example `2 designs imported, 1 updated, 3 already imported and skipped.`

## View GitHub Integration Connection on Meshery Playground

You can also open the connection from the Connections page of a Meshery Server. In Layer5 Cloud, the connection is on the Integrations area of Spaces.

## Delete GitHub Integration

Delete the GitHub connection from the Integrations area, or from the Connections page of a Meshery Server. You can delete only a connection you own, and you need the Delete a connection permission.

Deleting the connection removes it from Layer5 Cloud. It does not uninstall the App from GitHub, delete imported designs, or remove a workflow already committed to a repository. To revoke the App's access, uninstall the Layer5 GitHub App in your GitHub account settings. Delete `.github/workflows/kanvas.yml` from a repository to stop its snapshots.

## Conclusion

You connect a GitHub account, import files as private designs, and optionally add a snapshot workflow. Each user has their own connection. A teammate who wants to import connects their own account.

## How the connection works

- **The connection belongs to you, not to your organization.** Each user has at most one GitHub connection.
- **GitHub confirms which installations are yours.** This check ships in Layer5 Cloud v1.0.287.
- **The App sees only what you grant.** Layer5 Cloud lists exactly those repositories.
- **Cloud reads the default branch.**
- **Import is read-only.** Importing creates designs. It never writes to your repository.

Layer5 Cloud verifies that the App installation the wizard opens on still exists. If you uninstalled the App from that account, Cloud removes only that installation from the connection and opens the wizard on the next installation your connection holds. Cloud deletes the connection only once none of its installations remain.

## What an import produces

- **One design per file.** The design is named after the file, including its extension.
- **Private by default.** The importing user owns it. Publish or share it when you are ready. See [Publishing Designs](/pr-preview/pr-1362/kanvas/designer/publishing-designs/).
- **Placed in your selected workspace.** From Layer5 Cloud v1.0.291, each new design is added to the workspace selected in your current organization, or to the organization's first workspace when none is selected, so it shows in My Designs.
- **Traceable to its source.** The design records its repository, path, and branch. Renaming the design does not break that link.

## Import from a repository again

When you run the wizard again for a repository you have imported from, for example with **Reconfigure** on the GitHub card, files you already imported carry a check mark. Hover over it to see which design the file became, for example `Imported as "nginx-deployment"`. If you have nothing new to import, click **Next** without importing.

A file is matched to its design by repository, path and branch, never by name. When your selection includes files you imported before, Layer5 Cloud asks what to do with them before importing. The prompt lists the files, up to five followed by "and N more", and offers three choices:

| Choice | What happens to the previously imported files |
| --- | --- |
| **Import new files only** (default) | They are left as they are. Only files that were never imported become new designs. |
| **Update the existing designs** | Each design's content is replaced with the file's current content. The design keeps its ID, sharing and links. Edits made to it since the last import are lost. |
| **Import them again as new designs** | Additional designs are created alongside the existing ones. |

Click **Import** to proceed, or **Cancel** to change the selection.

## See where a design came from

In the table view of My Designs, the **Source** column shows the repository and file path of each imported design, followed by the branch when it is not the repository's default. Hover over it to see the full source, or click it to open the file on GitHub. The cell is empty for a design that was not imported from GitHub. The column appears on large screens.

An imported design's details page has a **Source** section that lists the repository, the file path, and the branch ("Default branch" when the design follows the repository's default branch). The source stays with the design when you edit it.

## Manage imported designs {#manage-imported-designs}

From Layer5 Cloud v1.0.291, your GitHub connection lists every design you have imported from GitHub.

1. On the Integrations area of Spaces, click the GitHub card's connection count to open **GitHub Connections**.
1. Click your connection to expand it. **Imported designs** lists your imported designs, newest first:

    | Column | Shows |
    | --- | --- |
    | **Design** | The design's name. |
    | **Type** | The format the design was imported from, or `-` when it is not known. |
    | **Source** | The repository, file path and, when it is not the default, branch. Click it to open the file on GitHub. |
    | **Last updated** | When the design last changed. |
    | **Actions** | **Open design** opens the design in My Designs. **Open source file on GitHub** opens the file in a new tab. **Refresh from source** updates the design from the file. |

The list shows only your own designs, and only you can see it on your connection. It includes every design you imported from GitHub, whatever its workspace, so designs imported before Layer5 Cloud v1.0.291 are listed here until you move them to a workspace. When you have not imported any designs yet, it reads "No imported designs yet" and offers **Import designs**. If the list cannot be loaded, it reads "Imported designs could not be loaded"; click **Try again**.

## Refresh a design from its source

When a file changes in its repository, refresh the design instead of importing the file again:

1. In **Imported designs**, click **Refresh from source** on the design's row. The action appears only if your role holds Import Design.
1. Confirm with **Refresh**. The design's content is replaced with the file's current content on GitHub, and changes made to the design since it was imported or last refreshed are lost.

The refresh updates the same design, so it keeps its ID, owner, visibility, catalog data, workspace assignments and links. Only its content and source change. A design that was not imported as a Meshery design keeps its source file unconverted and is converted the next time you open it.

## Re-authorize an existing connection

A connection created before Layer5 Cloud v1.0.287 opens the wizard on **Re-authorize your GitHub connection**, and its repositories cannot be used until GitHub confirms which installations your GitHub account can access. Click **Re-authorize**. GitHub returns you to the wizard, without asking again if you have already authorized the App, and your repository settings are kept.

## Self-hosted GitHub App requirements {#self-hosted-github-app-requirements}

The hosted service provides the Layer5 GitHub App. A self-hosted deployment uses its own GitHub App, and from Layer5 Cloud v1.0.287 that App must meet every item below. See the matching values in [Helm Chart Values](/pr-preview/pr-1362/cloud/guides/self-hosted/deployment/helm-chart-values/).

- Each Layer5 Cloud deployment has its own GitHub App. Do not share one App between deployments, such as production and staging.
- The App's first callback URL is this deployment's `https://<host>/api/integrations/github/callback`, where `<host>` is the deployment's public hostname. Layer5 Cloud sends GitHub no `redirect_uri`, so GitHub always returns to the first callback URL.
- **Request user authorization (OAuth) during installation** is enabled.
- `githubappid`, the private key, `githubAppClientId` and `githubAppClientSecret` all come from that same App.

Without the OAuth client ID and client secret, no GitHub connection can be created or re-authorized.

## Troubleshooting

| You see | Cause | What to do |
| --- | --- | --- |
| A repository is missing from the list | The App is not installed on it. | Use **Add Repository** and grant access in GitHub. |
| `invalid or unsupported file` for a file | The extension or content is not an importable type. | Check the file against the table above. |
| A partial file list | GitHub truncated the tree of a large repository. | Select the directory you need, or import the file directly. |
| `GitHub did not confirm that your GitHub account can access that installation, so it was not connected.` | The GitHub account you are signed in with cannot access the installation you chose. | Sign in to GitHub with an account that can access it, then connect GitHub again. |
| `Your GitHub account cannot access any installation of the GitHub App. Install the app on your account or organization to connect a repository.` | GitHub reports no installation of the App that your GitHub account can access. | Install the App on your account or organization, then connect GitHub again. |
| `GitHub authorization is not configured for this environment, so GitHub cannot be connected. Please contact support.` | The deployment is missing the GitHub App's OAuth client ID or client secret. | On the hosted service, [contact support](/pr-preview/pr-1362/cloud/getting-started/support/). On a self-hosted deployment, set `env.githubAppClientId` and `env.githubAppClientSecret`. |
| Connect, **Add Repository** or **Re-authorize** ends anywhere other than the wizard, or shows `GitHub authorization could not be completed, so GitHub was not connected. Please connect GitHub again.` or `This GitHub connection was not started from this session, took too long, or was already used, so GitHub was not connected. Please connect GitHub again.` | You declined the authorization on GitHub, took more than five minutes on GitHub, reused a return page, or are signed in to Layer5 Cloud as a different user than the one who started. Changing repository access from GitHub's own settings, instead of the wizard, returns you without the request the wizard started. On a self-hosted deployment, the GitHub App can also miss one of its requirements. | Connect GitHub again from the wizard, approve the authorization, and finish on GitHub within five minutes. Change repository access with **Add Repository**. On a self-hosted deployment, check [Self-hosted GitHub App requirements](#self-hosted-github-app-requirements). |
| The wizard shows **Re-authorize your GitHub connection** | The connection predates installation confirmation. | Click **Re-authorize**. |
| The connection vanished | The App was uninstalled from every account it was connected through. | Run the wizard again. |
| `unable to create JWT for GitHub integration, please uninstall app and try again` | The deployment cannot sign requests as the GitHub App. | On the hosted service, uninstall and reinstall the App. On a self-hosted deployment, check the GitHub App credentials. |
| **Refresh from source** fails because the source file no longer exists | The file was moved, renamed or deleted in its repository. | Import the file from its new location. |
| **Refresh from source** fails because the file is not importable | The file is no longer a valid Helm chart, Kubernetes manifest, Docker Compose file or Meshery design. | Fix the file in its repository and refresh again. |
| **Refresh from source** fails because the App cannot reach the repository | The GitHub App no longer has access to the repository. | Reconfigure the connection with **Add Repository**. |
| **Refresh from source** fails because GitHub could not be reached | GitHub was unreachable, rate-limited the request or rejected the App's credentials. | Retry in a few minutes, and reconfigure the connection if the problem persists. |
| `Workflow already exists, try deleting it first at ./.github/workflows/kanvas.yml` | GitHub refused to write the snapshot workflow. | See [Kanvas Snapshot](/pr-preview/pr-1362/kanvas/concepts/kanvas-snapshot/). |

## Permissions

| Task | Requirement |
| --- | --- |
| See the Integrations area | View Connections |
| Run the wizard, scan, and import | Signed in. The server checks no permission key for these routes. |
| Refresh an imported design from its source | Own the design and hold Import Design |
| Delete the connection | Own the connection and hold Delete a connection |

See [Default Permissions](/pr-preview/pr-1362/cloud/reference/default-permissions/) for which roles hold these keys.

