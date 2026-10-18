# E-Commerce Platform

DevOps CSUL511 Project — Full-stack e-commerce web application with automated CI/CD pipeline, Docker containerization, Kubernetes orchestration, and Prometheus monitoring.

## Author

| Roll No. | Name | GitHub username |
|---|---|---|
| 24ESKCS127 | Garvit Agrawal | garvitagrawal2005 |

## About

A modern full-stack e-commerce web application featuring dynamic product catalog browsing, cart management, wishlist functionality, and responsive checkout workflows. It includes production-grade containerization with Docker, orchestration manifests for Kubernetes, health check endpoints, and Prometheus metrics scraping.

## Tech stack

- Frontend: React 19, Vite, Tailwind CSS
- Backend / Server: Node.js (Health & Metrics API)
- Containerization & Orchestration: Docker, Docker Compose, Kubernetes
- CI/CD & Monitoring: GitHub Actions, Jenkins, Prometheus, Grafana

## Running locally

```bash
make install
make test
make build
make run
```

## Live URL

https://devops-24eskcs127.vercel.app

## Health endpoint

`GET /health` returns the running commit SHA and system uptime.
`GET /metrics` returns real Prometheus-formatted operational metrics.
