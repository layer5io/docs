# Self-Hosted

> Keep your Kanvas designs internal to your workplace. Get remote support from Layer5 when you need it.



## On-premises Deployment of Layer5 Cloud

A self-hosted deployment runs the same Layer5 Cloud that Layer5 operates, on infrastructure you control. Your users sign in against your identity services, your organizations and designs live in your database, and Meshery Servers in your network connect to your deployment as their [remote provider](https://docs.meshery.io/extensibility/providers).

One Helm chart, `layer5-cloud`, installs the application and its two identity services. You supply the database, the ingress, and the TLS certificate.

| Component | Provided by | What it does |
| --- | --- | --- |
| Layer5 Cloud server | `layer5-cloud` chart | Serves the web UI and the API, enforces organizations, teams, roles, and keys, and runs the signaling endpoint for real-time co-editing. Listens on port 9876. |
| Kratos | Subchart | Owns accounts: password sign-in, social sign-in, email verification, and account recovery. |
| Hydra | Subchart | Issues OAuth2 tokens to the UI, to Meshery Servers, and to API clients. |
| PostgreSQL | You | Holds three databases on one server: `meshery`, `kratos`, and `hydra`. |
| Ingress controller and TLS | You | Publishes one hostname. Routes `/` to the server, `/kratos` to Kratos, `/hydra` to Hydra, and passes WebSocket upgrades on `/collaboration`. |
| SMTP relay | You | Sends invitations, notifications, and identity mail (verification and recovery). |
| Webhook receivers | You | Optional endpoints that receive support requests, signup decisions, and Kanvas entitlement events. |

Meshery Server is deployed separately and is not part of this chart. See [Meshery Server registration](/pr-preview/pr-1210/cloud/concepts/meshery-server-registration/).

| Area | On your deployment |
| --- | --- |
| Provider administration | Your operators hold the Provider Admin role. They create the first organization, assign custom roles, and approve signup requests. See [Default Permissions](/pr-preview/pr-1210/cloud/reference/default-permissions/). |
| Default sign-in providers | You register the Google and GitHub OAuth applications that every organization without its own credentials uses. See [Identity Services](/pr-preview/pr-1210/cloud/guides/self-hosted/planning/identity-services/). |
| Mail | The shared relay is yours. Organizations can still register their own. See [Email / SMTP Troubleshooting](/pr-preview/pr-1210/cloud/guides/self-hosted/operating/smtp/). |
| Branding and domains | Organizations apply their own theme and domain; you set the provider-level defaults. See [White-labeling](/pr-preview/pr-1210/cloud/guides/self-hosted/white-labeling/). |
| Upgrades | You choose when to upgrade. The server applies database migrations at startup. |
| GitHub | You register your own GitHub App. See [Self-hosted GitHub App requirements](/pr-preview/pr-1210/cloud/getting-started/github-integration/#self-hosted-github-app-requirements). |

## Considerations of Self-Hosted Deployments

1. **[Planning](/pr-preview/pr-1210/cloud/guides/self-hosted/planning/).** Decide on the database, hostname, identity providers, mail relay, provider administrator, and network paths.
2. **[Deploying Layer5 Cloud](/pr-preview/pr-1210/cloud/guides/self-hosted/deployment/).** Install with Helm, create the Hydra client, and confirm the deployment is ready.
3. **Configure.** Set [chart values](/pr-preview/pr-1210/cloud/guides/self-hosted/deployment/helm-chart-values/), [provider initialization](/pr-preview/pr-1210/cloud/guides/self-hosted/deployment/#provider-initialization), and [webhooks](/pr-preview/pr-1210/cloud/guides/self-hosted/customizing-webhooks/).
4. **Operate.** Watch [health and logs](/pr-preview/pr-1210/cloud/guides/self-hosted/planning/monitoring/) and diagnose [mail delivery](/pr-preview/pr-1210/cloud/guides/self-hosted/operating/smtp/).

Real-time co-editing has one network dependency outside your cluster: browsers must reach public STUN and TURN hosts to connect to each other. See [Networking](/pr-preview/pr-1210/cloud/guides/self-hosted/planning/peer-to-peer-communication/) before you deploy into a restricted network. A self-hosted provider is its own signaling host. Users connected to your deployment never signal through Layer5's hosted service.

For help with a deployment, see [Support](/pr-preview/pr-1210/cloud/getting-started/support/).

