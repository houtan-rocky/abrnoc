# ABRNOC - Task Management Application

A full-stack task management application built with React (frontend) and NestJS (backend).

## Architecture

- **Frontend**: React with TypeScript, Vite, React Router, React Hook Form
- **Backend**: NestJS with TypeScript, JWT authentication, Swagger documentation
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes with auto-scaling and load balancing

## Quick Start

### Option 1: Docker Compose (Development)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api
```

### Option 2: Kubernetes (Production)

```bash
# Deploy to Kubernetes
./k8s/deploy.sh

# Access via port-forward
kubectl port-forward -n abrnoc svc/client-service 8080:80
# Then visit: http://localhost:8080
```

### Option 3: Local Development

```bash
# Install dependencies
pnpm install

# Start backend
cd server && pnpm run start:dev

# Start frontend (in another terminal)
cd client && pnpm run dev
```

## Project Structure

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
│   └── nginx.conf         # NGINX configuration
├── server/                # NestJS backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── tasks/         # Tasks module
│   │   ├── users/         # Users module
│   │   └── common/        # Shared utilities
│   └── Dockerfile         # Backend container
├── k8s/                   # Kubernetes manifests
│   ├── deploy.sh          # Deployment script
│   ├── README.md          # K8s documentation
│   └── *.yaml             # K8s resource files
└── docker-compose.yml     # Local development stack
```

## Features

- **User Authentication**: JWT-based login/register
- **Task Management**: CRUD operations for tasks
- **Responsive UI**: Modern React components
- **API Documentation**: Swagger/OpenAPI
- **Containerized**: Docker support
- **Scalable**: Kubernetes deployment
- **Auto-scaling**: HPA for load management

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

## Development

### Prerequisites

- Node.js 18+
- pnpm
- Docker (optional)
- kubectl (for K8s deployment)

### Environment Variables

Create `.env` files in both `client/` and `server/` directories:

**server/.env:**
```
NODE_ENV=development
PORT=3000
JWT_SECRET=your-jwt-secret
DATABASE_URL=your-database-url
```

**client/.env:**
```
VITE_API_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

