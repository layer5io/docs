# Managing Profiles


> Learn how to create, edit, and delete profiles, link connections to them, and share them by assigning them to workspaces.


This guide shows how to manage [profiles](/pr-preview/pr-1352/cloud/concepts/spaces/profiles/) through the Layer5 Cloud API. Profiles have no page in the Layer5 Cloud UI yet. For the base URL and authentication, see the [Cloud API](/pr-preview/pr-1352/cloud/reference/api-reference/). All paths below sit under `/api`.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">A Note on Permissions</h4>
  
      Each action needs the permission named beside it. A profile you cannot see, one that was deleted, and one that belongs to another organization all answer the same 404. See <a href="/pr-preview/pr-1352/cloud/reference/default-permissions/#profile-permissions">Default Permissions</a>.
  
</div>



## List profiles

`GET /profiles` (View Profiles) lists the profiles you can see in your current organization. Pass `orgId` to choose another organization you belong to, `userId` to find the profile that represents a user, and `search`, `order` (`name`, `createdAt` or `updatedAt`), `page` and `pagesize` to page through the results.

`GET /profiles/{profileId}` returns one profile.

## Create a profile

`POST /profiles` (Create Profile) with a JSON body:

```json
{
  "organizationId": "<organization id>",
  "name": "Release announcements",
  "description": "The accounts we announce releases through"
}
```

`organizationId` and `name` are required. You become the owner unless you send `owner`. `owner` and `userId`, when sent, must each be a signed-in member of the organization, or the request answers 400. A new profile is in no workspace, so only you and the organization's admins can see it until you assign it.

## Edit or transfer a profile

`PUT /profiles/{profileId}` (Edit Profile, or the owner) replaces `name` and `description`. `metadata`, `owner` and `userId` change only when you send them. Sending a new `owner` transfers the profile. The organization cannot change.

## Delete a profile

`DELETE /profiles/{profileId}` (Delete Profile) deletes the profile and removes it from every workspace. The connections it linked to are not changed.

## Link connections

- `GET /profiles/{profileId}/connections` (View Profiles) lists the linked connections.
- `POST /profiles/{profileId}/connections/{connectionId}` (Edit Profile, or the owner) links a connection you can access in the profile's organization. Linking twice is harmless.
- `DELETE /profiles/{profileId}/connections/{connectionId}` removes the link and leaves the connection in place.

## Share a profile through a workspace

- `POST /workspaces/{workspaceId}/profiles/{profileId}` (Assign profile to workspace) assigns a profile you can see to a workspace in the same organization. A workspace in another organization answers 400.
- `GET /workspaces/{workspaceId}/profiles` (View Profiles) lists the workspace's profiles. Add `filter={"assigned":false}` to list the profiles you could still assign.
- `DELETE /workspaces/{workspaceId}/profiles/{profileId}` (Remove profile from workspace) removes the assignment.

Members of every team assigned to the workspace can then see the profile.

