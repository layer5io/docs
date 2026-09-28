# Roles

> Roles map permissions to users. Roles contain any number of keychains, which contain any number of keys (permissions). Assign roles to users to grant permissions.



Roles map permissions to users. Roles contain any number of keychains, which contain any number of keys (permissions). Assign roles to users to grant permissions.

![roles](images/roles-overview.svg "image-center-no-shadow")

## Provider Admin Role

<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-header">
      <a href='https://docs.layer5.io/cloud/reference/default-permissions/#Provider+Admin' target='_blank'>Provider Admin Role</a>
    </div>
<div class="card-body">
    <p class="card-text">
        <p>




<div class="md__image">
  <img src="images/role-provider-admin.svg" onclick="openModal(this)" alt="role-provider"
  class="md-image-responsive" />
</div>
</p>
</p>
      </div>
  </div>

<div class="td-card card border me-4">
<div class="card-body">
    <p class="card-text">
        <p><strong>What is the purpose of this role?</strong></p>
<ul>
<li>Used for administration of Layer5 Cloud.</li>
<li>Used for debugging and monitoring.</li>
<li>Applicable to platform engineering team and on-prem users.</li>
</ul>
<p><strong>Who can assign this role?</strong></p>
<ul>
<li>Provider Admins</li>
</ul>
<p><strong>When this role is first assigned?</strong></p>
<ul>
<li>On ☁️ boot-up (using build args)</li>
</ul>
<p><strong>How many instances of these roles?</strong></p>
<ul>
<li>Min: 1, Max: many (based on plan)</li>
</ul>
<p><strong>Who can remove assignment of this role?</strong></p>
<ul>
<li>Provider Admins</li>
</ul>
<p><strong>What permissions does this role have?</strong></p>
<ul>
<li>Can create, view, edit and delete every resource</li>
</ul>
</p>
      </div>
  </div>

</div>


## Organization Roles

<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-body">
    <p class="card-text">
        <p>




<div class="md__image">
  <img src="images/organization-roles.svg" onclick="openModal(this)" alt="organization-administrator and manager"
  class="md-image-responsive" />
</div>
</p>
</p>
      </div>
  </div>

</div>


<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-header">
      
<h3 id="organization-administrator" class="heading-link">
  <a href='https://docs.layer5.io/cloud/reference/default-permissions/#Org+Admin' target='_blank'>Organization Administrator</a>
  <a href="#organization-administrator" class="heading-anchor" aria-label="Permalink to this heading">🔗</a>
</h3>

    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>What is the purpose of this role?</strong></p>
<ul>
<li>Administration of an organization</li>
</ul>
<p><strong>Who can assign this role?</strong></p>
<ul>
<li>The Organization Owner</li>
</ul>
<p><strong>When this role is first assigned?</strong></p>
<ul>
<li>Creation of new organization or User Account creation</li>
</ul>
<p><strong>How many instances of these roles?</strong></p>
<ul>
<li>Min: 1, Max: many (based on plan)</li>
<li>By default, the first Organization Admin is the owner (the creator of the organization).</li>
</ul>
<p><strong>Who can remove assignment of this role?</strong></p>
<ul>
<li>Organization Owner</li>
</ul>
</p>
      </div>
  </div>

<div class="td-card card border me-4">
<div class="card-header">
      
<h3 id="organization-billing-manager" class="heading-link">
  <a href='https://docs.layer5.io/cloud/reference/default-permissions/#Org+Billing+Manager' target='_blank'>Organization Billing Manager</a>
  <a href="#organization-billing-manager" class="heading-anchor" aria-label="Permalink to this heading">🔗</a>
</h3>

    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>What is the purpose of this role?</strong></p>
<ul>
<li>Administration of subscriptions, plans, payments, billing methods and information, spending limits, invoice mgmt etc.</li>
</ul>
<p><strong>Who can assign this role?</strong></p>
<ul>
<li>Organization Owner</li>
</ul>
<p><strong>When this role is first assigned?</strong></p>
<ul>
<li>Manually by Organization Owner</li>
</ul>
<p><strong>How many instances of these roles?</strong></p>
<ul>
<li>Min: 0, Max: many</li>
</ul>
<p><strong>Who can remove assignment of this role?</strong></p>
<ul>
<li>Organization Owner</li>
</ul>
</p>
      </div>
  </div>

