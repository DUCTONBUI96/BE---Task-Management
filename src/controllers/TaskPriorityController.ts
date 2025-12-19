import { Request, Response, NextFunction } from 'express';
import { TaskPriorityService } from '../services/TaskPriorityService';

/**
 * TaskPriorityController - Handle HTTP requests for TaskPriority
 */
export class TaskPriorityController {
  private taskPriorityService: TaskPriorityService;

  constructor() {
    this.taskPriorityService = TaskPriorityService.getInstance();
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
   * GET /task-priorities - Get all task priorities sorted by level
   */
  getAllPriorities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const priorities = await this.taskPriorityService.getAllPriorities();
      this.handleResponse(res, 200, 'Success', priorities);
    } catch (err) {
      next(err);
    }
  };
}
