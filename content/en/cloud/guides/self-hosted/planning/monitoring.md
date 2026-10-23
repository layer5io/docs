---
title: Monitoring
description: "Plan monitoring for Layer5 Cloud self-hosted deployments: metrics, logs, tracing, dashboards, and alerts."
categories: [self-hosted]
tags: [monitoring]
weight: 4
aliases:
  - /cloud/self-hosted/planning/monitoring/

---

Layer5 Cloud gives you health endpoints, structured logs with stable error codes, startup messages, and optional OpenTelemetry traces. It does not expose a Prometheus metrics endpoint. Build service-level indicators from your ingress and Kubernetes metrics plus the signals below.

## Objectives

- Know whether the process is running (`/healthz`) and whether startup finished (`/readyz`)
- Alert on stable error codes, not on message text
- Turn tracing on only when you have a collector
- Keep startup logs secret, because provider initialization logs the initial administrator password

## Metrics

The server does not publish application metrics. Use the ingress and the cluster:

- Ingress: HTTP status and latency by route, including `/kratos`, `/hydra`, and WebSocket upgrades on `/collaboration`
- Kubernetes: pod restarts, the readiness of `deploy/meshery-cloud`, and the Kratos and Hydra pods
- PostgreSQL: connection count, storage, and replication, from the database's own metrics

There is no cache, worker queue, or HPA signal inside Layer5 Cloud unless you turn on the chart's autoscaler yourself.

## Logs

The server writes logs in syslog format. The chart default level is `4` (info). Set `env.loglevel` to `5` for debug and `6` for trace, and return it to `4` when you finish. Logs are not JSON.

Errors carry a stable code of the form `meshery_cloud-NNNN`.

| Code | Level | Meaning |
| --- | --- | --- |
| `meshery_cloud-3301` | Error, then the process exits | The shared mail relay fails a startup screen. |
| `meshery_cloud-3302` | Error | The mail relay is unreachable. |
| `meshery_cloud-3304` | Error | The mail relay's certificate does not verify. |
| `meshery_cloud-3300` | Critical | An organization's own mail relay refused a message and fallback is off. |
| `meshery_cloud-3303` | Critical | An organization's mail relay accepted a message and never confirmed it. |

See [Email / SMTP Troubleshooting]({{< ref "cloud/guides/self-hosted/operating/smtp.md" >}}).

### Startup messages worth alerting on

The server exits when a database connection fails or a migration fails. It logs and keeps running for these, so a ready pod does not prove they succeeded:

| Message | What it means |
| --- | --- |
| `Failed to initialize Provider Admin And Provider Organization` | `INIT_CONFIG` was invalid or a step failed. |
| `IdP seed` warnings | The default Google or GitHub sign-in credentials were not stored. |
| A credential encryption key error | `env.cloudCredentialEncryptionKey` is missing or malformed. |
| `Failed to initialize OpenTelemetry tracing` | The tracing configuration was rejected. The server runs without traces. |

## Tracing

Set `env.otelConfig` to send OpenTelemetry traces to an OTLP gRPC collector. Leave it empty to turn tracing off.

```yaml
env:
  otelConfig: |
    service_name: layer5-cloud
    service_version: "1.0.278"
    environment: production
    endpoint: otel-collector.monitoring.svc.cluster.local:4317
    insecure: true
```

| Field | Required | Meaning |
| --- | --- | --- |
| `service_name` | Yes | Name that identifies the service in traces. |
| `endpoint` | Yes | Collector address in `host:port` form, without a scheme. |
| `insecure` | No | `true` sends without TLS. Defaults to `false`. |
| `service_version` | No | Version reported with each trace. |
| `environment` | No | Deployment environment reported with each trace. |

Each request produces one trace with a span for the whole HTTP request, a span for each middleware that ran, and a span for the handler.

## Dashboards

Build dashboards from ingress and Kubernetes data, plus the log codes above. Useful views:

- `/healthz` and `/readyz` success, and pod restarts
- Ingress 5xx rate and latency by route
- Kratos and Hydra pod health
- PostgreSQL storage and connections
- WebSocket connection counts on `/collaboration`

## Alerts

Alert on the mail error codes `3301`, `3302`, `3304`, `3300`, and `3303`, on `/readyz` staying non-200, and on migration failures that exit the process. Layer5 Cloud does not send alerts to Slack, PagerDuty, or Datadog. Route alerts from your own log and ingress tooling.

## Sizing and Retention

Database migrations run before the server reports ready. The startup probe allows 20 failed checks at 10-second intervals, so a slow start gets about 200 seconds before Kubernetes restarts the pod. An upgrade with a large migration can approach that limit.

## Security and Compliance

Restrict access to logs. They carry user email addresses, and at debug level they include request detail. Provider initialization logs the configuration it reads, including the initial administrator password. Remove `env.initConfig` after the first successful start. See [Provider initialization]({{< ref "cloud/guides/self-hosted/deployment/_index.md#provider-initialization" >}}).

## Reference Architecture (example)

| Endpoint | Answers | Meaning |
| --- | --- | --- |
| `GET /healthz` | `200` with the text `Cloud is live` | The process is running. The chart uses it for the liveness probe. |
| `GET /readyz` | `200` when ready, `503` before | Startup finished. The chart uses it for the readiness and startup probes. |

Both endpoints are unauthenticated. Kratos and Hydra expose their own health endpoints. The chart configures Hydra liveness on `/health/alive` and readiness on `/health/ready`.
