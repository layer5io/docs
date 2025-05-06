---
title: Contributing Videos to Layer5 docs
weight: 1
description: A detailed contribution guide for adding videos to Layer5 Docs docs videos gallary
---

{{< alert title="Note" >}}In Hugo, a section is a directory containing an `_index.md` file.{{< /alert >}}

## Overview

Contributing videos involves either:
1. Creating a category → subcategory → adding video markdown files, or
2. Adding video markdown files directly under a category (these will automatically be assigned to an "ALL" subcategory)

## 1. Creating a Category

To create a top-level category:

1. Create a directory under `content/en/videos` (e.g., `getting-started`)
2. Add an `_index.md` file inside this directory with the following frontmatter:

```yaml
title: Getting Started # Category text appearing in the /videos category tab and left sidebar
description: >
  Getting started videos on Cloud and Kanvas
weight: 2 # Order in which this category appears in the /videos page and left sidebar
icon: bi-rocket-takeoff-fill # Icon for the category (supports Bootstrap icons and local/remote assets)
videoGrid: true # When true, shows all child  / nested videos as a grid of cards on this section's index page
                # When false, presents a hyperlinked list of videos/sub-sections instead

draft: true # When true, previews on local dev server but hides from left sidebar and /videos landing page on published site
```

## 2. Adding Videos to Your Category

There are two approaches for adding videos:

### Approach A: Create a Subcategory with Videos

1. Create a subdirectory under your category (e.g., `getting-started/onboarding`)
2. Add an `_index.md` file with the following frontmatter:

```yaml
title: Onboarding # Subcategory text in the /videos subcategory tab and left sidebar
videoGrid: true # Same functionality as in the category _index.md
weight: 2 # Order in which this subcategory appears
```

3. Create video markdown files (e.g., `video1.md`, `video2.md`) in this subdirectory with the following frontmatter:

```yaml
---
title: "Design Reviews: Adding Comments" # Required: title of the video card/list
description: > # Required: description of the video
   Add comments to your designs in Kanvas's Designer Mode to enhance collaboration and streamline design reviews. 
videoId: "" # Required: YouTube video ID, example: bb6J--aApk8
videoType: youtube # Required: currently supports "youtube" (support for "local" is present, though currently disabled)

# Categories and tags help match videos with documentation pages by scoring relevance, 
# see the guide at bottom to know how
categories: [Designer] 
tags: [review, collaboration, comments] # Available as hyperlinked tags in the video card and individual video page
duration: 2:30 # Optional: duration in minutes:seconds format ("min" is automatically added)
---

# the following youtube shortcode is used for individual video page
# Example: {{</* youtube id=bb6J--aApk8 class="yt-embed-container" */>}}
# we can control the styling of resulting iframe and wrapping div by modify style of .yt-embed-container in assets/scss/_videos_project.scss
{{</* youtube id="videoId" class="yt-embed-container" */>}}
```

### Approach B: Add Videos Directly Under a Category

Create video markdown files directly in the category directory with the same frontmatter format shown above. These videos will automatically be assigned to an "ALL" subcategory within the parent category.

## Video and Documentation Page Matching

To display `Related Videos` carousel on documentation pages section pages and individual pages, videos are matched with the docs pages based on shared tags and categories:

- Each matching tag contributes 1 point to the relevance score
- Each matching category contributes 2 points to the relevance score
- Videos with at least one matching tag or category appear in the "Related Videos" carousel
- Videos with higher scores appear first in the carousel

### Example

If a documentation page has:
```yaml
categories: [Designer]
tags: [catalog, publishing]
```

And there are two videos:

**Video A**:
```yaml
categories: [Designer]
tags: [catalog, review]
```

**Video B**:
```yaml
categories: [Designer]
tags: [designs]
```

- **Video A** scores: 2 (category match) + 1 (tag 'catalog') = 3
- **Video B** scores: 2 (category match) + 0 = 2

Video A will appear before Video B in the carousel on the documentation page.

## Example Directory Structure

```yaml
content/en/videos/
└── template-category/ # Top-level section (category)
    ├── _index.md # Defines the "Template Category" section
    └── sub-category/ # Sub-section inside the above category
        ├── _index.md # Defines the "Sub Category" sub-section
        └── video-1.md # file containing video specific data
```

See `content/en/videos/template-category/` for an example of a category with subcategories and videos. It is set to draft and is not published and is intended as a reference for adding videos.