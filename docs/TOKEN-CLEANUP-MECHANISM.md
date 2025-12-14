# Token Cleanup Mechanism

## Overview

Cơ chế tự động xóa expired refresh tokens từ database theo định kỳ (mặc định mỗi 60 phút).

## Motivation

**Vấn đề:**
- Expired tokens vẫn tồn tại trong database dù không thể sử dụng
- Database sẽ phình ra theo thời gian nếu không cleanup
- Nếu DB bị compromise, attacker có thể xem được các expired tokens
- Defense-in-depth: nếu có lỗ hổng trong token validation, expired tokens vẫn có thể bị khai thác

**Giải pháp:**
- Tự động xóa expired tokens định kỳ (periodic cleanup)
- Xóa expired tokens khi user login lại (lazy cleanup)
- Thêm database indexes để tối ưu query cleanup
- Cung cấp API để admin trigger manual cleanup

## Architecture

### 1. TokenCleanupJob (Scheduler)
File: `src/jobs/TokenCleanupJob.ts`

Singleton job chạy định kỳ để cleanup expired tokens:
- Chạy mỗi 60 phút (configurable via `TOKEN_CLEANUP_INTERVAL_MINUTES` env var)
- Chạy lần đầu ngay khi server startup
- Có thể dừng gracefully khi server shutdown
- Có method trigger manual cleanup (dùng cho testing/monitoring)

```typescript
// Auto cleanup mỗi 60 phút
const cleanupJob = TokenCleanupJob.getInstance(60);
cleanupJob.start();

// Manual trigger
await cleanupJob.triggerManualCleanup();

// Stop khi shutdown
cleanupJob.stop();
```

### 2. Database Indexes
File: `prisma/schema.prisma`

Thêm 2 indexes để tối ưu cleanup queries:
```prisma
@@index([expiresAt])              // Tìm expired tokens nhanh hơn
@@index([userId, expiresAt])      // Cleanup per-user nhanh hơn
```

Migration: `20251214123530_add_indexes_for_token_cleanup`

### 3. Repository Methods
File: `src/repositories/RefreshTokenSessionRepository.ts`

Các method liên quan cleanup:
- `deleteExpiredSessions(userId?: string)` - Xóa all expired tokens (global hoặc per-user)
- `revokeAllUserSessions(userId)` - Revoke tất cả sessions (logout all devices)
- `revokeSession(sessionId)` - Revoke single session (logout single device)

### 4. Service Integration
File: `src/services/AuthService.ts`

Cleanup đã được integrate ở:
- **Login**: Gọi `deleteExpiredSessions(userId)` để cleanup expired tokens của user
- **Refresh Token**: Kiểm tra expiry, nếu hết hạn thì xóa
- **Logout**: Xóa token hoàn toàn khỏi DB

### 5. System API Endpoints
File: `src/routes/system.routes.ts`

Admin endpoints để monitor/trigger cleanup:

#### Manual Cleanup
```
POST /api/system/cleanup-tokens
Response: {
  status: 200,
  message: "Token cleanup completed successfully",
  data: {
    deletedCount: number,
    timestamp: string
  }
}
```

#### Cleanup Status
```
GET /api/system/cleanup-status
Response: {
  status: 200,
  data: {
    isRunning: boolean,
    cleanupIntervalMs: number,
    cleanupIntervalMinutes: number,
    timestamp: string
  }
}
```

## Configuration

### Environment Variables

```env
# Token cleanup interval (minutes, default: 60)
TOKEN_CLEANUP_INTERVAL_MINUTES=60
```

### Customize Cleanup Interval

Trong `src/index.ts`:
```typescript
const tokenCleanupJob = TokenCleanupJob.getInstance(
  parseInt(process.env['TOKEN_CLEANUP_INTERVAL_MINUTES'] || '60', 10)
);
```

Hoặc hardcode:
```typescript
const tokenCleanupJob = TokenCleanupJob.getInstance(30); // 30 minutes
```

## Security Benefits

### 1. Giảm Risk Nếu DB Bị Compromise
- Attacker chỉ thấy tokens còn hiệu lực
- Expired tokens đã bị xóa, không thể dùng được
- Giới hạn số lượng tokens có thể bị khai thác

### 2. Defense-in-Depth
- Nếu có bug trong token validation logic
- Expired tokens sẽ bị xóa sau 60 phút
- Hạn chế cửa sổ khai thác lỗ hổng

### 3. Audit Trail
- Biết chính xác khi nào tokens bị xóa (trong logs)
- Có thể track cleanup history từ logs

## Performance Benefits

### 1. Database Size
- Giảm kích thước DB từ 5-10% mỗi giờ (tuỳ traffic)
- Backup/restore nhanh hơn
- Disk usage thấp hơn

