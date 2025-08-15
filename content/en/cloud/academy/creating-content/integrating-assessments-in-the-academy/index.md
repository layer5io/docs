---
title: Integrating Assessments in the Academy
weight: 4
description: >
  Learn how to spice up the Academy with interactive assessments that keep learners engaged.
categories: [Academy]
tags: [Academy]
aliases: 
- /cloud/academy/integrating-assessments-in-the-academy/
---

[Layer5 Cloud Academy](https://cloud.layer5.io/academy/) implements **Learning Paths**, **Challenges**, and **Certifications** to enrich the learner experience. We support multi-level assessments to guide and evaluate progress. The content structure is hierarchical and modular, enabling scalable learning design.

Think of it as a **botanical garden**:
- Learning Path = the comprehensive plant collection
  - Courses = themed sections within the garden
    - Modules = individual plant exhibits or plots
- Challenges = the garden competition - focused skill challenges
- Certifications = master gardener diploma - expertise validation

Our assessment strategy is like conducting growth check-ins throughout the garden. As a content developer, you have the flexibility to place assessments anywhere – after a single activity, at the end of a module, or as a final course assessment

## Why assessments matter:

In Layer5 Academy, assessments are more than just tests; they are integral checkpoints in the learning journey. They provide a structured way to validate understanding and build confidence, serving as a bridge that ensures a learner has mastered key concepts before advancing.

Well-designed assessments are crucial because they:

- **Reinforce Knowledge:** Help lock in new information and improve long-term retention.
- **Enable Self-Checks:** Allow learners to accurately gauge their own understanding and confirm they are ready to move on to more complex topics.
- **Provide Instant Feedback:** Offer an immediate opportunity to learn from mistakes, understand why an answer was incorrect, and solidify the correct concepts.

## Key Rules

### 1. Each Level Can Have Assessments
Inside [Layer5 Cloud Academy](https://cloud.layer5.io/academy/), to avoid confusion and clearly distinguish between assessment types at each level, we use specific naming conventions:
- Firsr Level (Root Level): Exam – assesses learning outcomes at root level
    - Second Level: Test – measures understanding within a course
      - Third Level: Quiz – short assessments tied to specific modules

```
Layer5 Cloud Academy
├── Learning Path                               → 🎯 Exam
│      ├── Course 1 (Rose Garden)               → 🎯 Test
│      │    ├── Module A (Rose Bed 1)           → 🎯 Quiz
│      │    │   └── [quiz.md]
│      │    ├── Module B (Rose Bed 2)           → 🎯 Quiz
│      │    │   └── [quiz.md]
│      │    └── [test.md]
│      ├── Course 2  
│      │    ├── Module A
│      │    │   └── [quiz.md]
│      │    ├── Module B
│      │    │   └── [quiz.md]
│      │    └── [test.md]
│      └── [exam.md]
├── Challenge                                  → 🎯 Exam
│      └── [exam.md]
└── Certification                              → 🎯 Exam
       └── [exam.md]
```
{{< alert type="info" title="Naming Flexibility" >}}
You are free to use any naming convention, as long as it's consistent and clearly distinguishes assessment levels.  
For example, filenames like `test-for-course.md` and `test-for-module.md` are perfectly acceptable.
{{< /alert >}}

### 2. Assessment Quantity Per Level

Each **mandatory section** must contain **at least one assessment**.

Take **Learning Path** as an example:  
- Learning Path Level: At leat one exam (exam.md)
- Course Level: At leat one test (test.md)
- Module Level: At leat one quiz (quiz.md)

### 3. Unified Assessment Structure
All assessment files follow [the same format](#assessment-file-structure) regardless of which level they're placed in. Whether it's a module quiz or learning path exam, the structure stays consistent.

### 4. Assessment Requirements and Prerequisites

**By default, all assessments are required.** This means learners must pass each assessment to unlock the next level.

Take **Learning Path** as an example:
- Pass all Module quizzes → Unlock Course test
- Pass all Course tests → Unlock Learning Path exam

{{< alert type="info" title="Passing the Assessment Marks that Level as Completed" >}}
Pass `course-1/test.md` → Course 1 is marked as completed.  
Pass `learning-path-name/exam.md` → Entire learning path is marked as completed. 
{{< /alert >}}

**Making assessments optional:**

You can make any assessment **optional** by adding this to its frontmatter:
  ```yaml
  is_optional: true
  ```
This means the Optional sections are **excluded** from prerequisite checks.

**What this means:**
 - Optional assessments don't block progress.
 - Learners can skip them and still advance.
 - Example: If all modules in a course are optional, learners can go straight to the course test.

## Assessment File Structure
Each assessment file must contain the following YAML frontmatter:

```yaml
---
title: "Assessment Example"
id: "assessment-id"                 
passing_percentage: 70               
type: "test"
layout: "test"
is_optional: true                 
final: false                     
questions:                     
  - id: "q1"                       
    text: "Your question text here" 
    type: "single-answer"                     
    marks: 2                        
    options:                       
      - id: "a"
        text: "Option A text"
      - id: "b" 
        text: "Option B text"
        is_correct: true
---
```

### Assessment Frontmatter Fields

> In this table, fields marked with ✅ are required, while those marked with – are optional.

| Applicable To | Field | Required | Description |
| :--- | :--- | :--- | :--- |
| **Assessment** | `title` | - | A short, descriptive name for the assessment (e.g., "Final Exam" or "Module 3 Quiz"). |
| | `id` | - | Unique identifier for the assessment. If omitted, a UUID will be auto-generated. |
| | `passing_percentage` | ✅  | Minimum score required to pass the assessment (e.g., `70`). |
| | `type` | ✅  | Metadata type for the assessment. The value must be `test`. |
| | `layout` | - | Metadata type for the assessment. The value must be `test`. |
| | `is_optional` | - | A boolean value. If `true`, the assessment can be skipped without affecting completion. |
| | `final` | - | A boolean flag. Set to `true` if this assessment determines the completion for its parent course or path. |
| | `questions` | ✅  | An array containing one or more question objects. |
| **Question Object** | `id` | ✅  | Unique identifier for the question within the assessment (e.g., `q1`, `q2`). |
| | `text` | ✅  | The text of the question prompt. |
| | `type` | ✅  | The type of question. Accepted values are `single-answer`, `multiple-answers` or `short_answer`. |
| | `marks` | ✅  | The number of points awarded for a correct answer. |
| | `options` | - | An array of answer options. |

{{< alert type="warning" title="Quick heads up" >}}
Remember: `type: "test"` are fixed values that cannot be modified. The system needs these exact words to work properly.
{{< /alert >}} 

## Supported Assessment Types

Layer5 Academy supports three question formats:

***Single Choice Questions***
- Single correct answer
- True/False questions

<details style="margin-bottom: 1em;">
  <summary>Examples: <code>type: single-answer</code> </summary>
  
    ---
    questions:
      - id: "question1"
        text: "Test single choice question"
        type: "single-answer"             # choose the type
        marks: 1
        options:
          - id: "a"
            text: "Option A"
            is_correct: true    # correct option
          - id: "b"
            text: "Option B"

        # True/False:
      - id: "question2"
        text: "This is a true/false question"
        type: "single-answer"            # choose the type
        marks: 1
        options:
          - id: "true"
            text: "True"
            is_correct: true    # correct option
          - id: "false"
            text: "False"
    ---
  </code></pre>
</details>

***Multiple Choice Questions***

- Multiple correct answers  

<details style="margin-bottom: 1em;">
  <summary>Examples: <code>type: multiple-answers</code> </summary>
  
    ---
    questions:
      - id: "question3"
        text: "Test multiple choice question"
        type: "multiple-answers"             # choose the type
        marks: 2
        options:
          - id: "a"
            text: "Option A"
            is_correct: true    # correct option
          - id: "b"
            text: "Option B"
          - id: "c"
            text: "Option C"
            is_correct: true    # correct option
    ---
  </code></pre>
</details>



***Short Answer Questions***

- Fill-in-the-blank responses  
- Direct text input

<details style="margin-bottom: 1em;">
  <summary>Examples: <code>type: short_answer</code> </summary>

    ---
    questions:
      - id: "question4"
        text: "In Kubernetes, ___ is the default namespace."
        type: "short_answer"                # choose the type
        marks: 2
        correct_answer: "default"           # expected answer

      - id: "question5"
        text: "Which kubectl command lists all pods?"
        type: "short_answer"                # choose the type
        marks: 2
        correct_answer: "kubectl get pods"  # expected answer
    ---
  </code></pre>
</details>
  

## Post-Frontmatter

After the frontmatter, you can add some content for learner orientation:
```markdown
---
questions:

---
This assessment allows you to review your educational progress. Give it a try!
```

## About Final Exam
- A **final exam** is the exam that evaluates whether a root section (with mandatory children) is complete.
- A **final exam** can only be taken after all **mandatory sibling and childern pages** are complete.

### Rules for Final Exam Selection
1. If **only one exam** exists in a section, it is treated as the **final exam**.
2. If **multiple exams** exist:
   * One may be explicitly marked as final using:
     ```yaml
     final: true
     ```
   * If none are marked, the **last exam** (by file path) is treated as final.
   * There must be **only one** explicitly marked final exam per section.
3. A **final exam cannot be optional**.
   * This applies even when only one exam is present — it cannot have `is_optional: true`.

### Final Exam Determination Logic
A exam is considered final if:
- It has `final: true` in its front matter.
- It is the **only** exam under its parent section.
- It is the **last exam** (ordered by `File.Path`) among sibling exams, and no other exam is explicitly marked as final. 
- If any sibling exam is marked as `final: true`, no other exam will be considered final — even if it’s last.

{{< alert type="info" title="Why Not Use `weight` to Determine the Final Exam" >}}
To ensure the final exam is always clear and uniquely identified, we don't use the `weight` field, which can be ambiguous (e.g., missing or duplicated across files). Instead, we rely on the file path order as a more stable and reliable standard.
{{< /alert >}}

## Scoring

The scoring process is handled automatically by the backend system. As a content creator, your main responsibility is to define the `marks` for each question and the overall `passing_percentage` for the assessment. Here is how the system processes the scores:

### How Scores Are Calculated

1.  **Total Possible Marks**: The total score for a assessment is automatically calculated by summing the `marks` value of every question within that assessment. You do not need to define this total manually.
2.  **Learner's Score**: A learner's final score is the sum of the `marks` from all the questions they answered correctly.
3.  **Pass/Fail Status**: The system calculates the final percentage using the formula `(Learner's Score / Total Possible Marks) * 100`. If this percentage is greater than or equal to the `passing_percentage` you set, the assessment is marked as "Passed".

### Scoring Rules for Question Types

- **Multiple-Choice Questions**: For questions with a single correct answer, the logic is straightforward. For **multiple-answer questions**, the scoring is strict: the learner must select **all** correct options and **none** of the incorrect options to earn the marks. There is no partial credit.
- **Short Answer Questions**: The learner's input is compared against the `correct_answer` field. The comparison is **case-insensitive**, and leading/trailing whitespace is ignored to avoid penalizing minor typing variations.

### The Result of Scoring

After an assessment is submitted and scored, a detailed result record is permanently saved to the learner's grade history. If the assessment is a designated test for a Course or an exam for a Learning Path and the result is "Passed", it will trigger the completion of that Course or Learning Path in the learner's progress tracker.


## Frequently Asked Questions

<details>
  <summary>1. Is the <code>id</code> field required in the file's front matter?</summary>

No, the <code>id</code> field is <strong>optional</strong>. If omitted, the system auto-generates a unique ID based on the file path (e.g., <code>7a4af2222daae1111acfac539f657724</code>). However, we strongly recommend specifying a human-readable, globally unique ID (e.g., <code>test-intro-meshery</code>, <code>quiz-containers</code>, <code>test-intro-kubernetes</code>) for better traceability and debugging.
</details>

<details>
  <summary>2. Why is an assessment required for every Course and Learning Path?</summary>

The system determines the completion of a Course or Learning Path based on whether the learner passes its designated assessment (e.g., <code>test.md</code>, <code>exam.md</code>). Without this, the system has no trigger to mark the level as completed or to award achievements such as badges. Module-level quizzes are intended for practice and do not trigger parent-level completion.

</details>

<details>
  <summary>3. Can I fully test the assessment (including scoring) locally?</summary>

You can preview the test layout locally, but scoring and evaluation are handled by the backend server. This means submission, grading, and result processing are not available in local previews. You must publish the content to test full functionality.
</details>

<details>
  <summary>4. How are multiple-answer questions scored? Is partial credit given?</summary>

No partial credit is awarded. To receive points, the learner must select all correct options and avoid all incorrect ones. Selecting a wrong option or missing a correct one results in zero marks for that question.
</details>

<details>
  <summary>5. Can a learner retake an assessment even after scoring 100%?</summary>

Yes. Even if a learner scores 100%, they are allowed to retake the assessment. The system does not restrict retakes based on previous scores. This design supports repeated practice, randomized question pools, and flexible testing workflows—without enforcing score-based access rules.
</details>
