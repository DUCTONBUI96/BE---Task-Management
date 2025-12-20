import { NextFunction, Response, Request } from 'express';
import { MetricService } from '../services/MetricService';

/**
 * MetricController - Xử lý HTTP requests liên quan đến Metrics/Statistics
 */
export class MetricController {
  private metricService: MetricService;

  constructor() {
    this.metricService = MetricService.getInstance();
  }

  /**
   * Helper method để trả response thống nhất
   */
  private handleResponse(res: Response, status: number, message: string, data?: any): Response {
    return res.status(status).json({
      status,
      message,
      data,
    });
  }

  /**
   * GET /projects/:id/statistics - Get statistics of a project
   */
  getProjectStatistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projectId = Number(req.params['id']);
      const userId = (req as any).userId;

      if (!userId) {
        this.handleResponse(res, 401, 'Unauthorized');
        return;
      }

      const statistics = await this.metricService.getProjectStatistics(projectId, userId);
      this.handleResponse(res, 200, 'Success', statistics);
    } catch (err) {
      next(err);
    }
  };
}

// Export singleton instance
export default new MetricController();
