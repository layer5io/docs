---
title: Monitoring
description: "Plan monitoring for Layer5 Cloud self-hosted deployments: metrics, logs, tracing, dashboards, and alerts."
categories: [Self-Hosted]
tags: [monitoring]
weight: 4
---

Monitoring is essential to operate a reliable Layer5 Cloud deployment. Plan for metrics, logs, traces, dashboards, alerting, and retention so that you can detect and resolve issues quickly, understand capacity, and meet compliance needs.

## Objectives

- Establish observability for core services (API, UI, real-time collaboration, identity, database, cache, ingress) and infrastructure (Kubernetes, nodes, storage, networking)
- Provide dashboards for SLOs and golden signals (latency, traffic, errors, saturation)
- Configure actionable alerts with clear ownership and runbooks
- Size and retain telemetry data according to compliance and cost constraints

## Metrics

Collect system and application metrics. Common choices include Prometheus or any OpenMetrics-compatible backend.

- Kubernetes: kube-state-metrics, cAdvisor/node-exporter, API server, etcd, ingress controller
- Layer5 Cloud services: HTTP latency and error rates, request throughput, worker queue depth, WebSocket/WebRTC health
- Datastores: database query latency, connections, cache hit ratio

Recommended metrics and SLOs:

- Request success rate (5xx, 4xx) per route and service; target ≥ 99.9% over 30 days
- p50/p90/p99 latency per route and service; budget aligned to user experience goals
- Resource saturation: CPU, memory, pod restarts, HPA activity; queue length where applicable
- Collaboration health: signaling availability, peer connection success, message delivery error rate

## Logs

Use a centralized, searchable logging stack (e.g., Loki, Elasticsearch, or a managed service). Ensure structured logs (JSON) for Layer5 Cloud services and infrastructure components.

- Retention tiers: short-term hot (7–14 days), longer-term warm/cold per compliance
- Privacy: scrub/omit secrets and PII; apply data minimization and access control
- Context: include request IDs, user/session IDs (where appropriate), and correlation IDs

## Tracing

Enable distributed tracing with OpenTelemetry to diagnose cross-service latency and failures.

- Propagate W3C Trace Context across ingress → services → dependencies
- Sample rates: start with 1–5% head sampling; use tail-based sampling for errors/latency outliers
- Storage/backends: Tempo/Jaeger/managed APM

## Dashboards

Provide Grafana (or equivalent) dashboards for:

- Service health overview: error rate, latency, throughput, saturation
- Ingress and API gateway performance by route
- Real-time collaboration: signaling uptime, peer connection success, message RTT
- Identity/OIDC: login success, token issuance errors, external IdP health
- Database/cache: latency, throughput, errors, saturation
- Kubernetes: cluster/node/pod health, HPA activity, pending pods, eviction events

## Alerts

Create multi-level alerts (warning/critical) with clear runbooks and ownership.

- Availability: elevated 5xx rate or failure rate by route/service
- Latency: p99 above budget for sustained periods
- Saturation: CPU/memory pressure, pod crashloops, queue backlogs
- Dependencies: database unreachable, cache error spikes, external IdP failures
- Collaboration: signaling down, degraded connection success, message delivery failures

Alert destinations may include Slack, email, PagerDuty, or your incident tool. Include links to dashboards and logs in notifications.

## Sizing and Retention

Estimate telemetry volume early to avoid unexpected costs.

- Metrics: number of time series × scrape interval; downsample older data
- Logs: average line size × events/sec; apply sampling/filters and retention tiers
- Traces: sample strategically; store only spans needed for SLOs and investigations

## Security and Compliance

- Restrict telemetry access by role; audit access to sensitive logs
- Encrypt in transit and at rest; segregate prod/staging data
- Redact secrets and PII at the source where possible

## Reference Architecture (example)

- Metrics: Prometheus + Alertmanager; long-term storage via remote-write (e.g., Thanos, Mimir)
- Logs: Loki (or Elasticsearch) with LogQL saved views and retention tiers
- Traces: Tempo/Jaeger with OpenTelemetry SDKs/collectors
- Dashboards: Grafana with folders for platform, services, and business metrics

This setup is vendor-neutral and can be substituted with managed offerings from your cloud provider or APM vendor.


