import { RefreshTokenSessionRepository } from '../repositories/RefreshTokenSessionRepository';

/**
 * TokenCleanupJob - Tự động xóa expired refresh tokens định kỳ
 * 
 * Tính năng:
 * - Chạy mỗi 1 giờ để xóa tất cả expired tokens
 * - Giảm kích thước database
 * - Tăng performance của queries
 * - Defense-in-depth: nếu có bug trong token validation
 * 
 * Singleton Pattern
 */
export class TokenCleanupJob {
  private static instance: TokenCleanupJob;
  private refreshTokenRepository: RefreshTokenSessionRepository;
  private intervalId: NodeJS.Timeout | null = null;
  private cleanupIntervalMs: number; // milliseconds

  private constructor(cleanupIntervalMinutes: number = 60) {
    this.refreshTokenRepository = RefreshTokenSessionRepository.getInstance();
    // Convert minutes to milliseconds
    this.cleanupIntervalMs = cleanupIntervalMinutes * 60 * 1000;
  }

  public static getInstance(cleanupIntervalMinutes?: number): TokenCleanupJob {
    if (!TokenCleanupJob.instance) {
      TokenCleanupJob.instance = new TokenCleanupJob(cleanupIntervalMinutes);
    }
    return TokenCleanupJob.instance;
  }

  /**
   * Bắt đầu cleanup job (chạy định kỳ)
   * Nên được gọi từ server startup
   */
  public start(): void {
    if (this.intervalId !== null) {
      console.warn('⚠️ TokenCleanupJob is already running');
      return;
    }

    console.log(`🔄 Starting TokenCleanupJob (cleanup every ${this.cleanupIntervalMs / 60000} minutes)`);

    // Chạy cleanup ngay lập tức
    this.executeCleanup().catch(error => {
      console.error('❌ Error executing initial cleanup:', error);
    });

    // Sau đó chạy định kỳ
    this.intervalId = setInterval(() => {
      this.executeCleanup().catch(error => {
        console.error('❌ Error in TokenCleanupJob:', error);
      });
    }, this.cleanupIntervalMs);
  }

  /**
   * Dừng cleanup job
   * Nên được gọi từ server shutdown
   */
  public stop(): void {
    if (this.intervalId === null) {
      console.warn('⚠️ TokenCleanupJob is not running');
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = null;
    console.log('⏹️ TokenCleanupJob stopped');
  }

  /**
   * Execute cleanup task
   * Xóa tất cả expired tokens khỏi database
   */
  private async executeCleanup(): Promise<void> {
    try {
      const startTime = Date.now();
      
      // Xóa tất cả expired sessions
      const deletedCount = await this.refreshTokenRepository.deleteExpiredSessions();
      
      const duration = Date.now() - startTime;
      
      if (deletedCount > 0) {
        console.log(`✅ TokenCleanupJob completed: Deleted ${deletedCount} expired tokens (${duration}ms)`);
      } else {
        console.log(`✅ TokenCleanupJob completed: No expired tokens found (${duration}ms)`);
      }
    } catch (error) {
      console.error('❌ TokenCleanupJob execution failed:', error);
      throw error;
    }
  }

  /**
   * Lấy trạng thái của job
   */
  public isRunning(): boolean {
    return this.intervalId !== null;
  }

  /**
   * Lấy cleanup interval (milliseconds)
   */
  public getCleanupInterval(): number {
    return this.cleanupIntervalMs;
  }

  /**
   * Manual trigger cleanup (dùng cho testing hoặc admin operations)
   */
  public async triggerManualCleanup(): Promise<number> {
    try {
      console.log('🔧 Manual TokenCleanup triggered');
      const deletedCount = await this.refreshTokenRepository.deleteExpiredSessions();
      console.log(`✅ Manual cleanup completed: Deleted ${deletedCount} expired tokens`);
      return deletedCount;
    } catch (error) {
      console.error('❌ Manual cleanup failed:', error);
      throw error;
    }
  }
}
