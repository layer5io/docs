---
title: Reviewing Designs
description: >
  Learn how to leverage comments in Kanvas's Designer Mode to enhance collaboration and streamline design reviews.
weight: 3
categories: [Designer]
tags: [designs, collaboration, review, comments]
format: [video]
aliases:
  - /meshmap/designer/comments
---

Kanvas's Designer offers enables you to place comments "inline" with your infrastructure as code. Use comments to offer feedback to team members, take detailed design notes, capture helpful tips for your team members, and include justification as to your infrastructure and application configuration decisions. Pay it forward to your future self by leaving historical record for reference later.

<figure style="width:400px;">
  <img src="./kanvas-comment.png" alt="Comments in Designer" />
  <figcaption>Example of comments in Designer</figcaption>
</figure>

Your comment may be a request for design review, to offer feedback to peers, or to simply record notes.

## Commenting on a Design

You can add comments in a number of convenient ways. Since designs are public by default, you can add comments to your designs without having to share them first. This is particularly useful for gathering feedback from team members or stakeholders before finalizing the design.

### Commenting via the Dock

1. Click on the comment icon in the toolbar to open a comment instantly. This is your go-to method for quick annotations without leaving your design or first identifying where you want to place your comment.
2. You can also create a comment by dragging and dropping the comment icon from the Dock to your design. This method allows you to place comments directly on specific elements or areas of your design.

<figure style="width:400px;">
<img src="./comment-dock.png" alt="Create a comment from the Dock" />
  <figcaption>Create a comment from the Dock</figcaption>
</figure>

### Commenting via context-click

Context-click on any area of your design, and from the contextual menu, select "Add a Comment". Using this context-click method allows for inline placement of your remarks right where you need them - *in context*.

<figure style="width:400px;">
<img src="./comment-canvas.png" alt="Comment by context-clicking on your design" />
  <figcaption>Comment by context-clicking on your design</figcaption>
</figure>

### Commenting via hotkey

<button class="kbc-button kbc-button-xs">M</button> Add a comment into your design when you press "M" as the hotkey. After pressing the hotkey, a new comment will be displayed. You can move the new comment anywhere in your design.

## Design review using comments

<figure style="width:400px;">
  <img src="./conversation-screenshot.png" alt="Peer review using comments in Designer" />
  <figcaption>Peer review using comments in Designer</figcaption>
</figure>

### Conversations in Comment Threads

Any number of users can participate in a single comment. When more than one user makes a remark in the same comment, a comment thread ensues.

When a new thr is added, existing comments are typically pushed down within the same comment thread. This means that the new comment appears at the bottom of the thread, with earlier comments remaining visible but lower in the list.

Initiate a comment thread by just adding a remark on an existing comment. Collaborators can reply directly to comments in real-time (approximating a chat). Comment threads create a structured dialogue around each point of feedback for easy reference.

### Utilize Mentions

Easily draw the attention of relevant team members by tagging them in your comment. To activate this, type @ in the comment box and a list of your team members will appear then you can select who you want to mention. This ensures that the right people are notified and can contribute to the discussion.

### Comment on Specific Elements

Leave comments on specific elements within the design, whether it's a shape, text, or an entire component. This specificity ensures that feedback is targeted and directly related to the part of the design under discussion.
  
### Resolving a Comment

Resolving a comment thread indicates that the conversation on that topic has concluded. When a comment is resolved, the comment component is removed from view on the canvas.

As a practice, resolving comments can help expedite issue resolution on a particular topic. The action of resolving a comment is like a "soft delete" in that Kanvas designs retain history of each comment made and discussions within.

This retained history is kept as an archived copy of the comment within your design document. You can access this comment history to review previous discussions and decisions. A best practice is to resolve comments rather than delete them, specifically for the benefit of having a historical reference of prior notes, discussions, and decisions.

You can also reopen comments.

### View Comment History

<figure style="width:400px;">
  <img src="./comments-conversation.gif" alt="View comment history" />
  <figcaption>View comment history</figcaption>
</figure>

Manage your comment history by clicking on the "View Comment History" button. This allows you to revisit past discussions and decisions, ensuring that important context is never lost.

### Copying or Cloning Comments

You can reuse a comment by cloning it. This is helpful when you want to move a discussion to a new place or carry it over to another design.

Both Copy and Duplicate create a new comment based on the original. **Duplicate** places it immediately in the same design, while **Copy** allows you to paste it manually wherever you want.

* **Right-click and Copy**: Right-click on any comment, then select **Copy** from the menu.

<figure style="width:400px;">
  <img src="./comment-copy.gif" alt="Copy a comment" />
  <figcaption>Copy a comment</figcaption>
</figure>

* **Right-click and Duplicate**: From the menu, click **Duplicate** to immediately create a copy of the comment in the same design. 

