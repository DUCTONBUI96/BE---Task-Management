# Task Management Backend

## 📋 Mục lục
- [🎯 Giới thiệu](#-giới-thiệu)
- [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [💻 Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [🚀 Cài đặt và Chạy với Docker](#-cài-đặt-và-chạy-với-docker)
- [�️ Development Mode](#️-development-mode)
- [� Các lệnh Docker hữu ích](#-các-lệnh-docker-hữu-ích)
- [🔧 Troubleshooting](#-troubleshooting)
- [�🗃️ Prisma ORM - Database Management](#️-prisma-orm---database-management)
- [� DBeaver - Database GUI Tool](#-dbeaver---database-gui-tool)
- [� API Endpoints](#-api-endpoints)
- [� Liên hệ & Support](#-liên-hệ--support)

## 🎯 Giới thiệu

Backend API cho ứng dụng quản lý công việc (Task Management), được xây dựng với:
- **Node.js** + **Express** - Backend framework
- **TypeScript** - Type-safe JavaScript
- **Prisma ORM** - Database ORM với type-safety
- **PostgreSQL** - Cơ sở dữ liệu
- **Docker** & **Docker Compose** - Containerization

## 📁 Cấu trúc thư mục

```
BE---Task-Management/
├── prisma/
│   ├── schema.prisma          # Prisma schema - Database models
│   ├── migrations/            # Database migrations (auto-generated)
│   └── seed.ts               # Seed data script
├── src/
│   ├── index.ts              # Entry point
│   ├── config/
│   │   ├── database.ts       # PostgreSQL pool config (legacy)
│   │   └── prisma.ts         # Prisma Client singleton
│   ├── controllers/
│   │   ├── ControllersCmt.ts
│   │   ├── ControllersProjects.ts
│   │   ├── ControllersRoles.ts
│   │   ├── ControllersTask.ts
│   │   └── ControllersUsers.ts
│   ├── model/
│   │   ├── Comment.ts        # Prisma queries for comments
│   │   ├── Project.ts        # Prisma queries for projects
│   │   ├── Roles.ts          # Prisma queries for roles
│   │   ├── Task.ts           # Prisma queries for tasks
│   │   └── Users.ts          # Prisma queries for users
│   └── routes/
│       ├── RouterCmt.ts
│       ├── RouterProject.ts
│       ├── RouterTask.ts
│       ├── RouterUsers.ts
│       └── routesRoles.ts
├── .env                      # Environment variables (not in git)
├── .gitignore
├── docker-compose.yml        # Production Docker setup
├── docker-compose.dev.yml    # Development PostgreSQL only
├── Dockerfile                # Backend container
├── package.json
├── tsconfig.json
└── README.md
```

### Thư mục quan trọng

- **`prisma/`**: Prisma ORM configuration và migrations
- **`src/model/`**: Data access layer với Prisma Client
- **`src/controllers/`**: Business logic layer
- **`src/routes/`**: API routes definition
- **`src/config/`**: Configuration files

## 💻 Yêu cầu hệ thống

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (bao gồm Docker và Docker Compose)
  - Windows: Docker Desktop for Windows
  - Mac: Docker Desktop for Mac
  - Linux: Docker Engine + Docker Compose

Kiểm tra cài đặt:
```bash
docker --version
docker-compose --version
```

## 🚀 Cài đặt và Chạy với Docker

### Bước 1: Clone repository

```bash
git clone https://github.com/DUCTONBUI96/BE---Task-Management.git
cd BE---Task-Management
```

### Bước 2: Cấu hình biến môi trường

Tạo file `.env` trong thư mục root của project với các biến sau:

```env
# PostgreSQL Configuration
PGUSER=postgres
PGHOST=localhost                      # localhost cho dev, postgres cho docker
PGDATABASE=Small_team_task_management
PGPASSWORD=your_password_here         # Thay đổi password của bạn
PGPORT=5432

# Application Configuration
APP_PORT=5001
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development

# Prisma Database URL (tự động sử dụng các biến trên)
DATABASE_URL="postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?schema=public"
```

**Lưu ý:**
- `PGHOST=localhost` khi chạy backend local (dev mode)
- `PGHOST=postgres` khi chạy với Docker Compose (production mode)
- Thay đổi `PGPASSWORD` thành password bảo mật của bạn

### Bước 3: Khởi động Docker Compose

Chạy lệnh sau để build và khởi động tất cả services:

```bash
docker-compose up --build -d
```

**Giải thích lệnh:**
- `up`: Khởi động services
- `--build`: Build lại Docker images
- `-d`: Chạy ở background (detached mode)

**Quá trình khởi động sẽ:**
1. ⬇️ Pull image PostgreSQL từ Docker Hub
2. 🔨 Build image cho Backend từ Dockerfile
3. 🗄️ Tạo PostgreSQL container và khởi động database
4. ⏳ Đợi PostgreSQL sẵn sàng (healthcheck)
5. 🚀 Khởi động Backend container

### Bước 4: Kiểm tra services đang chạy

```bash
docker-compose ps
```

Output mong đợi:
```
NAME                          STATUS              PORTS
task-management-backend       Up                  0.0.0.0:3001->3001/tcp
task-management-postgres      Up (healthy)        0.0.0.0:5432->5432/tcp
```

### Bước 5: Xem logs

Xem logs để đảm bảo mọi thứ hoạt động:

```bash
# Xem logs tất cả services
docker-compose logs -f

# Chỉ xem logs backend
docker-compose logs -f backend

# Chỉ xem logs postgres
docker-compose logs -f postgres
```

Nhấn `Ctrl + C` để thoát khỏi logs.

### Bước 6: Kiểm tra API

Backend đang chạy tại: **http://localhost:3001**

Test API:
```bash
# Windows (PowerShell)
Invoke-WebRequest -Uri http://localhost:3001/api

# Linux/Mac
curl http://localhost:3001/api
```

## 🛠️ Development Mode

### Chạy toàn bộ trong Docker (Production-like)

```bash
docker-compose up -d
```

### Chạy Backend local + PostgreSQL trong Docker (Hot-reload)

Tốt nhất cho development vì có hot-reload khi sửa code:

1. **Chỉ chạy PostgreSQL:**
   ```bash
   docker-compose up postgres -d
   ```

2. **Cập nhật `.env` cho local development:**
   ```env
   PGHOST=localhost    # Thay đổi từ 'postgres' thành 'localhost'
   ```

3. **Cài đặt dependencies và chạy:**
   ```bash
   npm install
   npm run dev
   ```

Backend sẽ tự động restart khi bạn thay đổi code trong `src/`.

### Build và test production build

```bash
npm run build
npm start
```

## 📦 Các lệnh Docker hữu ích

### Quản lý services

```bash
# Khởi động services (build nếu cần)
docker-compose up --build -d

# Dừng services (giữ lại data)
docker-compose down

# Dừng và xóa volumes (MẤT DATA!)
docker-compose down -v

# Restart tất cả services
docker-compose restart

# Restart một service cụ thể
docker-compose restart backend
docker-compose restart postgres

# Xem trạng thái services
docker-compose ps

# Xem resource usage
docker stats
```

### Logs và Debugging

```bash
# Xem logs realtime
docker-compose logs -f

# Xem 100 dòng logs cuối
docker-compose logs --tail=100

# Xem logs của một service
docker-compose logs -f backend
```

### Truy cập vào containers

```bash
# Vào backend container (shell)
docker exec -it task-management-backend sh

# Vào PostgreSQL container
docker exec -it task-management-postgres psql -U postgres -d taskmanagement

# Chạy lệnh trong container
docker exec task-management-backend ls -la
```

### Database operations

```bash
# Backup database
docker exec task-management-postgres pg_dump -U postgres taskmanagement > backup.sql

# Restore database
cat backup.sql | docker exec -i task-management-postgres psql -U postgres -d taskmanagement

# Xem danh sách databases
docker exec task-management-postgres psql -U postgres -c "\l"

# Kết nối vào PostgreSQL CLI
docker exec -it task-management-postgres psql -U postgres -d taskmanagement
```

### Clean up

```bash
# Xóa tất cả containers đã stop
docker container prune

# Xóa tất cả images không dùng
docker image prune

# Xóa tất cả volumes không dùng
docker volume prune

# Dọn dẹp toàn bộ (containers, images, volumes, networks)
docker system prune -a --volumes
```

## 🔧 Troubleshooting

### Lỗi: Port already in use

**Lỗi:**
```
Error: bind: address already in use
```

**Giải pháp:**
```bash
# Kiểm tra process đang dùng port 3001
netstat -ano | findstr :3001

# Hoặc thay đổi port trong docker-compose.yml
ports:
  - "3002:3001"  # Dùng port 3002 thay vì 3001
```

### Lỗi: Database connection failed

**Kiểm tra:**
1. PostgreSQL container có đang chạy không:
   ```bash
   docker-compose ps postgres
   ```

2. Xem logs PostgreSQL:
   ```bash
   docker-compose logs postgres
   ```

3. Kiểm tra biến môi trường trong `.env`

4. Đảm bảo `PGHOST=postgres` (không phải localhost) khi chạy trong Docker

### Container bị crash liên tục

```bash
# Xem logs để tìm lỗi
docker-compose logs backend

# Rebuild lại images
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Xóa toàn bộ và bắt đầu lại

```bash
# Dừng và xóa tất cả
docker-compose down -v

# Xóa images cũ
docker rmi task-management-backend postgres:15-alpine

# Build và khởi động lại
docker-compose up --build -d
```

### Database không có data

Nếu bạn cần tạo tables, chạy migrations:

```bash
# Truy cập vào backend container
docker exec -it task-management-backend sh

# Chạy migration scripts (nếu có)
# npm run migrate
```

### Lỗi: Migration mismatch - "applied to database but missing from local"

**Lỗi:**
```
The following migration(s) are applied to the database but missing from the local migrations directory: 20251105085040_init

We need to reset the "public" schema at "localhost:5432"
```

**Nguyên nhân:** 
Database có migrations cũ nhưng thư mục `prisma/migrations/` đã bị xóa hoặc không đồng bộ.

**Giải pháp 1: Reset database (Khuyến nghị cho development - MẤT HẾT DATA)**

```bash
# Reset database về trạng thái ban đầu
npx prisma migrate reset

# Sau đó chạy lại migrations
npx prisma migrate dev

# Seed data (nếu cần)
npm run prisma:seed
```

**Giải pháp 2: Tạo lại migrations từ schema hiện tại**

```bash
# Xóa tất cả migrations cũ trong database
npx prisma migrate reset --skip-seed

# Tạo migration mới từ schema
npx prisma migrate dev --name init

# Seed data
npm run prisma:seed
```

**Giải pháp 3: Giữ data - Đánh dấu migrations đã apply (Cẩn thận!)**

```bash
# Resolve bằng cách đánh dấu migrations hiện tại là đã apply
npx prisma migrate resolve --applied 20251105085040_init

# Hoặc đánh dấu tất cả migrations đã apply
npx prisma db push --accept-data-loss
```

**Lưu ý:**
- `prisma migrate reset` sẽ **XÓA TẤT CẢ DATA** trong database
- Chỉ dùng trong môi trường development
- Backup data quan trọng trước khi reset
- Trong production, cần xử lý migrations cẩn thận hơn

## �️ Prisma ORM - Database Management

Project này sử dụng **Prisma** làm ORM để quản lý database.

### Prisma Commands

```bash
# Generate Prisma Client (sau khi thay đổi schema)
npx prisma generate

# Tạo migration mới
npx prisma migrate dev --name <migration_name>

# Apply migrations to production
npx prisma migrate deploy

# Reset database (xóa tất cả data)
npx prisma migrate reset

# Open Prisma Studio (Database GUI)
npx prisma studio

# Format schema file
npx prisma format

# Seed database với dữ liệu mẫu
npm run prisma:seed
```

### Prisma Schema Location

- Schema file: `prisma/schema.prisma`
- Migrations: `prisma/migrations/` (auto-generated, don't edit manually)
- Seed script: `prisma/seed.ts`

### Database Models

- **User** - Người dùng (UUID primary key)
- **Role** - Vai trò (Admin, Project Manager, Developer, Viewer)
- **Project** - Dự án
- **Task** - Nhiệm vụ
- **TaskStatus** - Trạng thái task (To Do, In Progress, Done)
- **TaskPriority** - Độ ưu tiên (Low, Medium, High, Urgent)
- **Tag** - Nhãn cho task
- **Comment** - Bình luận trong task
- **UserRoleProject** - Vai trò của user trong project
- **UserTask** - User được gán vào task
- **TaskTag** - Tag của task

### Development Workflow riêng khi phát triển backend với Prisma tách biệt với production

1. **Khởi động PostgreSQL:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Chạy migrations (lần đầu):**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Seed data (optional):**
   ```bash
   npm run prisma:seed
   ```

5. **Chạy backend:**
   ```bash
   npm run dev
   ```

### Thay đổi Schema

Khi thay đổi `prisma/schema.prisma`:

```bash
# 1. Tạo migration mới
npx prisma migrate dev --name <descriptive_name>

# 2. Prisma tự động generate client và apply migration
# 3. Restart backend để áp dụng thay đổi
```

## 🔍 DBeaver - Database GUI Tool

### Cài đặt DBeaver

1. Download: https://dbeaver.io/download/
2. Chọn version "Community Edition" (miễn phí)
3. Cài đặt theo hướng dẫn

### Kết nối PostgreSQL trong DBeaver

#### Bước 1: Tạo Connection mới

1. Mở DBeaver
2. Click **Database** → **New Database Connection**
3. Chọn **PostgreSQL**
4. Click **Next**

#### Bước 2: Cấu hình Connection

**Main tab:**
```
Host: localhost
Port: 5432
Database: Small_team_task_management
Username: postgres
Password: <your_password_from_.env>
```

**Advanced settings (optional):**
- Show all databases: ✅

#### Bước 3: Test Connection

1. Click **Test Connection**
2. Nếu thiếu driver, DBeaver sẽ tự động download
3. Thấy "Connected" → Click **Finish**

### Sử dụng DBeaver

#### Xem Tables

```
Connections 
  └─ PostgreSQL - localhost
      └─ Databases
          └─ Small team task management
              └─ Schemas
                  └─ public
                      └─ Tables
```

#### Xem Data

1. Double-click vào table (VD: `users`)
2. Tab **Data** hiển thị records
3. Tab **Properties** hiển thị cấu trúc table

#### Chạy SQL Query

1. Click chuột phải vào database → **SQL Editor** → **New SQL Script**
2. Viết query:
   ```sql
   SELECT * FROM users;
   SELECT * FROM tasks WHERE project_id = 1;
   ```
3. **Ctrl + Enter** để chạy query

#### ER Diagram

1. Click chuột phải vào database
2. Chọn **View Diagram** → **Generate from database**
3. DBeaver sẽ tạo ER Diagram tự động

#### Export Data

1. Click chuột phải vào table
2. **Export Data** → Chọn format (CSV, JSON, SQL)
3. Follow wizard

#### Import Data

1. Click chuột phải vào table
2. **Import Data** → Chọn file
3. Map columns và import

### Tips & Tricks

```sql
-- Xem tất cả tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Xem structure của table
\d users

-- Count records
SELECT COUNT(*) FROM tasks;

-- Xem foreign keys
SELECT * FROM information_schema.table_constraints 
WHERE constraint_type = 'FOREIGN KEY';
```

## �📞 Liên hệ & Support

- **Repository**: https://github.com/DUCTONBUI96/BE---Task-Management
- **Issues**: Tạo issue trên GitHub nếu gặp vấn đề

## 📝 API Endpoints

- **Backend API**: http://localhost:3001/api
- **PostgreSQL**: localhost:5432
- **Prisma Studio**: http://localhost:5555 (khi chạy `npx prisma studio`)

Frontend có thể kết nối đến backend qua: `http://localhost:3001/api`

---

**Happy Coding! 🚀**
