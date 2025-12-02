# JWT Authentication - Hệ thống xác thực người dùng

## 📌 Khái niệm quan trọng

### 🔑 SECRET KEY vs TOKEN - PHÂN BIỆT RÕ RÀNG

| Thứ | Là gì | Lưu ở đâu | Thay đổi | Ví dụ |
|-----|-------|-----------|----------|-------|
| **SECRET KEY** | Khóa bí mật dùng để TẠO và VERIFY token | `.env` file trên server | ❌ Không (trừ khi rotate) | `"abc123xyz789..."` |
| **Access Token** | Mã JWT để xác thực API | Client memory/localStorage | ✅ Mỗi lần login/refresh | `"eyJhbGc..."` |
| **Refresh Token** | Mã JWT để tạo access token mới | httpOnly Cookie + DB | ✅ Mỗi lần login/refresh | `"eyJhbGc..."` |

### ⚠️ LƯU Ý QUAN TRỌNG

```bash
# ❌ SAI - KHÔNG BAO GIỜ LƯU TOKEN VÀO ENV
ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
REFRESH_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ✅ ĐÚNG - CHỈ LƯU SECRET KEY
JWT_ACCESS_SECRET=your-super-secret-key-for-signing-tokens
JWT_REFRESH_SECRET=your-super-secret-key-for-refresh-tokens
```

## 🔐 Cách JWT hoạt động

### 1. Tạo Token (Signing)

```typescript
// Server TẠO token từ SECRET KEY
const token = jwt.sign(
  { userId: "123", email: "user@mail.com" },  // ← Data (payload)
  process.env.JWT_ACCESS_SECRET,              // ← SECRET KEY từ ENV
  { expiresIn: "2h" }                         // ← Thời hạn
);

// Kết quả: eyJhbGc... ← Token này GỬI CHO CLIENT
// KHÔNG lưu token vào ENV!
```

### 2. Verify Token

```typescript
// Server VERIFY token bằng SECRET KEY
const decoded = jwt.verify(
  token,                            // ← Token từ client
  process.env.JWT_ACCESS_SECRET     // ← CÙNG SECRET KEY
);

// Nếu SECRET KEY khớp → ✅ Valid
// Nếu SECRET KEY sai → ❌ Invalid
```

## 🔄 Luồng Authentication hoàn chỉnh

```
┌─────────────────────────────────────────────────────────┐
│ 1️⃣ LOGIN                                                │
├─────────────────────────────────────────────────────────┤
│ Client: POST /auth/login                                │
│   Body: { email, password }                             │
│                                                          │
│ Server:                                                  │
│   ✓ Verify password                                     │
│   ✓ TẠO Access Token = sign(data, ACCESS_SECRET, 2h)    │
│   ✓ TẠO Refresh Token = sign(data, REFRESH_SECRET, 10h) │
│   ✓ Lưu HASH của Refresh Token vào DB                   │
│   ✓ Gửi tokens cho client                               │
│                                                          │
│ Response:                                                │
│   - accessToken: "eyJhbGc..." (trong body)              │
│   - refreshToken: "eyJhbGc..." (trong httpOnly cookie)  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 2️⃣ SỬ DỤNG API (Trong 2 giờ)                           │
├─────────────────────────────────────────────────────────┤
│ Client: GET /api/tasks                                  │
│   Headers: Authorization: Bearer <access_token>         │
│                                                          │
│ Server:                                                  │
│   ✓ verify(access_token, ACCESS_SECRET)                 │
│   ✓ Check thời hạn                                      │
│   → ✅ Valid → Cho phép truy cập                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 3️⃣ ACCESS TOKEN HẾT HẠN (Sau 2 giờ)                    │
├─────────────────────────────────────────────────────────┤
│ Client: GET /api/tasks                                  │
│   Headers: Authorization: Bearer <expired_token>        │
│                                                          │
│ Server:                                                  │
│   ✓ verify → ❌ Token expired                          │
│   → Trả về 401 Unauthorized                             │
│                                                          │
│ Client:                                                  │
│   ✓ Tự động gọi POST /auth/refresh                      │
│   ✓ Gửi refresh token (từ cookie)                       │
│                                                          │
│ Server:                                                  │
│   ✓ verify(refresh_token, REFRESH_SECRET)               │
│   ✓ Check hash trong DB                                 │
│   ✓ Check IP/User Agent (detect hacker)                 │
│   → ✅ Valid                                            │
│   ✓ TẠO access token MỚI (2h mới)                       │
│   ✓ TẠO refresh token MỚI (10h mới)                     │
│   ✓ Gửi tokens mới                                      │
│                                                          │
│ Client:                                                  │
│   ✓ Lưu access token mới                                │
│   ✓ Retry API request với token mới                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 4️⃣ LOGOUT                                               │
├─────────────────────────────────────────────────────────┤
│ Client: POST /auth/logout                               │
│   Headers: Authorization: Bearer <access_token>         │
│   Cookie: refreshToken                                  │
│                                                          │
│ Server:                                                  │
│   ✓ Xóa refresh token khỏi DB                           │
│   ✓ Clear cookie                                        │
│   → Client không thể refresh nữa                        │
└─────────────────────────────────────────────────────────┘
```

