---
title: Creating Your First Learning Path
weight: 3
description: >
  A hands-on tutorial that walks you through creating, structuring, and testing a custom learning path for the Layer5 Academy.
categories: [Academy]
tags: [Designer]
---

This guide provides a step-by-step walkthrough for creating and organizing a new learning path in the [Layer5 Academy](https://cloud.layer5.io/academy/overview). You'll learn how to set up your content repository, structure your courses, add assets, preview your work, and publish it for your organization.

### 1. Set Up Your Content Repository

Start by preparing a dedicated Git repository for your learning content. Using our official Layer5 template to help you get started quickly.

1. **Fork the academy-example Repository**

- Go to the [academy-example repository](https://github.com/layer5io/academy-example) on GitHub.
- Click **Fork** to create a copy under your own GitHub account.

2. **Clone Your Fork Locally**

- Use the `git clone` command to download your forked repository. 
- Example:
  ```bash
  # Replace `<your-username>` with your actual GitHub username
  git clone https://github.com/<your-username>/academy-example.git
  cd academy-example
  git checkout -b <your-feature-branch>
  ```

3. **Update the Go Module Path**

    1. Open the `go.mod` file located at the root of your `academy-example` project.
    2. The first line will be:
      ```go
      module github.com/layer5io/academy-example
      ```
    3. Change this line to match your fork's path:
      ```go
      module github.com/<your-username>/academy-example
      ```
    4. Save the file, then commit and push this change to your repository.

{{< alert type="info" title="Critical Step" >}}
This step is essential. It updates your repository's "identity card" (`go.mod`) to match its new "address" (your GitHub URL). Without this change, the layer5 cloud build process will fail.
{{< /alert >}}

### 2. Structure Your Learning Path

The Academy uses a specific directory layout to keep each organization's content separate and secure.

1. **Get Your Organization ID**

    Each learning path is tied to a specific organization. Before creating content, you must get your organization's unique identifier (UID). This is a system-generated ID, not a name you create.

{{< alert type="info" title="What is the UID?" >}}
The Organization UID ensures that your learning content is securely associated with your organization and displayed only to its members. You will use this exact UID to name your core content folders.
{{< /alert >}}

2. **Create the Core Directories**

    Now, inside your `academy-example` project, you should see the following top-level folders.

    1. `content/learning-paths/<your-organization-uid>/`
      This `content` directory is where all your written material lives. The folder hierarchy you create here directly defines the navigation and organization of your learning paths.
    2. `static/<your-organization-uid>/`
      This `static` directory is for all your assets, such as images, diagrams, and so on. 
    3. `layouts/shortcodes/<your-organization-uid>/`
      This `layouts` directory is for advanced use. You can place custom **Hugo Shortcodes** here if you need special reusable components in your lessons.

3. **Build the Content Hierarchy**

    With the main folders in place, you can now structure your first course inside the `content` directory. The content is organized in a clear hierarchy: **Learning Path → Course → Chapter → Lesson**.

    A high-level view of the structure looks like this:

    ```text
    content/
    └── learning-paths/
        ├── _index.md
        └── <your-organization-uid>/
            └── <your-learning-path>/
                ├── _index.md
                └── <your-course-1>/
                └── <your-course-2>/
                    ├── _index.md
                    └── content/
                        └── your-lesson-1.md
                        └── your-lesson-2.md
    ```

    Each folder represents a level in the hierarchy, and the `_index.md` file within a folder defines the metadata (like title and description) for that level. The final `.md` files are your individual lessons.

    Let's look at the role of each level:

    - **The Section (`learning-paths`)**
    This is the top-level category for your content. The `_index.md` file at this level defines the main landing page for all learning paths.

    - **Your Organization Folder (`<your-organization-uid>`)**
    This is the most important folder for ensuring your content is properly scoped. All of your learning paths must reside inside a single folder named with your organization uid.

    - **The Learning Path (`<your-learning-path>`)**
    This folder represents a complete learning path. The `_index.md` file inside it contains the title, description, and other metadata that will be displayed on the learning path's summary card.

    - **The Course or Chapter (`<your-course>`)**
    Within a learning path, each course or chapter gets its own folder. The `_index.md` file here defines the course's metadata and, most importantly, the `toc` (Table of Contents) that sets the order of your lessons.

    - **The Lessons (`content/`)**
    Finally, inside each course folder, a `content` directory holds all your individual lesson files, written in standard Markdown.

4. **Front matter**

    Use this at the top of each **Learning Path** page (`learning-paths/<orgId>/<slug>/_index.md` or similar):

    ```yaml
    ---
    title: "Mastering Kubernetes for Engineers"
    description: "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
    banner: null  # Optional, URL to banner image
    ---
    ```

    > Place this frontmatter in the Markdown file that represents the learning path index page.

    **Course Frontmatter (Optional Individual Course Pages)**

      If each course has its own markdown page, you can use this frontmatter:

        ```yaml
        ---
        title: "Kubernetes Basics"
        description: "Learn the basics of Kubernetes"
        weight: 1
        banner: null  # Optional
        ---
        ```

    **Summary of Required Fields**

    | Type          | Field         | Required | Notes                       |
    | ------------- | ------------- | -------- | --------------------------- |
    | Learning Path | `title`       | ✅        |                             |
    |               | `description` | ✅        |                             |
    |               | `weight`      | ✅        | Defines order in the path   |
    |               | `banner`      | ❌        | Optional image URI          |
    | Course        | `title`       | ✅        |                             |
    |               | `description` | ✅        |                             |
    |               | `weight`      | ✅        | Defines order in the path   |
    |               | `banner`      | ❌        | Optional image URI          |
    |               | `prerequisites`      | ❌        | Optional List of prerequisites for the course |


### 3. Add Assets and Interactive Content

Enhance your course with images and other visual aids. To ensure compatibility with the multi-tenant Academy platform, **do not use standard Markdown image links**. Instead, use the `usestatic` shortcode, which generates the correct, tenant-aware path for your assets.

**How to Add an Image**

1.  Place your image file (e.g., `hugo-logo.png`) in your scoped static directory:
    `static/<your-organization-uid>/images/hugo-logo.png`
2.  In your `lesson-1.md` file, embed the image using the `usestatic` shortcode. The `path` is relative to your scoped static folder: ![The Hugo Logo]({{</* usestatic path="images/hugo-logo.png" */>}})

Then the system will automatically convert this into the correct URL when building the site.

### 4. Build and Preview Locally

Before publishing, preview your content locally to check formatting and structure. Run the following command in your project directory:

```bash
hugo server
```

This will start a local server where you can view your content. 

![Preview site](./images/preview-site.png)

> The local preview shows basic styles; the full Academy styling will appear after your content is uploaded to the cloud platform.

### 5. Going Live

After you have completed and tested your content locally, reach out to the Layer5 team to request integration of your learning path. You can [connect](https://layer5.io/company/contact) with us via Slack, email, or by opening a GitHub issue. Be sure to provide the URL of your course repository when making your request.

A Layer5 administrator will then integrate your repository into the main Academy platform by updating the central configuration to mount your repository as a Hugo Module. Once this process is complete, your learning paths will be visible on the official Layer5 Cloud site.

### Frequently Asked Questions

- **How do I handle updates or corrections after my content is live?**

    All content updates and corrections are managed through your own Git repository. Simply commit and push your changes, and they will be automatically synchronized and published with the next Layer5 Cloud release.

- **How do I structure multiple courses under one learning path?**

    The structure is defined by your folder hierarchy. A learning path is a directory, and each course is simply a sub-directory within that path. This folder structure in your `content` directory directly maps to the learning path structure presented to users.



