# Academy

> What the Layer5 Academy is, how its three content types relate, how content moves from an author's repository to a learner's certificate, and which roles can do what.



[Layer5 Academy](https://cloud.layer5.io/academy/) is the learning platform built into Layer5 Cloud. Organizations use it to publish structured training on cloud native infrastructure, assess what learners know, and award verifiable badges and certificates. Layer5 Cloud tracks every learner's enrollment, progress, and test results, and gives instructors a console to measure how their content performs.

Academy is an Enterprise-tier capability. An organization needs an Academy configuration from Layer5 before it can publish its own content.

## Content types

Academy content comes in three types. All three share the same lifecycle, enrollment model, and test engine. They differ in intent.

| | Learning path | Challenge | Certification |
|---|---|---|---|
| **Structure** | A guided sequence of courses that breaks a broad topic into modules | A focused, scenario-based exercise built around one problem | A formal assessment of skills the learner already has |
| **Outcome** | Systematic understanding of a subject from the ground up | Hands-on experience solving a specific, realistic problem | Proof of professional competence |
| **Assessment** | Tests throughout; final tests gate completion, practice tests do not | Tests that verify the solution; final tests gate completion | Exams; the final exam gates completion |
| **Credential** | Completion badge | Completion badge | Completion badge, plus a certificate when the content defines one |

Every test, in every content type, follows the same rules for scoring, attempt limits, time limits, and prerequisites. The [Learner Guide](/pr-preview/pr-1326/cloud/academy/using-the-academy/) describes them in full.

## Audiences

The Academy serves three audiences, each with its own guide.

- **Learners** browse the catalog, enroll, work through content, pass tests, and earn credentials. Start with the [Learner Guide](/pr-preview/pr-1326/cloud/academy/using-the-academy/).
- **Content creators and instructors** write and publish content for their organization and track learner outcomes. Start with [Creating Content](/pr-preview/pr-1326/cloud/academy/creating-content/), then see [Creating Your Learning Path](/pr-preview/pr-1326/cloud/academy/creating-content/creating-your-learning-path/), [Building Challenges](/pr-preview/pr-1326/cloud/academy/creating-content/building-challenges/), [Building Certifications](/pr-preview/pr-1326/cloud/academy/creating-content/building-certifications/), and the [Instructor Console Guide](/pr-preview/pr-1326/cloud/academy/instructor-console-guide/).
- **Platform developers** extend and maintain the Academy platform itself. Start with [Platform Development](/pr-preview/pr-1326/cloud/academy/platform-development/).

## How content flows

Academy content is not written inside Layer5 Cloud. Authors keep it as Markdown in their organization's own Git repository, and Layer5 Cloud holds the registry of that content and every learner's record against it.

1. **Author.** A content creator registers a new piece of content in Layer5 Cloud, choosing its type, title, level, categories, tags, workspace, team, access end date, and the badge it awards. New content starts as Public, Beginner level, and not ready. The creator then writes the content as Markdown in the organization's Git repository.
2. **Publish.** An organization admin or owner publishes a version of the content. The publish workflow in the content repository sends the organization ID and version to Layer5 Cloud, which builds that version into the Academy site. Content counts as published once its status is ready.
3. **Catalog.** Published content appears in the Academy catalog. The catalog is public: anyone can browse it without signing in. An organization's own Academy domain shows only that organization's content.
4. **Enroll.** A signed-in learner enrolls, which creates a registration with status `Registered`. If the content carries an invitation, enrolling also accepts it and adds the learner to the invitation's team.
5. **Learn and test.** As the learner works through the content, Layer5 Cloud records the current item, completed items, quiz grades, and time spent. Each test attempt is a timed session scored on the server.
6. **Credential.** Passing the final test marks the registration `Completed`, awards the content's badge, and issues a certificate if the content defines one. A certificate has a public verification page and arrives by email.
7. **Measure.** Instructors watch registrations, completion rates, and test pass rates in the instructor console, and can withdraw learners or update the content's team, access, expiry, workspace, and badge.

Layer5 Cloud records each Academy event in the organization's audit log: content created, updated, or deleted; registration and withdrawal; progress updates and completion; content marked ready; test started and evaluated; and certificate issued.

## Roles and capabilities

Access to Academy features follows the role a user holds in the organization that owns the content. The Learner role grants access to Academy content. The instructor console requires the View Academy Metrics permission, which the Academy Admin, Organization Admin, and Provider Admin roles hold by default.

| Capability | Anonymous | Learner | Academy Admin | Organization Admin | Provider Admin |
|---|---|---|---|---|---|
| Browse the catalog | Yes | Yes | Yes | Yes | Yes |
| Enroll, take tests, earn badges and certificates | No (sign-in required) | Yes | Yes | Yes | Yes |
| Withdraw your own registration | No | Yes | Yes | Yes | Yes |
| Withdraw another learner's registration | No | No | Yes | Yes | Yes |
| Use the instructor console | No | No | Yes | Yes | Yes |
| Create, update, and delete content | No | No | Yes | Yes | Yes |
| Publish a content version | No | No | No | Yes (organization admin or owner) | Yes |

