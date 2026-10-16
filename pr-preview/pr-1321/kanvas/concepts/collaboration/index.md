# Collaboration Model


> How live co-editing, design access, and comments work together in Kanvas, and what each layer does and does not control.


Collaboration in Kanvas, whether at kanvas.new or inside Meshery, rests on three separate layers that work together:

- **Live co-editing (presence)** - people who have the same design open see each other's cursors, selections, and edits as they happen.
- **Access** - the design's visibility and its grant list decide who can open and change the design.
- **Conversation (comments)** - comment threads that live inside the design itself.

The three layers are independent. A live session forms between whoever has the design open at the same time. Access decides who can open the design in the first place. Comments are part of the design's content, so they follow the design wherever it goes. Keeping these layers apart in your head explains most of what you see when a team works on one design.

## The live session

When you open a saved design, your browser joins a live session for that design. Layer5 Cloud acts only as an introducer: it tells the browsers that have the same design open how to reach each other. From then on, edits flow directly from browser to browser over WebRTC. Your edits do not pass through Meshery Server or Layer5 Cloud.

The design is the session key. A session needs a design that has been saved at least once, because only a saved design has an id. A brand-new, unsaved design has no session until its first save. The session ends when you open a different design, when the design is deleted, or when you leave the editor.

The session shares some things and keeps others yours:

| Shared with everyone in the session | Stays in your browser |
|---|---|
| The design: components, relationships, and annotations, including comments | Layout state |
| Editor filters | Viewport and zoom |
| | Render mode and adaptive mode |
| | Your selection |

Presence shows who else is working with you. The Designer toolbar shows an avatar for each other participant, with a ring in that person's color. Each person's cursor appears on your canvas as an arrow labeled with their first name, and any component they select carries a border in their color. Kanvas picks each person's color at random from a fixed palette when the session starts, so two people can end up with the same color. A second browser tab signed in to your own account appears as another collaborator.

Kanvas tries a direct network path between browsers first and falls back to a public relay. It uses public STUN servers and one public relay, and this network configuration is built in and not configurable. Networks that block WebRTC traffic or those public hosts can prevent browsers from connecting.







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">A failed session is silent</h4>
  
      If a live session cannot open, for example because Layer5 Cloud is unreachable, Kanvas keeps working in single-user mode. It shows no on-screen warning and offers no reconnect control. If collaborators cannot see your cursor, assume the session did not open.
  
</div>



Joining a live session requires an authenticated session. Layer5 Cloud rejects a connection without a valid token.

## Live editing versus saving

The live session and the saved design are two different things. Each person's own changes autosave from their own browser a few seconds after they stop editing, and each save writes the whole design. Changes that arrive from other people do not trigger a save on your side. No live copy of the session exists on the server.

The saved design follows last-write-wins. When two people edit at once, the stored design is whatever the most recent save wrote. Anyone who opens the design later, after the session has ended, loads that last saved version, not the live session state.

## The access model

Visibility sets the baseline for who can open and change a design:

| Visibility | Who can open it | Who can change it |
|---|---|---|
| Private | Owner, provider administrators, and users granted access | Owner, provider administrators, and users granted access |
| Public | Anyone, including anonymous visitors | Any signed-in user |
| Published | Anyone, including anonymous visitors | Owner, provider administrators, and users granted access |

A grant gives one user access to one design. A grant carries no access level. Everyone who can open a private design through a grant can edit it, comment on it, clone it, and download it, and can change its visibility between private and public. Kanvas has no view-only or comment-only access.

Granting and revoking access requires the Share Design permission, checked in the organization that owns the design's workspace. When the design has no workspace, Kanvas checks it in an organization the owner belongs to. Layer5 Cloud refuses to check a design that belongs to workspaces in more than one organization. Ownership is not required: a collaborator who holds the permission can share the design further, and by default the Organization Admin role carries it. Anonymous sessions cannot grant or revoke access.

A few rules hold regardless of permissions:

- The owner cannot be granted access or have access revoked.
- Deleting a design stays with the owner and provider administrators.
- Ownership cannot be transferred.
- Sharing is not limited to your organization. You can grant access to any user on the platform.

