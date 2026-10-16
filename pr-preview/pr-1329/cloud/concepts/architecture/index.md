# How Layer5 Cloud Works with Meshery and Kanvas


> How Layer5 Cloud acts as the remote provider for Meshery Server and Kanvas, what it supplies to a connected server, how sign-in is handed off, and what it stores.


Layer5 Cloud is a [Meshery remote provider](https://docs.meshery.io/extensibility/providers). Meshery Server delegates identity, tenancy, and persistence to it, and Kanvas, which runs inside Meshery, reaches it through Meshery Server. Knowing what Cloud supplies, and what it does not touch, explains why some features need an account, why a feature can appear for one user and not another, and why Meshery Server, rather than your browser, is what reaches your clusters.

<figure>
  <img src="images/cloud-meshery-provider-architecture.webp" alt="Architecture diagram titled Meshery Architecture - Providers. On the left, a Remote Provider and a Local Provider connect to Meshery in the center. On the right, Meshery connects to Kubernetes clusters, where Meshery Operator runs MeshSync and Meshery Broker, and to adapters." />
  <figcaption>Read the diagram from left to right. Providers sit on the left: Meshery runs with either a remote provider, which is the role Layer5 Cloud plays, or a local provider. The remote provider handles identity, tenancy, and the storage and sharing of designs. Meshery sits in the middle and mediates every request between the provider and your infrastructure. Your clusters sit on the right, where Meshery Operator runs MeshSync and Meshery Broker to report live state back to Meshery. Meshery, not the provider, is drawn connecting to the clusters and adapters on the right.</figcaption>
</figure>

## What Cloud provides to a connected Meshery Server

When a Meshery Server uses Layer5 Cloud as its provider, Cloud supplies four things:

- **Identity and sign-in.** Cloud authenticates the user and hands Meshery Server a token. Cloud publishes the keys that verify its tokens, as a JSON Web Key Set, at its unauthenticated `/keys` endpoint.
- **Tenancy.** Cloud holds the organizations, teams, workspaces, environments, and roles that decide what a user can see and do. See [Concepts](/pr-preview/pr-1329/cloud/concepts/) for how these relate.
- **Persistence.** Cloud stores designs and their versions, records who each design is shared with, hosts the [catalog](/pr-preview/pr-1329/cloud/concepts/catalog/), and keeps the event log.
- **A capabilities document.** Cloud tells Meshery Server which features the provider offers to the current caller, and Meshery and Kanvas enable only those features.

Meshery Server also registers itself with Cloud as a connection owned by the signed-in user. See [Meshery Server Registration](/pr-preview/pr-1329/cloud/concepts/meshery-server-registration/).

## The sign-in handoff

A Meshery Server, or Kanvas, does not collect credentials itself. It hands the browser to Cloud and waits for a token to come back:

1. The client sends the browser to Cloud's sign-in with a source: the address of its own token callback, encoded in base64url.
2. The user signs in to Cloud. If the browser already holds a live Cloud session, Cloud skips the sign-in page.
3. Cloud returns the browser to the source's token endpoint with a token and the original reference in the query string.

The token callback path is `/api/user/token` or `/api/token`. Older Meshery Servers send `/user/login` or `/login`, and Cloud rewrites those to the current paths, so older servers keep working.

If the user was working anonymously and the handoff carries the anonymous identity, Cloud moves the designs created under that anonymous identity to the signed-in account.

### Which sources Cloud returns a token to

Cloud issues a token only to a source it trusts. A source must use https, name a host, and carry no port and no user information. Its host must then be one of three kinds:

| Source host | Accepted when |
| :--- | :--- |
| Cloud's own host | The source uses the same scheme as Cloud's configured base URL. |
| A custom domain of an organization | The domain is configured on a live organization and the source uses https. |
| A loopback host | The deployment runs in development mode. Outside development mode, loopback sources are refused. |

Every other source is refused with an error and no token is issued. That includes other schemes and any host that is not Cloud's own host or a configured organization domain. There is no built-in list of trusted hosts beyond these rules. If Cloud cannot complete the lookup of an organization's custom domain, it refuses the source rather than accepting it. Cloud never applies the live-session shortcut in step 2 to a source on its own host.

## What a Meshery Server gets from Cloud, by caller

Meshery Server requests the capabilities document with `GET /<meshery-version>/capabilities`, optionally adding `os` and `playground` query parameters. The older unversioned `/capabilities` path is deprecated. The document Cloud returns depends on who is asking:

| Caller | Capabilities returned |
| :--- | :--- |
| Anonymous, or no valid token | Default capabilities only. |
| Signed-in user | Account capabilities: overview, profile, and tokens. |
| Signed-in user with the Kanvas role | Account capabilities, plus the Kanvas extension capabilities and the latest Kanvas extension package version for the connecting Meshery version. |
| Provider Admin | Account capabilities, plus administrative capabilities (user management, statistics, and events) and the Kanvas extension capabilities. |
| Playground (`playground=true`) | Playground capabilities, added to the set the caller would otherwise receive. |

Every new user receives the Kanvas role when their account is created, so a typical signed-in user gets Kanvas in Meshery without any extra setup. A user without that role still signs in but does not receive the Kanvas extension from Cloud.

### The provider name

Meshery shows the provider's name in its interface. When Cloud resolves the caller's organization, the provider name is that organization's name, which is how branded organizations appear under their own name. Otherwise Meshery shows the default provider name.

## What Cloud stores and what stays with you

Cloud and your own deployment hold different things:

| Held by Layer5 Cloud | Held by your Meshery Server and clusters |
| :--- | :--- |
| User accounts, organizations, teams, workspaces, environments, and roles | The live state of each cluster, which MeshSync records in Meshery Server |
| Designs, their versions, and who each is shared with | The workloads and resources a deployed design produces |
| The catalog and the event log | The connections from Meshery Server to your Kubernetes clusters, through Meshery Operator, MeshSync, and Meshery Broker |
| Connection registrations, including each registered Meshery Server and its metadata | |

Meshery Server, not your browser, talks to your Kubernetes clusters, through the components it deploys into each one. Deploying, dry-running, and undeploying a design are operations Meshery Server performs against the contexts you select. When Meshery Server registers a Kubernetes connection with Cloud, Cloud records that connection and its credential.

Real-time collaboration is the one path from the browser straight to Cloud: Cloud hosts the signaling service that introduces collaborators, and edits then synchronize directly between their browsers. See [How Kanvas Works with Meshery and Layer5 Cloud](/pr-preview/pr-1329/kanvas/concepts/architecture/) for that path and for the full picture from the Kanvas side.

## Remote provider versus local provider

Meshery runs with either a remote provider or the local provider. In both cases, requests about your connected clusters and their resources stay within Meshery. The difference is what happens to provider-bound requests:

- **With Layer5 Cloud as a remote provider**, Meshery Server forwards provider-bound requests, such as designs, views, the catalog, sharing, and support, to Cloud and relays the answers back.
- **With the local provider**, there is no remote service behind Meshery, so every provider-bound feature returns HTTP 501 Not Implemented.

Choose a remote provider for any feature that depends on accounts, sharing, or stored designs.

## SaaS versus self-hosted

Layer5 Cloud runs as a hosted service and as a self-hosted deployment, and both act as a remote provider in the same way. The trusted-source rules above are relative to each deployment: a self-hosted Cloud trusts its own configured base URL and the custom domains of its own organizations, not those of the hosted service. To run your own deployment, see [Self-Hosted](/pr-preview/pr-1329/cloud/guides/self-hosted/).

