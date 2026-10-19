# Create a Learning Path


> Set up your Academy content repository, structure and describe a learning path, preview it, and publish it. The repository, front matter, and publishing steps also apply to challenges and certifications.



A learning path teaches a subject through courses and modules, with assessments that gate progress. You write it as Markdown in your organization's Academy content repository, then publish a version. This page covers the repository, layout, front matter, assets, preview, and publishing that every Academy content type shares. For the credential and assessment differences, see [Build a Challenge](/pr-preview/pr-1344/cloud/academy/creating-content/building-challenges/) and [Build a Certification](/pr-preview/pr-1344/cloud/academy/creating-content/building-certifications/).

## Prerequisites

- Git, a GitHub account, and Markdown. The Academy is built with the Hugo static site generator.
- Content registered in the [Instructor Console](/pr-preview/pr-1344/cloud/academy/creating-content/), which gives you the content `id` and the front matter to start from.
- Your organization's ID and a personal access token from Layer5 Cloud, used when you publish. Create tokens as described in [Tokens](/pr-preview/pr-1344/cloud/guides/security/api-tokens/).

## Set up the content repository

Start from the `academy-example` template repository published by Layer5: [github.com/layer5io/academy-example](https://github.com/layer5io/academy-example). Fork it, clone your fork, and work on a branch.

The template's Go module path must match your fork. Change the `module` line in its module file from the template's path to `github.com/<your-username>/<your-repo-name>`, then commit and push. The publish build fails while the path still names the template.

## Directory layout

Each organization's content lives in its own directory, which is how the Academy keeps one organization's content apart from another's. Replace `<your-organization-uuid>` with your organization's ID.

| Directory | Holds |
| --- | --- |
| `content/<content-type>/<your-organization-uuid>/` | Everything you write. `<content-type>` is `learning-paths`, `challenges`, or `certifications`. The folder hierarchy defines the navigation. |
| `layouts/shortcodes/<your-organization-uuid>/` | Optional custom Hugo shortcodes for reusable components. |

### Learning path structure

A learning path contains courses. A course contains modules and can end with a test that serves as the course exam. A module contains pages and labs.

```text
learning-paths/<your-organization-uuid>
└── {learning-path-name}/
    ├── _index.md
    ├── course-1/
    │   └── _index.md
    └── course-2/
        ├── _index.md
        ├── course-exam.md
        └── module-1/
            ├── _index.md
            ├── page-1/
            │   └── _index.md
            └── test.md
```

The `_index.md` in each folder defines that level's `title`, `description`, and `type`. The remaining `.md` files are the individual activities. [Challenges](/pr-preview/pr-1344/cloud/academy/creating-content/building-challenges/#1-set-up-the-directory-structure) and [certifications](/pr-preview/pr-1344/cloud/academy/creating-content/building-certifications/#1-set-up-the-directory-structure) use a flatter layout.

## Front matter

Every `_index.md` uses the same front matter. Only `type` changes with the level.

```yaml
---
type: "learning-path"  # or "certification", "challenge", "course"
title: "Cloud Fundamentals"
description: "A learning path focused on providing the technical knowledge required for advanced topics."
weight: 5
banner: "kubernetes-icon.svg"
id: "<your-content-uuid>"
tags: [kubernetes, infrastructure]
categories: [cloud]
level: "beginner"

# Table of content covered in the test
# Each domain can have a weightage (percentage) and subdomains (items)
# Weightage should sum up to 100 across all domains ( not strictly enforced, but recommended )
competencies:
  - title: "Domain 1"
    percentage: 10 # Weightage of this domain in the test
    items: 
       -  "Subdomain 1"
       -  "Subdomain 2"

  - title: "Domain 2"
    percentage: 30
    items:
      - "Subdomain 1"
      - "Subdomain 2"

  - title: "Domain 3"
    percentage: 60
    items:
      - "Subdomain 1"
      - "Subdomain 2"



# List of resource that are recommended to complete before taking the test
# Not strictly enforced, but recommended
prerequisiteKnowledge:
  - title: "Learning Path: Cloud Computing Basics"
    link: "https://academy-domain.com/learning-paths/cloud-computing-basics"
  - title: "Basic Certification: Networking Basics"
    link: "https://academy-domain.com/certifications/networking-basics"
  - title: "Basic knowledge of Linux command line"
    link: "https://linuxcommand.org/"

# List of additional resources for further reading 
relatedResources:
  - title: "Documentation"
    link: "https://docs.example.com/"
  - title: "Instructions"
    link: "https://instructions.example.com/"
  - title: "YouTube Channel"
    link: "https://www.youtube.com/c/example" 

# Additional attributes about the test
additionalAttributes: 
  - title: "Retake Policy"
    description: "One Retake allowed after 30 days"
  - title: "Labs"
    description: "Hands-on labs included"

---
```

| Field | Applies to | Required | Behavior |
| --- | --- | :---: | --- |
| `title` | All | Yes | Display title. |
| `description` | All | Yes | Summary shown on the catalog card. |
| `type` | Path, certification, challenge | Yes | `learning-path`, `certification`, `challenge`, or `course` (singular). Plural values are rejected. |
| `id` | Path, certification, challenge | Yes | Stable UUID that learner progress is recorded against. Never change it after learners register. Two items sharing an `id` are rejected. |
| `weight` | All | No | Display order, lowest first. Without it, items sort alphabetically by title. |
| `draft` | All | No | When `true`, the page is not published. |
| `level` | Path, certification, challenge | No | `beginner`, `intermediate`, or `advanced`. Default `beginner`. |
| `banner` | Path, certification, challenge | No | Path to an image in the same folder. |
| `badge` | Path, certification, challenge | No | The awarded badge. Its `png` and `svg` fields accept a full URL or a file in the same folder. |
| `tags` | All | No | Keywords for discovery. Several allowed. |
| `categories` | All | No | The main category. Only one. |

Renaming content after publication breaks nothing as long as the `id` is unchanged. Changing the `id` orphans every existing registration.

## Assets

Place images and other files in the same folder as the Markdown that uses them (a Hugo page bundle) and reference them by file name:

```markdown
![Pod lifecycle diagram showing Pending, Running, and Succeeded states](pod-lifecycle.png)
```

Every image needs descriptive alt text. The Academy does not enforce a size limit, but large assets slow builds and can make them fail. Host large videos on an external platform and embed them with a `<video>` element that points at the hosted file. Add subtitle tracks (VTT) and a poster image to embedded video. For private videos, use signed URLs or unlisted links. The `usestatic` shortcode is deprecated; do not use it.

## Preview locally

```bash
make setup   # one time
make site    # start the local preview server
```

The preview uses a generic theme, so it shows structure and content but not your organization's branding. Branding comes from your organization settings in Layer5 Cloud. If the preview shows stale content, run `make clean` to delete the build cache and restart. To pick up theme improvements before a release, run `make theme-update`.

## Publish

Publishing sends your organization's ID and a version to Layer5 Cloud, which builds your Academy at that version.
























<style>
.meshery-embed-container {
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 0rem auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.meshery-embed-container.full {
  width: 80%;
  height: 30rem;
}
.meshery-embed-container.half {
  width: 50%;
  height: 25rem;
}
.meshery-embed-container .cy-container {
  width: 100%;
  height: 100%;
}

</style>


<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
<div
    id="embedded-design-37c37d14-be76-487a-90aa-5ada0c1c115f"class="meshery-embed-container full"></div>

<a href="https://cloud.layer5.io/catalog/content/design/37c37d14-be76-487a-90aa-5ada0c1c115f" target="_blank" rel="noopener noreferrer">
  Open Design
</a>

</div>


<script src="..//creating-your-learning-path/images/embedded-design-academy-content-publishing-workflow.js" type="module"></script>


### One-time setup

Store two repository secrets that the template's publish workflow reads. The names must match exactly.

| Secret | Value |
| --- | --- |
| `ACADEMY_ORG_ID` | Your organization's ID. |
| `ACADEMY_TOKEN` | Only the token string from the token JSON, beginning `eyj`. Omit the braces, the `"token":` key, and the quotes. |

### Release

Commit your changes to the default branch, then publish a GitHub release with a new version tag such as `v1.0.2`. The release starts the workflow.

- The publish request is accepted only from an organization admin or owner. The request calls Layer5 Cloud with your organization ID and the version.
- Content reaches the staging environment in about 10 minutes and production with the next Layer5 Cloud release.
- If the build fails, your previous version stays live.
- Corrections follow the same path: push, then release a new version.

### Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `401 Unauthorized` or "User must be logged in" | `ACADEMY_TOKEN` contains the whole JSON object. | Store only the token string. |
| A URL containing `//`, such as `/api/academy//update/`, | The organization ID secret is missing or misnamed. | Name the secret `ACADEMY_ORG_ID`. |
| Content missing after a release | The publish failed. | Open the audit events for your organization and filter by the Academy upsert action to see each attempt and its error. |
| Duplicate ID, invalid content type, or missing required field | Two items share an `id`, `type` is plural, or `title`, `description`, `type`, or `id` is absent. | Make IDs unique, use the singular type, and add the field. |

To see who registered for what, filter the audit events by the Academy registration action.

