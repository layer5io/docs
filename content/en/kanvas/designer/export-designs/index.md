---
title: Exporting Designs
description: >
  How to export your designs for backup, sharing or offline use.
weight: 8
categories: [Designer]
tags: [designs, export]
aliases:
  - /meshmap/designer/export-designs
# Should this page ever be relocated, please create a redirect link from the old location to the new location or backlinks like the one below will break.
# https://github.com/layer5labs/meshery-extensions/tree/master/kanvas/src/components/designer/drawer/ComponentDrawerTabContent/exportModal.js
#
# The explicit heading IDs below (#exporting-as-a-design-file, #exporting-as-an-oci-image,
# #exporting-as-embedding, #exporting-in-a-source-type-format) are linked to from inside the
# product and from the Features & Permissions sheet. Do not rename or remove them; add a new
# ID alongside if a section is retitled.
---

Kanvas lets you export a design in several formats, so you can:

* keep versioned backups  
* collaborate offline  
* push artifacts to OCI-compatible registries or Helm repositories  
* integrate designs into CI/CD or GitOps pipelines  
* embed interactive diagrams in documentation and blogs  

## Export in Two Steps

1. Open the export menu 
   Within the [Kanvas Designer](https://playground.meshery.io/extension/meshmap), select the design you wish to export in the design drawer. Click on the export icon in the menu for the selected design. 
2. Pick an export format 
   Choose the option that matches your workflow (see table below).

![Export Icon](images/export-modal.gif)

## Quick Reference: Export Formats

| Format                          | Keeps full design metadata? | Typical uses                                       |
|---------------------------------|-----------------------------|----------------------------------------------------|
| Design (YAML)           | ✔                           | Backups, sharing, re-import into Kanvas           |
| Design (OCI image)      | ✔                           | Store in Docker Hub/GHCR; registry-based versioning|
| Kubernetes Manifest (YAML)      | ✖ (lossy)                   | `kubectl apply`; raw K8s deployment                |
| Helm Chart (.tar.gz)            | ✖ (lossy)                   | Helm repos, GitOps (Argo CD/Flux), Artifact Hub    |
| Embed Design (JS snippet)       | -                           | Interactive diagrams in docs or dashboards         |

## Detailed Format Guide

### Design (YAML) {#exporting-as-a-design-file}

Exports a complete, lossless copy of your design.  
This format preserves all Meshery-specific metadata, including:

- Visual layout  
- Annotations and comments  
- Component grouping and configuration  

Use it to back up or move designs between Meshery instances. The file is saved as `<design-name>.yml`.

### Design (OCI Image) {#exporting-as-an-oci-image}

Exports your design as an OCI-compliant container image.  
This format preserves all design metadata, just like the Design (YAML), but in a form suitable for container registries.

When to use:

- Version and distribute your design via Docker Hub, GitHub Container Registry, AWS ECR, etc.  
- Integrate with registry-based workflows or team collaboration tools  
- Store designs alongside application artifacts

The exported file is named `<design-name>.tar`, and can be pushed using tools like `docker push` or `oras push`.

### Source-Type Formats {#exporting-in-a-source-type-format}

A design can also be exported back out as the kind of source it was built from. Two source types are supported: **Kubernetes Manifest** and **Helm Chart**. Both are lossy - the Kanvas-specific layout, annotations, and comments are dropped, because neither format has anywhere to carry them.

Docker Compose is an *import* source only. There is no Docker Compose export; converting a design to Compose is not supported.

#### Kubernetes Manifest (YAML)  *Lossy Export* {#exporting-as-a-kubernetes-manifest}

Exports your design as raw Kubernetes YAML files, ready to apply with `kubectl`.

Best used when:
- You want to deploy directly to a cluster
- You're integrating with CI/CD tools that expect plain manifests
- You no longer need visual layout, annotations, or design metadata

This format strips out Meshery-specific context and includes only standard Kubernetes resource definitions.

> If you want to preserve the full editable design, use **Design (YAML)** instead.

#### Helm Chart (.tar.gz)  *Lossy Export* {#exporting-as-a-helm-chart}

Packages your design as a standard Helm chart archive (`.tar.gz`).

Best used when:
- You want to deploy via Helm (`helm install`)
- You're working with GitOps tools like Argo CD or Flux
- You plan to publish to a Helm repository or Artifact Hub

This format includes only Kubernetes resource definitions.  Design layout, annotations, and other Meshery-specific metadata will not be included.

> If you want to keep your design fully editable in Meshery, use **Design (YAML)** instead.

### Embed Design (JavaScript Snippet) {#exporting-as-embedding}

Exporting your design as an embedding allows you to integrate it into websites, blogs, or other platforms that support HTML, CSS, and JavaScript. 

The embedded design version offers a visually interactive representation of your design, making it easy to share with infrastructure stakeholders.
> [Learn more]({{< ref "kanvas/designer/embedding-designs/index.md" >}}) about Embedding Designs.

## Best Practices and Tips

| Need | Recommended format |
|------|--------------------|
| Preserve every design detail | Design (YAML) or OCI image |
| One-off deployment           | Kubernetes Manifest |
| Share a reusable package     | Helm Chart |
| Show an interactive diagram  | Embed Design |
| Publish to Helm repo         | Helm Chart (.tar.gz) |
| Store in container registry  | Design (OCI image) |

Note:
1. If you plan to keep editing in Meshery, avoid lossy formats.  
2. A Helm `.tar.gz` can be placed in any Helm repo and installed with `helm install`.  
3. An OCI image can be versioned and pulled just like an application image.

## Frequently Asked Questions

<details>
  <summary>Can I re-import a Helm Chart or Kubernetes manifest into Meshery for editing?</summary>
  
You can import the resources, but design-time metadata (layout, annotations) is lost, so the graph will not reappear as originally designed.
</details>

<details>
  <summary>What gets removed in a lossy export?</summary>
  
Layout coordinates, visual grouping, comments, and any Meshery-only metadata.
</details>

<details>
  <summary>Is the Helm `.tar.gz` ready for `helm install`?</summary>
  
Yes. After export, run `helm install <release> <chart.tgz>` or add it to a Helm repo.
</details>

<details>
  <summary>Should I use Helm Chart or OCI image for sharing?</summary>
  
Use Helm if your consumers deploy via Helm; use OCI if you rely on container registries for versioning.
</details>

<details>
  <summary>Do I need to be logged in to export a design?</summary>
  
No, login is not required. You can export as a guest user.
</details>

<details>
  <summary>Can I export someone else's published design?</summary>
  
Yes. Any published design can be exported, not just your own.
</details>

<details>
  <summary>Can I export an earlier version of a design?</summary>

No. Every export - in any format - is generated from the **current** state of the design. A design carries a single version number, which increments as the design is updated, and neither exporting nor downloading offers a way to ask for an earlier one.

The **View Save History** button in Kanvas (on the save-status indicator) shows the design's save history as a list of events. It is an audit trail of who changed the design and when; it is not a set of restorable snapshots, and you cannot export from it.

If you need a version you can come back to, export a copy at the point you care about - **Design (YAML)** or **Design (OCI image)** are the two lossless formats - and keep it, or push the OCI image to a registry under a tag.
</details>

<details>
  <summary>Where does the exported file go?</summary>
  
After export, your browser will either prompt you to choose a save location or automatically download the file to your default downloads folder.
</details>