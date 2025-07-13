#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Check if Docker is installed and running
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker Desktop first."
        print_error "Download from: https://www.docker.com/products/docker-desktop"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        print_error "Docker is not running. Please start Docker Desktop first."
        exit 1
    fi
}

# Check if Docker Compose is available
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not available. Please install Docker Desktop which includes Docker Compose."
        exit 1
    fi
}

# Function to run docker-compose (handles both old and new syntax)
run_docker_compose() {
    if command -v docker-compose &> /dev/null; then
        docker-compose "$@"
    else
        docker compose "$@"
    fi
}

# Main execution
main() {
    print_header "ABRNOC Task Management Application"
    print_status "Starting application setup..."
    
    # Check prerequisites
    print_status "Checking prerequisites..."
    check_docker
    check_docker_compose
    
    print_status "All prerequisites met! 🎉"
    
    # Stop any existing containers
    print_status "Stopping any existing containers..."
    run_docker_compose down 2>/dev/null || true
    
    # Build and start the application
    print_status "Building and starting the application..."
    run_docker_compose up --build -d
    
    # Wait for services to be ready
    print_status "Waiting for services to start..."
    sleep 10
    
    # Check if services are running
    print_status "Checking service status..."
    if run_docker_compose ps | grep -q "Up"; then
        print_status "✅ Application is running successfully!"
        
        echo ""
        print_header "🌐 Access Your Application"
        echo -e "${GREEN}Frontend (React App):${NC} http://localhost:8080"
        echo -e "${GREEN}Backend API:${NC} http://localhost:3000"
        echo -e "${GREEN}API Documentation:${NC} http://localhost:3000/api"
        echo ""
        
        print_header "📋 Available Commands"
        echo -e "${YELLOW}View logs:${NC} ./run.sh logs"
        echo -e "${YELLOW}Stop application:${NC} ./run.sh stop"
        echo -e "${YELLOW}Restart application:${NC} ./run.sh restart"
        echo -e "${YELLOW}View status:${NC} ./run.sh status"
        echo ""
        
        print_status "🎯 The application is ready to use!"
        print_status "Open http://localhost:8080 in your browser to get started."
        
    else
        print_error "❌ Failed to start application. Check logs with: ./run.sh logs"
        exit 1
    fi
}

# Handle different commands
case "${1:-start}" in
    "start"|"")
        main
        ;;
    "stop")
        print_status "Stopping application..."
        run_docker_compose down
        print_status "Application stopped."
        ;;
    "restart")
        print_status "Restarting application..."
        run_docker_compose down
        run_docker_compose up --build -d
        print_status "Application restarted."
        ;;
    "logs")
        print_status "Showing application logs..."
        run_docker_compose logs -f
        ;;
    "status")
        print_status "Application status:"
        run_docker_compose ps
        ;;
    "clean")
        print_warning "This will remove all containers, images, and volumes. Are you sure? (y/N)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            print_status "Cleaning up..."
            run_docker_compose down -v --rmi all
            print_status "Cleanup completed."
        else
            print_status "Cleanup cancelled."
        fi
        ;;
    *)
        echo "Usage: $0 [start|stop|restart|logs|status|clean]"
        echo ""
        echo "Commands:"
        echo "  start   - Start the application (default)"
        echo "  stop    - Stop the application"
        echo "  restart - Restart the application"
        echo "  logs    - Show application logs"
        echo "  status  - Show application status"
        echo "  clean   - Remove all containers and images"
        exit 1
        ;;
esac 