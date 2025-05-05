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

<button class="kbc-button kbc-button-xs">⌘/CTL + M</button> Add a comment into your design when you press this hotkey combination. After pressing the hotkey, a new comment will be displayed. You can move the new comment anywhere in your design.

## Design review using comments

<figure style="width:400px;">
  <img src="./conversation-screenshot.png" alt="Peer review using comments in Designer" />
  <figcaption>Peer review using comments in Designer</figcaption>
</figure>

### Initiate Threads

You can initiate a comment thread by just adding a comment. Your comment may be a request for design review or feedback on a design. Team members can reply directly to comments to for a comment thread. This creates a structured dialogue around each point of feedback for easy referencing.

### Utilize Mentions

Easily draw the attention of relevant team members by tagging them in your comment. To activate this, type @ in the comment box and a list of your team members will appear then you can select who you want to mention. This ensures that the right people are notified and can contribute to the discussion.

### Comment on Specific Elements

Leave comments on specific elements within the design, whether it's a shape, text, or an entire component. This specificity ensures that feedback is targeted and directly related to the part of the design under discussion.
  
### Avoid Dangling Threads / Resolving Comment

Once revisions are complete, you can resolve the comment. This action closes the comment thread and signifies that the conversation around that feedback has concluded.

### View Comment History

After resolving a comment thread, you can access the comment history to review previous discussions and decisions. This is particularly useful for tracking changes and understanding the evolution of the design.

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

## Managing Comment Notifications

### Enable Email Notifications

Customize your [notification preferences](/cloud/identity/users/notification-preferences) to receive emails for comments on your design. When this is enabled, you'll be notified when comments are made on your design, you're mentioned in a comment, or someone adds a comment to a thread you've previously engaged with.

### Unresolving (reopening) Comments

After a comment has been resolved, there might be situations where you need to reopen the discussion. Unresolving a comment allows you to reinitiate conversations, address additional concerns, or make further changes. Follow the steps below to unresolve a comment:

<figure style="width:400px;">
<img src="./comments-unresolved.gif" alt="Unresolving comments in designer" />
  <figcaption>Unresolving comments in designer</figcaption>
</figure>

**Resolving vs Deleting**

Resolving a comment hides it from the canvas but keeps its history, so you can always revisit or reopen it later. Deleting a comment removes it entirely — including all threads and history — and cannot be undone.

**What if two people act at the same time?**

If someone resolves a comment while you're still typing in it, the comment will immediately close for both of you. You'll see a message letting you know that the thread was resolved.

### Mute Comment Notifications

Customize your notification preferences to mute email notifications for comments on your design. With notifications for new comments silenced, you won't receive email notifications for new comments on your design. This can be useful if you want to temporarily pause notifications or reduce email clutter.

<figure style="width:400px;">
  <img src="./comment-notificationBell.png" alt="Turn Off notification from comments in designer" style="width:auto">
  <figcaption>Example of comments in Designer</figcaption>
</figure>

**What Muting Affects:**

- *Muted Design's Comment Thread:* This includes all subsequent replies within the same thread, whether directed at you or not.
- *Your Mentions:* You won't receive email alerts when someone mentions you in the muted design's comment thread.

**What Muting Doesn't Affect:**

- *Mentions in Other Designs:* You'll still be notified if someone mentions you in new or existing comment threads on other designs in your portfolio.
- *New Comment Threads:* Muting only applies to the specific comment thread it's activated on. New threads on the same design will trigger notifications as usual.

{{< alert title="Remember">}}
- While email alerts are muted, you can still access and view all comments on the design at any time.
- You'll never miss an important mention, as notifications for mentions outside the muted thread remain active.
{{< /alert >}}

## Best Practices for Effective Design Reviews

### Be specific and actionable

Provide specific feedback rather that the design can act on. Vague comments can lead to misunderstandings and delays in the design process. Support your feedback with examples or references. This can help clarify your point and provide the designer with tangible suggestions for improvement.

### Balance positive and contructive feedback

Frame feedback in a constructive manner, focusing on how things can be improved rather than just pointing out flaws. Acknowledge what works well in the design before delving into areas that need improvement. This helps maintain a positive and collaborative atmosphere.

### Regularly check and respond to comments

Stay engaged in the review process. Regularly check and respond to comments to keep the conversation alive and ensure a smooth workflow.

### Prioritize feedback

Highlight the most critical feedback first. This ensures that the designer focuses on the most important aspects for improvement.

{{< alert title="Share your thoughts">}}
Your feedback is invaluable! If you encounter any issues or have suggestions for enhancement, please take a moment to provide feedback.
{{< /alert >}}