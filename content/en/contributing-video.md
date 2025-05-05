---
title: Video page creation guide
---
- a section is a directory having `_index.md` and that `_index.md` at least having

```
---
---
```

Category: 
Create a direcoty under `content/en/videos` like `getting-started` and add `_index.md` inside it, this constitues a top-level category and a section.
inside `_indexm.md`, include following frontmatter: 

```yaml
title: Getting Started # the category text on /videos category tab
description: >
  Getting started videos on Cloud and Kanvas
linkTitle: Getting Started
weight: 2 # the order in which it should appear in /videos landing page and docs view
icon: bi-rocket-takeoff-fill # icon for the category, suppots bootstrap icons, as well as local or remote assets
videoGrid: true # show all child / nested videos as grid of cards on the section's index page. for example here the videoGrid: true will show all videos inside getting-started/** as grid of video cards, ommiting of or setting it to false, presents a hyperlinked list of videos / sub-sections 
```

now we can either create a sub-section or just drop simple vidoes, 




