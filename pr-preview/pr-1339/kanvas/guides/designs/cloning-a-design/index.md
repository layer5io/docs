# Clone a Design


> Copy a public or published design into your own workspace to use as a template, and learn what carries over.


Cloning copies a design into your own workspace so you can change it freely. The clone is an independent record: later changes to the source never reach it, and edits to the clone never reach the source.

## What you can clone

The server clones only designs whose visibility is public or published. A request for any other design fails with 403 "unauthorized to clone design". That includes your own private designs. To copy one of those, open it and use Save as. See [Save Designs](/pr-preview/pr-1339/kanvas/guides/designs/saving-designs/). A missing source design returns 500 "could not find design".

## Where to start a clone

Kanvas has no Clone item for the design that is open. You clone from these places:

- **The catalog.** The catalog modal's Clone action, and catalog design cards in Layer5 Cloud.
- **A catalog link.** Opening a link with `mode=design&type=catalog&id=<id>` clones that design and opens your copy.
- **Tutorials.** Opening a tutorial's design clones it.

The client names a catalog clone `<design name> (Copy)`, and a tutorial clone `<tutorial title> (Copy)`. The server stores whatever name it receives and rejects an empty request body with 400. When the clone completes, Kanvas loads it. If the open design has unsaved changes, you confirm first.

Layer5 Cloud shows the Clone action only to roles with the Clone Design permission. The server checks visibility, not the key. See [Permissions](/pr-preview/pr-1339/kanvas/reference/permissions/).

## What carries over

| Carried over | Reset or changed |
|---|---|
| Components, relationships, styles, configuration, annotations, and preferences, converted to the current design format | New id |
| The origin of the source design | Version 0.0.1 |
| Catalog data (compatibility, type, info, caveats, content class, published version, snapshot URLs) | Owner is you |
| | Visibility private |
| | Workspace is your selected workspace |
| | Source file and usage counters are not copied |

Cloning is the only path that creates a private design. Every other new design is public.

## Limits and failure behavior

Cloning does not check your plan's components-per-design limit. A clone from a larger plan can exceed yours and then fail its first autosave with a plan-limit error. See [Save Designs](/pr-preview/pr-1339/kanvas/guides/designs/saving-designs/).

Kanvas shows `Cloning design "<name>"` while the clone runs. It shows no failure message. Because the clone copies the catalog data block, a private clone can display catalog metadata even though it is not published.

