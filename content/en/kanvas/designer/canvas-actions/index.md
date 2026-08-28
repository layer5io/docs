---
title: Canvas Actions
weight: 12
description: >
  The canvas context menu - screenshots, the Help Center, keyboard shortcuts and canvas-wide editing actions.
categories: [Designer]
tags: [designs]
---

Right-clicking an empty part of the canvas - anywhere no component sits - opens the **Canvas Actions** menu. Where the component context menu acts on one component, this menu acts on the canvas as a whole: undoing and redoing, pasting, selecting everything, capturing the canvas as an image, and reaching help.

The menu adapts to the mode you are in. Commenting and pasting, for example, are offered in Designer mode but not in Operator mode, where the canvas reflects discovered infrastructure rather than a design you are authoring.

<!-- SCREENSHOT NEEDED: Kanvas Designer, right-click context menu open on empty canvas, showing the full Canvas Actions menu with its groups -->

## Editing actions

| Action | Shortcut | Behaviour |
| --- | --- | --- |
| Add Comment | <kbd>M</kbd> | Drops a comment at the point you right-clicked. Designer mode only. See [Reviewing Designs]({{< ref "kanvas/designer/comments/index.md" >}}). |
| Undo | <kbd>Cmd/Ctrl</kbd> + <kbd>Z</kbd> | Reverses the last change. |
| Redo | <kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> | Re-applies the last undone change. |
| Paste | <kbd>Cmd/Ctrl</kbd> + <kbd>V</kbd> | Pastes the clipboard contents at the cursor position. Designer mode only. |
| Select All | <kbd>Cmd/Ctrl</kbd> + <kbd>A</kbd> | Selects every component on the canvas. |
| Reset Design | | Clears every component from the canvas. Designer mode only, and destructive - see below. |

### Reset Design

Reset Design removes everything currently on the canvas. Kanvas asks you to confirm before it does, and the confirmation reminds you that undo is usually the better tool if you only want to step back a few changes. The confirmation dialog carries a "don't show this again" checkbox; ticking it stores that preference against your user settings, and the reset then happens immediately on every subsequent use.

## Screenshot Canvas

**Take Screenshot** captures the canvas exactly as it is drawn - components, relationships, annotations and all - and downloads it to your machine as a PNG. The file is named `Kanvas-<timestamp>.png`, so repeated captures of the same design do not overwrite one another.

The capture is of the canvas rather than of your browser window: panels, the dock and the toolbar are not included, and the image is rendered from the design itself rather than screen-grabbed, so it is not limited to the part of the design currently scrolled into view.

This is the quickest way to put a design into a pull request, an incident write-up or a slide. When you need the design as data rather than as a picture - to hand to another tool, or to re-import later - use [Exporting Designs]({{< ref "kanvas/designer/export-designs/index.md" >}}) instead.

## Options

**Options** opens the canvas settings drawer, where preferences that affect how the canvas behaves and renders are gathered.

## Shortcuts

**Shortcuts** (<kbd>Cmd/Ctrl</kbd> + <kbd>/</kbd>) opens the keyboard shortcut reference in the help drawer, listing the shortcuts available in both Designer and Operator modes.

## View help center

**Help Center** (<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>/</kbd>) opens the in-app help modal. It gathers, in one place, every route by which you can learn more about Kanvas or reach someone who can help:

| Card | What it opens |
| --- | --- |
| Documentation | Guides, references and how-tos for Kanvas and Meshery. |
| Video Tutorials | Walkthroughs and demos in the Layer5 video library. |
| Quick Tips | An in-app tour of core Kanvas features, shown in a drawer beside the canvas. |
| Academy | Structured learning paths in Layer5 Cloud. |
| Discussion Forum | The Layer5 discussion forum, for questions and shared knowledge. |
| Slack | The Layer5 community Slack, for real-time conversation. |
| Keyboard Shortcuts | The same shortcut reference the Shortcuts action opens. |
| Support | A form for contacting the Kanvas team with a problem or a piece of feedback. |

Quick Tips and Keyboard Shortcuts open in a drawer alongside the canvas, so you can keep working while you read them; the remaining cards open in a new tab. The Help Center is also reachable from the help button at the right-hand end of the dock.

<!-- SCREENSHOT NEEDED: Kanvas Designer, Help Center modal open, showing all eight cards -->
