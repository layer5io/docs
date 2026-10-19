# Customize Webhooks


> Send support requests, signup decisions, and Kanvas entitlement events from your self-hosted Layer5 Cloud to your own systems: the three webhooks, when each fires, the payloads, and how failures behave.



Layer5 Cloud calls an HTTP endpoint you choose when three things happen: a person asks for help, a Provider Admin decides a signup request, and a person gains Kanvas access. The calls let you route those events into your help desk, your chat, or your onboarding automation. On a self-hosted deployment you set the three endpoints; none is set by default, and an unset webhook does nothing useful.

## The three webhooks

| Chart value | Fires when | Payload |
| --- | --- | --- |
| `env.webhookHelpAndSupport` | Someone submits the Help and Support form in Layer5 Cloud, or a support request raised in Kanvas reaches your deployment | `memberFormOne` |
| `env.webhookSignupRequest` | A Provider Admin approves or denies a signup request | `signupData` and `newUser` |
| `env.webhookKanvasEntitlement` | A new user registers, a user completes a first brokered social sign-in, or a role assignment gives a user Kanvas access | `signupData` and `newUser` |

## Set the endpoints

Add the three URLs to your Helm values and upgrade. The values are written into the server's ConfigMap, so the pods restart when you change them.

```yaml
env:
  webhookHelpAndSupport: "https://hooks.example.com/layer5/support"
  webhookSignupRequest: "https://hooks.example.com/layer5/signup"
  webhookKanvasEntitlement: "https://hooks.example.com/layer5/kanvas-access"
```

```bash
helm upgrade layer5-cloud layer5/layer5-cloud -n layer5-cloud --values values.yaml
```

Leave a webhook unset if you do not need it. The only way to add a fourth webhook is a change to Layer5 Cloud itself; the three names above are fixed.

## How a call is made

| Property | Behavior |
| --- | --- |
| Method and body | `POST` with a JSON body and `Content-Type: application/json; charset=UTF-8`. |
| Authentication | None. There is no signature and no shared secret header. Restrict the receiver by network policy, or put an unguessable token in the URL path. |
| Success | A `200` or `202` response. Any other status counts as a failure. |
| Timeout | None. The server waits until the receiver answers. |
| Retries | None. Each event is sent once. |

Respond quickly and do the work afterward: the support and signup webhooks run inside the request of the person who triggered them, so a slow receiver makes that person wait.

## Payloads

### Help and support

```json
{
  "memberFormOne": {
    "firstname": "Ada",
    "lastname": "Admin",
    "email": "ada@example.com",
    "message": "I cannot connect my cluster.",
    "form": "support",
    "scope": "Layer5 Cloud",
    "subject": "Connection problem"
  }
}
```

Layer5 Cloud rejects a request that carries any field other than these seven, with a `400` error that names the problem. The same payload arrives whether the request came from the Layer5 Cloud form or from [Kanvas](/pr-preview/pr-1345/kanvas/reference/help-and-support/). Kanvas relays a request through the person's Meshery Server to the remote provider, so those users must be connected to your deployment for support to work. Under Meshery's local provider the request is refused as not implemented.

### Signup decisions

```json
{
  "signupData": {
    "id": "3f0c1d1e-8f6e-4a57-9d0e-2f1f0b4a9c11",
    "firstName": "Grace",
    "lastName": "Hopper",
    "email": "grace@example.com",
    "occupation": "Platform engineer",
    "organization": "Example Corp",
    "role": "Engineer",
    "formType": "meshmap",
    "status": "approved",
    "taskId": "task-123",
    "taskLink": "https://tasks.example.com/task-123",
    "createdAt": "2026-01-15T09:30:00Z",
    "updatedAt": "2026-01-16T10:00:00Z"
  },
  "newUser": true
}
```

A decision requires an email, a first name, a last name, and a valid `taskLink` URL; otherwise Layer5 Cloud refuses it with a `400` error before any call is made. When the webhook fails, the decision request returns a `500` error (`unable to webhook`) and an alert event is recorded against the person.

### Kanvas entitlement

```json
{
  "signupData": {
    "firstName": "Grace",
    "lastName": "Hopper",
    "email": "grace@example.com",
    "formType": "meshmap"
  },
  "newUser": true
}
```

`newUser` is `true` for a first registration and a first brokered sign-in. For a role assignment it reflects whether the person is new to Kanvas. The `formType` value is the literal `meshmap`, the internal name of the Kanvas entitlement. A failure here never blocks the person: Layer5 Cloud records an event and continues.

## Failure behavior

| Webhook | When the receiver fails | What the person sees | What you see |
| --- | --- | --- | --- |
| Help and support | The caller receives a `500` error. | An error on the form. | A logged error. |
| Signup decision | The decision request returns `500`. | The decision fails with an error. | A logged error and an alert event. |
| Kanvas entitlement | The call is dropped. | Nothing. | A logged error and an error event. |

Because nothing retries, build the receiver to be reliable, and reconcile missed events from the signup request list and the audit events.

## Test a webhook

Trigger each one through its real action: submit the Help and Support form, approve a test signup request, or register a test user. For a quick receiver check, point the URL at a request-capture service, perform the action, and confirm that the capture shows a `POST` with the payload above.

