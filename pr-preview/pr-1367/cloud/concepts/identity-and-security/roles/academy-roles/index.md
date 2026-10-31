# Default Academy Roles


> By default, Academy has two roles available: Academy Administrator and Learner.



<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-header">
      Academy Administrator
    </div>
<div class="card-body">
    <p class="card-text">
        <img src="images/academy-admin.svg" link="images/academy-admin.svg"  width="100%" alt="Academy Administrator Roles" />
</p>
      </div>
  </div>

</div>


<div class="td-card-group card-group p-0 mb-4">

<div class="td-card card border me-4">
<div class="card-header">
      
<h2 id="academy-administrator" class="heading-link">
  Academy Administrator
  <a href="#academy-administrator" class="heading-anchor" aria-label="Permalink to this heading">🔗</a>
</h2>

    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>What is the purpose of this role?</strong></p>
<ul>
<li>Management of an organization&rsquo;s academy, learner management, and access to academy instructor console.</li>
</ul>
<p><strong>Who can assign this role?</strong></p>
<ul>
<li>Organization Administrators</li>
</ul>
<p><strong>When this role first assigned?</strong></p>
<ul>
<li>Manually assigned by an Organization Administrator.</li>
</ul>
<p><strong>How many instances of these roles?</strong></p>
<ul>
<li>Min: 0, Max: many</li>
</ul>
<p><strong>Who can remove assignment of this role?</strong></p>
<ul>
<li>Organization Administrators</li>
</ul>
<p><strong>What permissions does this role have?</strong></p>
<ul>
<li>Check <a href="/pr-preview/pr-1367/cloud/reference/default-permissions/">Permissions Reference</a></li>
</ul>
</p>
      </div>
  </div>

</div>


<div class="td-card-group card-group p-0 mb-4">
<div class="td-card card border me-4">
<div class="card-header">
      Learner
    </div>
<div class="card-body">
    <p class="card-text">
        <p>Academy Learner is an organization role. It is separate from the <a href="/pr-preview/pr-1367/cloud/concepts/identity-and-security/roles/user-role/">User</a> role. Holding it grants access to Academy content and registration.
<img src="images/learner.svg" link="images/learner.svg"  width="100%" alt="Learner Roles" /></p>
</p>
      </div>
  </div>

</div>













<div class="alert alert-info" role="alert">
  <h4 class="alert-heading">Learners and billing</h4>
  
      There is no seat cap that blocks someone from receiving Academy Learner. A member whose only role is Academy Learner is excluded from the organization&rsquo;s billable user count. The count still never falls below the plan&rsquo;s minimum, and it does not stop anyone from joining.
  
</div>



<div class="td-card-group card-group p-0 mb-4">

<div class="td-card card border me-4">
<div class="card-header">
      
<h2 id="learner" class="heading-link">
  Learner
  <a href="#learner" class="heading-anchor" aria-label="Permalink to this heading">🔗</a>
</h2>

    </div>
<div class="card-body">
    <p class="card-text">
        <p><strong>What is the purpose of this role?</strong></p>
<ul>
<li>To enroll in academy content within the organization&rsquo;s academy.</li>
</ul>
<p><strong>Who can assign this role?</strong></p>
<ul>
<li>An Organization Admin of that organization, a holder of Assign User Roles there, or a Provider Admin. Academy Admin does not assign organization roles by virtue of that role.</li>
</ul>
<p><strong>When this role first assigned?</strong></p>
<ul>
<li>When an authorized administrator assigns it, or when an invitation lists Academy Learner. There is no automatic learner role and no separate learner invite link. An invitation is an organization invitation that can name this role.</li>
</ul>
<p><strong>How many instances of these roles?</strong></p>
<ul>
<li>Any number. The role is available on every plan.</li>
</ul>
<p><strong>Who can remove assignment of this role?</strong></p>
<ul>
<li>The same people who can assign it. Removing the role does not end the membership.</li>
</ul>
<p><strong>What permissions does this role have?</strong></p>
<ul>
<li>Check <a href="/pr-preview/pr-1367/cloud/reference/default-permissions/">Permissions Reference</a></li>
</ul>
<p><strong>Status as a Learner</strong></p>
<p>Each individual academy content item (learning path, certification, or challenge) that a learner enrolls in tracks one of the following 4 status types:</p>
<table>
  <thead>
      <tr>
          <th>Status</th>
          <th>What it means</th>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td>registered (enrolled)</td>
          <td>They signed up but haven&rsquo;t started</td>
      </tr>
      <tr>
          <td>completed</td>
          <td>They finished the course</td>
      </tr>
      <tr>
          <td>failed</td>
          <td>They didn&rsquo;t pass</td>
      </tr>
      <tr>
          <td>withdrawn</td>
          <td>They left the course</td>
      </tr>
  </tbody>
</table>
</p>
      </div>
  </div>

</div>


