# 📋 Task Management Backend API

> A comprehensive RESTful API backend for team task management system built with Node.js, TypeScript, Express, and PostgreSQL

## 🎯 Overview

Task Management Backend API is a production-ready REST API designed for collaborative project and task management. Built with modern technologies and best practices, it provides a robust foundation for building team productivity applications.

### ✨ Key Features

- 🔐 **JWT Authentication** - Secure user authentication with access and refresh tokens
- 👥 **User Management** - Complete user CRUD with role-based access control
- 📁 **Project Management** - Create and manage projects with team members
- ✅ **Task Management** - Full task lifecycle with status, priority, and assignments
- 🏷️ **Tags System** - Organize tasks with customizable tags
- 💬 **Comments** - Real-time collaboration with task comments
- 📊 **Metrics & Analytics** - Track project and task statistics
- 🔄 **Type Safety** - Full TypeScript support with Prisma ORM
- 🐳 **Docker Ready** - Containerized deployment with Docker Compose

## 🛠️ Tech Stack

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white&style=flat)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat)

</div>

## 📁 Project Structure

```
src/
├── controllers/       # HTTP request handlers
├── services/          # Business logic layer
├── repositories/      # Database access layer
├── models/            # Domain entities
├── dtos/              # Data transfer objects
├── routes/            # API route definitions
├── middleware/        # Custom middleware (auth, error handling)
├── utils/             # Utility functions
├── config/            # Configuration files
└── index.ts           # Application entry point

prisma/
├── schema.prisma      # Database schema definition
├── migrations/        # Database migrations
└── seed.ts            # Sample data seeder

docs/
├── API-DOCUMENTATION.md    # Complete API reference
├── ARCHITECTURE-DIAGRAM.md # System architecture
├── JWT-AUTHENTICATION.md   # Authentication guide
└── OOP-ARCHITECTURE.md     # Design patterns
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (recommended)
- npm or yarn package manager

### Installation

#### Option 1: Docker Compose (Recommended)

1. **Clone the repository**

```bash
git clone https://github.com/DUCTONBUI96/BE---Task-Management.git
cd BE---Task-Management
```

2. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Database Configuration
PGUSER=postgres
PGHOST=localhost
PGDATABASE=task_management
PGPASSWORD=your_secure_password
PGPORT=5432

# Application Configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Prisma Database URL
DATABASE_URL="postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?schema=public"
```

3. **Start the application**

```bash
# Start both backend and PostgreSQL
docker-compose up -d

# View logs
docker-compose logs -f backend
```

#### Option 2: Local Development

1. **Clone and install dependencies**

```bash
git clone https://github.com/DUCTONBUI96/BE---Task-Management.git
cd BE---Task-Management
npm install
```

2. **Start PostgreSQL** (using Docker)

```bash
docker-compose up postgres -d
```

3. **Setup database**

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed sample data (optional)
npm run prisma:seed
```

4. **Start development server**

```bash
npm run dev
```

### Access Points

| Service | URL |
|---------|-----|
| 🌐 API Server | http://localhost:3001 |
| 🗄️ Prisma Studio | http://localhost:5555 |

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get tokens |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout and invalidate tokens |
| GET | `/api/auth/me` | Get current user info |

### 👤 Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| GET | `/api/users/:id/projects` | Get user's projects |
| GET | `/api/users/:id/tasks` | Get user's tasks |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### 🎭 Roles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/roles` | Get all roles |
| GET | `/api/roles/:id` | Get role by ID |
| POST | `/api/roles` | Create new role |
| PUT | `/api/roles/:id` | Update role |
| DELETE | `/api/roles/:id` | Delete role |

### 📁 Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get project by ID |
| GET | `/api/projects/:id/members` | Get project members |
| GET | `/api/projects/:id/tasks` | Get project tasks |
| POST | `/api/projects` | Create new project |
| POST | `/api/projects/:id/members` | Add member to project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| DELETE | `/api/projects/:projectId/members/:userId` | Remove member |

### ✅ Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| GET | `/api/tasks/:id/users` | Get assigned users |
| POST | `/api/tasks` | Create new task |
| POST | `/api/tasks/:id/assign` | Assign user to task |
| POST | `/api/tasks/:id/tags` | Add tags to task |
| PUT | `/api/tasks/:id` | Update task |
| PUT | `/api/tasks/:id/status` | Update task status |
| PUT | `/api/tasks/:id/priority` | Update task priority |
| DELETE | `/api/tasks/:id` | Delete task |
| DELETE | `/api/tasks/:taskId/users/:userId` | Unassign user |

### 🏷️ Task Status & Priority

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/task-status` | Get all task statuses |
| POST | `/api/task-status` | Create task status |
| PUT | `/api/task-status/:id` | Update task status |
| DELETE | `/api/task-status/:id` | Delete task status |
| GET | `/api/task-priority` | Get all task priorities |
| POST | `/api/task-priority` | Create task priority |
| PUT | `/api/task-priority/:id` | Update task priority |
| DELETE | `/api/task-priority/:id` | Delete task priority |

### 💬 Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/comments` | Get all comments |
| GET | `/api/comments/:id` | Get comment by ID |
| GET | `/api/tasks/:taskId/comments` | Get task comments |
| POST | `/api/comments` | Create new comment |
| PUT | `/api/comments/:id` | Update comment |
| DELETE | `/api/comments/:id` | Delete comment |

