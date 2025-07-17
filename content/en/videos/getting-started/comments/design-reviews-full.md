---
title: Layers Panel
description: Learn how to use the Layers Panel in MeshMap to manage and organize components in your design.
---

## Layers Panel

Use comments to offer feedback to team members, take detailed design notes, capture helpful tips for your team members, and include justification as to your infrastructure and application configuration decisions. Pay it forward to your future self by leaving historical record for reference later.

The Layers Panel helps you organize, manage, and interact with the components in your design canvas. It is especially useful when you're working with large, complex designs and want better control over visibility, naming, and relationships between components. This guide explains how to use the Layers Panel effectively as part of your design workflows.
### Renaming Components

When you're working with many components, it can be helpful to give them meaningful names to keep track of their roles. MeshMap allows you to rename any component directly from the Layers Panel.

To rename a component:
- Select the component either from the design canvas or the Layers Panel.
- In the Layers Panel, locate the name field associated with the selected component.
- Click on the name, enter the new value, and press `Enter` to save the change.

Renaming doesn’t affect the functionality of the component—it’s mainly for clarity and organization within your workspace.

### Disabling Relationship Evaluations

By default, MeshMap visually displays relationships between components (like connections and dependencies). However, in some cases, especially during early-stage design or review, you may want to disable this feature to reduce visual clutter.

To disable relationship evaluations:
- Click on the settings (three-dot) menu available in the top-right corner of the Layers Panel or canvas toolbar.
- Toggle off the “Relationship Evaluation” option.

This will hide the relationship lines, giving you a cleaner view of the components without removing any actual links between them.

### Showing or Hiding Components by Type

The Layers Panel groups components by type—such as services, workloads, gateways, etc. You can quickly hide or show all components of a certain type to focus on what’s important.

To do this:
- Open the Layers Panel from the side menu.
- Locate the component type you want to toggle (for example, `workloads`).
- Use the eye icon beside the type label to show or hide all components of that type.

This is useful during visual audits or design reviews where specific types of components need attention or temporary removal from view.

### Showing or Hiding Individual Components

Sometimes, you might want to hide only one specific component without affecting others of the same type.

To hide or show an individual component:
- Expand the component type in the Layers Panel to view its instances.
- Use the eye icon next to the individual component’s name to toggle its visibility.

This can help reduce noise in the canvas when focusing on specific sections of the design.

### Related Documentation

To explore more about how to structure and review designs in MeshMap, you can check the following resources:

- [Design Reviews](/memberships/meshmap/design-reviews) – Learn how to review and refine designs collaboratively.
- [Service Mesh Patterns](/learn/service-mesh-patterns) – Understand reusable design structures and how to apply them.

### Note for Readers Coming from Design Reviews Page

If you landed here from the [Design Reviews](/memberships/meshmap/design-reviews) page, this section covers the previously missing details about how to use the Layers Panel while reviewing designs. All the steps above will help you manage what is visible, rename components for clarity, and reduce distractions during reviews.
