# GitHub Actions

> GitHub Actions with Kanvas automates the synchronization of Git repositories and visually validates pull requests for efficient development.


GitHub Actions is how Layer5 Cloud meets your pull-request workflow. The Kanvas Snapshot action renders the infrastructure file in a pull request as a Kanvas design and posts the picture as a comment, so reviewers see the resources and their connections before they read the YAML. It runs on GitHub-hosted runners and never touches your cluster.

The action reference, including inputs, the workflow the wizard installs, token handling, and troubleshooting, lives in one place: [Kanvas Snapshot](/pr-preview/pr-1358/kanvas/concepts/kanvas-snapshot/).

## Kanvas Github Actions

1. [Kanvas Snapshot](/pr-preview/pr-1358/kanvas/concepts/kanvas-snapshot/)
2. [Performance Testing with Kanvas](https://docs.meshery.io/guides/infrastructure-management/gitops-with-meshery)

Performance testing from a workflow is a Meshery capability, not a Layer5 Cloud one.

## Kanvas Snapshot GitHub Action

Kanvas Snapshot lets you visualize infrastructure changes in pull requests.

- See your deployment changes pull request to pull request.
- Get snapshots of your infrastructure directly in your pull requests.

[See action in GitHub Marketplace](https://github.com/marketplace/actions/kanvas-snapshot)

### Configuring Kanvas Snapshots

| Path | Use it when |
| --- | --- |
| Layer5 GitHub App wizard | You want Layer5 Cloud to commit the workflow and show you the API token to store as a secret. Start at [Integrating GitHub with Meshery](/pr-preview/pr-1358/cloud/getting-started/github-integration/), then follow [Kanvas Snapshot](/pr-preview/pr-1358/kanvas/concepts/kanvas-snapshot/). |
| Your own workflow | You want to pick the triggers, run snapshots from a workflow you already maintain, or authenticate with a personal access token. Follow [Kanvas Snapshot](/pr-preview/pr-1358/kanvas/concepts/kanvas-snapshot/). |

Both paths produce the same pull request comment.



<div class="pageinfo">
<p>The Kanvas GitHub App requires authorization to interact with your repositories. If you would like to use your GitHub user&rsquo;s personal access token instead, see <a href="/pr-preview/pr-1358/cloud/getting-started/support/">Support</a>.</p>

</div>

## Customizing Snapshot Workflow Triggers in Kanvas Snapshot

The workflow the wizard installs runs when a pull request is opened, synchronized, or reopened. In a workflow you own, you can use any GitHub event. Only pull request runs post a comment, because the comment needs a pull request number. Other runs still render the snapshot and expose its image URL as an output. See [Customizing Snapshot Workflow Triggers](/pr-preview/pr-1358/kanvas/concepts/kanvas-snapshot/#customizing-snapshot-workflow-triggers-in-kanvas-snapshot).

### About events that trigger workflows

GitHub Actions provides events that can trigger workflows, such as opening a pull request or pushing commits. The snapshot guide lists the events this action handles.

## Using Kanvas's Performance Testing GitHub Action

You can create performance profiles to run repeatable tests with Meshery. That action is documented in [GitOps with Meshery](https://docs.meshery.io/guides/infrastructure-management/gitops-with-meshery). [See action in GitHub Marketplace](https://github.com/marketplace/actions/performance-testing-with-meshery)

## What Layer5 Cloud provides

- **An API token** that authenticates the action to Layer5 Cloud. You generate and revoke tokens in Layer5 Cloud. See [Tokens](/pr-preview/pr-1358/cloud/concepts/identity-and-security/tokens/).
- **A GitHub App** that installs the workflow file in the repositories you choose, through the [GitHub integration](/pr-preview/pr-1358/cloud/getting-started/github-integration/) wizard.
- **A generated design.** Each comment links to the design the action produced.

