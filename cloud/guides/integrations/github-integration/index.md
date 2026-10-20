# Connect GitHub


> Connect the Layer5 GitHub App to Layer5 Cloud, import infrastructure files from your repositories as designs, and manage or remove the connection.



The GitHub integration connects your GitHub account to Layer5 Cloud through the Layer5 GitHub App. Once connected, you can browse the repositories you granted, pick Kubernetes manifests, Helm charts, Docker Compose files, and Meshery designs, and import each file as a design. The same connection can also install a pull-request snapshot workflow in your repositories.

Use it when your infrastructure already lives in Git and you want those files on the canvas without downloading and uploading them one at a time. For a one-off file, [import it directly](/kanvas/guides/designs/import-designs/) instead.

## Before you start

- A Layer5 Cloud account.
- A GitHub account that can install a GitHub App on the user or organization that owns the repositories. For an organization, an owner may have to approve the installation.
- The View Connections permission, which shows the Integrations area in Layer5 Cloud. See [Roles and Permissions](/cloud/reference/default-permissions/).

### Self-hosted GitHub App requirements {#self-hosted-github-app-requirements}

The hosted service at cloud.layer5.io provides the Layer5 GitHub App. A self-hosted deployment uses its own GitHub App, and from Layer5 Cloud v1.0.287 that App must meet every item below. See the matching values in [Helm Chart Values](/cloud/guides/self-hosted/deployment/helm-chart-values/).

- Each Layer5 Cloud deployment has its own GitHub App. Do not share one App between deployments, such as production and staging.
- The App's first callback URL is this deployment's `https://<host>/api/integrations/github/callback`, where `<host>` is the deployment's public hostname. Layer5 Cloud sends GitHub no `redirect_uri`, so GitHub always returns to the first callback URL.
- **Request user authorization (OAuth) during installation** is enabled.
- `githubappid`, the private key, `githubAppClientId` and `githubAppClientSecret` all come from that same App.

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

If you open the GitHub card's connection count before you have connected, the **GitHub Connections** window reads "No GitHub connections yet". Click **Connect GitHub** there to start the wizard, or follow **Learn how the GitHub integration works** to return to this guide.

The three optional stages are covered in [Visualize Pull Requests with Kanvas Snapshot](/kanvas/guides/snapshots/kanvas-snapshot/).

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
- **Private by default.** The importing user owns it. Publish or share it when you are ready. See [Publish Designs](/kanvas/guides/designs/publishing-designs/).
- **Placed in your selected workspace.** From Layer5 Cloud v1.0.291, each new design is added to the workspace selected in your current organization, or to the organization's first workspace when none is selected, so it shows in My Designs.
- **Traceable to its source.** The design records its repository, path, and branch. Renaming the design does not break that link.
- **Directories import recursively.** Selecting a directory imports every supported file beneath it.
- **Failures are per file.** An unsupported or invalid file produces an error entry and does not stop the other files. The result screen lists what succeeded and what failed.

Imported designs appear in [My Designs](https://cloud.layer5.io/catalog/content/my-designs). After the import, a notification sums up the result, for example `2 designs imported, 1 updated, 3 already imported and skipped.`

### Import from a repository again

When you run the wizard again for a repository you have imported from, for example with **Reconfigure** on the GitHub card, files you already imported carry a check mark. Hover over it to see which design the file became, for example `Imported as "nginx-deployment"`. If you have nothing new to import, click **Next** without importing.

A file is matched to its design by repository, path and branch, never by name. When your selection includes files you imported before, Layer5 Cloud asks what to do with them before importing. The prompt lists the files, up to five followed by "and N more", and offers three choices:

| Choice | What happens to the previously imported files |
| --- | --- |
| **Import new files only** (default) | They are left as they are. Only files that were never imported become new designs. |
| **Update the existing designs** | Each design's content is replaced with the file's current content. The design keeps its ID, sharing and links. Edits made to it since the last import are lost. |
| **Import them again as new designs** | Additional designs are created alongside the existing ones. |

Click **Import** to proceed with your choice, or **Cancel** to change the selection. A file selected both on its own and through its directory is imported once.

### See where a design came from

In the table view of My Designs, the **Source** column shows the repository and file path of each imported design, followed by the branch when it is not the repository's default. Hover over it to see the full source, or click it to open the file on GitHub. The cell is empty for a design that was not imported from GitHub. The column appears on large screens.

An imported design's details page has a **Source** section below the left panel that lists the repository, which links to the file on GitHub, the file path and the branch ("Default branch" when the design follows the repository's default branch). The source stays with the design when you edit it, so later imports and refreshes still recognize it.

### Large repositories

Layer5 Cloud scans a repository by reading its full file tree from GitHub and keeps the result for five minutes. GitHub truncates the tree for very large repositories. When that happens, the file list is partial and Cloud answers with HTTP status 206. If a file you need is missing, select its directory or import it directly.

## Manage imported designs {#manage-imported-designs}

From Layer5 Cloud v1.0.291, your GitHub connection lists every design you have imported from GitHub, with actions to open each one or bring it up to date with its file.