### 2. Query Performance
- Indexes hoạt động tốt hơn trên table nhỏ hơn
- `findActiveByUserId()` nhanh hơn (ít records cần scan)
- Full table scan chậm hơn

### 3. Example Performance Impact
- Trước: 100k expired tokens → Scan 100k rows
- Sau cleanup: 0 expired tokens → Scan 0 rows
- Savings: ~100k rows * 100 bytes = 10MB memory/disk

## Implementation Details

### Cleanup Flow

1. **Server Startup**
   ```
   App Start → TokenCleanupJob.getInstance() → cleanupJob.start()
   → Execute initial cleanup → Schedule periodic cleanup every 60 minutes
   ```

2. **Periodic Cleanup**
   ```
   Every 60 minutes:
   - Query: SELECT * FROM refresh_token_sessions WHERE expires_at < NOW()
   - Delete all matched records
   - Log: "Deleted X expired tokens"
   ```

3. **Server Shutdown**
   ```
   SIGTERM/SIGINT → cleanupJob.stop() → clearInterval() → process.exit()
   ```

### Lazy Cleanup (Still Works)

Cleanup vẫn xảy ra khi user login:
```typescript
// In AuthService.login()
await this.refreshTokenRepository.deleteExpiredSessions(user.id);
```

### Manual Cleanup (For Admin)

Admin có thể trigger manual cleanup anytime:
```bash
curl -X POST http://localhost:3001/api/system/cleanup-tokens
```

## Monitoring

### Logs

Cleanup job sẽ log:
```
🔄 Starting TokenCleanupJob (cleanup every 60 minutes)
✅ TokenCleanupJob completed: Deleted 150 expired tokens (45ms)
✅ TokenCleanupJob completed: No expired tokens found (3ms)
```

Error logs:
```
❌ Error in TokenCleanupJob: [error details]
```

### Metrics to Track

1. **Cleanup Duration** - Nên < 1 giây
2. **Deleted Token Count** - Tuỳ traffic
3. **Cleanup Success Rate** - Nên 100%

## Best Practices

### 1. Interval Selection
- **60 minutes** (default) - Balanced, most use cases
- **30 minutes** - High traffic apps
- **6 hours** - Low traffic apps, dev/staging

### 2. Monitoring
- Monitor cleanup job logs
- Alert if cleanup fails multiple times
- Monitor cleanup duration (should be < 1s)

### 3. Database Maintenance
- Monitor table size over time
- Run `VACUUM ANALYZE` periodically (PostgreSQL)
- Monitor index fragmentation

### 4. Graceful Shutdown
- Always call `cleanupJob.stop()` in process termination
- Use SIGTERM/SIGINT handlers (already implemented)
- Don't force kill the process

## Testing

### Manual Cleanup
```bash
# Trigger manual cleanup
curl -X POST http://localhost:3001/api/system/cleanup-tokens

# Check cleanup status
curl http://localhost:3001/api/system/cleanup-status
```

### Database Query
```sql
-- Check expired tokens
SELECT COUNT(*) FROM refresh_token_sessions 
WHERE expires_at < NOW();

-- Check cleanup index performance
EXPLAIN ANALYZE 
SELECT * FROM refresh_token_sessions 
WHERE expires_at < NOW();
```

## Troubleshooting

### Issue: Cleanup Job Not Running
**Solution:**
1. Check logs for startup errors
2. Verify `TOKEN_CLEANUP_INTERVAL_MINUTES` env var
3. Restart server

### Issue: Cleanup Takes Too Long
**Solution:**
1. Check number of expired tokens: 
   ```sql
   SELECT COUNT(*) FROM refresh_token_sessions WHERE expires_at < NOW();
   ```
2. Verify indexes exist:
   ```sql
   SELECT * FROM pg_indexes WHERE tablename = 'refresh_token_sessions';
   ```
3. Increase cleanup interval or run off-peak

### Issue: Database Still Growing
**Solution:**
1. Check if cleanup is running: `GET /api/system/cleanup-status`
2. Check if revoked tokens are being cleaned (not just expired)
3. Monitor with query: `SELECT COUNT(*) FROM refresh_token_sessions;`

## Future Enhancements

1. **Soft Delete** - Mark deleted instead of hard delete (audit trail)
2. **Revoked Token Cleanup** - Also cleanup revoked tokens > X days
3. **Configurable TTL** - Different TTL for different users/projects
4. **Analytics Dashboard** - Track cleanup metrics over time
5. **Webhook Notifications** - Notify on cleanup events
6. **Distributed Cleanup** - Cleanup in background worker
