# Troubleshoot Email Delivery


> Diagnose why a self-hosted Layer5 Cloud is not sending mail: the shared mail server's requirements, what the server checks at startup, how to test delivery, how mail is routed, and what each error code means.



Layer5 Cloud sends two kinds of mail. **Application mail** (invitations, notifications, welcome mail) leaves the Layer5 Cloud server, through an organization's own mail server when one is turned on, and otherwise through the **shared mail server** you configure in the chart's `smtp` values. **Identity mail** (email verification and account recovery) is produced by Kratos and reaches the same server only when you select the HTTP courier. See [Plan a Deployment](/pr-preview/pr-1350/cloud/guides/self-hosted/planning/#mail). This guide helps you find which of those paths is failing and why.







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Read this before upgrading to v1.0.253 or later</h4>
  
      The shared mail server you configure with <code>SMTP_HOST</code> and <code>SMTP_PORT</code> is screened the same way an organization&rsquo;s own mail server is, and <strong>the server refuses to start when it fails that screen</strong>. If <code>SMTP_HOST</code> points at an in-cluster relay, at a non-submission port such as mailpit on <code>1025</code>, or at a plaintext MTA, this deployment stops on upgrade and says so at startup. See <a href="/pr-preview/pr-1350/#constraints-on-the-shared-mail-server">Constraints on the shared mail server</a>.
  
</div>



## Debug Log Levels

To enable email debugging, set `env.loglevel` in your Helm values to `5` (debug) or `6` (trace) and upgrade. The chart default is `4` (info). Return it to `4` when you finish, because debug logs record more detail.

```yaml
env:
  loglevel: 5
```

## Testing Email Configuration

### 1. Email Configuration Test Endpoint (Provider Admin Only) {#1-email-configuration-test-endpoint}

Check that the four `SMTP_*` values are configured, without sending an email.
**Both verbs of this endpoint require authentication and the provider admin
role**, so the `GET` must carry a credential. It validates configuration only -
it does not dial the SMTP server.

```bash
curl -X GET "https://your-domain.com/api/system/email/test" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response (Success):**

```json
{
  "status": "success",
  "message": "Email configuration is valid",
  "timestamp": "1695312000"
}
```

The response carries the verdict only. It does not report `smtp_host`,
`smtp_port` or `smtp_username`: those are the deployment's own relay settings,
and `SMTP_USERNAME` is an email address. Read the configured values from your
deployment configuration instead.

**Expected Response (Error):** `500 Internal Server Error`, as plain text
rather than JSON. The body is the error's short description alone - the full
error, which names the relay, stays in the log:

```text
SMTP configuration error for field 'SMTP_HOST'
```

**Expected Response (Unauthenticated):** `401 Unauthorized`

```json
{
  "message": "user must be logged in to perform this operation"
}
```

**Expected Response (Authenticated, not a provider admin):** `403 Forbidden`

```json
{
  "message": "user you@example.com must be Provider Admin to perform this operation"
}
```

### 2. Send a test email {#send-a-test-email}

Send an actual test email to verify delivery end to end. The endpoint requires authentication and the Provider Admin role:

```bash
curl -X POST "https://cloud.layer5.io/api/system/email/test" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "to": "test@example.com",
    "subject": "Layer5 Cloud Email Test"
  }'
