# 📋 Task Management Backend API

> Backend API cho hệ thống quản lý công việc theo mô hình Clean Architecture & OOP

## 🎯 Giới thiệu

Hệ thống backend API RESTful cho ứng dụng quản lý công việc nhóm (Task Management), được xây dựng theo **Clean Architecture** kết hợp **OOP Design Patterns**, đảm bảo code dễ bảo trì, mở rộng và kiểm thử.

### ✨ Tính năng chính

- 👥 Quản lý users và phân quyền theo role
- 📁 Quản lý projects và members
- ✅ Quản lý tasks với status, priority, tags
- 💬 Comment và collaboration
- 🔐 Clean Architecture với separation of concerns
- 🎨 OOP Design Patterns (Repository, Service, Singleton)
- 🔄 Type-safe với TypeScript và Prisma

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white&style=flat)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat)

## 📁 Cấu trúc dự án

```
src/
├── controllers/       # Presentation Layer - HTTP handlers
│   ├── UserController.ts
│   ├── RoleController.ts
│   ├── ProjectController.ts
│   ├── TaskController.ts
│   └── CommentController.ts
│
├── services/          # Business Logic Layer
│   ├── UserService.ts
│   ├── ProjectService.ts
│   ├── TaskService.ts
│   └── base/
│       └── BaseService.ts
│
├── repositories/      # Data Access Layer
│   ├── UserRepository.ts
│   ├── ProjectRepository.ts
│   ├── TaskRepository.ts
│   └── base/
│       └── BaseRepository.ts
│
├── models/           # Domain Entities
│   ├── User.ts
│   ├── Project.ts
│   └── Task.ts
│
├── dtos/             # Data Transfer Objects
│   ├── UserDTO.ts
│   ├── ProjectDTO.ts
│   └── TaskDTO.ts
│
├── routes/           # API Routes
│   ├── user.routes.ts
│   ├── role.routes.ts
│   ├── project.routes.ts
│   ├── task.routes.ts
│   └── comment.routes.ts
│
├── config/           # Configuration
│   └── prisma.ts
│
└── index.ts          # Application entry point

prisma/
├── schema.prisma     # Database schema
└── migrations/       # Database migrations
```

> 📖 **Tài liệu kiến trúc chi tiết**: Xem thư mục [`docs/`](./docs/) để hiểu rõ hơn về Clean Architecture và OOP patterns được áp dụng.

## 🚀 Quick Start

### Yêu cầu hệ thống

