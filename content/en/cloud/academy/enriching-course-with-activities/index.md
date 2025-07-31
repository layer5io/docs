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

- **Pages** – Text-based content for theoretical learning  
- **Quizzes** – Knowledge checks for concept reinforcement  
- **Labs** – Hands-on practical exercises  

This guide shows how to add these learning activities to enhance learner engagement and comprehension.

## How to Add A Page


## How to Add a Quiz

Quizzes in Layer5 Academy serve as knowledge checkpoints to help learners:

- Reinforce key concepts from module content  
- Self-assess their understanding before progressing  
- Receive immediate feedback on their learning  

### File Structure

Quizzes are placed inside a `knowledge-check/` directory under each module:
```
course-name/
└── module-1/
└── module-2/
│   └── knowledge-check/
│       └── quiz.md      // <-- Quiz file
└── module-3/

```

### Quiz File Structure
Each quiz file (`quiz.md`) must contain the following YAML frontmatter:

```yaml
---
title: "Knowledge Check"
id: "quiz-module-name"
passing_percentage: 70
layout: "quiz"
type: "quiz"
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

***Frontmatter Fields (Required)***
- title: Always "Knowledge Check" for consistency
- id: Unique quiz ID starts with 'quiz-'(e.g., quiz-intro-meshery, quiz-containers)
- passing_percentage: Minimum score to pass (typically 70%) 
- layout: Must be "quiz"
- type: Must be "quiz"
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
    type: "mcq"
    marks: 1
    options:
      - id: "a"
        text: "Option A"
        is_correct: true  # add
      - id: "b"
        text: "Option B"

    # Multiple Choice:
  - id: "question2"
    text: "Test multiple choice question"
    type: "mcq"
    multiple_answers: true  # add 
    marks: 2
    options:
      - id: "a"
        text: "Option A"
        is_correct: true  # add
      - id: "b"
        text: "Option B"
      - id: "c"
        text: "Option C"
        is_correct: true  # add

    # True/False:
  - id: "question3"
    text: "This is a true/false test"
    type: "mcq"
    marks: 1
    options:
      - id: "true"
        text: "True"
        is_correct: true  # add
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
    type: "short_answer"  # add
    marks: 2
    correct_answer: "default"

  - id: "question5"
    text: "Which kubectl command lists all pods?"
    type: "short_answer"  # add
    marks: 2
    correct_answer: "kubectl get pods" 
---
```

### Post-Frontmatter

After the frontmatter, you can add some content for learner orientation:
```markdown
---
questions:

---
This knowledge check allows you to review your educational progress. Give it a try!
```

### Scoring

The system automatically calculates quiz scores based on the marks field for each question. Students must achieve the passing_percentage to complete the quiz successfully.


> Find a complete, up-to-date reference for all supported question types in this [example file](https://github.com/layer5io/exoscale-academy/blob/f92b4b72e80be4cc9856fc20fa7f42903413481a/content/learning-paths/98e16360-a366-4b78-8e0a-031da07fdacb/end-to-end-kubernetes/cka-prep/cka/quiz.md?plain=1#L36).


### Frequently Asked Questions
1. **Must the quiz file be named exactly `quiz.md?`?**

    Yes, the filename must be quiz.md for the system to recognize it.

2. Is the `id` field required in the quiz's front matter?
	Yes, use the format "quiz-your-course-name" for consistency.

3. Can I add a quiz directly in the course root instead of a module?
    Yes, you can place quizzes at the course level if needed.



## How to Add a Lab
