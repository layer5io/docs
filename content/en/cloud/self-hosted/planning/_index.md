---
title: Planning
description: Plan your self-hosted Layer5 Cloud deployment
weight: 2
---

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
   - Admin and MeshMap roles are assigned to the user
   - Provider organization is created with the hardcoded UUID
   - User is added to the provider organization with organization admin role

#### Idempotency

The initialization process is idempotent:
- Running the server multiple times with the same configuration will not create duplicate organizations
- If the provider organization already exists, the initialization is skipped
- No errors are thrown if the organization already exists

#### Error Handling

If initialization fails:
- Errors are logged using MeshKit logger
- The server continues to start (non-fatal error)
- All database operations are wrapped in a transaction for atomicity
- If any step fails, all changes are rolled back

### Deployment Options

You can set the `INIT_CONFIG` environment variable using several methods:

**Option A (Helm with inline values)**: Include `initConfig` in the Helm `values.yaml` file with the YAML configuration as a multiline string

**Option B (Helm with --set-file flag)**: Use `--set-file` to load configuration from a separate file:
```bash
helm install meshery-cloud ./install/kubernetes/helm/layer5-cloud \
  --set-file env.initConfig=./config/provider-init.yaml.example
```

**Option C (Direct environment variable)**: Set the `INIT_CONFIG` environment variable with the YAML content as a string

### Using INIT_CONFIG for Automated Setup

The `INIT_CONFIG` environment variable allows you to pre-configure your provider during deployment, eliminating manual setup steps. This is particularly valuable for:

- **Reproducible Deployments**: Ensure consistent configuration across environments
- **CI/CD Integration**: Automate deployments with predefined configurations
- **Infrastructure as Code**: Manage provider configuration alongside your infrastructure

For detailed configuration options, see the configuration schema below.

{{< alert type="warning" title="Important" >}}
Plan your INIT_CONFIG carefully as it is only processed during initial startup. Changes require redeployment or manual configuration updates.
{{< /alert >}}
 Layer5 Cloud Deployment
description: "Understand deployment prerequisites and prepare your environment for a secure and scalable Layer5 Cloud deployment."
categories: [Self-Hosted]
#tags: [helm]
weight: 1
---

### Considerations of Air-Gapped Deployments

Layer5 acknowledges the importance of air-gapped deployments and ensures content support for such environments. Content registered should be available even in the absence of internet connectivity, thus aligning with Layer5's commitment to versatile deployment scenarios.

### Monitoring Considerations

Plan for comprehensive observability across your Layer5 Cloud deployment, including metrics, logs, tracing, dashboards, and alerting. Establish SLOs for latency, availability, and saturation; size telemetry storage appropriately; and ensure privacy and access controls for operational data.

See: [Monitoring](/cloud/self-hosted/planning/monitoring/)
