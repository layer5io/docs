---
title: Kanvas Snapshot
linkTitle: Kanvas Snapshot
description: Render infrastructure files as Kanvas designs outside the canvas, in pull requests and from the command line, and see which platforms and inputs are supported.
weight: 50
diataxis: how-to
categories: [kanvas]
tags: [snapshots, github, gitops, helm]
---

Kanvas Snapshot turns an infrastructure-as-code file into a picture of the design it describes. It runs as a GitHub workflow or as a Helm plugin, not in the Kanvas canvas, so reviewers see the shape of a change (which components exist and how they connect) without reading YAML or opening Kanvas.

A snapshot is standalone. It never connects to your cluster and never deploys anything. It reads the file you point it at, builds a design from it, and renders that design to an image.

## What a snapshot does

1. Reads a Kubernetes manifest, a Docker Compose file, or a Helm chart.
2. Builds a Kanvas design from it. The design imports the same way any file imported into Kanvas does.
3. Renders the design to an image. The render runs on Layer5's hosted Meshery Playground when it is reachable. Otherwise the workflow starts a temporary local Meshery on a KinD cluster inside the GitHub runner.
4. Delivers the image: as a comment on the pull request, or as a URL printed in your terminal.

The pull request comment links the image to a copy of the design in the catalog and a copy you can edit in the Playground. Each later run of the workflow updates the same comment instead of adding another.

## Choose a way to run it

| Goal | Method | Guide |
|---|---|---|
| Add snapshots to pull requests in selected repositories, with the workflow installed for you | Layer5 GitHub App and the Layer5 Cloud connection wizard | [Visualize Pull Requests with Kanvas Snapshot]({{< ref "kanvas/guides/snapshots/kanvas-snapshot/index.md" >}}) |
| Add snapshots to a workflow you maintain, or trigger one on events other than pull requests | The Kanvas Snapshot GitHub Action used directly | [Visualize Pull Requests with Kanvas Snapshot]({{< ref "kanvas/guides/snapshots/kanvas-snapshot/index.md" >}}) |
| Get a snapshot of a Helm chart from a terminal, with no repository involved | The Helm plugin | [Snapshot a Helm Chart]({{< ref "kanvas/guides/snapshots/helm-kanvas-snapshot/index.md" >}}) |

## What is supported

| Capability | GitHub Action and Layer5 GitHub App | Helm plugin |
|---|---|---|
| Kubernetes manifests | Yes | No |
| Docker Compose files | Yes, set through the action | No |
| Helm charts | Yes, set through the action | Yes, by chart URL |
| Delivery | Comment on a pull request | URL in the terminal, or email |
| Needs a Layer5 Cloud account | Yes. The workflow authenticates with a Layer5 Cloud API token. | No |
| Needs access to your cluster | No | No |

| Source platform | Supported |
|---|---|
| GitHub.com, with the Layer5 GitHub App | Yes |
| GitHub.com, with your own workflow and a personal access token | Yes |
| GitHub Enterprise Server | No |
| GitLab | No |
| Bitbucket | No |
| ArtifactHub | No |

A snapshot shows the current file only. Snapshots do not show a diff between the pull request and its base branch, and they do not create or deploy anything from a pull request.

## Availability by plan

{{< feature-tiers categories="Workspaces" functions="GitOps Snapshots" >}}

## Who can set it up

Connecting GitHub and generating the API token need a signed-in Layer5 Cloud account. Snapshots use no named permission. Running the action in your own workflow needs only the API token and a GitHub token that can comment on pull requests.

The API token is scoped to your user account. See [Tokens]({{< ref "cloud/concepts/identity-and-security/tokens.md" >}}).
