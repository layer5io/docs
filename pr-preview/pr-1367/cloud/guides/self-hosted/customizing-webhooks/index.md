# Customizing Webhooks


> Layer5 Cloud uses webhooks to automate approval flows and email notifications. This guide will help you customize and add your own custom webhooks.


Layer5 Cloud calls an HTTP endpoint you choose when three things happen: a person asks for help, a Provider Admin decides a signup request, and a person gains Kanvas access. On a self-hosted deployment you set the three endpoints in Helm. None is set by default, and an unset webhook does nothing. The three names are fixed. Adding a fourth webhook requires a change to Layer5 Cloud itself.

## Customize and add your own custom webhook

Set the chart values. They are written into the server ConfigMap as environment variables. There is no `.env` file to edit in a Helm install.

### Step 1: Locate the .env File

For a Helm deployment, the webhook URLs are `env.webhookHelpAndSupport`, `env.webhookSignupRequest`, and `env.webhookKanvasEntitlement` in your values file. See [Helm Chart Values](/pr-preview/pr-1367/cloud/guides/self-hosted/deployment/helm-chart-values/).

### Step 2: Define Custom Webhooks in the .env file

```yaml
env:
  webhookHelpAndSupport: "https://hooks.example.com/layer5/support"
  webhookSignupRequest: "https://hooks.example.com/layer5/signup"
  webhookKanvasEntitlement: "https://hooks.example.com/layer5/kanvas-access"
```

| Chart value | Fires when | Payload |
| --- | --- | --- |
| `env.webhookHelpAndSupport` | Someone submits the Help and Support form in Layer5 Cloud, or a support request raised in Kanvas reaches your deployment | `memberFormOne` |
| `env.webhookSignupRequest` | A Provider Admin approves or denies a signup request | `signupData` and `newUser` |
| `env.webhookKanvasEntitlement` | A new user registers, a user completes a first brokered social sign-in, or a role assignment gives a user Kanvas access | `signupData` and `newUser` |







<div class="alert alert-custom" style="border-color: #7A848E;" role="alert">
  <h4 class="alert-heading" style="color: #7A848E;">webhookHelpAndSupport also receives Kanvas support requests</h4>
  
      Support requests raised inside <a href="/pr-preview/pr-1367/kanvas/reference/help-and-support/">Kanvas</a> travel from the browser to Meshery Server, which forwards them to your Layer5 Cloud deployment, which fires the same webhook. Both sources deliver the same <code>memberFormOne</code> payload. Kanvas users must be connected to your deployment for Help and Support to work. Under Meshery&rsquo;s local provider the request is refused as not implemented.
  
</div>




Leave a webhook unset if you do not need it. Do not invent additional variable names. The server only calls these three.

### Step 3: Applying the Configuration

Upgrade the release. The pods restart because the values land in the ConfigMap.

```bash
helm upgrade layer5-cloud layer5/layer5-cloud -n layer5-cloud --values values.yaml
```

### Step 4: Testing the Webhooks

Trigger each one through its real action: submit the Help and Support form, approve a test signup request, or register a test user. There is no signature and no shared secret header. Restrict the receiver by network policy, or put an unguessable token in the URL path.

| Property | Behavior |
| --- | --- |
| Method and body | `POST` with a JSON body and `Content-Type: application/json; charset=UTF-8`. |
| Authentication | None. |
| Success | A `200` or `202` response. Any other status counts as a failure. |
| Timeout | None. The server waits until the receiver answers. |
| Retries | None. Each event is sent once. |

The support and signup webhooks run inside the request of the person who triggered them, so a slow receiver makes that person wait.

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

Layer5 Cloud rejects a request that carries any field other than these seven, with a `400` error that names the problem.

### Signup decisions

A decision requires an email, a first name, a last name, and a valid `taskLink` URL. Otherwise Layer5 Cloud refuses it with a `400` error before any call is made. `status` is `approved` or the denial value your receiver should expect from the decision. When the webhook fails, the decision request returns a `500` error (`unable to webhook`) and an alert event is recorded.

### Kanvas entitlement

`newUser` is `true` for a first registration and a first brokered sign-in. For a role assignment it reflects whether the person is new to Kanvas. The `formType` value is the literal `meshmap`, the internal name of the Kanvas entitlement. A failure here never blocks the person: Layer5 Cloud records an event and continues.

## Failure behavior

| Webhook | When the receiver fails | What the person sees |
| --- | --- | --- |
| Help and support | The caller receives a `500` error. | An error on the form. |
| Signup decision | The decision request returns `500`. | The decision fails with an error. |
| Kanvas entitlement | The call is dropped. | Nothing. |

Nothing retries. Reconcile missed events from the signup request list and the audit events.