* **Copy and Paste**: 
    * <button class="kbc-button kbc-button-xs">Ctrl + C</button> / <button class="kbc-button kbc-button-xs">Ctrl + V</button>: Copy and paste the comment.
    * <button class="kbc-button kbc-button-xs">Ctrl + Z</button>: Undo the clone action if needed.

{{< alert title="Tip" type="info">}}
You can also press and hold the left mouse button to select multiple comments and copy or manipulate them together.
{{< /alert >}}

What to expect when cloning a comment:

- **Timestamp**: The original creation time is preserved.
- **Mentions**: @mentions won’t trigger new notifications after cloning.
- **Threads**: All replies in the thread are included.
- **Name**: If the comment has a name, the clone keeps the same name.
- **Placement**: You can paste the comment into the same design or a different one.
- **Notifications**: Replies to the cloned comment will notify participants unless they’ve muted the thread.
- **Independence**: The clone is separate—editing or deleting the original won't affect the copy.

### Reopening (unresolving) Comments

After a comment has been resolved, you might need to reopen the discussion. Reopening a comment allows you to reinitiate conversations, address additional concerns, or make further changes.

If a comment is resolved by mistake, it can be reopened. Adding a new comment to a resolved discussion will also re-open the thread.

Follow the steps below to reopen a comment:

<figure style="width:400px;">
<img src="./comments-unresolved.gif" alt="Unresolving comments in designer" />
  <figcaption>Unresolving comments in designer</figcaption>
</figure>

## Managing Comment Notifications

Each time that a new comment is made in a design, remark placed into existing comment, a comment is resolved or reopened, you and your collaborators might receive notification via email.

<figure style="width:400px;">
<img src="./example-notification-email.png" alt="Example email notification received when design comment is made" />
  <figcaption>Example email notification received when design comment is made.</figcaption>
</figure>

As the owner of a design, you will recieve notification each time a comment is made in your design. Tag other users and have them receive notificaiton of your comment by mentioning their username with the `@` symbol.

All users participating in a comment will be notified as new remarks are added in a comment thread.

As new comments are added into the your design, collaborators (other users) with which you have shared the design, will not receive notification unless they are tagged in that comment.

### Enable Email Notifications

Customize your [notification preferences](/cloud/identity/users/notification-preferences) to receive emails for comments on your design. When this is enabled, you'll be notified when comments are made on your design, you're mentioned in a comment, or someone adds a comment to a thread you've previously engaged with.

### Mute Comment Notifications

Customize your notification preferences to mute email notifications for comments on your design. With notifications for new comments silenced, you won't receive email notifications for new comments on your design. This can be useful if you want to temporarily pause notifications or reduce email clutter.

<figure style="width:400px;">
  <img src="./comment-notificationBell.png" alt="Turn Off notification from comments in designer" style="width:auto">
  <figcaption>Example of comments in Designer</figcaption>
</figure>

#### What Muting Affects

- **Muted Comment Thread:** This includes all subsequent replies within the same thread, whether directed at you or not.
- **Your Mentions:** You won't receive email alerts when someone mentions you in the muted design's comment thread.

#### What Muting Doesn't Affect

- **Mentions in Other Designs:** You'll still be notified if someone mentions you in new or existing comment threads on other designs in your portfolio.
- **New Comment Threads:** Muting only applies to the specific comment thread it's activated on. New threads on the same design will trigger notifications as usual.

{{< alert title="Muted Notifcations Reminder">}}

- While email alerts are muted, you can still access and view all comments on the design at any time.
- You'll never miss an important mention, as notifications for mentions outside the muted thread remain active.
{{< /alert >}}

{{< alert type="info" title="Missed Notifcations">}}
Kanvas does not track the read or unread status of messages inside comment threads for each user. If a user is mentioned, but misses the notification, they might not become aware of the comment until they receive a new notification for another comment in that conversation.
{{< /alert >}}

## Best Practices for Effective Design Reviews

### Resolving vs deleting comments

Resolving a comment hides it from the canvas but keeps its history, so you can always revisit or reopen it later. Deleting a comment removes it entirely — including all threads and history — and cannot be undone.

### Be specific and actionable

Provide specific feedback rather that the design can act on. Vague comments can lead to misunderstandings and delays in the design process. Support your feedback with examples or references. This can help clarify your point and provide the designer with tangible suggestions for improvement.

### Balance positive and contructive feedback

Frame feedback in a constructive manner, focusing on how things can be improved rather than just pointing out flaws. Acknowledge what works well in the design before delving into areas that need improvement. This helps maintain a positive and collaborative atmosphere.

### Regularly check and respond to comments

Stay engaged in the review process. Regularly check and respond to comments to keep the conversation alive and ensure a smooth workflow.

### Prioritize feedback

Highlight the most critical feedback first. This ensures that the designer focuses on the most important aspects for improvement.

<!-- ## FAQs

**What if two people act at the same time?**

If someone resolves a comment while you're still typing in it, the comment will immediately close for both of you. You'll see a message letting you know that the thread was resolved.
 -->