# Instructor Console


> Every view, metric, and action in the Academy Instructor Console: who can open it, how each number is calculated, and what instructors can manage.



The Instructor Console reports on your organization's Academy content and learners. It answers three questions: how many people are learning, how far they get, and which assessments stop them. The console is also where you register new content and manage who can access it.

## Availability and access














































































































































































































































































































































































































































































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


Opening the console requires the **View Academy Metrics** permission in the selected organization. Without it, the console shows a missing-permission message that names the permission.

| Role | Opens the console | Notes |
| --- | --- | --- |
| Academy Admin | Yes | Also holds team and workspace management, so it can assign content access to teams. |
| Organization Admin | Yes | |
| Provider Admin | Yes | Can view the combined "all organizations" scope. |
| Academy Learner | No | Holds content access only. |
| User, Team Admin, Workspace Admin, Billing Manager | No | Unless an operator has added the permission to the role. |

Role-to-permission assignments are seeded defaults and an operator can change them. See [Roles and Permissions](/pr-preview/pr-1343/cloud/reference/default-permissions/).

### Organizations that are not configured

The console reports data only for an organization that has an Academy content module and version configured. Until your first content version is published, the console shows a "not configured" state that lists what you get after configuration: learner registration and progress tracking, content creation tools, test analytics, and reporting. Publishing is described in [Create a Learning Path](/pr-preview/pr-1343/cloud/academy/creating-content/creating-your-learning-path/).

## Views

The console has three views: **Overview**, **Learners**, and **Curricula**. "Curricula" is the console's term for a learning path, challenge, or certification.

### Overview

| Metric | Definition |
| --- | --- |
| Total Learners | Distinct learners who have registered for any of the organization's content to date. |
| Active Learners | Distinct learners who registered, progressed, or were graded on content this calendar month. Shown with its share of all learners. |
| Registrations | Every registration in the organization, including registrations against draft or retired content. Also shown as an average per learner. |
| Completion Rate | Registrations with status Completed divided by all registrations. |
| Quiz Pass Rate | Passed quiz attempts divided by all attempts. Retakes by one learner each count. A rate below 60% is highlighted. |

A rate with nothing to divide displays as `-`, not `0%`. No attempts and all attempts failed are different facts.

The Overview also charts:

- **Registrations by status**, using the five registration statuses below.
- **Final exams against practice quizzes.** Tests marked as final gate completion of the content. Every other test is practice. Comparing the two shows whether learners who practice successfully fail the exam that counts.
- **Test outcomes**, with the lowest pass rate, highest pass rate, and most attempted test. The two pass-rate rankings consider only tests with at least five attempts, so one failure on a new quiz does not crown it the hardest test. While no test has five attempts, the ranking uses all tests.
- **Content by type and level**, and the content ranked by registrations.

### Learners

A table with one row per registration: learner, content, registration time, and status. Rows load 20 at a time by default. Filter by content type (learning path, challenge, certification) and by status.

| Status | Meaning |
| --- | --- |
| Registered | The learner enrolled and has not started. |
| In Progress | The learner started and has not finished. |
| Completed | The learner finished everything the content requires. |
| Failed | The learner did not pass the content. |
| Withdrawn | The learner left the content, or an instructor withdrew the registration. |

The Learners view does not export to a file.

### Curricula

Lists the **published** content of the organization. Draft and retired content is excluded, so the registrations count here is normally smaller than the Overview total. Each row shows the registrations, completion rate, and pass rate. Content that nobody has registered for is marked **Awaiting First Learner**. The view also shows the **content version** your learners are using.

If you published a release and the version does not change, publishing is a two-stage process: your content repository release, then the next Layer5 Cloud release for production. See [Create a Learning Path](/pr-preview/pr-1343/cloud/academy/creating-content/creating-your-learning-path/).

## Actions

| Action | Where | Effect |
| --- | --- | --- |
| Register new content | Content creation flow | Creates the content record and generates the configuration for your repository. See [Create Academy Content](/pr-preview/pr-1343/cloud/academy/creating-content/). |
| Update content access | Curricula | Changes the team that can access the content, the access end date, the access status, the workspace, and the awarded badge. |
| Copy invite link | Curricula | Copies the link that registers a learner for the content. |
| Delete content | Curricula | Removes the content record after confirmation. |
| Withdraw a registration | Learners | Sets the registration to Withdrawn. Learners can also withdraw themselves. Any other learner needs an instructor with View Academy Metrics. |

## Active Learner definition

Active Learners counts people, not registrations, over the current calendar month, and it resets each month. A learner who enrolled months ago and submits a quiz this month is active this month. A learner who both registers and takes a quiz counts once. Because it counts distinct people over a monthly window, it is not comparable with the registration totals beside it.

## Limits and edge cases

| Situation | Behavior |
| --- | --- |
| Quiz Pass Rate | Counts attempts, not learners. A learner who fails twice and then passes contributes two failures and one pass. |
| Registrations differ between views | Overview counts all registrations. Curricula counts registrations against published content only. |
| Provider "all organizations" scope | The console skips the not-configured check and aggregates across organizations. |
| Exporting | Not available in the console. |

## Related

- [Academy](/pr-preview/pr-1343/cloud/academy/) for how content types relate.
- [Build a Challenge](/pr-preview/pr-1343/cloud/academy/creating-content/building-challenges/) and [Build a Certification](/pr-preview/pr-1343/cloud/academy/creating-content/building-certifications/) for authoring.

