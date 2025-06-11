---
title: Understanding Edge Styles
description: >
  Learn how to interpret and customize the different types of edges in Kanvas to represent relationships between components in your infrastructure designs.
weight: 2
categories: [Designer]
tags: [designs]
---

When you connect components in [Kanvas](https://kanvas.new/), the line you draw is called an **edge**. Each edge visually represents a [relationship]({https://docs.meshery.io/concepts/logical/relationships) between your components. Understanding how to style these edges is key to creating clear and effective infrastructure diagrams.

## Semantic vs. Non-semantic Edges

Edges in Kanvas fall into two fundamental categories, distinguished by whether they have a built-in meaning that the system can act upon.

- **Semantic (Orchestratable) Edges**: These represent real infrastructure relationships that Kanvas understands, such as network links or volume mounts. Kanvas can use this information during deployment.

- **Non-semantic (Annotation-Only) Edges**: These are purely for your visual and organizational aid. They help you document designs and illustrate concepts but are ignored by Kanvas during deployment.

## System Default Styles: The Visual Language of Kanvas

To provide a consistent and recognizable visual language, Kanvas uses a specific, minimal set of styles for edges that are created by default. These styles give you immediate, at-a-glance information about an edge's nature.

| For this Relationship... | Kanvas Uses this Style... | Meaning |
| :--- | :--- | :--- |
| **Semantic Relationship**<br>(e.g., `Edge-Network`, `Edge-Mount`) | A **Dotted Line** with a standard **Arrowhead**. | This signifies a logical or dynamic connection that is managed by the system. The default color is typically blue or white. |
| **Non-semantic Annotation** | A **Solid Line** with a standard **Arrowhead**. | This signifies a direct visual note created by the user. The default color is a distinct **Green/Teal** to visually separate it from semantic edges. |

These defaults serve as a community convention, but as you'll see next, you have the power to change them.

## Customizing Your Edges: The Full Styling Toolkit

A key principle in Kanvas is flexibility. **All edges, whether semantic or non-semantic, support a rich set of visual customizations.** Simply select any edge on the canvas to reveal the floating styling toolbar.

From here, you can override the defaults and tailor the appearance of any edge to fit your needs.

### 1. Line Style

Controls the edge's shape and pattern.

- **Basic Styles**:（系统默认的样式通常是这两种）
  - `Solid Line` - **Recommended for**: Direct visual annotations (the default for annotations).
  - `Dotted Line` - **Recommended for**: Standard semantic relationships (the default for semantic edges).

我们还有
    - `Dashed Line` - **Recommended for**: Indicating a proposed or optional connection.

这些是系统中很少看到，但是提供你自定义的：
- **Advanced Shapes**:
  - `Zigzag Line` - **Recommended for**: Showing indirect paths that need to avoid other components.
  - `Wave Line` - **Recommended for**: Representing a flexible or non-critical connection.
  - `Bezier Curve` - **Recommended for**: Creating smooth, aesthetically pleasing layouts.
  - `Line with Circles` - **Recommended for**: Highlighting specific points or stages along a path.

### 2. Endpoint Style

While Kanvas defaults to a simple arrowhead, you can choose from a variety of endpoint styles for your custom diagrams.

| Style | Recommended Use Case |
| :--- | :--- |
| `Arrowhead` (Default) | Clearly shows the direction of flow or dependency. |

提供自定义的样式：
| `Filled Diamond` | Can represent decision points or conditional flows. |
| `Filled Square` | Useful for termination points or specific API interfaces. |
| `Filled Triangle` | A strong alternative for indicating direction. |

### 3. Color Coding

The color tool is perfect for creating your own visual language. Use it to categorize connections or draw attention to specific parts of your design.

**Suggested Color Palette**:
| Color | Suggested Meaning |
| :--- | :--- |
| **Green** | Approved, active, or successfully deployed paths. |
| **Blue/White** | Standard documentation or default state. |

| **Yellow** | Connections with warnings or those that require review. |
| **Red** | Requires attention, a known issue, or a breaking change. |

### 4. Labels and Annotations

The rename tool lets you add descriptive text directly on the edge, which is a powerful way to document your design.

**Examples**:
- Describe traffic flow: `"User Traffic → API Gateway"`
- Add process steps: `"Requires Manual Review"`
- Note important details: `"Backup Route (Low Priority)"`
- Specify protocols: `"gRPC / 50051"`

### 5. Visual Effects

The "Marching-ants" effect adds an animated stroke to your edge.

**Best For**:
- Drawing attention to a critical path during a presentation or demo.
- Highlighting the exact edge you are discussing in a team review.