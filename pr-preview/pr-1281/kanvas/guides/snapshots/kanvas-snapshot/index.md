# Visualize Pull Requests with Kanvas Snapshot


> Post a rendered snapshot of your infrastructure files as a comment on every GitHub pull request, using the Layer5 GitHub App or your own workflow.


Kanvas Snapshot posts a picture of your infrastructure as a comment on each GitHub pull request. Reviewers see which components a Kubernetes manifest, Docker Compose file, or Helm chart defines, and how they connect, before they read the YAML. The comment updates on every push to the pull request.

The snapshot runs in a GitHub Actions workflow on GitHub-hosted runners. It never touches your cluster. For how a snapshot is built and what it can and cannot do, see [Kanvas Snapshot](/pr-preview/pr-1281/kanvas/guides/snapshots/).

You can set it up two ways. The Layer5 GitHub App path installs the workflow for you. The direct path has you add the action to a workflow you own. Both produce the same comment.

## Before you start

- A [Layer5 Cloud](https://cloud.layer5.io) account.
- A repository on github.com that holds the infrastructure file. GitHub Enterprise Server, GitLab, and Bitbucket are not supported.
- Permission to install a GitHub App on the repository, and to add repository secrets and commit to the default branch.
- A plan that includes GitOps Snapshots. See [availability by plan](/pr-preview/pr-1281/kanvas/guides/snapshots/#availability-by-plan).

## Set up with the Layer5 GitHub App

The Connect wizard for GitHub in Layer5 Cloud walks through seven stages. Running it again later updates the connection.

| Stage | What happens |
|---|---|
| Connect | GitHub opens so you can install the Layer5 GitHub App on your user or organization and choose repositories. |
| Select repositories | Lists only repositories where the App is installed. To add one, install the App on it again. |
| Import designs | Scans the selected repositories for Helm charts, Kubernetes manifests, Docker Compose files, and Meshery designs, and imports what you pick. Import failures are counted per repository. |
| Select a design for the snapshot | You choose at most one file per repository. Cloud stores its path for that repository. At least one repository needs a selection to continue. |
| Configure secrets | Cloud generates a Layer5 Cloud API token and shows it once. You add it to each repository as a secret named `MESHERY_TOKEN`. |
| Configure workflows | Cloud commits the workflow to each selected repository. Clear the checkbox to skip this stage and install nothing. |
| Finish | Shows which repositories received the workflow. |

Cloud never writes the secret for you. Add `MESHERY_TOKEN` to each repository yourself, with that exact name, and confirm the checkbox in the wizard. The wizard generates a new token each time the secrets stage opens, and it cannot show an earlier one again. Generate tokens in Layer5 Cloud and revoke them there; see [Tokens](/pr-preview/pr-1281/cloud/concepts/identity-and-security/tokens/).

### What the installed workflow does

The wizard commits `.github/workflows/kanvas.yml` to the default branch of each repository, with the commit message `Install Kanvas workflow`. If that file already exists, the wizard replaces it.

| Setting | Value |
|---|---|
| Name | Kanvas Screenshot Service |
| Triggers | `pull_request` when opened, synchronized, or reopened. Also `workflow_call`, with an optional `fileName` input that overrides the stored path. |
| Runner | `ubuntu-latest` |
| Token permissions | `actions: read`, `contents: write`, `security-events: write`, `statuses: write`, `pull-requests: write`, `id-token: write` |
| Authentication | `secrets.GITHUB_TOKEN` to comment, `secrets.MESHERY_TOKEN` for Layer5 Cloud |
| Input file | The path you selected for that repository |
| Input type | `Kubernetes Manifest`, always |

Two behaviors matter after install:

- **The input type is always `Kubernetes Manifest`.** If the file you chose is a Docker Compose file or a Helm chart, edit `application_type` in the committed workflow to `Docker Compose` or `Helm Chart`.
- **The workflow is built from the latest template at install time.** Installing the same repository twice on different days can produce a different workflow. Review the committed file before you rely on it.

Per-repository install results are:

| Result | Meaning |
|---|---|
| `Workflow added` with a commit link | The file was committed. |
| `Workflow already exists, try deleting it first at ./.github/workflows/kanvas.yml` | GitHub rejected the write because of the existing file. Delete or edit the file in the repository, then run the stage again. |
| `unable to install workflow in <repository>` | The request failed or timed out after 30 seconds. Run the stage again. |
| `repository must be in "owner/name" form` | The repository identifier is malformed. |

### If you uninstall the App

Cloud checks whether the App installation still exists. When GitHub reports that it does not, Cloud deletes the stale GitHub connection. Run the wizard again to reconnect.

## Use the action in your own workflow

Skip the wizard when you want to choose the triggers, run snapshots from a workflow you already maintain, or authenticate with a personal access token instead of the App.

1. Generate a Layer5 Cloud API token and store it as a repository secret, for example `MESHERY_TOKEN`.
2. Add a workflow. The action needs its own repository checked out to a folder named `action`, and the same token permissions the installed workflow uses.

```yaml
name: Kanvas Snapshot
on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  actions: read
  contents: write
  security-events: write
  statuses: write
  pull-requests: write
  id-token: write

jobs:
  snapshot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/checkout@v4
        with:
          path: action
          repository: layer5labs/kanvas-snapshot
      - uses: layer5labs/kanvas-snapshot@v0.2.44
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
          mesheryToken: ${{ secrets.MESHERY_TOKEN }}
          prNumber: ${{ github.event.pull_request.number }}
          application_type: "Kubernetes Manifest"
          filePath: manifests
```

To snapshot a file that is hosted at a public URL, such as a packaged Helm chart, replace `filePath` with `application_url` and set `application_type` to `Helm Chart`. Pin the action to the latest release tag; `v0.2.44` is current at the time of writing.

### Action inputs

| Input | Required | Default | Behavior |
|---|---|---|---|
| `githubToken` | Yes | - | Posts the pull request comment. The built-in `GITHUB_TOKEN` or a personal access token that can write pull request comments. |
| `mesheryToken` | Yes | - | Layer5 Cloud API token. |
| `application_type` | Yes | - | `Kubernetes Manifest`, `Docker Compose`, or `Helm Chart`. |
| `filePath` | No | - | A file, or a directory of manifests, in the checked-out repository. |
| `application_url` | No | - | A public URL of the source file. |
| `designID` | No | - | The id of an existing design. Overrides `filePath` and `application_url`. |
| `prNumber` | No | `0` | The pull request to comment on. With `0`, no comment is posted. |
| `skipComment` | No | `false` | Set to `true` to render without commenting, for manual or scheduled runs. |
| `assetLocation` | No | - | Where the rendered image is stored. |
| `email` | No | - | See [known limitations](#known-limitations). |

When you give `filePath` a directory, the action merges the `.yaml` and `.yml` files directly inside it into one document. It does not read subfolders. Point it at the folder that holds the manifests, or at a single file.

The action outputs `resource_url`, the URL of the rendered image. When no image URL comes back, the action does not post a comment.

### Choose other triggers

The comment needs a pull request number, so only pull request runs post one. Use any other workflow event, such as `push`, `schedule`, or `workflow_dispatch`, to render a snapshot without a comment and read `resource_url` in a later step. Leave `prNumber` at `0` or set `skipComment` to `true` for those runs.

## What the pull request comment contains

The comment shows the rendered image, linked to itself, with links to the generated design in the catalog and to an editable copy in the Playground. The workflow keeps one comment per pull request and replaces its content on each run.

Alongside the comment, each run uploads debug logs, screenshots, and a video of the render as workflow artifacts, whether the run succeeds or fails. Open them from the workflow run when a snapshot looks wrong.

## Change or remove snapshots

| To | Do this |
|---|---|
| Snapshot a different file | Run the wizard again and select another file, or edit `filePath` in the workflow. |
| Add a repository | Install the App on it, then run the wizard again. |
| Upgrade the action | Change the version tag after `layer5labs/kanvas-snapshot@` in the workflow. Check the release notes when `application_type` or input names change. |
| Rotate the token | Generate a new API token, update the `MESHERY_TOKEN` secret, and revoke the old token. |
| Remove snapshots | Delete `.github/workflows/kanvas.yml`, delete the `MESHERY_TOKEN` secret, and revoke the token. |

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| The workflow runs and no comment appears | The run had no pull request number, `skipComment` is `true`, or the render produced no image URL. Open the uploaded workflow artifacts to see why the render failed. |
| The snapshot shows nothing, or only some resources | A directory path reads only the YAML files directly inside it. Point `filePath` at the folder that holds them. |
| The snapshot treats a Helm chart or Compose file as a manifest | The wizard sets `application_type` to `Kubernetes Manifest`. Edit it in the workflow. |
| Authentication fails | `MESHERY_TOKEN` is missing, misspelled, or revoked, or the repository does not share the secret with the workflow. |
| The wizard lists no repositories | The App is not installed on them. Install it, then run the wizard again. |

## Known limitations

- **Email delivery.** The `email` input does not deliver mail today. The action sends its request in a shape the Layer5 Cloud endpoint rejects, and the workflow continues without a failure. Use the pull request comment or `resource_url`.
- **No diffs.** A snapshot shows the current file only. It does not compare against the base branch.
- **Single design per repository in the wizard.** To snapshot more than one file, add the action to a workflow of your own for each file.
- **GitHub.com only.** The App and the install flow work against github.com.

