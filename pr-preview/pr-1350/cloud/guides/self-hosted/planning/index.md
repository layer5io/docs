# Planning

> Plan your self-hosted Layer5 Cloud deployment


## Provider Configuration Planning

When planning your self-hosted Layer5 Cloud deployment, consider how you will initialize and configure your provider instance. The `INIT_CONFIG` environment variable enables you to automate provider configuration during deployment.

### Configuration Strategy

Before deploying, plan your configuration approach:

1. **Provider Identity**: Define your provider name and identification
2. **Initial Settings**: Determine which settings need to be configured at startup
3. **Configuration Management**: Decide how configuration will be managed (environment variables, secrets, config files)
4. **Update Strategy**: Plan for configuration updates and changes over time

### Provider Admin Organization Initialization

The Provider Admin organization is a special organization identified by the hardcoded UUID `11111111-1111-1111-1111-111111111111`. It represents the root administrative organization for the cloud platform.

#### Configuration Format

The `INIT_CONFIG` environment variable accepts a YAML configuration with the following structure:

```yaml
organization:
  name: "Layer5"
  description: "The uber organization for all things Layer5."
  country: "United States"
  region: "North America"

user:
  first_name: "Admin"
  last_name: "User"
  email: "admin@layer5.io"
  username: "admin@layer5.io"  # Optional, defaults to email if not provided
  password: "change-me-on-first-login"  # Required
```

#### Setting the Environment Variable

To enable Provider Admin organization initialization, set the `INIT_CONFIG` environment variable with the entire YAML configuration as its value:

```bash
INIT_CONFIG='organization:
  name: "Layer5"
  description: "The uber organization for all things Layer5."
  country: "United States"
  region: "North America"

user:
  first_name: "Admin"
  last_name: "User"
  email: "admin@layer5.io"
  username: "admin@layer5.io"
  password: "change-me-on-first-login"'
```

#### Required and Optional Fields

**Organization:**
- `name`: Name of the provider organization (required)
- `description`: Description of the organization (optional)
- `country`: Country where the organization is located (optional)
- `region`: Region where the organization is located (optional)

**User:**
- `first_name`: First name of the provider admin user (required)
- `last_name`: Last name of the provider admin user (required)
- `email`: Email address of the provider admin user (required)
- `username`: Username for the provider admin user (optional, defaults to email)
- `password`: Password for the provider admin user (required)

#### Initialization Process

When the server starts and `INIT_CONFIG` is set:

1. The YAML configuration is parsed and validated
2. The system checks if the provider organization already exists (by UUID `11111111-1111-1111-1111-111111111111`)
3. If the organization exists, initialization is skipped
4. If the organization does not exist:
   - Kratos identity is created with password credentials for authentication
   - Provider admin user is created
   - The Provider Admin role and the Kanvas role are assigned to the user
   - Provider organization is created with the hardcoded UUID
   - User is added to the provider organization with organization admin role

#### Idempotency

The initialization process is idempotent:
- Running the server multiple times with the same configuration will not create duplicate organizations
- If the provider organization already exists, the initialization is skipped
- No errors are thrown if the organization already exists

#### Error Handling

If initialization fails:
- The server logs the error and keeps starting
- The steps are not wrapped in one transaction, so rows from earlier steps remain
- A restart repeats the whole sequence for as long as the provider organization does not exist
- After the provider organization exists, a change to `INIT_CONFIG` is ignored

### Deployment Options

You can set the `INIT_CONFIG` environment variable using several methods:

**Option A (Helm with inline values)**: Include `initConfig` in the Helm `values.yaml` file with the YAML configuration as a multiline string

**Option B (Helm with --set-file flag)**: Use `--set-file` to load configuration from a separate file:
```bash
helm install layer5-cloud layer5/layer5-cloud \
  --namespace layer5-cloud \
  --set-file env.initConfig=./provider-init.yaml
```

