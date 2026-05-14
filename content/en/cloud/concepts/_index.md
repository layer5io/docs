---
title: Concepts
weight: 2
draft: false
description: >
  An overview of Layer5 Cloud concepts and their relationships.
---

The Layer5 Cloud provides a comprehensive suite of management tools for cloud-native infrastructure. Understanding the core entities and how they interact is essential for effectively managing your service meshes, clusters, and designs.

## Core Entities

The following concepts form the foundation of the Layer5 Cloud ecosystem:

* **Workspaces:** Logical isolation boundaries for organizing team members, environments, and resources.
* **Environments:** Specific deployment targets (e.g., Development, Staging, Production) within a Workspace.
* **Designs:** Visual representations of your infrastructure patterns and service mesh configurations.
* **Catalogs:** Repositories of reusable patterns and best practices shared across the community or organization.

![concepts-overview](images/concepts-overview.svg "image-center-shadow")

This section explains the underlying concepts of Layer5 Cloud — the building blocks that the rest of the documentation assumes you understand.

- [Spaces](spaces/) explains workspaces, environments, and workspace management.
- [Identity and Security](identity-and-security/) explains organizations, teams, users, access control, roles, keychains, keys, tokens, and sessions.
- [Meshery Server Registration](meshery-server-registration) — How a Meshery Server registers itself with Layer5 Cloud as its Remote Provider, how Cloud identifies an existing registration, and what fields are preserved across re-registration.

---

### Understanding Relationships

To get the most out of Layer5 Cloud, it is important to understand how these components interact:

| Concept | Relationship | Purpose |
| :--- | :--- | :--- |
| **User to Workspace** | Many-to-Many | Users can collaborate across multiple isolated workspaces. |
| **Workspace to Environment** | One-to-Many | A single workspace can host multiple environments for lifecycle management. |
| **Design to Catalog** | Many-to-One | Designs can be published to a catalog for broader consumption and version control. |

### Next Steps
For a deeper dive into the technical implementation of these concepts, please refer to our [Architecture Documentation](/docs/architecture).
