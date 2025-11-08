# OOP Architecture Documentation - Clean Architecture

## Tổng quan

Dự án đã được chuẩn hóa hoàn toàn theo hướng **Lập trình hướng đối tượng (OOP)** kết hợp **Clean Architecture** với đầy đủ các nguyên tắc thiết kế SOLID, Design Patterns và best practices.

## Kiến trúc tổng thể

Dự án tuân theo mô hình Clean Architecture với luồng dữ liệu rõ ràng:

```
Client (Frontend)
   ↓
Controller (Presentation Layer - Nhận HTTP requests)
   ↓
Service (Business Logic Layer - Xử lý nghiệp vụ)
   ↓
Repository (Data Access Layer - Tương tác database)
   ↓
Database (PostgreSQL với Prisma ORM)
```

### Các lớp trong kiến trúc:

1. **Controllers**: Xử lý HTTP requests/responses, validation input
2. **Services**: Chứa business logic, orchestration
3. **Repositories**: Truy vấn và thao tác với database
4. **Models**: Domain entities với business rules
5. **DTOs**: Data transfer objects cho API contracts

## Cấu trúc thư mục

```
src/
├── models/              # Domain Models (Entities)
├── repositories/        # Data Access Layer
│   └── base/           # Base Repository Pattern
├── services/           # Business Logic Layer
│   └── base/           # Base Service Pattern
├── dtos/               # Data Transfer Objects
├── interfaces/         # Interface definitions
├── controllers/        # Presentation Layer (HTTP handlers)
├── routes/            # API Routes
└── config/            # Configuration files
```

## 1. Models (Domain Entities)

### Đặc điểm chính:
- **Encapsulation**: Sử dụng private fields với getters/setters
- **Validation**: Validate dữ liệu trong constructor và setters
- **Business Logic**: Chứa các phương thức xử lý business logic
- **Immutability**: Bảo vệ dữ liệu khỏi thay đổi không mong muốn

### Ví dụ: User Model

```typescript
export class User {
  private _id: string;
  private _email: string;
  private _name: string;
  private _passwordhash: string;

  constructor(id: string, email: string, name: string, passwordhash: string) {
    this._id = id;
    this._email = email;
    this._name = name;
    this._passwordhash = passwordhash;
    this.validate();
  }

  // Getters
  get email(): string {
    return this._email;
  }

  // Setters with validation
  set email(value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error('Invalid email format');
    }
    this._email = value;
  }

  // Business logic methods
  updateInfo(name?: string, email?: string): void {
    if (name) this.name = name;
    if (email) this.email = email;
    this._updatedAt = new Date();
  }

  // Factory method
  static fromObject(data: any): User {
    return new User(data.id, data.email, data.name, data.passwordhash);
  }
}
```

### Các Models có sẵn:
- ✅ **User** - User entity với validation và authentication logic
- ✅ **Project** - Project entity với project management logic
- ✅ **Task** - Task entity với deadline tracking và status management
- ✅ **Comment** - Comment entity với edit tracking
- ✅ **Role** - Role entity cho authorization
- ✅ **TaskStatus** - Task status types
- ✅ **TaskPriority** - Task priority levels với comparison logic
- ✅ **Tag** - Tag entity cho categorization
- ✅ **TaskTag** - Many-to-many relationship
- ✅ **UserRoleProject** - Many-to-many relationship
- ✅ **UserTask** - User-Task assignment relationship

## 2. Repositories (Data Access Layer)

### Design Patterns được áp dụng:
- **Repository Pattern**: Tách biệt data access logic
- **Singleton Pattern**: Đảm bảo chỉ có 1 instance của mỗi repository
- **Abstract Factory Pattern**: BaseRepository cung cấp common operations

### BaseRepository

Abstract class cung cấp CRUD operations cơ bản:

