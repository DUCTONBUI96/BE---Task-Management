import { Request, Response, NextFunction } from 'express';

/**
 * DebounceMiddleware - Prevents API spam by rate limiting requests
 * 
 * Sử dụng in-memory store để track requests theo IP address
 * Production nên dùng Redis để scale horizontally
 */
export class DebounceMiddleware {
  private static requestMap = new Map<string, number>();
  private static cleanupInterval: NodeJS.Timeout;

  /**
   * Initialize cleanup interval to prevent memory leak
   */
  static initialize() {
    if (!this.cleanupInterval) {
      // Cleanup old entries every 5 minutes
      this.cleanupInterval = setInterval(() => {
        const now = Date.now();
        for (const [key, timestamp] of this.requestMap.entries()) {
          if (now - timestamp > 60000) { // Remove entries older than 1 minute
            this.requestMap.delete(key);
          }
        }
      }, 300000); // 5 minutes
    }
  }

  /**
   * Debounce middleware factory
   * 
   * @param delayMs - Minimum time between requests (in milliseconds)
   * @returns Express middleware
   * 
   * Usage:
   * router.get('/search', DebounceMiddleware.debounce(500), handler);
   */
  static debounce(delayMs: number = 300) {
    // Initialize cleanup
    this.initialize();

    return (req: Request, res: Response, next: NextFunction): void => {
      // Use IP address and endpoint as key
      const clientKey = `${req.ip}-${req.path}`;
      const now = Date.now();
      const lastRequestTime = this.requestMap.get(clientKey);

      if (lastRequestTime && now - lastRequestTime < delayMs) {
        // Request too soon, reject
        const remainingTime = Math.ceil((delayMs - (now - lastRequestTime)) / 1000);
        res.status(429).json({
          status: 429,
          message: `Too many requests. Please wait ${remainingTime} second(s) before trying again.`,
          retryAfter: remainingTime,
        });
        return;
      }

      // Update last request time
      this.requestMap.set(clientKey, now);
      next();
    };
  }

  /**
   * Cleanup on application shutdown
   */
  static cleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.requestMap.clear();
  }
}