## 🛡️ Bảo mật

### Tại sao cần 2 SECRET KEYS khác nhau?

```typescript
// Nếu Access Token bị đánh cắp:
// → Hacker chỉ sử dụng được trong 2 giờ
// → Không thể refresh vì REFRESH_SECRET khác

// Nếu Refresh Token bị đánh cắp:
// → Server detect thay đổi IP/User Agent
// → Tự động revoke tất cả sessions
```

### 🔄 Refresh Token Rotation - Bảo vệ khỏi Token Theft

**Vấn đề:** Nếu refresh token bị đánh cắp và giữ nguyên không đổi, hacker có thể dùng nó suốt 10 giờ.

**Giải pháp:** Mỗi khi làm mới access token → **TẠO MỚI CẢ REFRESH TOKEN**

#### Cách hoạt động:

```typescript
// 1. User làm mới access token
POST /auth/refresh
→ Server verify refresh token cũ
→ Tạo access token MỚI (2h)
→ Tạo refresh token MỚI (10h)  ← QUAN TRỌNG
→ XÓA refresh token cũ khỏi DB
→ Lưu refresh token mới vào DB

// 2. Nếu hacker lấy được refresh token cũ
→ Dùng token cũ để refresh
→ Server phát hiện token cũ đã bị revoke
→ ❌ REJECT và revoke TẤT CẢ sessions của user
→ User phải login lại
```

#### So sánh 2 chiến lược:

| Tiêu chí | **Không rotation** | **Có rotation** |
|----------|-------------------|-----------------|
| **Bảo mật** | ❌ Token bị đánh cắp dùng được 10h | ✅ Token bị đánh cắp chỉ dùng 1 lần |
| **Phát hiện theft** | ❌ Không phát hiện được | ✅ Phát hiện ngay khi reuse |
| **Token reuse** | ⚠️ Cho phép dùng lại | ✅ Reject token reuse |
| **IP/UA tracking** | ❌ Không cập nhật | ✅ Cập nhật mỗi lần refresh |
| **Performance** | ✅ 2 DB queries | ⚠️ 3 DB queries (+1 query) |
| **Khuyến nghị** | ❌ Không an toàn | ✅ **Best practice** |

#### Automatic Reuse Detection:

```typescript
// Kịch bản: Token bị đánh cắp
1. User refresh → Nhận token mới (tokenB)
2. Hacker dùng token cũ (tokenA) → ❌ Server reject
3. Server phát hiện token reuse → 🚨 ALERT
4. Server revoke ALL sessions → User phải login lại
```

**Trade-off:** +5-10ms cho mỗi lần refresh (mỗi 2h), nhưng **BẢO MẬT TỐT HƠN NHIỀU**.

### Token Storage

| Token | Lưu ở Client | Lý do |
|-------|--------------|-------|
| Access Token | `Memory/State` | Ngắn hạn, mất khi reload, tránh XSS |
| Refresh Token | `httpOnly Cookie` | Bảo mật, JavaScript không đọc được, tránh XSS |

**⚠️ Lưu ý:**
- ❌ **KHÔNG** lưu token vào `localStorage` → dễ bị XSS attack
- ❌ **KHÔNG** lưu token vào `sessionStorage` → vẫn truy cập được qua JavaScript
- ✅ **NÊN** dùng `httpOnly` cookie cho refresh token
- ✅ **NÊN** dùng memory/state cho access token

### Database Security

