# Content Creator Guide

> Learn how to create, manage, and publish learning paths, challenges, and certifications on the Layer5 Academy platform.



**Welcome, content creators and instructors!**

This guide provides all the necessary documentation for building high-quality educational content on the Layer5 Academy. We leverage a Git-native workflow, allowing you to use simple Markdown to create powerful, interactive learning experiences.

**This section covers the entire content creation lifecycle, including:**

* Structuring your first Learning Path from scratch.
* Writing course materials and embedding interactive labs.
* Designing effective quizzes and assessments.
* Managing and publishing your content.

Each content type also has a dedicated build guide:

* [Creating Content for the Academy](/pr-preview/pr-1354/cloud/academy/creating-content/creating-your-learning-path/) - repository setup and learning paths.
* [Building Challenges](/pr-preview/pr-1354/cloud/academy/creating-content/building-challenges/) - hands-on, scenario-based tasks.
* [Building Certifications](/pr-preview/pr-1354/cloud/academy/creating-content/building-certifications/) - formal assessments and certificates.
* [Instructor Console](/pr-preview/pr-1354/cloud/academy/creating-content/instructor-console-guide/) - registrations, completion, and pass rates.
* [Integrating Assessments](/pr-preview/pr-1354/cloud/academy/creating-content/integrating-assessments-in-the-academy/) - quiz, test, and exam files, question types, scoring, and attempt limits.
* [Using the Content Template Creator](/pr-preview/pr-1354/cloud/academy/creating-content/using-content-template-creator/) - the registration flow, the front matter it generates, and the invitation behind each content item.
* [Extending the Academy](/pr-preview/pr-1354/cloud/academy/creating-content/extending-the-academy/) - HTML, CSS, custom shortcodes, embedded designs, and award emails.
* [Platform Development](/pr-preview/pr-1354/cloud/academy/platform-development/) - local preview, theme development, and end-to-end builds.

## Register content in the console

The content creation flow creates the content record and generates the identifiers and front matter you paste into your repository. Only the content type is required to create the record. The record starts with status **not ready**, **public** visibility, and **beginner** level. Cloud generates the slug from the content type plus three random words.

| Step | Field | Behavior |
| --- | --- | --- |
| Basic Information | Content Type | Learning path, challenge, or certification. |
| Basic Information | Title, Description | Appear on the catalog card. |
| Content Details | Difficulty Level | `beginner`, `intermediate`, or `advanced`. |
| Content Details | Categories, Tags | Used for discovery in the catalog. |
| Content Details | Banner Image | Optional. A path to an image in the same folder as the content's index file. |
| Content Access | Workspace | An existing workspace, or a new one. |
| Content Access | Team | One existing team. Learners join it when they enroll. |
| Content Access | Status | Enabled or Disabled. Disabled blocks new enrollment. |
| Content Access | Content Access End Date | When the invitation behind the content expires. Empty means no expiry. |
| Recognition | Badge | The badge awarded when a learner completes the content. |
| Generate Template | Front matter | The YAML to place at the top of the content's index file, including the content ID. |

Registering content also creates an invitation, except when the content is owned by the provider organization. When a learner registers, that invitation is accepted at the same time, which adds the learner to the content's team and assigns the Academy Learner role if the learner does not already hold it.

You can change the team, access status, end date, workspace, and badge later from the Curricula view. Changing the content's `id` in your repository after learners register orphans their progress, because progress is recorded against that identifier.

Opening the console requires the **View Academy Metrics** permission (Academy Admin, Organization Admin, or Provider Admin). The organization must already have the Academy configured, or the console stays in its "not configured" state.
