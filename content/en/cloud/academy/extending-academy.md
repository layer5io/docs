---
title: Extending the Academy
weight: 2
description: >
   Learn how to create and publish custom cloud-native learning paths and challenges using the Layer5 Academy platform.
categories: [Academy]
tags: [Designer]
---

# Extending the Academy

The **Layer5 Cloud Academy** is a modular learning management system (LMS) designed for building **learning paths** (also referred to as **specializations**) and **interactive cloud-native challenges**. It is deeply integrated into the Layer5 cloud ecosystem and **Kanvas**—a visual designer and operator for cloud-native infrastructure. This integration enables embedding live visualizations, interactive designs, and contextual experiences directly within courses.

---

## Who Can Extend the Academy?

Organizations subscribed to the **Enterprise Plan** have the capability to:

* Create and manage their own academy content
* Publish courses to the Layer5 Cloud Platform
* Enjoy full **multi-tenancy**, **white-labeling**, and **customization** support

---

## How to Extend the Academy

The Cloud Academy is designed to **avoid vendor lock-in**. Enterprise users manage their academy content in their **own Git repositories**—you own your content and data.

Content is sourced using the **[Hugo](https://gohugo.io/)** static site engine. To get started, use the [Academy Starter Template](https://github.com/layer5io/academy-example). This provides a working scaffold based on the Hugo directory structure, pre-configured with the custom `layer5-academy` theme.

> ✅ No need to write HTML, manage layouts, or build custom shortcodes.
> Everything is abstracted behind a simple markdown-based authoring experience.

---

## Directory Overview

When you clone the template, you’ll see a familiar Hugo structure:

```
academy-example/
├── content/
│   └── learning-paths/
│       └── org-name/              # Replace with your actual org name
├── static/
│   └── org-name/                  # Static assets (images, custom CSS)
├── layouts/
│   └── shortcodes/
│       └── org-name/              # Custom shortcodes (optional)
```

### ⚠️ Organizational Scoping

To ensure **isolation** between different organizations:

* All your content must reside under your scoped folder:
  `content/learning-paths/<your-org-name>/`

* Only content within your organization folder will be published.

* Use the **same org-name** consistently across `content/`, `static/`, and `layouts/shortcodes/`.

* Content outside of your scoped folders will **not be picked up in production**.

---

## Adding Content and Assets

You can begin by adding your learning material under:

```
content/learning-paths/<your-org-name>/
```

This folder acts as the **root scope** for all your learning paths. Supporting assets can be placed as follows:

* `static/<your-org-name>/` – images, stylesheets, other static files
* `layouts/shortcodes/<your-org-name>/` – optional Hugo shortcodes for custom widgets

> 🔒 This organizational scoping ensures that customizations made by one organization do not affect others.

---

## Learning Path Structure

Each learning path can include multiple courses, chapters, and lessons, organized in a clear hierarchy.

```
learning-paths/
└── <your-org-name>/
    └── <learning-path-name>/
        ├── _index.md             # Metadata for the learning path
        └── <course-name>/
            ├── _index.md         # Metadata for the course
            └── chapter-1/
                ├── _index.md     # Metadata (requirements, summary, etc.)
                └── content/
                    ├── lesson-1.md
                    └── lesson-2.md
```

Each `_index.md` file contains frontmatter and overview content for that level (path, course, chapter).

---

## Summary

With the Layer5 Cloud Academy, enterprise users can:

* Author powerful cloud-native learning content using markdown
* Integrate with Kanvas for live cloud-native visuals
* Maintain full control over content and branding
* Deliver isolated, scalable learning experiences for their teams or customers

> Get started today by [forking the template](https://github.com/layer5io/academy-example) and joining the growing ecosystem of cloud-native educators.

---

Would you like me to generate a sample `_index.md` or lesson markdown file for quick reference?
