<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Task Management API

A robust REST API for task management built with NestJS, featuring user authentication with JWT and comprehensive CRUD operations.

## Features

- ✅ **User Authentication** - JWT-based login/registration system
- ✅ **Task Management** - Full CRUD operations for tasks
- ✅ **Task Filtering** - Filter tasks by status
- ✅ **Data Persistence** - In-memory storage (easily replaceable with database)
- ✅ **Input Validation** - Comprehensive request validation
- ✅ **Error Handling** - Informative error messages
- ✅ **Docker Support** - Containerized deployment
- ✅ **CORS Enabled** - Frontend integration ready

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Authentication**: JWT with Passport
- **Validation**: class-validator
- **Password Hashing**: bcryptjs
- **Containerization**: Docker

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Docker (optional, for containerized deployment)

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd server
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm run start:dev
   ```

3. **Access the API:**
   - Base URL: `http://localhost:3000`
   - **Swagger Documentation**: `http://localhost:3000/api`
   - Interactive API documentation with testing capabilities

### Docker Deployment

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Or build manually:**
   ```bash
   docker build -t task-api .
   docker run -p 3000:3000 task-api
   ```

## API Documentation

The API includes comprehensive Swagger documentation available at `http://localhost:3000/api` when the server is running. The interactive documentation allows you to:

- View all available endpoints
- Test API calls directly from the browser
- See request/response schemas
- Authenticate with JWT tokens
- View detailed error responses

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "1",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:** Same as register response

### Tasks (Requires Authentication)

All task endpoints require the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

#### Create Task
```http
POST /tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-01-15T00:00:00.000Z"
}
```

**Response:**
```json
{
  "id": "1",
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-01-15T00:00:00.000Z",
  "userId": "1",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Get All Tasks
```http
GET /tasks
```

#### Get Tasks by Status
```http
GET /tasks?status=IN_PROGRESS
```

#### Get Task by ID
```http
GET /tasks/1
```

#### Update Task
```http
PATCH /tasks/1
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "priority": "URGENT"
}
```

#### Delete Task
```http
DELETE /tasks/1
```

## Data Models

### Task Status
- `TODO` - Task is pending
- `IN_PROGRESS` - Task is being worked on
- `DONE` - Task is completed
- `CANCELLED` - Task is cancelled

### Task Priority
- `LOW` - Low priority
- `MEDIUM` - Medium priority (default)
- `HIGH` - High priority
- `URGENT` - Urgent priority

## Error Handling

The API returns appropriate HTTP status codes and informative error messages:

- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Missing or invalid JWT token
- `404 Not Found` - Resource not found
- `409 Conflict` - Username/email already exists
- `500 Internal Server Error` - Server error

## Development

### Available Scripts

- `pnpm run start:dev` - Start development server with hot reload
- `pnpm run build` - Build the application
- `pnpm run start:prod` - Start production server
- `pnpm run test` - Run unit tests
- `pnpm run test:e2e` - Run end-to-end tests
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Format code with Prettier

### Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── guards/          # JWT guards
│   ├── strategies/      # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── tasks/               # Tasks module
│   ├── dto/            # Data transfer objects
│   ├── entities/       # Task entity
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
├── users/               # Users module
│   ├── dto/            # User DTOs
│   ├── entities/       # User entity
│   ├── users.service.ts
│   └── users.module.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## Security Considerations

- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens expire after 24 hours
- Input validation prevents malicious data
- CORS is enabled for frontend integration
- Authentication is required for all task operations

## Future Enhancements

- [ ] Database integration (PostgreSQL, MongoDB)
- [ ] Task categories and tags
- [ ] File attachments for tasks
- [ ] Task comments and collaboration
- [ ] Email notifications
- [ ] Task search and filtering
- [ ] User roles and permissions
- [ ] API rate limiting
- [x] Swagger/OpenAPI documentation

## License

This project is licensed under the MIT License.
