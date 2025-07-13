# ABRNOC - Task Management Application

A full-stack task management application built with React (frontend) and NestJS (backend).

**Repository**: [https://github.com/houtan-rocky/abrnoc](https://github.com/houtan-rocky/abrnoc)

## Architecture

- **Frontend**: React with TypeScript, Vite, React Router, React Hook Form
- **Backend**: NestJS with TypeScript, JWT authentication, Swagger documentation
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes with auto-scaling and load balancing

## 🚀 Quick Start (One Command Setup)

### Universal Run Scripts (Recommended)

The project includes cross-platform run scripts that work on **Windows**, **macOS**, and **Linux** with just one command!

**For macOS/Linux:**
```bash
./run.sh
```

**For Windows:**
```cmd
run.bat
```

That's it! The script will:
- ✅ Check if Docker is installed and running
- ✅ Build and start both frontend and backend
- ✅ Show you the access URLs
- ✅ Provide helpful commands for management
- ✅ Handle both old and new Docker Compose syntax
- ✅ Give you colored output and clear instructions

### Installing Dependencies (Local Development)

If you want to run the projects locally without Docker:

**Option 1: Using npm scripts (Recommended)**
```bash
# Install all dependencies
npm run install:all

# Install specific project dependencies
npm run install:client
npm run install:server
```

**Option 2: Using install scripts**
```bash
# For macOS/Linux:
./install.sh

# For Windows:
install.bat
```

This will install all dependencies for:
- ✅ Root project (if any)
- ✅ Client (React Frontend)
- ✅ Server (NestJS Backend)

**Access your application:**
- 🌐 **Frontend**: http://localhost:8080
- 🔧 **Backend API**: http://localhost:3000
- 📚 **API Documentation**: http://localhost:3000/api

### Available Commands

#### Docker Commands
```bash
# Start the application (default)
./run.sh

# View logs
./run.sh logs

# Check status
./run.sh status

# Stop application
./run.sh stop

# Restart application
./run.sh restart

# Clean up (remove all containers and images)
./run.sh clean
```

#### NPM Scripts (Recommended)
```bash
# Install all dependencies
npm run install:all

# Install specific project dependencies
npm run install:client
npm run install:server

# Development
npm run dev              # Start both client and server
npm run dev:client       # Start only client
npm run dev:server       # Start only server

# Build
npm run build            # Build both client and server
npm run build:client     # Build only client
npm run build:server     # Build only server

# Docker
npm run docker:up        # Start with Docker
npm run docker:down      # Stop Docker containers
npm run docker:logs      # View Docker logs

# Kubernetes
npm run k8s:deploy       # Deploy to Kubernetes

# Cleanup
npm run clean            # Remove all node_modules and lock files
```

#### Install Scripts
```bash
# Install dependencies for local development
./install.sh

# Clean all node_modules and lock files
./install.sh clean

# Check for package.json files
./install.sh check
```

### Alternative Deployment Options

#### Option 1: Docker Compose (Manual)
```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api
```

#### Option 2: Kubernetes (Production) - Advanced
```bash
# Prerequisites: Kubernetes cluster (Docker Desktop with K8s, Minikube, or cloud cluster)
# Deploy to Kubernetes
./k8s/deploy.sh

# Access via port-forward
kubectl port-forward -n abrnoc svc/client-service 8080:80
# Then visit: http://localhost:8080
```

**Note:** Kubernetes deployment requires a running Kubernetes cluster. For local development, use the Docker Compose option above.

#### Option 3: Local Development
```bash
# Install dependencies
pnpm install

# Start backend
cd server && pnpm run start:dev

# Start frontend (in another terminal)
cd client && pnpm run dev
```

## 📁 Project Structure

```
abrnoc/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   ├── Dockerfile         # Frontend container
│   ├── nginx.conf         # NGINX configuration
│   └── .dockerignore      # Docker ignore rules
├── server/                # NestJS backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── tasks/         # Tasks module
│   │   ├── users/         # Users module
│   │   └── common/        # Shared utilities
│   ├── Dockerfile         # Backend container
│   └── .dockerignore      # Docker ignore rules
├── k8s/                   # Kubernetes manifests
│   ├── deploy.sh          # Deployment script
│   ├── README.md          # K8s documentation
│   ├── namespace.yaml     # K8s namespace
│   ├── configmap.yaml     # Application config
│   ├── secret.yaml        # Sensitive data
│   ├── server-deployment.yaml  # Backend deployment
│   ├── client-deployment.yaml  # Frontend deployment
│   ├── server-service.yaml     # Backend service
│   ├── client-service.yaml     # Frontend service
│   ├── ingress.yaml       # Traffic routing
│   └── hpa.yaml          # Auto-scaling
├── run.sh                 # Universal run script (macOS/Linux)
├── run.bat               # Universal run script (Windows)
├── install.sh             # Dependency installer (macOS/Linux)
├── install.bat           # Dependency installer (Windows)
├── deploy.sh             # Kubernetes deployment script
├── docker-compose.yml    # Local development stack
└── README.md             # This file
```

## ✨ Features

### 🎯 Core Features
- **User Authentication**: JWT-based login/register
- **Task Management**: CRUD operations for tasks
- **Responsive UI**: Modern React components with React Hook Form
- **API Documentation**: Swagger/OpenAPI with interactive docs

### 🐳 Containerization & Deployment
- **Universal Run Scripts**: One-command setup for Windows, macOS, and Linux
- **Docker Support**: Multi-stage builds with optimized images
- **Docker Compose**: Local development stack
- **Kubernetes Ready**: Production deployment with auto-scaling
- **Health Checks**: Built-in monitoring and readiness probes

### 🚀 Production Features
- **Auto-scaling**: Horizontal Pod Autoscalers (HPA) - Kubernetes only
- **Load Balancing**: Kubernetes services and ingress - Kubernetes only
- **Security**: Non-root containers, security headers
- **Monitoring**: Health endpoints and logging
- **NGINX**: Optimized static file serving with compression
- **Docker Compose**: Simple local development and testing

## API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /tasks` - Get user tasks
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `GET /health` - Health check

## Deployment

### Docker

```bash
# Build images
docker build -t abrnoc-client:latest ./client
docker build -t abrnoc-server:latest ./server

# Run containers
docker run -p 8080:80 abrnoc-client:latest
docker run -p 3000:3000 abrnoc-server:latest
```

### Kubernetes

See [k8s/README.md](k8s/README.md) for detailed Kubernetes deployment instructions.

## 🛠️ Development

### Prerequisites

- **Docker Desktop** (for containerized development)
- **Node.js 18+** (for local development)
- **pnpm** (for local development)
- **kubectl** (for Kubernetes deployment - optional)

### 🚀 Getting Started

#### Option 1: Containerized Development (Recommended)
```bash
# Just run this one command!
./run.sh
```

#### Option 2: Local Development
```bash
# Install dependencies
pnpm install

# Start backend
cd server && pnpm run start:dev

# Start frontend (in another terminal)
cd client && pnpm run dev
```

### Environment Variables

For local development, create `.env` files:

**server/.env:**
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-jwt-secret
DATABASE_URL=your-database-url
```

**client/.env:**
```env
VITE_API_URL=http://localhost:3000
```

### 🔧 Development Commands

```bash
# Frontend (client/)
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run lint         # Run ESLint

# Backend (server/)
pnpm run start:dev    # Start development server
pnpm run build        # Build for production
pnpm run test         # Run tests
pnpm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [NestJS](https://nestjs.com/)
- Containerized with [Docker](https://www.docker.com/)
- Orchestrated with [Kubernetes](https://kubernetes.io/)
- Styled with modern CSS and responsive design


