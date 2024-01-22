---
title: Default Organization Permissions
description: >
  List of default permissions granted to the Organization Admin and Organization Billing Manager roles.
date: 2024-01-21
weight: 4
categories: [Identity]
tags: [orgs]
---

| Permissions                                                     | Org Admin  | Org Billing Manager |
|-----------------------------------------------------------------|------------|---------------|
| Create new user accounts                                        | ✅         | ❌           |
| Delete org                                                      | ✅*        | ❌           |
| Transfer org ownership to another member of the org             | ✅*        | ❌           |
| Add (invite) people to org                                      | ✅         | ❌           |
| Remove people from org                                          | ✅         | ❌           |
| Add (invite) people to all teams under org                      | ✅         | ❌           |
| Remove people from all teams                                    | ✅         | ❌           |
| Create and remove teams                                         | ✅*        | ❌           |
| CRUD on billing information (Subscription/Plans)                | ✅         | ✅           |
| Assign/unassign Org Admin to members of org                     | ✅*        | ❌           |
| Assign/unassign Org Billing Manager to members of org           | ✅*        | ❌           |
| View all organization members and teams                         | ✅         | ❌           |
| CRUD on workspaces                                              | ✅         | ❌           |
| Add or remove roles                                             | ✅*        | ❌           |
| Assign roles to members of org                                  | ✅         | ❌           |
| Add or remove keys and keychains                                | ✅         | ❌           |
| Create or remove secret teams                                   | ✅*        | ❌           |
| Create or remove child teams (hierarchical teams)               | ✅*        | ❌           |
| Assign keys and keychains to roles                              | ✅         | ❌           |
| Assign keys and keychains to teams                              | ✅         | ❌           |
| Approve/Deny requests (GitOps, Access, Publish etc)             | ✅         | ❌           |
| Set spending limits                                             | ✅*        | ✅           |
| Purchase new capabilities                                       | ✅*        | ✅           |
| Approve/Deny purchase requests for new capabilities             | ✅*        | ✅           |

{{< alert title="*Organization Owner" type="warning" >}}
_Permissions marked with * apply only if you are the owner of the organization._{{< /alert >}}

{{< alert title="Customizable Permissions" type="info" >}}Default permissions can be easily customized by simply creating your own [keychains](/cloud/security/keychains/) and [roles](/cloud/security/roles).{{< /alert >}}