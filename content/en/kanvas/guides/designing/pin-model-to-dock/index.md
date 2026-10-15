---
title: Pin Models to the Dock
linkTitle: Pin Models to the Dock
description: Keep the models you use most one step away in the dock, and remove them when you no longer need them.
weight: 40
diataxis: how-to
categories: [designer]
tags: [dock, pin, models]
aliases:
  - /kanvas/designer/pin-model-to-dock/
---

Pinning a model puts its icon in the dock at the bottom of the canvas, so you can reach its components without opening the full palette. Pins belong to your account. They are not stored per design or in the browser, so they follow you across designs, browsers, and devices.

Pinning works in Designer mode. In Operator mode the dock does not show pinned models.

## Pin a model

Hover a model row in the component palette and use the pin icon. Its tooltip reads "Pin To Dock". The shape palette offers the same pin on each shape category row.

![The Pin To Dock action on a model in the component list](images/pin-to-dock.png)

Only models and shape categories can be pinned. Individual components cannot. There is no limit on how many models you pin. Kanvas matches pins by model name, so pinning the same model at a different version is the same pin.

## Use a pinned model

Pinned models appear after a divider at the right end of the dock.

![A pinned model displayed in the dock](images/pinned-model-location.png)

Select a pinned model to open a picker with its components. Click a component to add it near the center of the canvas, or drag it to a specific spot. The picker has its own search box and a version selector with an "All Versions" choice. A pinned model whose lookup returns nothing is not drawn.

![Components of a pinned model in the picker](images/use-pinned-models-components.png)

## Remove a pin

Either of these removes the pin without affecting any design:

- Select the pin icon again on the model row. Its tooltip reads "Remove From Dock".
- Hover the pinned model in the dock and select the close (X) badge.

![The Remove From Dock action](images/unpin-model-1.png)

![Unpinning with the close badge](images/unpin-model-2.png)

## Default dock

With nothing pinned the dock holds Select, Hand, Components, Kubernetes, Shapes, Comment, Image, TextBox, Section, Pen, Pencil, and Help Center. See [Whiteboard on the Canvas]({{< ref "kanvas/guides/designing/whiteboarding/index.md" >}}).
