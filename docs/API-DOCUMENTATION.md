# 📡 API Documentation

> Complete API Reference for Task Management Backend

## Base URL

```
http://localhost:3001/api
```

## 🔐 Authentication

*Hiện tại API chưa có authentication. Sẽ được thêm trong phiên bản sau.*

---

## 👤 Users API

### Get All Users
```http
GET /api/users
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

### Get User by ID
```http
GET /api/users/:id
```

### Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "passwordhash": "hashed_password"
}
```

### Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Delete User
```http
DELETE /api/users/:id
```

---

## 🎭 Roles API

### Get All Roles
```http
GET /api/roles
```

### Get Role by ID
```http
GET /api/roles/:id
```

### Create Role
```http
POST /api/roles
Content-Type: application/json

{
  "name": "Developer",
  "description": "Software Developer Role"
}
```

### Update Role
```http
PUT /api/roles/:id
Content-Type: application/json

{
  "name": "Senior Developer",
  "description": "Senior Software Developer"
}
```

### Delete Role
```http
DELETE /api/roles/:id
```

---

## 📁 Projects API

### Get All Projects
```http
GET /api/projects
```

### Get Project by ID
```http
GET /api/projects/:id
```

### Get Project Members
```http
GET /api/projects/:id/member
```

**Response:**
```json
[
  {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "role": {
      "id": 1,
      "name": "Developer"
    }
  }
]
```

### Create Project
```http
POST /api/projects
Content-Type: application/json

{
  "name": "Task Management System",
  "description": "Project description"
}
```

### Update Project
```http
PUT /api/projects/:id
Content-Type: application/json

{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

### Add Member to Project
```http
POST /api/projects/:id/members
Content-Type: application/json

{
  "userId": "user-uuid",
  "roleId": 1
}
```

### Remove Member from Project
```http
DELETE /api/projects/:projectId/members/:userId
```

### Delete Project
```http
DELETE /api/projects/:id
```

---

## ✅ Tasks API

### Get All Tasks
```http
GET /api/tasks
```

### Get Task by ID
```http
GET /api/tasks/:id
```

### Get Tasks by Project
```http
GET /api/projects/:id/tasks
```

### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Implement user authentication",
  "description": "Add JWT authentication",
  "projectId": 1,
  "statusId": 1,
  "priorityId": 2,
  "dueDate": "2025-12-31T00:00:00.000Z"
}
```

### Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2025-12-31T00:00:00.000Z"
}
```

### Update Task Status
```http
PUT /api/tasks/:id/status
Content-Type: application/json

{
  "statusId": 2
}
```

### Update Task Priority
```http
PUT /api/tasks/:id/priority
Content-Type: application/json

{
  "priorityId": 3
}
```

### Assign User to Task
```http
POST /api/tasks/:id/assign
Content-Type: application/json

{
  "userId": "user-uuid"
}
```

### Unassign User from Task
```http
DELETE /api/tasks/:taskId/assign/:userId
```

### Add Tags to Task
```http
POST /api/tasks/:id/tags
Content-Type: application/json

{
  "tagIds": [1, 2, 3]
}
```

### Remove Tags from Task
```http
DELETE /api/tasks/:id/tags
Content-Type: application/json

{
  "tagIds": [1, 2]
}
```

### Delete Task
```http
DELETE /api/tasks/:id
```

---

## 💬 Comments API

### Get All Comments
```http
GET /api/comments
```

### Get Comment by ID
```http
GET /api/comments/:id
```

### Get Comments by Task
```http
GET /api/tasks/:taskId/comments
```

### Get Comments by User
```http
GET /api/users/:userId/comments
```

### Create Comment
```http
POST /api/comments
Content-Type: application/json

{
  "content": "This is a comment",
  "taskId": 1,
  "userId": "user-uuid"
}
```

### Update Comment
```http
PUT /api/comments/:id
Content-Type: application/json

{
  "content": "Updated comment content"
}
```

### Delete Comment
```http
DELETE /api/comments/:id
```

### Delete All Comments by Task
```http
DELETE /api/tasks/:taskId/comments
```

---

## 📊 Response Format

### Success Response
```json
{
  "status": 200,
  "message": "Success",
  "data": { ... }
}
```

### Error Response
```json
{
  "status": 400,
  "message": "Error message",
  "data": null
}
```

---

## 🔍 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🧪 Testing với cURL

### Create User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","passwordhash":"password123"}'
```

### Get All Users
```bash
curl http://localhost:3001/api/users
```

### Create Project
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"My Project","description":"Project description"}'
```

---

## 📝 Notes

- Tất cả endpoints trả về JSON
- Dates theo format ISO 8601
- User IDs sử dụng UUID v4
- Numeric IDs (projects, tasks, etc.) sử dụng auto-increment

---

**Xem thêm**: [`TESTING-GUIDE.md`](../TESTING-GUIDE.md) cho examples chi tiết hơn.
