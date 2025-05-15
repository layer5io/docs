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

## Forcing Full Render Mode

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
This is an advanced feature primarily intended for power users, debugging scenarios, or system-level integrations. Most users will not need to manually adjust this parameter for everyday design work.
{{< /alert >}}

## Why Use Full Render Mode?

The full render mode in Kanvas, activated by a specific URL query parameter, is designed for situations where a complete and detailed view of your design is paramount. While default rendering optimizes for performance by selectively displaying elements, the full render mode ensures every visual component and relationship, including those normally hidden, is visible.

This capability is particularly valuable for:

* **Detailed Inspection & Debugging:** When you need to meticulously review, debug, or verify all components, relationships, and intricate details within a design.
* **Comprehensive Documentation:** For creating thorough screenshots or technical documentation that requires all visual elements to be accurately represented.
* **System & Integration Testing:** During testing phases to ensure all parts of a design are processed and displayed by the rendering engine exactly as expected.

## Key Considerations for Full Render Mode

When using the `render=full` parameter to activate full render mode in Kanvas, it's important to be aware of the following key aspects:

### 1. Performance Impact
Activating full render mode can noticeably decrease rendering performance, especially with large or complex designs. This is because the system will be processing and displaying more information than in its default, optimized state.

### 2. How the 'Layers' Panel Affects Your View (Precedence)
A crucial aspect of using the `render=full` parameter is its interaction with your personal visibility settings in the **'Layers' panel**.

Essentially, **your 'Layers' panel settings take precedence over the `render=full` parameter.**

* **Hidden Elements Remain Hidden:** If you have explicitly hidden certain element types (e.g., namespaces, deployments, or even **TagSets**) in your 'Layers' panel, these elements will **remain hidden** even when `render=full` is active in the URL.
* **Conditions for Visibility:** For an element to be visible when `render=full` is used, two conditions must generally be met:
    1.  The `render=full` parameter must be present in the URL.
    2.  The corresponding element type must *also* be enabled for visibility in your 'Layers' panel settings.

### 3. Implications for Sharing Designs
The precedence of the 'Layers' panel, as explained above, also has important implications when you share Kanvas designs that utilize the `render=full` parameter:

* **Recipient's View is Personalized:** When you share a design link that includes `render=full`, be aware that the recipient's view will still be governed by *their own* 'Layers' panel settings.
* **Potential for Visual Discrepancies:** If the recipient's 'Layers' settings hide certain elements, they might not see the exact same fully rendered design that you do, even though they are using the same `render=full` link.
* **Ensuring Consistent Collaboration:** For collaborative scenarios where viewing all details consistently is crucial, advise all participants to ensure the relevant toggles in their 'Layers' panel are enabled. This, in addition to using the `render=full` parameter, will help achieve a shared understanding of the design's complete state.