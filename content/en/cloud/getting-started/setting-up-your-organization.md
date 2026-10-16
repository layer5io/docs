---
title: Set Up Your Organization
description: Invite a teammate, create a team and a workspace, and move a design into that workspace to learn how organizations, teams, and workspaces control access.
weight: 20
diataxis: tutorial
---

An organization becomes useful when more than one person works in it. In this tutorial you invite a teammate by email, create a team, create a workspace, give the team that workspace, and move one of your designs into it. By the end you know which object controls what: the organization decides who is in, teams group people, and workspaces decide which shared resources those people reach.

## Before you begin

- You have a Layer5 Cloud account. If not, follow [Create Your Layer5 Account]({{< ref "cloud/getting-started/getting-started-with-layer5-account.md" >}}).
- You work in **My Organization**, the organization Layer5 Cloud created for you, where you hold the Organization Admin role. Any organization where your role grants the permissions below works the same way.
- You own at least one design. If you do not, clone one first with [Start from a Catalog Design]({{< ref "cloud/getting-started/creating-a-design-from-template.md" >}}).

Each step in this tutorial needs a specific permission. The table shows which built-in roles hold each one:

{{< keys-matrix caption="Permissions used in this tutorial" functions="Invite User to Organization|Create Team|Add User to Team|Create Workspace|Assign team to workspace|Assign Designs to Workspaces" >}}

## 1. Invite a teammate by email

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

To bring in someone who already has an account, share your organization's open invitation link instead. Layer5 Cloud accepts that link on every sign-in, not only the first. See [Using the open organization invitation link]({{< ref "cloud/guides/organizations/org-management/_index.md#using-the-open-organization-invitation-link" >}}).

## 2. Create a team

Create a team for the people who will share the workspace you build next. A new team belongs to the organization you create it in.

Creating a team and adding people to it are separate actions. Once the team exists, add your teammate to it. When you invite more people later, you can choose this team in the invitation so they join it directly.

## 3. Create a workspace

Create a workspace in the same organization. A workspace groups shared resources such as environments, connections, credentials, and designs. Your **My Workspace** stays as it is; the new workspace is where you and your team collaborate.

## 4. Assign the team to the workspace

Assign your new team to the new workspace. Assignment is its own action, separate from creating either object. The relationship is many-to-many:

- A workspace has zero or more teams.
- A team can be assigned to several workspaces.

This is how you share access to a workspace's resources: through the teams assigned to it, not person by person.

## 5. Move a design into the workspace

Assign one of your designs to the new workspace. You can assign only designs you own.

Assigning a design moves it. A design belongs to at most one workspace, so assigning it to the new workspace removes it from the workspace it was in before, such as **My Workspace**.

## How the pieces fit together

| Object | What it controls | What you did with it |
|---|---|---|
| Organization | Who is a member at all. Teams and workspaces belong to one organization. | Invited a teammate into **My Organization**. |
| Team | A named group of organization members, each with a team role. | Created a team and added your teammate. |
| Workspace | A set of shared resources, reached by the teams assigned to it. | Created a workspace and assigned the team to it. |
| Design | A resource that lives in at most one workspace. | Moved a design you own into the workspace. |

Roles determine what each person may do at each level, as the permission table above shows for the actions in this tutorial.

## Check your result

Your organization is set up when all of the following are true:

- Your teammate's account appears in the organization.
- The new team lists your teammate.
- The new workspace lists the new team.
- The design you moved appears in the new workspace and no longer appears in its previous workspace.

## Go deeper

- [Organizations]({{< ref "cloud/concepts/identity-and-security/organizations/_index.md" >}}): organizations as the unit of tenancy.
- [Teams]({{< ref "cloud/concepts/identity-and-security/teams/_index.md" >}}): how teams group users.
- [Workspaces]({{< ref "cloud/concepts/workspaces.md" >}}): what a workspace holds and how it is shared.
- [Organization management]({{< ref "cloud/guides/organizations/org-management/_index.md" >}}): editing your organization and managing invitations.
- [Managing workspaces]({{< ref "cloud/guides/workspaces/managing-workspaces/index.md" >}}): editing, deleting, and organizing workspaces.
