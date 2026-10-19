# Delete a Design


> Permanently delete a design you own, and understand what deletion does and does not affect.


Deleting a design removes the design record and its workspace mappings in one transaction. There is no trash and no restore. Export a copy first if you might need it. See [Export Designs](/pr-preview/pr-1344/kanvas/guides/designs/export-designs/).

## Who can delete

The server allows the design's owner or a provider administrator. Organization administrators, workspace owners, and collaborators with a share grant cannot delete a design (403 "unauthorized for the operation"). Layer5 Cloud hides its Delete action for roles without the Delete a Design permission, but the server decides by ownership, not by the key. To remove a design from a workspace without deleting it, use the workspace's remove action instead.

## Delete from Kanvas

Delete is a File menu action, disabled on an empty canvas. A confirmation reads `Delete <name> design` with the text `Are you sure you want to delete <name>?`. You confirm with a single button. There is no type-to-confirm step.

If you delete the open design, the editor resets to a new blank design. Deleting a different design from a list does not change the canvas. Kanvas shows no success message for a delete, while Layer5 Cloud shows `<name> deleted`.

## What deletion affects

| Item | Effect |
|---|---|
| Deployed resources | None. Deleting does not undeploy anything from clusters. [Undeploy](/pr-preview/pr-1344/kanvas/guides/deploying/undeploying-designs/) first if you want the resources gone. |
| Clones, Save as copies, merged-in components | Untouched. They are independent. |
| Share grants | Removed with the design. |
| Collaboration session | Ends when the canvas resets. |
| Published design | A delete-from-catalog workflow runs against the catalog repository. If it fails, the failure is logged only. The catalog request record stays. |
| Catalog clones made by others | Remain. |

An event records who deleted which design.

## Delete several designs

Layer5 Cloud's catalog designs table offers multi-select delete with the prompt `Are you sure that you want to delete <N> designs?`. It issues one delete per selected design, so a partial failure shows per-design errors. Kanvas has no multi-select delete.

## Errors

| Response | Cause |
|---|---|
| 400 "please provide a valid design ID" | The id is invalid. |
| 404 "design not found" | The design does not exist. A missing row can also surface as 500 "failed to get design from database". |
| 403 | You are not the owner or a provider administrator. |