```typescript
// ❌ KHÔNG lưu refresh token thô vào DB
refreshToken: "eyJhbGc..."

// ✅ Chỉ lưu HASH
refreshTokenHash: "a1b2c3d4..." // SHA256 hash

// Lý do: Nếu DB bị hack, hacker vẫn không dùng được token
```

### IP & User Agent Tracking

```typescript
// Lưu thông tin mỗi lần login/refresh
RefreshTokenSession {
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0 Chrome/120.0..."
}

// Khi refresh, kiểm tra thay đổi
if (session.hasIpChanged(currentIp)) {
  await revokeSession();
  throw new Error('Suspicious activity detected');
}
```

**Mục đích:**
- Phát hiện token bị đánh cắp từ IP khác
- Cảnh báo khi thiết bị lạ truy cập
- Tự động revoke session nếu nghi ngờ

### Session Revocation

```typescript
// Logout khỏi thiết bị hiện tại
POST /auth/logout
→ Xóa 1 refresh token session

// Logout khỏi TẤT CẢ thiết bị
POST /auth/logout-all
→ Xóa ALL refresh token sessions của user

// Background job: Xóa sessions hết hạn
CRON: 0 0 * * *  // Mỗi ngày 00:00
→ DELETE expired sessions từ DB
```

## 📝 Cấu hình

### 1. Environment Variables (`.env`)

```bash
# Khóa bí mật để ký token (32-64 characters)
JWT_ACCESS_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-secret-key-here
```

### 2. Generate Strong Secret Keys

```bash
# Dùng Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Hoặc dùng OpenSSL
openssl rand -base64 64
```

### 3. Token Configuration

File: `src/config/jwt.ts`

```typescript
export const jwtConfig = {
  accessTokenExpiresIn: "2h",    // Access token: 2 giờ
  refreshTokenExpiresIn: "10h",  // Refresh token: 10 giờ
  
  // SECRET KEYS từ ENV
  accessTokenSecretKey: process.env.JWT_ACCESS_SECRET,
  refreshTokenSecretKey: process.env.JWT_REFRESH_SECRET,
};
```

## 🔧 API Endpoints

### POST `/auth/login`
Đăng nhập và nhận tokens

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name"
    }
  }
}
```
*Refresh token được gửi trong httpOnly cookie*

### POST `/auth/refresh`
Làm mới access token

**Request:** Refresh token trong cookie

**Response:**
```json
{
  "status": 200,
  "message": "Token refreshed",
  "data": {
    "accessToken": "eyJhbGc..."
  }
}
```

### POST `/auth/logout`
Đăng xuất

**Headers:** `Authorization: Bearer <accessToken>`

**Response:**
```json
{
  "status": 200,
  "message": "Logout successful"
}
```

### POST `/auth/logout-all`
Đăng xuất khỏi tất cả devices

**Headers:** `Authorization: Bearer <accessToken>`

**Response:**
```json
{
  "status": 200,
  "message": "Logged out from all devices"
}
```

## 🎯 Best Practices

### Bảo mật

1. ✅ **Luôn dùng HTTPS** trong production
   - Mã hóa tất cả traffic giữa client và server
   - Ngăn chặn man-in-the-middle attacks

2. ✅ **Rotate SECRET KEYS** định kỳ (3-6 tháng)
   - Giảm thiểu rủi ro nếu key bị lộ
   - Update key mà không ảnh hưởng users

3. ✅ **Set httpOnly cookie** cho refresh token
   - JavaScript không đọc được → tránh XSS
   - Chỉ server mới truy cập được

4. ✅ **Validate IP/User Agent** để detect hacker
   - Phát hiện token bị dùng từ IP khác
   - Tự động revoke nếu nghi ngờ

5. ✅ **Cleanup expired sessions** định kỳ
   - Chạy cron job xóa sessions hết hạn
   - Giữ DB gọn nhẹ, tránh memory leak

6. ✅ **Hash refresh token** trước khi lưu DB
   - Dùng SHA256 để hash
   - Ngay cả khi DB bị hack, token vẫn an toàn

7. ✅ **Implement Refresh Token Rotation**
   - Tạo token mới mỗi lần refresh
   - Phát hiện token reuse → revoke all sessions

8. ✅ **Rate limiting** cho auth endpoints
   - Giới hạn số lần login/refresh
   - Ngăn chặn brute force attacks

9. ❌ **KHÔNG lưu token** vào localStorage (XSS risk)
   - localStorage truy cập được qua JavaScript
   - Dễ bị đánh cắp qua XSS attack

10. ❌ **KHÔNG gửi sensitive data** trong token payload
    - Token có thể decode được
    - Chỉ lưu user ID, không lưu password/secrets

11. ❌ **KHÔNG lưu token** vào ENV file
    - ENV chứa SECRET KEY, không phải token
    - Token được generate runtime

### Performance

#### 1. Database Optimization

```typescript
// Index cho queries nhanh
// prisma/schema.prisma
model RefreshTokenSession {
  id               String    @id @default(uuid())
  userId           String
  refreshTokenHash String    @unique  // ← Index tự động
  expiresAt        DateTime
  ipAddress        String?
  
  @@index([userId, expiresAt])  // ← Composite index
  @@index([expiresAt])           // ← Cleanup queries
}
```

**Lợi ích:**
- Query by `refreshTokenHash`: O(1) lookup
- Query by `userId + expiresAt`: Nhanh hơn 10-100x
- Cleanup expired sessions: Scan hiệu quả hơn

#### 2. Connection Pooling

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// .env
DATABASE_URL="postgresql://user:pass@localhost:5432/db?connection_limit=20&pool_timeout=10"
```

