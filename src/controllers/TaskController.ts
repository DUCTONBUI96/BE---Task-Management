import { NextFunction, Response, Request } from 'express';
import { TaskService } from '../services/TaskService';
import { AssignTaskDTO, UpdateTaskStatusDTO, UpdateTaskPriorityDTO } from '../dtos/TaskDTO';

/**
 * TaskController - Xử lý HTTP requests liên quan đến Task
 */
export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = TaskService.getInstance();
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
   * GET /tasks - Lấy tất cả tasks
   */
  getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tasks = await this.taskService.getAllTasks();
      this.handleResponse(res, 200, 'Success', tasks);
    } catch (err) {
      next(err);
    }
  };

  getAllTasksDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tasks = await this.taskService.getAllTasksDetails();
      this.handleResponse(res, 200, 'Success', tasks);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /tasks/:id - Lấy task theo ID
   */
  getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const task = await this.taskService.getTaskById(id);
      this.handleResponse(res, 200, 'Success', task);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /tasks/:id/detail - Lấy task detail
   */
  getTaskDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const task = await this.taskService.getTaskDetail(id);
      this.handleResponse(res, 200, 'Success', task);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /projects/:id/tasks - Lấy tasks theo project ID
   */
  getTasksByProjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projectId = Number(req.params['id']);
      const tasks = await this.taskService.getTasksByProjectId(projectId);
      this.handleResponse(res, 200, 'Success', tasks);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /users/:id/tasks - Lấy tasks theo user ID
   */
  getTasksByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params['id'] as string;
      const tasks = await this.taskService.getTasksByUserId(userId);
      this.handleResponse(res, 200, 'Success', tasks);
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /tasks - Tạo task mới
   */
  createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: any = {
        projectId: req.body.project_id || req.body.projectId,
        name: req.body.name,
        description: req.body.description,
        statusId: req.body.status_id || req.body.statusId,
        priorityId: req.body.priority_id || req.body.priorityId,
      };
      
      if (req.body.deadline) {
        dto.deadline = new Date(req.body.deadline);
      }

      const task = await this.taskService.createTask(dto);
      this.handleResponse(res, 201, 'Task created successfully', task);
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /tasks/:id - Cập nhật task
   */
  updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const dto: any = {};
      
      if (req.body.name !== undefined) dto.name = req.body.name;
      if (req.body.description !== undefined) dto.description = req.body.description;
      if (req.body.deadline) dto.deadline = new Date(req.body.deadline);
      if (req.body.statusId || req.body.status_id) dto.statusId = req.body.status_id || req.body.statusId;
      if (req.body.priorityId || req.body.priority_id) dto.priorityId = req.body.priority_id || req.body.priorityId;

      const task = await this.taskService.updateTask(id, dto);
      this.handleResponse(res, 200, 'Task updated successfully', task);
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /tasks/:id - Xóa task
   */
  deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      await this.taskService.deleteTask(id);
      this.handleResponse(res, 200, 'Task deleted successfully');
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /tasks/:id/assign - Assign task cho user
   */
  assignTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId = Number(req.params['id']);
      const dto: AssignTaskDTO = {
        userId: req.body.userId || req.body.user_id,
      };

      await this.taskService.assignTask(taskId, dto);
      this.handleResponse(res, 200, 'Task assigned successfully');
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /tasks/:taskId/assign/:userId - Unassign user khỏi task
   */
  unassignTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId = Number(req.params['taskId']);
      const userId = req.params['userId'] as string;

      await this.taskService.unassignTask(taskId, userId);
      this.handleResponse(res, 200, 'Task unassigned successfully');
    } catch (err) {
      next(err);
    }
  };

  /**
   * PATCH /tasks/:id/status - Cập nhật task status
   */
  updateTaskStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const dto: UpdateTaskStatusDTO = {
        statusId: req.body.statusId || req.body.status_id,
      };

      const task = await this.taskService.updateTaskStatus(id, dto);
      this.handleResponse(res, 200, 'Task status updated successfully', task);
    } catch (err) {
      next(err);
    }
  };

  /**
   * PATCH /tasks/:id/priority - Cập nhật task priority
   */
  updateTaskPriority = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const dto: UpdateTaskPriorityDTO = {
        priorityId: req.body.priorityId || req.body.priority_id,
      };

      const task = await this.taskService.updateTaskPriority(id, dto);
      this.handleResponse(res, 200, 'Task priority updated successfully', task);
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /tasks/:id/tags - Thêm tags vào task
   */
  addTags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId = Number(req.params['id']);
      const tagIds: number[] = req.body.tagIds || req.body.tag_ids || [];

      await this.taskService.addTags(taskId, tagIds);
      this.handleResponse(res, 200, 'Tags added successfully');
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /tasks/:id/tags - Xóa tags khỏi task
   */
  removeTags = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId = Number(req.params['id']);
      const tagIds: number[] = req.body.tagIds || req.body.tag_ids || [];

      await this.taskService.removeTags(taskId, tagIds);
      this.handleResponse(res, 200, 'Tags removed successfully');
    } catch (err) {
      next(err);
    }
  };
}

// Export singleton instance
export default new TaskController();