### 📊 Metrics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/metrics/overview` | Get system overview |
| GET | `/api/metrics/projects/:id` | Get project metrics |
| GET | `/api/metrics/users/:id` | Get user metrics |

> 📖 For detailed request/response examples, see [API-DOCUMENTATION.md](./docs/API-DOCUMENTATION.md)

## 🗃️ Database Schema

### Core Entities

| Entity | Description |
|--------|-------------|
| **User** | User accounts with authentication |
| **Role** | Role definitions (Owner, Manager, Developer) |
| **Project** | Project management |
| **Task** | Task items with full metadata |
| **TaskStatus** | Status definitions (Backlog, To Do, In Progress, Completed) |
| **TaskPriority** | Priority levels (Low, Medium, High) |
| **Tag** | Task categorization tags |
| **Comment** | Task discussions |
| **RefreshTokenSession** | JWT refresh token management |

### Key Relationships

- User ↔ Project (Many-to-Many via `UserRoleProject`)
- User ↔ Task (Many-to-Many via `UserTask`)
- Project → Task (One-to-Many)
- Task → Comment (One-to-Many)
- Task ↔ Tag (Many-to-Many via `TaskTag`)
- User → RefreshTokenSession (One-to-Many)

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start server with hot-reload

# Production
npm run build            # Compile TypeScript
npm start                # Run production build

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:seed      # Seed sample data
```

## 🐳 Docker Commands

```bash
# Start all services (backend + PostgreSQL)
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f backend

# Rebuild and restart
docker-compose up --build -d

# Remove all containers and volumes
docker-compose down -v

# Start only PostgreSQL
docker-compose up postgres -d
```

## 🏗️ Architecture

This project follows a **layered architecture** pattern:

```
┌─────────────────────────────────┐
│   Controllers                   │  ← HTTP request handling
├─────────────────────────────────┤
│   Services                      │  ← Business logic
├─────────────────────────────────┤
│   Repositories                  │  ← Data access
├─────────────────────────────────┤
│   Database (PostgreSQL)         │  ← Data persistence
└─────────────────────────────────┘
```

**Key Design Patterns:**
- Repository Pattern for data abstraction
- Service Layer for business logic
- DTO Pattern for data validation
- Middleware pattern for cross-cutting concerns

> 📚 For detailed architecture documentation, see [`docs/`](./docs/) folder

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

### Database Connection Failed

```bash
# Check PostgreSQL container status
docker ps

# View database logs
docker logs task-management-postgres

# Restart database
docker-compose restart postgres
```

### Prisma Issues

```bash
# Reset database (WARNING: Deletes all data!)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Run migrations manually
npx prisma migrate deploy
```

## 📖 Documentation

- [`docs/API-DOCUMENTATION.md`](./docs/API-DOCUMENTATION.md) - Complete API reference
- [`docs/JWT-AUTHENTICATION.md`](./docs/JWT-AUTHENTICATION.md) - Authentication guide
- [`docs/ARCHITECTURE-DIAGRAM.md`](./docs/ARCHITECTURE-DIAGRAM.md) - System architecture
- [`docs/OOP-ARCHITECTURE.md`](./docs/OOP-ARCHITECTURE.md) - Design patterns

## 🎯 Sample Data

The project includes a comprehensive seed script with:
- **20 Users** with hashed passwords
- **14 Projects** across various domains
- **137 Tasks** with different statuses and priorities
- **Task assignments** and **Comments**
- Pre-configured **Roles**, **Statuses**, and **Priorities**

Run `npm run prisma:seed` to populate the database with sample data.

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=your_production_database_url
JWT_SECRET=your_strong_jwt_secret
JWT_REFRESH_SECRET=your_strong_refresh_secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Docker Production Build

```bash
# Build production image
docker build -t task-management-api .

# Run production container
docker run -p 3001:3001 --env-file .env task-management-api
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is developed for educational purposes.

## 👥 Authors

| Author | GitHub |
|--------|--------|
| **Quoc An Tran** | [@tquocan04](https://github.com/tquocan04) |
| **Duc Ton Bui** | [@DUCTONBUI96](https://github.com/DUCTONBUI96) |
| **Quoc Long Tran** | [@quoclong20222428](https://github.com/quoclong20222428) |

## 🌟 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- ORM powered by [Prisma](https://www.prisma.io/)
- Database: [PostgreSQL](https://www.postgresql.org/)
- Authentication: JWT tokens
- Containerization: [Docker](https://www.docker.com/)

---

<div align="center">

**If you find this project helpful, please give it a ⭐️**

Made with ❤️ by **Quoc An Tran**, **Duc Ton Bui** & **Quoc Long Tran**

</div>
