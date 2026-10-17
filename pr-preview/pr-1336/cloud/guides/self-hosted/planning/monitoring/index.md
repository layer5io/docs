# Monitoring


> What a self-hosted Layer5 Cloud deployment exposes for monitoring: health endpoints, logs and error codes, startup signals, and OpenTelemetry traces.


Layer5 Cloud gives you four signals: two health endpoints, structured logs with stable error codes, a set of startup messages that tell you whether the deployment is fully working, and optional OpenTelemetry traces. It does not expose a Prometheus metrics endpoint, so build service-level indicators from ingress and Kubernetes metrics plus the signals below.

## Health endpoints

| Endpoint | Answers | Meaning |
| --- | --- | --- |
| `GET /healthz` | `200` with the text `Cloud is live` | The process is running. The chart uses it for the liveness probe. |
| `GET /readyz` | `200` when ready, `503` before | The server finished startup and is serving. The chart uses it for the readiness and startup probes. |

Both endpoints are unauthenticated. The startup probe allows 20 failed checks at 10-second intervals, so a slow start gets about 200 seconds before Kubernetes restarts the pod. Database migrations run before the server reports ready, so an upgrade that carries a large migration can approach that limit.

Kratos and Hydra expose their own health endpoints through their subcharts. The chart configures Hydra liveness on `/health/alive` and readiness on `/health/ready`.

## Logs

The server writes logs in syslog format. The chart sets the level to `4` (info). Set `env.loglevel` to `5` for debug and `6` for trace; use debug only while diagnosing, because it records more detail about requests and mail.

Errors carry a stable code of the form `meshery_cloud-NNNN`. Alert on the codes, not on message text. The codes that matter operationally:

| Code | Level | Meaning | Reference |
| --- | --- | --- | --- |
| `meshery_cloud-3301` | Error, then the process exits | The shared mail relay fails a startup screen. | [Troubleshoot Email Delivery](/pr-preview/pr-1336/cloud/guides/self-hosted/operating/smtp/) |
| `meshery_cloud-3302` | Error | The mail relay is unreachable. No mail leaves until it clears. | Same |
| `meshery_cloud-3304` | Error | The mail relay's certificate does not verify. | Same |
| `meshery_cloud-3300` | Critical | An organization's own mail relay refused a message and fallback is off, so the message was dropped. | Same |
| `meshery_cloud-3303` | Critical | An organization's mail relay accepted a message and never confirmed it. | Same |

Failures that the server survives are logged and, where a person acted, recorded as events that Provider Admins can read: an entitlement webhook that did not return `200` or `202`, and a signup decision whose webhook failed. A failed support-request webhook is logged and returned to the person who sent the request, but not recorded as an event.

### Startup messages worth alerting on

The server exits when a database connection fails or a migration fails. It logs and keeps running for these, so a green pod does not prove they succeeded:

| Message | What it means |
| --- | --- |
| `Failed to initialize Provider Admin And Provider Organization` | `INIT_CONFIG` was invalid or a step failed. The deployment runs without a provider administrator. |
| `IdP seed` warnings | The default Google or GitHub sign-in credentials were not stored. Sign-in on custom domains that use the defaults fails. |
| A credential encryption key error | `env.cloudCredentialEncryptionKey` is missing or malformed. Stored credentials cannot be read or written. |
| `Failed to initialize OpenTelemetry tracing` | The tracing configuration was rejected. The server runs without traces. |

## Traces

Set `env.otelConfig` to send OpenTelemetry traces to an OTLP gRPC collector:

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

Each request produces one trace with a span for the whole HTTP request, a span for each middleware that ran (domain resolution, authentication, authorization), and a span for the handler. Leave `otelConfig` empty to turn tracing off.

## What to monitor

| Concern | Signal |
| --- | --- |
| The server is up | `/healthz`, pod restarts |
| The server is serving | `/readyz`, ingress `5xx` rate and latency by route |
| Sign-in works | Ingress `5xx` on `/kratos` and `/hydra`, Kratos and Hydra pod health |
| Mail flows | Error codes `3301` to `3304`, and a periodic send through the [email test endpoint](/pr-preview/pr-1336/cloud/guides/self-hosted/operating/smtp/#send-a-test-email) |
| Webhooks deliver | Recorded webhook failure events |
| The database is healthy | PostgreSQL connection count, storage, and replication, from your database's own metrics |
| Co-editing works | Ingress WebSocket connection counts on `/collaboration` |

Restrict access to logs: they carry user email addresses, and at debug level they include request detail. Provider initialization also logs the configuration it reads, including the initial administrator password, so treat startup logs as secret and remove `env.initConfig` after the first successful start.

