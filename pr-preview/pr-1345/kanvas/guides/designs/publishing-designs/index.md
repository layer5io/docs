# Publish Designs


> Publish a design to the Layer5 Cloud catalog, understand request and approval states, unpublish it, and ship it to Artifact Hub yourself.


Publishing makes a design discoverable in the Layer5 Cloud catalog, where anyone can view and [clone](/pr-preview/pr-1345/kanvas/guides/designs/cloning-a-design/) it. Publishing is separate from visibility: making a design public does not publish it.

## Visibility and publication states

| State | Who can read it | How it gets there |
|---|---|---|
| Private | Owner, provider administrators, and users with a share grant | Cloning, unpublishing, or switching a public design to private |
| Public | Anyone, including anonymous callers, who has the design's id or link | The default for every newly saved design |
| Published | Everyone through the catalog | An approved publish request, or a direct publish by an approver |

The owner can toggle a design between private and public until it is published. A published design cannot be toggled. The toggle saves through the normal save path, so it raises the version and re-checks the components limit.

## Publish a design

Publishing needs a signed-in account. Anonymous users see a "Sign in to publish" prompt. The Publish to Catalog action sits in the design's details, and is available from the Share menu. It is disabled until the design has loaded.

The form asks for:

- **Type:** the design category used for catalog browsing.
- **Compatibility:** the technologies the design applies to. Select at least one, or the form stops with "Please select at least one technology."
- **Pattern info:** the purpose and intended use.
- **Pattern caveats:** limitations, assumptions, and operational warnings.

Write for a reader who clones the design without your context. The form shows "Upon submitting your catalog item, an approval flow will be initiated." Once the design is published, the button reads "Published" and is disabled. Save stores catalog data and visibility without publishing.

Publishing needs the Publish Design permission in the interface. The server accepts any caller who passes the checks below.

## What happens on submit

The server requires a catalog data object, lowercases the type and compatibility values, and sets the light and dark snapshot image URLs from the design id. A design that already has a publish request in any state (pending, approved, or denied) is rejected with `catalog request for content with id "<id>" already exist from user <name>`. That includes a design whose earlier request was denied or whose publication was later removed.

Then the outcome depends on your role:

| Your permission | Outcome |
|---|---|
| Approve Catalog Request | The design publishes at once. Visibility becomes published, the content class is "official", and the published version is the design's current version. A workflow adds it to the public catalog repository. If that workflow fails, the publish stands and an error event is recorded. |
| Anyone else | A request is created with status pending and content class "community". Visibility does not change. The catalog maintainers receive an email titled "New Catalog publish request", and you receive a copy. |

Content classes are official, verified, and community. A direct publish by an approver is always official.

## Review a request

Users with the View Catalog Requests permission see the queue in Layer5 Cloud. Users with Approve Catalog Request or Deny Catalog Request decide each request.

- Only a pending request can be decided. Deciding any other request returns 409 "publish request already exists with status: <status>". A caller without the key gets 403 "unauthorized to approve catalog publish request".
- Approving sets visibility to published, records the approver's chosen content class, and records the published version. It does not start the workflow that adds the design to the public catalog repository, which only a direct publish by an approver starts.
- Denying sets the request to denied and leaves visibility unchanged.
- The design owner receives an approval or denial email unless their notification preferences turn it off.

Server-side validation of catalog data is minimal. The interface form enforces the required fields.

## Unpublish a design

The design's creator, or any user with Approve Catalog Request, can unpublish it. The Unpublish Design permission controls the action in the Layer5 Cloud interface. Others get 403 "unauthorized to unpublish to catalog".

Unpublishing sets visibility to private (not public), starts a delete-from-catalog workflow, and records an event. Catalog data stays on the design. The earlier publish request record is not cleared, so submitting the same design again hits the existing-request rule above.

Deleting a published design also starts the delete-from-catalog workflow. See [Delete a Design](/pr-preview/pr-1345/kanvas/guides/designs/deleting-a-design/).

## Publish to Artifact Hub

Kanvas has no direct Artifact Hub publishing. To list a design there, export it as a Helm chart and publish that chart to a Helm repository, then register the repository in Artifact Hub using its own documentation. See [Export Designs](/pr-preview/pr-1345/kanvas/guides/designs/export-designs/). Exporting to a Helm chart drops layout and annotations.

## Tiers

No plan feature is checked when you publish. Publishing is governed by the permissions above. See [Permissions](/pr-preview/pr-1345/kanvas/reference/permissions/).

