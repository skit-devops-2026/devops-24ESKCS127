# Application Monitoring Architecture

This directory contains configuration files for application performance monitoring as required by Milestone M6.

## Prometheus Configuration (`prometheus.yml`)
- Scrapes metrics from `http://app:3000/metrics` every 5 seconds.
- Scrapes Prometheus internal health metrics every 10 seconds.
- Configured with environment and application tags for alert filtering.

## Operational Dashboard (`dashboard.json`)
- Grafana dashboard definition importing panels for:
  - `http_requests_total`: Monitored request counter across all endpoints.
  - `http_health_checks_total`: Total health probe invocations.
  - `process_uptime_seconds`: Running container uptime gauge.
  - `process_resident_memory_bytes` & `process_heap_used_bytes`: Memory consumption analytics.
