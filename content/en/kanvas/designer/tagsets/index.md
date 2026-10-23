---
title: Working with Tags
description: >
  Share design with other users and use control access to manage design access permissions and visibility.
weight: 6
categories: [designer]
tags: [designs, collaboration, review] 
aliases:
  - /meshmap/designer/tagsets
  - /kanvas/guides/designing/tagsets/
---

You can group components using tags. Tags are key-value pairs that help you organize and categorize components within your design. Tags can be used to visually group components. Designer has no filter that shows only components with a given tag. Operator mode filters live resources by namespace, kind, model, label, and free-text search. Palette search matches model and component names, not labels.

{{< alert title="Related Concept">}}
Kubernetes resources are capable of being assigned Label and Annotation key/value pairs. When pairs of Labels or Annotations match, a relationship is formed and visualized as shown below.
{{< /alert >}}

## Grouping Components with Tags

To group components using tags, follow these steps.

![Tags](images/tagsets.gif)

## Labels and Annotations

Designs support two different types of tags: Labels and Annotations. Labels are often used to identify components and are visible on the design canvas. Annotations are often used to provide additional information about components.

<img alt="Labels and Annotations" src="../../images/group-components.png" width="50%" />

{{< alert title="Performance Consideration" type="warning">}}
Tags are indexed and searchable. However, the performance of design operations may degrade as the number of tags increases. To ensure an optimal user experience, we recommend using tags judiciously and limiting the number of tags used in a design.

TagSets draw only in Full render mode, and only while at most 30 are drawn. Past 30, Kanvas skips the rest and shows "Skipped rendering of N matchlabels relationships due to limit of 30". Grouping does not turn itself off at 10 tags, and there is no Group Components control that re-enables it after that limit. The TagSets layer must also be visible.
{{< /alert >}}

{{< alert title="Related Concept">}}
{{< /alert >}}