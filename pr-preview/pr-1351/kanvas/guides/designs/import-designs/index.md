# Import and Merge Designs


> Bring Kubernetes manifests, Helm charts, Docker Compose files, Kustomize projects, and Meshery designs into Kanvas, and merge one design into another.


Import turns an existing configuration into an editable design. Kanvas identifies the format from the file content, converts it to a Meshery design, and saves it as a new design in your account. A File Upload or URL Import does not keep the original file, so exporting later produces a new file from the current design. A GitHub import is different: the design stays bound to its source, as described in [Where the imported design lands](#where-the-imported-design-lands).

Import works in Designer mode. The import action is hidden in Operator mode.

## Choose how to import

| Method | Accepts | Result |
|---|---|---|
| Import dialog, File Upload | One local file | New design, or merge into the open design |
| Import dialog, URL Import | One direct http or https URL to a single file | New design, or merge into the open design |
| Drag or paste onto the canvas | One or more files | One new design per file, or a merge prompt if the canvas is not empty |
| Catalog clone or open | A published design | Copy of the design, see [Clone a Design](/pr-preview/pr-1351/kanvas/guides/designs/cloning-a-design/) |
| GitHub integration in Layer5 Cloud | Files and folders in a connected repository | One private design per valid file |

The URL must point at a file, not a repository, a chart repository, or a directory. Folders cannot be imported directly: compress a Kustomize project or Helm chart into a single archive first.

The import dialog takes a name (1 to 255 characters, default "Untitled Design"). Names are not required to be unique. If you leave the name empty, Kanvas uses the name inside the file, and drops use the file name.

## Supported formats

Kanvas accepts `.yml`, `.yaml`, `.json`, `.tar`, `.tar.gz`, `.tgz`, `.gz`, and `.zip`. Any other extension is rejected. Archives are extracted safely and entries that try to escape the archive directory are refused.

Kanvas decides the format by content, not by the file name, and takes the first match in this order:

1. **Meshery design.** A YAML or JSON design file, or an OCI image archive (`.tar`, `.tgz`, `.zip`) whose layers contain a design file. Only the first design in an archive is taken. An OCI archive without a design file fails.
2. **Kubernetes manifest.** A `.yml` or `.yaml` file with one or more documents. Unknown resource kinds are kept as generic objects.
3. **Helm chart.** A packaged chart archive. An uncompressed `.tar` is reported as needing gzip compression. Individual chart files such as `Chart.yaml` cannot be imported, and values overrides are not an import option.
4. **Docker Compose.** Compose services are first converted to Kubernetes resources, so the design contains Kubernetes components.
5. **Kustomize.** A single kustomization file, or an archive that contains `kustomization.yaml` and every file it references.

The full matrix is in [Supported Import and Export Formats](/pr-preview/pr-1351/kanvas/reference/supported-formats/).

## Import a file as a new design or merge it

When the canvas is empty, import loads the new design. When a design is open, the dialog offers **Import as new** and **Merge into current**.

- **Import as new** saves the file as a design and opens it. If the open design has unsaved changes, the browser asks you to confirm before leaving. Declining cancels the load, but the imported design stays saved in your account.
- **Merge into current** saves the file as its own design, then appends its components and relationships to the open design.

Files dropped on a non-empty canvas raise a **Merge Design** prompt that names the incoming design and its component count. It offers Cancel, Open as new, and Merge into current. Cancel does not delete the design the import already saved.

Dropping several files imports each as a separate design. The import dialog processes a single file at a time.

## How a merge behaves

Merging happens in the editor and changes only the open design.

- **Identity.** Every component and relationship in the incoming design receives a new identifier. Kanvas does not match or de-duplicate against existing components, so merging the same design twice doubles its components.
- **Preserved.** Names, kinds, configuration, styles, and the internal layout of the incoming block.
- **Placement.** The block's top-left corner moves to the drop position when you dropped a file. Otherwise it lands 50 pixels right and 50 pixels down from its original coordinates, and it can overlap existing components.
- **Not carried over.** The incoming design's name, id, version, visibility, catalog data, layer preferences, and workspace. The open design keeps its own.
- **After the merge.** Relationship evaluation runs as for any edit, and autosave persists the result after three seconds. If the merged design exceeds your plan's component limit, the save fails and the merged components remain unsaved on the canvas. See [Save Designs](/pr-preview/pr-1351/kanvas/guides/designs/saving-designs/).

Merging needs no permission key, but the incoming design must be one you can read: your own, public, published, or shared with you.

## Where the imported design lands

The imported design is owned by you, placed in your selected workspace, public, at version 0.0.1, and records its detected source type. Imports from a GitHub repository are the exception: each file becomes a private design named after the file. The design records the repository and file path it came from, and the imported file itself is stored with the design. Re-importing, refreshing, and viewing that source are covered in [Connect GitHub](/pr-preview/pr-1351/cloud/guides/integrations/github-integration/#manage-imported-designs). GitHub imports read each file from the repository's default branch. The stored file is not offered for download, so exporting still produces a new file from the current design. Invalid files in a selection are reported per path and do not stop valid files from importing.

The components-per-design plan limit applies to URL imports and to every save. GitHub imports are not checked at import time. They are checked the first time the design is saved.

## URL import limits

The server fetches a URL under these limits:

- Only http and https, checked again on every redirect, with at most 5 redirects.
- 10 seconds to connect and 30 seconds for the request.
- 16 MiB maximum body.
- Destinations that resolve to loopback, private, or link-local addresses are refused.

## Failures

Every failed import shows the same message, `Failed to import design "<name>"`, whether the cause is an unrecognized format, an invalid archive, a plan limit, or an unreachable server. Nothing is saved when the server rejects the file. A failed merge shows `Failed to merge design: <reason>`.

Files dropped on the canvas follow separate rules. Images and `.txt` files become canvas objects, not designs, and files over 500 KB are rejected whatever your plan. Archive types RAR and 7Z pass the drop check but fail at import. Other file types are ignored without a message.

## Related

- [Save Designs](/pr-preview/pr-1351/kanvas/guides/designs/saving-designs/) covers plan limits and failures after an import.
- [GitHub Integration](/pr-preview/pr-1351/cloud/guides/integrations/github-integration/) covers connecting a repository.

