# Customizing Layer5 Cloud Deployment with Helm


> Layer5's Helm charts support a number of configuration options. Please refer to following table of configuration options.


## Requirements

The `layer5-cloud` chart installs the Layer5 Cloud server and, as subcharts, Kratos and Hydra. The defaults below are those of chart version 0.2.0, which ships with Layer5 Cloud v1.0.278. Run `helm show values layer5/layer5-cloud` to print the defaults of the version you install. For the install procedure, see [Deploying Layer5 Cloud](/pr-preview/pr-1362/cloud/guides/self-hosted/deployment/).

## Values

The chart writes `env.*` values into one ConfigMap and one Secret, and the server pod reads both as environment variables. Sensitive values go to the Secret. Any change to either rolls the server pods.

| Where it lands | Values |
| --- | --- |
| Secret | `env.githubappkeypath` (the key file content), `env.githubAppClientSecret`, `env.stripeWebhookSecret`, `env.githubWebhookSecret`, `env.kratosWebhookApiKey`, `env.cloudCredentialEncryptionKey`, `env.cloudOidcStateHmacKey`, `env.providerOrgGithubSecret`, `env.providerOrgGoogleSecret`, and all four `smtp.*` values |
| ConfigMap | Every other `env.*` value |

Both the Secret and the Helm release still hold your values in plaintext.

### Workload

| Key | Default | Meaning |
| --- | --- | --- |
| `replicaCount` | `1` | Server replicas. Ignored when autoscaling is on. |
| `image.repository` | `layer5/meshery-cloud` | Server image. |
| `image.tag` | `latest` | Image tag. Pin it to a release. When empty, the chart uses its own `appVersion`. |
| `image.pullPolicy` | `Always` | Image pull policy. |
| `resources.requests` | `256Mi` memory, `250m` CPU | Requested resources. |
| `resources.limits` | `{}` | No limits by default. |
| `autoscaling.enabled` | `false` | Enables a HorizontalPodAutoscaler. |
| `autoscaling.minReplicas`, `.maxReplicas` | `1`, `100` | Autoscaler bounds. |
| `autoscaling.targetCPUUtilizationPercentage` | `80` | Autoscaler target. |
| `serviceAccount.name` | `meshery-cloud` | Service account. |
| `fullnameOverride` | `meshery-cloud` | The Deployment, Service, ConfigMap, and Secret derive their names from this. |

The container has a liveness probe on `/healthz` and readiness and startup probes on `/readyz`.

### Networking

| Key | Default | Meaning |
| --- | --- | --- |
| `service.type` | `ClusterIP` | Service type. |
| `service.port` | `9876` | Service port for the server. |
| `service.hydraAdminProxyPort` | `9879` | Port of the internal proxy that sits between Kratos and the Hydra admin API. Set `0` to turn the proxy off. |
| `ingress.enabled` | `true` | Creates the Ingress. |
| `ingress.className` | `nginx` | Ingress class. |
| `ingress.hosts` | One empty host routing `/` to port 9876 | You must set the host. Add `/kratos` and `/hydra` paths. |
| `ingress.tls` | `[]` | TLS secret and hosts. The chart does not create certificates. |

### Server settings (`env`)

