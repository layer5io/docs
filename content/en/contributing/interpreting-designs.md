---
title: Interpreting Designs and Using Components
description: A guide for contributors to understand how to translate Layer5 designs into usable components.
layout: page
---

# Interpreting Designs and Using Components

This document helps new and existing contributors understand how to take visual designs—such as those provided in Figma—and convert them into functional components within the Layer5 documentation site.

## Understanding the Design Process

Layer5 maintains its website and documentation through an active design and development workflow. Designs are often shared via Figma and include full-page layouts, interactive elements, and reusable UI patterns.

Contributors are expected to be familiar with the following:

- Basic HTML, Markdown, and CSS
- The Hugo static site generator
- The directory and component structure of the `layer5io/docs` repository

To access design files, use the open invite link to the [Layer5 Figma Workspace](https://www.figma.com/@layer5). These designs reflect the visual expectations for the site, including spacing, colors, typography, and components.

## Mapping Designs to Components

Each design is typically composed of reusable blocks: cards, buttons, headers, icons, images, and layout sections.

To interpret and implement a design:

1. Open the Figma design and identify distinct components.
2. Check if those components already exist in the codebase. For example:
   - Global sections like headers and footers are under `layouts/partials/`
   - Documentation content is typically under `content/`
   - Reusable styles and classes are in `assets/`
3. If the component already exists, reuse it by referencing the same structure or shortcode.
4. If it does not exist, create it by:
   - Writing clean and minimal HTML/CSS
   - Following the style conventions defined in the codebase
   - Making sure your component is responsive

## Working with Markdown and Hugo Shortcodes

Many documentation pages are written in Markdown, extended by Hugo’s templating system. When implementing content based on designs:

- Use Markdown for static content.
- Use Hugo shortcodes (e.g., `{{< card >}}`) for reusable and styled components.
- For more complex layout needs, Hugo partials can be defined and reused.

Example:

```md
{{< card title="Getting Started" >}}
This section helps you begin contributing to the Layer5 community.
{{< /card >}}
```

## Component Location Reference

Here’s how components are generally organized:

- `content/`: Markdown files for documentation
- `layouts/`: Templates and partials for page rendering
- `assets/`: CSS, JavaScript, and image assets
- `data/`: External configuration (optional)
- `static/`: Files directly served (favicons, manifest, etc.)

## Design Implementation Tips

- Follow semantic HTML practices.
- Use consistent naming conventions.
- Refer to other similar components for structure and styling.
- Test the page in both light and dark modes if supported.
- Preview locally using `hugo server`.

## How to Contribute Design-Related Docs

If you’re creating or updating pages based on a design, please:

- Reference the design file or wireframe in the PR description.
- Describe which components you used or modified.
- Include screenshots or Netlify preview links when available.

## Need Help?

If you're unsure how to interpret a design or need clarification:

- Ask in the [Layer5 Slack workspace](https://slack.layer5.io)
- Or open a discussion in the GitHub [Discussion Forum](https://github.com/layer5io/layer5/discussions)
