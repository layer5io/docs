---
title: Template # the category text on /videos category tab
description: >
  Template Videos for contributing videos docs
weight: 1
icon: bi-rocket-takeoff-fill # can use any bootstrap icon or a custom icon
# videoGrid: true # show all child / nested videos as grid of cards on the section's index page. for example here the videoGrid: true will show all videos inside getting-started/** as grid of video cards, ommiting of or setting it to false, presents a hyperlinked list of videos / sub-sections 

---


- A section is a directory having `_index.md` in Hugo.
- contributing vidoe involves, creating a category -> subcategory -> video markdown files, or adding a video markdown file directly under a subcategory.

Category: 
Create a direcoty under `content/en/videos` like `getting-started` and add `_index.md` inside it, this constitues a top-level category and a section.
inside `_index.md`, include following frontmatter: 

```yaml
title: Getting Started # the category text on /videos category tab and docs view in left sidebar
description: >
  Getting started videos on Cloud and Kanvas
weight: 2 # the order in which this category should appear in /videos page category tab and and docs view in left sidebar
icon: bi-rocket-takeoff-fill # icon for the category, suppots bootstrap icons, as well as local or remote assets
videoGrid: true # show all child / nested videos as grid of cards on this section's index page. for example here the videoGrid: true will show all videos inside getting-started/** as grid of video cards, ommiting of or setting it to false, presents a hyperlinked list of videos / sub-sections instead.
```

There are two ways to add videos to a category:

### Creating a subcategory and adding videos to it

create a subcategory under `getting-started` like `onboarding` and add `_index.md` inside it, this constitues a subcategory and a section.


1. Create a subcategory section
Create a subdirectory under `getting-started` like `onboarding` and add `_index.md` inside it.

```yaml
title: Onboarding # the sub-category text on /videos subccategory tab and docs view in left sidebar
videoGrid: true # same as above
weight: 2 # the order in which this sub-category should appear in /videos page subcategory tab and and docs view in left sidebar
```

now this subcategory is ready to a hve videos added to it. 

2. Create video markdown files here e.g. `video1.md`, `video2.md` etc. with the following frontmatter:

```yaml
---
title: "Design Reviews: Adding Comments 1" # required, title of the video card / list
description: > #required, description of the video card
   Add comments to your designs in Kanvas's Designer Mode to enhance collaboration and streamline design reviews. 
video_id: "bb6J--aApk8" # required, youtube video ID
videoType: youtube  # required, we also support "local" for local videos, but it's currenlty disabled.

# categories and tags are used to match videos with documentation pages, by scoring the relevance of the video to the documentation page.
categories: [Designer] 
tags: [review, collaboration, comments] # also available as hyperlinked tags in the video card as well as on individual video page
duration: 2:30 # optional, duration of the video in minutes:seconds format, "min" is automatically added to the end of the duration
---

{{< youtube video_id >}} # example:  {{< youtube bb6J--aApk8 >}}

```

this video will now appear under Getting Started category in Onboarding subcategory in /videos gallary and on docs/getting-started index page as well.

#### Adding a video directly under a category

- follow the 2nd step from above

These vidoes will automatically be assigned a category of "All" inside the category tab and will be visible in the /videos gallary as well as on docs/getting-started index page.


see the template category folder inside content/en/videos for a working example.