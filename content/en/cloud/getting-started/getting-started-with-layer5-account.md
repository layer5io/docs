---
title: Create Your Layer5 Account
description: Create and verify a Layer5 Cloud account, sign in for the first time, and learn what Layer5 Cloud sets up for you.
weight: 10
diataxis: tutorial
---

Your Layer5 account is your personal identity on Layer5 Cloud. One account can belong to many organizations and teams, and it is how you import and create designs, collaborate through workspaces, and connect Meshery Servers. In this tutorial you create an account, verify it, sign in, and confirm that Layer5 Cloud has prepared an organization, a team, and a workspace for you. You do not set up any of those yourself before you can start working. The **Check your email** page and the **Import from GitHub** first-run page described below arrived in Layer5 Cloud **v1.0.278**.

## 1. Create an account

Sign up at <https://cloud.layer5.io/signup>. The registration page offers these sign-up methods:

| Method | What happens next |
|---|---|
| Email and password | You fill in one form. Layer5 Cloud signs you in right away and sends a verification email. Opening its link verifies your address and takes you back to where you started. |
| GitHub | You authorize with GitHub and are signed in straight after registration. Layer5 Cloud treats the email address GitHub reports as verified, so no verification email is sent. |
| Google | You authorize with Google and are signed in straight after registration. Layer5 Cloud treats the email address Google reports as verified, so no verification email is sent. |
| Your organization's identity provider | An organization that brings its own identity provider credentials, including a generic OIDC provider, shows that provider on its own sign-up page. |

### What the email sign-up form checks

The email sign-up form is a single screen that asks for your first name, last name, email address, and password. Layer5 Cloud validates each field and keeps what you typed when it shows an error, so you only correct the field at fault.

| Field | Rule |
|---|---|
| First and last name | 1 to 50 characters. Letters, combining marks, and spaces only. A spam filter also rejects blocked keywords in names. An invalid name shows "Invalid first name." or "Invalid last name." |
| Email address | A syntactically valid address. The spam filter also rejects disposable-email domains. An invalid or rejected address shows "Invalid email address or domain not allowed." |
| Password | At least 8 characters. Must not appear in the Have I Been Pwned breach corpus. Must not be too similar to your email address. |

When the deployment has a reCAPTCHA check enabled, the submit button stays disabled until you solve it. A field-level validation failure keeps your solved captcha. If the server rejects the whole submission after the captcha was sent, the captcha resets and asks you to "Please complete the verification again." If the network fails, the page shows "We couldn't submit your sign-up. Check your connection and try again."

GitHub and Google sign-up skip the spam filter and the captcha.

The sign-up form stays valid for 24 hours. If you leave it open longer, it restarts and you fill it in again.

## 2. Verify your email address

After an email sign-up, Layer5 Cloud signs you in and sends a verification email that contains both a verification link and a verification code. Either one completes verification. Both stay valid for 720 hours (30 days). You cannot use your account, or sign in again with your password, until you verify your address.

Opening the link verifies your address at once. You do not need to type the code or press a button. Layer5 Cloud then takes you back to the page you started signing up from, or to your dashboard if you opened the sign-up page directly. If the link has expired or was already used, the verification page says so and lets you request a new email.

Your browser lands on a **Check your email** page that says you are signed in and names the address the verification email went to. You can wait on this page:

- **Resend email** sends a new verification email without leaving the page. Once it is sent, the page also offers a form where you type the code from the new email instead of opening its link.
- **Sign out and use a different email** signs you out so you can sign up again with the correct address. Use it if you mistyped your address. An account cannot change its email address before that address is verified, so signing up again with the correct address is the fix.

The page remembers your address only in the browser tab you signed up in. If you open **Check your email** in a different tab, or your browser blocks site storage, the page shows generic text instead of your address. **Resend email** then opens the verification page, which asks for your address before it sends a new email.

If your organization uses a custom domain, the verification link, the page it opens, and the return afterward all stay on your organization's domain, with your organization's name and logo.

If your link has expired, request a new verification email and use the latest link.

## 3. Sign in {#3-signing-in-to-layer5-cloud}

Sign in at <https://cloud.layer5.io/login> with the method you signed up with. If you signed up with GitHub or Google, Layer5 Cloud sends you to that provider to authenticate. The sign-in form stays valid for 12 hours; an expired form restarts.

You are not asked to name an organization or a workspace. Layer5 Cloud creates both on your first successful sign-in, as described in the next steps.

### Where your first sign-in takes you

