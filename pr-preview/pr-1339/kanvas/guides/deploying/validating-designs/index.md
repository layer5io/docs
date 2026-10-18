# Validate a Design


> Check every component's configuration against its schema before you deploy, read the results, and fix what they flag.


Validation checks the configuration of each component in a design against the schema of that component's definition. It runs in your browser, needs no cluster, and changes nothing. Run it while you build to catch missing or malformed fields before a dry run or a deployment spends time on them.

## Before you start

- **Environment.** Validation runs in a Meshery you run. The hosted kanvas.new site does not run it and shows a self-hosted-feature prompt instead.
- **A non-empty design.** The Actions menu is disabled while the design has no components. An unsaved design validates; Kanvas validates the design as it is on the canvas.
- **Permission.** On mobile, the Validate Design permission gates the action. See [Permissions by Role](/pr-preview/pr-1339/kanvas/reference/permissions/).

## What validation checks

| Checked | Not checked |
|---|---|
| Each component's configuration against the JSON schema of its registered definition, with all errors collected per component | Relationships between components |
| Required fields, types, and formats, including 32-bit and 64-bit integers and integer-or-string values | Dependencies, namespaces, and cross-references |
| | Anything in the target cluster |

Annotation components (text, shapes, and other visual elements) carry no infrastructure and are skipped. They are counted separately in the summary.

Two cases pass silently, so a clean result does not prove every component was checked:

- A component whose definition cannot be fetched from the registry is skipped as valid.
- A design whose schema version is not a supported design version reports 0 components, 0 annotations, and no errors.

## Read the results

The results show a summary line, `<N> component(s) and <M> annotations`, and an error count. With no errors the result reads `No validation errors.`

With errors, each component that has them appears as an expandable row with its name and error count. Each error names the field by its dotted path, for example `Field "spec.ports" must have required property 'apiGroup'`. When the path is empty, the line shows the message alone. Errors are warnings: they never block you from continuing.

To fix an error, open the component and go to the field named in the path. A missing required property names the field you need to fill in.

Validation runs fresh each time you open it, so results always reflect the current design.

## Results on the canvas

Validation also marks the canvas. A component with errors shows a circular badge at its lower left holding the total number of errors, schema and dry-run errors combined. Selecting the badge expands it to two counts: a yellow triangle for schema errors and a red octagon for dry-run errors. Each opens the matching results, scrolled to that component.

Badges appear only when the **Validation Warnings** and **Deployment Errors** entries in the Layers panel are on and the render mode is Full. They are hidden in Wireframe, Medium, and View-only modes. A new validation or dry run replaces them, and loading another design clears them. Editing a component does not clear its badge, so run validation again after you fix something.

## The event it records

Validating the whole design records an informational event in the event log:

> Validation completed for '<design>' with <N> error(s) found.

The event carries the design name, the total error count, and per-component results. Validating a single component records nothing.

## Validate and dry run compared

| | Validate | Dry run |
|---|---|---|
| Checks against | Each component's schema | The Kubernetes API of each target cluster |
| Needs a cluster | No | Yes |
| Catches | Missing or malformed configuration | Everything the cluster's admission and schema checks reject |
| Speed | Immediate | One request per cluster |

Validate is the fast loop while you build. Run a [dry run](/pr-preview/pr-1339/kanvas/guides/deploying/dry-running-a-design/) before you deploy, because it is the only check that involves the cluster you are deploying to. The [deploy](/pr-preview/pr-1339/kanvas/guides/deploying/deploying-designs/) and [undeploy](/pr-preview/pr-1339/kanvas/guides/deploying/undeploying-designs/) flows run validation as their first step.

