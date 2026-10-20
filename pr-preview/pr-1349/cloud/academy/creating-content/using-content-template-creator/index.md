# Use the Content Template Creator


> Register Academy content with the Content Template Creator, copy the front matter and identifiers it generates into your repository, and control who can enroll through the content's invitation.



The Content Template Creator is the five-step flow in the Instructor Console that registers a learning path, challenge, or certification and hands you the front matter to start writing it. One run does three things:

1. Creates the content's record in Layer5 Cloud, with status **not ready**, **public** visibility, and a generated slug.
2. Creates the invitation that governs who can enroll.
3. Generates the front matter, the content ID, and the organization ID that tie your repository files to that record.

The record is what learners enroll in, what progress and grades attach to, and what the Instructor Console reports on. The front matter is how your repository declares the same content, so the two must carry the same ID.

## Prerequisites

- The **View Academy Metrics** permission, held by Academy Admin, Organization Admin, and Provider Admin. See [Roles and Permissions](/pr-preview/pr-1349/cloud/reference/default-permissions/).
- A workspace and a team to assign. You can type a new workspace name instead of picking an existing one. The team must already exist.
- Optional: a badge to award on completion. The Recognition step can create one.

## Run the creator

The field list, with the behavior of each field, is in [Create Academy Content](/pr-preview/pr-1349/cloud/academy/creating-content/#register-content-in-the-console). Three details matter when you run it.

- **Team accepts one value.** The team you pick is added to the invitation, and learners join it when they enroll.
- **Access status** sets the invitation to enabled or disabled. It defaults to enabled. A disabled invitation blocks enrollment. See [How the invitation controls enrollment](#how-the-invitation-controls-enrollment).
- **Content Access End Date** sets the invitation's expiry. Leave it empty for no expiry.

![Screenshot of the Academy content creation flow in the Instructor Console](images/template-creator.png)

The creator writes the record when you advance from Recognition to Generate Template. You can go back to earlier steps and the entries you made stay in place, but advancing to the last step again creates another record with a new content ID and a new invitation. Use the ID on the final screen of your last run, and treat any earlier record as unused.

## The generated front matter

The last step shows the front matter with a copy button, followed by the content ID and your organization ID. For a certification titled "Meshery Contributors Certification", the output has this shape:

```yaml
---
type: "certification"
title: "Meshery Contributors Certification"
description: "A certification for developers who contribute to Meshery"
weight: 1
banner: "images/meshery-contributors-banner.svg"
id: "7c0f6a3e-2b1d-4c58-9d0e-5a1b2c3d4e5f"
tags: ["meshery", "kubernetes", "golang"]
categories: "open-source, cloud-native"
level: "beginner"
# competencies:
#   - title: "Domain Name"
#     percentage: 25
#     items:
#       - "Competency item 1"
# prerequisite_knowledge:
#   - title: "Prerequisite Title"
#     url: "https://example.com/resource"
#     description: "Brief description of the prerequisite"
---
A certification for developers who contribute to Meshery.
<!-- Add your Academy content here -->
```

| Key | Source | Notes |
| --- | --- | --- |
| `type` | Content type | `learning-path`, `challenge`, or `certification`. |
| `title`, `description` | Basic Information | Also appear on the catalog card. |
| `weight` | Fixed at `1` | Change it to order the content among its siblings. |
| `banner` | Content Details | Present only when you entered a banner. The path is relative to the folder that holds the content's index file. |
| `id` | Generated | The content ID. It links your files to the record. |
| `tags`, `categories` | Content Details | Present only when you entered values. |
| `level` | The content record | Always reads `beginner` at creation, whatever difficulty you picked. Set it to `beginner`, `intermediate`, or `advanced` yourself. |
| `competencies`, `prerequisite_knowledge` | Commented samples | Uncomment and fill them in to describe what an exam covers and what learners should know first. |

Paste the output into the content's index file in your repository, inside the directory named for your organization ID. Then write the content as described in [Create a Learning Path](/pr-preview/pr-1349/cloud/academy/creating-content/creating-your-learning-path/).







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Never change the content ID after learners enroll</h4>
  
      Registrations, progress, grades, and certificates are recorded against the content ID. Changing the <code>id</code> in your repository orphans the existing learners&rsquo; progress.
  
</div>



## How the invitation controls enrollment

Every content record created in an organization other than the provider organization has an invitation attached. Enrolling in the content accepts that invitation for the learner, and acceptance is where access is decided.

| Invitation setting | Value the creator sets | Effect on a learner who enrolls |
| --- | --- | --- |
| Name | `Academy Invitation for <slug>`, using the generated slug | Identifies the invitation in the organization's invitation list. |
| Role | Academy Learner | Assigned in the organization if the learner does not hold it. |
| Team | The team you picked | The learner is added to it if not already a member. |
| Status | Your Access status | A disabled invitation blocks enrollment. |
| Expiry | Your Content Access End Date | Checked at enrollment. Once it passes, new learners cannot enroll. Learners who already enrolled keep their role and team membership. |
| Email list | Empty | Anyone who is signed in can accept. Add exact addresses or `@domain` entries to restrict it. |
| Quota | Empty | Unlimited. A quota blocks enrollment once that many people have accepted. |

Acceptance is idempotent. A learner who accepts twice gains no duplicate membership or role, and the invitation counts them once.

When an enrollment hits a disabled, expired, full, or email-restricted invitation, the request fails with a server error. The registration is recorded before the invitation is evaluated, so the learner appears in the Learners view without having joined the organization or team. Fix the invitation, then have the learner enroll again.

You can change the team, access status, and end date later from the Curricula view of the [Instructor Console](/pr-preview/pr-1349/cloud/academy/instructor-console-guide/). Editing the invitation itself, to set a quota or restrict the email list, follows the [invitation guide](/pr-preview/pr-1349/cloud/guides/organizations/inviting-users/). To bring in a co-instructor, create an invitation with the Academy Admin role instead of Academy Learner.

## Content owned by the provider organization

Content created while the console is scoped to all organizations belongs to the provider organization. It has no attached invitation, so enrollment accepts nothing and grants no team or role.

