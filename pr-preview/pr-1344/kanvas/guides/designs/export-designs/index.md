# Export Designs


> Export a design as a design file, an OCI image, a Kubernetes manifest, a Helm chart, or an embeddable script, and know what each format keeps.


Export writes a design out of Kanvas so you can back it up, move it between Meshery deployments, hand it to Helm or `kubectl`, or put it on a web page. Every export is generated from the current state of the design. You cannot export an earlier version.

Export is a File menu action, disabled on an empty design. In Operator mode, Export instead downloads the open view as `<view name>.json`.

## Choose a format

| Format | Keeps layout, annotations, and metadata | Use it for |
|---|---|---|
| Design file (YAML) | Yes | Backups, moving designs, re-import into Kanvas |
| Design (OCI image) | Yes | Storing and versioning a design in a container registry |
| Kubernetes manifest | No | `kubectl apply` and pipelines that expect plain manifests |
| Helm chart | No | Helm repositories, Argo CD, Flux, Artifact Hub |
| Embed design (JavaScript) | Snapshot of the canvas | Showing a design on a web page |

Kanvas offers at least one of the first four. Which ones appear can depend on the capabilities of your Layer5 Cloud account. Per-format options and size limits are not exposed. To capture the canvas as a PNG picture, use Take Screenshot instead. See [Canvas Actions](/pr-preview/pr-1344/kanvas/reference/canvas-actions/).

## Design file (YAML) {#exporting-as-a-design-file}

A complete copy of the design, including layout, annotations, component grouping, and configuration. The download is named `<design name>.yml`. Kanvas can import it back without loss.

## Design (OCI image) {#exporting-as-an-oci-image}

The same lossless content packaged as an OCI image archive. Push it with a registry tool such as `docker push` or `oras push` to version and distribute designs alongside application artifacts. Kanvas imports the archive back, taking the design file in its layers. See [Import and Merge Designs](/pr-preview/pr-1344/kanvas/guides/designs/import-designs/).

## Source-type formats {#exporting-in-a-source-type-format}

A design can be exported as the kind of source it was built from. Both formats are lossy: layout, annotations, and comments are dropped because neither format can carry them. To keep a design fully editable, export the design file instead.

Docker Compose is an import source only. A design cannot be exported to Compose.

### Kubernetes manifest {#exporting-as-a-kubernetes-manifest}

Plain Kubernetes resource definitions, ready for `kubectl apply`.

### Helm chart {#exporting-as-a-helm-chart}

A `.tar.gz` chart archive that contains the Kubernetes resource definitions. Install it with `helm install <release> <chart>.tgz` or place it in a Helm repository.

Re-importing a manifest or chart restores the resources, but not the layout, so the graph does not reappear as you drew it.

## Embed design (JavaScript) {#exporting-as-embedding}

The Embed Design option downloads a JavaScript module and shows a two-line snippet to paste into an HTML page. The embed is a static snapshot, not a live view. See [Embed Designs](/pr-preview/pr-1344/kanvas/guides/designs/embedding-designs/).

## Access and tiers

- Exporting needs no sign-in for a public or published design. Anonymous callers can download the design file of any public or published design, not just their own. A private design is downloadable by its owner, a provider administrator, a user the design is shared with, or a user holding the View Designs permission.
- Each download of the design file writes an audit event and raises the design's download count. Anonymous downloads record as "Anonymous viewer downloaded".
- No plan tier gates export, and exporting your own design needs no permission key. Layer5 Cloud's catalog table shows its Download action to roles with the Download a Design permission.
- The browser either prompts for a save location or saves to your downloads folder. Success shows `<name> design downloaded`. Failure shows "Failed to download design".

## Keep a version you can return to

A design has a single current version, and the save history is an event log, not a set of snapshots. To keep a restorable point, export a design file or an OCI image at that moment and store it. For an OCI image, push it to a registry under a tag.

