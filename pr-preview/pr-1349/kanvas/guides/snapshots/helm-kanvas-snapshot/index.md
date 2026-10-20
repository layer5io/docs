# Snapshot a Helm Chart


> Generate a rendered image of a Helm chart from the command line with the Kanvas Snapshot Helm plugin, and receive it by URL or email.


The Kanvas Snapshot Helm plugin renders a Helm chart as a Kanvas design image from your terminal. Use it to see what a chart deploys before you install it, or to put a picture of a chart in a review, a ticket, or a README. It needs no repository, no cluster, and no Layer5 Cloud account.

You give the plugin the URL of a packaged chart. The plugin imports the chart as a design, starts a render, and then prints the image URL or emails you when the image is ready.

## Before you start

- Helm installed on your machine.
- A packaged chart (`.tgz`) at a URL that the snapshot service can download without credentials. The plugin submits the value of `-f` as a URL, so a local file path is not a supported input.
- For email delivery, an address in lowercase.

## Install the plugin

```bash
helm plugin install https://github.com/meshery/helm-kanvas-snapshot
```

The install downloads a prebuilt binary for your platform. Confirm the install and update it later with:

```bash
helm plugin list
helm plugin update helm-kanvas-snapshot
```

The list shows the plugin as `helm-kanvas-snapshot`. Helm runs a plugin by its name, so the command is `helm helm-kanvas-snapshot`.

## Generate a snapshot

```bash
helm helm-kanvas-snapshot -f <chart-url> [--name <name>] [-e <email>]
```

For example:

```bash
helm helm-kanvas-snapshot -f https://meshery.github.io/meshery.io/charts/meshery-v1.0.20.tgz --name meshery-chart
```

| Flag | Required | Behavior |
|---|---|---|
| `-f`, `--file` | Yes | URL of the packaged chart. |
| `--name` | No | Name of the design that the plugin creates. Without it, the plugin uses the file name without its extension and prints a warning that it did. |
| `-e`, `--email` | No | Email address to notify when the snapshot is ready. The plugin rejects any address that contains uppercase letters or does not look like an address, and exits with an error. |

## What happens

1. The plugin imports the chart as a saved design and prints `Successfully created Meshery design. ID: <id>`.
2. The plugin starts the rendering workflow.
3. The plugin prints the result and exits.

Without `--email`, the plugin prints the snapshot URL. The image takes three to five minutes to appear at that URL, so an immediate request can return nothing. With `--email`, the plugin prints a confirmation and the service emails you when the snapshot is ready.

## Privacy and ownership

The plugin ships with Layer5's service credentials, so it works without signing in. That has three consequences:

- The service downloads your chart from the URL you give. Use only a chart that you are willing to expose to that service.
- The image sits at a public URL named after the design id. Anyone who has the URL can open it.
- The plugin saves the design with the service's credentials, not under a Layer5 Cloud account of yours. To work on a chart as your own design, import it into Kanvas instead. See [Import and Merge Designs](/pr-preview/pr-1349/kanvas/guides/designs/import-designs/).

## Errors

The plugin exits with status 1 and prints an error code.

| Code | Meaning |
|---|---|
| `kanvas-snapshot-900` | The chart URI is invalid. |
| `kanvas-snapshot-901` | The plugin could not create the design. |
| `kanvas-snapshot-902` | The plugin could not start the render. |
| `kanvas-snapshot-903` | An HTTP request failed. |
| `kanvas-snapshot-905` | A response could not be decoded. |
| `kanvas-snapshot-906` | A request returned an unexpected status. The message carries the status and the response body. |
| `kanvas-snapshot-907` | A required field is missing. |
| `kanvas-snapshot-908` | The email address is not valid. |
| `kanvas-snapshot-909` | GitHub rejected the request to start the render with a 401 or 403 status. |

If the image never appears, check that the chart URL opens in a browser without signing in, then run the command again. For pull request snapshots, see [Visualize Pull Requests with Kanvas Snapshot](/pr-preview/pr-1349/kanvas/guides/snapshots/kanvas-snapshot/).

