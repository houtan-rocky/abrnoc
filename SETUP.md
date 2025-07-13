# 🚀 Quick Setup Guide

**Repository**: [https://github.com/houtan-rocky/abrnoc](https://github.com/houtan-rocky/abrnoc)

## For Reviewers/Evaluators

This guide is for anyone who wants to quickly run and test the ABRNOC Task Management Application.

## Prerequisites

**Only one requirement:** Docker Desktop

1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Start Docker Desktop
3. Wait for Docker to be running (green icon in system tray/menu bar)

## 🎯 One Command Setup (Recommended)

### On Windows:
```cmd
# Windows users can use WSL or Git Bash to run the same commands
# Or use Docker Desktop directly with docker-compose
```

### On macOS/Linux:
```bash
./run.sh
```

**This is the easiest way to run the application!** It uses Docker Compose and doesn't require any Kubernetes setup.

## ✅ What Happens

The script will automatically:
1. Check if Docker is running
2. Build the application containers
3. Start both frontend and backend services
4. Show you the access URLs
5. Provide management commands

## 🌐 Access the Application

Once the script completes successfully, you can access:

- **Frontend (React App)**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api

## 📋 Useful Commands

```bash
# View application logs
./run.sh logs

# Check if services are running
./run.sh status

# Stop the application
./run.sh stop

# Restart the application
./run.sh restart

# Clean up everything
./run.sh clean
```

## 🐛 Troubleshooting

### "Docker is not running"
- Start Docker Desktop
- Wait for it to fully load (green icon)

### "Port already in use"
- Stop any existing containers: `./run.sh stop`
- Or use the clean command: `./run.sh clean`

### "Permission denied" (Linux/macOS)
- Make the script executable: `chmod +x run.sh`

### Application not loading
- Check logs: `./run.sh logs`
- Restart: `./run.sh restart`

## 🎉 Success!

If you see the colored output with ✅ checkmarks and the access URLs, the application is running successfully!

Open http://localhost:8080 in your browser to start using the task management application.

## 🔧 Advanced: Kubernetes Deployment

If you want to deploy to Kubernetes (requires additional setup):

1. **Enable Kubernetes in Docker Desktop** (Settings → Kubernetes → Enable)
2. **Or install Minikube**: `brew install minikube && minikube start`
3. **Then run**: `./k8s/deploy.sh`

**Note:** The Docker Compose approach above is recommended for most users as it requires no additional setup. 