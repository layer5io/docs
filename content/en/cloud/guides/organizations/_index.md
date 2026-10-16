---
title: Organizations
linkTitle: Organizations
description: >
  Guides for administering Layer5 Cloud organizations: lifecycle, branding, domains, sign-in, email, nesting, and recognition.
weight: 20
diataxis: how-to
categories: [identity]
---

These guides cover the administrator tasks for an organization, the tenant boundary in Layer5 Cloud. Each guide states which role it needs. For what an organization is and how it relates to teams, users, and roles, read the [Organizations concept]({{< ref "cloud/concepts/identity-and-security/organizations/_index.md" >}}).

| I want to | Go to | Role needed |
| --- | --- | --- |
| Create, edit, brand, switch between, or delete an organization | [Manage an Organization]({{< ref "cloud/guides/organizations/org-management/_index.md" >}}) | Organization Admin or Owner; Provider Admin for domains |
| Nest an organization inside another and delegate its administration | [Child Organizations]({{< ref "cloud/guides/organizations/org-management/child-organizations.md" >}}) | Create Organization in the parent |
| Send organization email through my own SMTP server | [Bring Your Own Mail Server]({{< ref "cloud/guides/organizations/org-management/bring-your-own-mail-server.md" >}}) | Organization Admin or Owner |
| Choose and set up a custom domain and identity provider | [Organization Configuration Scenarios]({{< ref "cloud/guides/organizations/configuration-scenarios/index.md" >}}) | Provider Admin for the domain, Organization Admin for providers |
| Create and award organization badges | [Recognize Members with Badges]({{< ref "cloud/guides/organizations/assigning-user-badges/index.md" >}}) | Manage Recognitions |

For the people side of an organization, see [Teams]({{< ref "cloud/concepts/identity-and-security/teams/_index.md" >}}), [Users]({{< ref "cloud/concepts/identity-and-security/users/_index.md" >}}), and [Roles]({{< ref "cloud/concepts/identity-and-security/roles/_index.md" >}}).
