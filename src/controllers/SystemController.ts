import { TokenCleanupJob } from '../jobs/TokenCleanupJob';

/**
 * SystemController - Xử lý các admin operations liên quan hệ thống
 */
export class SystemController {
  /**
   * Manual trigger token cleanup
   * POST /api/admin/cleanup-tokens
   * 
   * Chỉ dùng cho admin/monitoring purposes
   */
  static async cleanupExpiredTokens(req: any, res: any): Promise<void> {
    try {
      const tokenCleanupJob = TokenCleanupJob.getInstance();
      const deletedCount = await tokenCleanupJob.triggerManualCleanup();
      
      res.status(200).json({
        status: 200,
        message: 'Token cleanup completed successfully',
        data: {
          deletedCount,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      res.status(500).json({
        status: 500,
        message: error.message || 'Error performing token cleanup',
      });
    }
  }

  /**
   * Get cleanup job status
   * GET /api/admin/cleanup-status
   */
  static getCleanupStatus(req: any, res: any): void {
    try {
      const tokenCleanupJob = TokenCleanupJob.getInstance();
      
      res.status(200).json({
        status: 200,
        data: {
          isRunning: tokenCleanupJob.isRunning(),
          cleanupIntervalMs: tokenCleanupJob.getCleanupInterval(),
          cleanupIntervalMinutes: Math.round(tokenCleanupJob.getCleanupInterval() / 60000),
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      res.status(500).json({
        status: 500,
        message: error.message || 'Error getting cleanup status',
      });
    }
  }
}
