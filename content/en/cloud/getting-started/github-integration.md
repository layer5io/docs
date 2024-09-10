---
title: Integrating GitHub with Meshery
description: Discover how to seamlessly connect your GitHub repository with Meshery, enabling easy import and management of your configuration files.
weight: 2
---

## Introduction

Meshery's GitHub Integration is a powerful feature that lets you authorize your GitHub account and import infrastructure files into Meshery. These files are then readily available in the Meshery catalog and can be easily opened in the Meshery Playground for viewing and configuration.

The GitHub integration offers an alternative to [importing designs from the canvas or through mesheryctl](https://docs.meshery.io/guides/configuration-management/importing-designs). It simplifies configuration management and enhances deployment workflow efficiency. By leveraging this integration, you ensure your infrastructure designs are easily accessible and always up-to-date.

This integration offers the following benefits:

1. **Easy Design Imports**: Quickly import existing configuration files directly from GitHub.

1. **Designs Available in Meshery Catalog**: The files imported from GitHub will be available in your Meshery catalog, allowing you to easily open the designs in the Meshery Playground to view and work with them.

1. **Collaboration**: Integrating Meshery with GitHub fosters collaboration by providing a streamlined process for teams to quickly access and collaborate on their designs.

## How to Integrate GitHub with Meshery

You can commence the integration process from the "**Extensions Page in Meshery**", or alternatively from the “**Layer5 Cloud Dashboard**”.

### Access Integrations Page from the Meshery Extensions Page

1. Go to [Extensions](https://playground.meshery.io/extensions).
1. Click on **Enable** for **GitHub Action: Kanvas Snapshot**.
1. You will be redirected to the Integrations page.

    ![Extensions](/cloud/getting-started/images/github/extensions.png)

### Navigate to the Integrations Page via the Layer5 Cloud Dashboard

1. On [Layer5 Cloud](https://meshery.layer5.io/dashboard), click on the **menu icon** on the navigation bar to open the global navigation menu.

    ![Dashboard](/cloud/getting-started/images/github/dashboard.png)

1. From the **Spaces** drop down, select **Integrations**.

    ![Spaces](/cloud/getting-started/images/github/spaces.png)

1. You will be redirected to the Integrations page. Click **Connect** to begin the integration process.

    ![Integrations](/cloud/getting-started/images/github/integrations.png)

### Connect GitHub and Import Designs

Let’s go through the steps required to connect your GitHub account and import files from your repository.

1. **Connect GitHub App**: This initiates the authorization process where you'll link your GitHub account with Meshery.
    - Click **Connect**.

      ![Connect GitHub](/cloud/getting-started/images/github/github.png)

    - You will be asked to sign in to your GitHub account if you are not already signed in.
    - Once signed in, GitHub will prompt you to select the GitHub account where you want to install the Meshery GitHub App. This account could be your personal account or an organization account you can access.

      ![Install Meshery](/cloud/getting-started/images/github/install_meshery.png)

    - After selecting the account, GitHub will prompt you to authorize the Meshery GitHub App so it can access your account.
    - You can choose to allow access to all repositories or select specific ones.
    - After making your selection, click **Install and Authorize** to complete the authorization process.

      ![Install and Authorize](/cloud/getting-started/images/github/authorize.png)

> Note: When you install a GitHub App on your account or organization, you grant the app permission to access the organization and repository resources that it requested. You also specify which repositories the app can access.

2. **Select Repositories**: After authorization, you will be redirected back to this page to select the GitHub repository you want to import files from.

    - Select the repository or repositories you want, then click **Next**.

      ![Select repository](/cloud/getting-started/images/github/select-repo.png)

    **Reconfigure Repository Selection**

    If you are reconfiguring your existing GitHub integration, you will see the **Add Repository** button. This takes you to the “Install Meshery” page where you can either:

    1. Select a new repository you want to import files from.
    1. Reconfigure repository access for GitHub accounts that already have the Meshery GitHub App installed or
    1. Install the Meshery GitHub App on a new GitHub account to gain access to the repositories there.

        ![Add Repository](/cloud/getting-started/images/github/add_repo.png)

1. **Import Design Files**: The files in the repository are displayed for you to select the ones you want to import as designs.

    - There is a checkbox that allows you to choose between displaying all file types or only the file types that are typically supported by Meshery for import.

      ![Show all File Types](/cloud/getting-started/images/github/show_all_files.png)

    - The file types supported for import are:
      1. Helm charts
      2. Docker Compose files
      3. Kubernetes manifests
      4. Meshery Designs

    - Select the checkbox beside the directory name to import all the files in the directory, or individually select the files you want to import and click **Import**.
    - If you want to go back and change your selection or choose a different repository, click **Back**.

      ![Select Files](/cloud/getting-started/images/github/select_file.png)
    - After the import, the files that were imported successfully and those that weren't will be indicated on the screen.

      <!-- ![After Import](/cloud/getting-started/images/github/png) -->

### [Optional] Enabling Snapshots

These next steps are optional. By enabling snapshots, you can choose a design from each repository to configure [Meshery snapshots](https://docs.meshery.io/extensions/snapshot). This feature allows you to capture snapshots of design infrastructure changes with each pull request made using a GitHub workflow that Meshery will add to your repository.

1. **Select Designs**: Select the design from the repository you want to enable snapshots for, then click **Next**.

    ![Select Designs](/cloud/getting-started/images/github/select_design.png)

    **Warning: Workflow Already Exists**

    If you attempt to add a workflow to a repository that already contains an existing workflow from this process, you will see a warning message. Proceeding to the next step after receiving this warning will overwrite the existing snapshot workflow in that repository.

    ![Workflow Exists](/cloud/getting-started/images/github/workflow_exists.png)

1. **Configure Secrets**:
    - Copy the **API TOKEN** and add it to the secrets page of your selected repository. To learn more about configuring secrets check out [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).
    - Tick the check box to confirm that you have added the token.

      ![Configure Secrets](/cloud/getting-started/images/github/configure_secrets.png)

1. **Add workflows**: Allowing Meshery to add this workflow ensures the smooth integration of Meshery Snapshot with your GitHub repository. The workflow:

    - **Triggers on Pull Requests**: Automatically runs when a pull request is opened, synchronized, or reopened.

    - **Assigns Permissions**: Provides necessary permissions for reading actions, writing content, handling security events, statuses, and pull requests.

    - **Captures Snapshots**: Uses the Kanvas-Snapshot action to capture snapshots of your infrastructure based on the specified application_type (e.g. Kubernetes Manifest, Docker Compose, Helm Chart).

    With the workflow active in your repository, you can now visualize changes to your infrastructure directly in your pull requests, making it easier to track and review updates on designs.

    ![Add workflow](/cloud/getting-started/images/github/add_workflows.png)

    Click **Next** to finish setting up!

### Finish Setup

You have successfully Integrated GitHub with Meshery! This page provides an overview of the steps you completed.

1. Click on the commit hash link (e.g. `#7f2d9`) to see where the workflow was added in your repository.
1. Click on the **View** icon to open the Meshery Catalog and see the design.
1. If everything looks good, click **Finish**. If you need to make any updates, you can go **Back** to the previous steps.

    ![Finish Set up](/cloud/getting-started/images/github/finish.png)

## View Imported Designs

To view imported designs:

1. Go to [Meshery Catalog](https://meshery.layer5.io/catalog).
1. Click on **My Designs** on the navigation bar.

    ![Catalog](/cloud/getting-started/images/github/catalog.png)

## View GitHub Integration Connection on Meshery Playground

To view and manage the GitHub connection, on the left sidebar of the playground, click on **Lifecycle** > **Connections**.

![View GitHub Connection](/cloud/getting-started/images/github/connections.png)

## Delete GitHub Integration

You can delete the GitHub Integration Connection from the “**Connections page in Meshery**" shown in the preceding section or “**Integrations page in Layer5 cloud**".

On the Connections page in Meshery:

  1. Identify the connection and click on its checkbox.
  1. Click **Delete**.

On the [Integrations Page in Layer5 Cloud](https://meshery.layer5.io/spaces/integrations) page:

  1. Click on the GitHub Connection.
      ![Select Connection](/cloud/getting-started/images/github/select_connection.png)

  1. Tick the checkbox then **delete**.
      ![Delete Connection](/cloud/getting-started/images/github/delete_connection.png)

## Conclusion

In this guide, you walked through the steps to integrate your GitHub account with Meshery.

You authorized Meshery to access your GitHub account, imported designs from repositories, and viewed them in the Meshery Catalog. You also learned how to enable Meshery Snapshots for your GitHub repositories, allowing you to version and track changes to your infrastructure configurations.

Additionally, you saw how to view, manage, and delete your GitHub connection within Meshery and Layer5 Cloud.

By connecting your GitHub account, you gain seamless access to your resources, streamline your deployment workflow, and ensure your design infrastructure configurations are always up-to-date.
