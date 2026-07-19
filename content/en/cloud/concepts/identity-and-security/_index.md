---
title: Identity and Security
linkTitle: Identity and Security
description: >
  Organizations, teams, users, roles, keychains, keys, sessions, and tokens.
weight: 3
categories: [Identity, Security]
tags: [permissions, identity, authentication]
aliases:
  - /cloud/identity/
  - /cloud/security/

---

Organizations are the basic unit of multi-tenancy inside of Layer5 Cloud. The identity structure is highly flexible: organizations can have any number of teams, teams can have any number of users, and users can belong to any number of teams and organizations.

Below is an overview of the core identity components within the Layer5 Cloud.

## Identity

Organizations serve as the fundamental component of multi-tenancy within the Layer5 Cloud.

They act as the top-level parent entity. All users and teams ultimately roll up to an organization. While Free plan users are limited to a single default organization, enterprise environments can leverage organizations to strictly isolate resources, billing, and access control across entirely different business units.

Outside of grouping users together, teams offer controlled access to workspaces and to workspace resources such as environments and managed and unmanaged connections.

Administrators can create teams as child units below the top-level organization. This allows you to apply unique settings, permissions, and workspace access to a specific set of users without altering the parent organization's settings.

Each user account represents an individual collaborator. Individual user accounts exist beyond the bounds of organizations.

Anyone who uses Layer5 Cloud signs into a user account, which acts as your sovereign identity. Your user account can independently own resources such as workspaces, designs, connections, and tokens. Any action taken on the platform is directly attributed to your individual user account, regardless of which teams or organizations you belong to.

## Organizational Units

Layer5 Cloud uses a hierarchical structure to isolate resources and manage users at scale:

* **Provider Organizations:**  The top-level entity that can manage multiple tenant organizations.
* **Tenant Organizations:** Individual customer or project-specific organizations (e.g., Layer5, Intel).
* **Teams:** Logical groupings of users within an organization to facilitate collaborative management.
* **Users:** Individual accounts that are members of teams and organizations.

## Role and Access Control

Access is granted through Role-Based Access Control (RBAC). Roles are assigned at different levels of the organizational hierarchy:

* **Provider Administrators:** Management of provider-level settings and tenant organizations.
* **Organization Administrators:** Full control over an entire tenant organization.
* **Organization Billing Managers:** Access restricted to subscription and financial management.
* **Team Administrators:** Management of specific team resources and memberships.
* **Workspace Administrators:** Management of workspace-level resources and access.

![permission](images/permissions.svg "image-center-shadow")

## How Identity, Access, and Authorization Fit Together

It is tempting to assume that organization membership alone decides what a user can see and do. It does not. Identity, access, and authorization in Layer5 Cloud are decided by a *combination* of three independent mechanisms that compose on top of the organization:

* **Authentication — the organization's connected identity provider (IdP).** Each organization is connected to an identity provider that establishes *who* a user is. More than one organization can — and commonly does — share the same identity provider. An organization may instead **bring its own** identity provider (BYOC), in which case it authenticates against its own dedicated provider. See [Identity Services]({{< ref "cloud/guides/self-hosted/planning/identity-services/index.md" >}}).
* **Generic authorization — keys → keychains → roles.** Permission [keys]({{< ref "cloud/concepts/identity-and-security/keys.md" >}}) roll up into [keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}), which are assigned to [roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}), which are assigned to users. This decides *what operations* a user may perform — and it is evaluated per organization. The same person can hold different roles, and therefore a different effective set of capabilities, in each organization they belong to.
* **Resource sharing and access mappings (granular access to a specific resource).** A specific resource (for example, a single design) can be shared with an individual user. These mappings grant access to that one resource and **deliberately cross organizational boundaries**: a user does not need to be a member of an organization to open a resource in it when a mapping grants that access. This is by design — it is what makes cross-organization collaboration possible.

The practical consequence is that the same human can be a member of several organizations and have a *different* set of capabilities in each, while also being able to reach individual shared resources in organizations they do not belong to at all.

## Security Boundaries

Because identity and authorization are layered, "where is the boundary?" has two complementary answers, depending on which layer you mean.

**The organization is the unit of tenancy and the core security boundary.** Everything else — teams, workspaces, roles, keychains, keys — composes on top of the organization. Resources, billing, and access control are isolated per organization.

**From the authorization perspective, an organization context is itself a boundary.** Because keys, keychains, and roles are evaluated per (user, organization), a user acting in the context of one organization has an independently scoped set of capabilities from the same user acting in another — including when those organizations are reached through different per-organization subdomains. Operating "inside" one organization's subdomain does not carry a user's permissions from another organization with them.

**From the host perspective, the authentication boundary is set by the connected identity provider — not by the shape of the URL.** Layer5 Cloud organizations may be reached on the canonical host, on a custom subdomain that sits under the same parent (base) domain as that canonical host, or on a fully custom domain on a different base domain. Across all of these:

> **Same identity provider source means the same security boundary.**

Organizations that share an identity provider — typical for the canonical host and for custom subdomains that use the shared, central provider — sit within the *same* authentication boundary. An organization that brings its own identity provider (BYOC) is a *distinct* authentication boundary, regardless of how its host is named. The DNS shape of the host is not the boundary; the identity provider behind it is. See [Identity Services]({{< ref "cloud/guides/self-hosted/planning/identity-services/index.md" >}}) and [Social sign-in on a custom domain]({{< ref "cloud/guides/self-hosted/white-labeling/_index.md#social-sign-in-on-a-custom-domain" >}}) for how this plays out across host types.

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

### Need more detail?

Check out the [Roles Reference]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}) for a complete matrix of permissions for each role.
