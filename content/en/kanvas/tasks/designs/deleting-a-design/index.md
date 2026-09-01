---
title: Deleting a Design
description: >
  Permanently delete a design you own, and understand how deleting differs from unpublishing a design or removing it from a workspace.
weight: 6
categories: [Designer]
tags: [designs]
---

Deleting a design removes it permanently. There is no trash, no recycle bin, and no undo: the design record is destroyed, and every workspace it was assigned to loses it at the same time. Before you delete, check that what you actually want is not one of the two softer actions described under [Related actions that are not deletion](#related-actions-that-are-not-deletion).

## Who Can Delete a Design

Deleting a design requires the **Delete a design** permission, and beyond that you must own the design. A user who holds the permission but is not the owner is refused - only the design's owner, or a provider administrator, can delete it.

If the **Delete** action is grayed out for you, your role does not carry the permission. See [Default Permissions]({{< ref "cloud/reference/default-permissions.md" >}}) for which roles hold it by default, and [Keychains]({{< ref "cloud/concepts/identity-and-security/keychains.md" >}}) for how an organization administrator can grant it.

## Deleting a Single Design

1. Go to [My Designs](https://cloud.layer5.io/catalog/content/my-designs) in Layer5 Cloud, or open the design's detail page.
2. Choose **Delete** from the design's actions.
3. A confirmation dialog opens, naming the design. Click **Delete** to confirm, or dismiss the dialog to cancel.

Once the deletion succeeds you are returned to **My Designs** and the design is gone from the list.

## Deleting Several Designs at Once

The table view of **My Designs** supports bulk deletion.

1. Switch to table view.
2. Select the rows you want to delete using the checkboxes.
3. Choose **Delete** from the bulk actions.
4. Confirm in the dialog, which names how many designs will be deleted.

Each design in the selection is deleted independently. If one of them fails - for example because you do not own it - the rest still go through, so check the list afterwards rather than assuming the whole batch succeeded.

## What Deletion Removes

- The design itself, including its design file, name, and metadata.
- Its assignment to **every** workspace it belonged to. Collaborators who reached the design through a shared workspace lose access to it, because there is nothing left to reach.

Deleting a design does not affect infrastructure. If the design was deployed, the deployed resources stay running in your clusters. [Undeploy]({{< ref "kanvas/tasks/designs/undeploying-designs/index.md" >}}) the design first if you want its resources removed as well - once the design is deleted, you no longer have the definition Meshery would need in order to undeploy it.

## Related Actions That Are Not Deletion

Two nearby actions are frequently mistaken for deletion. Neither destroys the design.

| Action | What it does | When to use it |
|---|---|---|
| **Unpublish** | Removes a design from the public catalog. The design remains in your account as a private design. | You want to withdraw a design from public view but keep it. |
| **Remove from workspace** | Unassigns the design from one workspace. The design and its other workspace assignments are untouched. | You want to tidy a workspace, not lose the design. |

Removing a design from a workspace is labelled **Delete** in the workspace's design table, and its confirmation dialog says "from workspace *name*". That phrase is the thing to check: if the dialog names a workspace, you are unassigning; if it does not, you are deleting the design outright.

{{< alert type="warning" title="Deletion is permanent" >}}
There is no recovery path for a deleted design. If you may want the design later, [export it]({{< ref "kanvas/designer/export-designs/index.md" >}}) as a **Design (YAML)** or **Design (OCI image)** file before deleting - both formats are lossless and can be imported back into Kanvas.
{{< /alert >}}
