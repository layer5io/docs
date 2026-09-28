# Managing Environments


> Learn how to view, create, and edit Environments, and how to assign Connections to an Environment or remove them from it.


This guide walks you through the practical steps of managing your Environments. Here you will learn how to see the Environments in your organization, create and edit them, review the Connections that belong to an Environment, and assign or remove those Connections.

If you are new to the concept of Environments, start with the [Environments Overview](/cloud/concepts/spaces/environments/) to understand what an Environment is and how it relates to Connections, Credentials, and Workspaces.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">A Note on Permissions</h4>
  
      Every action described in this guide is governed by roles and permissions. Buttons and icons for actions you are not authorized to perform are disabled rather than hidden, and the Environments page itself is only reachable with the <strong>View Environment</strong> key. For a breakdown of what your assigned role allows, see <a href="/cloud/reference/default-permissions/">Default Permissions</a>.
  
</div>



## View Environments

The [Environments page](https://cloud.layer5.io/spaces/environments) - **Environment** in the Spaces navigation, alongside Overview, Workspaces and Integrations - lists every Environment in the organization you currently have selected. Switching organizations with the organization context switcher in the top navigation bar changes the list.

Environments are presented as cards, ten to a page, with pagination beneath the grid. Each card shows:

- the Environment's **name**
- its **description**, or *No description* when none has been set
- an **Assigned Connections** tile carrying the number of Connections currently in the Environment

Flip a card over to reveal its management actions - the **pencil** (edit) and **trash can** (delete) icons - along with the **Created At** and **Updated At** timestamps.

If the organization has no Environments yet, the page shows a **No environments available** empty state instead of the grid.

![The Environments page, showing an environment card with its name, its "No description" placeholder and the Assigned Connections tile, above the pagination control](images/environments-grid.png)

### Finding an Environment

Click the **magnifier** in the toolbar to expand the search box, then filter the list by name. Searching resets you to the first page of results, so a match on a later page is still found.


## View the Connections in an Environment

The **Assigned Connections** tile on an Environment card is both a count and a control. Clicking it opens the *&lt;Environment name&gt;* **Resources** dialog, which shows two lists side by side:

- **Available Connections (n)** on the left - Connections in the organization that are *not* in this Environment.
- **Assigned Connections (n)** on the right - the Connections that belong to this Environment.

The heading of each list carries its total, so the dialog answers "what is in this Environment, and what could be?" in one place. Both lists load twenty-five Connections at a time and fetch the next page as you scroll.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Connections, Credentials, and Access</h4>
  
      Assigning a Connection to an Environment implicitly makes its Credentials available too. Who can then use them is governed by the Workspaces the Environment is linked to - see <a href="/cloud/concepts/spaces/environments/#access-control-for-connections-and-credentials">Access Control for Connections and Credentials</a>.
  
</div>




## See the Environments in a Workspace

The Environments page lists every Environment in the organization. To see only the Environments that a particular Workspace can draw on, open the [Workspaces page](https://cloud.layer5.io/spaces/workspaces) and use that Workspace's **Environments** tile - the same control you use to link and unlink them.

See [Link Environments to a Workspace](/cloud/guides/workspaces/managing-workspaces/#link-environments-to-a-workspace) for the full procedure.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Many-to-Many Relationship</h4>
  
      An Environment can be linked to more than one Workspace, and a Workspace can have more than one Environment. An Environment that appears in no Workspace is still perfectly valid - it simply is not shared with any team yet.
  
</div>









<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Managed Environments Cannot Be Linked to a Workspace</h4>
  
      <p>Linking an Environment that Layer5 Cloud provisioned for your organization - the Environment behind your own identity providers, for instance - to a Workspace is refused. Linking one grants every member of that Workspace&rsquo;s teams read access to the Environment&rsquo;s Connections and the Credentials behind them, and your organization&rsquo;s identity-provider credentials are not shared that way.</p>
<p>Unlinking is not refused. If such an Environment was linked to a Workspace before this restriction existed, you can still remove it from that Workspace.</p>

  
</div>



## Create an Environment







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Permissions Required</h4>
  
      Creating an Environment requires the <strong>Create Environment</strong> key. Without it the <strong>Create</strong> button is disabled.
  
</div>



1. On the [Environments page](https://cloud.layer5.io/spaces/environments), click **Create**.
2. In the **Create Environment** dialog, confirm the **Organization** that will own the Environment. The select is pre-filled with the organization you currently have in context and lists every organization you are a member of, so change it here if the Environment belongs elsewhere. The field is required and is fixed once the Environment exists, so choose carefully.
3. Enter a **Name** (required) and an optional **Description**.
4. Click **Save**.

The new Environment appears in the grid with no Connections assigned. Assigning them is a separate step - see [Assign Connections to an Environment](#assign-connections-to-an-environment).

## Edit an Environment

You can change an Environment's name and description at any time.

1. Flip the Environment's card to its back face.
2. Click the **pencil** icon.
3. Amend the **Name** and **Description** in the **Edit Environment** dialog.
4. Click **Update**.

The owning **Organization** is fixed at creation and is therefore not offered for editing.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Editing Connection Membership</h4>
  
      The Edit dialog covers the Environment&rsquo;s own details only. Its Connection membership is edited from the <strong>Assigned Connections</strong> tile on the card, described next.
  
</div>



## Assign Connections to an Environment

1. Click the **Assigned Connections** tile on the Environment's card to open the **Resources** dialog.
2. Select one or more Connections in the **Available Connections** list on the left.
3. Move them across with the arrow buttons between the two lists:
    - **>** moves the selected Connections to **Assigned Connections**.
    - **>>** moves every available Connection across at once.
4. Click **Save**.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Why Move All is Sometimes Unavailable</h4>
  
      The <strong>&raquo;</strong> and <strong>&laquo;</strong> buttons act on the whole list, so they stay disabled until every page of that list has been loaded. Scroll to the bottom of the list to load the rest, or move your selection across with <strong>&gt;</strong> and <strong>&lt;</strong> instead.
  
</div>



**Save** stays disabled until you have actually changed something, and one **Save** commits every addition and removal you made in the dialog together.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Some Environments Are Managed for You</h4>
  
      <p>A few Environments are provisioned for your organization by Layer5 Cloud rather than created by someone in it, and they hold organization-level configuration Layer5 Cloud itself relies on - the Environment behind your organization&rsquo;s own identity providers is one. Their Connections are managed from the <a href="/cloud/guides/organizations/org-management/#configuring-identity-providers-bring-your-own-credentials">Identity Providers tab</a> of Edit Organization, so assigning or removing Connections here is refused.</p>
<p>You can still open such an Environment, see what belongs to it, and change its name and description. Only Connection membership, deletion, and linking it to a Workspace are declined.</p>

  
</div>



## Remove Connections from an Environment

Removal is the same dialog in the other direction:

1. Click the **Assigned Connections** tile on the Environment's card.
2. Select one or more Connections in the **Assigned Connections** list on the right.
3. Move them back with **<** (selected) or **<<** (all).
4. Click **Save**.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Removal Does Not Delete the Connection</h4>
  
      Taking a Connection out of an Environment only ends its membership of that Environment. The Connection itself, and any Credentials it uses, continue to exist and remain assigned to any other Environments they belong to. See <a href="https://docs.meshery.io/concepts/logical/connections">lifecycle of connections</a> in the Meshery documentation for what does delete a Connection.
  
</div>



## Delete an Environment

You can delete a single Environment or several at once.

- **A single Environment:** flip its card and click the **trash can** icon, then confirm in the **Delete Environment?** prompt. Deletion is irreversible.
- **Several Environments:** tick the bulk-select checkbox on the back face of each card you want to remove. A bar appears above the grid reporting how many are selected; click its delete icon and confirm.








<div class="alert alert-danger" role="alert">
<h4 class="alert-heading">What Happens When an Environment is Deleted?</h4>

    Deleting an Environment does <strong>not</strong> delete the Connections inside it. Connections that also belong to other Environments continue to belong to those Environments. The Environment is detached from any Workspaces it was linked to, and the resources it made available to those Workspaces stop being available through it.

</div>









<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Managed Environments Cannot Be Deleted Here</h4>
  
      <p>Deleting an Environment your organization did not create - one Layer5 Cloud provisioned to hold organization-level configuration, such as the Environment behind your own identity providers - is refused, whether you delete it singly or as part of a bulk selection. Use <strong>Delete All Identity Providers</strong> on the <a href="/cloud/guides/organizations/org-management/#configuring-identity-providers-bring-your-own-credentials">Identity Providers tab</a> instead, and the Environment is taken away with the configuration it holds.</p>
<p>This is why deletion is refused rather than the Environment simply being hidden: an Environment that still holds live configuration should not disappear from a grid where you can see everything else you own.</p>

  
</div>



While an Environment is bulk-selected its card cannot be flipped and its individual edit and delete icons are suppressed, so the bulk toolbar is the only way to act on it. Clear the selection to get the per-card actions back.

