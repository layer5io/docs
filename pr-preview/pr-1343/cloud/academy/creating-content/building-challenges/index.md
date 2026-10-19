# Build a Challenge


> A step-by-step guide to building a hands-on challenge in the Academy, and to monitoring how learners get on with it.



In [Layer5 Academy](https://cloud.layer5.io/academy/), a **Challenge** is a hands-on, scenario-based task. Where a Learning Path teaches a subject from the ground up and a Certification tests knowledge a learner already has, a Challenge gives them a concrete problem and asks them to solve it.

## When to use a challenge

Choose a challenge when the learner should build, break, or fix something real and is scored on the result. Compare the content types in [Create Academy Content](/pr-preview/pr-1343/cloud/academy/creating-content/#choose-a-content-type).







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Challenge: Focus on Doing, Not Reading</h4>
  
      Choose a Challenge when the point is for the learner to build, break, or fix something real. If most of your material is explanation, it belongs in a <a href="/pr-preview/pr-1343/cloud/academy/creating-content/creating-your-learning-path/">Learning Path</a> instead.
  
</div>



## How to Create Your Challenge

Challenges are authored the same way as every other Academy content type: as Markdown in your organization's Academy content repository, published through a Git-native workflow. If you have not set that repository up yet, start with [Creating Content for the Academy](/pr-preview/pr-1343/cloud/academy/creating-content/creating-your-learning-path/), which covers the repository setup once for all three content types.

### Get your identifiers

Register the challenge in the Instructor Console and choose **Challenge** as the content type. The console generates the challenge `id` and a ready-to-paste front matter block. Use your organization's ID in the directory path. See [Create Academy Content](/pr-preview/pr-1343/cloud/academy/creating-content/#register-content-in-the-console).

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







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Sections Are Yours to Name</h4>
  
      <code>description</code>, <code>getting-started</code> and <code>faq</code> are a convention, not a fixed structure - the folder hierarchy you create is what the Academy renders as the challenge&rsquo;s navigation. Use the sections your scenario actually needs.
  
</div>



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







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Where `type` Comes From</h4>
  
      You do not set <code>type: &quot;challenge&quot;</code> on every file. The <code>content/challenges/_index.md</code> at the top of the section declares it once and cascades it to everything beneath, so each challenge inherits the right type - and therefore the right template - automatically.
  
</div>



### 3. Write the Scenario

The task's own `_index.md` is where you state the objective and the prerequisites, and the sections beneath it carry the detail:

- **Description** - what the challenge is about, and the numbered steps a learner must follow to complete it.
- **Getting Started** - how to get an environment ready, including any Meshery access the scenario needs.
- **FAQ** - the questions learners predictably ask.

Write the steps so that success is unambiguous. A challenge is scored, so a learner needs to know exactly what "done" looks like before they start.

### 4. Add the Assessment

Most challenges close with an exam that validates the learner's work. Exams in a challenge follow the same unified Academy assessment standard as every other content type.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">How to Create and Configure Exams</h4>
  
      For question types, scoring, passing percentages, question pools and retry settings, see the <a href="/pr-preview/pr-1343/cloud/academy/creating-content/integrating-assessments-in-the-academy/">Integrating Assessments in the Academy</a> guide.
  
</div>



### 5. Publish

Publishing a challenge is the same two-stage release process as the rest of your Academy content: a GitHub Release on your content repository, followed by a Layer5 Cloud release. Until both have happened, your changes will not be live. See [Publishing Your Content](/pr-preview/pr-1343/cloud/academy/creating-content/creating-your-learning-path/#publish).

## Monitor your challenge

The [Instructor Console](/pr-preview/pr-1343/cloud/academy/instructor-console-guide/) reports on challenges alongside your other content:

- **Learners** lists registrations. Filter by content type `Challenge` and by status to follow who is Registered, In Progress, Completed, Failed, or Withdrawn.
- **Curricula** shows registrations, completion rate, and pass rate for each published challenge.
- **Overview** shows pass rates per assessment. A low pass rate separates a hard challenge from unclear instructions only when the attempt count is high enough to mean something.














































































































































































































































































































































































































































































<div class="feature-tiers">

<table class="feature-tiers-table">
  <caption>Academy</caption>
  <thead>
    <tr>
      <th scope="col">Capability</th>
      <th scope="col">What it does</th>
      <th scope="col">Free</th>
      <th scope="col">Team Designer</th>
      <th scope="col">Team Operator</th>
      <th scope="col">Enterprise</th>
    </tr>
  </thead>
  <tbody>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <tr>
      <th scope="row">Academy Theoretical Learning</th>
      <td>A comprehensive learning management system for creators and instructors on how to build, manage, and extend educational content like learning paths, challenges, and certifications.</td>
      
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
    </tr>
    
    
    
    
    
    
    <tr>
      <th scope="row">Academy Practical Learning</th>
      <td>An inclusive, collaborative, hands-on learning environment for students.</td>
      
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">-</span><span class="sr-only">Not included</span></td>
      
      <td class="tier-cell"><span aria-hidden="true">&#10003;</span><span class="sr-only">Included</span></td>
      
    </tr>
    
    
    
    
    
    
    
    
    
    
    
    
    
  </tbody>
</table>

</div>


## Learner outcomes

Completing all the required components of a challenge earns the learner a digital badge - a verifiable credential they can share on their professional profiles. Unlike a Certification, a Challenge does not issue a paid Certificate of Completion; its outcome is the score, the rank, and the badge.

The badge is awarded when the learner passes the final test of the challenge. See the [Learner Guide](/pr-preview/pr-1343/cloud/academy/using-the-academy/) for the learner's side of this.

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

Through the Academy catalog, filtered by **Content Type** → **Challenge**. See [Exploring the Content Catalog](/pr-preview/pr-1343/cloud/academy/using-the-academy/).
</details>

