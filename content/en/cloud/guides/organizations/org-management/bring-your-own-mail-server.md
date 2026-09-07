---
title: Bring Your Own Mail Server
description: >
    Send your Organization's email through your own mail server, from your own domain, instead of through Layer5's shared mail server.
weight: 3
categories: [Identity]
tags: [orgs, email, white-labeling]
---

By default, every email Layer5 Cloud sends to the members of your Organization leaves through Layer5's shared mail server and arrives from a Layer5 address. The body of the message already carries your branding. The address it arrives from does not.

The **Email** tab of Edit Organization changes that. Your Organization registers its own SMTP server and its own from address, and once you have proven control of the sending domain and turned the server on, application mail such as invitations and notifications leaves through your server from your domain. Nothing about the message points to a shared provider.

This guide walks an Organization Administrator through configuring it, proving the domain, testing the connection, and reading the delivery health it reports afterwards.

{{< alert title="Who can configure this" type="info" >}}
Organization Administrators and Owners can configure, test, turn on, turn off, and remove their Organization's mail server. The same gate applies to the [Identity Providers tab](/cloud/guides/organizations/org-management/#configuring-identity-providers-bring-your-own-credentials).
{{< /alert >}}

## What You Will Need

Have these in hand before you open the Email tab:

-   **The hostname and submission port of your SMTP server**, and whether it uses STARTTLS or implicit TLS.
-   **A username and password the server accepts.** For hosted providers this is an app password or a dedicated SMTP credential, not the password you sign in with. See [Google Workspace](#google-workspace) below for the two paths Google supports.
-   **A from address on a domain whose DNS you control.** You prove control by publishing a TXT record, so you need access to the domain's DNS zone.

### Requirements on the mail server

Layer5 Cloud refuses a configuration that does not meet these, so check them first:

| Requirement | Detail |
| --- | --- |
| **Submission port** | Only ports `25`, `465`, `587` and `2525` are permitted. Any other port is refused when the connection is tested. |
| **Encryption** | Choose **STARTTLS** (usually port 587) or **TLS** (implicit TLS, usually port 465). The unencrypted mode exists for a relay that needs no credentials at all: Layer5 Cloud will not present a password over an unencrypted connection, and refuses that combination rather than sending the password in the clear. |
| **Publicly reachable address** | The server must resolve to a public address. A host that resolves to a loopback, private, link-local or carrier-shared address is refused at the moment of connection. A relay on your internal network cannot be used from hosted Layer5 Cloud. |
| **Authentication method** | `PLAIN` or `CRAM-MD5`. Choose **None** only for a relay that authorizes by source address. A mail server that requires `AUTH LOGIN` is not supported. |

## Configuring the Mail Server

1.  Go to the Organizations section, select your Organization and click **Edit**, then open the **Email** tab.
2.  Click **Configure mail server**. The tab shows the panels **What changes if you bring your own mail server** and **What you will need**, and the form **Add your mail server** opens beneath them.
3.  Optionally choose a **Provider preset**: **Gmail / Google Workspace**, **Microsoft 365**, **Amazon SES**, **SendGrid**, **Postmark** or **Custom**. A preset fills only the host, port and encryption. It never fills your username, password or from address. Some presets show a warning beneath the picker with a provider-specific caveat, for example that the SendGrid username is the literal string `apikey`.
4.  Fill in the form:
    -   **SMTP Host**: your server's hostname.
    -   **Port (587 for STARTTLS, 465 for TLS)**: the submission port. The port and the encryption mode must agree.
    -   **Encryption**: `starttls`, `tls` or `none`.
    -   **Authentication (None only for a relay that authorises by IP)**: `plain`, `cram-md5` or `none`. Any method other than `none` requires both a username and a password.
    -   **Username** and **Password**: the credential your server accepts. The password is encrypted before it is stored and is never shown again.
    -   **From Address (its domain must be verified)**: the address your members will see mail arrive from. Its domain is what you prove control of in the next step.
    -   **From Display Name**: the name shown beside the from address.
    -   **Reply-To Address**: where replies go. Optional.
    -   **Fall back to the shared mail server when delivery fails**: on by default. See [Fallback](#fallback) before you turn it off.
5.  Click **Save mail server**.

The tab confirms with "Saved your Organization's mail server. Verify the from domain to start routing mail through it." Nothing about your email has changed yet. Mail keeps leaving through Layer5's shared server until you have verified the domain, passed a connection test, and turned the server on.

Once saved, the tab switches to its configured view. The heading reads "Your Organization is using its own mail server" beside a status chip, followed by the panels **Delivery health**, **From-domain verification**, **Mail server settings**, **Password** and **Stop using your own mail server**.

## Proving You Control the Sending Domain

Layer5 Cloud will not send as a domain you have not proven you control. The proof is a DNS TXT record.

The **From-domain verification** panel names the domain taken from your from address, shows a **Not verified** chip, and lists the record to publish:

-   **Record name**: `_meshery-mail.` followed by your domain. For a from address of `no-reply@example.com`, the record name is `_meshery-mail.example.com`.
-   **Record value**: a string beginning `meshery-mail-verification=` followed by a token minted for your Organization.

Publish a TXT record with exactly that name and value in the DNS zone for your domain, then click **Re-check now**.

{{< alert title="DNS propagation is not instant" type="info" >}}
The panel says so itself: "Publish this TXT record, then re-check. DNS changes can take a while to propagate." A re-check made moments after you publish the record commonly reports that no record was found. That is not a defect. Wait for your DNS provider's stated propagation time and re-check again.
{{< /alert >}}

The check reports one of three failures, and each asks for a different action:

| The panel says | What it means | What to do |
| --- | --- | --- |
| "No matching TXT record was found at that name." | The lookup completed and there is no TXT record at the record name. | Publish the record, or wait for propagation if you already have. |
| "A TXT record exists but does not carry the expected value." | A TXT record exists at that name, but none of its values match the record value shown. | Correct the value. Surrounding whitespace is ignored, but the token must match exactly. |
| "The DNS lookup did not complete. Try again shortly." | The lookup timed out or the resolver did not answer, so nothing was established about the domain either way. A previous proof is not withdrawn by this result. | Retry in a few minutes. If it persists, check that the domain's nameservers are answering. |

When the check succeeds the chip changes to **Verified** and the panel reads "Control of this domain is proven (last checked ...). Keep the TXT record published - removing it will fail the next re-check." Leave the record in place.

Two things reset verification:

-   Changing the **From Address** to an address on a different domain. The panel then shows a new record name and a newly minted record value for the new domain.
-   A re-check that completes and finds the record gone or changed. The proof is withdrawn, and the chip returns to **Not verified** until a re-check finds the record again.

{{< alert title="A personal @gmail.com address cannot be verified" type="warning" >}}
Domain verification requires publishing a record under the from address's domain. Nobody can publish a DNS record under `gmail.com`, so a personal Gmail address can never complete this step. A custom domain hosted on Google Workspace is fine, because you control its DNS.
{{< /alert >}}

## Testing the Connection

In the **Delivery health** panel, click **Send test message**. The **Send the test to** field beside it accepts an address, and is optional.

Understand exactly what the test does. It opens a connection to your server, negotiates the encryption mode you chose, greets the server, presents your username and password, and hangs up. It verifies that the server accepts the connection and the credentials. **It does not deliver a message**, even though the field asks for an address, and no message arrives anywhere. On success the tab reports "Test message delivered." Read that as "the connection and credentials were accepted": the API's own result for the same outcome is "The mail server accepted the connection and the credentials. No test message was sent."

{{< alert title="What a passing test does not prove" type="warning" >}}
Because the test hangs up before naming a sender or a recipient, it cannot detect a server that accepts your credentials but refuses to send as your from address. Google's Gmail SMTP server is the common case: in practice it accepts the login and then sends from the signed-in account's address instead. A passing test followed by mail arriving from the wrong address is that situation, and the fix is on the provider's side. See [Google Workspace](/cloud/guides/organizations/org-management/bring-your-own-mail-server/#google-workspace).
{{< /alert >}}

A passing test is a prerequisite for turning the server on. A failing test names the stage that refused the connection; use [Troubleshooting](#troubleshooting) to act on it.

## Turning the Server On

With the domain verified and a test passed, click **Turn on** in the **Delivery health** panel. The tab confirms with "Mail server turned on. It will carry mail once a delivery succeeds."

Layer5 Cloud refuses to turn a server on before it has passed a test, with the message "the mail relay must pass a test before it can be enabled; run the test operation first". The button is also disabled while the domain is unverified, and the panel says "Verify the from domain before turning this server back on."

From this point, application mail for your Organization's members leaves through your server from your from address. The from display name is the one you configured, and the Reply-To header carries your Reply-To address if you set one.

### Reading the status

The status chip beside the heading reports one of four states:

| Chip | Meaning |
| --- | --- |
| **Not yet proven** | Configured, but no message has been delivered through it yet. Mail is still going out through the shared mail server. |
| **Delivering** | The last delivery attempt through your server succeeded, and mail for this Organization is leaving through it. |
| **Failing** | The last delivery attempt through your server failed. The **Last failure** line names the reason, and what happened to the message depends on your fallback setting. Layer5 Cloud keeps trying your server on the next message. |
| **Turned off** | An administrator turned the server off. Mail is going out through the shared mail server. |

The **Delivery health** panel also shows the **Server** host and port, the **From** address, when mail was **Last delivered**, and the count of **Consecutive failures** since the last success. When the last attempt failed, a **Last failure** line gives the time and the classified reason, using the same reasons as [Troubleshooting](#troubleshooting).

## Fallback

**Fall back to the shared mail server when delivery fails** is on by default. It decides what happens to a message your server does not accept.

**With fallback on**, a message your server refuses is re-sent through Layer5's shared mail server, and the failure is recorded against your server's delivery health. The re-sent message cannot claim your from address, because Layer5's server is not authorized to send as your domain and the message would fail your own SPF and DMARC checks. Instead it arrives from Layer5's address with a display name of your Organization's name followed by "(via Layer5)", and its Reply-To is your Reply-To address, or your from address if you did not set one. Your members still receive the message. Your Organization's name still appears on it.

**With fallback off**, your Organization owns delivery entirely. A message your server does not accept is dropped and is not re-sent. Turning it off is a deliberate decision, so the tab asks you to confirm it with the dialog **Turn off fallback to the shared mail server?**, which states the consequence in full:

> With fallback off this organization owns delivery entirely: a message its mail server will not accept is dropped rather than re-sent. Users of this organization may be unable to verify their email address or reset their password while the mail server is unavailable.

Leave fallback on unless you have a specific reason to accept dropped mail. If you do turn it off, watch the **Delivery health** panel: with fallback off, **Failing** means members did not receive that message.

One exception applies whatever the setting: if Layer5 Cloud cannot read your stored password, that is a fault on Layer5's side and not a delivery policy you chose, so the message is sent through the shared server regardless and the failure is recorded as "The stored password could not be read."

## Managing the Configuration Afterwards

### Changing settings

The **Mail server settings** panel holds the same fields as the setup form, minus the password, with its own **Provider preset** picker and **Save settings** button. Saving confirms with "Mail server settings saved. The stored password is unchanged." Any settings save returns the server to unproven and turns it off, because a host or port nothing has tested is unproven. Run the connection test and click **Turn on** again afterwards. Changing the from address to a different domain also resets domain verification.

### Replacing the password

The **Password** panel reports **Stored - hidden** when a password is held, or **None stored** for a relay configured with authentication set to `none`. The stored password is never shown, on this page or through the API, and saving settings can never change or clear it.

To rotate it, enter the new value in **New password (replaces the stored one)** and click **Replace password**. The field's helper text says "Left empty, nothing changes." Rotation returns the server to unproven and turns it off, because a password nothing has tested is as unproven as a host nothing has tested. Test the connection and turn the server on again afterwards.

Paste the password exactly. Leading and trailing whitespace is kept, because it can be part of a password.

### Turning it off

Click **Turn off** in the **Delivery health** panel. The dialog **Turn off this mail server?** explains that mail goes back to Layer5's shared server and stops arriving from your domain, and that the configuration and stored password are kept so you can turn it back on. Turning it back on requires the domain to still be verified.

### Removing it

The **Stop using your own mail server** panel's **Remove mail server** button deletes the configuration and the stored password together. The dialog **Remove this mail server?** states that this cannot be undone. Mail is not interrupted: every message leaves through Layer5's shared server from the moment the configuration is removed. Re-adding means entering the host, credentials and from address again, and verifying the domain again.

## Google Workspace

Google supports two ways for an application to send through your Workspace domain. Both work with Layer5 Cloud, and both need an app password rather than the account's sign-in password.

{{< alert title="An ordinary account password does not work" type="warning" >}}
Google Workspace [no longer supports less secure apps](https://knowledge.workspace.google.com/admin/apps/control-access-to-less-secure-apps) that sign in with a username and password, and the setting to allow them has been removed from the Admin console. An application sending over SMTP must present an [app password](https://support.google.com/accounts/answer/185833), which requires 2-Step Verification to be turned on for that account. A sign-in password pasted into the **Password** field produces "The server rejected the username and password." on test. That is Google refusing the credential, not a fault in Layer5 Cloud.
{{< /alert >}}

### Path A: the SMTP relay service

This is [Google's recommended path for applications and devices](https://knowledge.workspace.google.com/admin/gmail/advanced/route-outgoing-smtp-relay-messages-through-google) and it lets you send from any address in your domain, such as `no-reply@`.

In the Google Admin console, go to **Menu > Apps > Google Workspace > Gmail > Routing**, scroll to **SMTP relay service** and click **Configure**. Set:

-   **Allowed senders**: **Only addresses in my domains**. Google states that with this option the sender does not have to be a Workspace user, but the address must be in your primary domain or a subdomain of it.
-   **Authentication**: **Require SMTP Authentication**. Google describes this as verifying the connection with a Workspace user's email address and password. Do not rely on the IP-address option: Layer5 Cloud publishes no fixed sending addresses to allow.
-   **Encryption**: **Require TLS encryption**.

Then on the Email tab:

| Field | Value |
| --- | --- |
| SMTP Host | `smtp-relay.gmail.com` |
| Port | `587` (Google's page names this port for TLS) |
| Encryption | `starttls` |
| Authentication | `plain` |
| Username | the full address of a Workspace user. A dedicated account created for this purpose is recommended, so that a person leaving does not take the mail credential with them. |
| Password | an app password for that user, with 2-Step Verification on |
| From Address | any address in your domain, for example `no-reply@example.com` |

Google states a limit for the relay of 10,000 messages per user in a 24-hour period. Google's page also states that when the sender is not in one of your domains the envelope sender is rewritten to `postmaster@` your domain; the settings above keep the sender in your domain, so that rewrite does not apply.

### Path B: the Gmail SMTP server

This path needs [no Admin console change](https://knowledge.workspace.google.com/admin/gmail/send-email-from-a-printer-scanner-or-app) and is what the **Gmail / Google Workspace** preset fills in.

| Field | Value |
| --- | --- |
| SMTP Host | `smtp.gmail.com` |
| Port | `587` with `starttls`, or `465` with `tls` |
| Authentication | `plain` |
| Username | the full address of the Workspace account |
| Password | an app password for that account |
| From Address | the authenticated account's own address, or one of its verified **Send mail as** aliases |

Google states the sending limit for this server is 2,000 messages per day.

The constraint is the from address. In practice, Gmail's SMTP server replaces the From address with the signed-in account's address unless that address is one of the account's configured **Send mail as** addresses. Google's help pages do not state this rewrite; it is what happens. Your members then see mail arrive from the account rather than from the address you configured, and the connection test cannot catch it, because it hangs up before naming a sender. If you want to send as `no-reply@example.com` through this path, [add it as a Send mail as address](https://support.google.com/mail/answer/22370) on the authenticating account and complete Google's confirmation step first. For a white-labelled sender, Path A is the better choice precisely because the relay service has no such constraint: with **Only addresses in my domains** it sends as any address in your domain.

### Both paths

-   **Verification.** Your Workspace domain is a domain you control, so the TXT record in [Proving You Control the Sending Domain](#proving-you-control-the-sending-domain) is published like any other record at your DNS host. A personal `@gmail.com` address cannot complete this step.
-   **Mail authentication.** Your Workspace domain already carries Google's SPF include, and DKIM signing applies once it is turned on in the Admin console under **Menu > Apps > Google Workspace > Gmail > Authenticate email**. Google notes it can take up to 48 hours for DKIM authentication to start working after the key is added. Confirm DKIM is on for the domain: [Set up DKIM](https://knowledge.workspace.google.com/admin/security/set-up-dkim). No other mail-authentication DNS is needed beyond Layer5 Cloud's TXT proof record.

## Troubleshooting

A refused test shows a one-line result beneath the **Send test message** button, and the **Last failure** line in **Delivery health** shows the classified reason recorded for the most recent failure, whether that was a test or a real delivery. Neither is the mail server's own reply. Both name the stage that failed, which is what tells you where to look.

| The test result says | The Last failure line says | What it means | What to do |
| --- | --- | --- | --- |
| "The mail server address is one this server will not connect to" | "The address the host resolved to is not a permitted destination." | The host resolved to a loopback, private, link-local or carrier-shared address. Layer5 Cloud will not connect to those. | Use a mail server with a public address. An internal relay cannot be used from hosted Layer5 Cloud. |
| "The mail transport is not usable: port is invalid" | "The server refused the message." | The port is not one of `25`, `465`, `587` or `2525`. The form accepts any port; the allowlist is applied when you test, before any connection is made, so the recorded reason is the generic one. | Change the port to the submission port your provider names. |
| "The selected authentication method sends the password in the clear, so it cannot be used on an unencrypted connection. ..." | "The server refused the message." | You paired a password with `none` encryption. The check runs before any connection is made. | Choose `starttls` or `tls`. |
| "Unable to open a mail session with the configured server" | "The server refused the connection." | Something answered at that address but nothing is listening on that port. | Check the port. Check that the host is the SMTP submission endpoint, not a web address. |
| "Unable to open a mail session with the configured server" | "The server did not answer in time." | The connection attempt timed out, or the server opened the connection and then went silent, including part-way through authentication. | Check the host and port. A firewall on the server side silently dropping the connection produces this result. |
| "Unable to open a mail session with the configured server" | "The TLS handshake failed." | Encryption negotiation failed. The most common cause is a mismatched pairing: `tls` on port 587 or `starttls` on port 465. A certificate that is not trusted or does not name the host also lands here. | Match the mode to the port: `starttls` on 587, `tls` on 465. Check the server's certificate. |
| "The mail server does not offer STARTTLS" | "The server does not offer STARTTLS." | You chose `starttls` and the server did not advertise it. Layer5 Cloud refuses to continue unencrypted rather than send your password in the clear. | If the port is 465, choose `tls`. Otherwise enable STARTTLS on the server. |
| "SMTP authentication was refused by the mail server" | "The server rejected the username and password." | The server answered the credential with a refusal. | Re-enter the password with **Replace password**. For Google Workspace, use an app password, never the sign-in password. For SendGrid, the username is `apikey`. |
| "The mail server does not support the selected authentication method" | "The server rejected the username and password." | The server answered that it does not implement the mechanism you chose, or does not offer it on this connection. | Choose a mechanism the server advertises. `AUTH LOGIN` is not supported by Layer5 Cloud, so a server that offers nothing else cannot be used. |
| "The mail server requires an encrypted connection for the selected authentication method" | "The server rejected the username and password." | The server accepts authentication only over an encrypted connection. | Choose `starttls` or `tls`. |
| "The mail server temporarily declined authentication, and no setting needs to change" | "The server rejected the username and password." | The server is greylisting or rate-limiting the connection. | Retry in a few minutes before changing anything. |
| "The mail server answered reply code ... to the authentication attempt" | "The server rejected the username and password." | The server refused at the authentication stage with a reply Layer5 Cloud does not classify. | Check the mail server's logs for the reply. |
| Not shown by a test | "The server refused the from address." | A real delivery reached the server and it would not send as your from address. The test cannot detect this. | Authorize the from address on the server. For Google, register it as a verified **Send mail as** alias or use the SMTP relay service. |
| Not shown by a test | "The server refused the recipient." | A real delivery reached the server and it would not relay to that recipient. | Check the server's relay restrictions. The relay must accept external recipients. |
| Not shown by a test | "The server refused the message." | A real delivery reached the server, which accepted sender and recipient and then refused the message itself, typically on a size or content policy. | Check the server's message policies and logs. |
| Not shown by a test | "The stored password could not be read." | Layer5 Cloud could not decrypt the stored password. This is not a configuration mistake on your side, and the message was sent through the shared server regardless of your fallback setting. | Contact Layer5 support. Replacing the password with **Replace password** re-encrypts it and may clear the condition. |
| "Test message delivered." but mail arrives from the wrong address | Nothing recorded | The server accepted your credentials but sends as the authenticated account instead of your from address. Typical of `smtp.gmail.com`. | See [Google Workspace, Path B](#path-b-the-gmail-smtp-server). |
| **Failing** with fallback off | Any of the above | Members did not receive the message that failed. | Fix the cause named on the **Last failure** line. Consider turning fallback on until it is fixed. |

{{< alert title="Why the reasons are classifications" type="info" >}}
The mail server's own reply text is never shown on the Email tab or returned by the API, only these fixed reasons. Repeating a remote server's reply would turn the test into a way of probing what Layer5's network can reach. The full detail is written to Layer5 Cloud's server log.
{{< /alert >}}

## Related

-   [Organization Management](/cloud/guides/organizations/org-management/) for the rest of the Edit Organization modal, including the Identity Providers tab.
-   [Organization Configuration Scenarios](/cloud/guides/organizations/configuration-scenarios/) for how custom domains and identity providers combine.
-   [White-labeling](/cloud/guides/self-hosted/white-labeling/) for the branding carried in the message body and footer.