**Option C (Direct environment variable)**: Set the `INIT_CONFIG` environment variable with the YAML content as a string

### Using INIT_CONFIG for Automated Setup

The `INIT_CONFIG` environment variable allows you to pre-configure your provider during deployment, eliminating manual setup steps. This is particularly valuable for:

- **Reproducible Deployments**: Ensure consistent configuration across environments
- **CI/CD Integration**: Automate deployments with predefined configurations
- **Infrastructure as Code**: Manage provider configuration alongside your infrastructure

For detailed configuration options, see the configuration schema below.







<div class="alert alert-custom" style="border-color: #EBC017;" role="alert">
  <h4 class="alert-heading" style="color: #EBC017;">Important</h4>
  
      <code>INIT_CONFIG</code> creates the provider organization only when that organization does not exist yet. After the first successful start, changing or removing it has no effect. Change the administrator through the product. The full field list, failure modes, and password handling are in <a href="/pr-preview/pr-1350/cloud/guides/self-hosted/deployment/#provider-initialization">Provider initialization</a>.
  
</div>



### Considerations of Air-Gapped Deployments

Real-time co-editing needs browsers to reach public STUN and TURN hosts. Those hosts are set by the Kanvas client and are not configurable in the deployment. A network that blocks them keeps single-user editing and still cannot connect collaborators. See [Networking](/pr-preview/pr-1350/cloud/guides/self-hosted/planning/peer-to-peer-communication/). Social sign-in also needs outbound access to Google or GitHub when you offer it. Mail needs a relay on a public address.

### Monitoring Considerations

Plan for comprehensive observability across your Layer5 Cloud deployment, including metrics, logs, tracing, dashboards, and alerting. Establish SLOs for latency, availability, and saturation; size telemetry storage appropriately; and ensure privacy and access controls for operational data.

See: [Monitoring](/pr-preview/pr-1350/cloud/guides/self-hosted/planning/monitoring/)

## Decisions to make before install

Layer5 Cloud starts with unsafe placeholder values for every secret and with `localhost` for every URL. Settle these before the first `helm install`.

| Decision | What to settle | Where it is configured |
| --- | --- | --- |
| Database | A PostgreSQL server that hosts `meshery`, `kratos`, and `hydra`. The chart does not install a database. | `env.db`, `env.kratosdb`, `env.hydradb`, and the subchart `dsn` values |
| Hostname and TLS | One public hostname, a certificate for it, and `https`. The chart does not create a certificate. | `ingress.*`, `env.serverbaseurl`, `env.serverHost`, `env.proto` |
| Secrets | Replace every placeholder. A 32-byte key is `openssl rand -base64 32`. | `env.oauthsecret`, `env.cloudCredentialEncryptionKey`, `env.cloudOidcStateHmacKey`, `env.kratosWebhookApiKey`, Kratos and Hydra secrets |
| Identity providers | The Google and GitHub OAuth applications used as defaults. | `env.providerOrg*` and the Kratos OIDC providers |
| Mail | A relay on a public address that offers STARTTLS, or implicit TLS on 465. | `smtp.*` and the Kratos courier |
| First administrator | The Provider Admin account. | `env.initConfig` |
| Network paths | What must be reachable, including WebSocket upgrades on `/collaboration`. | Ingress and egress rules |

The server applies migrations every time it starts and exits if a migration fails. Give the database user rights to create tables and the `uuid-ossp` extension in the `public` schema of the `meshery` database.

On a TLS deployment, set `env.proto` to `https`. The server builds redirects to organization custom domains from that value and uses `http` for anything else.

Application mail (invitations, notifications, welcome mail) leaves through `smtp.*` unless an organization has registered its own relay. Identity mail (verification and recovery) leaves through the Kratos courier. The HTTP courier posts to `/api/identity/flow/emails` and has no SMTP fallback. See [Email / SMTP Troubleshooting](/pr-preview/pr-1350/cloud/guides/self-hosted/operating/smtp/).

