# Clean Architecture - Tóm tắt

> Tổng quan về kiến trúc Clean Architecture được áp dụng trong project

## 🏗️ Kiến trúc Layers

```
┌─────────────────────────────────────────┐
│          Client (Frontend)              │
└─────────────────┬───────────────────────┘
                  │ HTTP Request
┌─────────────────▼───────────────────────┐
│    Controllers (Presentation Layer)     │
│  - Nhận HTTP requests                   │
│  - Validate input                       │
│  - Format responses                     │
└─────────────────┬───────────────────────┘
                  │ DTOs
┌─────────────────▼───────────────────────┐
│    Services (Business Logic Layer)      │
│  - Xử lý nghiệp vụ                      │
│  - Validate business rules              │
│  - Orchestrate repositories             │
│  - Transaction management               │
└─────────────────┬───────────────────────┘
                  │ Domain Models
┌─────────────────▼───────────────────────┐
│    Repositories (Data Access Layer)     │
│  - Tương tác với database               │
│  - CRUD operations                      │
│  - Data mapping                         │
└─────────────────┬───────────────────────┘
                  │ Prisma ORM
┌─────────────────▼───────────────────────┐
│    Database (PostgreSQL)                │
└─────────────────────────────────────────┘
```

## 📁 Cấu trúc Thư mục

```
src/
├── controllers/        # HTTP Request Handlers
│   ├── UserController.ts
│   ├── ProjectController.ts
│   ├── TaskController.ts
│   ├── RoleController.ts
│   └── CommentController.ts
│
├── services/          # Business Logic
│   ├── UserService.ts
│   ├── ProjectService.ts
│   ├── TaskService.ts
│   └── base/
│       └── BaseService.ts
│
├── repositories/      # Data Access
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
└── config/           # Configuration
    └── prisma.ts
```

## 🔄 Data Flow

### Request Flow (từ Client đến Database)

1. **Client** gửi HTTP request
2. **Router** nhận request và route đến Controller
3. **Controller** validate input và gọi Service
4. **Service** xử lý business logic và gọi Repository
5. **Repository** thực hiện database operations qua Prisma
6. **Database** trả về data

### Response Flow (từ Database về Client)

1. **Database** trả data cho Repository
2. **Repository** map data sang Domain Models
3. **Service** xử lý và transform data
4. **Controller** format response (DTOs)
5. **Router** gửi HTTP response về Client

## ✨ Nguyên tắc Clean Architecture

### 1. Separation of Concerns
Mỗi layer có trách nhiệm riêng biệt:
- **Controllers**: HTTP handling
- **Services**: Business logic
- **Repositories**: Data access
- **Models**: Domain logic

### 2. Dependency Rule
```
Controllers → Services → Repositories → Database
```
- Layer ngoài phụ thuộc vào layer trong
- Layer trong KHÔNG biết gì về layer ngoài

### 3. Abstraction
- Sử dụng interfaces để loose coupling
- Repository pattern abstract database operations
- Service pattern abstract business logic

## 🎯 Benefits

✅ **Testability** - Dễ dàng unit test từng layer

✅ **Maintainability** - Code rõ ràng, dễ maintain

✅ **Scalability** - Dễ mở rộng features mới

✅ **Flexibility** - Dễ thay đổi database/framework

✅ **Reusability** - Services và Repositories có thể reuse

## 📚 Đọc thêm

- **Chi tiết OOP & Design Patterns**: [`OOP-ARCHITECTURE.md`](./OOP-ARCHITECTURE.md)
- **Sơ đồ kiến trúc**: [`ARCHITECTURE-DIAGRAM.md`](./ARCHITECTURE-DIAGRAM.md)
- **API Documentation**: [`API-DOCUMENTATION.md`](./API-DOCUMENTATION.md)

---

**[← Back to Main README](../README.md)**
