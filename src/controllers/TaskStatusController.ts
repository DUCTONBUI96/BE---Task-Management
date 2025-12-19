import { Request, Response, NextFunction } from 'express';
import { TaskStatusService } from '../services/TaskStatusService';

/**
 * TaskStatusController - Handle HTTP requests for TaskStatus
 */
export class TaskStatusController {
  private taskStatusService: TaskStatusService;

  constructor() {
    this.taskStatusService = TaskStatusService.getInstance();
  }

  /**
   * Helper method for consistent response
   */
  private handleResponse(res: Response, status: number, message: string, data?: any): Response {
    return res.status(status).json({
      status,
      message,
      data,
    });
  }

  /**
   * GET /task-statuses - Get all task statuses sorted by name
   */
  getAllStatuses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const statuses = await this.taskStatusService.getAllStatuses();
      this.handleResponse(res, 200, 'Success', statuses);
    } catch (err) {
      next(err);
    }
  };
}