**Tác động:**
- Giảm thời gian tạo connection (~50-100ms)
- Tăng concurrent requests xử lý được
- Tránh connection exhaustion

#### 3. Caching với Redis (Optional)

```typescript
import Redis from 'ioredis';
const redis = new Redis();

// Cache user data khi refresh token
async refreshAccessToken(token: string) {
  const userId = decoded.userId;
  
  // Check cache trước
  let user = await redis.get(`user:${userId}`);
  if (!user) {
    user = await userRepo.findById(userId);  // DB query
    await redis.setex(`user:${userId}`, 300, JSON.stringify(user));  // Cache 5 phút
  }
  
  return generateTokens(user);
}
```

**Khi nào cần:**
- ✅ > 10,000 concurrent users
- ✅ DB queries > 50ms
- ✅ Refresh token được dùng thường xuyên
- ❌ Không cần nếu < 10,000 users

#### 4. Background Jobs

```typescript
// Cleanup expired sessions - chạy mỗi ngày
import cron from 'node-cron';

cron.schedule('0 0 * * *', async () => {
  await refreshTokenRepo.deleteExpiredSessions();
  console.log('Cleaned up expired sessions');
});
```

**Tác động:**
- Giữ DB nhỏ gọn
- Tránh full table scan
- Cải thiện query performance

#### 5. Performance Metrics

| Thao tác | Không optimize | Có optimize | Cải thiện |
|----------|---------------|-------------|-----------|
| **Login** | ~50-100ms | ~30-50ms | 40% nhanh hơn |
| **Refresh Token** | ~30-50ms | ~15-25ms | 50% nhanh hơn |
| **Verify Access Token** | ~1-2ms | ~1-2ms | Không đổi (JWT local) |
| **Logout** | ~20-30ms | ~10-15ms | 50% nhanh hơn |

#### 6. Load Testing

```bash
# Test với Apache Bench
ab -n 1000 -c 100 -H "Authorization: Bearer <token>" http://localhost:3000/api/users

# Test với Artillery
artillery quick --count 100 --num 10 http://localhost:3000/auth/login

# Metrics cần theo dõi:
# - Response time: < 100ms
# - Throughput: > 500 req/s
# - Error rate: < 0.1%
```

#### 7. Khi nào lo về Performance?

| Số lượng users | Refresh mỗi | Tác động | Giải pháp |
|----------------|-------------|----------|-----------|
| < 1,000 | 2 giờ | ✅ Không đáng kể | Không cần optimize |
| 1,000 - 10,000 | 2 giờ | ⚠️ Nhỏ (~1%) | DB indexing |
| 10,000 - 100,000 | 1 giờ | ⚠️ Trung bình (~5%) | Redis cache + indexing |
| > 100,000 | < 30 phút | ❌ Lớn (>10%) | Redis + Read replicas + CDN |

**Kết luận:** Với project quản lý task (< 10,000 users), rotation **HOÀN TOÀN OK** về performance! 🚀

## 🐛 Troubleshooting

### Token Invalid

