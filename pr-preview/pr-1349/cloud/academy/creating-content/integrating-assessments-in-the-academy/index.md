# Add Assessments


> Add quizzes, tests, and exams to Academy content. Covers the file format, question types, scoring, attempt and time limits, and how a passing result completes a course, learning path, challenge, or certification.



Assessments gate progress and trigger completion in Academy content. A learner who passes an assessment unlocks the next level of the content, and a learner who passes the final assessment completes the content and receives its badge and, where defined, its certificate. Layer5 Cloud scores every submission on the server and records the result in the learner's grade history.

This page shows how to write an assessment file and explains how the server treats it. It assumes you have a content repository with a [learning path](/pr-preview/pr-1349/cloud/academy/creating-content/creating-your-learning-path/), [challenge](/pr-preview/pr-1349/cloud/academy/creating-content/building-challenges/), or [certification](/pr-preview/pr-1349/cloud/academy/creating-content/building-certifications/).

## Place assessments at each level

Each level of the content hierarchy takes its own kind of assessment. The kinds differ in name only. All three use the same file format.

| Level | Assessment | Typical file | Scope |
| --- | --- | --- | --- |
| Learning path, challenge, or certification | Exam | `exam.md` | Validates the whole content item |
| Course | Test | `test.md` | Validates one course |
| Module | Quiz | `quiz.md` | Checks one module |

```
Learning path
├── Course 1
│   ├── Module A
│   │   └── quiz.md
│   ├── Module B
│   │   └── quiz.md
│   └── test.md
├── Course 2
│   ├── Module A
│   │   └── quiz.md
│   └── test.md
└── exam.md
```

Challenges and certifications place their exams directly under the content item. You may use any file names that keep the levels distinguishable, for example `test-for-course.md`.

Each mandatory section needs at least one assessment. A course with no test, or a learning path with no exam, has no event that can mark it complete or award its badge.

## Write an assessment file

An assessment is a Markdown file whose front matter holds the questions. Text after the front matter appears above the questions as orientation for the learner.

```yaml
---
title: "Kubernetes Basics Quiz"
id: "quiz-kubernetes-basics"
type: "test"
layout: "test"
passPercentage: 70
timeLimit: 15
maxAttempts: 3
final: false
isOptional: false
questions:
  - id: "q1"
    text: "Which object runs one or more containers as a unit?"
    type: "single-answer"
    marks: 2
    options:
      - id: "a"
        text: "Pod"
        isCorrect: true
      - id: "b"
        text: "Namespace"
  - id: "q2"
    text: "Which kubectl command lists all pods?"
    type: "short-answer"
    marks: 2
    correctAnswer: "kubectl get pods"
---
Answer every question. You can retake this quiz.
```

Front matter keys are camelCase. The theme still accepts older snake_case keys such as `pass_percentage` and `is_optional` for existing content, but new content should use camelCase.

### Assessment fields

