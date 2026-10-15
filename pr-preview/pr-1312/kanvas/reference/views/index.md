# Operator Views


> What an Operator view stores, how views are saved, shared, opened, exported, and deleted, and who can do what.


A view is to Operator mode what a design is to Designer mode: a named, saved definition you reopen later. A view stores **which resources to show**, not the resources themselves. Opening a view re-applies its filters to the current inventory of your connected clusters.

## What a view stores

| Field | Content |
|---|---|
| Name | Defaults to `Untitled View`. Up to 255 characters. Not required to be unique. |
| Filters | Kinds, models, namespaces, labels, and the name search text. See [Filters](#filters). |
| Visibility | `public` or `private`. |
| Notes | Free text (Markdown) in the view's metadata, edited in View Info. |
| Owner, created, updated | Set by Layer5 Cloud. |

A view does not store layout, zoom, pan, or the selected resource. It does not store cluster selection either: the clusters selected in the Meshery context selector at the time you open the view always win. A copied link includes your current pan and zoom as URL parameters, but they are not saved in the view.

### Filters

| Filter | Matches |
|---|---|
| `kinds` | Resources of any listed Kubernetes kind. |
| `models` | Resources belonging to any listed model. |
| `namespaces` | Resources in any listed namespace, plus the Namespace objects themselves. |
| `labels` | Resources carrying any listed `key=value` label. |
| `search` | Resources whose name contains the text. |

Different filter types combine with AND. Values within one type combine with OR. A new empty view starts with kinds `Node` and `Namespace`.

### Design-scoped views

Choosing **View in Operator** from a design opens an unsaved view named `<design name>-View` whose only filter is the label `design.meshery.io/id=<design id>`. It shows exactly the resources that design deployed. The view is saved on your first filter or name change.

## Saving

Saving is automatic. Any filter change, cluster selection change, or rename saves the view after a three second pause. The first save creates the view; later saves update it. The toolbar shows `Saving...`, then `Saved`, or `Unable to save. Retrying...`. A failed save retries with doubling delays, up to 100 attempts.

Creating a view requires a concrete organization selected. Layer5 Cloud refuses creation when the organization selector is set to all organizations. Every view is created `public`, owned by the caller, and placed in the workspace you have selected for that organization (or your first workspace).

**Save as...** creates a new view with the same filters and the name `<current name>-copy` by default, owned by you, in your selected workspace, and opens it. The original is unchanged. The copy is created `public`; change its visibility afterward if you need it private. A **Clone** command and an **Import** command appear in the code but are not implemented, so Save as is the only way to duplicate a view.

## Opening and finding views

| Where | Result |
|---|---|
| File menu, **Open...** | Opens the Meshery workspace browser in Operator mode. It offers `Recents (Global)`, `My Views`, `Shared With Me`, and each workspace's Views tab. |
| Layer5 Cloud workspace | Views belong to exactly one workspace. Open the workspace and select the view. |
| Design file menu, **View in Operator** | Opens the design-scoped view. |

Non-administrators see views shared with them, public views, and their own private views. Provider administrators also see private views. Moving a view to another workspace needs the **Assign Views to Workspace** permission and is offered while browsing a workspace.

## Visibility and access

| Action | Public view | Private view |
|---|---|---|
| Open | Any user | Owner, users granted access, provider administrators |
| Edit filters, name, visibility, notes | Any signed-in user | Owner, users granted access, provider administrators |
| Share and unshare | Owner only | Owner only |
| Delete | Owner or provider administrator | Owner or provider administrator |







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Public views are editable by every signed-in user</h4>
  
      Layer5 Cloud does not check ownership or organization when a public view is updated. Anyone who can reach a public view can change its filters, name, and visibility. Keep a view private, or use <strong>Save as&hellip;</strong> and set the copy private, when others should not change it.
  
</div>



"Provider administrator" is the platform-level administrator role. It is not the organization administrator role.

## Sharing

The toolbar **Share** button opens the share dialog, the same one designs use. It has a **General Access** selector, a **People with Access** list, a user picker, and **Copy Link**.

| General Access setting | Visibility | Meaning |
|---|---|---|
| `Anyone with the link can edit` | public | Anyone with the link can open and edit. |
| `Only people with access can open with the link` | private | Only listed users can open it. |

Sharing offers a single implicit access level; there are no separate viewer and editor roles. Only the owner can change general access. Sharing sends email to new recipients, and is refused for anonymous sessions. The server requires the **Share Views** permission in the view's organization. Kanvas's own Share button checks the **Share Design** permission, so a role can see the button and still be refused by the server. See [Share a Design](/pr-preview/pr-1312/kanvas/guides/collaborating/sharing-designs/) for the dialog and its messages.

In Operator mode, the file menu's **Share...** item creates a new empty view instead of opening the dialog. Use the toolbar Share button.

## Export

**Export...** in the file menu downloads `<view name>.json`, containing the complete stored view: id, name, visibility, filters, metadata, owner, and timestamps. It is disabled for an unsaved view. Views cannot be imported back.

## View info

**Details** in the file menu (or **View Info** in a view list) shows Owner, Visibility, Notes, Created, and Updated. Everyone can read the notes. Only the owner can change visibility and notes, and only the owner sees **Save**. **Copy Link** is available to everyone.

## Delete

Delete removes the view with a soft delete. The server allows the owner and provider administrators. Anyone else receives a "no view with the requested id" error. The Meshery view list offers **Delete View** to the owner who holds the **Delete View** permission. Kanvas confirms with `Are you sure you want to delete <name>?` and shows no success or failure message afterward; the editor resets to a new empty view either way.

## Permissions and plans

The permission names for views are **View Views**, **Open view**, **Save Views**, **Clone Views**, **Share Views**, **Export views**, **Delete View**, and **Assign Views to Workspace**. Public and private views, view sharing, view export, and assigning views to workspaces are Team Operator plan features and above. Layer5 Cloud does not check most view permission names on the create, update, and delete routes; the access rules in the table above are what the server enforces. See [Permissions by Role](/pr-preview/pr-1312/kanvas/reference/permissions/) and [Feature Availability](/pr-preview/pr-1312/kanvas/reference/feature-availability/).

## Related

- [Operator](/pr-preview/pr-1312/kanvas/concepts/operator/) explains where the resources a view filters come from.
- [Resource Details](/pr-preview/pr-1312/kanvas/reference/resource-details/) covers what you see when you select a resource in a view.