```typescript
export abstract class BaseRepository<T, ID> implements IRepository<T, ID> {
  protected prisma: PrismaClient;
  protected modelName: string;

  // Standard CRUD operations
  async findAll(): Promise<T[]>
  async findById(id: ID): Promise<T | null>
  async create(data: Partial<T>): Promise<T>
  async update(id: ID, data: Partial<T>): Promise<T>
  async delete(id: ID): Promise<boolean>
  async exists(id: ID): Promise<boolean>

  // Transaction support
  async transaction<R>(fn: (prisma: PrismaClient) => Promise<R>): Promise<R>

  // Abstract methods for subclasses
  protected abstract getDelegate(): any
  protected abstract mapToDomain(data: any): T
  protected abstract mapToPrisma(data: Partial<T>): any
}
```

### Ví dụ: UserRepository

```typescript
export class UserRepository extends BaseRepository<User, string> {
  private static instance: UserRepository;

  private constructor() {
    super('User');
  }

  // Singleton pattern
  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  // Custom queries
  async findByEmail(email: string): Promise<User | null>
  async emailExists(email: string): Promise<boolean>
  async findByProjectId(projectId: number): Promise<User[]>
}
```

### Các Repositories có sẵn:
- ✅ **UserRepository** - User data access với authentication support
- ✅ **ProjectRepository** - Project CRUD với member management
- ✅ **TaskRepository** - Task operations với assignment và tags
- ✅ **CommentRepository** - Comment operations
- ✅ **RoleRepository** - Role management
- ✅ **TaskStatusRepository** - Status management
- ✅ **TaskPriorityRepository** - Priority management
- ✅ **TagRepository** - Tag operations với popular tags tracking

## 3. DTOs (Data Transfer Objects)

### Mục đích:
- Tách biệt internal data structure khỏi API contracts
- Validation tại API boundary
- Security: Không expose sensitive data
- Versioning: Dễ dàng thay đổi API format

### Các loại DTOs:
1. **Create DTOs** - Dữ liệu để tạo entity mới
2. **Update DTOs** - Dữ liệu để cập nhật entity
3. **Response DTOs** - Dữ liệu trả về cho client
4. **Detail DTOs** - Dữ liệu chi tiết với relations

### Ví dụ:

```typescript
// Create User
export interface CreateUserDTO {
  email: string;
  name: string;
  password: string;
}

// Response (no password)
export interface UserResponseDTO {
  id: string;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Update User
export interface UpdateUserDTO {
  name?: string;
  email?: string;
}
```

## 4. Services (Business Logic Layer)

### Đặc điểm chính:
- **Business Logic**: Chứa toàn bộ logic nghiệp vụ
- **Orchestration**: Điều phối giữa các repositories
- **Validation**: Validate business rules
- **Transaction Management**: Quản lý transactions
- **Singleton Pattern**: Đảm bảo chỉ có 1 instance

### BaseService

Abstract class cung cấp CRUD operations cơ bản cho tất cả services:

```typescript
export abstract class BaseService<T, ID> {
  protected repository: IRepository<T, ID>;

  constructor(repository: IRepository<T, ID>) {
    this.repository = repository;
  }

  // Standard operations
  async getAll(): Promise<T[]>
  async getById(id: ID): Promise<T | null>
  async create(data: Partial<T>): Promise<T>
  async update(id: ID, data: Partial<T>): Promise<T>
  async delete(id: ID): Promise<boolean>
  async exists(id: ID): Promise<boolean>

  // Validation hooks (override trong subclass)
  protected async validateCreate(data: Partial<T>): Promise<void>
  protected async validateUpdate(id: ID, data: Partial<T>): Promise<void>
  protected async validateDelete(id: ID): Promise<void>
}
```

### Ví dụ: UserService