</div>













<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Organization owners as entitlements</h4>
  
      <p>It&rsquo;s essential to understand that owners are not roles, but entitlements.</p>
<p>Organization owners carry the organization administrator role, and may be joined in their organization administration duties by any number of other users carrying the organization administrator role. However, the organization owner also has the administrative privilege to delete the organization.</p>
<p>The entitlement of &ldquo;organization owner&rdquo; is automatically bestowed to the creator of a organization. The individual user who created a given organization initially is therefore granted certain administrative privileges beyond that of other organization administrators. Specifically, organization owners retain the sole permission to delete the organization.</p>
<p>For more information, see <a href="/cloud/concepts/identity-and-security/organizations/">Organization</a>.</p>

  
</div>



## Workspace Roles

<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-body">
    <p class="card-text">
        <p>




<div class="md__image">
  <img src="images/workspace-roles.svg" onclick="openModal(this)" alt="workspace-administrator"
  class="md-image-responsive" />
</div>
</p>
</p>
      </div>
  </div>

</div>


<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-header">
      
<h3 id="workspace-administrator" class="heading-link">
  <a href='https://docs.layer5.io/cloud/reference/default-permissions/#Workspace+Admin' target='_blank'>Workspace Administrator</a>
  <a href="#workspace-administrator" class="heading-anchor" aria-label="Permalink to this heading">🔗</a>
</h3>

    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>What is the purpose of this role?</strong></p>
<ul>
<li>Administration of a workspace along with curation of content for an organization&rsquo;s catalog (for each organization for which the user has this role assigned)</li>
</ul>
<p><strong>Who can assign this role?</strong></p>
<ul>
<li>Organization Administrators or Workspace Owner</li>
</ul>
<p><strong>When this role is first assigned?</strong></p>
<ul>
<li>Creation of new workspace</li>
</ul>
<p><strong>How many instances of these roles?</strong></p>
<ul>
<li>Min: 1, Max: many</li>
<li>By default, the first Workspace Administrator is the owner (the creator) of the workspace.</li>
</ul>
<p><strong>Who can remove assignment of this role?</strong></p>
<ul>
<li>Organization Administrators or Workspace Owner</li>
</ul>
</p>
      </div>
  </div>

</div>













<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Workspace owners as entitlements</h4>
  
      <p>It&rsquo;s essential to understand that owners are not roles, but entitlements.</p>
<p>Workspace owners carry the organization administrator role, and may be joined in their workspace administration duties by any number of other users carrying the workspace administrator role. However, the workspace owner also has the administrative privilege to delete the workspace.</p>
<p>The entitlement of &ldquo;workspace owner&rdquo; is automatically bestowed to the creator of a workspace. The individual user who created a given workspace initially is therefore granted certain administrative privileges beyond that of other workspace administrators. Specifically, workspace owners retain the sole permission to delete the workspace.</p>

  
</div>



## Team Roles

<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-body">
    <p class="card-text">
        <p>




<div class="md__image">
  <img src="images/team-roles.svg" onclick="openModal(this)" alt="team-admins-and-manager"
  class="md-image-responsive" />
</div>
</p>
</p>
      </div>
  </div>

</div>


<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-header">
      
<h3 id="team-administrator" class="heading-link">
  <a href='https://docs.layer5.io/cloud/reference/default-permissions/#Team+Admin' target='_blank'>Team Administrator</a>
  <a href="#team-administrator" class="heading-anchor" aria-label="Permalink to this heading">🔗</a>
</h3>

    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>What is the purpose of this role?</strong></p>
<ul>
<li>Administration of teams</li>
</ul>
<p><strong>Who can assign and unassign this role?</strong></p>
<ul>
<li>Organization Administrator or Team owner</li>
</ul>
<p><strong>When is this role first assigned?</strong></p>
<ul>
<li>Creation of new team or User Account creation</li>
<li>By default, the first Team Admin is owner (the team creator)</li>
</ul>
<p><strong>How many instances of these roles?</strong>
Min: 1, Max: many</p>
</p>
      </div>
  </div>

