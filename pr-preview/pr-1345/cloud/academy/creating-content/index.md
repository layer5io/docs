# Create Academy Content

> Register a learning path, challenge, or certification in the Instructor Console, write it in your Git repository, and publish it to your organization's Academy.



Academy content is written as Markdown in your organization's own Git repository and published as a numbered version. Layer5 Cloud holds the record of each piece of content (its identity, access rules, and badge) and every learner's registration, progress, and test results. This guide covers the workflow end to end. The pages beneath it cover each content type in depth.

## Prerequisites

- The **View Academy Metrics** permission in your organization (Academy Admin, Organization Admin, or Provider Admin). See the [Instructor Console](/pr-preview/pr-1345/cloud/academy/instructor-console-guide/).
- An organization with the Academy configured, so the console is not in its "not configured" state.
- Comfort with Git and Markdown.

## The workflow

1. **Register the content in the console.** The content creation flow creates the content record and generates the identifiers and front matter you paste into your repository.
2. **Write the content** in your repository, following the layout for its type.
3. **Preview locally** to check structure and links.
4. **Publish** by releasing a version of your repository. The release asks Layer5 Cloud to build your organization's Academy at that version.
5. **Monitor** registrations, completion, and pass rates in the console.

## Register content in the console

The creation flow collects the following. Only the content type is required to create the record. The record starts with status **not ready**, **public** visibility, and **beginner** level. Cloud generates the slug from the content type plus three random words.

| Step | Field | Behavior |
| --- | --- | --- |
| Basic Information | Content Type | Learning path, challenge, or certification. |
| Basic Information | Title, Description | Appear on the catalog card. |
| Content Details | Difficulty Level | `beginner`, `intermediate`, or `advanced`. |
| Content Details | Categories, Tags | Used for discovery in the catalog. |
| Content Details | Banner Image | Optional. A path to an image in the same folder as the content's index file. |
| Content Access | Workspace | An existing workspace, or a new one. |
| Content Access | Team | The team whose members can access the content. |
| Content Access | Status | Enabled or Disabled. |
| Content Access | Content Access End Date | When the invitation behind the content expires. |
| Recognition | Badge | The badge awarded when a learner completes the content. |
| Generate Template | Front matter and setup guide | The YAML to place at the top of the content's index file, with your identifiers. |

Registering content also creates an invitation for it. When a learner registers, the invitation is accepted at the same time, which adds the learner to the content's team. Content owned by the provider organization has no invitation.

You can change the team, access status, end date, workspace, and badge later from the Curricula view. Changing the content's `id` in your repository after learners register orphans their progress, because progress is recorded against that identifier.

## Choose a content type

| | Learning path | Challenge | Certification |
| --- | --- | --- | --- |
| Goal | Teach a subject from the ground up | Solve a hands-on scenario | Validate existing knowledge |
| Structure | Path, courses, modules, pages | One scenario with lab and exam sections | A flat set of exams |
| Assessment | Quizzes and exams, mandatory or optional | An exam closes most challenges | One or more exams |
| Credential | Badge | Badge | Badge, and an optional paid certificate |

## In this section

- [Create a Learning Path](/pr-preview/pr-1345/cloud/academy/creating-content/creating-your-learning-path/): repository setup, structure, front matter, preview, and publishing, which apply to every content type.
- [Build a Challenge](/pr-preview/pr-1345/cloud/academy/creating-content/building-challenges/)
- [Build a Certification](/pr-preview/pr-1345/cloud/academy/creating-content/building-certifications/)
- [Add Assessments](/pr-preview/pr-1345/cloud/academy/creating-content/integrating-assessments-in-the-academy/): quiz, test, and exam files, question types, scoring, and attempt limits.
- [Use the Content Template Creator](/pr-preview/pr-1345/cloud/academy/creating-content/using-content-template-creator/): the registration flow, the front matter it generates, and the invitation behind each content item.
- [Extend the Academy](/pr-preview/pr-1345/cloud/academy/creating-content/extending-the-academy/): HTML, CSS, custom shortcodes, embedded designs, and award emails.
- [Platform Development](/pr-preview/pr-1345/cloud/academy/platform-development/): local preview, theme development, and end-to-end builds.

