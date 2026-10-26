# Default Organization Roles


> Organization-scoped roles include Organization Administrator. There is no Organization Billing Manager role.



<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-header">
      Default Organization Roles
    </div>
<div class="card-body">
    <p class="card-text">
        <img src="../images/organization-roles.svg" link="../images/organization-roles.svg"  width="100%" alt="Organization Roles" />
</p>
      </div>
  </div>

</div>


<div class="td-card-group card-group p-0 mb-4">

<div class="td-card card border me-4">
<div class="card-header">
      
<h2 id="organization-administrators" class="heading-link">
  Organization Administrators
  <a href="#organization-administrators" class="heading-anchor" aria-label="Permalink to this heading">🔗</a>
</h2>

    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>What is the purpose of this role?</strong></p>
<ul>
<li>Administration of an organization (for each organization for which the user has this role assigned)</li>
</ul>
<p><strong>Who can assign this role?</strong></p>
<ul>
<li>An Organization Admin of that organization, a holder of Assign User Roles there, or a Provider Admin. The person must already be a member, unless the caller is a Provider Admin.</li>
</ul>
<p><strong>When this role first assigned?</strong></p>
<ul>
<li>When an authorized administrator assigns it. Creating a user does not assign Organization Admin. The creator of an organization is its owner and keeps administrator access through ownership, which is separate from this role.</li>
</ul>
<p><strong>How many instances of these roles?</strong></p>
<ul>
<li>Any number, on every plan. Layer5 Cloud does not stop you removing the last Organization Admin. The owner keeps administrator access through ownership.</li>
</ul>
<p><strong>Who can remove assignment of this role?</strong></p>
<ul>
<li>The same people who can assign it. The roles you submit replace the roles held in that organization.</li>
</ul>
<p><strong>What permissions does this role have?</strong></p>
<ul>
<li>Check <a href="/pr-preview/pr-1210/cloud/reference/default-permissions/">Permissions Reference</a></li>
</ul>
</p>
      </div>
  </div>

</div>


Layer5 Cloud has no Organization Billing Manager role. The other organization-scoped roles are User, Workspace Admin, Workspace Manager, Academy Admin, and Academy Learner. Organization Admins assign them. Provider Admin can assign any of them. See [Roles](/pr-preview/pr-1210/cloud/concepts/identity-and-security/roles/).

The owner of an organization is not a role. Ownership cannot be transferred. The owner can delete the organization. An Organization Admin who is not the owner cannot. A role write replaces the member's roles in that scope. An empty list removes every organization role and keeps the membership. Provider roles cannot be granted in an organization row.