| Field | Required | Behavior |
| --- | --- | --- |
| `type` | Yes | Must be `test`. |
| `layout` | No | Must be `test` when set. |
| `passPercentage` | Yes | Minimum percentage of total marks needed to pass, for example `70`. |
| `questions` | Yes | The list of questions. |
| `title` | No | Name shown to the learner. |
| `id` | No | Unique identifier. When omitted, the build generates one from the file path. Set a readable, globally unique value such as `quiz-containers` so grade history stays traceable. |
| `isOptional` | No | When `true`, the assessment does not block progress. See [Required and optional assessments](#required-and-optional-assessments). Default `false`. |
| `final` | No | When `true`, passing completes the parent section. See [Final assessments](#final-assessments). |
| `timeLimit` | No | Minutes allowed per attempt. `0` (the default) means no limit. |
| `maxAttempts` | No | Attempts allowed per learner and registration. `0` means unlimited. |
| `numberOfQuestions` | No | Number of questions served per attempt when the file holds a larger question bank. The bank size should be a multiple of this value. |

### Question fields

| Field | Required | Behavior |
| --- | --- | --- |
| `id` | Yes | Identifier, unique within the assessment, for example `q1`. |
| `text` | Yes | The question prompt. |
| `type` | Yes | `single-answer`, `multiple-answers`, or `short-answer`. |
| `marks` | Yes | Points awarded for a correct answer. |
| `options` | For choice questions | List of options. Each has an `id`, `text`, and optional `isCorrect: true`. |
| `correctAnswer` | For `short-answer` | The expected text. |
| `instructions` | No | Replaces the default hint shown with the question. |

## Question types

| Type | Learner action | Scored correct when | Default hint |
| --- | --- | --- | --- |
| `single-answer` | Selects one option | Exactly one option is selected and it is correct | Select one answer |
| `multiple-answers` | Selects any number of options | Every correct option is selected and no incorrect option is selected | Select all that apply |
| `short-answer` | Types text | The text equals `correctAnswer` after trimming whitespace, ignoring case | Type your answer below |

Scoring is all or nothing per question. A `multiple-answers` question gives no partial credit. An unanswered question scores zero.

Short-answer matching is always case-insensitive. Layer5 Cloud has no case-sensitive mode, so write `correctAnswer` as the one canonical form you accept and avoid questions with several valid phrasings.

For a true or false question, use `single-answer` with two options:

```yaml
questions:
  - id: "q3"
    text: "A Kubernetes pod can contain multiple containers."
    type: "single-answer"
    marks: 1
    options:
      - id: "true"
        text: "True"
        isCorrect: true
      - id: "false"
        text: "False"
```







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Use only the supported types</h4>
  
      The scoring service evaluates <code>single-answer</code>, <code>multiple-answers</code>, and <code>short-answer</code>. A question with any other <code>type</code> is shown but never scores, so a learner cannot earn its marks.
  
</div>



## Required and optional assessments

Assessments are required by default. A learner must pass every required assessment in a section before the next level unlocks.

- Pass all module quizzes to unlock the course test.
- Pass all course tests to unlock the learning path exam.

Set `isOptional: true` to exclude an assessment from these prerequisite checks. Optional assessments never block progress, and a learner can skip them. If every module in a course is optional, learners go straight to the course test.

When a learner submits a test whose prerequisites are incomplete, the server rejects the submission with `Prerequisites not completed`.

## Final assessments

The final assessment of a section decides when that section is complete. The build selects it with these rules:

1. A section with a single exam treats it as final.
2. A section with several exams uses the one marked `final: true`. Mark at most one per section.
3. When no exam is marked, the last exam by file path is final.
4. A final exam cannot be optional, even when it is the only exam.

The build orders by file path and not by `weight`, because `weight` can be missing or duplicated across files. Name the file that must come last so that it sorts last, or mark it `final: true`.

A learner can take a final exam only after completing every mandatory sibling and child item.

## What passing does

| Result | Effect |
| --- | --- |
| Pass any assessment | That assessment is marked completed in the learner's progress. |
| Pass a final assessment | The parent section is marked completed. |
| Pass the final assessment of a learning path, challenge, or certification | The registration becomes **Completed**, the content's badge is awarded when one is set, and a certificate is issued and emailed when the content defines one. |
| Pass a non-final assessment | Only that assessment completes. Passing a course test that is not final does not complete the course. |

Mark the assessment that closes each course or content item `final: true` when a section holds more than one exam, so completion does not depend on file ordering.

A learner can retake an assessment after passing it, subject to `maxAttempts`. The server never blocks a retake because of an earlier score.

## Attempts, time limits, and question banks

Layer5 Cloud applies these limits when a learner starts and submits an attempt.

| Behavior | Rule |
| --- | --- |
| Attempt counting | Starting an attempt counts against `maxAttempts`, whether or not the learner submits it. |
| Attempt limit reached | Starting another attempt fails with `Maximum attempts reached for this test`. |
| Time limit | The attempt expires `timeLimit` minutes after it starts. A submission after expiry fails with `Test submission has expired`. |
| Resubmission | A submitted attempt cannot be submitted again. |
| Ownership | A learner can submit only their own attempt, and only against their own registration. |
| Payload size | A submission larger than 1 MiB is rejected. |

With `numberOfQuestions` set, the learner receives the next window of questions from the bank on each attempt. Attempt 1 gets questions 1 to N, attempt 2 gets N+1 to 2N, and so on. After the last window, the sequence restarts at question 1. When the bank size is not a multiple of N, the final window is shorter, so keep the bank an exact multiple.

The server never sends correct answers to the learner's browser.







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Do not rename or move assessment files after launch</h4>
  
      The server identifies an assessment by its published path. Renaming or moving the file makes the new path a different assessment. Earlier attempts and passes recorded against the old path no longer count, so attempt limits reset and prerequisites that depended on the old path stay unmet.
  
</div>



## Scoring

The build sums the `marks` of the questions into the assessment's total marks. The server computes:

```
percentage = learner's score / total marks * 100
```

The attempt passes when the percentage is greater than or equal to `passPercentage`. The saved result holds the score, the percentage, the pass or fail outcome, and which questions the learner got right. Instructors see pass rates in the [Instructor Console](/pr-preview/pr-1349/cloud/academy/instructor-console-guide/).

## Test your assessment

Local preview renders the assessment layout. It does not score. Submission, grading, attempt counting, and completion run on the server, so you must publish a version of your content to test them end to end. Use a dedicated test learner registration in a non-production organization so that pass and completion states do not appear in your real metrics.

## Answers to common questions

**Is the `id` required?** No. The build generates one from the file path when you omit it. Set one yourself for traceability.

**Why does every course and learning path need an assessment?** Completion is triggered by passing the final assessment. Without one, nothing marks the level complete or awards its badge.

**How are `multiple-answers` questions scored?** All or nothing. Selecting a wrong option or missing a correct one scores zero for the question.

**Can a learner retake an assessment after scoring 100%?** Yes, until `maxAttempts` is reached. When `maxAttempts` is `0`, retakes are unlimited.

