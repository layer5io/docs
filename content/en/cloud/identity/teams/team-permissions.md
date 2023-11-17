---
title: Managing Team Permissions
description: >
  A short lead description about this content page. It can be **bold** or _italic_ and can be split over multiple paragraphs.
date: 2023-10-30
weight: 4
categories: [Identity]
tags: [teams]
---

| Permissions                                                     | Team Admin  | Team Manager |
|-----------------------------------------------------------------|-------------|--------------|
| Delete team                                                     | ✅*        | ❌           |
| Transfer team ownership to another member of team               | ✅*        | ❌           |
| Add (invite) people to their team (must be member of their org) | ✅         | ✅           |
| Remove people from their team (should be member of their org)   | ✅         | ✅           |
| View all team members                                           | ✅         | ✅           |
| Assign/unassign team Admin to team members                      | ✅*        | ❌           |
| Assign/unassign team Manager to team members                    | ✅*        | ❌           |
| Assign roles to team members                                    | ✅         | ✅           |
| Assign keys and keychains to the team members                   | ✅         | ✅           |

{{< alert >}}
1. these default permissions can be altered by granular permission using [keys](/cloud/security/keys/) and [keychains](/cloud/security/keychains/)
2. \* only allowed if org owner
{{< /alert >}}
