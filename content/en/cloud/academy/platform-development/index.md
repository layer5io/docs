---
title: "Platform Development Guide"
weight: 5
description: >
  An advanced guide to the Layer5 Academy architecture, multi-repository workflow, and development best practices for contributors.
categories: [Academy]
aliases: 
- /cloud/academy/advanced-contribution-guide/
- /cloud/academy/platform-development/
---

This guide walks you through the Layer5 Academy platform's multi-repository architecture. You will learn the role of each core component and master the practical workflows for theme development, local testing, and end-to-end validation with Layer5 Cloud.

## The Multi-Repository Model

The [Layer5 Academy platform](https://cloud.layer5.io/academy) is built on a "separation of concerns" architecture. Instead of a single monolithic repository, we use a multi-repository model where content, style, and build configurations are managed independently. This approach keeps the system modular, simplifies maintenance, and allows teams to work on different parts of the platform concurrently.

At a high level, the `academy-theme` provides the visual style for content from repositories like `academy-example`, and the `academy-build` repository acts as the central factory, assembling everything into the final website.

## Core Repositories

The Layer5 Academy platform is composed of several core repositories.

### [academy-theme](https://github.com/layer5io/academy-theme)

This repository is the "skin" for the entire Academy. It controls the website's design, including all the layouts, colors, and fonts.

Content repositories automatically import this theme as a Go Module. As a content creator, you do not need to fork or clone this repository; your academy will use these styles by default. 

> Currently, we only support customizing shortcodes in your content repository, not full theme customization. For requests regarding new archetypes, layouts, or theme enhancements, please open an issue in the [academy-theme repository](https://github.com/layer5io/academy-theme/issues).

### [academy-example](https://github.com/layer5io/academy-example)

This is the "starter kit" for anyone new to creating Academy content. It provides a pre-configured site that new organizations can fork to get started quickly.

> [Learn How](../creating-your-learning-path/) to create your own learning path

This content repository doesn't build the final website itself. Instead, it uses an automated workflow to act as a "gatekeeper" for new content. When you create a new GitHub Release, it triggers the following process:

1. **Sanity Check**: It first runs a local build to ensure the new content has no fundamental errors that would break the site.

2. **Publishing Notification**: If the check passes, it calls a reusable action from the `academy-build` repository. This action securely sends a request to the Layer5 Cloud API, using your configured `ACADEMY_ORG_ID` and `ACADEMY_TOKEN` secrets.

{{< alert type="info" title="Publishing Trigger" >}}
This request effectively says: "A new version of content is ready for this organization. Please update it." This workflow does not build the final site; it only validates the content and notifies the build system.
{{< /alert >}}

### [academy-build](https://github.com/layer5io/academy-build)

**This is the central hub of the entire system.** It contains the main Hugo configuration for the production build and uses Go Modules to manage the versions of all content modules and the `academy-theme`.

When its workflow is triggered, an automated process acts like a master assembly line:

1.  **Collects Parts**: It begins by gathering all the necessary components—`academy-theme` and all the course content from the various content repositories.

2.  **Assembles the Website**: Next, it combines everything. It applies the theme's design to all the course content, building a single, complete website.

3.  **Deploys Online**: Finally, it takes the newly built website and automatically pushes it to the cloud platform, making the updates live for everyone to see.

## Developer Workflows

### How to Develop and Preview Locally

Use this workflow for rapid local development and iteration. If you're only changing Markdown files and want a fast preview loop, run these commands within a content repository (such as `layer5-academy`):

{{< alert type="info" title="layer5-academy as an Example" >}}
We'll use [layer5-academy](https://github.com/layer5io/layer5-academy) for these examples because it hosts all official Layer5 learning paths. It serves as a feature-complete reference, allowing you to see how a complex, real-world content repository is structured.
{{< /alert >}}

1. `go mod tidy`: Cleans up and verifies Go module dependencies.
2. `make setup`: Installs necessary tools and modules.
3. `make site`: Starts the local Hugo development server.

You can then view your content by navigating to `http://localhost:1313/academy`.

### How to Develop the Academy Theme

If you need to modify the `academy-theme` and see its effect on real content, you'll use the `go mod replace` directive:

1. **Modify the Theme**: Make your code changes in your local clone of the `academy-theme` repository.
2. **Redirect the Dependency**: In the `go.mod` file of the content repository you're using for previewing (e.g., `layer5-academy`), add a `replace` directive to point Hugo to your local theme directory:
   ```go
   replace github.com/layer5io/academy-theme => ../academy-theme
   ```
3. **Apply Changes and Relaunch**: Run `go mod tidy` to apply the `replace` directive you just added. Then, restart the server with `make site`. The local server will now use your local theme code, allowing you to see your changes instantly.

### How to Use End-to-End Testing with Layer5 Cloud

Use this workflow for end-to-end testing that mirrors the production environment. This is the ultimate way to verify your changes work correctly within the Layer5 Cloud UI before they go live:

All steps in this section should be performed from the root of your local `academy-build` repository.

1.  **Install Dependencies**: Run this command once to install necessary dependencies.
    ```bash
    make setup
    ```

2. **Prepare Local Dependencies**: If you're testing local changes from other repositories (like a theme or content module), edit the `go.mod` file in `academy-build` to point to your local versions using a replace directive:
   ```go
   replace github.com/layer5io/academy-theme => ../academy-theme
   replace github.com/layer5io/layer5-academy => ../layer5-academy
   ```

3.  **Build for Staging**: Run the command to build the entire Academy site specifically for the staging environment.
    ```bash
    make stg-build
    ```

4.  **Sync with Cloud**: After the build completes, run the following command to sync the generated static files with the Layer5 Cloud staging environment:
    ```bash
    make sync-with-cloud
    ```

5. **Preview on Staging**: Your changes will be available on the [staging environment](https://staging-cloud.layer5.io/) within approximately 10 minutes.

{{< alert type="warning" title="Local vs. Cloud Discrepancies" >}}
The local preview (`make site`) is excellent for rapid development, but it is **not** a 100% accurate representation of the final product. The Cloud UI acts as a wrapper around the Academy content, which can introduce subtle differences. These are often caused by CSS class conflicts or variations in JavaScript execution within the larger application.

**Always verify your changes in the staging environment before considering them complete.**
{{< /alert >}}

### When to Use a Holistic Build Test

If you need a faster way to check the final output without syncing to the cloud, you can run a production-like build locally from the `academy-build` repo:

```bash
make prod-build
```

This command generates the final static files in the `public/` directory. You can inspect the generated HTML and JSON files here to diagnose build-time issues before deploying.

### Best Practices

1. **Keep Dependencies Clean**: After testing with local replace directives in your `go.mod` file, always remember to remove them and run `go mod tidy` before committing your changes. This prevents accidental check-ins of local paths.
2. **Test Incrementally**: Start with local development for rapid iteration, then progress to holistic builds, and finally test in the staging environment.
3. **Version Control**: Always commit your changes to version control before testing in staging to ensure you can track and revert changes if needed.