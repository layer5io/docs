# Share a Design Across Organizations


> Grant a reviewer in another organization access to a private design, run the review in comments, and revoke access when the review ends.


In this tutorial, an Organization Admin at one company asks an engineer at another company to review a private design. By the end, you will have given someone outside your organization access to one design, held a review in a comment thread, and removed that access. Along the way, you will learn what a grant gives someone, where Kanvas checks permissions, and why the review itself has to happen in comments.

The cast is the same one used across these docs. Marcus Webb is the Organization Admin at Stellar Dynamics. Five is a Platform Engineer at Orbital Labs, a separate organization.

## Before you begin

- Marcus holds the **Share Design permission** in Stellar Dynamics. Kanvas checks it in the organization that owns the design's workspace, so a grant from another organization does not count.
- Marcus holds the **View All Users** permission. The people picker in the Share dialog depends on it.
- Five holds **View All Users** as well, so he can @mention Marcus in a comment.
- Both accounts exist on the same Layer5 Cloud.
- The design is saved and private. A design gets a link only after its first save gives it an id. Kanvas hides Share for empty designs and for published designs.

## The scenario

Marcus owns a saved design called `stellar-saas-platform`. It models Stellar Dynamics' Azure SaaS stack: an AKS cluster, Azure SQL, API Management, Azure AD, Event Hub, and the connections between them. Before his team runs it in production, he wants Five to review the architecture.

## Step 1: Marcus grants Five access

Marcus opens the Share dialog on `stellar-saas-platform` and searches for Five by name. The search covers every user Marcus's role lets him search, not just members of Stellar Dynamics, so Five appears even though he belongs to Orbital Labs. Marcus adds Five, and Five now appears in the list of people with access.

Here is the model to remember. **A private design opens for its owner, for provider administrators, and for each person who holds a grant on it.** A grant links one person to one design. It has no access level and never checks organizations. Kanvas does not compare Five's organization with the design's, and you do not need any provider-level trust setting.

An invitation email goes out only when the share request asks for one, so Marcus copies the design link and sends it to Five himself.

**Result:** Five holds a grant on `stellar-saas-platform`.

## Step 2: Five opens the design

Five follows the link while signed in to his Orbital Labs account. The design loads with every component and connection Marcus drew. It also appears in Five's list of designs shared with him.

Five gets this one design and nothing else. The grant does not make him a member of Stellar Dynamics. Other private designs in the same workspace remain closed to him, because each private design checks its own grants. Assigning a team to the workspace would not open them either.

**Result:** Five sees the design Marcus sees.

## Step 3: Five comments and mentions Marcus

Five places a comment next to API Management and writes:

> @Marcus Webb You're missing a WAF in front of API Management.

Typing `@` followed by part of a name brings up matching users. Choosing one stores a real mention, not plain text.

The comment is a component in the design, so it saves and travels with the design. If Marcus has the design open, the comment shows up on his canvas right away. Because Five mentioned him, Marcus also gets an email with the design's name, a snapshot, and the thread, unless he has turned off comment emails in his account preferences.

**Result:** An open thread on the design names Marcus.

## Step 4: Marcus responds, edits, and resolves

Marcus replies in the thread. Five wrote an earlier message in it, so Five receives an email about the reply. Marcus then adds an Azure Application Gateway in front of API Management and connects the two. Kanvas autosaves the change.

Marcus resolves the thread. The comment leaves the canvas but stays in the comments panel under the Resolved filter. Resolving sends no email. If anyone posts again in the thread, it reopens.

**Result:** The fix is in the design, and the thread records why it was made.

## What this means for review

Kanvas has no view-only or comment-only grant. A grantee can do anything an editor can do. Five can open the design, save edits, comment, clone it, download it, and switch it between private and public. He can only re-share it if his role gives him the Share Design permission in Stellar Dynamics' organization. Five cannot delete the design, and he cannot take over ownership.

The rules of the review therefore live in the comment thread, not in the permission system. Marcus has two tools for keeping it that way:

- **Remove the grant when the review ends.** Access lasts exactly as long as the grant does.
- **Offer a clone.** If Five wants to experiment, a clone gives him an independent copy, and the original stays untouched.

For live co-editing during a review, see [Collaborative Editing](/pr-preview/pr-1342/kanvas/tutorials/collaborative-editing/).

## Step 5: Marcus revokes access

Once the review is done, Marcus removes Five from the list of people with access in the Share dialog. When Five opens the link again, Kanvas refuses it, and the design leaves his shared list.

Five's comments stay in the design. Comments are part of the design, so removing a person does not remove what they wrote. A clone is a separate design, so revoking access to the original does not affect any clone Five made.

**Result:** Only Marcus and provider administrators can open `stellar-saas-platform`.

## Access at a glance

This table applies to a private design. Provider administrators can open and delete any private design.

| Person | Open the private design | Edit it | Comment | Re-share | Delete |
|---|---|---|---|---|---|
| Marcus (owner) | Yes | Yes | Yes | Yes, with the Share Design permission | Yes |
| Five (grantee) | Yes | Yes | Yes | Only with the Share Design permission in the design's organization | No |
| Someone with no grant | No | No | No | No | No |

## Next steps

- [Share a Design](/pr-preview/pr-1342/kanvas/guides/collaborating/sharing-designs/) covers granting, revoking, and changing visibility.
- [Review a Design with Comments](/pr-preview/pr-1342/kanvas/guides/collaborating/reviewing-designs/) covers comment threads, mentions, filters, and notifications.
- [Collaboration Model](/pr-preview/pr-1342/kanvas/concepts/collaboration/) explains how sharing, comments, and live editing fit together.
- [Permissions by Role](/pr-preview/pr-1342/kanvas/reference/permissions/) lists every permission that controls these actions.

