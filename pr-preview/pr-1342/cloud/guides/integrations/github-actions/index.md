# Use GitHub Actions

> Add the Kanvas Snapshot action to your GitHub workflows so every pull request shows what your infrastructure change looks like.



GitHub Actions is how Layer5 Cloud meets your pull-request workflow. The Kanvas Snapshot action renders the infrastructure file in a pull request as a Kanvas design and posts the picture as a comment, so reviewers see the resources and their connections before they read the YAML. It runs on GitHub-hosted runners and never touches your cluster.

## Choose how to install it

| Path | Use it when | Where it is documented |
| --- | --- | --- |
| Layer5 GitHub App wizard | You want Layer5 Cloud to commit the workflow and show you the API token to store as a secret. | [Connect GitHub](/pr-preview/pr-1342/cloud/guides/integrations/github-integration/) and the snapshot guide. |
| Your own workflow | You want to pick the triggers, run snapshots from a workflow you already maintain, or authenticate with a personal access token. | [Visualize Pull Requests with Kanvas Snapshot](/pr-preview/pr-1342/kanvas/guides/snapshots/kanvas-snapshot/) |

Both paths produce the same pull request comment. The snapshot guide documents every action input, the workflow the wizard installs, token handling, and troubleshooting. It is the single reference for the action, so this page does not repeat it.

## Decide when snapshots run

The workflow the wizard installs runs when a pull request is opened, synchronized, or reopened. In a workflow you own, you can use any GitHub event, such as `push`, `schedule`, or `workflow_dispatch`. Only pull request runs post a comment, because the comment needs a pull request number. Other runs still render the snapshot and expose its image URL as an output. See [Choose other triggers](/pr-preview/pr-1342/kanvas/guides/snapshots/kanvas-snapshot/#choose-other-triggers).

## What Layer5 Cloud provides

- **An API token** that authenticates the action to Layer5 Cloud. You generate and revoke tokens in Layer5 Cloud. See [Tokens](/pr-preview/pr-1342/cloud/concepts/identity-and-security/tokens/).
- **A GitHub App** that installs the workflow file in the repositories you choose, through the [Connect GitHub](/pr-preview/pr-1342/cloud/guides/integrations/github-integration/) wizard.
- **A generated design.** Each comment links to the design the action produced and to an editable copy in the Playground.

Availability depends on your plan. See [Feature Availability by Plan](/pr-preview/pr-1342/cloud/reference/feature-availability/).

## Related automation

Performance testing from a workflow is a Meshery capability, not a Layer5 Cloud one. See [GitOps with Meshery](https://docs.meshery.io/guides/infrastructure-management/gitops-with-meshery) in the Meshery documentation.

The action is also available on the [GitHub Marketplace](https://github.com/marketplace/actions/kanvas-snapshot).

