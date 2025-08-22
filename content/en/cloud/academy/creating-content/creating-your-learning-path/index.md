---
title: Creating Your First Learning Path
weight: 3
description: >
  A hands-on tutorial that walks you through creating, structuring, and testing a custom learning path for the Layer5 Academy.
categories: [Academy]
tags: [Academy]
aliases: 
- /cloud/academy/creating-your-learning-path/
---

This guide provides a step-by-step walkthrough for creating and organizing a new learning path in the [Layer5 Academy](https://cloud.layer5.io/academy). You'll learn how to set up your content repository, structure your courses, add assets, preview your work, and publish it for your organization.

### Prerequisites

Before you dive into creating your first learning path, it's helpful to be familiar with the core technologies and concepts used by the Academy platform. 

- **Git and GitHub**: All learning content is managed in a Git repository.
- **Markdown**: All content is written in standard Markdown. 
- **Hugo**: The entire Academy platform is built on the [Hugo](https://gohugo.io/) static site generator. 
- **Academy Template & Theme**: We provide an `academy-example` repository that serves as a pre-configured template. [Layer5 Academy theme](https://github.com/layer5io/academy-theme) to ensure your content is styled correctly right out of the box.
- **A Layer5 Cloud Account**: Required to obtain your Organization ID and Personal Access Token for publishing.

## 1. Set Up Your Content Repository

Start by preparing a dedicated Git repository for your learning content. Using our official Layer5 template to help you get started quickly.

### 1. Fork the academy-example Repository

- Go to the [academy-example repository](https://github.com/layer5io/academy-example) on GitHub.
- Click **Fork** to create a copy under your own GitHub account.

### 2. Clone Your Fork Locally

- Use the `git clone` command to download your forked repository. 
- Example:
  ```bash
  # Replace `<your-username>` with your actual GitHub username
  git clone https://github.com/<your-username>/academy-example.git
  cd academy-example
  git checkout -b <your-feature-branch>
  ```

### 3. Update the Go Module Path

1. Open the `go.mod` file located at the root of your `academy-example` project.
2. The first line will be: 
  ```go
  module github.com/layer5io/academy-example
  ```
3. Change this line to match your fork's path: 
  ```go
  module github.com/<your-username>/<your-repo-name>
  ```
4. Save the file, then commit and push this change to your repository.

{{< alert type="info" title="Critical Step" >}}
This step is essential. It updates your repository's "identity card" (`go.mod`) to match its new "address" (your GitHub URL). Without this change, the Academy publishing process will fail.
{{< /alert >}}

## 2. Structure Your Learning Path

The Academy uses a specific directory layout to keep each organization's content separate and secure.

### Find Your Organization UUID and content ID

{{< alert type="warning" title="Important: Replace UUIDs" >}}
Throughout this guide, you'll see references to `<your-organization-uuid>` and `<your-learning-path-uuid>` placeholders. Make sure to replace all of these with your actual UUIDs from the [Instructor Console](https://cloud.layer5.io/academy/instructors-console) when implementing your learning path.
{{< /alert >}}

Each learning path is tied to a specific organization and secured by a unique identifier (UUID). This is a system-generated ID that ensures your content is scoped only to your organization.

You'll need two types of UUIDs:
- **Learning Path ID**: A unique identifier for your specific learning path that gets added to the front matter of your learning path's index file
- **Organization ID**: Your organization's UUID that's used in directory paths

{{< alert type="info" title="Generating Your IDs from the Instructor Console" >}}

The easiest way to get the correct IDs is by using the content creation tool.

- Navigate to the [Instructor Console](https://cloud.layer5.io/academy/instructors-console) in Layer5 Cloud.
- Use the "Create New Content" tool and fill in the information for your new content
- The final step generates all the necessary materials to get started: the front matter, repository setup instructions, and your unique IDs.

[Learn more](/cloud.layer5.io/academy/instructors-console) about academy console.
{{< /alert >}}

### Create the Core Directories

Now, inside your academy repository, you should see the following top-level folders.

1. `content/learning-paths/<your-organization-uuid>/`
  This `content` directory is where all your written material lives. The folder hierarchy you create here directly defines the navigation and organization of your learning paths.
2. `layouts/shortcodes/<your-organization-uuid>/`
  This `layouts` directory is for advanced use. You can place custom **Hugo Shortcodes** here if you need special reusable components.

### Build the Content Hierarchy

 With the main folders in place, you can now structure your first course inside the `content` directory. The content is organized in a clear hierarchy: A **Learning Path** contains **Courses**. A **Course** is primarily broken down into **Modules**, but can also conclude with a final **Test** that serves as a course exam. Finally, a **Module** consists of individual **Pages** and **Labs**. 

 A high-level view of the structure looks like this:

 ```text
 learning-paths/<your-organization-uuid>
 └── mastering-kubernetes/                        // <-- Learning Path/
     ├── _index.md                            
     ├── advanced-networking/                     // <-- Course 1/
     │   └── _index.md                        
     └── core-concepts/                           // <-- Course 2/
         ├── _index.md   
         ├── course-exam.md                       // <-- Course Exam (Test)                     
         └── 01-pods-and-services/                // <-- Module/
             ├── _index.md                    
             ├── 01-pods/
             │   └── _index.md                    // <-- Page 1
             ├── 02-services/
             │   ├── _index.md                    // <-- Page 2
             │   ├── 02-image.png                 // <-- Image               
             ├── 03-knowledge-check.md            // <-- Test
             ├── 04-hands-on-lab.md               // <-- Lab
             └── arch.png                         // <-- Image

 ```

 Each folder represents a level in the hierarchy. The `_index.md` file within a folder is crucial as it defines the metadata for that level, such as its `title`, `description`, and `type` (e.g., `type: "course"`). The final `.md` files represent your individual learning activities: **Pages** and **Labs** are typically found inside Modules, while **Tests** can be placed at any hierarchy - either within Modules or directly under a Course.

> For a deeper understanding of how Hugo uses `_index.md` to create content sections, you can refer to the official [Hugo Page Bundles documentation](https://gohugo.io/content-management/page-bundles/).

### Front Matter

 Front matter is the configuration block at the top of every content file that defines its metadata. The most critical field is type, which tells the Academy how to render the content.

 The front matter configuration varies slightly depending on whether you are creating a Learning Path/Challenge/Certification, Course, Module, or Page. The following examples for a Learning Path and a Course illustrate a typical setup.

 **Learning Path Frontmatter**

 ```yaml
 ---
 type: "learning-paths"
 title: "Cloud Fundamentals"
 description: "A learning path focused on providing the technical knowledge required for advanced topics."
 weight: 5
 banner: "kubernetes-icon.svg"
 id: "<your-learning-path-uuid>"
 tags: [kubernetes, infrastructure]
 categories: "cloud"
 level: "beginner"
 badge: 
    png: "https://images.credly.com/images/f28f1d88-428a-47f6-95b5-7da1dd6c1000/twitter_thumb_201604_KCNA_badge.png"
    svg: "https://images.credly.com/images/f28f1d88-428a-47f6-95b5-7da1dd6c1000/twitter_thumb_201604_KCNA_badge.png"
    title: "Layer5 Certified"
    description: "Earn the Certification badge to showcase your expertise in Layer5 cloud services."
 ---
 ```

 **Course Frontmatter**

 If each course has its own markdown page, you can use this frontmatter:

 ```yaml
 ---
 type: "course"
 title: "Intro Sustainability"
 description: "An introductory course exploring the core concepts of sustainability."
 weight: 2
 banner: "kubernetes-icon.svg"      
 tags: [network, infrastructure]
 level: "beginner"
 categories: "compliance"
 ---
 ```
 
 **Summary of Required Fields**

 > In this table, fields marked with ✅ are required, while those marked with – are optional.

 | Applicable To                 | Field         | Required | Notes                                                                                                         |
 | ----------------------------- | ------------- | :------: | ------------------------------------------------------------------------------------------------------------- |
 | All                           | `title`       |    ✅     | The main display title.                                                                                       |
 | All                           | `description` |    ✅     | A brief summary of the content.                                                                               |
 | All                           | `weight`      |    -    | Controls the display order (lower numbers appear first). Items are sorted alphabetically by title if not specified.|
 | All                           | `draft`       |    -    | If `true`, the page will not be published.                                                                    |
 | All                           | `type`        |    ✅     | Defines the content's role. Optional values: `challenge`, `learning-path`, `certification`, `course`, `module`, `page`, `test`, or `lab`. |
 | **Learning Path** | `id`          |    ✅     | **Crucial.** A stable UUID for tracking progress. **Do not change.**                                    |
 | **Learning Path** | `badge` | - | Defines the awarded digital badge. The png and svg fields accept either a full remote URL or a local file path for an image in the same folder (e.g., layer5-badge.svg).|
 | **Learning Path**, **Course** | `level`       |    -    | A string for the intended difficulty (`beginner`, `intermediate`, `advanced`). Default: `beginner`. |
 | **Learning Path**, **Course** | `banner`      |    -    | Path to a banner image located in the same folder (Page Bundle). |
 | **Learning Path**, **Course**, **module** | `tags`        |    -    | Keywords for content discovery. Multiple tags can be selected.                                                |
 | **Learning Path**, **Course**, **module** | `categories`  |    -    | The main categories for the content. Only one can be selected.                                                |


> For a complete list of all predefined variables and advanced usage, please refer to the official [Hugo Front Matter documentation](https://gohugo.io/content-management/front-matter/).

{{< alert type="info" title="Be Careful About Name Changes" >}}
Renaming a course or module after publication would break the learning path tracking for enrolled learners. It's like changing pages while someone is following the story. Consider updating the module’s description, adding an introductory note, or creating a versioned copy.
{{< /alert >}}

## 3. Add Assets and Interactive Content

Enhance your course with images and other visual aids. The recommended and standard method for adding images is Page Bundling. This approach involves placing your image files directly alongside the Markdown content they belong to, which is simpler and keeps content organized.

{{< alert type="success" title="Recommended Method: Page Bundling" >}}
For all assets, please use the Page Bundling method. It simplifies asset management by co-locating images with the Markdown files that use them.
{{< /alert >}}

### Size Limits for Embedded Media
While there's no hard-coded size limit, we enforce these practical constraints:
| Media Type | Recommended Max Size | Impact Beyond Limit          |
|------------|----------------------|------------------------------|
| Video      | 50 MB                | Slow builds, CI failures     |
| Image      | 5 MB                 | Hugo memory overflow         |
| PDF        | 20 MB                | Browser loading delays       |


### How to Add an Image

1.  Place your image file (e.g., `hugo-logo.png`) in the **same directory** as your Markdown file (e.g., `01-pods.md`). 

2.  In your `01-pods.md` file, embed the image using a **standard Markdown link**. The path should just be the filename.

    ```markdown
    ![The Hugo Logo](hugo-logo.png)
    ```

{{< alert type="warning" title="Legacy Method: Do Not Use" >}}
The `usestatic` shortcode is **deprecated** and should not be used!
{{< /alert >}}

### How to Add a Video

**Page Bundling (Recommended)**
```markdown
<video controls width="100%">
  <source src="video-demo.mp4" type="video/mp4">
</video>
```

**External Hosting (Large Files)**
```markdown
{{</* card title="Video Tutorial" */>}}
<video controls preload="metadata">
  <source src="https://cdn.yourcompany.com/video.mp4" type="video/mp4">
  Your browser doesn't support HTML5 video.
</video>
{{</* /card */>}}
```

#### External Hosting Recommendations
For optimal performance, we recommend hosting large videos on dedicated platforms:
- **YouTube** (Free, public/private options)
- **AWS S3** (Requires bucket & CORS configuration)
- **Cloudflare Stream** (Paid, enterprise-grade)
- **Vimeo** (Paid, professional features)


#### Critical Considerations
- Best practice: Page Bundling

- Accessibility: Always include subtitle tracks (VTT format)

- Thumbnails: Set custom posters with ```poster="image.jpg"```

- Bandwidth: Self-hosted videos may incur significant costs

- Authentication: For private videos, use signed URLs (S3) or unlisted (YouTube)

## 4. Build and Preview Locally

Before publishing, it is crucial to preview your content locally to check for formatting errors, broken links, and overall structure.

```bash
# Set Up the Environment (One-time Task)
make setup
# Run the Local Preview Server
make site
```

This will start a local development server, where you can view your learning path as you build it.
![Preview site](./images/preview-site.png)

{{< alert type="info" title="Local Previews" >}}
The local preview uses a generic theme to show the structure and content of your learning path. It **will not** display your organization's specific branding, such as custom logos or color schemes.

You can configure your organization's branding in the [Layer5 Cloud Organization Settings](https://cloud.layer5.io/identity/organizations).
{{< /alert >}}

## 5. Publishing Your Learning Path

Once you have tested your content locally, you can publish it to the [Layer5 Academy](https://cloud.layer5.io/academy) through our automated workflow. 

To help you visualize how your content goes from a local file to a live learning path, the diagram below illustrates the entire end-to-end publishing workflow. It shows which components you will interact with directly and how the CI/CD pipeline handles the rest automatically.

{{< meshery-design-embed src="..//creating-your-learning-path/images/embedded-design-academy-content-publishing-workflow.js" id="embedded-design-37c37d14-be76-487a-90aa-5ada0c1c115f" size="full" >}}

The process involves a one-time setup of secrets in your repository, followed by creating a GitHub Release to publish each new version of your content.

### Stage 1: Configure the Publishing Workflow (One-Time Setup)

To allow your repository to securely communicate with the Academy's build system, you must configure GitHub Secrets. This one-time setup ensures your publishing workflow can authenticate automatically.

#### 1. Verify Required Secret Names

First, confirm the **exact secret names** required by the workflow.

In your repository, open the workflow file at `.github/workflows/build-and-release.yml`. This confirms the workflow expects secrets named exactly `ACADEMY_ORG_ID` and `ACADEMY_TOKEN`.
  ```yaml
  with:
    orgId: ${{ secrets.ACADEMY_ORG_ID }}
    token: ${{ secrets.ACADEMY_TOKEN }}
    # ... and other parameters
  ```

#### 2. Set Up Repository Secrets

Now, create the two required secrets in your repository.

1.  Navigate to your GitHub repository and go to `Settings` > `Secrets and variables` > `Actions`.
2.  Ensure you are on the **Secrets** tab.
3.  Click `New repository secret` to add the following two secrets:
    1. **Name:** `ACADEMY_ORG_ID` 

       **Value:** Paste your unique Organization ID string.

    2. **Name:** `ACADEMY_TOKEN` 

       **Value:** Paste the personal access token generated from Layer5 Cloud by following the instructions below.

{{< alert type="info" title="How to Correctly Copy Your Token" >}}
When you generate a token from the [Layer5 Cloud Tokens page](https://cloud.layer5.io/security/tokens), you will get a JSON object like this:
`{"meshery-provider":"Meshery","token":"eyj...your-long-token-string..."}` You must copy only the token string itself—the value inside the quotes for the `"token"` key. 

Do NOT include the curly braces `{}`, the `"token":` key, or the surrounding quotes. The value you paste into the secret should begin with `eyj...`.
{{< /alert >}}

Once configured correctly, your secrets page should look like this:
![Secrets page showing correct configuration](./images/setting.png)

{{< alert type="info" title="Alternative Method (Not Recommended)" >}}
While you can hardcode your `ACADEMY_ORG_ID` directly in the workflow file, we strongly recommend using secrets for better security and flexibility.
{{< /alert >}}

### Stage 2: Publish by Creating a GitHub Release

With the setup complete, you can publish your content anytime by creating a new release.

1.  Ensure all your latest changes are committed and pushed to your repository's `master` branch.
2.  On your GitHub repository page, navigate to the **"Releases"** section.
3.  Click **"Draft a new release"**.
4.  Create a new version tag for your release (e.g., `v1.0.1`).
5.  Provide a title and description for your release.
6.  Click **"Publish release"**.

This action will automatically trigger the workflow, and your content will be deployed to the [Layer5 Academy](https://cloud.layer5.io/academy).

- Your content will be available in the [staging environment](https://staging-cloud.layer5.io/) within approximately 10 minutes.
- Your content will go fully live to the production Academy platform during the next scheduled cloud release.

> **For Urgent Updates:** If you have a time-sensitive publishing request or encounter any issues with the automated process, please [contact the Layer5 team](https://layer5.io/company/contact) for expedited assistance.

![Release Example](./images/release-publish.gif)

## 6. Ongoing Maintenance and Updates

Once your learning path is live, you may need to perform routine tasks to keep your local environment and dependencies up-to-date.

### Updating the Academy Theme
The  [`academy-theme`](https://github.com/layer5io/academy-theme) provides the core layout, style, and features for your learning path. Regularly updating it ensures you benefit from the latest improvements and bug fixes.

To upgrade to the latest theme version, run: 
```bash
make theme-update
```

You will see output similar to this as Hugo fetches the new modules:
```bash 
hugo mod get -u
hugo: collected modules in 1707 ms
go: downloading github.com/layer5io/academy-theme v0.1.6
go: upgraded github.com/layer5io/academy-theme v0.1.5 => v0.1.6
go: upgraded github.com/twbs/bootstrap v5.3.6+incompatible => v5.3.7+incompatible
```

{{< alert type="info" title="When to Update?" >}}
It's a good practice to update the theme before creating a new release or when you notice that your local preview is missing recent design changes.
{{< /alert >}}

### Clearing the Local Cache for Troubleshooting

If you encounter unexpected formatting issues or your content doesn't update correctly during local development, your build cache might be stale. Use the `make clean` command to resolve this.
This command first deletes the local build cache (`public` directory) and then restarts the development server, ensuring you are previewing a fresh build of your content.
```bash
make clean
```

## Frequently Asked Questions

<details>
  <summary>1. Why is my workflow failing with a <code>401 Unauthorized</code> or <code>User must be logged in</code> error?</summary>
  
This error indicates an issue with your <code>ACADEMY_TOKEN</code>. Please ensure you have correctly copied only the token string and not the entire JSON object from the downloaded file.
</details>

<details>
  <summary>2. Why is my workflow failing with a URL containing a double slash </code>( // )</code>?</summary>
  
A double slash in the URL (e.g., <code>.../api/academy//update/...</code>) means your <strong>ACADEMY_ORG_ID</strong> was not found. This typically happens when the secret name in your repository does not <strong>exactly match</strong> the name expected by the workflow file (e.g., <code>ORG_ID</code>).
</details>

<details>
  <summary>3. How do I handle updates or corrections after my content is live?</summary>
  
All content updates are managed through your Git repository. Simply commit and push your changes, then <strong>create a new GitHub Release</strong> with a new version number (e.g., <code>v1.0.2</code>). This automatically triggers the publishing workflow and updates your content on the Academy platform.
</details>

<details>
  <summary>4. What happens if my new content has an error?</summary>
  
The publishing process is designed to be safe. If your new content causes a build error, the workflow will fail, and the previously working version of the Academy will remain unchanged. Your broken update will not be published.
</details>

<details>
  <summary>5. How do I structure multiple courses under one learning path?</summary>
  
The structure is defined by your folder hierarchy. A learning path is a directory, and each course is a sub-directory within that path. This folder structure in your <code>content</code> directory directly maps to the learning path structure presented to users.
</details>

<details>
  <summary>6. Why does my local build fail when adding large videos?</summary>
  
The ideal size should be less than 10MB for our service performance and sustainability, and server resource management. If your asset size is larger than 10MB, we recommend using external hosting as listed.
</details>
 
<details>
  <summary>7. How to securely host private training videos?</summary>
  
Use AWS S3 with signed URLs:
```html
<video src="{{</* s3_signed_url path="training/private.mp4" */>}}">
```
</details>

<details>
  <summary>8. How do I debug using Layer5 Cloud Events?</summary>

If your content is not appearing in the Academy after a GitHub release, it may have failed to publish. You can troubleshoot these issues using the **Events** section in [Layer5 Cloud](https://cloud.layer5.io).
 
To view publishing logs:
1. Navigate to **Settings > Events**
2. Switch to the **Audit** tab
3. Apply a filter using the action type:
 `AcademyUpserted`
This will show all attempts to upload content, including which ones failed and why.

**Common Errors You Might See**
- **Duplicate IDs**  
  Two lessons or paths using the same identifier. You can fix this by renaming or regenerating unique IDs.

- **Invalid Content Type**  
  For example,
  Instead of
 ```yaml
  type: "learning-paths"  
  ``` 
 it should be:
 ```yaml
 type: "learning-path"   
 ```
- **Missing Required Fields**
 Ensure that title, description, and type are included in the content’s frontmatter.

 {{< alert type="info" title="Tip" >}}
 Use the event filter `AcademyRegisteredToContent` to track user activity, like who enrolled in which learning path.
 {{< /alert >}}
</details>