---
title: Integrating GitHub with Meshery
description: Discover how to seamlessly connect your GitHub repository with Meshery, enabling easy import and management of your configuration files.
weight: 2
---

## Introduction

Meshery's GitHub Integration is a powerful feature that lets you authorize your GitHub account and import infrastructure files directly into Meshery. These files become readily available in the Meshery catalog and can be easily opened in the Meshery Playground for viewing and configuration.

The GitHub integration offers an alternative to importing designs from the canvas or through mesheryctl. It simplifies configuration management and enhances deployment workflow efficiency. By leveraging this integration, you ensure your cloud-native applications and infrastructure are always up-to-date and easily accessible.

## Integrating GitHub with Meshery

Meshery's GitHub integration allows you to seamlessly connect your GitHub account and access your cloud-native infrastructure and application files directly within the Meshery platform. This integration offers several benefits:

1. **Configuration File Imports**: Access and Manage configuration files directly from GitHub.

1. **Available in Catalog and Meshery Playground**: The files imported from GitHub will be available in your Meshery catalog. You can easily open them in the Meshery Playground to view and work with them.

1. **Collaboration**: Integrating Meshery with GitHub fosters collaboration by providing a centralized platform where team members can access and manage cloud-native infrastructure and application files. By using GitHub's version control system, multiple team members can work on the same project simultaneously, track changes, and review each other's work.

## How to Integrate GitHub with Meshery

You can start the integration process from the “Dashboard” or “Extensions” page on Meshery.

### Navigating to the Integrations Page via Meshery Dashboard

