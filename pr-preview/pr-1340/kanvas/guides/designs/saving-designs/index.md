# Save Designs


> How Kanvas saves a design automatically, what the save indicator reports, how to save a copy, and what happens when a save fails.


Kanvas saves a design for you. There is no Save button and no Save shortcut. Every change that alters the design, such as adding, moving, configuring, or deleting a component, renaming, editing a relationship, or merging, queues a save. The request is sent 3 seconds after your last change. Changes made while a save is in flight queue a new save when it finishes.

Saving needs a signed-in user or a guest session on kanvas.new, and an organization. It does not check a permission key.

## What triggers a save, and what does not

A new design with no id is saved only once it has at least one component, or a name that is neither empty nor "Untitled Design". A design that was saved before is always saved.

Kanvas does not save when you load a design, when the server assigns the id after the first save, when you open a component configurator, or when collaborators' document updates arrive.

The first save creates the design, and the address bar updates to `?mode=design&design=<id>`. If you edit again before the first save returns, Kanvas holds the second save until the id arrives, so no duplicate design is created.

## Read the save indicator

The cloud icon in the top bar reports the state and doubles as a manual save trigger.

| State | Indicator |
|---|---|
| Saving | Animated icon and "Saving..." |
| Saved | "Saved" for 3 seconds, then a tooltip reading "All changes saved" with the time |
| Failed | Red cloud-off icon and "Unable to save. Retrying..." |

The tooltip on any saved design includes **View Save History**.

## Save a copy

**Save as** saves the open design as a new design with a name you enter. It proposes `<current name>-copy`. The copy gets a new id, you as owner, your selected workspace, public visibility, and version 0.0.1, then Kanvas loads it. The original is unchanged. Save as is disabled on an empty canvas. The name is required but not checked for length or uniqueness.

A new blank design is named "Untitled Design" until you rename it.

## Versions and history

Each save raises the patch number of the design's version: the first save is 0.0.1, the next 0.0.2, and so on. Autosaves, visibility changes, and catalog data edits all count, so the version tracks how often the design was saved, not meaningful releases. Cloning and imports reset the version to 0.0.1. There is no way to bump the major or minor number.

**View Save History** opens a list titled "Design Version History". It is an event log of who changed the design and when. You cannot restore, diff, or export an earlier version from it. If you need a version you can return to, export a copy at that point. See [Export Designs](/pr-preview/pr-1340/kanvas/guides/designs/export-designs/).

## Concurrent edits

Saving sends the whole design and the server overwrites the stored copy. The last save wins. Collaborators editing the same open design are reconciled live in the editor by the collaboration session, not at the storage layer.

## Plan limit: components per design

The server rejects a save when the design has more components than your plan allows.

| Plan | Components per design |
|---|---|
| Personal | 100 |
| Team Designer | 200 |
| Team Operator | 100 |
| Enterprise | 300 |

These are the seeded plan values. A deployment can differ. The limit applies to every save, to Save as, to merges, and to URL imports. It does not apply to cloning. A cloned design that exceeds your limit opens normally but fails its first save.

The server answers 403 with the message "Design exeeds maximum limit of N components supported by your current plan" (the misspelling ships) and an upgrade remediation. Kanvas does not show that message. You see only "Unable to save. Retrying..." and the edits stay on the canvas, unsaved. Reduce the component count below the limit to save again. An organization with no active subscription that grants the feature gets "Org is not entitled to adding components to a design".

For the other limits Layer5 lists per plan, see [Feature Availability](/pr-preview/pr-1340/kanvas/reference/feature-availability/). Plan limits other than components per design are not enforced when you save.

## When a save fails

| Message | Meaning |
|---|---|
| Failed to reach the cloud. Any changes made may not be saved. | The server was unreachable (HTTP 503). |
| Failed to save Design with name: <name> | Any other failure, including the plan limit. |
| Failed to save Design with name: <name> Design is invalid or empty | The design payload was empty or invalid. |

After a failure the editor enters an error mode: the top bar is tinted, and design-changing actions are ignored until the next command resets it. Autosave retries with exponential backoff, waiting 3 seconds times 2 to the power of the attempt number (6, 12, 24 seconds, and so on), up to 100 attempts. Any new edit resets the count.

Closing the tab or switching designs with unsaved changes asks "You have unsaved changes. Are you sure you want to leave?"

## Who can save what

Anonymous users save normally into a guest account with its own organization and workspace. On sign-in, guest designs migrate to the account.

Updating an existing design keeps the original owner, visibility, and source type when the update does not state them. Operator mode blocks design edits, so it never saves a design. See [Manage Designs](/pr-preview/pr-1340/kanvas/guides/designs/) for the defaults.

