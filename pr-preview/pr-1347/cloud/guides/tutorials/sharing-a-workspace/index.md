# Sharing a Workspace


> Learn how to control access to workspaces and their resources.


## Share designs from Workspaces

Five has been working in the `orbital-dev` workspace, a development sandbox with a local Kubernetes environment (kind) and LocalStack for AWS service emulation. Rex Park needs to open the `microservices-baseline` design.

Assigning the Development team to `orbital-dev` does not do that. Team assignment grants read-only access to the connections in the workspace's environments. It does not open designs. Every member of the organization can already see the workspace.

Here is how Five shares the design itself with Rex.

### Share a single design from orbital-dev

In your browser, go to [Layer5 Cloud](https://cloud.layer5.io).

1. Open `microservices-baseline`.
2. Click **Share**. Share is hidden while the design is empty or published, and while it is still loading.
3. Search for Rex and add him. The search finds individual users only. There is no permission level to set: a grant has no view-only or comment-only option. A person who can open a private design can edit it, clone it, and download it.
4. Confirm Rex appears under **People with Access**. Treat that list as the source of truth after every share.

Sharing one design gives Rex that design only, not the other designs in `orbital-dev`, and not the right to modify its connections. To let Rex read the workspace's connections, an organization administrator assigns Rex's team to the workspace. That assignment is still read-only for connections, and it still does not open any design.

A private design's link does not grant access by itself. The recipient must also be added in **Share**.

## Stop, limit, or change Workspace sharing

You stop connection access by removing the team from the workspace. You stop design access by removing the person from **People with Access**. Those are different controls.

If Five later wants to remove Rex's access to the design:

1. Open the design and click **Share**
2. Find Rex in **People with Access**
3. Remove Rex

There is no comment-only setting and no separate edit setting on the grant.

### Share and collaborate on a design with many people

The Share dialog finds individual users only. Layer5 Cloud accepts a grant for a team through its API, but no access check honors it, so team members gain nothing from a team grant. Grant each person.

You cannot give a whole team access to a private design by placing the design in a workspace and assigning the team.

#### Share without publishing

Keep the design **Private** and add each person in **Share**. Copy Link is a pointer. For a private design, the link alone does not open it.

#### Publish the design







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">When a design is Published</h4>
  
      <ul>
<li>Publishing lists the design in the catalog. Anyone can read it, and any signed-in user with Clone Design can clone it.</li>
<li>Published is not the same as Public. A public design is readable by anyone with the link and is not listed in the catalog.</li>
<li>A design saved for the first time is public. Designs imported from GitHub start private.</li>
<li>Unpublishing returns the design to private, not public.</li>
</ul>

  
</div>



- If many people need to open a design without a catalog entry, share it with each person, or set it to public.
- Share is hidden while a design is published.
- To remove a design from the catalog, unpublish it. See [Publishing Designs](/pr-preview/pr-1347/kanvas/designer/publishing-designs/).

### Stop sharing a design

The owner, and anyone who holds Share Design, can change who is listed under **People with Access**.

Deleting a design you own removes it. There is no trash. Collaborators cannot delete a design. Only the owner or a provider administrator can.

### Anonymous or unknown users in a design

A public design can be opened by anyone with the link, including someone who is not signed in. A private design cannot. If someone you did not add can open a private design, check **People with Access**: another person who holds Share Design may have added them.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Info</h4>
  
      See <a href="/pr-preview/pr-1347/cloud/getting-started/meet-five/">Meet Five and the Cast</a> for the full Orbital Labs workspace and character reference. The same sharing steps are summarized on <a href="/pr-preview/pr-1347/cloud/guides/workspaces/managing-workspaces/#faq">Managing Workspaces</a>.
  
</div>



