import { Router } from 'express';
import { SystemController } from '../controllers/SystemController';

const router = Router();

/**
 * System Routes - Admin operations
 * Chỉ dùng cho monitoring và maintenance purposes
 */

/**
 * POST /api/system/cleanup-tokens
 * Manual trigger token cleanup
 * 
 * Response: { status: 200, message: string, data: { deletedCount: number, timestamp: string } }
 */
router.post('/system/cleanup-tokens', async (req, res) => {
  await SystemController.cleanupExpiredTokens(req, res);
});

/**
 * GET /api/system/cleanup-status
 * Get cleanup job status
 * 
 * Response: { status: 200, data: { isRunning: boolean, cleanupIntervalMs: number, cleanupIntervalMinutes: number, timestamp: string } }
 */
router.get('/system/cleanup-status', (req, res) => {
  SystemController.getCleanupStatus(req, res);
});

export default router;
