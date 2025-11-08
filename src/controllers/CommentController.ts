import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/CommentService';
import { CreateCommentDTO, UpdateCommentDTO } from '../dtos/CommentDTO';

/**
 * Helper function để response JSON
 */
const handleResponse = (res: Response, status: number, message: string, data?: any): Response => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

/**
 * CommentController - Xử lý các HTTP requests liên quan đến Comment
 * Class-based controller theo chuẩn OOP
 */
export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = CommentService.getInstance();
  }

  /**
   * GET /comments - Lấy tất cả comments
   */
  getAllComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const comments = await this.commentService.getAllComments();
      handleResponse(res, 200, 'Get all comments successfully', comments);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /comments/:id - Lấy comment theo ID
   */
  getCommentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);

      if (isNaN(id)) {
        handleResponse(res, 400, 'Invalid comment ID');
        return;
      }

      const comment = await this.commentService.getCommentById(id);
      handleResponse(res, 200, 'Get comment successfully', comment);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /tasks/:taskId/comments - Lấy comments theo task ID
   */
  getCommentsByTaskId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId = Number(req.params['taskId']);

      if (isNaN(taskId)) {
        handleResponse(res, 400, 'Invalid task ID');
        return;
      }

      const comments = await this.commentService.getCommentsByTaskId(taskId);
      handleResponse(res, 200, 'Get comments successfully', comments);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /users/:userId/comments - Lấy comments theo user ID
   */
  getCommentsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params['userId'];

      if (!userId) {
        handleResponse(res, 400, 'User ID is required');
        return;
      }

      const comments = await this.commentService.getCommentsByUserId(userId);
      handleResponse(res, 200, 'Get comments successfully', comments);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /comments - Tạo comment mới
   */
  createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateCommentDTO = req.body;

      if (!dto.taskId || !dto.userId || !dto.content) {
        handleResponse(res, 400, 'Task ID, User ID, and content are required');
        return;
      }

      const newComment = await this.commentService.createComment(dto);
      handleResponse(res, 201, 'Comment created successfully', newComment);
    } catch (error) {
      next(error);
    }
  };

  /**
   * PUT /comments/:id - Cập nhật comment
   */
  updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const dto: UpdateCommentDTO = req.body;

      if (isNaN(id)) {
        handleResponse(res, 400, 'Invalid comment ID');
        return;
      }

      if (!dto.content || dto.content.trim().length === 0) {
        handleResponse(res, 400, 'Content is required');
        return;
      }

      const updatedComment = await this.commentService.updateComment(id, dto);
      handleResponse(res, 200, 'Comment updated successfully', updatedComment);
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /comments/:id - Xóa comment
   */
  deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);

      if (isNaN(id)) {
        handleResponse(res, 400, 'Invalid comment ID');
        return;
      }

      await this.commentService.deleteComment(id);
      handleResponse(res, 200, 'Comment deleted successfully');
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /tasks/:taskId/comments - Xóa tất cả comments của task
   */
  deleteCommentsByTaskId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskId = Number(req.params['taskId']);

      if (isNaN(taskId)) {
        handleResponse(res, 400, 'Invalid task ID');
        return;
      }

      const deletedCount = await this.commentService.deleteCommentsByTaskId(taskId);
      handleResponse(res, 200, 'Comments deleted successfully', { deletedCount });
    } catch (error) {
      next(error);
    }
  };
}

// Export singleton instance
export default new CommentController();
