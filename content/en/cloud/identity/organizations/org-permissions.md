---
title: Managing Organization Permissions
description: >
  A short lead description about this content page. It can be **bold** or _italic_ and can be split over multiple paragraphs.
date: 2023-10-30
weight: 4
categories: [Identity]
tags: [orgs]
---

| Permissions                                                     | Team Admin  | Team Manager |
|-----------------------------------------------------------------|-------------|--------------|
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

{{< alert >}}
1. these default permissions can be altered by granular permission using [keys](/cloud/security/keys/) and [keychains](/cloud/security/keychains/)
2. \* only allowed if org owner
{{< /alert >}}