1. From the [Cloud Dashboard](https://meshery.layer5.io/dashboard). Click on the **menu icon** to open the global navigation menu.

    ![Dashboard](/cloud/getting-started/images/github/dashboard.png)

1. From the **Spaces** drop down, select **Integrations**.

    ![Spaces](/cloud/getting-started/images/github/spaces.png)

1. You will be redirected to the Integrations page. Click **Connect** to begin the integration process.

    ![Integrations](/cloud/getting-started/images/github/integrations.png)

### How to Access Integrations from the Extensions Page

1. Go to [Extensions](/cloud/getting-started/images/github/extensions).
1. Click on **Enable** for **GitHub Action: MeshMap Snapshot**.
1. You will be redirected to the Integrations page.

    ![Extensions](/cloud/getting-started/images/github/extensions.png)

### Connect GitHub and Import Designs

Let’s go through the steps required to connect your GitHub account and import files from your repository.

1. **Connect GitHub App**: This initiates the authorization process where you'll link your GitHub account with Meshery. 
    - Click **Connect**.

      ![Connect GitHub](/cloud/getting-started/images/github/github.png)

    - You will be asked to sign in to your GitHub account if you are not already signed in.
    - Once signed in, GitHub will prompt you to select the GitHub account where you want to install the Meshery GitHub App. This account could be your personal account or an organization account you have access to.

      ![Install Meshery](/cloud/getting-started/images/github/install_meshery.png)

    - After selecting the account, GitHub will prompt you to authorize the Meshery GitHub App to access your account.
    - You can choose to allow access to all repositories or select specific repositories that Meshery will be able to access.
    - After making your selection, click **Install and Authorize** to complete the authorization process.

      ![Install and Authorize](/cloud/getting-started/images/github/authorize.png)

> Note: When you install a GitHub App on your account or organization, you grant the app permission to access the organization and repository resources that it requested. You also specify which repositories the app can access.

2. **Select Repositories**: After authorization, you will be redirected back to this page to select the GitHub repository you want to import files from.

    - Select the repository or repositories you want, then click **Next**.

      ![Select repository](/cloud/getting-started/images/github/select-repo.png)

    **Add Repository**

    This takes you to the “Install Meshery” page where you can either:

    1. Reconfigure repository access for GitHub accounts that already have the Meshery GitHub App installed or
    1. Install the Meshery GitHub App on a new GitHub account to gain access to the repositories there.

        ![Add Repository](/cloud/getting-started/images/github/add_repo.png)

1. **Import Design Files**: The files in the repository are displayed for you to select the ones you want to import as designs.

    - There’s a checkbox that let’s you choose to either show all file types or only the files that are normally supported by Meshery for import.

      ![Show all File Types](/cloud/getting-started/images/github/show_all_files.png)

    - The file types supported for import are:
      1. Helm charts
      2. Docker Compose files
      3. Kubernetes manifests
      4. Meshery Designs

    - Select the checkbox beside the directory name to import all the files in the directory, or individually select the files you want to import and click **Import**.
    - You can click **Back** to return to the previous step and change or a new repository.

      ![Select Files](/cloud/getting-started/images/github/select_file.png)

    - A popup showing the status of the import will be bottom of the screen. You will be able to view and manage your Imported designs at the finish step.
    - Click **Next**.

    _This image illustrates a successful import._

    ![Import Success](/cloud/getting-started/images/github/import_success.png)

    _The image below illustrates a unsuccessful import._

    ![Unsuccessful Import](/cloud/getting-started/images/github/unsuccessful_import.png)

### [Optional] Enabling Snapshots 

These next steps are optional. By enabling snapshots, you can choose a design from each repository to configure [Meshery snapshots](https://docs.meshery.io/extensions/snapshot). This feature allows you to capture snapshots of design infrastructure changes with each pull request made.

1. **Select Designs**: Select the design(s) you want to enable snapshots for, then click **Next**.

    ![Select Designs](/cloud/getting-started/images/github/select_design.png)

1. **Configure Secrets**:
    - Copy the **API TOKEN** and add it to the secrets page of your select repository. To learn more about configuring secrets check out [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).
    - Tick the check box to confirm that you have added the token.

    ![Configure Secrets](/cloud/getting-started/images/github/configure_secrets.png)

1. **Add workflows**: Allowing Meshery to add this workflow ensures smooth integration of Meshery Snapshot with your GitHub repository. The workflow:

    - **Triggers on Pull Requests**: Automatically runs when a pull request is opened, synchronized, or reopened.

    - **Assigns Permissions**: Provides necessary permissions for reading actions, writing content, handling security events, statuses, and pull requests.

    - **Captures Snapshots**: Uses the MeshMap-Snapshot action to capture snapshots of your infrastructure based on the specified application_type (e.g. Kubernetes Manifest, Docker Compose, Helm Chart).

    With the workflow active in your repository, you can now visualize changes to your infrastructure directly in your pull requests, making it easier to track and review updates on designs.

    ![Add workflow](/cloud/getting-started/images/github/add_workflows.png)

    **Workflow Already Exists**

    If you attempt to add a workflow to a repository that already has one, you will receive this warning.

    ![Workflow Exists](/cloud/getting-started/images/github/workflow_exists.png)

    Click **Next** to finish setting up!

### Finish Setup

1. Click on the commit hash link e.g. `#7f2d9` to see where the workflow was added in your repository.
1. Click on the **View** icon to open Meshery Catalog and see the design.
1. Click Finish.

    ![Finish Set up](/cloud/getting-started/images/github/finish.png)

### View Imported Designs

To view imported designs:

1. Go to [Meshery Catalog](https://meshery.layer5.io/catalog).
1. Click on **My Designs** on the navigation bar.

    ![Catalog](/cloud/getting-started/images/github/catalog.png)

### View GitHub Integration Connection on Meshery Playground

To view and manage the GitHub connection, on the left sidebar of the playground, click on **Lifecycle** > **Connections**. 

![View GitHub Connection](/cloud/getting-started/images/github/connections.png)

### Delete GitHub Integration

You can delete the GitHub Integration Connection, from Meshery Playground on the “Connections” page shown in the preceding section or “Integration” page.

On the Connections page in Layer5 Cloud:

  1. Identify the connection, click on the checkbox beside.
  1. Click **Delete**.

On the [Meshery Integrations](https://meshery.layer5.io/spaces/integrations) page:
  1. Click on the GitHub Connection.

      ![Select Connection](/cloud/getting-started/images/github/select_connection.png)
  1. Tick the checkbox then **delete**.
  ![Delete Connection](/cloud/getting-started/images/github/delete_connection.png)


### Conclusion

In this guide, you walked through the steps to integrate your GitHub account with Meshery.

You authorized Meshery to access your GitHub account, imported designs from repositories, and viewed them in the Meshery Catalog. You also learned how to enable Meshery Snapshots for your GitHub repositories, allowing you to version and track changes to your infrastructure configurations.

Additionally, you saw how to view, manage, and delete your GitHub connection within Meshery.

By connecting your GitHub account, you gain seamless access to your resources, streamline your deployment workflow, and ensure your design infrastructure configurations are always up-to-date. 
