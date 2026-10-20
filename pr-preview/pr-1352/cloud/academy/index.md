# Academy

> Learn how to use, build, manage, and extend the Layer5 Academy.



[Layer5 Academy](https://cloud.layer5.io/academy/) is a platform that provides a comprehensive learning experience for anyone beginning their journey into cloud native infrastructure or advancing along that path.

##### Three types of Academy content formats

1. **Learning Paths**: Guided sequences of courses that break down complex topics into manageable modules.
2. **Challenges**: Practical exercises that focus on solving specific problems, often structured in a competitive or scenario-based format.
3. **Certifications**: Formal assessments that validate professional skills and provide recognized credentials.

##### Roles Served

- [Learners](https://docs.layer5.io/cloud/academy/using-the-academy/): Engage with Learning paths, challenges, and certifications to build and validate cloud-native skills
- [Content Creators (Instructors)](https://docs.layer5.io/cloud/academy/creating-content/): Develop and publish structured materials, and manage the overall learning experience
- [Platform Developers](https://docs.layer5.io/cloud/academy/platform-development/): Extend and maintain the Academy platform, enabling new features and integrations

Academy is an Enterprise-tier capability. An organization needs an Academy configuration from Layer5 before it can publish its own content. All three content types share the same lifecycle, enrollment model, and test engine. They differ in intent and in the credential they award.

| | Learning path | Challenge | Certification |
|---|---|---|---|
| Assessment | Tests throughout. Final tests gate completion. Practice tests do not. | Tests that verify the solution. Final tests gate completion. | Exams. The final exam gates completion. |
| Credential | Completion badge | Completion badge | Completion badge, plus a certificate when the content defines one |

Every test follows the same rules for scoring, attempt limits, time limits, and prerequisites. The [Learner Guide](/pr-preview/pr-1352/cloud/academy/using-the-academy/) describes them.

## How content flows

Academy content is written as Markdown in the organization's own Git repository. Layer5 Cloud holds the registry of that content and every learner's record against it.

1. **Author.** A content creator registers the content in Layer5 Cloud, choosing its type, title, level, categories, tags, workspace, team, access end date, and the badge it awards. New content starts as public, beginner, and not ready. The creator then writes the Markdown in the organization's Git repository.
2. **Publish.** An organization admin or owner publishes a version. The publish workflow sends the organization ID and version to Layer5 Cloud, which builds that version into the Academy site. Content counts as published once its status is ready.
3. **Catalog.** Published content appears in the Academy catalog. The catalog is public: anyone can browse it without signing in. An organization's own Academy domain shows only that organization's content.
4. **Enroll.** A signed-in learner enrolls, which creates a registration with status `Registered`. If the content carries an invitation, enrolling also accepts it and adds the learner to the invitation's team.
5. **Learn and test.** Layer5 Cloud records the current item, completed items, quiz grades, and time spent. Each test attempt is a timed session scored on the server.
6. **Credential.** Passing the final test marks the registration `Completed`, awards the content's badge, and issues a certificate if the content defines one. A certificate has a public verification page and arrives by email.
7. **Measure.** Instructors watch registrations, completion, and test pass rates in the [Instructor Console](/pr-preview/pr-1352/cloud/academy/creating-content/instructor-console-guide/), and can withdraw learners or update the content's team, access, expiry, workspace, and badge.

Layer5 Cloud records each of these Academy events in the organization's audit log: content created, updated, or deleted; registration and withdrawal; progress updates and completion; content marked ready; test started and evaluated; and certificate issued.

## Roles and capabilities

Access follows the role a user holds in the organization that owns the content. The Learner role grants access to Academy content. The instructor console requires the View Academy Metrics permission, which Academy Admin, Organization Admin, and Provider Admin hold by default.

| Capability | Anonymous | Learner | Academy Admin | Organization Admin | Provider Admin |
|---|---|---|---|---|---|
| Browse the catalog | Yes | Yes | Yes | Yes | Yes |
| Enroll, take tests, earn badges and certificates | No (sign-in required) | Yes | Yes | Yes | Yes |
| Withdraw your own registration | No | Yes | Yes | Yes | Yes |
| Withdraw another learner's registration | No | No | Yes | Yes | Yes |
| Use the instructor console | No | No | Yes | Yes | Yes |
| Create, update, and delete content | No | No | Yes | Yes | Yes |
| Publish a content version | No | No | No | Yes (organization admin or owner) | Yes |

