---
title: GitHub Actions
description: GitHub Actions with Meshery automates the synchronization of Git repositories and visually validates pull requests for efficient development.
weight: 20
categories: [Workspaces]
tags: [gitops, github-actions, kanvas]
---
Meshery GitHub Actions enhance your operational workflow by integrating git version control and the management of your infrastructure. Meshery GitHub Actions are design to integrate into your existing pipelines.

## Meshery Github Actions

1. [Kanvas Snapshot](#kanvas-snapshot-github-action)
2. [Performance Testing with Meshery](https://docs.meshery.io/guides/gitops-with-meshery)
3. Archived: [Service Mesh Interface Conformance with Meshery](https://github.com/marketplace/actions/service-mesh-interface-conformance-with-meshery)

This methodology automates the synchronization of your actual infrastructure state with the desired state defined in your Git repository. Meshery enables GitOps by offering a comprehensive view of your infrastructure, allowing you to verify workload designs and Kubernetes cluster configurations before merging pull requests.

## Kanvas Snapshot GitHub Action

Meshery introduces the Kanvas Snapshot GitHub Actions, a tool that allows you to visualize changes in your infrastructure directly in your pull requests. With Kanvas Snapshot, you can:

- See your deployment changes pull request-to-pull request.
- Get snapshots of your infrastructure directly in your pull requests.

[See action in GitHub Marketplace](https://github.com/marketplace/actions/kanvas-snapshot)

### Configuring Kanvas Snapshots

Kanvas serves as a fundamental component, providing visual insights into infrastructure changes and facilitating the synchronization between the actual and desired states. Ensure that you have proper access to Kanvas to leverage its capabilities for effective GitOps implementation.

#### Step 1: Get access to Kanvas

To integrate Snapshots into your GitHub pull requests, confirm that your user account has Kanvas access. To do so, sign into your Layer5 Cloud account and look forIf your user account doesn't have access, [simply request access](https://meshery.layer5.io/account/subscriptions) to Kanvas.

#### Step 2: Enable Kanvas Snapshot Action

1. Choose to enable the Kanvas Snapshot action for all repositories in your GitHub account or for specific repositories.
1. Authorize the Meshery GitHub App.
1. Copy the Secret token. This token is used to authenticate Meshery with your Layer5 Cloud account.
1. Once authorized, Meshery will automatically create a pull request workflow for your repository. To disable the workflow, simply delete the `.github/workflows/kanvas-snapshot.yml` file from your repository.
1. Specify the path within your Git repository where the application configurations are stored. This ensures Meshery knows where to find and visuzlie the desired state of your infrastructure.

{{%pageinfo%}}
The Meshery GitHub App requires authorization to interact with your repositories. If you would like to use your GitHub user's personal access token, instead, [please let us know](https://meshery.layer5.io/support). {{%/pageinfo%}}


## Customizing Snapshot Workflow Triggers in Kanvas Snapshot

You can configure your workflows to run when specific activity on GitHub happens, at a scheduled time, or when an event outside of GitHub occurs.

### About events that trigger workflows

GitHub Actions provides a variety of events that can trigger workflows, allowing you to automate your software development process. Each event corresponds to a specific activity, such as creating a pull request, pushing code to a repository, or releasing a new version.

## Using Meshery's Performance Testing GitHub Action

You can create your own performance profiles to run repeatable tests with Meshery. You can configure this action to trigger with each of your releases, on every pull request. or any GitHub workflow trigger event. A sample configuration of the action is shown below.

Read more about the Service Mesh Performance GitHub Action in the [Meshery documentation](https://docs.meshery.io/guides/gitops-with-meshery). [See action in GitHub Marketplace](https://github.com/marketplace/actions/performance-testing-with-meshery)
