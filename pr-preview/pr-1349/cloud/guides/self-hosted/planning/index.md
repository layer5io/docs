# Plan a Deployment

> Make the decisions a Layer5 Cloud deployment needs before you install it: database, hostname and TLS, secrets, identity providers, mail, the first administrator, and network paths.



Layer5 Cloud starts with unsafe placeholder values for every secret and with `localhost` for every URL. Settle the decisions below first, so the install is a single `helm install` with a complete values file.

## Decisions to make

| Decision | What to settle | Where it is configured |
| --- | --- | --- |
| Database | A PostgreSQL server that hosts three databases: `meshery`, `kratos`, and `hydra`. | `env.db`, `env.kratosdb`, `env.hydradb`, and the subchart `dsn` values |
| Hostname and TLS | One public hostname, a certificate for it, and the scheme (`https`). | `ingress.*`, `env.serverbaseurl`, `env.serverHost`, `env.proto` |
| Secrets | Replace every placeholder before first start. See [Secrets to generate](#secrets-to-generate). | `env.*`, `kratos.*`, `hydra.*` |
| Identity providers | The Google and GitHub OAuth applications that act as the default sign-in providers. See [Identity Services](/pr-preview/pr-1349/cloud/guides/self-hosted/planning/identity-services/). | `env.providerOrg*` |
| Mail | A relay on a public address that offers STARTTLS (or implicit TLS on 465), and how identity mail leaves. See [Mail](#mail). | `smtp.*`, Kratos courier values |
| First administrator | The Provider Admin account and the provider organization. See [Provider initialization](/pr-preview/pr-1349/cloud/guides/self-hosted/deployment/provider-initialization/). | `env.initConfig` |
| Network paths | What must be reachable between components and from users. See [Networking](/pr-preview/pr-1349/cloud/guides/self-hosted/planning/peer-to-peer-communication/). | Ingress, network policy, egress rules |
| Observability | Where logs and traces go. See [Monitoring](/pr-preview/pr-1349/cloud/guides/self-hosted/planning/monitoring/). | `env.loglevel`, `env.otelConfig` |

## Database

Layer5 Cloud creates and migrates its own schema. The server applies migrations every time it starts, and exits if a migration fails, so give the database user the rights to create tables and the `uuid-ossp` extension in the `public` schema of the `meshery` database. Kratos and Hydra run their own migrations when the chart's `automigration` setting is on, which is the default.

The chart does not install a database. Size it for your user count and design volume. Run PostgreSQL with persistent storage that survives pod rescheduling, and back it up: organizations, designs, credentials, and identities all live in it.

## Hostname and TLS

Users, Meshery Servers, and API clients reach everything through one hostname. The ingress must route three paths:

| Path | Backend | Notes |
| --- | --- | --- |
| `/` | Layer5 Cloud server, port 9876 | The chart's default ingress route. |
| `/kratos` | Kratos public service, port 9010 | Browsers load sign-in and account flows from here. Strip the prefix when your controller supports it. |
| `/hydra` | Hydra public service | Browsers use this for the OAuth2 sign-in redirect. |

Pass WebSocket upgrades on `/collaboration`. Set the same public URL in `env.serverbaseurl`, `env.kratosbrowser`, `env.hydrabrowser`, and the Kratos and Hydra `urls` values, or sign-in redirects point at the wrong host. On a TLS deployment, set `env.proto` to `https`: the server builds redirects to organization custom domains from that value and uses `http` for anything else.

The chart does not create or request a certificate. Terminate TLS at the ingress with a secret or a certificate manager of your choice.

## Secrets to generate

Generate each value once, store it in your secret manager, and pass it to Helm. A change to a value that the chart writes into the Layer5 Cloud ConfigMap or Secret rolls the server pods.

| Value | Purpose | Notes |
| --- | --- | --- |
| `env.oauthsecret` | Secret of the OAuth2 client that Layer5 Cloud uses against Hydra. | Must match the Hydra client you create. The default is a public placeholder. |
| `env.cloudCredentialEncryptionKey` | Encrypts stored identity-provider and mail credentials. | Base64 of 32 random bytes. When empty, credential encryption fails. Losing it makes stored credentials unreadable. |
| `env.cloudOidcStateHmacKey` | Signs the state of the brokered OIDC sign-in. | Base64 of 32 random bytes. When empty, brokered sign-in fails. |
| `env.kratosWebhookApiKey` | Shared key Kratos presents when it calls the registration hooks. | Must equal the `value` in the Kratos registration `web_hook` configuration. The shipped default is the placeholder `dev_token` on both sides. |
| `kratos.kratos.config.secrets.cookie` and `.cipher` | Kratos session cookie and data encryption. | Long random strings. The shipped value is empty. |
| `hydra.hydra.config.secrets.system` | Hydra system secret. | Long random string. The shipped value is empty. |
| `env.providerOrgGithubSecret`, `env.providerOrgGoogleSecret` | Client secrets of the default OAuth applications. | See [Identity Services](/pr-preview/pr-1349/cloud/guides/self-hosted/planning/identity-services/). |
| `smtp.smtppassword` | Password of the shared mail relay. | Stored in a Kubernetes Secret, but also visible in the release's stored Helm values. |

Generate a 32-byte key with `openssl rand -base64 32`. The server logs an error at startup when the credential encryption key is not a valid key, and keeps running without it.

## Mail

Two kinds of mail leave a deployment, and they take different paths.

- **Application mail** (invitations, notifications, welcome mail) is sent by the Layer5 Cloud server through the shared relay in `smtp.*`, unless an organization has registered its own relay.
- **Identity mail** (email verification and account recovery) is sent by Kratos through its courier. The chart ships the SMTP courier with an empty connection string, so set `kratos.kratos.config.courier.smtp.connection_uri`, or switch the courier to the HTTP strategy that posts to `/api/identity/flow/emails` on Layer5 Cloud.

The HTTP strategy renders each message with the signup organization's branding and rewrites the link onto its custom domain, and sends it as application mail. It has no SMTP fallback: when Layer5 Cloud rejects a message, Kratos retries and then abandons it without a visible error. Choose it when you use custom domains; choose the SMTP courier when you want identity mail independent of the application.

The shared relay is screened at startup. A relay on a non-submission port, an internal address, or without STARTTLS stops the server. See [Troubleshoot Email Delivery](/pr-preview/pr-1349/cloud/guides/self-hosted/operating/smtp/).

## Outbound dependencies

| Destination | Used for | Required |
| --- | --- | --- |
| Your SMTP relay | All mail | For any mail |
| Google and GitHub | Social sign-in, when you register OAuth applications | Only if you offer social sign-in |
| reCAPTCHA | Signup verification when you set both reCAPTCHA keys | Only when configured |
| Your webhook receivers | Support requests, signup decisions, Kanvas entitlement events | Only when configured |
| OpenTelemetry collector | Traces | Only when `env.otelConfig` is set |
| Public STUN and TURN hosts (from browsers) | Direct co-editing between browsers | For real-time collaboration |

## Next step

[Deploy Layer5 Cloud](/pr-preview/pr-1349/cloud/guides/self-hosted/deployment/) with the decisions above written into a values file.

