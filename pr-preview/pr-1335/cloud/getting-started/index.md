# Getting Started

> Go from sign-up to a shared organization and your first design in Layer5 Cloud.


Layer5 Cloud gives you a home for your designs and the people who work on them: an account, an organization that holds your teams, and workspaces that hold shared resources. You reach first value in three short tutorials. Sign up and you already have an organization, a team, and a workspace. Invite a teammate and give your team a workspace. Clone a design from the public catalog and you have something to work on.

## The tenancy model in one table

Everything in Layer5 Cloud sits inside this structure. Your first sign-in creates one of each for you, so you never start from an empty account.

| Object | What it is | How it relates | What you get by default |
|---|---|---|---|
| User | Your personal identity on Layer5 Cloud. | One user can belong to many organizations and teams. | Your account, plus the global Kanvas role. |
| Organization | The unit of tenancy. Membership in an organization decides who is in. | Owns its teams and workspaces. Every user belongs to at least one. | **My Organization**, owned by you, with the Organization Admin role. |
| Team | A named group of organization members. | Belongs to the organization it is created in. Can be assigned to several workspaces. | **My Team**, attached to **My Organization**, with the Team Admin role. |
| Workspace | A group of shared resources such as environments, connections, credentials, and designs. | Lives in one organization. Has zero or more teams. A design belongs to at most one workspace. | **My Workspace**, in **My Organization**, owned by you. |

## Tutorials

Work through these in order. Each one builds on the last.

1. [Create Your Layer5 Account](/pr-preview/pr-1335/cloud/getting-started/getting-started-with-layer5-account/): sign up, verify your address, sign in, and confirm what Layer5 Cloud set up for you.
2. [Set Up Your Organization](/pr-preview/pr-1335/cloud/getting-started/setting-up-your-organization/): invite a teammate by email, create a team and a workspace, assign the team to the workspace, and move a design into it.
3. [Start from a Catalog Design](/pr-preview/pr-1335/cloud/getting-started/creating-a-design-from-template/): browse the public catalog, try a design in the Playground, and clone it into your workspace as a private copy.

If you would rather start from your own repositories, [GitHub integration](/pr-preview/pr-1335/cloud/guides/integrations/github-integration/) imports Kubernetes manifests, Helm charts, and Docker Compose files as designs.

## Using Cloud with Meshery

Layer5 Cloud is a Remote Provider for [Meshery](https://docs.meshery.io/installation). When you choose Layer5 Cloud as the provider in a Meshery Server, the server sends your browser to Layer5 Cloud to sign in, and Layer5 Cloud returns you to the server with a token. If your browser already holds a live Layer5 Cloud session, Layer5 Cloud skips the sign-in page and hands the token straight back. Layer5 Cloud returns tokens only to callback addresses it trusts and refuses all others.

A Meshery Server registers itself with Layer5 Cloud as a connection owned by the signed-in user. Registering the same server again updates that connection in place instead of creating a new one. Because every new account holds the Kanvas role, the Meshery Server receives the Kanvas extension capabilities when it connects with your account.

- [Architecture](/pr-preview/pr-1335/cloud/concepts/architecture/): how the sign-in handoff, trusted callbacks, and provider capabilities work.
- [Meshery Server registration](/pr-preview/pr-1335/cloud/concepts/meshery-server-registration/): how a Meshery Server becomes a connection in your account.

## Get help

If you run into issues during setup, join the [Layer5 Slack community](http://slack.layer5.io).

