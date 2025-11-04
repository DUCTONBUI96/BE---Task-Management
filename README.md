# Task Management Backend - Docker Setup

## Cấu trúc Docker

Backend này sử dụng Docker Compose với 2 services:
- **PostgreSQL**: Cơ sở dữ liệu
- **Backend**: Node.js Express API

## Cài đặt và Chạy

### 1. Cấu hình môi trường

Sao chép file `.env.example` thành `.env` và cập nhật thông tin:

```bash
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin của bạn:
```
PGUSER=postgres
PGHOST=postgres
PGDATABASE=taskmanagement
PGPASSWORD=your_password_here
PGPORT=5432
```

### 2. Chạy Docker Compose

```bash
# Khởi động tất cả services
docker-compose up -d

# Hoặc build lại và chạy
docker-compose up --build -d
```

### 3. Kiểm tra logs

```bash
# Xem logs của tất cả services
docker-compose logs -f

# Xem logs của backend
docker-compose logs -f backend

# Xem logs của postgres
docker-compose logs -f postgres
```

## Truy cập

- **Backend API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

Frontend có thể kết nối đến backend qua: `http://localhost:3001/api`

## Các lệnh hữu ích

```bash
# Dừng services
docker-compose down

# Dừng và xóa volumes (xóa dữ liệu database)
docker-compose down -v

# Restart services
docker-compose restart

# Xem trạng thái services
docker-compose ps

# Truy cập vào container backend
docker exec -it task-management-backend sh

# Truy cập vào container postgres
docker exec -it task-management-postgres psql -U postgres -d taskmanagement
```

## Development Mode

Nếu muốn chạy ở development mode với hot-reload, bạn có thể chạy backend local:

```bash
npm install
npm run dev
```

Và chỉ chạy PostgreSQL trong Docker:

```bash
docker-compose up postgres -d
```

## Lưu ý

- Port **3001** được sử dụng cho backend API
- Database data được lưu trong Docker volume `postgres_data`
- Backend tự động đợi PostgreSQL sẵn sàng trước khi khởi động (healthcheck)
