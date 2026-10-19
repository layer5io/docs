---
title: Review Access Requests
description: >
  Review, approve, and deny signup requests for product access, and learn what an approval or a denial changes.
weight: 70
diataxis: how-to
categories: [identity]
tags: [users, access]
---

An access request is a person asking for access to a Layer5 product capability, such as Kanvas. Layer5 Cloud collects these as **signup requests** in a queue. A Provider Admin reviews the queue, then approves or denies each request. Approval grants the requester Kanvas access and, for someone without an account, creates one.

This guide covers who can review requests, what the queue shows, and exactly what approval and denial do. It describes the queue that ships today. Layer5 Cloud has no general request flow for access to a specific design, workspace, or environment, and a denial does not restrict any resource. See [What this does not cover](#what-this-does-not-cover).

## Who can review requests

Reviewing requests is a **Provider Admin** capability. Provider Admin is a deployment-wide role, so Organization Admins cannot review or decide requests.

| Task | Needs |
| --- | --- |
| Open the User Requests page | The View All Access Requests permission, held by Provider Admin |
| Approve a request | Accept Access Request, held by Provider Admin |
| Deny a request | Deny Access Request, held by Provider Admin |
| Approve or deny from a notification link | Signed in as a Provider Admin |

Anyone who is signed in can file a request. Filing needs no role.

## How requests arrive

A signed-in person files a request from the Playground card on their dashboard. The request is stored with the person's name and email, a form type, a status, and a task link. A request filed this way carries placeholder values that appear as-is in the queue: form type `Cloud`, organization `Cloud org`, occupation `Cloud user`, a placeholder task link, and a role taken from the person's first role or `cloud user`.

A new account receives the Kanvas (`meshmap`) role at its first sign-in, so the queue matters mainly for existing accounts that do not hold it.

A request needs an email, a first name, a last name, and a valid task link. A request that omits one is refused with a message naming the missing field. Creating a request sends no email or notification.

## Review the queue

The User Requests page lists requests with these columns: ID, name, last name, email, occupation, organization, role, form type, status, task ID, task, and created time. Processed rows are shaded.

| Control | Behavior |
| --- | --- |
| Default view | Pending requests only. |
| Status filter | Pending, Approved, or Denied. |
| Form type filter | Meshmap, Docker Extension, Playground, or Event. Requests filed from the dashboard card are stored with form type `Cloud` and are not reachable through this filter. Find them with search or by clearing the form type filter. |
| Search | Case-insensitive substring over first name, last name, email, organization, and task link. |
| Order | By created time or updated time. |

## Approve a request

Approval acts only on a request whose status is **pending**. Layer5 Cloud then:

1. Looks for an existing account with the request's email address.
2. **If an account exists,** adds the `meshmap` role to it. Roles the account already holds stay in place. The person receives a role-change email.
3. **If no account exists,** creates one with the request's name and email, marks the email verified, and sets the account up so the person can sign in.
4. Saves the status as approved.
5. Sends the request to the deployment's signup-request webhook, which notifies the requester and updates the request's tracking task.
6. Records an event: `<admin email> approved signup request for <email>`.

Approval has no confirmation step. If the webhook call fails, the status stays saved and you see the failure, so the request does not return to pending.

A request with form type `epsma-book` skips steps 1 to 3: approval only records the status and sends the notification.

## Deny a request

Denial asks for confirmation. It sets the status to denied, sends the same webhook notification, and records an event: `<admin email> denied signup request for <email>`.

Denial removes nothing. It does not remove a role or an account, and it does not restrict any resource. It closes the request.

## Approve or deny from a link

Notification links open the decision directly. The link requires a Provider Admin session: if you are signed out, you are sent to sign in and returned to the page. A person who is not a Provider Admin receives `Forbidden`. If the request is no longer pending, you are sent to the User Requests page with a notice that it was previously processed, and nothing changes.

Opening one of these links changes the request. Treat them like a button, and do not open them to preview.

## Outcomes and errors

| Situation | Result |
| --- | --- |
| The request is not pending | `signup request for <email> previously processed`. Nothing changes. |
| The request id is unknown | `unable to get signup request`. |
| The caller is not a Provider Admin | `Forbidden`. |
| Approval cannot create the account | `cannot create account at the moment`, with the cause from the identity provider. |
| The webhook call fails | An error is shown and an alert event is recorded. The status is already saved. |

Statuses are `pending`, `approved`, and `denied`. A processed request cannot be decided again.

## What this does not cover

- **Resource access requests.** A request for access to a specific design, workspace, environment, or other resource, approved by its owner, does not exist. The queue covers product signup requests only.
- **Restricting access.** Layer5 Cloud has no action that restricts a person's access to a requested resource. To limit what someone can do, change their [roles]({{< ref "cloud/guides/organizations/managing-users/index.md#change-a-members-roles" >}}) or [remove them from the organization]({{< ref "cloud/guides/organizations/managing-users/index.md#remove-a-user-from-an-organization" >}}).
- **Catalog publishing.** Requests to publish a design to the catalog use a separate approval queue.
- **Joining an organization.** To let people join your organization, use [invitations]({{< ref "cloud/guides/organizations/inviting-users/index.md" >}}).