- [Node.js](https://nodejs.org/) (v16+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- npm hoặc yarn

### 1. Clone repository

```bash
git clone https://github.com/DUCTONBUI96/BE---Task-Management.git
cd BE---Task-Management
```

### 2. Cấu hình môi trường

Tạo file `.env`:

```env
# Database
PGUSER=postgres
PGHOST=localhost
PGDATABASE=task_management
PGPASSWORD=your_secure_password
PGPORT=5432

# Application
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Prisma
DATABASE_URL="postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?schema=public"
```

### 3. Khởi động với Docker Compose

**Option 1: Chạy toàn bộ (Backend + Database)**

```bash
docker-compose up -d
```

**Option 2: Development mode (Hot reload)**

```bash
# Chỉ chạy PostgreSQL
docker-compose up postgres -d

# Cài dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Chạy migrations
npm run prisma:migrate

# Khởi động server
npm run dev
```

### 4. Kiểm tra

- 🌐 Backend API: http://localhost:3001
- 🗄️ Prisma Studio: `npm run prisma:studio` → http://localhost:5555

## 📡 API Endpoints

### 👤 Users
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/users` | Lấy tất cả users |
| GET | `/api/users/:id` | Lấy user theo ID |
| POST | `/api/users` | Tạo user mới |
| PUT | `/api/users/:id` | Cập nhật user |
| DELETE | `/api/users/:id` | Xóa user |

### 🎭 Roles
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/roles` | Lấy tất cả roles |
| GET | `/api/roles/:id` | Lấy role theo ID |
| POST | `/api/roles` | Tạo role mới |
| PUT | `/api/roles/:id` | Cập nhật role |
| DELETE | `/api/roles/:id` | Xóa role |

### 📁 Projects
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/projects` | Lấy tất cả projects |
| GET | `/api/projects/:id` | Lấy project theo ID |
| GET | `/api/projects/:id/member` | Lấy members của project |
| POST | `/api/projects` | Tạo project mới |
| POST | `/api/projects/:id/members` | Thêm member vào project |
| PUT | `/api/projects/:id` | Cập nhật project |
| DELETE | `/api/projects/:id` | Xóa project |
| DELETE | `/api/projects/:projectId/members/:userId` | Xóa member khỏi project |

### ✅ Tasks
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/tasks` | Lấy tất cả tasks |
| GET | `/api/tasks/:id` | Lấy task theo ID |
| GET | `/api/projects/:id/tasks` | Lấy tasks theo project |
| POST | `/api/tasks` | Tạo task mới |
| POST | `/api/tasks/:id/assign` | Assign user vào task |
| POST | `/api/tasks/:id/tags` | Thêm tags vào task |
| PUT | `/api/tasks/:id` | Cập nhật task |
| PUT | `/api/tasks/:id/status` | Cập nhật status |
| PUT | `/api/tasks/:id/priority` | Cập nhật priority |
| DELETE | `/api/tasks/:id` | Xóa task |

### 💬 Comments
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/comments` | Lấy tất cả comments |
| GET | `/api/tasks/:taskId/comments` | Lấy comments theo task |
| POST | `/api/comments` | Tạo comment mới |
| PUT | `/api/comments/:id` | Cập nhật comment |
| DELETE | `/api/comments/:id` | Xóa comment |

## 🗃️ Database Schema

### Core Models

- **User** - Người dùng (UUID)
- **Role** - Vai trò (Admin, Developer, Tester, etc.)
- **Project** - Dự án
- **Task** - Nhiệm vụ
- **TaskStatus** - Trạng thái task
- **TaskPriority** - Độ ưu tiên
- **Tag** - Nhãn
- **Comment** - Bình luận

### Relationships

- User ↔ Project (Many-to-Many qua UserRoleProject)
- User ↔ Task (Many-to-Many qua UserTask)
- Project → Task (One-to-Many)
- Task → Comment (One-to-Many)
- Task ↔ Tag (Many-to-Many)

## 🛠️ Scripts npm

```bash
# Development
npm run dev              # Chạy với hot-reload (nodemon)

# Production
npm run build           # Build TypeScript
npm start               # Chạy production build

# Database
npm run prisma:generate # Generate Prisma Client
npm run prisma:migrate  # Chạy migrations
npm run prisma:studio   # Mở Prisma Studio GUI
npm run prisma:seed     # Seed dữ liệu mẫu
```

## 🐳 Docker Commands

```bash
# Khởi động services
docker-compose up -d

# Dừng services
docker-compose down

# Xem logs
docker-compose logs -f backend

# Rebuild images
docker-compose up --build -d

# Xóa tất cả (bao gồm volumes)
docker-compose down -v
```

## 🏗️ Kiến trúc

Project áp dụng **Clean Architecture** với 3 layers chính:

```
┌─────────────────────────────────┐
│   Controllers (Presentation)    │  ← HTTP requests/responses
├─────────────────────────────────┤
│   Services (Business Logic)     │  ← Business rules & orchestration
├─────────────────────────────────┤
│   Repositories (Data Access)    │  ← Database operations
├─────────────────────────────────┤
│   Database (PostgreSQL)         │  ← Persistent storage
└─────────────────────────────────┘
```

### Design Patterns được sử dụng

- **Repository Pattern** - Abstraction cho data access
- **Service Pattern** - Business logic orchestration
- **Singleton Pattern** - Prisma Client, Services
- **DTO Pattern** - Data validation & transformation
- **Dependency Injection** - Loose coupling

> 📚 **Đọc thêm**: [`docs/OOP-ARCHITECTURE.md`](./docs/OOP-ARCHITECTURE.md) cho kiến trúc chi tiết

## 🔧 Troubleshooting

### Lỗi: Port đã được sử dụng

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill
```

### Lỗi: Database connection failed

```bash
# Kiểm tra PostgreSQL container
docker ps

# Xem logs
docker logs task-management-postgres

# Restart database
docker-compose restart postgres
```

### Lỗi: Prisma migrations

```bash
# Reset database (XÓA DATA!)
npx prisma migrate reset

# Generate client
npx prisma generate

# Chạy migrations
npx prisma migrate dev
```

## 📖 Documentation

- [`docs/OOP-ARCHITECTURE.md`](./docs/OOP-ARCHITECTURE.md) - Kiến trúc OOP chi tiết
- [`docs/API-DOCUMENTATION.md`](./docs/API-DOCUMENTATION.md) - API reference đầy đủ

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Dự án này được phát triển cho mục đích học tập.

## 👤 Author

**DUCTONBUI96**

- GitHub: [@DUCTONBUI96](https://github.com/DUCTONBUI96)
- Repository: [BE---Task-Management](https://github.com/DUCTONBUI96/BE---Task-Management)

---

**Happy Coding! 🚀**
