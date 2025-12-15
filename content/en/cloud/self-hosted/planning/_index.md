---
title: Planning

## Provider Configuration Planning

When planning your self-hosted Layer5 Cloud deployment, consider how you will initialize and configure your provider instance. The `INIT_CONFIG` environment variable enables you to automate provider configuration during deployment.

### Configuration Strategy

Before deploying, plan your configuration approach:

1. **Provider Identity**: Define your provider name and identification
2. **Initial Settings**: Determine which settings need to be configured at startup
3. **Configuration Management**: Decide how configuration will be managed (environment variables, secrets, config files)
4. **Update Strategy**: Plan for configuration updates and changes over time

### Using INIT_CONFIG for Automated Setup

The `INIT_CONFIG` environment variable allows you to pre-configure your provider during deployment, eliminating manual setup steps. This is particularly valuable for:

- **Reproducible Deployments**: Ensure consistent configuration across environments
- **CI/CD Integration**: Automate deployments with predefined configurations
- **Infrastructure as Code**: Manage provider configuration alongside your infrastructure

For detailed usage and examples, see the [Deployment Guide](/cloud/self-hosted/deployment/#init_config).

{{< alert type="warning" title="Important" >}}
Plan your INIT_CONFIG carefully as it is only processed during initial startup. Changes require redeployment or manual configuration updates.
{{< /alert >}} Layer5 Cloud Deployment
description: "Understand deployment prerequisites and prepare your environment for a secure and scalable Layer5 Cloud deployment."
categories: [Self-Hosted]
#tags: [helm]
weight: 1
---

### Considerations of Air-Gapped Deployments

Layer5 acknowledges the importance of air-gapped deployments and ensures content support for such environments. Content registered should be available even in the absence of internet connectivity, thus aligning with Layer5's commitment to versatile deployment scenarios.