| Key | Default | Meaning |
| --- | --- | --- |
| `proto` | `""` | `http` or `https`. Used to build redirects to organization custom domains. Set `https` on a TLS deployment. |
| `serverbaseurl` | `http://localhost:9876` | Public base URL. Also the base of the OAuth2 callback `<serverbaseurl>/callback`. |
| `serverHost` | `localhost` | Public hostname. |
| `port` | `9876` | Port the server listens on. |
| `environment` | `cloud` | `development` connects to a local database at `127.0.0.1:5432`, tolerates a failed migration, logs rendered email bodies, and skips reCAPTCHA. Use any other value in production. |
| `debug` | `"false"` | Sets the `DEBUG` variable. |
| `loglevel` | `4` | Log level: `4` info, `5` debug, `6` trace. Not in the default values; the server uses `4` when unset. |
| `db`, `hydradb`, `kratosdb` | In-cluster PostgreSQL URLs with `sslmode=disable` | Connection strings. Change the user, password, host, and `sslmode`. |
| `minmesheryversion` | `v1.0.55` | Lowest Meshery Server version that can complete sign-in. |
| `initConfig` | `""` | Provider initialization document. See [Provider initialization](/pr-preview/pr-1362/cloud/guides/self-hosted/deployment/#provider-initialization). |
| `otelConfig` | `""` | OpenTelemetry tracing configuration. See [Monitoring](/pr-preview/pr-1362/cloud/guides/self-hosted/planning/monitoring/). |
| `anonymousUserSessionsEnabled` | `false` | Lets the deployment serve guest sessions. Leave off unless you operate that flow. |
| `ghtoken` | `""` | GitHub token the server uses to dispatch workflows. |
| `githubappid` | not set | GitHub App identifier for the GitHub integration. |
| `githubappkeypath` | `key.pem` | Path of the GitHub App private key file inside the chart. |
| `githubAppClientId`, `githubAppClientSecret` | `""` | OAuth client ID and a client secret from the settings page of the GitHub App that `githubappid` names. Layer5 Cloud v1.0.287 and later uses them to confirm which installations of the App the authorizing GitHub account can access. When either is empty, the server logs a warning at startup and no GitHub connection can be created or re-authorized. The App must also meet the [Self-hosted GitHub App requirements](/pr-preview/pr-1362/cloud/getting-started/github-integration/#self-hosted-github-app-requirements). |
| `stripeSecretKey`, `stripePublicKey` | not set | Stripe keys for payment processing. |
| `recaptchaSiteKey`, `recaptchaSecretKey` | not set | Google reCAPTCHA keys. Signup verification runs only when both are set. Organizations on a custom domain with a different registrable domain are exempt. |
| `kratospublic` | none, required | In-cluster address of the Kratos public service. The chart fails to render without it. |
| `kratosadmin` | not set | In-cluster address of the Kratos admin service. |
| `kratosbrowser` | not set | Address browsers use for Kratos, such as `https://cloud.example.com/kratos`. |
| `hydrapublic` | `http://hydra-public:4444` | Address of Hydra's public API. The default name does not match the subchart service. |
| `hydrabrowser` | not set | Address browsers use for Hydra. |
| `hydraadmin` | `http://hydra-admin:4445` | Address of Hydra's admin API. The default name does not match the subchart service. |
| `oauthclientid` | `meshery-cloud` | Id of the Hydra OAuth2 client the server uses. |
| `oauthsecret` | `secret1234567890` | Secret of that client. Replace it. |
| `kratosWebhookApiKey` | `""` | Key Kratos sends as `X-API-Key` on registration hooks. When empty, the server accepts the placeholder `dev_token`. |
| `providerOrgGithubKey`, `providerOrgGithubSecret` | `""` | Client id and secret of the default GitHub OAuth application. |
| `providerOrgGoogleKey`, `providerOrgGoogleSecret` | `""` | Client id and secret of the default Google OAuth application. |
| `cloudCredentialEncryptionKey` | not set | Base64 of 32 bytes. Encrypts stored credentials. When empty, encrypting or decrypting a credential fails. |
| `cloudOidcStateHmacKey` | not set | Base64 of 32 bytes. Signs brokered social sign-in. When empty, brokered sign-in fails. |
| `webhookHelpAndSupport` | not set | URL that receives support requests. |
| `webhookKanvasEntitlement` | not set | URL that receives Kanvas entitlement events. |
| `webhookSignupRequest` | not set | URL that receives signup decisions. |

### Mail (`smtp`)

| Key | Default | Meaning |
| --- | --- | --- |
| `smtp.smtphost` | `""` | Relay host. Must resolve to a public address. |
| `smtp.smtpport` | `""` | `25`, `465`, `587`, or `2525`. Port `465` uses implicit TLS; the others require STARTTLS. |
| `smtp.smtpusername` | `""` | Mailbox login. Must be a full email address, because it becomes the `From` address. |
| `smtp.smtppassword` | `""` | Mailbox password. |

Set all four or none. A partial configuration stops the server at startup. See [Email / SMTP Troubleshooting](/pr-preview/pr-1362/cloud/guides/self-hosted/operating/smtp/).

### Kratos (`kratos`)

The `kratos.kratos.config` tree is passed to Kratos unchanged. The values you must change for a real deployment:

| Key | Default | Change to |
| --- | --- | --- |
| `kratos.enabled` | `true` | Keep `true` unless you bring your own Kratos. |
| `kratos.service.public.port`, `.admin.port` | `9010`, `9011` | Public and admin ports. |
| `kratos.kratos.config.dsn` | In-cluster URL for the `kratos` database | Your connection string. |
| `kratos.kratos.config.secrets.cookie`, `.cipher` | `[""]` | Long random strings. |
| `kratos.kratos.config.serve.public.base_url` | `http://localhost:9010/` | `https://<host>/kratos`. |
| `kratos.kratos.config.selfservice.flows.registration.after.*.hooks` | `web_hook` to `http://localhost:9876/identity/users` | `https://<host>/api/identity/users` and your `kratosWebhookApiKey`. |
| `kratos.kratos.config.selfservice.methods.oidc.config.providers` | GitHub and Google with empty credentials | Your `client_id` and `client_secret`. |
| `kratos.kratos.config.courier` | SMTP courier, empty connection string | Your courier. |

Password sign-in is on with a minimum length of 8. Login flows last `720m`, registration `24h`, recovery and verification `720h`. A list in a values file replaces the chart's list as a whole.

### Hydra (`hydra`)

| Key | Default | Change to |
| --- | --- | --- |
| `hydraPrefix` | `cloud-hydra` | Services become `<prefix>-public` and `<prefix>-admin`. |
| `hydra.hydra.config.dsn` | In-cluster URL for the `hydra` database | Your connection string. |
| `hydra.hydra.config.secrets.system` | `[""]` | A long random string. |
| `hydra.hydra.config.urls.self.public`, `.self.issuer` | `https://public.hydra.localhost/hydra/` | `https://<host>/hydra/`. |
| `hydra.hydra.dangerousForceHttp` | `true` | `false` once Hydra is reached over TLS. |
| `hydra.hydra.config.strategies.access_token` | `jwt` | Keep `jwt`. |
| `hydra.hydra.config.ttl.access_token`, `.refresh_token`, `.id_token`, `.auth_code` | `24h`, `1000h`, `1h`, `1h` | Token lifetimes. |

