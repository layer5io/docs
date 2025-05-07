---
title: Performance Limits and Tuning
description: >
    Learn about the performance limits of Kanvas and how to tune your environment for optimal performance.
weight: 1
categories: [Designer, Operator]
tags: [performance]
---

Kanvas is designed to handle a wide range of infrastructure and application configurations. However, there are some performance limits that you should be aware of when working with Kanvas. This guide will help you understand these limits and provide tips for tuning your environment for optimal performance.

## Performance Limits

### Maximum Number of Components

Kanvas has a maximum limit of 1,000 components per design. If you exceed this limit, you may experience performance issues such as slow loading times and laggy interactions. To avoid hitting this limit, consider breaking your design into smaller, more manageable designs.

<!--
#### Maximum Number of Components per Layer
  Needs a follow up -->

<!--
#### Maximum Number of Relationship
  Needs a follow up -->

#### Maximum Number of Annotation-only Components (non-semantically meaningful components)

{{< alert type="note" title="What is a Non-Semantic Component?" >}}
A non-semantic component is a component that does not represent a meaningful entity in your design. For example, a textbox, a shape, a line, or a comment are all examples of non-semantic components. These components are used for annotation purposes only and do not have a direct relationship to the underlying infrastructure or application that you are modeling.
{{< /alert >}}

Kanvas allows up to 1,000 non-sematically meaningfull components per design. Some designs have a large number of comments. While comments are a valuable collaboration tool, excessive comments can impact the performance of your design. Consider archiving or deleting old comments to keep your design running smoothly.

#### Maxiumum Number of Orchestrated Components (semantically meaningful components)

{{< alert type="note" title="What is a Semantic Component?" >}}
A semantic component is a component that represents a meaningful entity in your design. For example, a server, a database, or a network switch are all examples of semantic components. These components have a direct relationship to the underlying infrastructure or application that you are modeling.
{{< /alert >}}

### Maximum Number of Relationships

Kanvas supports up to 1,000 relationships per design. Exceeding this limit can impact the performance of your design, especially when rendering complex designs. To optimize performance, try to minimize the number of relationships in your design.

#### Maximum Number of TagSet Relationships

![Labels and Annotations](../../designer/tagsets/group-components.png)

Tags are indexed and searchable. However, the performance of design operations may degrade as the number of tags increases. To ensure an optimal user experience, we recommend using tags judiciously and limiting the number of tags used in a design.

Upon loading a design exceeds that exceeds 20 tags within a single design, Kanvas will automatically disable grouping by tags. You can manually enable grouping by tags by clicking the "Group Components" button in the Designer dock. For more information, see [Working with Tags](/kanvas/designer/tagsets/).

<!--
#### Maximum Number of Relationships per Component
  Needs a follow up -->

### Maximum Number of Users

Under the Free [subscription plan](https://layer5.io/pricing), Kanvas supports at least 20 users per design. As resources allow, up to 34 users may simulatanously collaborate within a given design. If you have a large team collaborating on a design, be mindful of the number of users active at the same time. Too many users can strain the performance of your design, leading to slower response times and potential data loss. See [Layer5 Cloud Networking Services](/cloud/self-hosted/planning/peer-to-peer-communication) for more details.

### Impact of Images

Be aware that designs are self-contained documents and that all artifacts, like any images (e.g. SVG, PNG, GIF, WEBP, etc.) that are added to your design are embedded into your design document, adding to the overall size of your design file. The embedding of images into your design file ensures portability of your design. You can export your design with the assurity that your images will remain in your design upon (re-)import.

As the number and size of images contained in your design grows, images can significantly increase file size, potentially causing performance issues. With each change made to your design, the entire design file is uploaded to Layer5 Cloud. This same performance consideration applies during collaborative editing sessions with multiple users viewing/editing the same design. Each change to your design made by any user in the collaboration session will be propagated to every other currently collaborating user. If your design contains a large number of images, this can lead to slow performance and increased bandwidth usage.

Under the Free subscription plan, Kanvas support a single image size of up to 500KB of images per design with a total of 10MB per design. If you need to use more images, consider upgrading to a paid [subscription plan](https://layer5.io/pricing).

## Performance Tuning

### Optimize Your Design using the Layers Panel

To improve the performance of your design, consider optimizing by disabling one or more layers.

<figure>
  <img src="./layers-panel.png" alt="Layers panel in Kanvas Designer" />
  <figcaption>Control which layers of your design are visible using the Layers panel.</figcaption>
</figure>

Some layers specifically offer control of **visibility of components**, while other layers offer control over the **ongoing evaluation of relationships** between components. 

Depending on the type of layer disabled, either specific components or all components by type will display or not be displayed, allowing you to finely tune the performance of you design rendering experience by saving design resources and improving the performance of Kanvas as you adjust both the **number and type** of components in view. 

> Even though you might hide components, those components are not deleted or removed from your design. These components are simply hidden from current view.

In the same way, as you toggle the evaluation of different types of relationships, understand that this releationships between your components still exist. Those relationsihps are simply **temporarily hidding** from view and the overhead of their evaluation eliminated while the respective type of relationship is disabled.

Using the Layers panel you control the level of sophistication or simplicity of the rendering of components and relationships in your designs. You can both simplify your design layout by removing unnecessary elements and improve performance simultaneously. Alternatively, you can increase the level of detail in your design by enabling additional layers and relationships, while controlling the balance between detail and performance.

{{< alert type="info" title="Keep It Lightweight" >}}
Hide layers you don't need at the moment to keep your workspace lightweight and responsive.
{{< /alert >}}

### Optimize use of Images in your Design

To optimize performance, consider the following:

1. Use vector images (SVG) instead of raster images (PNG, JPG, etc.) as they are typically smaller in size and scale without pixelation.
2. Prioritize using smaller file sizes whenever possible. Use the `webp` image format over `png`, `jpg`, or `gif` as it generally provides significantly better compression, resulting in faster design save times without sacrificing much image quality.
3. Remove any unnecessary images from your design.
4. Use image compression tools to reduce the size of your images before adding them to your design.