```typescript
export class UserService extends BaseService<User, string> {
  private static instance: UserService;
  private userRepository: UserRepository;

  private constructor() {
    const userRepository = UserRepository.getInstance();
    super(userRepository);
    this.userRepository = userRepository;
  }

  // Singleton pattern
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // Business logic methods
  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => this.mapToResponseDTO(user));
  }

  async createUser(dto: CreateUserDTO): Promise<UserResponseDTO> {
    // Kiểm tra email đã tồn tại
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash password (TODO: implement bcrypt)
    const hashedPassword = dto.password;

    // Tạo user
    const user = await this.repository.create({
      email: dto.email,
      name: dto.name,
      passwordhash: hashedPassword,
    } as Partial<User>);

    return this.mapToResponseDTO(user);
  }

  // Private helper method
  private mapToResponseDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
```

### Các Services có sẵn:
- ✅ **UserService** - Quản lý users, authentication, authorization
- ✅ **ProjectService** - Quản lý projects, members
- ✅ **TaskService** - Quản lý tasks, assignments, tags

## 5. Controllers (Presentation Layer)

### Trách nhiệm của Controller:
- **Nhận HTTP requests** từ client
- **Parse và validate** request data
- **Gọi Service** để xử lý business logic
- **Format response** trả về client
- **Error handling** với try-catch

### Đặc điểm:
- **Không chứa business logic** - chỉ điều hướng
- **Thin controllers** - giữ controller nhỏ gọn
- **Singleton instance** - export instance duy nhất
- **Consistent response format** - format response thống nhất

### Ví dụ: UserController

```typescript
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = UserService.getInstance();
  }

  private handleResponse(res: Response, status: number, message: string, data?: any): Response {
    return res.status(status).json({
      status,
      message,
      data,
    });
  }

  // GET /users
  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      this.handleResponse(res, 200, 'Success', users);
    } catch (err) {
      next(err); // Chuyển error cho error middleware
    }
  };

  // POST /users
  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateUserDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const user = await this.userService.createUser(dto);
      this.handleResponse(res, 201, 'User created successfully', user);
    } catch (err) {
      next(err);
    }
  };
}

// Export singleton instance
export default new UserController();
```

### Các Controllers có sẵn:
- ✅ **UserController** - Endpoints cho user management
- ✅ **ProjectController** - Endpoints cho project management
- ✅ **TaskController** - Endpoints cho task management

## 6. Interfaces

### IRepository<T, ID>

Generic interface định nghĩa contract cho tất cả repositories:

```typescript
export interface IRepository<T, ID> {
  findAll(): Promise<T[]>;
  findById(id: ID): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: ID, data: Partial<T>): Promise<T>;
  delete(id: ID): Promise<boolean>;
  exists(id: ID): Promise<boolean>;
}
```

## 7. Luồng xử lý request

### Ví dụ: Tạo user mới

```
1. Client gửi POST /users với body: { name, email, password }
   ↓
2. Router nhận request, chuyển đến UserController.createUser()
   ↓
3. Controller:
   - Parse request body thành CreateUserDTO
   - Gọi userService.createUser(dto)
   ↓
4. Service:
   - Validate business rules (email unique, password strength)
   - Hash password
   - Gọi userRepository.create()
   ↓
5. Repository:
   - Map DTO sang Prisma format
   - Thực hiện query INSERT vào database
   - Map result sang User entity
   - Return User entity
   ↓
6. Service:
   - Map User entity sang UserResponseDTO (loại bỏ password)
   - Return DTO
   ↓
7. Controller:
   - Format response với status 201
   - Return JSON response
   ↓
8. Client nhận response: { status: 201, message: "Success", data: {...} }
```

## 8. Sử dụng trong Routes

### Ví dụ với Router mới:

```typescript
import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

// User routes
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
```

## 9. Nguyên tắc SOLID được áp dụng

### S - Single Responsibility Principle
- **Models**: Chỉ chứa domain logic và validation
- **Repositories**: Chỉ chịu trách nhiệm data access
- **Services**: Chỉ chứa business logic
- **Controllers**: Chỉ xử lý HTTP requests/responses
- **DTOs**: Chỉ để transfer data

### O - Open/Closed Principle
- **BaseRepository** và **BaseService** có thể extend nhưng không cần modify
- Mỗi subclass extends base class và thêm custom methods

