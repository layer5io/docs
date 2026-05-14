---
title: Sharing a Workspace
description: >
  Learn how to control access to workspaces and their resources.
weight: 1
categories: [Tutorials]
tags: [workspaces, sharing, designs]
aliases:
  - /cloud/tutorials/sharing-a-workspace/
  - /cloud/guides/workspaces/sharing-a-workspace/

---
## Share designs from Workspaces

Five has been working in the `orbital-dev` workspace — a development sandbox with a local Kubernetes environment (kind) and LocalStack for AWS service emulation. Rex Park, a developer on the Orbital Labs Development team, needs access so he can deploy the `microservices-baseline` design and test his service changes without touching staging.

Here is how Five shares the `orbital-dev` workspace with Rex.

### Share a single design from orbital-dev

In your browser, go to [Layer5 Cloud](https://cloud.layer5.io).
1. Click the design you want to share (`microservices-baseline` in Five's case).
2. Click **Share**.
3. Enter Rex's email address (`rex@orbital-labs.example`).
4. Set the permission level — Five gives Rex **edit** access so he can deploy and modify the design.
5. Click **Send**.

![Flow for sharing designs](/cloud/concepts/catalog/images/Slide51.svg)

Rex receives an invitation and can now open `microservices-baseline` in the `orbital-dev` workspace.

{{< alert type="info" >}}
Sharing a single design gives the recipient access to that design only — not to the full workspace or its other designs. To give Rex access to everything in `orbital-dev`, Five asks Maya Chen (Org Admin) to assign the Development team to the workspace instead.
{{< /alert >}}

## Stop, limit, or change Workspace sharing

After you share a workspace, you can stop sharing at any time. You can also control whether the people you've shared with can edit, comment on, or further share your workspace.

If Five later wants to remove Rex's individual design access (for example, when the feature is merged and the design no longer needs collaborative review), he can:

1. Open the design and click **Share**
2. Find Rex in the list of people with access
3. Change Rex's permission to **No access** or click **Remove**

### Share and collaborate on a design with many people

**Important:**

At any time, a design can only be edited on up to 25 open tabs or devices. If there are more than 25 instances of the design open, only the owner and some users with editing permissions can edit the design. A single design can only be shared with up to 600 individual email addresses.

To share and collaborate on a design with a very wide audience:

#### Share without publishing

If you need multiple people to open a design without making it broadly discoverable, publish the design and then create a restricted link to share only with those who have access. You can grant edit access to people who need to edit or comment on the design. [Learn how to publish a design](#publish-the-design).

#### Publish the design

{{< alert type="info" title="When a design is Public" >}}
- When a design is published, viewers and commenters can view, download, and clone the design.
- Editors can change permissions and share the design with others.
- These permissions apply consistently to all public designs.

Note: **Published** and **Public** are distinct states. Publishing a design makes it available via a link; marking it Public makes it discoverable by anyone on the web or within your organization, depending on your account settings.
{{< /alert >}}

- If many people need to open a design, publish it and share the link. You can give edit access to people who need to edit or comment on the design.
- Depending on your account's settings, publishing a design makes it visible to everyone on the web, everyone in your organization, or a defined group.
- To remove a design from the web, stop publishing it.

### Stop sharing a design

If you share a design with people, the owner and anyone with edit access can change sharing permissions.

<details>
<summary>Delete a shared design</summary>

If you delete a shared design that you own:
- People who can view, comment, or edit can make a copy of the design until you permanently delete it.
- To permanently delete the design, click the design in your trash and click **Delete forever**.

</details>

### Anonymous or unknown users in a design

You might see "anonymous user" viewing your design. This can happen when a design is shared publicly or with anyone who has the link.

Someone you don't know might be viewing your design because:
- The design is shared with a mailing list.
- The design is shared with someone who doesn't have a Layer5 account or isn't signed in.
- Someone who can edit your design shared it further.

{{< alert type="info" >}}
See [Meet Five and the Cast](/cloud/getting-started/meet-five) for the full Orbital Labs workspace and character reference.
{{< /alert >}}