```
Error: Invalid or expired access token
```

**Nguyên nhân:**
- SECRET KEY trong ENV không khớp
- Token bị modify
- Token đã hết hạn

**Giải pháp:**
- Check `.env` file có đúng SECRET KEY
- Verify token chưa bị sửa đổi
- Dùng refresh token để lấy token mới

### Suspicious Activity Detected

```
Error: Suspicious activity detected. All sessions have been revoked.
```

**Nguyên nhân:**
- IP address hoặc User Agent thay đổi

**Giải pháp:**
- User cần login lại
- Check có phải VPN/Proxy đổi IP không

### Refresh Token Reuse Detected

```
Error: Refresh token has already been used
```

**Nguyên nhân:**
- Token rotation đang hoạt động
- Có thể token bị đánh cắp và dùng 2 lần

**Giải pháp:**
- Tất cả sessions của user đã bị revoke
- User phải login lại
- Kiểm tra có thiết bị lạ không

### Performance Issues

#### Vấn đề: Response time > 100ms

**Nguyên nhân:**
- Quá nhiều concurrent requests
- Database queries chậm
- Không có indexing

**Giải pháp:**

```typescript
// 1. Thêm database indexes
@@index([userId, expiresAt])
@@index([expiresAt])

// 2. Connection pooling
DATABASE_URL="...?connection_limit=20"

// 3. Cleanup expired sessions
cron.schedule('0 0 * * *', deleteExpiredSessions);
```

#### Vấn đề: Memory leak

**Nguyên nhân:**
- Expired sessions không được xóa
- DB table quá lớn

**Giải pháp:**

```typescript
// Background job xóa sessions hết hạn
async function cleanupExpiredSessions() {
  const deleted = await prisma.refreshTokenSession.deleteMany({
    where: { expiresAt: { lt: new Date() } }
  });
  console.log(`Deleted ${deleted.count} expired sessions`);
}

// Chạy mỗi ngày
cron.schedule('0 0 * * *', cleanupExpiredSessions);
```

#### Vấn đề: Too many DB connections

**Nguyên nhân:**
- Không có connection pooling
- Connection timeout thấp

**Giải pháp:**

```typescript
// .env
DATABASE_URL="postgresql://user:pass@localhost:5432/db?connection_limit=20&pool_timeout=10&connect_timeout=10"

// hoặc
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
}
```

### Security Issues

#### Vấn đề: Token theft

**Dấu hiệu:**
- Nhiều IP khác nhau dùng cùng token
- User Agent thay đổi liên tục
- Sessions bị revoke tự động

**Giải pháp:**
- Đã có IP/UA tracking
- Đã có automatic revocation
- User cần đổi password

#### Vấn đề: Brute force login

**Dấu hiệu:**
- Nhiều login attempts từ cùng IP
- Nhiều failed logins liên tiếp

**Giải pháp:**

```typescript
// Rate limiting middleware
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 phút
  max: 5,                     // 5 attempts
  message: 'Too many login attempts, please try again later'
});

app.post('/auth/login', loginLimiter, authController.login);
```

## 📊 Monitoring & Analytics

### Metrics cần theo dõi

```typescript
// 1. Auth success/failure rate
{
  loginAttempts: 1000,
  loginSuccess: 950,
  loginFailure: 50,
  successRate: 95%
}

// 2. Token refresh rate
{
  refreshAttempts: 500,
  refreshSuccess: 490,
  refreshFailure: 10,
  avgResponseTime: 25ms
}

// 3. Active sessions
{
  totalSessions: 5000,
  activeSessions: 3000,
  expiredSessions: 2000
}

// 4. Security events
{
  suspiciousActivityDetected: 5,
  tokensRevoked: 10,
  ipChanges: 15,
  uaChanges: 8
}
```

### Logging Best Practices

```typescript
// Log important events
logger.info('User logged in', {
  userId,
  ipAddress,
  userAgent,
  timestamp: new Date()
});

logger.warn('Suspicious activity detected', {
  userId,
  oldIp: session.ipAddress,
  newIp: currentIp,
  timestamp: new Date()
});

logger.error('Token refresh failed', {
  userId,
  reason: error.message,
  timestamp: new Date()
});
```

## 📚 Tài liệu tham khảo

- [JWT.io](https://jwt.io/)
- [OWASP JWT Security](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
