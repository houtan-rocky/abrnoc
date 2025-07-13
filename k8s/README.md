# Kubernetes Deployment Guide

**Repository**: [https://github.com/houtan-rocky/abrnoc](https://github.com/houtan-rocky/abrnoc)

> **⚠️ Important:** This Kubernetes deployment requires a running Kubernetes cluster. For most users, the Docker Compose approach (`./run.sh` or `run.bat`) is recommended as it requires no additional setup.

## Prerequisites

1. **Kubernetes Cluster**: A running Kubernetes cluster (local or cloud)
   - **Docker Desktop with Kubernetes**: Enable in Settings → Kubernetes
   - **Minikube**: `brew install minikube && minikube start`
   - **Kind**: `brew install kind && kind create cluster`
   - **Cloud cluster**: GKE, EKS, AKS, etc.
2. **kubectl**: Kubernetes command-line tool
3. **Docker**: For building container images
4. **NGINX Ingress Controller**: For routing external traffic (if using ingress)

## Quick Setup for Local Development

### Option 1: Docker Desktop with Kubernetes (Easiest)
1. Open Docker Desktop
2. Go to Settings → Kubernetes
3. Check "Enable Kubernetes"
4. Click "Apply & Restart"
5. Wait for Kubernetes to start (green icon)
6. Run: `./k8s/deploy.sh`

### Option 2: Minikube
```bash
# Install Minikube
brew install minikube  # macOS
# or download from: https://minikube.sigs.k8s.io/docs/start/

# Start cluster
minikube start

# Deploy
./k8s/deploy.sh
```

## Architecture

The deployment consists of:

- **Frontend (React)**: Served via NGINX on port 80
- **Backend (NestJS)**: API server on port 3000
- **Services**: Internal load balancing
- **Ingress**: External traffic routing
- **HPA**: Horizontal Pod Autoscalers for automatic scaling

## Files Overview

### Core Resources
- `namespace.yaml` - Creates the `abrnoc` namespace
- `configmap.yaml` - Application configuration
- `secret.yaml` - Sensitive data (JWT secrets, database URLs)

### Deployments
- `server-deployment.yaml` - Backend API deployment
- `client-deployment.yaml` - Frontend deployment

### Services
- `server-service.yaml` - Backend service (ClusterIP)
- `client-service.yaml` - Frontend service (ClusterIP)

### Networking
- `ingress.yaml` - External traffic routing

### Scaling
- `hpa.yaml` - Horizontal Pod Autoscalers

### Scripts
- `deploy.sh` - Automated deployment script

## Quick Start

### 1. Build and Deploy

```bash
# Make the script executable
chmod +x k8s/deploy.sh

# Run the deployment
./k8s/deploy.sh
```

### 2. Manual Deployment

If you prefer to deploy manually:

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Apply configuration
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml

# Deploy applications
kubectl apply -f k8s/server-deployment.yaml
kubectl apply -f k8s/client-deployment.yaml

# Create services
kubectl apply -f k8s/server-service.yaml
kubectl apply -f k8s/client-service.yaml

# Apply ingress
kubectl apply -f k8s/ingress.yaml

# Apply autoscalers
kubectl apply -f k8s/hpa.yaml
```

## Configuration

### Environment Variables

Update `k8s/configmap.yaml` and `k8s/secret.yaml` with your actual values:

```yaml
# In secret.yaml
data:
  JWT_SECRET: <base64-encoded-jwt-secret>
  DATABASE_URL: <base64-encoded-database-url>
```

To encode values in base64:
```bash
echo -n "your-secret" | base64
```

### Domain Configuration

Update the host in `k8s/ingress.yaml`:
```yaml
spec:
  rules:
  - host: your-domain.com  # Change this
```

## Accessing the Application

### Option 1: Port Forward (Development)
```bash
# Forward frontend
kubectl port-forward -n abrnoc svc/client-service 8080:80

# Forward backend
kubectl port-forward -n abrnoc svc/server-service 3000:3000
```

Then visit:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3000

### Option 2: Ingress (Production)
1. Configure your domain to point to your cluster's ingress IP
2. Update the host in `ingress.yaml`
3. Access via your domain

## Monitoring and Logs

### Check Deployment Status
```bash
kubectl get all -n abrnoc
```

### View Logs
```bash
# Server logs
kubectl logs -f deployment/server -n abrnoc

# Client logs
kubectl logs -f deployment/client -n abrnoc
```

### Check HPA Status
```bash
kubectl get hpa -n abrnoc
```

## Scaling

The application includes Horizontal Pod Autoscalers that automatically scale based on CPU and memory usage:

- **Server**: 2-10 replicas, 70% CPU threshold
- **Client**: 2-10 replicas, 70% CPU threshold

### Manual Scaling
```bash
# Scale server
kubectl scale deployment server -n abrnoc --replicas=5

# Scale client
kubectl scale deployment client -n abrnoc --replicas=3
```

## Troubleshooting

### Common Issues

1. **Images not found**: Ensure Docker images are built and available
2. **Pods not starting**: Check resource limits and requests
3. **Ingress not working**: Verify NGINX ingress controller is installed
4. **Health checks failing**: Check if `/health` endpoint exists in backend

### Debug Commands
```bash
# Describe pods
kubectl describe pod <pod-name> -n abrnoc

# Check events
kubectl get events -n abrnoc

# Check ingress status
kubectl describe ingress abrnoc-ingress -n abrnoc
```

## Cleanup

To remove the entire deployment:
```bash
kubectl delete namespace abrnoc
```

## Security Considerations

1. **Secrets**: Never commit actual secrets to version control
2. **Network Policies**: Consider adding network policies for pod-to-pod communication
3. **RBAC**: Implement proper role-based access control
4. **TLS**: Enable HTTPS in production with proper certificates

## Production Recommendations

1. **Use a container registry** instead of local images
2. **Implement proper monitoring** (Prometheus, Grafana)
3. **Set up logging aggregation** (ELK stack, Fluentd)
4. **Configure backup strategies** for persistent data
5. **Implement proper CI/CD pipelines**
6. **Use resource quotas** to prevent resource exhaustion
7. **Enable pod disruption budgets** for high availability 