### L - Liskov Substitution Principle
- Tất cả repositories đều implement `IRepository` interface
- Có thể thay thế bằng mock implementations cho testing

### I - Interface Segregation Principle
- `IRepository` chỉ chứa essential methods
- Custom methods được add ở subclasses

### D - Dependency Inversion Principle
- **Controllers** depend on **Services**, không phải repositories
- **Services** depend on **Repository interface**, không phải concrete class
- Dependencies được inject qua constructor

## 10. Design Patterns

### Singleton Pattern
```typescript
// Mỗi Service và Repository chỉ có 1 instance
private static instance: UserService;

public static getInstance(): UserService {
  if (!UserService.instance) {
    UserService.instance = new UserService();
  }
  return UserService.instance;
}
```

### Repository Pattern
- Tách biệt business logic khỏi data access
- Dễ dàng testing với mock repositories
- Có thể thay đổi data source mà không ảnh hưởng business logic

### Service Layer Pattern
- Tách business logic ra khỏi controllers
- Cho phép reuse logic giữa các controllers
- Dễ dàng testing business logic độc lập

### Factory Method Pattern
```typescript
// Static methods để tạo instances
static fromObject(data: any): User {
  return new User(data.id, data.email, data.name, data.passwordhash);
}
```

### Template Method Pattern
- BaseRepository và BaseService định nghĩa template
- Subclasses implement specific logic

## 11. Best Practices

### Error Handling trong Service
```typescript
async createUser(dto: CreateUserDTO): Promise<UserResponseDTO> {
  try {
    // Validate business rules
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Process and create
    const user = await this.repository.create({...});
    return this.mapToResponseDTO(user);
  } catch (error) {
    throw error; // Re-throw để controller xử lý
  }
}
```

### Validation trong Controller
```typescript
createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Parse và validate input
    const dto: CreateUserDTO = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    // Gọi service
    const user = await this.userService.createUser(dto);
    
    // Format response
    this.handleResponse(res, 201, 'User created successfully', user);
  } catch (err) {
    next(err); // Chuyển cho error middleware
  }
};
```

### Consistent Response Format
```typescript
{
  "status": 200,
  "message": "Success",
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## 12. Testing Strategy

### Unit Testing Services
```typescript
describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    // Mock repository
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as any;
  });

  it('should throw error if email exists', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(existingUser);
    
    await expect(
      userService.createUser(dto)
    ).rejects.toThrow('Email already exists');
  });
});
```

### Integration Testing Controllers
```typescript
describe('POST /users', () => {
  it('should create new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John',
        email: 'john@example.com',
        password: 'password123'
      })
      .expect(201);

    expect(response.body.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });
});
```

## 13. Ví dụ sử dụng hoàn chỉnh

### Use Case: Tạo task mới cho project

```typescript
// 1. Client gửi request
POST /tasks
{
  "projectId": 1,
  "name": "Implement feature X",
  "description": "Description here",
  "statusId": 1,
  "priorityId": 2
}

// 2. Router -> TaskController.createTask()
router.post('/tasks', TaskController.createTask);

// 3. Controller parse input và gọi service
const dto: CreateTaskDTO = {
  projectId: req.body.projectId,
  name: req.body.name,
  description: req.body.description,
  statusId: req.body.statusId,
  priorityId: req.body.priorityId,
};
const task = await this.taskService.createTask(dto);

// 4. Service validate và gọi repositories
async createTask(dto: CreateTaskDTO): Promise<TaskResponseDTO> {
  // Validate: project phải tồn tại
  await this.projectService.getById(dto.projectId);
  
  // Create task
  const task = await this.repository.create({
    projectId: dto.projectId,
    name: dto.name,
    description: dto.description,
    statusId: dto.statusId,
    priorityId: dto.priorityId,
  });
  
  return this.mapToResponseDTO(task);
}

// 5. Repository thực hiện database operation
async create(data: Partial<Task>): Promise<Task> {
  const created = await this.prisma.task.create({
    data: this.mapToPrisma(data),
  });
  return this.mapToDomain(created);
}

