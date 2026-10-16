# Validate and Deploy

> Check a design, simulate its deployment, apply it to clusters, and remove it again.


Four actions take a design from the canvas to running infrastructure and back. Run them in this order. Each one is stricter than the last and costs a little more.

| Action | Checks or changes | Needs a cluster | Changes the cluster |
|---|---|---|---|
| [Validate](/pr-preview/pr-1324/kanvas/guides/deploying/validating-designs/) | Each component's configuration against its schema, in your browser | No | No |
| [Dry run](/pr-preview/pr-1324/kanvas/guides/deploying/dry-running-a-design/) | The design against the Kubernetes API of each target cluster | Yes | No |
| [Deploy](/pr-preview/pr-1324/kanvas/guides/deploying/deploying-designs/) | Creates or updates every component's object on the target clusters | Yes | Yes |
| [Undeploy](/pr-preview/pr-1324/kanvas/guides/deploying/undeploying-designs/) | Deletes every component's object from the target clusters | Yes | Yes |

The deploy and undeploy flows are five-step wizards that run validation and a dry run for you, so you do not need to run them separately first.

## Where these actions run

All four are Designer-mode actions in the design's Actions menu. They run on a Meshery you run, with the Meshery Server's kubeconfig doing the work. The hosted kanvas.new site does not run them and shows a self-hosted-feature prompt. See [How Kanvas Works with Meshery and Layer5 Cloud](/pr-preview/pr-1324/kanvas/concepts/architecture/) for what each environment supports.

## Who can run them

| Action | Permission |
|---|---|
| Validate | Validate Design (enforced on mobile only) |
| Dry run | Validate Design |
| Deploy | Deploy Design |
| Undeploy | Undeploy Design |

A denied action is hidden or disabled. The permission by role matrix is in [Permissions by Role](/pr-preview/pr-1324/kanvas/reference/permissions/). Deploys, dry runs, and undeploys also appear in the notification center, where failures carry error codes and remediations.

For environment selection, connection problems, and loading failures, see [Troubleshoot Kanvas](/pr-preview/pr-1324/kanvas/guides/troubleshooting/).

