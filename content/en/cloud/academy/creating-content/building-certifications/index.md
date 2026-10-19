---
title: Build a Certification
linkTitle: Build a Certification
weight: 30
diataxis: how-to
description: >
  A step-by-step guide to building a professional certification in the Academy.
categories: [academy]
tags: [academy]
---

In [Layer5 Academy](https://cloud.layer5.io/academy/), a **Certification** is a formal assessment designed to validate a learner's professional skills in a specific domain. Unlike a Learning Path, which guides a user through a curriculum, a Certification's primary goal is evaluation.

The successful completion of a Certification results in an official, shareable **Certificate of Completion** and a valuable badge, signifying a verified level of proficiency.

## When to use a certification

Choose a certification when the goal is to test, not teach. It assumes prior knowledge. Compare the content types in [Create Academy Content]({{< ref "cloud/academy/creating-content/_index.md#choose-a-content-type" >}}).

{{< alert type="info" title="Certification: Focus on Assessment, Not Instruction" >}}
A Certification is ideal when the main objective is to test, not teach. It assumes learners have prior knowledge and are ready to prove their expertise. If the objective is instead for the learner to solve a concrete, hands-on problem, build a [Challenge]({{< ref "cloud/academy/creating-content/building-challenges/index.md" >}}) rather than a Certification.
{{< /alert >}}

## How to Create Your Certification

Building a new certification involves setting up the correct directory structure and defining its properties through Markdown frontmatter.

### Get your identifiers

Register the certification in the Instructor Console and choose **Certification** as the content type. The console generates the certification `id` and a ready-to-paste front matter block. Use your organization's ID in the directory path. See [Create Academy Content]({{< ref "cloud/academy/creating-content/_index.md#register-content-in-the-console" >}}).

### 1. Set Up the Directory Structure

All content for a new certification must reside within the `content/certifications/<your-organization-uuid>` directory. To keep content organized, each certification has its own folder named with a descriptive, URL-friendly slug.

The final URL will follow this pattern: `https://cloud.layer5.io/academy/content/certifications/<your-organization-uuid>/<certification-folder-name>/`

Below is the standard file structure:

```
content/certifications/<your-organization-uuid>
└── layer5-certification-exam/   <-- The <certification-name> directory
    ├── _index.md                      <-- Defines the certification's metadata
    ├── exam-1.md                      <-- (Optional) A standard content page for introduction
    ├── optional-exam-2.md             <-- An optional supplementary exam
    └── exam-3.md                      <-- A mandatory exam, accessible after completing all previous required units.
```

**Key Files:**
- **`_index.md`**: The entry point for your certification containing all metadata (title, description, banner, etc.)
- **Exam Files (`*.md`)**: Individual Markdown files containing the exams. Order and optional status are controlled by frontmatter, not filename.

### 2. Define the Certification with Frontmatter

The `_index.md` file's frontmatter controls how the certification is presented to users..

Here's a complete example of the YAML frontmatter for a certification's `_index.md` file:

```yaml
---
type: "certification"
id: "<your-certification-uuid>"
title: "Layer5 Network Certification"
description: "Validate your expertise in Layer5 networking technologies through comprehensive assessment"
banner: "images/layer5-icon.svg"
weight: 1
tags: [layer5, cloud, infrastructure]
level: "beginner"
categories: [platform]
badge: 
    png: "https://images.credly.com/images/f28f1d88-428a-47f6-95b5-7da1dd6c1000/twitter_thumb_201604_KCNA_badge.png"
    svg: "https://images.credly.com/images/f28f1d88-428a-47f6-95b5-7da1dd6c1000/twitter_thumb_201604_KCNA_badge.png"
    title: "Layer5 Certified"
    description: "Earn the Certification badge to showcase your expertise in Layer5 cloud services."
---
```

#### Frontmatter Fields Reference

> In this table, fields marked with ✅  are required, while those marked with a hyphen are optional.

| Field | Required | Description |
| :--- | :--- | :--- |
| `type` | ✅  | Must be set to `"certification"` to identify this content correctly. |
| `id` | ✅  | **Crucial.** A stable ID used to track learner progress. **Do not change.** |
| `title` | ✅  | The human-readable title that will be displayed to users. |
| `description` | ✅  | A comprehensive summary of the certification's scope and objectives. |
| `weight` | - | Controls the display order (lower numbers appear first). Items are sorted alphabetically by title if not specified.|
| `banner` | - | Path to a banner image located in the same folder (Page Bundle).  |
| `tags` | - | Keywords for content discovery. Multiple tags can be selected. |
| `level` | - | A string for the intended difficulty (`beginner`, `intermediate`, `advanced`). Default: `beginner`. |
| `categories` | - | A string that assigns the certification to a specific category. |
| `badge` | - | Defines the awarded digital badge. The png and svg fields accept either a full remote URL or a local file path for an image in the same folder (e.g., layer5-badge.svg).|

### 3. Add Content and Exams

A certification is primarily composed of exams. However, you can also include standard content pages to provide context.

  - **Exams:** The core assessable components. A certification can contain one or multiple exams.
  - **Informational Pages:** Standard Markdown pages that can serve as an introduction, a study guide, or a list of helpful resources.

{{< alert type="info" title="How to Create and Configure Exams" >}}
Every "Exam" file within a certification follows the unified Academy assessment standard.

For detailed instructions on how to write an exam file, define various question types, set scoring and passing percentages, and use advanced options, please refer to our comprehensive [Integrating Assessments in the Academy]({{< ref "cloud/academy/creating-content/integrating-assessments-in-the-academy.md" >}}) guide.
{{< /alert >}}

### 4. Manage question pools and test attempts

A **test** can include more questions than those presented to users in a single attempt, effectively turning it into a **test bank**, the collection of all possible questions available for that test. When users retry the test, a new set of questions is drawn from the test bank for each attempt.

This behavior is controlled by the `numberOfQuestions` property in the front matter.

* If `numberOfQuestions` is **not defined**, all questions in the test are used in every attempt.
* If it **is defined**, the test is automatically divided into multiple sets, each containing the specified number of questions.

To ensure even division, the **total number of questions** must be a **multiple** of `numberOfQuestions`.

By default, the **number of retries** is set to the number of generated sets. However, you can increase it, in which case the question sets will **cycle** through repeatedly across attempts.

{{< alert type="warning" title="Multi-Exam Certification Settings" >}}
For certifications containing multiple exams, each exam may have its own test bank, question count, and retry settings.  
These configurations are defined per test and may differ across exams within the same certification.
{{< /alert >}}




## Learner outcomes

| Outcome | When it is awarded | Details |
| --- | --- | --- |
| Badge | The learner passes the certification's final test. | Named by the content's badge setting. A badge setting that points at a badge that no longer exists awards nothing, and the failure is logged. |
| Certificate of Completion | The same moment, when the certification defines a certificate. | Free learning and exams; certificate issuance is an optional paid feature. Each certificate gets its own ID, the recipient's name, the organization, and the issue date. It is served at a public certificate page, and the learner receives an email. A failed email does not undo the certificate. |
| Registration status | Becomes Completed. | Visible to instructors in the console. |

Certificates do not carry an expiry date. Attempt limits and time limits come from each exam's settings, covered in [Add Assessments]({{< ref "cloud/academy/creating-content/integrating-assessments-in-the-academy.md" >}}). You do not handle certificate payment; the platform does.

{{< feature-tiers categories="Academy" >}}

## Frequently Asked Questions

<details>
  <summary>Can my certification have only one exam?</summary>
  
Yes, it can. The simplest form of a certification consists of a single final exam. You can also include multiple independent exams if you wish to assess different skills.
</details>

<details>
  <summary>When should I choose to create a "Certification" instead of a "Learning Path"?</summary>
  
You should choose a Certification when your primary goal is to **test and assess** a learner's existing knowledge, rather than **teaching them** from scratch. A Learning Path focuses on instruction, while a Certification focuses on assessment.
</details>

<details>
  <summary>What does an "Optional" exam mean, and how does it affect a learner's progress?</summary>
  
An optional exam is supplementary material. Learners can take it, but they **do not** have to pass it to earn the final certificate. Its score **does not count** towards the certification's passing requirements. This is typically used for extra practice or to test non-core knowledge.
</details>

<details>
  <summary>How do I set an exam as "Optional"?</summary>
  
You need to add a specific field, `isOptional: true`, to the front matter of the exam's `.md` file. This field tells the system that the exam is not a mandatory requirement to pass the certification.
</details>

<details>
  <summary>Can I control the order of multiple exams within a certification?</summary>
  
Yes, you can. Each exam file's front matter has a `weight` field. Lower numbers result in an earlier display order. If you don't set a `weight`, the exams will be sorted alphabetically by file title by default.
</details>
