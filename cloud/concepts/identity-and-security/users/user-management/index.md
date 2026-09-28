# User Management


> Learn how to create, add, invite, and manage users within Layer5 Cloud.



This guide outlines methods for creating user accounts, adding users to organizations, inviting new members, and managing user access within Layer5 Cloud to maintain a secure and organized environment.

![User Management options](images/org_invite.png)

## Create User Account

Seamlessly initiate new user accounts, ensuring a smooth onboarding process. Specify user details, such as email, and tailor their access by adding them to one or more organizations. Optionally assign roles, defining their scope within the platform. Complete the process by sending a personalized account setup email, streamlining the user's introduction to Layer5 Cloud.

![Create User](images/create-user.gif)







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Permission Required for User Creation</h4>
  
      Only Provider Admins and Organization Admins can create users. For more information, see <a href="/cloud/concepts/identity-and-security/roles/">Roles</a>.
  
</div>



## Add / Remove Existing User

This section explains how to add existing Layer5 Cloud users to one of your organizations or remove them.






  



















<style>
.meshery-embed-container {
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 0rem auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.meshery-embed-container.full {
  width: 80%;
  height: 30rem;
}
.meshery-embed-container.half {
  width: 50%;
  height: 25rem;
}
.meshery-embed-container .cy-container {
  width: 100%;
  height: 100%;
}

</style>


<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
<div
    id="embedded-design-066b0ef3-7956-4c3b-a5cc-1d276ac13ec6"class="meshery-embed-container full"></div>

<a href="https://cloud.layer5.io/catalog/content/design/066b0ef3-7956-4c3b-a5cc-1d276ac13ec6" target="_blank" rel="noopener noreferrer">
  Open Design
</a>

</div>


<script src="/export-designs/embedded-design-page-open-source.js" type="module"></script>


### Adding a User to an Organization

If someone already has a Layer5 Cloud account but isn't part of your organization, you can add them.

1. Go to the Users tab in the Identity section 
2. Click the **Add User** button.
3. Select the organization to which you want to add the user.
4. Select the user from the list of available users.
5. Assign appropriate roles within the organization.

![Add User to Organization](images/add-user.gif)

### Removing Users from an Organization

You can remove users from an organization one by one or several at once. This action takes away their membership and access to that specific organization's resources but doesn’t delete their overall Layer5 Cloud account.

#### Method 1: Individual User Removal (One by One)
   * **Locate the User:** Find the specific user you wish to remove from the list.
   * **Use Row Action:** Click the "Remove User" icon.
   * **Confirm:** When prompted, confirm your decision to remove the user from the organization.

#### Method 2: Bulk User Removal (Multiple Users at Once)
   * **Select Users:** Use the checkboxes next to each user's name to select all the users you intend to remove.
   * **Use Bulk Action:** Click the "Delete" button.
   * **Confirm:** When prompted, confirm that you want to remove all the selected users from the organization.

![Removing Users from an Organization](images/remove_user.png)

#### What Removal Ends

Removing a member ends every access-bearing relationship they hold **inside that organization**, as a single operation:

* **Their organization membership**, together with the organization [roles](/cloud/concepts/identity-and-security/roles/organization-roles/) attached to it.
* **Their membership in that organization's [teams](/cloud/concepts/identity-and-security/teams/)**, together with the team [roles](/cloud/concepts/identity-and-security/roles/team-roles/) attached to those memberships.

Both matter, because permissions reach a user through the roles carried on those memberships. A [keychain](/cloud/concepts/identity-and-security/keychains/) granted by a team role is revoked by the removal just as an organization role's keychain is, so a removed member is left holding no [keys](/cloud/concepts/identity-and-security/keys/) in the organization by either route. Both removal methods above behave identically in this respect; removing several members at once applies the same operation to each one.

Removal does **not** affect:

* The person's Layer5 Cloud user account, which continues to exist.
* Their membership in any other organization, or in teams belonging to those organizations.
* Designs, environments, and other resources they created, which remain in the organization.

Removal is not reversible from the Users tab. To restore someone's access, add them to the organization again and reassign their organization roles and team memberships. Neither returns on its own.







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Team Access Is Not Itemized in the Confirmation</h4>
  
      The confirmation shown after a removal reports only that the member was removed from the organization. It does not list the team memberships that ended with it. Review the member&rsquo;s teams before removing them if you need a record of what their removal revoked.
  
</div>









<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Organization Owners Cannot Be Removed</h4>
  
      An attempt to remove the organization&rsquo;s owner is rejected. Transfer ownership to another administrator first, then remove the former owner. See <a href="/cloud/concepts/identity-and-security/roles/organization-roles/">Organization Roles</a>.
  
</div>



## Invite User via Email

You can invite new or existing users to join one of your organizations by sending them an email invitation.

* **How to Invite:**
    1.  Click the "Invite User" button.
    2.  Enter the person's First Name, Last Name, and Email address.
    3.  Assign them to a target Organization. Optionally, Team(s) and Organization Role(s) they will receive.
    4.  Layer5 Cloud sends an invitation email to the user.
* **What the User Does:** The person you invited will click a link in the email to accept. If they're new to Layer5 Cloud, they'll need to create an account first before they can join your organization.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Permissions for Role Assignment</h4>
  
      An Organization Admin can assign organization roles to users, but provider roles can only be assigned by Provider Admins. For more information, see <a href="/cloud/concepts/identity-and-security/roles/">Roles</a>.
  
</div>



