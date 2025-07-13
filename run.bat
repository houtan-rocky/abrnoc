@echo off
setlocal enabledelayedexpansion

:: Colors for Windows (using echo commands)
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "NC=[0m"

:: Function to print colored output
:print_status
echo %GREEN%[INFO]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

:print_header
echo %BLUE%================================%NC%
echo %BLUE%~1%NC%
echo %BLUE%================================%NC%
goto :eof

:: Check if Docker is installed and running
:check_docker
docker --version >nul 2>&1
if errorlevel 1 (
    call :print_error "Docker is not installed. Please install Docker Desktop first."
    call :print_error "Download from: https://www.docker.com/products/docker-desktop"
    exit /b 1
)

docker info >nul 2>&1
if errorlevel 1 (
    call :print_error "Docker is not running. Please start Docker Desktop first."
    exit /b 1
)
goto :eof

:: Check if Docker Compose is available
:check_docker_compose
docker-compose --version >nul 2>&1
if errorlevel 1 (
    docker compose version >nul 2>&1
    if errorlevel 1 (
        call :print_error "Docker Compose is not available. Please install Docker Desktop which includes Docker Compose."
        exit /b 1
    )
)
goto :eof

:: Function to run docker-compose (handles both old and new syntax)
:run_docker_compose
docker-compose --version >nul 2>&1
if not errorlevel 1 (
    docker-compose %*
) else (
    docker compose %*
)
goto :eof

:: Main execution
:main
call :print_header "ABRNOC Task Management Application"
call :print_status "Starting application setup..."

:: Check prerequisites
call :print_status "Checking prerequisites..."
call :check_docker
if errorlevel 1 exit /b 1
call :check_docker_compose
if errorlevel 1 exit /b 1

call :print_status "All prerequisites met! 🎉"

:: Stop any existing containers
call :print_status "Stopping any existing containers..."
call :run_docker_compose down >nul 2>&1

:: Build and start the application
call :print_status "Building and starting the application..."
call :run_docker_compose up --build -d

:: Wait for services to be ready
call :print_status "Waiting for services to start..."
timeout /t 10 /nobreak >nul

:: Check if services are running
call :print_status "Checking service status..."
call :run_docker_compose ps | findstr "Up" >nul
if not errorlevel 1 (
    call :print_status "✅ Application is running successfully!"
    
    echo.
    call :print_header "🌐 Access Your Application"
    echo %GREEN%Frontend (React App):%NC% http://localhost:8080
    echo %GREEN%Backend API:%NC% http://localhost:3000
    echo %GREEN%API Documentation:%NC% http://localhost:3000/api
    echo.
    
    call :print_header "📋 Available Commands"
    echo %YELLOW%View logs:%NC% run.bat logs
    echo %YELLOW%Stop application:%NC% run.bat stop
    echo %YELLOW%Restart application:%NC% run.bat restart
    echo %YELLOW%View status:%NC% run.bat status
    echo.
    
    call :print_status "🎯 The application is ready to use!"
    call :print_status "Open http://localhost:8080 in your browser to get started."
    
) else (
    call :print_error "❌ Failed to start application. Check logs with: run.bat logs"
    exit /b 1
)
goto :eof

:: Handle different commands
if "%1"=="" goto :start
if "%1"=="start" goto :start
if "%1"=="stop" goto :stop
if "%1"=="restart" goto :restart
if "%1"=="logs" goto :logs
if "%1"=="status" goto :status
if "%1"=="clean" goto :clean
goto :usage

:start
call :main
goto :eof

:stop
call :print_status "Stopping application..."
call :run_docker_compose down
call :print_status "Application stopped."
goto :eof

:restart
call :print_status "Restarting application..."
call :run_docker_compose down
call :run_docker_compose up --build -d
call :print_status "Application restarted."
goto :eof

:logs
call :print_status "Showing application logs..."
call :run_docker_compose logs -f
goto :eof

:status
call :print_status "Application status:"
call :run_docker_compose ps
goto :eof

:clean
call :print_warning "This will remove all containers, images, and volumes. Are you sure? (y/N)"
set /p response=
if /i "!response!"=="y" (
    call :print_status "Cleaning up..."
    call :run_docker_compose down -v --rmi all
    call :print_status "Cleanup completed."
) else (
    call :print_status "Cleanup cancelled."
)
goto :eof

:usage
echo Usage: %0 [start^|stop^|restart^|logs^|status^|clean]
echo.
echo Commands:
echo   start   - Start the application (default^)
echo   stop    - Stop the application
echo   restart - Restart the application
echo   logs    - Show application logs
echo   status  - Show application status
echo   clean   - Remove all containers and images
exit /b 1 