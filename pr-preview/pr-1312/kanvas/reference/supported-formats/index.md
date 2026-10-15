# Supported Import and Export Formats


> Every file format Kanvas accepts on import and produces on export, with detection rules, limits, and what each format keeps.


This page lists exactly what Kanvas accepts and produces. For the steps, see [Import and Merge Designs](/pr-preview/pr-1312/kanvas/guides/designs/import-designs/) and [Export Designs](/pr-preview/pr-1312/kanvas/guides/designs/export-designs/).

## Import

Kanvas accepts the extensions `.yml`, `.yaml`, `.json`, `.tar`, `.tar.gz`, `.tgz`, `.gz`, and `.zip`. Detection is by content and takes the first match in the order below.

| Order | Format | Extensions | Detected when | Notes |
|---|---|---|---|---|
| 1 | Meshery design | `.yml` `.yaml` `.json` | The schema version is a supported design version | Lossless round trip of a design file export |
| 1 | Meshery design as OCI image | `.tar` `.tgz` `.tar.gz` `.zip` | The archive's layers contain a design file | Only the first design is taken. Other layer files are ignored. No design file means failure. |
| 2 | Kubernetes manifest | `.yml` `.yaml` | One or more valid Kubernetes documents | Multi-document files work. Unknown kinds are kept as generic objects. |
| 3 | Helm chart | `.tgz` `.tar.gz` `.gz` `.tar` `.zip` | A valid packaged chart | An uncompressed `.tar` is reported as needing gzip. No values overrides. |
| 4 | Docker Compose | `.yml` `.yaml` | Converts as a Compose file | The result is Kubernetes components. |
| 5 | Kustomize | `.yml` `.yaml` (kustomization), or an archive containing `kustomization.yaml` | The project builds | Archive must contain every referenced file. |

If nothing matches, the import fails and lists why each format was rejected. The interface shows only the generic failure message.

### Import sources

| Source | Supported | Limits |
|---|---|---|
| Local file in the import dialog | Yes | One file at a time. No size limit in the client. |
| Single-file http or https URL in the import dialog | Yes | 16 MiB body, 5 redirects, 10 second connect, 30 second request. Internal addresses are refused. |
| Drag or paste on the canvas | Yes | One design per file. Images and `.txt` files become canvas objects, limited to 500 KB on every plan. |
| Catalog clone or open | Yes | Public or published designs only. |
| Files and folders in a repository connected through the GitHub integration | Yes | One private design per valid file. |
| Git clone URL, Helm repository URL, `oci://` reference, directory, or pasted text | No | |
| RAR and 7Z archives | No | The drop check lets them through and the import fails. |

## Export

| Output | Keeps layout, annotations, metadata | Re-importable | Notes |
|---|---|---|---|
| Design file (YAML) | Yes | Yes, lossless | Downloads as `<design name>.yml`. |
| Design (OCI image) | Yes | Yes | Archive of an OCI image. Push it with a registry tool. |
| Kubernetes manifest | No | Resources only | Plain Kubernetes YAML. |
| Helm chart | No | Resources only | `.tar.gz` chart archive. |
| Embeddable JavaScript module | Canvas snapshot | No | Static snapshot for web pages. See [Embed Designs](/pr-preview/pr-1312/kanvas/guides/designs/embedding-designs/). |
| View as JSON | Not applicable | No | Operator mode only. Downloads as `<view name>.json`. |

The canvas screenshot (a PNG picture, not a design file) is a separate action. See [Canvas Actions](/pr-preview/pr-1312/kanvas/reference/canvas-actions/). Not available: Docker Compose export, SVG image export, export of an earlier version, and per-format export options. The catalog's light and dark snapshot images are produced by an automated workflow after publishing and are not user exports.

## Format by operation

| Format | Import | Export |
|---|---|---|
| Meshery design (YAML or JSON) | Yes | Yes (YAML) |
| Meshery design (OCI image) | Yes | Yes |
| Kubernetes manifest | Yes | Yes |
| Helm chart | Yes | Yes |
| Docker Compose | Yes | No |
| Kustomize | Yes | No |
| JavaScript embed | No | Yes |

