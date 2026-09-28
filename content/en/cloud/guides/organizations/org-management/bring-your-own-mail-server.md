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

This guide walks an Organization Administrator through configuring it, proving the domain, testing the connection, and reading the delivery health it reports afterwards. It then gives a worked example for each provider the tab offers a preset for: [Google Workspace](#google-workspace), [Microsoft 365](#microsoft-365), [Amazon SES](#amazon-ses), [SendGrid](#sendgrid), [Postmark](#postmark), and [any other provider](#any-other-provider).

{{< alert title="Who can configure this" type="info" >}}
Organization Administrators and Owners can configure, test, turn on, turn off, and remove their Organization's mail server. The same gate applies to the [Identity Providers tab](/cloud/guides/organizations/org-management/#configuring-identity-providers-bring-your-own-credentials).
{{< /alert >}}

## What You Will Need

Have these in hand before you open the Email tab:

-   **The hostname and submission port of your SMTP server**, and whether it uses STARTTLS or implicit TLS.
-   **A username and password the server accepts.** Which credential that is differs by provider, and for most of them it is not the password you sign in with. The table below says which one each provider expects.
-   **A from address on a domain whose DNS you control.** You prove control by publishing a TXT record, so you need access to the domain's DNS zone.

### Where each provider's credential comes from

Every provider on this page mints its SMTP credential somewhere different, and getting the wrong one produces the same result in every case: "The server rejected the username and password." Follow the link for how to create it and what else that provider requires.

| Provider | Username | Password |
| --- | --- | --- |
| [Google Workspace](#google-workspace) | the sending account's full address | an app password for that account, never its account password |
| [Microsoft 365](#microsoft-365) | the mailbox's sign-in address | that mailbox's own sign-in password. This is the exception on this page: client submission authenticates with the account credential itself, and only where the tenant permits it |
| [Amazon SES](#amazon-ses) | your SES SMTP user name | your SES SMTP password, which is not an AWS access key |
| [SendGrid](#sendgrid) | the literal string `apikey` | your SendGrid API key |
| [Postmark](#postmark) | your Postmark server API token | the same server API token again |
| [Any other provider](#any-other-provider) | whatever that provider documents for SMTP submission | |

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

The tab confirms with "Saved *your Organization's name*'s mail server. Test the connection, verify the from domain, then turn it on to start routing mail through it." Nothing about your email has changed yet. Mail keeps leaving through Layer5's shared server until you have verified the domain, passed a connection test, and turned the server on.

Once saved, the tab switches to its configured view. The heading names your Organization and states where its mail is going: it reads "*Your Organization* has its own mail server set up." while the server is off, and "*Your Organization* is using its own mail server." once it is on. A status chip sits beside it, followed by the panels **Delivery health**, **From-domain verification**, **Mail server settings**, **Password** and **Stop using your own mail server**.

## Proving You Control the Sending Domain

The Email tab will not let you turn a server on until you have proven you control the domain in its from address. The proof is a DNS TXT record, and every from domain needs one.

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

In the **Delivery health** panel, click **Test connection**.

Understand exactly what the test does. It opens a connection to your server, negotiates the encryption mode you chose, greets the server, presents your username and password, and hangs up. It proves that the server accepts the connection and the credentials, and nothing more. **It sends no message.** There is no recipient to choose, because none is used. On success the tab reports "The mail server accepted the connection. No test message was sent."

{{< alert title="What a passing test does not prove" type="warning" >}}
Because the test hangs up before naming a sender or a recipient, it cannot detect a server that accepts your credentials but refuses to send as your from address. Google's Gmail SMTP server is the common case: in practice it accepts the login and then sends from the signed-in account's address instead. A passing test followed by mail arriving from the wrong address is that situation, and the fix is on the provider's side. See [Google Workspace](/cloud/guides/organizations/org-management/bring-your-own-mail-server/#google-workspace).
{{< /alert >}}

A passing test is a prerequisite for turning the server on, and it stamps **Last success** in the **Delivery health** panel. A failing test names the stage that refused the connection; use [Troubleshooting](#troubleshooting) to act on it.

## Turning the Server On

With the domain verified and a test passed, click **Turn on** in the **Delivery health** panel. The tab confirms with "Mail server turned on. Mail for *your Organization* now goes out through it."

Both preconditions are enforced on the button, and the panel says which one is outstanding: "Pass a connection test before turning this server on." and "Verify the from domain before turning this server on." The API enforces the test independently, refusing to enable a server whose last verdict is not a success with the message "the mail relay must pass a test before it can be enabled; run the test operation first".

From this point, application mail for your Organization's members leaves through your server from your from address. The from display name is the one you configured, and the Reply-To header carries your Reply-To address if you set one.

### Reading the status

The status chip beside the heading reports one of four states. It is derived from two facts - whether the server is turned on, and how the last connection test or delivery through it went - so a decision somebody made is never reported as a fault:

| Chip | Meaning |
| --- | --- |
| **Off** | The server is not turned on: either nobody has turned it on yet, or an administrator turned it off. Mail is going out through the shared mail server. This is also what a newly saved configuration reads as, and what any settings save or password rotation returns it to. |
| **Delivering** | The server is on and the last connection test or delivery through it succeeded. Mail for this Organization is leaving through it. |
| **Failing** | The server is on and the last connection test or delivery through it failed. The **Last failure** line names the reason, and what happened to that message depends on your fallback setting. Your server is still used for the next message. |
| **Not yet proven** | The server is on and nothing has succeeded through it yet. Mail for this Organization is leaving through it. You are unlikely to see this: turning a server on requires a passed test, and every settings save turns it back off. |

{{< alert title="Failing does not take your server out of service" type="info" >}}
There is no circuit that stops using a server after repeated failures. **Failing** describes the last attempt and nothing more; the next message is sent through your server just the same. If it keeps failing, fix the cause named on the **Last failure** line - the status will not recover on its own, and it will not deteriorate into your server being skipped either.
{{< /alert >}}

The **Delivery health** panel also shows the **Server** host and port, the **From** address, the time of the **Last success**, and the count of **Consecutive failures**. That count means delivery failures since the last success: a failed connection test does not advance it, and neither does a rejection of one recipient's address, which says nothing about the server. When the last attempt failed, a **Last failure** line gives the time and the classified reason, using the same reasons as [Troubleshooting](#troubleshooting).

## Fallback

**Fall back to the shared mail server when delivery fails** is on by default. It decides what happens to a message your server does not accept.

**With fallback on**, a message your server does not accept is re-sent through Layer5's shared mail server, and the failure is recorded against your server's delivery health. "Does not accept" is every way a delivery can fail against your server, not only a refusal it voiced: a host nobody can reach, a connection that times out, a TLS handshake that fails and a rejected password all take the same path. The re-sent message cannot claim your from address, because Layer5's server is not authorized to send as your domain and the message would fail your own SPF and DMARC checks. Instead it arrives from Layer5's address with a display name of your Organization's name followed by "(via Layer5)", and its Reply-To is your Reply-To address, or your from address if you did not set one. Your members still receive the message. Your Organization's name still appears on it.

**With fallback off**, your Organization owns delivery entirely. A message your server does not accept is dropped and is not re-sent. Turning it off is a deliberate decision, so the tab asks you to confirm it with the dialog **Turn off fallback to the shared mail server?**, which states the consequence in full:

> With fallback off this organization owns delivery entirely: a message its mail server will not accept is dropped rather than re-sent. Users of this organization may be unable to verify their email address or reset their password while the mail server is unavailable.

Leave fallback on unless you have a specific reason to accept dropped mail. If you do turn it off, watch the **Delivery health** panel: with fallback off, **Failing** means members did not receive that message.

Two exceptions apply whatever the setting:

-   **A password Layer5 Cloud cannot read.** That is a fault on Layer5's side and not a delivery policy you chose, so the message is sent through the shared server regardless and the failure is recorded as "The stored password could not be read."
-   **A server that took the whole message and then went away.** If your server accepts the message body and then drops the connection or stops answering instead of confirming it, the outcome is genuinely unknown - it may have queued the message. Re-sending could deliver it twice, so nothing more is sent, whichever way fallback is set. The failure is still recorded against your server's delivery health.

## Managing the Configuration Afterwards

### Changing settings

The **Mail server settings** panel holds the same fields as the setup form, minus the password, with its own **Provider preset** picker and **Save settings** button. Saving confirms with "Mail server settings saved. The stored password is unchanged." Any settings save returns the server to unproven and turns it off, because a host or port nothing has tested is unproven; the recorded test result, failure reason and failure count are cleared with it. Run the connection test and click **Turn on** again afterwards. Your from-domain proof survives an edit that leaves the from address on the same domain - renaming the display name does not cost you the TXT record - but changing the from address to a different domain resets domain verification.

### Replacing the password

The **Password** panel reports **Stored - hidden** when a password is held, or **None stored** for a relay configured with authentication set to `none`. The stored password is never shown, on this page or through the API, and saving settings can never change or clear it.

To rotate it, enter the new value in **New password (replaces the stored one)** and click **Replace password**. The field's helper text says "Left empty, nothing changes." Rotation returns the server to unproven and turns it off, because a password nothing has tested is as unproven as a host nothing has tested. Test the connection and turn the server on again afterwards.

Paste the password exactly. Leading and trailing whitespace is kept, because it can be part of a password.

### Turning it off

Click **Turn off** in the **Delivery health** panel. The dialog **Turn off this mail server?** explains that mail goes back to Layer5's shared server and stops arriving from your domain, and that the configuration and stored password are kept so you can turn it back on. The tab confirms with "Mail server turned off. Mail is going out through Layer5 again." The chip returns to **Off**, and the recorded test result is kept, so turning it back on needs only the domain to still be verified.

### Removing it

The **Stop using your own mail server** panel's **Remove mail server** button deletes the configuration and the stored password together. The dialog **Remove this mail server?** states that this cannot be undone, and the tab confirms with "Removed *your Organization*'s mail server. Mail is going out through Layer5 again." Mail is not interrupted: every message leaves through Layer5's shared server from the moment the configuration is removed. Re-adding means entering the host, credentials and from address again, and verifying the domain again.

## Google Workspace

Google supports two ways for an application to send through your Workspace domain. Both work with Layer5 Cloud, and both need an app password rather than the account's sign-in password.

{{< alert title="An ordinary account password does not work" type="warning" >}}
Google Workspace [no longer supports less secure apps](https://knowledge.workspace.google.com/admin/apps/control-access-to-less-secure-apps) that sign in with a username and password, and the setting to allow them has been removed from the Admin console. An application sending over SMTP must present an [app password](https://support.google.com/accounts/answer/185833), which requires 2-Step Verification to be turned on for that account. A sign-in password pasted into the **Password** field produces "The server rejected the username and password." on test. That is Google refusing the credential, not a fault in Layer5 Cloud.
{{< /alert >}}

### App passwords, and Google's "you must use OAuth"

Google's own pages say that third-party apps must use OAuth, and a reader who finds that paragraph will reasonably ask why this guide asks for an app password. Both are true, and the exception is the point.

What Google turned off on 14 March 2025 is sign-in with the **account** password. Its [transition article](https://knowledge.workspace.google.com/admin/sync/transition-from-less-secure-apps-to-oauth) states that from that date "You will no longer use a password for access (with the exception of app passwords)", and for this exact case - "scanners or other devices using SMTP" - it lists "Configure an app password for use with the device" beside configuring OAuth. [App passwords](https://support.google.com/accounts/answer/185833) remain available, and "can only be used with accounts that have 2-Step Verification turned on".

So an app password is the credential to use here. **Layer5 Cloud does not support OAuth (`XOAUTH2`) for outbound mail**: it authenticates with `PLAIN` or `CRAM-MD5`, which is why it needs a password rather than a token. Google is explicit that it prefers neither - it says app passwords "aren't recommended and are unnecessary in most cases" - and its recommended path for an application is the relay service authenticating by source IP address instead of by credential. Hosted Layer5 Cloud cannot take that path, because it publishes no fixed sending addresses for you to allow. A self-hosted Layer5 Cloud that egresses from a static address can: allow that address on the relay and set **Authentication** to `none`.

### Path A: the SMTP relay service

This is [Google's recommended path for applications and devices](https://knowledge.workspace.google.com/admin/gmail/advanced/route-outgoing-smtp-relay-messages-through-google) and it lets you send from any address in your domain, such as `no-reply@`.

In the Google Admin console, go to **Menu > Apps > Google Workspace > Gmail > Routing**, scroll to **SMTP relay service** and click **Configure**. Set:

-   **Allowed senders**: **Only addresses in my domains**. Google states that with this option the sender does not have to be a Workspace user, but the address must be in your primary domain or a subdomain of it.
-   **Authentication**: **Require SMTP Authentication**. Google describes this as verifying the connection with a Workspace user's email address and password. Do not rely on the IP-address option on hosted Layer5 Cloud, which publishes no fixed sending addresses to allow; see [App passwords, and Google's "you must use OAuth"](#app-passwords-and-googles-you-must-use-oauth) for the self-hosted exception.
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

The constraint is the from address. In practice, Gmail's SMTP server replaces the From address with the signed-in account's address unless that address is one of the account's configured **Send mail as** addresses. Google's help pages do not state this rewrite; it is what happens. Your members then see mail arrive from the account rather than from the address you configured, and the connection test cannot catch it, because it hangs up before naming a sender. If you want to send as `no-reply@example.com` through this path, [add it as a Send mail as address](https://support.google.com/mail/answer/22370) on the authenticating account and complete Google's confirmation step first. For a white-labeled sender, Path A is the better choice precisely because the relay service has no such constraint: with **Only addresses in my domains** it sends as any address in your domain.

### Both paths

-   **Verification.** Your Workspace domain is a domain you control, so the TXT record in [Proving You Control the Sending Domain](#proving-you-control-the-sending-domain) is published like any other record at your DNS host. A personal `@gmail.com` address cannot complete this step.
-   **Mail authentication.** Your Workspace domain already carries Google's SPF include, and DKIM signing applies once it is turned on in the Admin console under **Menu > Apps > Google Workspace > Gmail > Authenticate email**. Google notes it can take up to 48 hours for DKIM authentication to start working after the key is added. Confirm DKIM is on for the domain: [Set up DKIM](https://knowledge.workspace.google.com/admin/security/set-up-dkim). No other mail-authentication DNS is needed beyond Layer5 Cloud's TXT proof record.

## Microsoft 365

The **Microsoft 365** preset fills Microsoft's [client SMTP submission](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365) endpoint, which sends authenticated mail through a cloud mailbox.

| Field | Value |
| --- | --- |
| SMTP Host | `smtp.office365.com` |
| Port | `587` |
| Encryption | `starttls` |
| Authentication | `plain` |
| Username | the sign-in address of a licensed mailbox in your tenant |
| Password | that mailbox's own sign-in password, where the tenant permits it |
| From Address | that same mailbox's address, unless you grant **Send As** (below) |

Microsoft 365 is the one provider on this page whose SMTP credential **is** the account's sign-in password rather than a separate token or app password, so the caveats below are about whether your tenant still allows that, not about where to mint something else.

Microsoft names port 587 or 25 for this path and requires TLS 1.2 or later. It also states that a device defaulting to port 465 "doesn't support the required versions of TLS for client SMTP submission", so choose `starttls` on 587 and not `tls` on 465.

Four things decide whether this works, and each of them produces a specific failure:

-   **SMTP AUTH is off by default.** Microsoft disables authenticated client SMTP submission for organizations created after January 2020, and it is turned on per mailbox. Enable it for the mailbox you are using - see [Enable or disable authenticated client SMTP submission](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission) - or the test returns "SMTP authentication was refused by the mail server".
-   **The authentication mechanism has to be one Layer5 Cloud offers.** Layer5 Cloud implements `PLAIN` and `CRAM-MD5` and does not implement `AUTH LOGIN`; the preset says so beneath the picker. A tenant that will not accept `AUTH PLAIN` returns "The mail server does not support the selected authentication method", and no setting on this page changes that. Use a mailbox whose tenant accepts `AUTH PLAIN`, or one of the alternatives below.
-   **Security defaults block this path entirely.** Microsoft states that client SMTP submission using basic authentication "isn't compatible with Security defaults in Microsoft Entra ID". A tenant with [security defaults](https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults) on cannot use this path at all.
-   **Sending as a different address needs Send As.** If the from address is not the mailbox you authenticate with, that mailbox needs **Send As** permission on it; Microsoft returns "5.7.60 SMTP; Client doesn't have permissions to send as this sender", which arrives here as the **Last failure** "The server refused the from address." A connection test cannot detect it, because the test never names a sender.

Microsoft's stated limits for this path are 10,000 recipients per day and 30 messages per minute.

{{< alert title="Basic authentication for client submission is being retired" type="warning" >}}
Microsoft has [published a deprecation timeline](https://techcommunity.microsoft.com/blog/exchange/updated-exchange-online-smtp-auth-basic-authentication-deprecation-timeline/4489835) for basic authentication on client SMTP submission: behavior is unchanged through December 2026, after which it is disabled by default for existing tenants - administrators can still re-enable it - and not available by default to tenants created after that point, with a final removal date to be announced in the second half of 2027. Because Layer5 Cloud authenticates with a username and password, a tenant that reaches that cut-off without the setting re-enabled will start failing with "The server rejected the username and password." Plan a move to a provider on this page that authenticates with a token, or keep the setting enabled while Microsoft still allows it.
{{< /alert >}}

Microsoft's two alternatives to client submission do not substitute cleanly here, and it is worth knowing why before you try them:

-   **High Volume Email** (`smtp.hve.mx.microsoft`, port 587) accepts basic authentication on a dedicated endpoint even where SMTP AUTH is disabled, but Microsoft states it delivers to [internal recipients within the tenant only](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/high-volume-mails-m365). It can only carry your Organization's mail if every member has a mailbox in your tenant, and it needs pay-as-you-go billing configured before the account can send at all.
-   **SMTP relay** through your tenant's MX endpoint authenticates by certificate or static IP on port 25 rather than by credential. Hosted Layer5 Cloud publishes no fixed sending addresses to allow, so this is only an option for a self-hosted install with a static egress address, configured with **Authentication** set to `none`.

## Amazon SES

The **Amazon SES** preset fills a regional endpoint, and **the region in it is a placeholder you must replace**. The preset ships `email-smtp.us-east-1.amazonaws.com`; if you send from another region, the host is wrong and nothing will work until you change it.

| Field | Value |
| --- | --- |
| SMTP Host | `email-smtp.<region>.amazonaws.com`, for example `email-smtp.eu-west-1.amazonaws.com`. AWS lists every endpoint under [Amazon SES endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/ses.html). |
| Port | `587` for STARTTLS, or `465` for implicit TLS |
| Encryption | `starttls` on 587, `tls` on 465 |
| Authentication | `plain` |
| Username | your SES SMTP user name |
| Password | your SES SMTP password |
| From Address | an address on an identity you have verified in SES, in the same region |

-   **SES SMTP credentials are not your AWS access keys.** AWS states plainly that "Your SMTP password is different from your AWS secret access key". Create a dedicated pair in the SES console under **SMTP settings** > **Create SMTP credentials**, and download them at that point - they cannot be retrieved afterwards. See [Obtaining Amazon SES SMTP credentials](https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html). Credentials are **unique to each region**, so a set minted for one region will not authenticate against another region's endpoint.
-   **Sandbox accounts cannot mail your members.** A new SES account is in the [sandbox](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html) in every region, where you can send only to verified addresses and domains, at most 200 messages per 24 hours and 1 per second. Any member whose address is not itself verified, and whose domain is not verified either, is refused - recorded here as "The server refused the recipient." Unless every member is covered by a verified identity, request production access before turning the server on.
-   **Two separate verifications apply.** SES requires you to verify the identity you send as, and Layer5 Cloud requires its own TXT proof of the same domain. Neither substitutes for the other; do both.
-   **Use 587 or 465, not SES's alternates.** AWS also documents ports 2587 and 2465. Layer5 Cloud permits only `25`, `465`, `587` and `2525`, so either alternate is refused before any connection is made.

## SendGrid

The **SendGrid** preset fills its SMTP relay, where the credential is an API key rather than an account login.

| Field | Value |
| --- | --- |
| SMTP Host | `smtp.sendgrid.net` |
| Port | `587` |
| Encryption | `starttls` |
| Authentication | `plain` |
| Username | `apikey` |
| Password | your SendGrid API key |
| From Address | an address on an authenticated domain, or a verified single sender |

{{< alert title="The username is the word apikey" type="warning" >}}
The **Username** field takes the literal string `apikey` - seven characters, the same for every account. It is not your email address, not your SendGrid login and not the API key itself. The API key goes in the **Password** field. Entering the key in both fields, or your email address as the username, produces "The server rejected the username and password." The preset shows this caveat beneath the picker for the same reason.
{{< /alert >}}

-   **Create the key with Mail Send permission**, and copy it when it is shown: SendGrid displays an API key once and cannot show it again. See [Integrating with the SMTP API](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/integrating-with-the-smtp-api).
-   **Verify the sender identity first.** SendGrid requires every sending address to be covered by [domain authentication or single sender verification](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/sender-identity), and describes single sender verification as suitable for testing only. Authenticate the domain your from address is on. Unverified, delivery is refused and recorded as "The server refused the from address."
-   **Other ports.** SendGrid documents 25, 587 and 2525 for STARTTLS and 465 for implicit TLS. All four are within Layer5 Cloud's allowlist; 587 with `starttls` is the recommended pairing.

## Postmark

The **Postmark** preset fills its transactional SMTP endpoint. Its credential is unusual: the same token goes in both fields.

| Field | Value |
| --- | --- |
| SMTP Host | `smtp.postmarkapp.com` |
| Port | `587` |
| Encryption | `starttls` |
| Authentication | `plain` |
| Username | your Postmark **Server API token** |
| Password | the same Server API token |
| From Address | an address on a verified domain, or a confirmed Sender Signature |

-   **Username and password are both the Server API token.** Postmark documents that "The Server API Token acts as the username and password". It is per-server, so take it from the server you intend the mail to come from. An SMTP token works too, with its access key as the username and its secret key as the password. See [Send email with SMTP](https://postmarkapp.com/developer/user-guide/send-email-with-smtp).
-   **The from address must be verified with Postmark.** Postmark requires a confirmed Sender Signature for a single address, or a [verified domain](https://postmarkapp.com/support/article/1046-how-do-i-verify-a-domain) to send from any address on it. Verifying the domain is the better fit, since your from address and Reply-To are usually on the same domain. Without it, delivery is refused and recorded as "The server refused the from address."
-   **Mail goes to the default transactional stream.** Postmark selects a message stream from a header that Layer5 Cloud does not send, so messages take the server's default `outbound` transactional stream. That is the right stream for the notification, invitation and account mail this feature carries. Postmark's separate broadcast host is not applicable here.
-   **There is no implicit-TLS port.** Postmark documents 25, 2525 and 587, all with STARTTLS. Do not choose the `tls` encryption mode; pair `starttls` with 587.

## Any Other Provider

Choose the **Custom** preset - it fills nothing and leaves whatever you typed alone - and get these four things from your provider's documentation. They map one-to-one onto [Requirements on the mail server](#requirements-on-the-mail-server):

| What to ask your provider | What to do with it |
| --- | --- |
| The submission hostname and port | Enter them as **SMTP Host** and **Port**. The port has to be `25`, `465`, `587` or `2525`; if your provider names only something else, it cannot be used. |
| Whether that port expects STARTTLS or implicit TLS | Set **Encryption** to match: `starttls` for 587-style ports, `tls` for 465. A mismatch fails as "The TLS handshake failed." |
| How the SMTP credential is minted | Almost never your account password. Enter it as **Username** and **Password** with **Authentication** set to `plain`, or `cram-md5` if the provider offers it and you prefer that the password never crosses the wire. |
| Which from addresses the account may send as | Providers vary from "any address on a verified domain" to "the authenticated mailbox only". Confirm your from address is authorized, because the connection test cannot check it. |

Two constraints rule some providers out before you start. The server must resolve to a public address, so an internal relay is unreachable from hosted Layer5 Cloud. And a server that offers only `AUTH LOGIN` cannot be used, because Layer5 Cloud implements `PLAIN` and `CRAM-MD5` and will not fall back to `LOGIN`.

**Authentication** set to `none` is for one case only: a relay that authorizes by source address rather than by credential. That needs a fixed egress address to allow, which hosted Layer5 Cloud does not publish, so in practice it is a self-hosted option.

## Troubleshooting

A failed test shows a one-line result beneath the **Test connection** button, and the **Last failure** line in **Delivery health** shows the classified reason recorded for the most recent failure, whether that was a test or a real delivery. Neither is the mail server's own reply. Both name the stage that failed, which is what tells you where to look.

| The test result says | The Last failure line says | What it means | What to do |
| --- | --- | --- | --- |
| "The mail server address is one this server will not connect to" | "The address the host resolved to is not a permitted destination." | Either the destination address or the port was refused before any connection was made, and both report the same way. **The address**: the host resolved to a loopback, private, link-local or carrier-shared address. **The port**: it is not one of `25`, `465`, `587` or `2525` - the form accepts any port in range, and the allowlist is applied when you test. | Check both. Use a mail server with a public address; an internal relay cannot be used from hosted Layer5 Cloud. Then check the port against your provider's submission port, remembering that several providers document alternates - SES's `2587` and `2465`, for instance - that are outside this list. |
| "The selected authentication method sends the password in the clear, so it cannot be used on an unencrypted connection. ..." | "The server refused the message." | You paired a password with `none` encryption. The check runs before any connection is made. | Choose `starttls` or `tls`. |
| "Unable to open a mail session with the configured server" | "The server refused the connection." | Something answered at that address but nothing is listening on that port. | Check the port. Check that the host is the SMTP submission endpoint, not a web address. |
| "Unable to open a mail session with the configured server" | "The server did not answer in time." | The connection attempt timed out, or the server opened the connection and then went silent, including part-way through authentication. | Check the host and port. A firewall on the server side silently dropping the connection produces this result. |
| "Unable to open a mail session with the configured server" | "The TLS handshake failed." | Encryption negotiation failed. The most common cause is a mismatched pairing: `tls` on port 587 or `starttls` on port 465. A certificate that is not trusted or does not name the host also lands here. | Match the mode to the port: `starttls` on 587, `tls` on 465. Check the server's certificate. |
| "The mail server does not offer STARTTLS" | "The server does not offer STARTTLS." | You chose `starttls` and the server did not advertise it. Layer5 Cloud refuses to continue unencrypted rather than send your password in the clear. | If the port is 465, choose `tls`. Otherwise enable STARTTLS on the server. |
| "SMTP authentication was refused by the mail server" | "The server rejected the username and password." | The server answered the credential with a refusal. | Re-enter the password with **Replace password**. For Google Workspace, use an app password, never the sign-in password. For SendGrid, the username is `apikey`. For Microsoft 365, check that SMTP AUTH is enabled on the mailbox. For Amazon SES, check you used SES SMTP credentials rather than AWS access keys. |
| "The mail server does not support the selected authentication method" | "The server rejected the username and password." | The server answered that it does not implement the mechanism you chose, or does not offer it on this connection. | Choose a mechanism the server advertises. `AUTH LOGIN` is not supported by Layer5 Cloud, so a server that offers nothing else cannot be used. |
| "The mail server requires an encrypted connection for the selected authentication method" | "The server rejected the username and password." | The server accepts authentication only over an encrypted connection. | Choose `starttls` or `tls`. |
| "The mail server temporarily declined authentication, and no setting needs to change" | "The server rejected the username and password." | The server is greylisting or rate-limiting the connection. | Retry in a few minutes before changing anything. |
| "The mail server answered reply code ... to the authentication attempt" | "The server rejected the username and password." | The server refused at the authentication stage with a reply Layer5 Cloud does not classify. | Check the mail server's logs for the reply. |
| Not shown by a test | "The server refused the from address." | A real delivery reached the server and it would not send as your from address. The test cannot detect this. | Authorize the from address on the server: a verified **Send mail as** alias or the SMTP relay service for Google, **Send As** permission for Microsoft 365, a verified identity for Amazon SES, an authenticated domain for SendGrid, a verified domain or Sender Signature for Postmark. |
| Not shown by a test | "The server refused the recipient." | A real delivery reached the server and it would not relay to that recipient. | Check the server's relay restrictions. The relay must accept external recipients. |
| Not shown by a test | "The server refused the message." | A real delivery reached the server, which accepted sender and recipient and then refused the message itself, typically on a size or content policy. | Check the server's message policies and logs. |
| Not shown by a test | "The stored password could not be read." | Layer5 Cloud could not decrypt the stored password. This is not a configuration mistake on your side, and the message was sent through the shared server regardless of your fallback setting. | Contact Layer5 support. Replacing the password with **Replace password** re-encrypts it and may clear the condition. |
| A passing test, but mail arrives from the wrong address | Nothing recorded | The server accepted your credentials but sends as the authenticated account instead of your from address. Typical of `smtp.gmail.com`. | See [Google Workspace, Path B](#path-b-the-gmail-smtp-server). |
| **Failing** with fallback off | Any of the above | Members did not receive the message that failed. | Fix the cause named on the **Last failure** line. Consider turning fallback on until it is fixed. |

{{< alert title="Why the reasons are classifications" type="info" >}}
The mail server's own reply text is never shown on the Email tab or returned by the API, only these fixed reasons. Repeating a remote server's reply would turn the test into a way of probing what Layer5's network can reach. The full detail is written to Layer5 Cloud's server log.
{{< /alert >}}

## Related

-   [Organization Management](/cloud/guides/organizations/org-management/) for the rest of the Edit Organization modal, including the Identity Providers tab.
-   [Organization Configuration Scenarios](/cloud/guides/organizations/configuration-scenarios/) for how custom domains and identity providers combine.
-   [White-labeling](/cloud/guides/self-hosted/white-labeling/) for the branding carried in the message body and footer.
