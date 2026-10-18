# Kubernetes Orchestration Architecture

This directory contains production Kubernetes manifests for container orchestration as required by Milestone M7.

## Manifests

### 1. Deployment (`deployment.yaml`)
- **Replicas**: 2 pods for high availability.
- **Image**: References GitHub Container Registry image `ghcr.io/skit-devops-2026/devops-24eskcs127:latest`.
- **Probes**:
  - `livenessProbe`: Periodically queries `GET /health` on port 3000 to detect hung containers.
  - `readinessProbe`: Validates container initialization before traffic routing.
- **Resource Constraints**: Defined CPU and Memory requests and limits to ensure predictable scheduling.

### 2. Service (`service.yaml`)
- **Type**: `NodePort`
- **Exposed Port**: 80 targeting container port 3000 (NodePort 30080).
- **Selector**: Matches labels `app: devops-ecommerce`.