1. On the Integrations area of Spaces in Layer5 Cloud, click the GitHub card's connection count to open **GitHub Connections**.
1. Click your connection to expand it. **Imported designs** lists your imported designs, newest first:

    | Column | Shows |
    | --- | --- |
    | **Design** | The design's name. |
    | **Type** | The format the design was imported from, or `-` when it is not known. |
    | **Source** | The repository, file path and, when it is not the default, branch the design was imported from. Click it to open the file on GitHub. |
    | **Last updated** | When the design last changed. |
    | **Actions** | **Open design** opens the design in My Designs. **Open source file on GitHub** opens the file in a new tab. **Refresh from source** updates the design from the file. |

The list shows only your own designs, and only you can see it on your connection. It includes every design you imported from GitHub, whatever its workspace, so designs imported before Layer5 Cloud v1.0.291 are listed here until you move them to a workspace. When you have not imported any designs yet, it reads "No imported designs yet" and offers **Import designs**, which reopens the wizard. If the list cannot be loaded, it reads "Imported designs could not be loaded"; click **Try again**.

### Refresh a design from its source

When a file changes in its repository, refresh the design instead of importing the file again:

1. In **Imported designs**, click **Refresh from source** on the design's row. The action appears only if your role holds Import Design.
1. Confirm with **Refresh**. The design's content is replaced with the file's current content on GitHub, and changes made to the design since it was imported or last refreshed are lost.

The refresh updates the same design, so it keeps its ID, owner, visibility, catalog data, workspace assignments and links. Only its content and source change. A design that was not imported as a Meshery design keeps its source file unconverted and is converted the next time you open it.

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
| Connect, **Add Repository** or **Re-authorize** ends anywhere other than the wizard, or shows `GitHub authorization could not be completed, so GitHub was not connected. Please connect GitHub again.` or `This GitHub connection was not started from this session, took too long, or was already used, so GitHub was not connected. Please connect GitHub again.` | You declined the authorization on GitHub, took more than five minutes on GitHub, reused a return page, or are signed in to Layer5 Cloud as a different user than the one who started. Changing repository access or installing the App from GitHub's own settings or App page, instead of the wizard, returns you without the request the wizard started. On a self-hosted deployment, the GitHub App can also miss one of its requirements. | Connect GitHub again from the wizard, approve the authorization, and finish on GitHub within five minutes. Change repository access with **Add Repository**, not in GitHub's settings. On a self-hosted deployment, check every item in [Self-hosted GitHub App requirements](#self-hosted-github-app-requirements). |
| The wizard shows **Re-authorize your GitHub connection** | The connection predates installation confirmation. | Click **Re-authorize**. See [Re-authorize an existing connection](#re-authorize-an-existing-connection). |
| The connection vanished | The App was uninstalled from every account it was connected through. | Run the wizard again. |
| `unable to create JWT for GitHub integration, please uninstall app and try again` | The deployment cannot sign requests as the GitHub App. | On the hosted service, uninstall and reinstall the App. On a self-hosted deployment, check the GitHub App credentials in the deployment settings. |
| **Refresh from source** fails because the source file no longer exists | The file was moved, renamed or deleted in its repository. | Import the file from its new location. |
| **Refresh from source** fails because the file is not importable | The file is no longer a valid Helm chart, Kubernetes manifest, Docker Compose file or Meshery design. | Fix the file in its repository and refresh again. |
| **Refresh from source** fails because the App cannot reach the repository | The GitHub App no longer has access to the repository. | Reconfigure the connection with **Add Repository** and grant the App access to the repository. |
| **Refresh from source** fails because GitHub could not be reached | GitHub was unreachable, rate-limited the request or rejected the App's credentials. | Retry in a few minutes, and reconfigure the connection if the problem persists. |
| `Workflow already exists, try deleting it first at ./.github/workflows/kanvas.yml` | GitHub refused to write the snapshot workflow. | See the troubleshooting table in [Visualize Pull Requests with Kanvas Snapshot](/kanvas/guides/snapshots/kanvas-snapshot/). |

## Permissions

| Task | Requirement |
| --- | --- |
| See the Integrations area | View Connections |
| Run the wizard, scan, and import | Signed in. The server checks no permission key for these routes. |
| Refresh an imported design from its source | Own the design and hold Import Design |
| Delete the connection | Own the connection and hold Delete a connection |















<div class="feature-tiers">
<table class="feature-tiers-table keys-matrix">
  <caption>Connection and import permissions by role</caption>
  <thead>
    <tr>
      <th scope="col">Permission</th>
      <th scope="col">What it allows</th>
      <th scope="col">User</th><th scope="col">Team Admin</th><th scope="col">Workspace Admin</th><th scope="col">Org Admin</th><th scope="col">Provider Admin</th>
    </tr>
  </thead>
  <tbody>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <tr>
      <th scope="row">View Connections</th>
      <td>View all connections within an environment</td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
    </tr>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <tr>
      <th scope="row">Import Design</th>
      <td>Import a design</td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
    </tr>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <tr>
      <th scope="row">Delete a connection</th>
      <td>Delete a connection</td>
      
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not granted</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not granted</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Allowed</span></td>
      
    </tr>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  </tbody>
</table>
</div>


## Next steps

- [Visualize Pull Requests with Kanvas Snapshot](/kanvas/guides/snapshots/kanvas-snapshot/) finishes the optional stages.
- [Integrations](/cloud/guides/integrations/) lists every connection Layer5 Cloud supports.
- [Find and Use Catalog Designs](/cloud/guides/exploring-the-catalog/) shows how to open and clone what you imported.

