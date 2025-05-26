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
Kanvas Designer offers three modes: Default, Pencil, and Connector, which behave differently based on the context in which they are used. Understanding these modes is essential for effectively interacting with components and the canvas.

You can switch between mouse modes using hotkeys or tool selection. Here are hotkeys that control your mode:

- <button class="kbc-button kbc-button-xs">Spacebar</button>: Temporarily enables the alternative mouse mode (default mode vs pan mode)  
- <button class="kbc-button kbc-button-xs">H</button>: Switches to pan mode (hand icon)  
- <button class="kbc-button kbc-button-xs">Escape / V</button>: Switches to default mode irrespective of which mode you are currently using.

## Interacting with Components

{{< tabpane text=true >}}
{{< tab header="Select Tool" lang="en" >}}
<ul>
<li><b>Hover:</b> Nothing  
<br />Cursor style: “default (arrow)”</li>
<br />
<li><b>Click-and-drag:</b> Moves component in the direction of the mouse.
<br />Cursor style: “move”</li>
<br />
<li><b>Click:</b> Selects the component and displays the component toolbar, resize box, and connections handles.
<img style="width:500px;" src="./click.png" />
<br />Cursor style: “default (arrow)”</li>
<br />
<li><b>Double-click on Component:</b> Opens the component configurator.
<img style="width:500px;" src="./double_click.png" />
<br />Cursor style: “pointer”</li>
<br />
<li><b>Double-click on Textbox:</b> Enables text editing inside the component.
<img style="width:500px;" src="./text-box-double-click.gif" />
<br />Cursor style: “text”</li>
<br />
<li><b>Right-click:</b> Opens the circular component context menu.
<img style="width:500px;" src="./right_click.png" />
<br />Cursor style: “default (arrow)”</li>
<br />
<li><b>Click-and-hold:</b> Initiates box selection for selecting multiple components.
<img style="width:500px;" src="./select.gif" />
<br />Cursor style: “crosshair”</li>
<br />
<li><b>Scroll wheel:</b> Pan up or down in the direction of the mouse.
<br />Cursor style: "default (arrow)”</li>
<br />
<li><b>Scroll wheel + CMD/CTL:</b> Zoom in/out in the direction of the mouse.
<br />Cursor style: "default (arrow)”</li>
<br />
<li><b>Horizontal scroll wheel:</b> Pan left or right in the direction of the mouse.
<br />Cursor style: "default (arrow)”</li>
<br />
</ul>

{{< /tab >}}
{{< tab header="Pencil Tool" lang="en" >}}
Pencil lines do not connect individual components, but offer annotating capability, allowing you to take notes and draw annotations to enhance your designs.
<ul>
<li><b>Hover:</b> Nothing
<br />Cursor style: “custom(pencil)”</li>
<br />
<li><b>Mouse down:</b> Initiates the pencil tool.
<br />Cursor style: “custom(pencil)”</li>
<br />
<li><b>Mouse down and drag:</b> Start drawing a freeform line.
<img style="width:500px;" src="./pencil.gif" />
<br />Cursor style: “custom(pencil)”</li>
<br />
<li><b>Mouse down + CTRL/CMD:</b> Start drawing a straight line in the direction of the mouse, which will initiate and remain as either a vertical or horizontal line.
<br />Cursor style: “custom(pencil)”</li>
<br />
<li><b>Mouse down + SHIFT:</b> Start drawing a straight line in the direction of the mouse, which will initiate and remain as either a vertical or horizontal line.  
<br />Cursor style: “custom(pencil)”</li>
<br />
<li><b>Mouse up</b>: Complete the line and renders into a component with full styling capabilities.
<br />Cursor style: “custom(pencil)”</li>
<br />
<li><b>Click</b>: Draws ink from the pencil.
<br />Cursor style: “custom(pencil)”</li>
<br />
<li><b>Scroll wheel</b>: Nothing
<br />Cursor style: “custom(pencil)”</li>
<br />
<li><b>Scroll wheel \+ CMD/CTL</b>: Nothing  
<br />Cursor style: “custom(pencil)”</li>
</ul>
<!-- *Developer notes:*

1. *In the future, the canvas moves with the pen/pencil as they near the edge of the viewport.*  
2. *In the future, the scroll wheel will behave as it normally does in default mode.* -->

{{< /tab >}}
{{< tab header="Pen Tool" lang="en" >}}

The Pen tool operates as a creator of annotation edges. Note that the pen tool has two behaviors depending upon the context in which you initiate the connection.

The Pen Tool Mode is activated using <button class="kbc-button kbc-button-xs" style="max-width:fit-content;margin:0px;position:relative;display:inline;">CMD+E</button>

{{< alert title="Connector Behaviors">}}
**Component-connect Behavior**: When you click an empty spot on the canvas, and drag to another empty spot on the canvas, you get a **joint** (aka a terminal node) from which you can create new connections as well as new edge relationships.

**Canvas-connect Behavior**: When you click an empty spot on the canvas, and drag to an existing component, you get an annotation edge relationship.

{{< /alert >}}
<ul>
<li><b>Hover:</b> Nothing
<img style="width:250px;" src="./tool-mode-placeholder.svg" />
<br />Cursor style: “pen”</li>
<br />
<li><b>Mouse down and drag:</b> Nothing

Creating connections happens in three phases.

<b>Click</b> (press primary mouse button and release):
Initiate connection.

<img style="width:250px;" src="./tool-mode-placeholder.svg" />

<br />Cursor style: “pen”</li>
<br />
<li><b>Click and move:</b> if a connection was initiated, moves the ghost edge around else does nothing.

<img style="width:250px;" src="./tool-mode-placeholder.svg" />

<br />Cursor style: “pen” and the annotation edge following the mouse around.</li>
<br />
<li><b>Click while connecting</b>: Establish and render connection.
<img style="width:250px;" src="./tool-mode-placeholder.svg" />
<br />Cursor style: “pen”</li>
<br />
<li><b>Click and move:</b> if a connection was initiated, moves the ghost edge around else does nothing.

<img style="width:250px;" src="./tool-mode-placeholder.svg" />

<br />Cursor style: “pen” and the annotation edge following the mouse around.</li>
<br />
<li><b>Click while connecting</b>: Establish and render connection.
<img style="width:250px;" src="./tool-mode-placeholder.svg" />
<br />Cursor style: “pen”</li>
<br />
<li><b>How to Draw and Connect Lines</b>
<img style="width:500px;" src="./draw_line.gif" /></li>

<li><b>How to customize nodes at the ends of connections</b><br />
<img style="width:500px;" src="./customize_end.gif" /></li>
</ul>
<!-- 
*Developer notes:*

1. *In future, when the connector is released on an empty spot on the canvas, offer a component picker from which users can always choose a “Joint” component.*  
2. *Rename PenTerminalNode to “**Joint**”, unless there’s something better to call it.* -->
{{< /tab >}}
{{< tab header="Pan Tool" lang="en" >}}
<ul>
<li><b>Hover:</b> Nothing</b>
<br />Cursor style: “hand”</li>
<br />
<li><b>Click-and-hold:</b> Grab the canvas and pan in the direction of mouse movement.  
<br />Cursor style: “grabbing-hand”</li>
<br />
<li><b>Scroll wheel \+ CMD/CTL</b>: Zoom in/out in the direction of the mouse.  
<br />Cursor style: “grabbing-hand”</li>
<br />
<li><b>Horizontal scroll wheel</b>: Pan left or right in the direction of the mouse.  
<br />Cursor style: “grabbing-hand”</li>
{{< /tab >}}
{{< /tabpane >}}
