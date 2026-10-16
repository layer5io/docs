---
title: Build a Challenge
linkTitle: Build a Challenge
weight: 20
diataxis: how-to
description: >
  A step-by-step guide to building a hands-on challenge in the Academy, and to monitoring how learners get on with it.
categories: [academy]
tags: [academy]
---

In [Layer5 Academy](https://cloud.layer5.io/academy/), a **Challenge** is a hands-on, scenario-based task. Where a Learning Path teaches a subject from the ground up and a Certification tests knowledge a learner already has, a Challenge gives them a concrete problem and asks them to solve it.

## When to use a challenge

Choose a challenge when the learner should build, break, or fix something real and is scored on the result. Compare the content types in [Create Academy Content]({{< ref "cloud/academy/creating-content/_index.md#choose-a-content-type" >}}).

{{< alert type="info" title="Challenge: Focus on Doing, Not Reading" >}}
Choose a Challenge when the point is for the learner to build, break, or fix something real. If most of your material is explanation, it belongs in a [Learning Path]({{< ref "cloud/academy/creating-content/creating-your-learning-path/index.md" >}}) instead.
{{< /alert >}}

## How to Create Your Challenge

Challenges are authored the same way as every other Academy content type: as Markdown in your organization's Academy content repository, published through a Git-native workflow. If you have not set that repository up yet, start with [Creating Content for the Academy]({{< ref "cloud/academy/creating-content/creating-your-learning-path/index.md" >}}), which covers the repository setup once for all three content types.

### Get your identifiers

Register the challenge in the Instructor Console and choose **Challenge** as the content type. The console generates the challenge `id` and a ready-to-paste front matter block. Use your organization's ID in the directory path. See [Create Academy Content]({{< ref "cloud/academy/creating-content/_index.md#register-content-in-the-console" >}}).

### 1. Set Up the Directory Structure

All challenges live under `content/challenges/<your-organization-uuid>`, each in its own folder named with a descriptive, URL-friendly slug. The final URL follows this pattern:

`https://cloud.layer5.io/academy/content/challenges/<your-organization-uuid>/<challenge-folder-name>/`

A challenge is typically one scenario broken into a few sections:

```text
content/challenges/<your-organization-uuid>
└── keda-autoscaling-challenge/     <-- The <challenge-name> directory
    ├── _index.md                   <-- Defines the challenge's metadata
    ├── keda-icon.svg               <-- Banner image, referenced from the front matter
    └── autoscaling-with-keda/      <-- The task itself
        ├── _index.md               <-- The objective and prerequisites
        └── content/
            ├── description/        <-- What the challenge is about, and the steps
            ├── getting-started/    <-- How to set up and begin
            └── faq/                <-- Common questions
```

A challenge that ships an interactive lab and a graded exam adds them as their own sections alongside the task:

```text
content/challenges/<your-organization-uuid>
└── heal-the-mesh/
    ├── _index.md
    ├── lab/
    │   └── _index.md               <-- The hands-on lab
    └── exam/
        └── _index.md               <-- The assessment that closes the challenge
```

{{< alert type="info" title="Sections Are Yours to Name" >}}
`description`, `getting-started` and `faq` are a convention, not a fixed structure - the folder hierarchy you create is what the Academy renders as the challenge's navigation. Use the sections your scenario actually needs.
{{< /alert >}}

### 2. Define the Challenge with Front Matter

The `_index.md` at the root of the challenge folder carries its metadata. Here is a complete example, taken from a published challenge:

```yaml
---
title: "CNCF Autoscaling Challenge"
description: "Learn event-driven autoscaling in Kubernetes. Work with scaled objects in KEDA, monitoring with Prometheus, OpenTelemetry & CloudEvents and advanced KEDA configurations."
banner: "keda-icon.svg"
id: "<your-challenge-uuid>"
weight: 1
tags: [meshery, keda, open source]
level: "advanced"
categories: [platform]

prerequisite_knowledge:
  - title: "Access to Meshery"
    children:
      - title: "Self-hosted Meshery"
        link: "https://docs.meshery.io/installation"
      - title: "Meshery Playground"
        link: "https://play.meshery.io"

additional_attributes:
  - title: "Retake Policy"
    value: "3"
    description: "Up to three retakes allowed per exam"
---
```

#### Front Matter Fields Reference

> Fields marked ✅ are required; those marked - are optional.

| Field | Required | Description |
| :--- | :--- | :--- |
| `id` | ✅ | **Crucial.** A stable UUID used to track learner progress. **Do not change it** once learners have enrolled. |
| `title` | ✅ | The human-readable title shown to learners. |
| `description` | ✅ | A summary of the scenario. This is the text learners read on the catalog card. |
| `weight` | - | Controls display order (lower numbers appear first). Items are sorted alphabetically by title if not specified. |
| `banner` | - | Path to a banner image in the same folder (Page Bundle). |
| `tags` | - | Keywords for discovery. Learners can browse by tag. |
| `level` | - | Intended difficulty: `beginner`, `intermediate` or `advanced`. Default: `beginner`. |
| `categories` | - | Assigns the challenge to a category. |
| `badge` | - | Defines the digital badge awarded on completion. Its `png` and `svg` fields accept a full remote URL or a local file path in the same folder. |
| `prerequisite_knowledge` | - | What a learner needs before starting, rendered as a list with optional links. |
| `additional_attributes` | - | Free-form title/value/description rows, used for things like retake policy and scoring. |

{{< alert type="info" title="Where `type` Comes From" >}}
You do not set `type: "challenge"` on every file. The `content/challenges/_index.md` at the top of the section declares it once and cascades it to everything beneath, so each challenge inherits the right type - and therefore the right template - automatically.
{{< /alert >}}

### 3. Write the Scenario

The task's own `_index.md` is where you state the objective and the prerequisites, and the sections beneath it carry the detail:

- **Description** - what the challenge is about, and the numbered steps a learner must follow to complete it.
- **Getting Started** - how to get an environment ready, including any Meshery access the scenario needs.
- **FAQ** - the questions learners predictably ask.

Write the steps so that success is unambiguous. A challenge is scored, so a learner needs to know exactly what "done" looks like before they start.

### 4. Add the Assessment

Most challenges close with an exam that validates the learner's work. Exams in a challenge follow the same unified Academy assessment standard as every other content type.

{{< alert type="info" title="How to Create and Configure Exams" >}}
For question types, scoring, passing percentages, question pools and retry settings, see the [Integrating Assessments in the Academy]({{< ref "cloud/academy/creating-content/integrating-assessments-in-the-academy.md" >}}) guide.
{{< /alert >}}

### 5. Publish

Publishing a challenge is the same two-stage release process as the rest of your Academy content: a GitHub Release on your content repository, followed by a Layer5 Cloud release. Until both have happened, your changes will not be live. See [Publishing Your Content]({{< ref "cloud/academy/creating-content/creating-your-learning-path/index.md#publish" >}}).

## Monitor your challenge

The [Instructor Console]({{< ref "cloud/academy/instructor-console-guide/index.md" >}}) reports on challenges alongside your other content:

- **Learners** lists registrations. Filter by content type `Challenge` and by status to follow who is Registered, In Progress, Completed, Failed, or Withdrawn.
- **Curricula** shows registrations, completion rate, and pass rate for each published challenge.
- **Overview** shows pass rates per assessment. A low pass rate separates a hard challenge from unclear instructions only when the attempt count is high enough to mean something.

{{< feature-tiers categories="Academy" >}}

## Learner outcomes

Completing all the required components of a challenge earns the learner a digital badge - a verifiable credential they can share on their professional profiles. Unlike a Certification, a Challenge does not issue a paid Certificate of Completion; its outcome is the score, the rank, and the badge.

The badge is awarded when the learner passes the final test of the challenge. See the [Learner Guide]({{< ref "cloud/academy/using-the-academy/index.md" >}}) for the learner's side of this.

## Frequently Asked Questions

<details>
<summary>Can a challenge have more than one task?</summary>

Yes. The folder hierarchy beneath the challenge's `_index.md` is what defines its structure, so a challenge can hold several sections. Most challenges are a single scenario because that keeps the objective sharp, but nothing prevents a longer one.
</details>

<details>
<summary>Does a challenge have to include an exam?</summary>

No. An exam is the usual way to validate that the learner solved the problem, but a challenge whose completion is judged by a lab does not need one.
</details>

<details>
<summary>Can I change a challenge after learners have started it?</summary>

You can edit its content freely - but never change its `id`. That UUID is what learner progress is recorded against, and changing it orphans every registration made against the old value.
</details>

<details>
<summary>How do learners find my challenge?</summary>

Through the Academy catalog, filtered by **Content Type** → **Challenge**. See [Exploring the Content Catalog]({{< ref "cloud/academy/using-the-academy/index.md" >}}).
</details>