<div class="td-card card border me-4">
<div class="card-header">
      
<h3 id="team-manager" class="heading-link">
  Team Manager
  <a href="#team-manager" class="heading-anchor" aria-label="Permalink to this heading">🔗</a>
</h3>

    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>What is the purpose of this role?</strong></p>
<ul>
<li>Administration of teams (without delete access)</li>
</ul>
<p><strong>Who can assign and unassign this role?</strong></p>
<ul>
<li>Organization Administrators or Team Owner</li>
</ul>
<p><strong>When is this role first assigned?</strong></p>
<ul>
<li>Manually by Organization Administrator or Team Owner</li>
</ul>
<p><strong>How many instances of these roles?</strong></p>
<ul>
<li>Min: 0, Max: many</li>
</ul>
</p>
      </div>
  </div>

  </div>













<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">Owners as entitlements, not roles</h4>
  
      <p>It&rsquo;s essential to understand that owners are not roles, but entitlements.</p>
<p>Team owners carry the team administrator role, and may be joined in their team administration duties by any number of other users carrying the team administrator role. However, the team owner also has the administrative privilege to delete the team.</p>
<p>The entitlement of &ldquo;team owner&rdquo; is automatically bestowed to the creator of a team. The individual user who created a given team initially is therefore granted certain administrative privileges beyond that of other team administrators. Specifically, team owners retain the sole permission to delete the team.</p>
<p>For more information, see <a href="/cloud/concepts/identity-and-security/teams/">Teams</a>.</p>

  
</div>



## Example: The Orbital Labs Role Hierarchy

The following illustrates how Provider Admin, Org Admin, and Team Admin roles stack in practice across the Orbital Labs ecosystem. See [Meet Five and the Cast]() for the full narrative.

<img src='../../../images/five/layer5-five-mascot-means-business.svg' alt="Five means business" style="width:90px; float:right; margin-left:1.5rem; margin-bottom:1rem;" />

<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-header">
      <strong>Dr. Aiko Sato</strong> — Provider Admin
    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>Organization:</strong> Constellation Cloud<br>
<strong>Scope:</strong> All tenants (Orbital Labs, Stellar Dynamics, and others)</p>
<p>Dr. Aiko Sato holds the Provider Admin role at Constellation Cloud, the MSP that manages Orbital Labs as a tenant. Provider Admins can create, view, edit and delete every resource across all tenant organizations. Dr. Sato has seen every misconfigured RBAC policy known to humankind, which is why she documents each one.</p>
</p>
      </div>
  </div>

<div class="td-card card border me-4">
<div class="card-header">
      <strong>Maya Chen</strong> — Organization Administrator
    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>Organization:</strong> Orbital Labs<br>
<strong>Scope:</strong> All resources within Orbital Labs</p>
<p>Maya Chen holds the Org Admin role for Orbital Labs. She manages user accounts, team membership, workspace creation, and role assignments within Orbital Labs. She also serves as Team Admin for the Development team — an Org Admin may administer any team in their organization.</p>
</p>
      </div>
  </div>

<div class="td-card card border me-4">
<div class="card-header">
      <strong>Zara Osei</strong> — Team Administrator
    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>Organization:</strong> Orbital Labs<br>
<strong>Team:</strong> Infrastructure<br>
<strong>Scope:</strong> Infrastructure team members and their workspace access</p>
<p>Zara Osei holds the Team Admin role for Orbital Labs&rsquo; Infrastructure team. She manages keychain assignments for Five and controls which environments the Infrastructure team can access. Access requests go through Zara&rsquo;s 48-hour SLA — no exceptions, no matter how urgent Five thinks the situation is.</p>
</p>
      </div>
  </div>

</div>








<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Info</h4>
  
      Role assignments are org-scoped. Dr. Aiko&rsquo;s Provider Admin role spans all tenants; Maya&rsquo;s Org Admin role applies only within Orbital Labs; Zara&rsquo;s Team Admin role applies only to the Infrastructure team within Orbital Labs.
  
</div>