Your first sign-in normally opens your [dashboard](#6-dashboard). One exception applies: if you started signing up from Kanvas, or from a Meshery Server on your organization's custom domain, and you registered in this browser, your first sign-in opens the **Import from GitHub** page (titled "Get started") once. If the sign-in carries an explicit return address, Layer5 Cloud sends you there instead.

The **Import from GitHub** page holds one card. It explains that connecting GitHub lets you pick repositories and import Kubernetes manifests, Helm charts, and Docker Compose files as designs. It also names your organization and workspace: "Organizations own workspaces. You're in My Organization, working in My Workspace. Rename either anytime." From there you either start the [GitHub integration]({{< ref "cloud/guides/integrations/github-integration/index.md" >}}) wizard or skip to your dashboard.

{{< alert type="info" >}}
Layer5 Cloud remembers where you started only for the browser session you signed up in. If you sign in from a different browser, or after closing the browser you signed up in, you land on your dashboard. The **Import from GitHub** page is always available at <https://cloud.layer5.io/register/choose-start>.
{{< /alert >}}

## 4. Your default organization {#4-creating-an-organization}

Organizations are the unit of tenancy in Layer5 Cloud, and every user belongs to at least one. On your first sign-in, Layer5 Cloud creates an organization named **My Organization** (description "Default Organization"), makes you its owner, and gives you the Organization Admin role in it. You can create more organizations and join existing ones.

Layer5 Cloud also creates a team named **My Team** (description "Default Team"), attaches it to **My Organization**, and gives you the Team Admin role on it.

{{< alert type="info" >}}
For more information, see [Organizations]({{< ref "cloud/concepts/identity-and-security/organizations/_index.md" >}}).
{{< /alert >}}

You can rename **My Organization** and change its description at any time. See [Editing your organization]({{< ref "cloud/guides/organizations/org-management/_index.md#editing-your-organization" >}}).

## 5. Your default workspace {#5-creating-a-workspace}

Workspaces are logical groups of shared resources such as environments, connections, credentials, and designs. On your first sign-in, Layer5 Cloud creates a workspace named **My Workspace** (description "Default Workspace") in **My Organization**, owned by you. You can create more workspaces and share access to their resources through teams. If any of your organizations ever has no workspace, Layer5 Cloud re-creates **My Workspace** in it.

{{< alert type="info" >}}
For more information, see [Workspaces]({{< ref "cloud/concepts/workspaces.md" >}}).
{{< /alert >}}

You can rename **My Workspace** and change its description at any time. See [Edit a Workspace]({{< ref "cloud/guides/workspaces/managing-workspaces/index.md#edit-a-workspace" >}}).

### Everything your first sign-in sets up

| Created for you | Name | Your access |
|---|---|---|
| Organization | My Organization | Owner, Organization Admin role |
| Team | My Team, attached to My Organization | Team Admin role |
| Workspace | My Workspace, in My Organization | Owner |
| Global role | Kanvas | Grants the Kanvas extension capabilities when a Meshery Server connects with your account |

Layer5 Cloud also records your primary email address so that one person signing in by a different method reuses the same account instead of creating a second one. Layer5 Cloud accepts open organization invitation links on every sign-in, not only the first.

## 6. Explore your dashboard {#6-dashboard}

The dashboard is your normal landing page after sign-in. It is a grid of widgets whose layout you can edit; Layer5 Cloud prompts you before you leave with unsaved layout changes. Available widgets include Getting Started, Workspace Activity, Explore Playground, My Academy, Learn by Video, Help Center, Meshery Instances, Kubernetes Clusters Count, Catalog Content Count, Invite Friends, Badges, My Designs, System Version, Catalog Leaderboard, and Catalog Metrics. Academy administrators see additional widgets for Academy content statistics, metrics, test analytics, and registrations.

## 7. Link GitHub or Google to your profile

Whatever method you signed up with, you can later link a GitHub or Google account to your existing profile from your profile page. Once linked, either method signs you in to the same Layer5 Cloud profile. Each provider shows **Link** or **Unlink** depending on its current state. Linking sends you to the provider and then back to your profile.

Profile changes are privileged actions. If your session has been active for more than 15 minutes, Layer5 Cloud asks you to authenticate again before it saves them.

## Check your result

Your account is ready when all of the following are true:

- You can sign in at <https://cloud.layer5.io/login>. For an email account, a successful password sign-in also proves your address is verified.
- Your dashboard loads after sign-in.
- Your organization is **My Organization**, and it contains **My Workspace**.

## Next steps

- [Set Up Your Organization]({{< ref "cloud/getting-started/setting-up-your-organization.md" >}}): invite a teammate, create a team, and give it a workspace.
- [Start from a Catalog Design]({{< ref "cloud/getting-started/creating-a-design-from-template.md" >}}): clone a public design into your workspace.
