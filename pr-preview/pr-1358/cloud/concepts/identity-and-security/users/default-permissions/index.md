# Default User Permissions


> Where to find the default permissions each role holds, including the User role.



The permissions a user holds are the keys from every role they hold in the selected organization. The full matrix of default roles and permissions is [Default Permissions](/pr-preview/pr-1358/cloud/reference/default-permissions/).

Read that matrix for the User role. These points are easy to get wrong from older summaries:

- The User role holds View Catalog and View Designs. It also holds Leave Team.
- The User role holds the view keys for tokens, sessions, keys, and keychains, plus Create Token and Download Token. See [Tokens](/pr-preview/pr-1358/cloud/concepts/identity-and-security/tokens/).
- The User role does not hold Invite User to Team, Invite User to Organization, or Assign Roles to Team members.
- The User role does not hold the keys that create, edit, or delete keychains and roles. Those require Provider Admin. See [Keychains](/pr-preview/pr-1358/cloud/concepts/identity-and-security/keychains/).

A check mark with an asterisk on the matrix means the role holds the permission only on resources the user owns.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Customizable Permissions</h4>
  
      Only a Provider Admin can create or change <a href="/pr-preview/pr-1358/cloud/concepts/identity-and-security/keychains/">keychains</a> and <a href="/pr-preview/pr-1358/cloud/concepts/identity-and-security/roles/">roles</a>. On hosted Layer5 Cloud, Layer5 operates the Provider Admin role, so an organization cannot build a custom permission set itself. On a self-hosted deployment, the operator&rsquo;s Provider Admins can.
  
</div>



