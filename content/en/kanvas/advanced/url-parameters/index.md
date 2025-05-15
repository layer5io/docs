---
title: Design Render Quality
description: >
    Control the level of detail in Kanvas design rendering using advanced URL query parameters.
weight: 2
categories: [Designer, Operator]
tags: [performance]
---

By default, Kanvas optimizes the rendering of your designs to ensure good performance and responsiveness. This means that some computationally intensive visual elements, such as advanced relationships like **TagSets** (groups of components visually demarcated), might not be displayed initially to reduce system load.

> To learn more about defining relationships between components, including the detailed use and creation of **TagSets**, please see the [Creating Relationships | Layer5 Documentation](https://docs.layer5.io/cloud/designs/creating-relationships).

## Enable Full Render Mode

To activate this full render mode, you will need to add the `render=full` parameter to your Kanvas design URL. This mode ensures all elements, including **TagSets**, are displayed, which might otherwise be hidden for performance optimization.

The images below illustrate the difference this parameter makes:

<figure>
  <img src="/kanvas/advanced/url-parameters/no-tagsets.png" alt="Design rendering in Kanvas with default settings" />
  <figcaption>A design with default rendering; TagSets may not be visible</figcaption>
</figure>

<figure>
  <img src="/kanvas/advanced/url-parameters/with-tagsets.png" alt="The design in Kanvas showing full details" />
  <figcaption>The same design with `render=full` applied; TagSets and all other details are now visible</figcaption>
</figure>

For example, to apply this to a Kanvas design URL, you would modify it as follows: `https://kanvas.new/extension/meshmap?render=full&mode=design&design=xxxx`

{{< alert title="Advanced Usage Note" type="info">}}
This is an advanced feature primarily intended for power users, debugging scenarios, or system-level integrations. You will not need to manually adjust this parameter for everyday design work.
{{< /alert >}}

## Why Use Full Render Mode?

This capability is particularly valuable for:

* **Detailed Inspection & Debugging:** When you need to meticulously review, debug, or verify all components, relationships, and intricate details within a design.
* **Comprehensive Documentation:** For creating thorough screenshots or technical documentation that requires all visual elements to be accurately represented.
* **System & Integration Testing:** During testing phases to ensure all parts of a design are processed and displayed by the rendering engine exactly as expected.

## Best Practices

To use full render mode effectively:

1. **Use Selectively for Performance**  
   Activate `render=full` mainly when you need to inspect specific designs in detail. Since it can impact performance on large or complex designs, stick to the default optimized mode for general browsing to maintain responsiveness.

2. **Promote Consistent Shared Views**  
   When sharing a design link with `render=full` for review, advise collaborators to also enable the relevant toggles in their **Layers panel**. This helps prevent discrepancies caused by individual layer settings, ensuring everyone sees the same details.

3. **Check the Layers Panel if Details Are Missing**  
   If `render=full` is active in your URL but expected elements (like **TagSets**) are not visible, verify that their visibility is enabled in your **Layers panel**. Your Layers settings can hide elements even when full render is requested.