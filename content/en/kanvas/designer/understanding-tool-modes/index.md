---
title: Understanding Tool Modes
description: >
  Kanvas Designer offers three modes: Default, Pencil, and Connector, which behave differently based on the context in which they are used. Learn how to interact with components and the canvas in each mode.
weight: 7
categories: [Designer]
tags: [designs]
aliases:
---

<link rel="stylesheet" href="https://unpkg.com/keyboard-css@1.2.4/dist/css/main.min.css" />

# Tool Modes

You can switch between mouse modes using hotkeys or tool selection. Here are hotkeys that control your mode:

| Hotkeys                                                          | Description                                                                 |
|------------------------------------------------------------------|-----------------------------------------------------------------------------|
| <button class="kbc-button kbc-button-xs">Spacebar</button>       | Temporarily enables the alternative mouse mode (default mode vs pan mode)   |
| <button class="kbc-button kbc-button-xs">H</button>              |  Switches to pan mode (hand icon)       |
| <button class="kbc-button kbc-button-xs">Escape / V</button>     | Switches to default mode irrespective of which mode you are currently using. |

---

## Interacting with Components

### 1. Default Mode (no tool selected)

| Action                         | Cursor Style        | Behavior                                                                     |                                        |
|--------------------------------|---------------------|------------------------------------------------------------------------------|------------------------------------------|
| **Hover**                      | `default (arrow)`   | Nothing                                                                      |                                          |
| **Click-and-drag**             | `move`              | Moves component in the direction of the mouse                                |                                          |
| **Click**                      | `default (arrow)`   | Displays component toolbar, resize box, and connection handles               | <img src="./click.png" style="width:1000px;" alt="Click" /> |
| **Double-click (component)**   | `pointer`           | Opens the component configurator                                             | <img src="./double_click.png" style="width:1000px;" alt="Double-click component" /> |
| **Double-click (textbox)**     | `text`              | Enables text editing inside the component                                    | <img src="./text-box-double-click.gif" style="width:1000px;" alt="Double-click textbox" /> |
| **Right-click**                | `default (arrow)`   | Opens the circular component context menu                                    | <img src="./right_click.png" style="width:1000px;" alt="Right-click" /> |
| **Click-and-hold**             | `crosshair`         | Initiates box selection for selecting multiple components                    | <img src="./select.gif" style="width:1000px;" alt="Box selection" /> |
| **Scroll wheel**               | `default (arrow)`   | Pan up or down                                                                |                                          |
| **Scroll wheel + CMD/CTL**     | `default (arrow)`   | Zoom in/out                                                                   |                                          |
| **Horizontal scroll wheel**    | `default (arrow)`   | Pan left or right                                                             |                                          |

---

### 2. Pencil Mouse Mode

Pencil lines do not connect individual components, but offer annotating capability, allowing you to take notes and draw annotations to enhance your designs.

| Action                      | Cursor Style        | Behavior                                            |                                            |
|-----------------------------|---------------------|-----------------------------------------------------|-------------------------------------------------|
| **Hover**                   | `custom(pencil)`    | Nothing                                             |                                                 |
| **Mouse down + drag**       | `custom(pencil)`    | Start drawing a freeform line                       | <img src="./pencil.gif" style="width:1000px;" alt="Pencil mode" /> |
| **Mouse down + SHIFT**      | `custom(pencil)`    | Start drawing a straight vertical or horizontal line |                                                 |
| **Mouse up**                | `custom(pencil)`    | Complete the line and render into a styled component |                                                 |
| **Click**                   | `custom(pencil)`    | Draws ink from the pencil                           |                                                 |
| **Scroll wheel**            | `custom(pencil)`    | Nothing                                             |                                                 |
| **Scroll wheel + CMD/CTL**  | `custom(pencil)`    | Nothing                                             |                                                 |

---

### 3. Pen Tool Mode

The Pen tool operates as a creator of annotation edges. It has two behaviors depending on context.

**To Activate:** `CMD+E`

<details>
<summary><strong>Connector Behaviors</strong></summary>

- **Component-connect Behavior**: When you click an empty spot on the canvas, and drag to another empty spot on the canvas, you get a joint (aka a terminal node) from which you can create new connections as well as new edge relationships.  
- **Canvas-connect Behavior**: When you click an empty spot on the canvas, and drag to an existing component, you get an annotation edge relationship.
</details>

| Phase                            | Cursor Style | Behavior                                                      |                                                        |
|----------------------------------|--------------|---------------------------------------------------------------|-------------------------------------------------------------|
| **1. Click & release**           | `pen`        | Initiate connection                                            | <img src="./tool-mode-placeholder.svg" style="width:1000px;" alt="Phase 1" /> |
| **2. Click-and-move**            | `pen`        | Move the ghost edge around if a connection was initiated       | <img src="./tool-mode-placeholder.svg" style="width:1000px;" alt="Phase 2" /> |
| **3. Click while connecting**    | `pen`        | Establish and render the connection                            | <img src="./tool-mode-placeholder.svg" style="width:1000px;" alt="Phase 3" /> |

#### Additional Examples

| Example                                  |                                                |
|------------------------------------------|-----------------------------------------------------|
| How to Draw and Connect Lines | <img src="./draw_line.gif" style="width:1000px;" alt="Draw line" /> |
| How to customize nodes at the ends of connections      | <img src="./customize_end.gif" style="width:1000px;" alt="Customize nodes" /> |

---

### 4. Pan Mouse Mode

| Action                      | Cursor Style        | Behavior                                 |
|-----------------------------|---------------------|------------------------------------------
| **Hover**                   | `hand`              | Nothing                                  |       |
| **Click-and-hold**          | `grabbing-hand`     | Grab the canvas and pan in the direction of mouse movement  |
| **Scroll wheel + CMD/CTL**  | `grabbing-hand`     | Zoom in/out in the direction of the mouse.  |
| **Horizontal scroll wheel** | `grabbing-hand`     | Pan left or right in the direction of the mouse.   |                