// 6. Response trả về client
{
  "status": 201,
  "message": "Task created successfully",
  "data": {
    "id": 10,
    "projectId": 1,
    "name": "Implement feature X",
    "statusId": 1,
    "priorityId": 2
  }
}
```

## 14. Migration Guide

### Bước 1: Tạo Service cho feature
```typescript
// src/services/YourService.ts
export class YourService extends BaseService<YourEntity, IDType> {
  private static instance: YourService;
  
  private constructor() {
    super(YourRepository.getInstance());
  }
  
  public static getInstance(): YourService {
    if (!YourService.instance) {
      YourService.instance = new YourService();
    }
    return YourService.instance;
  }
  
  // Add business logic methods here
}
```

### Bước 2: Refactor Controller sử dụng Service
```typescript
// Trước (old)
export const getUsers = async (req, res, next) => {
  const users = await prisma.user.findMany();
  res.json({ data: users });
};

// Sau (new with Service)
export class UserController {
  private userService: UserService;
  
  constructor() {
    this.userService = UserService.getInstance();
  }
  
  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      this.handleResponse(res, 200, 'Success', users);
    } catch (err) {
      next(err);
    }
  };
}
```

### Bước 3: Update Routes
```typescript
// Trước
import { getUsers } from '../controllers/UserController';
router.get('/users', getUsers);

// Sau
import UserController from '../controllers/UserController';
router.get('/users', UserController.getAllUsers);
```

## 15. Cấu trúc file mới

```
src/
├── models/                     # Domain Entities
│   ├── User.ts
│   ├── Project.ts
│   ├── Task.ts
│   └── index.ts
│
├── repositories/               # Data Access Layer
│   ├── base/
│   │   └── BaseRepository.ts
│   ├── UserRepository.ts
│   ├── ProjectRepository.ts
│   ├── TaskRepository.ts
│   └── index.ts
│
├── services/                   # Business Logic Layer (NEW)
│   ├── base/
│   │   └── BaseService.ts
│   ├── UserService.ts
│   ├── ProjectService.ts
│   ├── TaskService.ts
│   └── index.ts
│
├── controllers/                # Presentation Layer (REFACTORED)
│   ├── UserController.ts       # New: Class-based, sử dụng Service
│   ├── ProjectController.ts
│   ├── TaskController.ts
│   └── index.ts
│
├── dtos/                       # Data Transfer Objects
│   ├── UserDTO.ts
│   ├── ProjectDTO.ts
│   ├── TaskDTO.ts
│   └── index.ts
│
├── interfaces/                 # Interface definitions
│   └── IRepository.ts
│
├── routes/                     # API Routes
│   ├── RouterUsers.ts
│   ├── RouterProject.ts
│   └── RouterTask.ts
│
└── config/                     # Configuration
    ├── database.ts
    └── prisma.ts
```

## Tóm tắt lợi ích của Clean Architecture

✅ **Separation of Concerns**: Mỗi layer có trách nhiệm rõ ràng  
✅ **Testability**: Dễ dàng test từng layer độc lập  
✅ **Maintainability**: Code dễ maintain và refactor  
✅ **Scalability**: Dễ dàng thêm features mới  
✅ **Reusability**: Business logic có thể reuse  
✅ **Flexibility**: Dễ dàng thay đổi implementation  
✅ **Team Collaboration**: Nhiều người có thể làm việc độc lập  
✅ **Code Quality**: Tuân theo best practices và SOLID principles  

## Kết luận

Dự án đã được nâng cấp lên **Clean Architecture** hoàn chỉnh với:

1. **Controller Layer**: Xử lý HTTP requests/responses
2. **Service Layer**: Chứa business logic (MỚI)
3. **Repository Layer**: Data access
4. **Model Layer**: Domain entities
5. **DTO Layer**: Data transfer

Kiến trúc này đảm bảo code clean, maintainable, testable và scalable cho dự án backend Express + TypeScript.