```

**Request Body:**

```json
{
  "to": "test@example.com",
  "subject": "Layer5 Cloud Email Test (optional)"
}
```

**Expected Response (Success):**

```json
{
  "status": "success",
  "message": "Test email sent successfully",
  "timestamp": "1695312000",
  "sentTo": "test@example.com"
}
```

**Expected Response (Unauthenticated / not a provider admin):** the same `401`
and `403` JSON bodies as the `GET` above - both verbs carry the same
provider-admin gate.

**Expected Response (Error - Invalid Email):** `400 Bad Request`, as plain text:

```text
Invalid email address format
```

**Expected Response (Error - Email Configuration):** `500 Internal Server
Error`, as plain text. The configuration is checked before anything is sent, so
this is the same verdict the `GET` gives:

```text
SMTP configuration error for field 'SMTP_HOST'
```

**Expected Response (Error - the send itself failed):** `500 Internal Server
Error`, as plain text, carrying the short description only. The relay's own
reply, the resolved endpoint and the SMTP username stay in the log:

```text
Failed to send email with subject 'Layer5 Cloud Email Test' to recipients: test@example.com
```

### 3. Required Environment Variables

Either set all four values or leave all four empty. A deployment that leaves
them empty is a supported state - it simply sends no mail - but a deployment
that sets some of them and not others does not start.

| Variable | Chart value | Requirement |
| --- | --- | --- |
| `SMTP_HOST` | `smtp.smtphost` | Must resolve to a publicly routable address |
| `SMTP_PORT` | `smtp.smtpport` | One of `25`, `465`, `587`, `2525` |
| `SMTP_USERNAME` | `smtp.smtpusername` | A full address: it becomes the `From:` header |
| `SMTP_PASSWORD` | `smtp.smtppassword` | The mailbox password or app password |

`SMTP_PORT` also decides how the session is encrypted, because the four keys
carry no mode of their own: **`465` means implicit TLS**, and every other
permitted port takes STARTTLS. Read
[Constraints on the shared mail server](#constraints-on-the-shared-mail-server)
before you change either value.

## Constraints on the Shared Mail Server

Since **v1.0.253**, mail is routed per Organization: an Organization that has
[brought its own mail server](/pr-preview/pr-1350/cloud/guides/organizations/org-management/bring-your-own-mail-server/)
sends through that server, and everyone else sends through the shared mail
server your deployment configures. Both now go through **one** send primitive,
so the shared mail server is screened exactly as a tenant's is.

That screening is new. The previous send path applied none of it, so a
deployment that has been sending mail happily can be refused after an upgrade.
A self-hosted install that points `SMTP_HOST` at an internal, plaintext, or non-submission relay can be refused.

### What is refused

| Constraint | What is refused | How to fix it |
| --- | --- | --- |
| **Submission port allowlist** | any port other than `25`, `465`, `587` or `2525` - for example mailpit on `1025` | move the relay onto a submission port, or put a submission-port listener in front of it |
| **Internal-address screen** | an `SMTP_HOST` that resolves to loopback, RFC 1918 private, IPv6 unique-local, RFC 6598 carrier-shared or link-local space - for example an in-cluster `mailhog.default.svc` | point `SMTP_HOST` at a publicly routable relay. There is deliberately no allowlist or opt-out setting |
| **STARTTLS is required** | a relay that answers but does not advertise the extension - a plaintext internal MTA | enable STARTTLS on the relay. It is refused rather than downgraded, because a downgrade would put the mailbox password on the wire in the clear |
| **`SMTP_PORT` parses as a number** | a stray character or space in the value, such as `"587 "` | correct the value in your Secret or environment file |
| **`SMTP_USERNAME` parses as an RFC 5322 address** | a bare mailbox name such as `no-reply` with no domain - it becomes the `From:` header | use the full mailbox address |

**Every address `SMTP_HOST` resolves to is screened, not just the one a
connection happens to use.** A host publishing both a public and a private
record is refused.

Port `465` is the exception to STARTTLS: it speaks TLS from the first byte, and
the deployment selects that mode automatically from the port. You do not
configure the encryption mode separately.

### What happens at startup

The server validates the shared mail server once, at startup, rather than
waiting for somebody's password reset to fail silently. Only the first row below
stops the deployment:

| At startup | Verdict | What you see |
| --- | --- | --- |
| The configuration fails one of the constraints above | **the server exits** | `meshery_cloud-3301` at Error, then exit code 1 |
| The relay could not be reached at all - DNS did not answer, or the connection did not complete | the server starts | `meshery_cloud-3302` at Error |
| The relay answered but its certificate did not verify - expired, wrong host name, or an untrusted issuer | the server starts | `meshery_cloud-3304` at Error, naming the relay host |
| None of the four `SMTP_*` values is set | the server starts | a warning naming the first unset key |
| The relay answered and the screens passed | the server starts | `INFO The shared mail relay answered on smtp.example.com:587 over starttls` |

The two non-fatal failures are still failures: **no mail leaves over the shared
mail server until they clear.** Treat `3302` and `3304` at startup as a page,
not a note. They are separate codes because the remedy is different - `3302` is
the network, `3304` is the relay's certificate.

A refusal is fatal on purpose. The alternative is a deployment that comes up
green and drops every message silently, which is the failure this check exists
to convert into a refusal to start.

The startup check **does not authenticate and sends no message**. A rotated
password is not a reason a deployment will not start, and an authentication
failure is not one of the verdicts this check acts on.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">The configuration test endpoint does not dial</h4>
  
      <code>GET /api/system/email/test</code> now applies everything above that can be decided
without a connection - the presence of all four keys, the port allowlist, the
shape of the host, and the two parse rules. It still opens no connection, so
whether the relay offers STARTTLS is the startup check&rsquo;s answer to give, not
this endpoint&rsquo;s.
  
</div>



## Flow Emails (Kratos Integration)

Identity mail reaches Layer5 Cloud only when Kratos uses the HTTP courier, which posts each message to `/api/identity/flow/emails`. Layer5 Cloud then renders it with the signup organization's branding and sends it like other application mail. Under the HTTP courier there is no SMTP fallback. When Layer5 Cloud answers anything but a success, Kratos retries the message (five times by default) and then abandons it, with no visible error to the user, so an unreachable or misconfigured Layer5 Cloud silently stops verification and recovery mail. With the default SMTP courier, Kratos sends the mail itself through `kratos.kratos.config.courier.smtp.connection_uri`, and none of the shared-relay rules on this page apply to it.

**Only two Kratos template types are dispatched:** `verification_code_valid`
and `recovery_code_valid`. Every environment runs the `code` strategy for
recovery and verification, so those are the only two Kratos emits - and the
unknown-recipient notices (`recovery_code_invalid`, `verification_code_invalid`)
are deliberately not sent. Any other type is acknowledged with a `200` and
logged as unsupported rather than mailed; a `200` for one of those means the
request was accepted and no message was sent.

```log
DEBUG Flow email attempt.  subject_template:  email-templates/valid/email-recover-subject.body.gotmpl , body_template:  email-templates/valid/email-recover.body.gotmpl , organization_id:  0e6b7ba0-... , recipient:  user@example.com
DEBUG Flow email delivery failed.  error_type:  *errors.Error , template_type:  recovery_code_valid , organization_id:  0e6b7ba0-... , recipient:  user@example.com
INFO Flow email sent.  template_type:  recovery_code_valid , recipient:  user@example.com
```

## Which Mail Server a Message Left Through

Every message this deployment sends is routed by the reader's Organization. An
Organization that has configured its own mail server, verified its from domain
and turned it on sends through that server; every other message takes the shared
mail server configured by `SMTP_HOST`.

That routing produces its own log lines, and a self-hosted operator will meet
them without having configured anything themselves:

- **The Organization's mail server was used and the message was accepted.** No
  operator action; the verdict is recorded against that Organization's delivery
  health, which its administrators read on the Email tab.

- **The Organization's mail server refused the message and fallback is on.** The
  message is re-sent over the shared mail server, arriving from this
  deployment's address with the Organization's name and a `(via ...)` suffix.
  Logged as `meshery_cloud-3299`.

- **The Organization's mail server refused the message and fallback is off.**
  The message is **dropped**, logged as `meshery_cloud-3300` at Critical. This
  is that Organization's own setting working as documented, not a fault in this
  deployment - but a dropped verification or recovery message locks a user out
  of their account, so it is worth alerting on.

- **The Organization's mail server took the whole message and never answered.**
  Delivery is unknown, so the message is deliberately **not** re-sent over the
  shared mail server - re-sending it could deliver it twice. Logged as
  `meshery_cloud-3303` at Critical.

- **The Organization's stored configuration could not be read** - a database
  read failed, or a stored password would not decrypt, usually after
  `CLOUD_CREDENTIAL_ENCRYPTION_KEY` was rotated. The message takes the shared
  mail server whatever that Organization's fallback setting says, because the
  fault is this deployment's rather than a delivery policy the tenant chose.
  Logged as `meshery_cloud-3298`.

The full behavior an Organization administrator sees is documented in
[Bring Your Own Mail Server](/pr-preview/pr-1350/cloud/guides/organizations/org-management/bring-your-own-mail-server/).

## Common Issues and Solutions

### 1. SMTP Configuration Errors

**Issue:** `SMTP configuration error: SMTP_HOST is empty`

**Solution:**

- Verify all SMTP environment variables are set
- Check that environment variables are properly loaded in your deployment
- Use the test endpoint to validate configuration

### 2. Authentication Failures

**Issue:** `SMTP authentication was refused by the mail server`

**Solution:**

- Verify SMTP username and password are correct
- For Gmail, use App Passwords instead of regular passwords
- Check if 2FA is enabled and properly configured

The identity that was refused and the endpoint it was presented to are in the
log's long description (`authenticating as <username> at <host:port>`), never in
the response - an SMTP username is an email address.

### 3. Template Errors

**Issue:** `Email template missing or inaccessible`

**Solution:** the templates ship inside the Layer5 Cloud image. If you built a custom image or mounted a volume over its configuration directory, restore the bundled templates, and confirm that the image tag matches the release you run.

### 4. Recipient Validation Errors

**Issue:** `Email recipient validation failed`

**Solution:**

- Verify email addresses are valid and properly formatted
- Check for empty recipient lists
- Validate email addresses contain `@` symbol
- Check for a carriage return or line feed in an address. An address carrying
  one is **refused**, not sanitized: recipient addresses are written as SMTP
  protocol verbs and into the header block, so a line break in one would start a
  header of its own. This applies to `Cc` addresses as well as `To`

Subjects are the deliberate asymmetry: a line break in a subject is stripped
rather than refused, because a subject is display text and dropping a
notification over a design name containing a newline would turn a cosmetic
problem into a lost message.

### 5. Network Connectivity Issues

**Issue:** `meshery_cloud-3302` at startup, or `dial tcp: lookup smtp.example.com: no such host`

**Solution:**

- Check network connectivity to SMTP server
- Verify egress from this cluster to the relay's submission port is allowed
- Test DNS resolution for SMTP host

No mail leaves over the shared mail server while this is outstanding, even
though the deployment started.

### 6. The Server Will Not Start After an Upgrade

**Issue:** `meshery_cloud-3301` at Error, then exit code 1.

**Solution:** the shared mail server fails one of the
[constraints](#what-is-refused). The logged cause names which screen refused it:

| Cause code | The screen that refused | What to change |
| --- | --- | --- |
| meshery_cloud-3297 | a key is unset, `SMTP_PORT` is not a number, or `SMTP_USERNAME` is not an RFC 5322 address | correct the named key |
| meshery_cloud-3262 | the host is empty, or carries whitespace or a line break | correct `SMTP_HOST` |
| meshery_cloud-3263 | the port is not a submission port, or the host resolved into internal address space | correct `SMTP_PORT`, or point `SMTP_HOST` at a publicly routable relay |
| meshery_cloud-3265 | the relay answered and does not offer STARTTLS. Only reachable on a port other than `465`, which never negotiates STARTTLS | enable STARTTLS on the relay, or move it to `465` for implicit TLS |

### 7. The Server's Certificate Is Not Trusted

**Issue:** `meshery_cloud-3304` at Error; the deployment starts.

**Solution:** the relay answered, and its certificate did not verify against the
trusted roots - it has expired, was issued for a different host name, or is
self-signed or from an issuer this server does not trust. Fix the certificate;
this is not a network fault and not something egress rules will clear. Every
send fails identically until it verifies.

## Development Mode

In development environment (`ENVIRONMENT=development`), the rendered email
content is logged **in addition to** being sent, so the body can be read without
opening the recipient's mailbox:

```log
INFO Development mode - Email details recipients=user@example.com subject="Test Email" body="<html>...</html>"
```

The message still goes out over the shared mail server, which still has to
satisfy the [constraints](#what-is-refused) above. Pointing a development
deployment at a local catch-all mailbox on port `1025` does not work.

## Error Codes Reference

| Error Code | Description | Common Causes |
|------------|-------------|---------------|
| meshery_cloud-1092 | Failed to send email | Network issues, SMTP server down |
| meshery_cloud-1144 | SMTP authentication was refused by the mail server | Invalid credentials. The refused identity and the endpoint reach the log only |
| meshery_cloud-1145 | SMTP send mail error | Server rejection, quota exceeded |
| meshery_cloud-1146 | SMTP configuration error | Missing environment variables |
| meshery_cloud-1147 | Email template missing | Template files not found |
| meshery_cloud-1148 | Email recipient validation failed | Invalid email addresses, an empty recipient list, or an address containing a carriage return or line feed |

### Mail routing and the shared mail server

These codes arrived with per-Organization mail routing in **v1.0.253**.
The four marked **send path** describe a message that belonged to an
Organization with its own mail server; the rest describe the shared mail server
this deployment configures.

| Error Code | At startup | Meaning |
|------------|------------|---------|
| meshery_cloud-3297 | cause of 3301 | The shared mail server is not usable as configured: a key is unset, `SMTP_PORT` is not a port number, or `SMTP_USERNAME` is not an address. The log names the key, never its value. The same faults are reported under this code by `/api/system/email/test` and by a send |
| meshery_cloud-3298 | send path | An Organization's mail server configuration could not be read, so the message went over the shared mail server |
| meshery_cloud-3299 | send path | A delivery over an Organization's own mail server failed. The endpoint is in the log only |
| meshery_cloud-3300 | send path | Nothing was sent: an Organization's mail server refused the message and its fallback is turned off |
| meshery_cloud-3301 | **exits** | The shared mail server fails one of the [constraints](#what-is-refused) - port, address, or no STARTTLS. The cause names which screen refused it |
| meshery_cloud-3302 | starts | DNS or the connection did not complete. Genuine unreachability only; no mail leaves over the shared mail server until it clears |
| meshery_cloud-3303 | send path | An Organization's mail server took the whole message and never acknowledged it. Recorded as uncertain and **not** re-sent, because re-sending could deliver it twice |
| meshery_cloud-3304 | starts | The shared mail server's certificate failed verification - expiry, host name or issuer. Check the certificate, not the network |

## Monitoring

Alert on the error codes in the tables above, in particular `meshery_cloud-3301`, `3302`, `3304`, `3300`, and `3303`. See [Monitoring](/pr-preview/pr-1350/cloud/guides/self-hosted/planning/monitoring/).

## Troubleshooting Checklist

- [ ] Set `env.loglevel` to `5` for debug logging while you diagnose
- [ ] Verify all SMTP environment variables are configured
- [ ] Confirm `SMTP_PORT` is one of `25`, `465`, `587`, `2525`, and that `SMTP_USERNAME` is a full address
- [ ] Confirm `SMTP_HOST` resolves only to publicly routable addresses, and that the relay offers STARTTLS (or is on `465`)
- [ ] Read the startup log for `meshery_cloud-3301`, `-3302` or `-3304` before looking anywhere else
- [ ] Test the configuration with the Provider Admin-only `/api/system/email/test` endpoint, authenticating the request
- [ ] If only identity mail is missing, check which Kratos courier you use and, for the HTTP courier, that Kratos can reach `/api/identity/flow/emails`
- [ ] Check network connectivity to SMTP server
- [ ] Confirm the image still carries its bundled email templates
- [ ] Verify recipient email addresses are valid
- [ ] Check SMTP server logs for additional error details
- [ ] Monitor email service provider quotas and limits

