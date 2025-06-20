---
title: Managing Workspaces
description: "Learn how to create, edit, delete, and configure your Workspaces."
weight: 7
categories: [Spaces]
---

This guide walks you through the practical steps of managing your Workspaces. Here, you'll learn how to create, edit, and delete Workspaces, as well as how to manage access by assigning teams and resources like Environments/Designs/Views to them.

If you're new to the concept of Workspaces, we recommend starting with the [Workspaces Overview](https://docs.meshery.io/concepts/logical/workspaces) to understand what a Workspace is and how it relates to key components like Environments, Designs, and Teams.

{{< alert type="info" title="A Note on Permissions" >}}
Every action described in this guide is governed by roles and permissions. To see a detailed breakdown of what your assigned role allows you to do, please refer to the [Default Permissions](https://docs.layer5.io/cloud/reference/default-permissions/) documentation.
{{< /alert >}}

### View Workspaces

The [Workspaces page](https://cloud.layer5.io/spaces/workspaces) is where you can see all of the workspaces within the currently selected organization.

To suit different workflows, you can switch between two distinct layouts: a visual grid view and a detailed table view.

#### Grid View
The grid view offers a card-based layout, perfect for quickly identifying workspaces at a glance. Each card displays essential information, and you can flip it to reveal management options like editing or deleting and get audit hisdtory.
![](/images/grid-view.png)

#### Table View
The table view provides a dense, list-based format that is ideal for managing a large number of workspaces. This view allows for sorting and gives you more control over the specific details you see.

To customize the information displayed, click **View Columns** icon and select the attributes you want to see, such as Owner Id or Created Date.

![](/images/table-view.png)

{{< alert type="info" title="Consistent Actions Across Views" >}}
Both the grid and table views provide the same set of management capabilities. You can choose the layout that best fits your needs without losing any functionality.
{{< /alert >}}

### Create Workspace

You can create new workspaces to organize your resources and teams.

{{< alert type="info" title="Consistent Actions Across Views" >}}
Only users with the Workspace Admin or Organization Admin role can create new workspaces.
{{< /alert >}}

To create a workspace:

1. Click the **+ Create** button to open the creation dialog.
2. From the dropdown menu, select the **Organization** that will own the new workspace. The chosen Organization **cannot be** changed after the workspace is created. Please select carefully.
3. Enter a descriptive **Name** and an optional **Description**.
4. Click **Save**.
5. Your new workspace will now appear on the page.

![](/images/create-workspace.gif)

### Edit a Workspace

You can modify a workspace's name and description at any time after it has been created.

  - **From the Grid View:** Hover over the workspace card to flip it, then click the **pencil icon**.
  - **From the Table View:** Click the **pencil icon** in the row of the workspace you wish to modify.

After clicking the icon, a dialog will appear where you can update the workspace's details.

![](/images/edit-workspace.gif)

### Workspace Deletion Behavior
When a Workspace is deleted:

- Deletion is **permanent and irreversible**. Proceed with caution.
- Before deletion, users have the option to transfer associated Designs and Views to another Workspace.
- If no transfer is made, all associated Designs and Views will be permanently deleted along with the Workspace[^1].
- Any associated Teams or Environments will be detached from the Workspace but will remain available for reassignment.

{{< alert type="warning" title="What Happens When a Workspace is Deleted?" >}}
Deleting a Workspace will permanently remove the Workspace itself and its associated Designs and Views, unless they are transferred beforehand. Teams and Environments will remain intact but will no longer be associated with the deleted Workspace.
{{< /alert >}}

### How to Delete Workspaces
Dissolve workspace and all team and environment memberships. Leave associated resources intact

在grid view，先点击卡片翻转，再点击垃圾桶图标，删除
或者选中checkbox，可以多个一起删除
在table view 点击删除

删除的动图，两种方式都展示一遍
![]/images/delete-workspace.gif

每个账户都会有一个默认的叫my workspace
可以创建多个，可以修改，但是不可以删除到一个workspace都没有
Workspace Delete Error: cannot delete workspace: at least one workspace must exist for the organization

级联删除？试试看到时候 没实现。。加一个角标

### Assign team to workspace Remove team from workspace

Add new team to workspace
Remove team from workspace

关于assign team的限制，查看 https://docs.layer5.io/cloud/spaces/workspaces/

步骤
1.点击design/view（grid view）
进入assign team的model

1.点击assign team icon（table view），首先会展示已经assign的team的表格
再点击左上角的assign team按钮，进入assign team的model

2.assign/unassign：选择你想要转移的team，点击》（assign）或者《（unassign）按钮来转移，或者按》》和《《来全部转移
之后点击save

alert：多个team可以被assign到多个wrokspcae，team中的成员可以访问所有workspace中的design/View，不管是public还是pricvate的

动图：/images/assign-teams.gif

### Assign Designs/Views/Environment to Workspaces Remove from Workspaces（主要是举动，和怎么做，关于具体的概念和限制，要查看另外的文档）

步骤和之前assign team类似，

1.assign envirooment （https://docs.layer5.io/cloud/spaces/environments/）
/images/assign-designs-views.gif
Add new environment to workspace
Remove environment from workspace

2.由于规定，disgn/view比如属于一个workspace，所以design一旦被创建完毕就会出现在你的一个workspcae中，
如果你想要assign你的design到别的worksapce
design和view是必须存在于workspace里面的，所以创建的会默认到一个workspace里面
Assign designs to workspaces
Remove designs from workspaces
/images/assign-designs-views.gif

可以移动重新assign

alert；关于assign xxxx 的限制，查看 https://docs.layer5.io/cloud/spaces/workspaces/

### audit of workspace - Recent Activity

什么样子的activity会被记录：创建/edit/assign/unassign xxx 所有和workspace有关的活动类型
下面会显示最新的update日期和create日期
/images/security-audit.png

最后
alert：想要了解全流程的从创建org到team到workspace的流程，查看：https://cloud.layer5.io/academy/learning-paths/mastering-meshery/introduction-to-meshery?chapter=using-workspaces-effectively

[^1]: This functionality is not fully implemented yet. Users might occasionally observe that designs and views are preserved after Workspace deletion.