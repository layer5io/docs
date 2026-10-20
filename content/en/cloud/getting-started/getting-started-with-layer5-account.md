---
title: Setting up Layer5 Account
description: With a personal account on Layer5 Cloud, you can import or create infrastructural designs, collaborate with others through workspaces and teams, manage your organizations and more.
weight: 1
---

This guide will walk you through setting up your Layer5 account.

## Configuring your Layer5 account

The first steps in starting with Layer5 are to create an account, verify your email, sign in, and view your profile. You do not need to set up an organization or a workspace: Layer5 Cloud creates one of each for you when you sign up. The **Check your email** page and the **Import from GitHub** first-run page described below arrived in Layer5 Cloud **v1.0.278**.

 Every person who uses Layer5 Cloud has their own personal account, which can be part of multiple organizations and teams. Your personal account is your identity on Layer5 Cloud and represents you as an individual.

### 1. Creating an account

To sign up for an account on Layer5 Cloud, navigate to <https://cloud.layer5.io/signup>.
You may choose to either signup with your personal email or any of our supported OAuth providers like Github and Gmail. See "OAuth Providers" for more information.

{{< meshery-design-embed src="export-designs/embedded-design-flows.js" id="embedded-design-8c9106f6-2b0e-4bd1-8eea-8ccdab5c117d" >}}



### 2. Verifying your email address

After signing up, a verification email is sent to the email address associated with your account. The email contains a verification code and a verification link. You can complete your email verification using either method.

When you sign up with your email, Layer5 Cloud takes you to a **Check your email** page that names the address the verification email was sent to. You can stay on this page while you wait for the email:

- **Resend email** sends a new verification email without leaving the page. Once it is sent, the page also links to a form where you can type the code from the new email instead of opening its link.
- **Use a different email** takes you back to the sign-up form with your name kept and the email address cleared. Use it if you mistyped your address: an account cannot change its email address before that address is verified, so signing up again with the correct address is how you fix it.

If you reach the **Check your email** page in a different browser tab from the one you signed up in, or your browser blocks site storage, the page cannot name your address. **Resend email** then opens the verification page, which asks for your address before sending a new email.

If you are using a custom domain, the verification link stays on your organization's domain instead of redirecting to the default domain.

On custom domains, verification links sent before the email-verification fix was released cannot be completed. Verification links are valid for 720 hours (30 days). If your link expired - or was sent before the fix - request a new verification email and use the latest verification link.


<!-- considering we would want to use 2FA in future
4. Configuring two-factor authentication

Two-factor authentication, or 2FA, is an extra layer of security used when logging into websites or apps. We strongly urge you to configure 2FA for the safety of your account. For more information, see "About two-factor authentication."

Optionally, after you have configured 2FA, add a passkey to your account to enable a secure, passwordless login. For more information, see "About passkeys" and "Managing your passkeys." -->

### 3. Signing in to Layer5 Cloud

To sign in to Layer5 Cloud, navigate to <https://cloud.layer5.io/login>. Use your new credentials to sign in. In case you have signed up with OAuth provider, you will be redirected to the provider's login page.

You are not asked to name an organization or a workspace. Both were created when you signed up, as described in the next two steps. Where your first sign-in takes you depends on where you started:

- **You started from Kanvas.** If you came to Layer5 Cloud from Kanvas and created your account on Layer5 Cloud, your first sign-in opens the **Import from GitHub** page. If you instead signed in with GitHub or Google on the sign-in page Kanvas sent you to, you are returned to Kanvas.
- **You started on Layer5 Cloud.** Your first sign-in opens your [dashboard](#6-dashboard).

The **Import from GitHub** page holds a single card. It explains that connecting GitHub lets you choose repositories and import Kubernetes manifests, Helm charts, and Docker Compose files as designs, and it names your organization and workspace, each linked to where you can rename it. Select **Import from GitHub** to start the [GitHub integration]({{< ref "cloud/getting-started/github-integration/index.md" >}}) wizard, or **Skip for now** to go to your dashboard.

{{< alert type="info" >}}
Layer5 Cloud remembers that you started from Kanvas only for the browser session you signed up in. If you sign in from a different browser, or after closing the browser you signed up in, you may land on your dashboard instead. The **Import from GitHub** page is always available at <https://cloud.layer5.io/register/choose-start>.
{{< /alert >}}


### 4. Your default organization {#4-creating-an-organization}

Organizations are the unit of tenancy in Layer5 Cloud. Every user on Layer5 Cloud is part of at least one organization. When you sign up, Layer5 Cloud creates an organization named **My Organization** for you and makes you its owner and Organization Admin. Depending on your plan, you can also create more organizations, and you can join existing ones.

{{< alert type="info" >}}
For more information, see [Organizations]({{< ref "cloud/concepts/identity-and-security/organizations/_index.md" >}})
{{< /alert >}}


You can rename **My Organization** and change its description at any time. For more information, see [Editing your organization]({{< ref "cloud/guides/organizations/org-management/_index.md#editing-your-organization" >}}).

### 5. Your default workspace {#5-creating-a-workspace}

Workspaces are logical groups of shared resources like environments, connections, credentials, infrastructure designs and more. Every user on Layer5 Cloud is part of at least one workspace. When you sign up, Layer5 Cloud creates a workspace named **My Workspace** in your organization, owned by you. You can also create more workspaces or join an existing one. You can share access to resources in your workspaces through teams.

{{< alert type="info" >}}
For more information, see [Workspaces]({{< ref "cloud/concepts/spaces/workspaces.md" >}})
{{< /alert >}}

You can rename **My Workspace** and change its description at any time. For more information, see [Edit a Workspace]({{< ref "cloud/guides/workspaces/managing-workspaces/index.md#edit-a-workspace" >}}).

### 6. Dashboard

The dashboard is the first page you see when you sign in to Layer5 Cloud, except for the first sign-in of an account created from Kanvas, which opens the **Import from GitHub** page described in [step 3](#3-signing-in-to-layer5-cloud). It provides a high-level overview of your Layer5 account. For more information, see "About your dashboard."

### 7. Viewing your Layer5 profile

Your Layer5 profile tells people the story of your work through the recent activities, designs that you've published to Cloud catalog and much more. For more information, see "About your profile".
