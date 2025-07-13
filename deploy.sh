#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    print_error "kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    print_error "Docker is not running. Please start Docker first."
    exit 1
fi

print_status "Starting deployment process..."

# Build Docker images
print_status "Building Docker images..."

# Build server image
print_status "Building server image..."
docker build -t abrnoc-server:latest ./server
if [ $? -ne 0 ]; then
    print_error "Failed to build server image"
    exit 1
fi

# Build client image
print_status "Building client image..."
docker build -t abrnoc-client:latest ./client
if [ $? -ne 0 ]; then
    print_error "Failed to build client image"
    exit 1
fi

# Create namespace
print_status "Creating namespace..."
kubectl apply -f ./k8s/namespace.yaml

# Apply ConfigMap and Secret
print_status "Applying ConfigMap and Secret..."
kubectl apply -f ./k8s/configmap.yaml
kubectl apply -f ./k8s/secret.yaml

# Apply deployments
print_status "Applying deployments..."
kubectl apply -f ./k8s/server-deployment.yaml
kubectl apply -f ./k8s/client-deployment.yaml

# Apply services
print_status "Applying services..."
kubectl apply -f ./k8s/server-service.yaml
kubectl apply -f ./k8s/client-service.yaml

# Apply ingress
print_status "Applying ingress..."
kubectl apply -f ./k8s/ingress.yaml

# Apply HPA
print_status "Applying Horizontal Pod Autoscalers..."
kubectl apply -f ./k8s/hpa.yaml

# Wait for deployments to be ready
print_status "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/server -n abrnoc
kubectl wait --for=condition=available --timeout=300s deployment/client -n abrnoc

# Show deployment status
print_status "Deployment completed! Checking status..."
kubectl get all -n abrnoc

print_status "To access the application:"
print_status "1. Add 'abrnoc.local' to your /etc/hosts file pointing to your cluster IP"
print_status "2. Or use port-forward: kubectl port-forward -n abrnoc svc/client-service 8080:80"
print_status "3. Then visit http://localhost:8080"

print_status "To check logs:"
print_status "kubectl logs -f deployment/server -n abrnoc"
print_status "kubectl logs -f deployment/client -n abrnoc"

print_status "To delete deployment:"
print_status "kubectl delete namespace abrnoc" 