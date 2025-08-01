---
title: Enriching Course With Activities
weight: 4
description: >
  Learn how to spice up your courses with interactive activities that keep learners engaged.
categories: [Academy]
tags: [Designer]
---

The [Layer5 Cloud Academy](https://cloud.layer5.io/academy/content) courses are structured as modular learning experiences. 

Each **Course** is broken down into **Modules**, and each Module consists of learning activities. As a content developer, you can enrich your modules with three types of learning activities:

- **[Pages](#add-page)** – Text-based content for theoretical learning  
- **[Quizzes](#add-quiz)** – Knowledge checks for concept reinforcement  
- **[Labs](#add-lab)** – Hands-on practical exercises  

This guide shows how to add these learning activities to enhance learner engagement and comprehension.

<!-- ## How to Add a Page {#add-page} -->


## How to Add a Quiz {#add-quiz}

Quizzes in Layer5 Academy serve as knowledge checkpoints to help learners:

- Reinforce key concepts from module content  
- Self-assess their understanding before progressing  
- Receive immediate feedback on their learning  


### Key Rules

#### 1. Each Level Can Have Quiz

Quizzes are supported at each level of the content hierarchy and can be placed directly within any level:
> Here we use `quiz.md` as illustration, you can use any name you like as long as they keep consistent.

```
        learning-path-name/
        ├── quiz.md                        // <-- Learning path quiz
        ├── course-1/
        │   ├── quiz.md                    // <-- Course quiz
        │   ├── module-1/
        │   │   ├── quiz-1.md              // <-- Module quizzes
        │   │   └── quiz-2.md
        │   ├── module-2/
        │   │   └── quiz.md                // <-- Module quiz
        │   └── module-3/
        └── course-2/
            ├── quiz.md                    // <-- Course quiz
            └── module-1/
                └── quiz.md
```

{{< alert type="info" title="Passing the Quiz Marks that Level as Completed" >}}

Pass `course-1/quiz.md` → Course 1 is marked as completed.

Pass `learning-path-name/quiz.md` → Entire learning path is marked as completed
{{< /alert >}}


#### 2. Prerequisites - Ensuring Learning Order
Quizzes can have prerequisites that must be completed before taking the quiz.

**Learning Path Quiz:**

- complete all Courses ➜ can take quiz

**Course Quiz (planned):**

- complete required Module quizzes ➜ can take the Course quiz

#### 3. Quiz Quantity Per Level

- Learning Path Level: Single quiz only (quiz.md)

- Course Level: Single quiz only (quiz.md)

- Module Level: Multiple quizzes allowed (quiz-1.md, quiz-2.md, etc.)

{{< alert type="warning" title="Completion Tracking Requirement" >}}
To ensure proper completion and progress tracking, **every course and learning path must have at least one quiz defined**. This includes challenges and any top-level content.
{{< /alert >}}

#### 4. Unified Quiz Structure
All `quiz.md` files follow the same format regardless of which level they're placed in. Whether it's a module quiz or learning path quiz, the structure stays consistent.


### Quiz File Structure
Each quiz file (`quiz.md`) must contain the following YAML frontmatter:

```yaml
---
id: "quiz-uuid"
passing_percentage: 70
layout: "quiz"
questions:
  - id: "q1"
    text: "Your question text here"
    type: "mcq"
    marks: 2
    options:
      - id: "a"
        text: "Option A text"
      - id: "b" 
        text: "Option B text"
        is_correct: true
---
```

***Frontmatter Fields***
- id: Unique quiz ID. Optional. But if you include an id, it must be unique.
- passing_percentage: Minimum score to pass (typically 70%) 
- layout: Required field for metadata. Use "quiz" (or "test")
- questions: Array of question objects

***Question Object Structure***
- id: Unique ID per question (e.g., q1, q2)
- text: The question prompt
- type: Either "mcq" or "short_answer"
- marks: Points awarded for correct answer
- options: Array of answer options (for mcq type)

{{< alert type="info" title="Quick heads up" >}}
Remember: `layout: "quiz"` and `type: "quiz"` are fixed values that cannot be modified. The system needs these exact words to work properly.
{{< /alert >}}

### Supported Quiz Types

Layer5 Academy supports these question formats:

***Multiple Choice Questions***

- Single correct answer
- Multiple correct answers  
- True/False questions

***Short Answer Questions***

- Fill-in-the-blank responses  
- Direct text input

### Question Types Examples

**1. Multiple Choice Questions (type: mcq)**

```yaml
---
questions:

    # Single Choice:
  - id: "question1"
    text: "Test single choice question"
    type: "mcq"             # choose the type
    marks: 1
    options:
      - id: "a"
        text: "Option A"
        is_correct: true    # correct option
      - id: "b"
        text: "Option B"

    # Multiple Choice:
  - id: "question2"
    text: "Test multiple choice question"
    type: "mcq".            # choose the type
    multiple_answers: true  # enable multiple selection
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

    # True/False:
  - id: "question3"
    text: "This is a true/false test"
    type: "mcq"
    marks: 1
    options:
      - id: "true"
        text: "True"
        is_correct: true    # correct option
      - id: "false"
        text: "False"
---
```
      
**2. Short Answer Questions (type: short_answer)**

```yaml
---
questions:
  - id: "question4"
    text: "What is the default namespace in Kubernetes?"
    type: "short_answer"                # choose the type
    marks: 2
    correct_answer: "default"           # expected answer

  - id: "question5"
    text: "Which kubectl command lists all pods?"
    type: "short_answer"                # choose the type
    marks: 2
    correct_answer: "kubectl get pods"  # expected answer
---
```

### Post-Frontmatter

After the frontmatter, you can add some content for learner orientation:
```markdown
---
questions:

---
This quiz allows you to review your educational progress. Give it a try!
```

### Scoring

The scoring process is handled automatically by the backend system. As a content creator, your main responsibility is to define the `marks` for each question and the overall `passing_percentage` for the quiz. Here is how the system processes the scores:

#### How Scores Are Calculated

1.  **Total Possible Marks**: The total score for a quiz is automatically calculated by summing the `marks` value of every question within that quiz. You do not need to define this total manually.
2.  **Learner's Score**: A learner's final score is the sum of the `marks` from all the questions they answered correctly.
3.  **Pass/Fail Status**: The system calculates the final percentage using the formula `(Learner's Score / Total Possible Marks) * 100`. If this percentage is greater than or equal to the `passing_percentage` you set, the quiz is marked as "Passed".

#### Scoring Rules for Question Types

- **Multiple-Choice Questions (MCQ)**: For questions with a single correct answer, the logic is straightforward. For **multiple-answer questions**, the scoring is strict: the learner must select **all** correct options and **none** of the incorrect options to earn the marks. There is no partial credit.
- **Short Answer Questions**: The learner's input is compared against the `correct_answer` field. The comparison is **case-insensitive**, and leading/trailing whitespace is ignored to avoid penalizing minor typing variations.

#### The Result of Scoring

After a quiz is submitted and scored, a detailed result record is permanently saved to the learner's grade history. If the quiz is a designated test for a Course or Learning Path and the result is "Passed", it will trigger the completion of that Course or Learning Path in the learner's progress tracker.

### Frequently Asked Questions
1. **Must the quiz file be named exactly `quiz.md?`?**

    In our examples, we show `quiz.md` for simplicity. You can use any descriptive filename (e.g., `test.md`, `assessment.md`, `exam.md`).
  
2. Is the `id` field required in the quiz's front matter?

    No, the `id` field is **optional** in the quiz's front matter. If omitted, a unique ID is auto-generated from the file's path (e.g., `7a4af2222daae1111acfac539f657724`).  However, it's strongly recommended to provide one. For better stability and easier debugging, use a globally unique and human-readable ID (e.g., `quiz-intro-meshery`, `quiz-containers`, or `quiz-intro-kubernetes`).

4. Why is a quiz required for every Course and Learning Path?

    For proper tracking, the system determines the "completion" of a Course or Learning Path by the user passing its specific, designated quiz (e.g., test.md or exam.md). Without this quiz, the system has no trigger to mark the level as completed and award achievements like badges. Module-level quizzes are for practice and do not trigger completion of the parent course.

5. Can I fully test the quiz, including scoring, on my local machine?

    You can preview the visual layout of the quiz locally. However, the scoring and evaluation logic runs on the backend server. Therefore, you cannot test the submission, grading, and result display process locally. You must publish the content to see the full functionality.

6. How are multiple-answer questions scored? Is partial credit given?

    Currently, there is no partial credit. For a multiple-answer question, the learner must select all of the correct options and none of the incorrect options to receive marks. Missing a correct option or selecting an incorrect one results in zero marks for that question.

<!-- ## How to Add a Lab {#add-lab} -->

