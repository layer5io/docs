---
title: Understanding Tool Modes
description: >
  Kanvas Designer offers three modes: Default, Pencil, and Connector, which behave differently based on the context in which they are used. Learn how to interact with components and the canvas in each mode.
weight: 1
categories: [Designer]
tags: [designs]
aliases:
---

<!-- set of custom keyboard button classes -->
<link rel="stylesheet" href="https://unpkg.com/keyboard-css@1.2.4/dist/css/main.min.css" />


# Tool Modes

You can switch between mouse modes using hotkeys or tool selection. Here are hotkeys that control your mode:

- <button class="kbc-button kbc-button-xs">Spacebar</button>: Temporarily enables the alternative mouse mode (default mode vs pan mode)  
- <button class="kbc-button kbc-button-xs">H</button>: Switches to pan mode (hand icon)  
- <button class="kbc-button kbc-button-xs">Escape / V</button>: Switches to default mode irrespective of which mode you are currently using.

## Interacting with Components
### Default Mode (no tool selected)

**Hover:** Nothing  
Cursor style: “default (arrow)”  

**Click-and-drag:** Moves component in the direction of the mouse.  
Cursor style: “move”  

**Click**: Displays the component toolbar, resize box, and connections handles.  
Cursor style: “default (arrow)”  
<img style="width:500px;" src="./click.png" />

**Double-click**:  
Cursor style: “pointer”  
- Components \- Opens the component configurator.  
<img style="width:500px;" src="./double_click.png" />

- Textbox \- Enables text editing inside the component.  
Cursor style: “text”  
<img style="width:500px;" src="./text-box-double-click.gif" />

**Right-click**: Opens the circular component context menu.  
Cursor style: “default (arrow)”  
<img style="width:500px;" src="./right_click.png" />

**Click-and-hold:** Initiates box selection for selecting of multiple components.  
Cursor style: “crosshair”  
<img style="width:500px;" src="./select.gif" />

**Scroll wheel**: Pan up or down in the direction of the mouse.  
Cursor style: "default (arrow)”  

**Scroll wheel \+ CMD/CTL**: Zoom in/out in the direction of the mouse.  
Cursor style: "default (arrow)”  

**Horizontal scroll wheel**: Pan left or right in the direction of the mouse.  
Cursor style: "default (arrow)”  

#### Pencil Mouse Mode

Pencil lines do not connect individual components, but offer annotating capability, allowing you to take notes and draw annotations to enhance your designs.  
**Hover:** Nothing  
Cursor style: “custom(pencil)”  
**Mouse down and drag:** Start drawing a freeform line.  
Cursor style: “custom(pencil)”  
<img style="width:500px;" src="./pencil.gif" />

**Mouse down \+ SHIFT:** Start drawing a straight line in the direction of the mouse, which will initiate and remain as either a vertical or horizontal line.  
 Cursor style: “custom(pencil)”  
**Mouse up**: Complete the line and renders into a component with full styling capabilities.  
 Cursor style: “custom(pencil)”  
**Click**: Draws ink from the pencil.  
 Cursor style: “custom(pencil)”  
**Scroll wheel**: Nothing
 Cursor style: “custom(pencil)”  
**Scroll wheel \+ CMD/CTL**: Nothing  
 Cursor style: “custom(pencil)”

<!-- *Developer notes:*

1. *In the future, the canvas moves with the pen/pencil as they near the edge of the viewport.*  
2. *In the future, the scroll wheel will behave as it normally does in default mode.* -->

#### Pen Tool Mode

The Pen tool operates as a creator of annotation edges. Note that the pen tool has two behaviors depending upon the context in which you initiate the connection.

The Pen Tool Mode is activated using **CMD+E**.

{{< alert title="Connector Behaviors">}}
**Component-connect Behavior**: When you click an empty spot on the canvas, and drag to another empty spot on the canvas, you get a **joint** (aka a terminal node) from which you can create new connections as well as new edge relationships.

**Canvas-connect Behavior**: When you click an empty spot on the canvas, and drag to an existing component, you get an annotation edge relationship.

{{< /alert >}}

**Component-connect Behavior**: When you click an empty spot on the canvas, and drag to another empty spot on the canvas, you get a **joint** (aka a terminal node) from which you can create new connections as well as new edge relationships.

**Canvas-connect Behavior**: When you click an empty spot on the canvas, and drag to an existing component, you get an annotation edge relationship.

**Hover:** Nothing  

<img style="width:250px;" src="./tool-mode-placeholder.svg" />

Cursor style: “pen” 

**Mouse down and drag:** Nothing

Creating connections happens in three phases.

1. **Click** (press primary mouse button and release)**:** Initiate connection.

<img style="width:250px;" src="./tool-mode-placeholder.svg" />

Cursor style: “pen”
1. **Click and move:** if a connection was initiated, moves the ghost edge around else does nothing.

<img style="width:250px;" src="./tool-mode-placeholder.svg" />

Cursor style: “pen” and the annotation edge following the mouse around.
1. **Click while connecting**: Establish and render connection.

<img style="width:250px;" src="./tool-mode-placeholder.svg" />

Cursor style: “pen”

**How to Draw and Connect Lines**<br>
<img style="width:500px;" src="./draw_line.gif" />

**How to customize nodes at the ends of connections**<br>
<img style="width:500px;" src="./customize_end.gif" />

<!-- 
*Developer notes:*

1. *In future, when the connector is released on an empty spot on the canvas, offer a component picker from which users can always choose a “Joint” component.*  
2. *Rename PenTerminalNode to “**Joint**”, unless there’s something better to call it.* -->

#### Pan Mouse Mode

 **Hover:** Nothing
  Cursor style: “hand”  
**Click-and-hold:** Grab the canvas and pan in the direction of mouse movement.  
Cursor style: “grabbing-hand”  
**Scroll wheel \+ CMD/CTL**: Zoom in/out in the direction of the mouse.  
Cursor style: “grabbing-hand”  
**Horizontal scroll wheel**: Pan left or right in the direction of the mouse.  
Cursor style: “grabbing-hand”
