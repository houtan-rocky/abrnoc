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

# Check if pnpm is installed
check_pnpm() {
    if ! command -v pnpm &> /dev/null; then
        print_error "pnpm is not installed. Please install pnpm first."
        print_error "Install with: npm install -g pnpm"
        print_error "Or visit: https://pnpm.io/installation"
        exit 1
    fi
}

# Install dependencies for a project
install_project() {
    local project_path="$1"
    local project_name="$2"
    
    if [ -f "$project_path/package.json" ]; then
        print_status "Installing dependencies for $project_name..."
        cd "$project_path"
        
        if [ -f "pnpm-lock.yaml" ]; then
            print_status "Using pnpm (lockfile found)"
            pnpm install
        elif [ -f "package-lock.json" ]; then
            print_status "Using npm (lockfile found)"
            npm install
        elif [ -f "yarn.lock" ]; then
            print_status "Using yarn (lockfile found)"
            yarn install
        else
            print_status "No lockfile found, using pnpm"
            pnpm install
        fi
        
        if [ $? -eq 0 ]; then
            print_status "✅ $project_name dependencies installed successfully"
        else
            print_error "❌ Failed to install dependencies for $project_name"
            return 1
        fi
        
        cd - > /dev/null
    else
        print_warning "No package.json found in $project_path"
    fi
}

# Main execution
main() {
    print_header "ABRNOC Project Dependencies Installer"
    print_status "Installing dependencies for all projects..."
    
    # Check prerequisites
    check_pnpm
    
    # Get the script directory
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    # Install root dependencies (if any)
    if [ -f "$SCRIPT_DIR/package.json" ]; then
        print_status "Installing root dependencies..."
        cd "$SCRIPT_DIR"
        pnpm install
        if [ $? -eq 0 ]; then
            print_status "✅ Root dependencies installed successfully"
        else
            print_error "❌ Failed to install root dependencies"
        fi
    fi
    
    # Install client dependencies
    if [ -d "$SCRIPT_DIR/client" ]; then
        install_project "$SCRIPT_DIR/client" "Client (React Frontend)"
    fi
    
    # Install server dependencies
    if [ -d "$SCRIPT_DIR/server" ]; then
        install_project "$SCRIPT_DIR/server" "Server (NestJS Backend)"
    fi
    
    print_header "Installation Summary"
    print_status "All dependencies have been installed!"
    print_status ""
    print_status "Next steps:"
    print_status "1. Start development: ./run.sh"
    print_status "2. Or run locally:"
    print_status "   - Backend: cd server && pnpm run start:dev"
    print_status "   - Frontend: cd client && pnpm run dev"
    print_status ""
    print_status "🎉 Ready to develop!"
}

# Handle different commands
case "${1:-install}" in
    "install"|"")
        main
        ;;
    "clean")
        print_status "Cleaning node_modules..."
        find . -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
        find . -name "pnpm-lock.yaml" -delete 2>/dev/null || true
        find . -name "package-lock.json" -delete 2>/dev/null || true
        find . -name "yarn.lock" -delete 2>/dev/null || true
        print_status "Cleanup completed!"
        ;;
    "check")
        print_status "Checking for package.json files..."
        find . -name "package.json" -type f | while read -r file; do
            dir=$(dirname "$file")
            name=$(basename "$dir")
            print_status "Found: $name ($dir)"
        done
        ;;
    *)
        echo "Usage: $0 [install|clean|check]"
        echo ""
        echo "Commands:"
        echo "  install - Install dependencies for all projects (default)"
        echo "  clean   - Remove all node_modules and lock files"
        echo "  check   - List all package.json files found"
        exit 1
        ;;
esac 