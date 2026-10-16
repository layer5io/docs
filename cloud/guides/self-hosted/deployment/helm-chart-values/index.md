# Helm Chart Values


> Reference for the layer5-cloud Helm chart: every value you set, its default, what it controls, and whether it lands in a ConfigMap or a Secret.



The `layer5-cloud` chart installs the Layer5 Cloud server and, as subcharts from the Ory repository, Kratos and Hydra. The defaults below are those of chart version 0.2.0, which ships with Layer5 Cloud v1.0.278. Run `helm show values layer5/layer5-cloud` to print the defaults of the version you install. For the install procedure, see [Deploy Layer5 Cloud](/cloud/guides/self-hosted/deployment/).

## How values reach the server

The chart writes `env.*` values into one ConfigMap and one Secret, and the server pod reads both as environment variables. Sensitive values go to the Secret. Any change to either rolls the server pods, because the pod template carries a checksum of both.

| Where it lands | Values |
| --- | --- |
| Secret | `env.githubappkeypath` (the key file content), `env.stripeWebhookSecret`, `env.githubWebhookSecret`, `env.kratosWebhookApiKey`, `env.cloudCredentialEncryptionKey`, `env.cloudOidcStateHmacKey`, `env.providerOrgGithubSecret`, `env.providerOrgGoogleSecret`, and all four `smtp.*` values |
| ConfigMap | Every other `env.*` value |

Both the Secret and the Helm release still hold your values in plaintext, so protect the release history and your values file.

## Workload

| Key | Default | Meaning |
| --- | --- | --- |
| `replicaCount` | `1` | Server replicas. Ignored when autoscaling is on. |
| `image.repository` | `layer5/meshery-cloud` | Server image. |
| `image.tag` | `latest` | Image tag. Pin it to a release such as `v1.0.278`. When empty, the chart uses its own `appVersion`. |
| `image.pullPolicy` | `Always` | Image pull policy. |
| `imagePullSecrets` | `[]` | Pull secrets for a private registry. |
| `updateStrategy` | RollingUpdate, 25% unavailable, 25% surge | Deployment update strategy. |
| `resources.requests` | `256Mi` memory, `250m` CPU | Requested resources. |
| `resources.limits` | `{}` | No limits by default. |
| `autoscaling.enabled` | `false` | Enables a HorizontalPodAutoscaler. |
| `autoscaling.minReplicas`, `.maxReplicas` | `1`, `100` | Autoscaler bounds. |
| `autoscaling.targetCPUUtilizationPercentage` | `80` | Autoscaler target. |
| `nodeSelector`, `tolerations`, `affinity` | `{}`, `[]`, `{}` | Pod scheduling. |
| `podAnnotations`, `podSecurityContext`, `securityContext` | `{}` | Pod and container settings. |
| `serviceAccount.create`, `.name`, `.annotations` | `true`, `meshery-cloud`, `{}` | Service account. |
| `nameOverride`, `fullnameOverride` | `""`, `meshery-cloud` | Resource naming. The Deployment, Service, ConfigMap, and Secret derive their names from `fullnameOverride`. |

The container has a liveness probe on `/healthz` and readiness and startup probes on `/readyz`. See [Monitoring](/cloud/guides/self-hosted/planning/monitoring/).

## Networking

| Key | Default | Meaning |
| --- | --- | --- |
| `service.type` | `ClusterIP` | Service type. |
| `service.port` | `9876` | Service port for the server. |
| `service.hydraAdminProxyPort` | `9879` | Port of the internal proxy that sits between Kratos and the Hydra admin API. Set `0` to turn the proxy off. |
| `ingress.enabled` | `true` | Creates the Ingress. |
| `ingress.className` | `nginx` | Ingress class. |
| `ingress.annotations` | `{}` | Controller annotations. |
| `ingress.hosts` | One empty host routing `/` to port 9876 | Hosts and paths. You must set the host. Add `/kratos` and `/hydra` paths for the identity services. |
| `ingress.tls` | `[]` | TLS secret and hosts. The chart does not create certificates. |

## Server settings (`env`)

