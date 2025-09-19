---
title: "Managing Learners Through Invitations"
weight: 6
description: >
  Learn how to create and manage invitations to organize training programs and provide learners access to Academy content.
categories: [Academy]
tags: [Academy]
---

## Managing Learning Through Invitations

As an [Academy instructor or administrator](https://docs.layer5.io/cloud/security/roles/academy-roles/), you have the responsibility to organize, coordinate, and facilitate learning experiences for your teams and organization. Layer5 Cloud's invitation system provides you with powerful tools to manage learner access, organize training programs, and track learning initiatives across your organization.

### Training Content You Can Provide Access To

As an instructor, you can create invitations to grant learners access to:

- **Structured Learning Paths**: Curated curriculum sequences for systematic skill development
- **Hands-on Challenges**: Practical problem-solving exercises and competitive learning scenarios
- **Professional Certifications**: Industry-recognized credential assessments and evaluations
- **Complete Academy Resources**: Full access to the [Academy catalog](https://cloud.layer5.io/academy/overview) for self-directed exploration

### When to Create Training Invitations

As an [Academy Administrator](https://docs.layer5.io/cloud/security/roles/academy-roles/), you can create invitations for various scenarios including, but not limited to:

- **Onboarding Programs**: Welcome new team members with structured learning paths
- **Skills Development**: Address specific competency gaps in your organization
- **Team Training**: Coordinate group learning for project requirements or technology adoption
- **Professional Development**: Facilitate career advancement through certification programs
- **Knowledge Sharing**: Enable cross-team collaboration and learning communities

### Creating and Managing Invitations

Effective invitation management requires strategic planning to ensure successful learning outcomes.

#### Pre-Planning Requirements

**Learner Information:**
- Email addresses of participants (individual emails or organizational domain patterns)
- Understanding of learners' current skill levels and training needs
- Clear learning objectives and expected outcomes

**Program Structure:**
- Specific learning paths or certifications aligned with organizational goals
- Timeline constraints and completion deadlines
- Team organization and collaborative learning requirements

{{< alert type="info" title="Organizational Access" >}}
For organization-wide training, use domain patterns (like @yourcompany.com) to enable automatic enrollment for all eligible employees, rather than managing individual email lists.
{{< /alert >}}

#### Administrative Process

1. **Access the invitation management interface**: Navigate to **Identity → Invitations** in [Layer5 Cloud](https://cloud.layer5.io/identity/invitations)

2. **Initialize new invitation**: Click **"Create New Invitation"**

3. **Configure invitation parameters**: The Layer5 invitation system supports multiple platform uses. For Academy administration, configure these properties strategically:

| Property | Administrative Guidance |
|----------|------------------------|
| **Name** | The purpose of the invitation (e.g., "Q2 Meshery Certification") |
| **Description** | Additional details about the invitation purpose |
| **Emails** | Add participant email addresses individually, or use domain patterns for department-wide or organization-wide access |
| **Roles** | Assign "Academy Learner" role to grant appropriate learning permissions. Add "Academy Admin" only for assistant instructors |
| **Teams** | Assign learners to relevant teams for collaboration, progress tracking, and administrative organization. Multiple team assignments are supported for cross-functional training |
| **Quota** | Set enrollment limits for resource management or to create competitive/selective programs. Leave empty if no limit needed. When you invite more people than your quota allows, only the first people to accept will get access. Example: If you set quota to 10 but invite 15 people, only the first 10 people who accept their invitations will gain access. The remaining 5 will see a "quota full" message |
| **Expires At** | Set expiration dates aligned with training deadlines or organizational requirements. Consider allowing buffer time for completion |
| **Status** | Enable immediately for active programs, or disable to prepare cohorts before launch |

{{< alert type="info" title="Team Management" >}}
For collaborative learning programs, [create teams](https://docs.layer5.io/cloud/identity/teams/#add-a-team) before sending invitations. You don't need to manually add team members, learners will be automatically assigned to designated teams when they accept the invitation.
{{< /alert >}}

4. **Deploy invitation**: Click **"Create Invitation"** to activate the program: Participants will receive professional invitation emails.

### Tips for Success

**Plan ahead**: Know who you want to invite and what they should learn before creating the invitation.

**Use clear names**: Make invitation names descriptive so you can find them later.

**Set realistic timelines**: Give people enough time to see the invitation and complete the learning.

**Organize with teams**: Use teams to group learners who will work together.

**Track results**: Check who accepted your invitations and adjust your approach for next time.