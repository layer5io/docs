---
title: Self-Hosted
weight: 10
categories: [Self-Hosted]
description: >
  Keep your Kanvas designs internal to your workplace. Get remote support from Layer5 when you need it.
---

<img class="image-right-no-shadow" src="images/self-hosted.svg" style="max-width:300px;" />

## On-premises Deployment of Layer5 Cloud

Layer5 Cloud is a collection of services that can be deployed on-premises. 

<br />
<br />
<br />

## Considerations of Self-Hosted Deployments

Layer5 Cloud uses webhooks to automate approval flows and email notifications. This guide will help you customize and add your own.

## Upgrading an Existing Layer5 Cloud Deployment

Layer5 Cloud supports in-place upgrades for environments that have already been deployed on-premises. Upgrades are performed to apply the latest features, performance improvements, and security patches while preserving existing configuration and workloads.

### Preparation

Before proceeding with an upgrade, review the following:
- Ensure that all current workloads are backed up.
- Review release notes for any breaking changes.
- Confirm that the current deployment version supports incremental upgrades. If not, a fresh deployment may be required.
- Validate connectivity to Layer5’s public Helm repository and GitHub Container Registry (GHCR).

### Upgrade Instructions

#### 1. Update Helm Repositories

```bash
helm repo update
```

#### 2. Fetch the Latest Chart Version

Ensure you're pulling the latest Layer5 Cloud Helm chart:

```bash
helm search repo layer5 -l
```

#### 3. Upgrade Your Release

Replace `<release-name>` with the name of your Helm release:

```bash
helm upgrade <release-name> layer5/layer5-cloud -f values.yaml
```

### Verifying the Upgrade

After the Helm upgrade completes:

- Run the following command to confirm that all pods are running the latest versions:

```bash
kubectl get pods -n <namespace>
```

- Check logs for any errors using:

```bash
kubectl logs <pod-name> -n <namespace>
```

- Access the Layer5 Cloud dashboard to ensure full functionality.

### Post-Upgrade Notes
- If custom configurations were applied outside of `values.yaml`, re-apply them as needed.
- Monitor system logs for unexpected behavior for at least 24 hours post-upgrade.
- Contact Layer5 support via Slack or the discussion forum if any issues arise.

### Troubleshooting

| Issue                        | Solution                                                                  |
|-----------------------------|---------------------------------------------------------------------------|
| Pods stuck in crash loop    | Run `kubectl describe pod` to check events and resolve YAML mismatches    |
| Upgrade timeout             | Confirm sufficient system resources and retry the upgrade                 |
| Configuration not reflected | Clear cache and reapply `values.yaml` if changes are not visible          |

For advanced scenarios such as multi-cluster upgrades or high availability setups, refer to the [Enterprise Documentation](https://docs.layer5.io/enterprise) or contact the Layer5 team directly.
