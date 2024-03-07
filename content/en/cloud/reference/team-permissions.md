---
title: Default Team Permissions
description: >
  Complete list of default permissions granted to Team Admin and Team Manager roles.
weight: 2
categories: [Identity]
tags: [teams]
---
The following list is the default permissions granted to Team Admin and Team Manager roles.

| Permissions                                                     | Team Admin  | Team Manager |
|-----------------------------------------------------------------|-------------|--------------|
| Delete team                                                     | ✅*        | ❌           |
| Transfer team ownership to another member of team               | ✅*        | ❌           |
| Add (invite) people to their team (must be member of their org) | ✅         | ✅           |
| Remove people from their team (should be member of their org)   | ✅         | ✅           |
| View all team members                                           | ✅         | ✅           |
| Assign/unassign Team Admin role to team members                      | ✅*        | ❌           |
| Assign/unassign Team Manager role to team members                    | ✅*        | ❌           |
| Assign roles to team members                                    | ✅         | ✅           |
| Assign keys and keychains to the team members                   | ✅         | ✅           |

{{< alert title="*Organization Owner" type="warning" >}}
_Permissions marked with * apply only if you are the owner of the organization._{{< /alert >}}

{{< alert title="Customizable Permissions" type="info" >}}Default permissions can be easily customized by simply creating your own [keychains](/cloud/security/keychains/) and [roles](/cloud/security/roles).{{< /alert >}}