| Key | Default | Meaning |
| --- | --- | --- |
| `proto` | `""` | `http` or `https`. Used to build redirects to organization custom domains. Set `https` on a TLS deployment. |
| `serverbaseurl` | `http://localhost:9876` | Public base URL of the deployment. Also the base of the OAuth2 callback `<serverbaseurl>/callback`. |
| `serverHost` | `localhost` | Public hostname of the deployment. |
| `port` | `9876` | Port the server listens on. |
| `environment` | `cloud` | Deployment mode. `development` connects to a local database at `127.0.0.1:5432`, tolerates a failed migration, logs rendered email bodies, and skips reCAPTCHA. Use any other value in production. |
| `debug` | `"false"` | Sets the `DEBUG` variable. |
| `loglevel` | `4` | Log level: `4` info, `5` debug, `6` trace. Not in the default values; the server uses `4` when unset. |
| `db`, `hydradb`, `kratosdb` | In-cluster PostgreSQL URLs with `sslmode=disable` | Connection strings for the `meshery`, `hydra`, and `kratos` databases. Change the user, password, host, and `sslmode`. |
| `minmesheryversion` | `v1.0.55` | Lowest Meshery Server version that can complete sign-in. A connecting Meshery Server below it is shown a "Meshery Deployment Incompatible" error. |
| `initConfig` | `""` | Provider initialization document. See [Provider Initialization](/cloud/guides/self-hosted/deployment/provider-initialization/). |
| `otelConfig` | `""` | OpenTelemetry tracing configuration. See [Monitoring](/cloud/guides/self-hosted/planning/monitoring/#traces). |
| `anonymousUserSessionsEnabled` | `false` | Lets the deployment serve guest sessions, as used by kanvas.new. Leave off unless you operate that flow. |
| `ghtoken` | `""` | GitHub token the server uses to dispatch workflows. |
| `githubappid` | not set | GitHub App identifier for the GitHub integration. |
| `githubappkeypath` | `key.pem` | Path of the GitHub App private key file inside the chart. |
| `stripeSecretKey`, `stripePublicKey` | not set | Stripe keys for payment processing. |
| `recaptchaSiteKey`, `recaptchaSecretKey` | not set | Google reCAPTCHA keys. Signup verification runs only when both are set. Organizations on a custom domain with a different registrable domain are exempt. |

### Identity connections

| Key | Default | Meaning |
| --- | --- | --- |
| `kratospublic` | none, required | In-cluster address of the Kratos public service. The chart fails to render without it. May contain `{{ .Release.Namespace }}`. |
| `kratosadmin` | not set | In-cluster address of the Kratos admin service. |
| `kratosbrowser` | not set | Address browsers use for Kratos, such as `https://cloud.example.com/kratos`. |
| `hydrapublic` | `http://hydra-public:4444` | Address of Hydra's public API. |
| `hydrabrowser` | not set | Address browsers use for Hydra, such as `https://cloud.example.com/hydra`. |
| `hydraadmin` | `http://hydra-admin:4445` | Address of Hydra's admin API. |
| `hydrapublicinternal` | `""` | In-cluster address of Hydra's public API for calls the server makes to itself. Falls back to `hydrabrowser` when empty. May contain `{{ .Release.Namespace }}`. |
| `oauthclientid` | `meshery-cloud` | Id of the Hydra OAuth2 client the server uses. |
| `oauthsecret` | `secret1234567890` | Secret of that client. Replace it. |
| `kratosWebhookApiKey` | `""` | Key Kratos sends in the `X-API-Key` header on registration hooks. When empty, the server accepts the placeholder `dev_token`. Set it, and set the same value in the Kratos hooks. |
| `providerOrgGithubKey`, `providerOrgGithubSecret` | `""` | Client id and secret of the default GitHub OAuth application. |
| `providerOrgGoogleKey`, `providerOrgGoogleSecret` | `""` | Client id and secret of the default Google OAuth application. |

### Encryption keys

| Key | Default | Meaning |
| --- | --- | --- |
| `cloudCredentialEncryptionKey` | not set | Base64 of 32 bytes. Encrypts stored credentials. When empty, encrypting or decrypting a credential fails. |
| `cloudOidcStateHmacKey` | not set | Base64 of 32 bytes. Signs the state of brokered social sign-in. When empty, brokered sign-in fails. |
| `stripeWebhookSecret`, `githubWebhookSecret` | not set | Signing secrets for inbound payment and GitHub webhooks. When empty, those inbound webhooks are rejected. |

### Webhooks

| Key | Default | Meaning |
| --- | --- | --- |
| `webhookHelpAndSupport` | not set | URL that receives support requests. |
| `webhookKanvasEntitlement` | not set | URL that receives Kanvas entitlement events. |
| `webhookSignupRequest` | not set | URL that receives signup decisions. |

See [Customize Webhooks](/cloud/guides/self-hosted/customizing-webhooks/).

## Mail (`smtp`)

| Key | Default | Meaning |
| --- | --- | --- |
| `smtp.smtphost` | `""` | Relay host. Must resolve to a public address. |
| `smtp.smtpport` | `""` | `25`, `465`, `587`, or `2525`. Port `465` uses implicit TLS; the others require STARTTLS. |
| `smtp.smtpusername` | `""` | Mailbox login. Must be a full email address, because it becomes the `From` address. |
| `smtp.smtppassword` | `""` | Mailbox password. |

Set all four or none. A partial configuration stops the server at startup. See [Troubleshoot Email Delivery](/cloud/guides/self-hosted/operating/smtp/).

## Kratos (`kratos`)

The `kratos.kratos.config` tree is passed to Kratos unchanged. The [Kratos configuration reference](https://www.ory.sh/docs/kratos/reference/configuration) describes every field. The values you must change for a real deployment:

| Key | Default | Change to |
| --- | --- | --- |
| `kratos.enabled` | `true` | Keep `true` unless you bring your own Kratos. |
| `kratos.service.public.port`, `.admin.port` | `9010`, `9011` | Public and admin ports. |
| `kratos.kratos.config.dsn` | In-cluster URL for the `kratos` database | Your connection string. |
| `kratos.kratos.config.secrets.cookie`, `.cipher` | `[""]` | Long random strings. |
| `kratos.kratos.config.serve.public.base_url` | `http://localhost:9010/` | `https://<host>/kratos`. |
| `kratos.kratos.config.serve.public.cors.allowed_origins` | `http://localhost:9010/` | Your public origin. |
| `kratos.kratos.config.selfservice.default_browser_return_url`, `.allowed_return_urls` | `http://localhost:9876` | Your public URL. |
| `kratos.kratos.config.selfservice.flows.*.ui_url` | `http://localhost:9876/...` | Your public URL with the same paths. |
| `kratos.kratos.config.selfservice.flows.registration.after.*.hooks` | `web_hook` to `http://localhost:9876/identity/users`, key `dev_token` | `https://<host>/api/identity/users` and your `kratosWebhookApiKey`. |
| `kratos.kratos.config.selfservice.methods.oidc.config.providers` | GitHub and Google with empty credentials | Your `client_id` and `client_secret`. |
| `kratos.kratos.config.courier` | SMTP courier, empty connection string | Your courier. See [Plan a Deployment](/cloud/guides/self-hosted/planning/#mail). |

Other defaults you can change: password sign-in is on with a minimum length of 8, breached-password and similarity checks on; login flows last `720m`, registration `24h`, recovery and verification `720h`; verification and recovery use codes; `privileged_session_max_age` is `15m`; the log level is `debug`; automatic migration is on.

A list in a values file replaces the chart's list as a whole. Copy the full `providers` or `hooks` list before you edit it.

## Hydra (`hydra`)

The `hydra.hydra.config` tree is passed to Hydra unchanged. See the [Hydra configuration reference](https://www.ory.sh/docs/hydra/reference/configuration).

| Key | Default | Change to |
| --- | --- | --- |
| `hydraPrefix` | `cloud-hydra` | Name prefix of the Hydra resources. The services become `<prefix>-public` and `<prefix>-admin`. |
| `hydra.hydra.config.dsn` | In-cluster URL for the `hydra` database | Your connection string. |
| `hydra.hydra.config.secrets.system` | `[""]` | A long random string. |
| `hydra.hydra.config.urls.login`, `.consent`, `.error`, `.post_logout_redirect` | `https://public.hydra.localhost/...` | `https://<host>/login`, `/consent`, `/error`, and `/login`. |
| `hydra.hydra.config.urls.self.public`, `.self.issuer` | `https://public.hydra.localhost/hydra/` | `https://<host>/hydra/`. |
| `hydra.hydra.dangerousForceHttp` | `true` | `false` once Hydra is reached over TLS. |
| `hydra.hydra.config.strategies.access_token` | `jwt` | Keep `jwt`. |
| `hydra.hydra.config.ttl.access_token`, `.refresh_token`, `.id_token`, `.auth_code` | `24h`, `1000h`, `1h`, `1h` | Token lifetimes. |

Other defaults: automatic migration is on, the log level is `debug`, and the liveness and readiness probes use `/health/alive` and `/health/ready` on port 4444.

