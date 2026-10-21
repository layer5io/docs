# Getting Started

> Learn how to effectively manage your organizations, teams, users, workspaces, environments, and more.


Layer5 Cloud gives you a home for your designs and the people who work on them: an account, an organization that holds your teams, and workspaces that hold shared resources. Sign up and you already have an organization, a team, and a workspace once the first sign-in succeeds. From there you can invite a teammate and clone a design from the public catalog.

## Prerequisites

* A [Layer5 Cloud account](https://cloud.layer5.io). Browsing the catalog needs no account. Cloning a design does.
* [Meshery](https://docs.meshery.io/installation), when you want Layer5 Cloud to act as Meshery's remote provider. A Kubernetes cluster is something Meshery connects to. Layer5 Cloud does not require a cluster of your own to create an account, an organization, or a design.

## Installation and Setup

Layer5 Cloud is a remote provider for Meshery. When you choose Layer5 Cloud as the provider in a Meshery Server, the server sends your browser to Layer5 Cloud to sign in, and Layer5 Cloud returns you to the server with a token. If your browser already holds a live Layer5 Cloud session, Layer5 Cloud skips the sign-in page and hands the token straight back. Layer5 Cloud returns tokens only to callback addresses it trusts and refuses all others. The trust rules are described in [How Layer5 Cloud works with Meshery and Kanvas](/pr-preview/pr-1354/cloud/concepts/#how-layer5-cloud-works-with-meshery-and-kanvas).

1. **Open Meshery.** Navigate to your Meshery UI (usually `http://localhost:9081`).
2. **Select the provider.** On the login screen, select **Layer5 Cloud**.
3. **Sign in.** The server sends your browser to Layer5 Cloud. Sign in with your email and password, GitHub, or Google, or with an identity provider your organization configured.

A Meshery Server registers itself with Layer5 Cloud as a connection owned by the signed-in user. Registering the same server again updates that connection in place instead of creating a new one. Because every new account holds the Kanvas role, the Meshery Server receives the Kanvas extension capabilities when it connects with your account. See [Meshery Server registration](/pr-preview/pr-1354/cloud/concepts/meshery-server-registration/).

## Core Workflow

Everything in Layer5 Cloud sits inside this structure. Your first successful sign-in creates one of each for you.

| Object | What it is | How it relates | What you get by default |
|---|---|---|---|
| User | Your personal identity on Layer5 Cloud. | One user can belong to many organizations and teams. | Your account, plus the global Kanvas role. |
| Organization | The unit of tenancy. Membership in an organization decides who is in. | Owns its teams and workspaces. Every user belongs to at least one. | **My Organization** (description "Default Organization"), owned by you, with the Organization Admin role. |
| Team | A named group of organization members. | Belongs to the organization it is created in. Can be assigned to several workspaces. | **My Team** (description "Default Team"), attached to **My Organization**, with the Team Admin role. |
| Workspace | A group of shared resources such as environments, connections, credentials, and designs. | Lives in one organization. Has zero or more teams. A design belongs to at most one workspace. | **My Workspace** (description "Default Workspace"), in **My Organization**, owned by you. |

If you would rather start from your own repositories, [GitHub integration](/pr-preview/pr-1354/cloud/getting-started/github-integration/) imports Kubernetes manifests, Helm charts, and Docker Compose files as designs.

## Try it out!

Clone a design from the public catalog into the workspace you have selected. [Start from a catalog design](/pr-preview/pr-1354/cloud/getting-started/creating-a-design-from-template/) walks through browsing, opening a design in the Playground (a preview that creates nothing in your account), and cloning. A clone is named with " (Copy)" appended, is owned by you, and is private.

Deploying that design to a cluster is a Meshery Server operation. Layer5 Cloud stores the design. It does not deploy it.

---

### Need Help?

If you run into issues during setup, join the [Layer5 Slack community](http://slack.layer5.io). The [support](/pr-preview/pr-1354/cloud/getting-started/support/) page lists email, the community forum, the in-product support form, and what each plan includes.







<div class="alert alert-custom" style="border-color: #3772ff;" role="alert">
  <h4 class="alert-heading" style="color: #3772ff;">Follow Along with Five</h4>
  
      Throughout these docs you&rsquo;ll follow Five, a Platform Engineer at Orbital Labs, and his colleagues as they set up organizations, configure workspaces, deploy designs, and navigate the occasional Friday-afternoon incident. <a href="/pr-preview/pr-1354/cloud/getting-started/meet-five/">Meet Five and the full cast</a>
  
</div>



## Set up your organization

An organization becomes useful when more than one person works in it. Invite a teammate by email, create a team, create a workspace, give the team that workspace, and move one of your designs into it. The organization decides who is in, teams group people, and workspaces decide which shared resources those people reach.

### Before you begin

- You have a Layer5 Cloud account. If not, follow [Setting up a Layer5 account](/pr-preview/pr-1354/cloud/getting-started/getting-started-with-layer5-account/).
- You work in **My Organization**, the organization Layer5 Cloud created for you, where you hold the Organization Admin role. Any organization where your role grants the permissions below works the same way.
- You own at least one design. If you do not, clone one first with [Creating a design from a catalog template](/pr-preview/pr-1354/cloud/getting-started/creating-a-design-from-template/).

Each step needs a specific permission. These built-in roles hold them:

| Permission | Roles that hold it |
|---|---|
| Invite User to Organization | Organization Billing Manager, Organization Admin, Provider Admin |
| Create Team | Team Admin, Organization Admin, Provider Admin |
| Add User to Team | Team Admin, Organization Admin, Provider Admin |
| Create Workspace | Workspace Admin, Organization Admin, Provider Admin |
| Assign team to workspace | Workspace Admin, Organization Admin, Provider Admin |
| Assign Designs to Workspaces | Workspace Admin, Organization Admin, Provider Admin |

### 1. Invite a teammate by email

Invite your teammate to the organization by email address. Your teammate does not need a Layer5 Cloud account first. An email invitation does all of the following at once:

- Creates a pending account for the address.
- Adds that account to the organization, and to any teams you choose.
- Assigns the organization and team roles you choose.
- Sends an invitation email that names you, the organization, and the teams. Its sign-up link pre-fills your teammate's name and address and carries your organization's identifier.

Layer5 Cloud refuses two kinds of invitation:

| Situation | Result |
|---|---|
| The address already belongs to a Layer5 Cloud account | Refused with HTTP 409 ("invite existing user"). |
| No email address given | Refused with HTTP 400 ("email is required"). |

To bring in someone who already has an account, share your organization's open invitation link instead. Layer5 Cloud accepts that link on every sign-in, not only the first. See [Using the open organization invitation link](/pr-preview/pr-1354/cloud/guides/organizations/org-management/#using-the-open-organization-invitation-link).

### 2. Create a team

Create a team for the people who will share the workspace you build next. A new team belongs to the organization you create it in.

Creating a team and adding people to it are separate actions. Once the team exists, add your teammate to it. When you invite more people later, you can choose this team in the invitation so they join it directly.

### 3. Create a workspace

Create a workspace in the same organization. A workspace groups shared resources such as environments, connections, credentials, and designs. Your **My Workspace** stays as it is. The new workspace is where you and your team collaborate.

### 4. Assign the team to the workspace

Assign your new team to the new workspace. Assignment is its own action, separate from creating either object. The relationship is many-to-many:

- A workspace has zero or more teams.
- A team can be assigned to several workspaces.

You share access to a workspace's resources through the teams assigned to it.

### 5. Move a design into the workspace

Assign one of your designs to the new workspace. You can assign only designs you own.

Assigning a design moves it. A design belongs to at most one workspace, so assigning it to the new workspace removes it from the workspace it was in before, such as **My Workspace**.

### How the pieces fit together

| Object | What it controls | What you did with it |
|---|---|---|
| Organization | Who is a member at all. Teams and workspaces belong to one organization. | Invited a teammate into **My Organization**. |
| Team | A named group of organization members, each with a team role. | Created a team and added your teammate. |
| Workspace | A set of shared resources, reached by the teams assigned to it. | Created a workspace and assigned the team to it. |
| Design | A resource that lives in at most one workspace. | Moved a design you own into the workspace. |

### Check your result

Your organization is set up when all of the following are true:

- Your teammate's account appears in the organization.
- The new team lists your teammate.
- The new workspace lists the new team.
- The design you moved appears in the new workspace and no longer appears in its previous workspace.

For the underlying objects, see [Organizations](/pr-preview/pr-1354/cloud/concepts/identity-and-security/organizations/), [Teams](/pr-preview/pr-1354/cloud/concepts/identity-and-security/teams/), and [Workspaces](/pr-preview/pr-1354/cloud/concepts/spaces/workspaces/). Editing the organization, including invitations, is covered in [Organization management](/pr-preview/pr-1354/cloud/guides/organizations/org-management/). Editing and deleting workspaces is covered in [Managing workspaces](/pr-preview/pr-1354/cloud/guides/workspaces/managing-workspaces/).