Teams do not open private designs. Assigning teams to a workspace that contains a design does not give those teams access, and Kanvas shares with individual users only. To give a team member access to a private design, grant it to that person.

### Capabilities by role

| Capability | Owner | Collaborator (user grant) | Any other signed-in user | Provider administrator |
|---|---|---|---|---|
| Open a public design | Yes | Yes | Yes | Yes |
| Open a private design | Yes | Yes | No | Yes |
| Edit a private design | Yes | Yes | No | Yes |
| Edit a public design | Yes | Yes | Yes | Yes |
| Comment | Yes | Yes | Public designs only | Yes |
| Grant or revoke access | With Share Design | With Share Design | Public designs only, with Share Design | With Share Design |
| Change visibility | Yes | Yes | Public designs only | Yes |
| Delete | Yes | No | No | Yes |

Anonymous visitors can open public designs. They cannot grant or revoke access, and they cannot open a private design.

A published design cannot have its visibility changed. For the full role and permission catalog, see [Permissions](/pr-preview/pr-1321/kanvas/reference/permissions/).

## Comments in the model

A comment is a component of the design. It saves with the design, syncs live to everyone in the session, and travels with the design when you clone, export, or copy it. Anyone who can open the design sees its comments, and hiding comments on your canvas does not stop them from syncing.

Each comment holds one thread. The thread records its state (open or resolved), when it last changed, its messages, and the list of people who muted it. Messages cannot be edited or deleted one at a time; deleting the comment removes the whole thread. Resolving a thread removes it from the canvas, and adding a message to a resolved thread reopens it. Muting a thread is stored in the thread itself, so every collaborator can see who muted it, and the mute saves with the design.

Kanvas sends comment notifications by email only when someone adds a message. Resolving and reopening a thread send nothing. When a message is added, Kanvas emails:

- users mentioned in the new message
- earlier participants in the thread, meaning past authors and people mentioned in past messages, except the author of the new message
- the design owner, when the author is someone else

Muting a thread stops mention and participant emails to you. The owner's email ignores the owner's own mute, and Kanvas skips it when the commenter has muted the thread. Each recipient's account notification preferences also apply. A first comment that mentions nobody sends no email to anyone, including the design owner. Kanvas does not check that a recipient can open the design, and the mention picker searches all users on the platform, not only people with access.

The role catalog lists separate permissions for individual comment actions such as add, resolve, and delete. Kanvas does not enforce them. Anyone who can edit a design can perform every comment action.

## Design trade-offs and limits

This model favors low friction over fine-grained control. For a team, it means:

- **No view-only reviewers.** Every person with access can edit. To gather feedback, use comments with people you trust to edit. To circulate a read-only copy, publish a copy or have reviewers clone the design. A clone is independent of the original, so changes to it never reach the original.
- **Public means editable.** Any signed-in user can change a public design, change its visibility, and share it. Keep a design private until you intend that.
- **The grant list protects private designs.** Only the owner, provider administrators, and granted users can open a private design. Review the grant list when a project changes hands, because ownership cannot move.
- **Collaborators can re-share.** A collaborator who holds the Share Design permission can grant access to anyone on the platform.
- **The last save wins.** Live co-editing does not merge saves on the server. The stored design reflects the most recent save.

## Related

- [Sharing designs](/pr-preview/pr-1321/kanvas/guides/collaborating/sharing-designs/)
- [Reviewing designs with comments](/pr-preview/pr-1321/kanvas/guides/collaborating/reviewing-designs/)
- [Collaborative editing tutorial](/pr-preview/pr-1321/kanvas/tutorials/collaborative-editing/)
- [Saving designs](/pr-preview/pr-1321/kanvas/guides/designs/saving-designs/)
- [Publishing designs](/pr-preview/pr-1321/kanvas/guides/designs/publishing-designs/)
- [Kanvas architecture](/pr-preview/pr-1321/kanvas/concepts/architecture/)
- [Permissions](/pr-preview/pr-1321/kanvas/reference/permissions/)
- [Designs and Components](/pr-preview/pr-1321/kanvas/concepts/designs/)

