---
title: Security
description: Manage identity and access through Tokens, Keychains, Keys, and RBAC Roles.
weight: 4
draft: false
categories: [Security]
tags: [permissions, identity, authentication]
---
Layer5 Cloud provides a multi-tenant security model designed to manage access across complex organizational structures. This section covers the core components of our Identity and Access Management (IAM) system.

## Security Architecture

The following diagram illustrates the relationship between Organizational Units, Roles, and the underlying Permissions:

![permission](/cloud/security/images/permissions.svg "image-center-shadow")

---

## Organizational Units
Layer5 Cloud uses a hierarchical structure to isolate resources and manage users at scale:
* **Provider Organizations:** The top-level entity that can manage multiple tenant organizations.
* **Tenant Organizations:** Individual customer or project-specific organizations (e.g., Layer5, Intel).
* **Teams:** Logical groupings of users within an organization to facilitate collaborative management.
* **Users:** Individual accounts that are members of teams and organizations.

## Roles and Access Control
Access is granted through Role-Based Access Control (RBAC). Roles are assigned at different levels of the organizational hierarchy:
* **Organization Administrators:** Full control over an entire tenant organization.
* **Organization Billing Managers:** Access restricted to subscription and financial management.
* **Team Administrators:** Management of specific team resources and memberships.

## Key Management and Tokens
Beyond structural roles, Layer5 Cloud uses cryptographic and session-based security:

### Keychains
Keychains are collections of keys used to manage environment-specific access and signing. They allow for the logical grouping of related security credentials.

### Keys
Keys are the atomic unit of access control within the system. They are used for secure communication between Meshery and Layer5 Cloud, as well as for signing design patterns.

### Tokens
Tokens provide temporary, secure access to the platform.
* **Session Tokens:** Used for web browser authentication.
* **Personal Access Tokens (PATs):** Used for programmatic access via CLI or CI/CD pipelines.

---

### Need more detail?
Check out the [Roles Reference](/docs/security/roles) for a complete matrix of permissions for each role.
