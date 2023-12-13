---
title: Managing Team Permissions
description: >
  Complete list of default permissions granted to Team Admin and Team Manager roles.
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


_The default permissions can be adjusted through granular permissions using [keys](/cloud/security/keys/) and [keychains](/cloud/security/keychains/), note that certain permissions marked with * are only allowed if you're the organization owner._
