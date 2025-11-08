import { BaseService } from './base/BaseService';
import { Comment } from '../models/Comment';
import { CommentRepository } from '../repositories/CommentRepository';
import { CreateCommentDTO, UpdateCommentDTO, CommentResponseDTO, CommentWithUserDTO } from '../dtos/CommentDTO';
import { TaskService } from './TaskService';
import { UserService } from './UserService';

/**
 * CommentService - Xử lý tất cả business logic liên quan đến Comment
 * Singleton Pattern
 */
export class CommentService extends BaseService<Comment, number> {
  private static instance: CommentService;
  private commentRepository: CommentRepository;
  private taskService: TaskService;
  private userService: UserService;

  private constructor() {
    const commentRepository = CommentRepository.getInstance();
    super(commentRepository);
    this.commentRepository = commentRepository;
    this.taskService = TaskService.getInstance();
    this.userService = UserService.getInstance();
  }

  /**
   * Lấy singleton instance
   */
  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance;
  }

  /**
   * Lấy tất cả comments
   */
  async getAllComments(): Promise<CommentResponseDTO[]> {
    try {
      const comments = await this.commentRepository.findAll();
      return comments.map(comment => this.mapToResponseDTO(comment));
    } catch (error) {
      throw new Error(`Error getting all comments: ${error}`);
    }
  }

  /**
   * Lấy comment theo ID
   */
  async getCommentById(id: number): Promise<CommentResponseDTO> {
    try {
      const comment = await this.getById(id);
      if (!comment) {
        throw new Error('Comment not found');
      }
      return this.mapToResponseDTO(comment);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy comments theo task ID (kèm thông tin user)
   */
  async getCommentsByTaskId(taskId: number): Promise<CommentWithUserDTO[]> {
    try {
      // Kiểm tra task tồn tại
      await this.taskService.getById(taskId);

      const comments = await this.commentRepository.findByTaskId(taskId);
      return comments as CommentWithUserDTO[];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy comments theo user ID
   */
  async getCommentsByUserId(userId: string): Promise<CommentResponseDTO[]> {
    try {
      const comments = await this.commentRepository.findByUserId(userId);
      return comments.map(comment => this.mapToResponseDTO(comment));
    } catch (error) {
      throw new Error(`Error getting comments by user: ${error}`);
    }
  }

  /**
   * Tạo comment mới
   */
  async createComment(dto: CreateCommentDTO): Promise<CommentResponseDTO> {
    try {
      // Kiểm tra task tồn tại
      await this.taskService.getById(dto.taskId);

      // Kiểm tra user tồn tại
      await this.userService.getUserById(dto.userId);

      const comment = await this.repository.create({
        taskId: dto.taskId,
        userId: dto.userId,
        content: dto.content,
      } as any);

      return this.mapToResponseDTO(comment);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cập nhật comment
   */
  async updateComment(id: number, dto: UpdateCommentDTO): Promise<CommentResponseDTO> {
    try {
      const updatedComment = await this.update(id, {
        content: dto.content,
      } as any);

      return this.mapToResponseDTO(updatedComment);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa comment
   */
  async deleteComment(id: number): Promise<boolean> {
    try {
      return await this.delete(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa tất cả comments của một task
   */
  async deleteCommentsByTaskId(taskId: number): Promise<number> {
    try {
      return await this.commentRepository.deleteByTaskId(taskId);
    } catch (error) {
      throw new Error(`Error deleting comments by task: ${error}`);
    }
  }

  /**
   * Đếm số comments của một task
   */
  async countCommentsByTaskId(taskId: number): Promise<number> {
    try {
      return await this.commentRepository.countByTaskId(taskId);
    } catch (error) {
      throw new Error(`Error counting comments: ${error}`);
    }
  }

  /**
   * Map Comment entity sang CommentResponseDTO
   */
  private mapToResponseDTO(comment: Comment): CommentResponseDTO {
    const dto: CommentResponseDTO = {
      id: comment.id,
      taskId: comment.taskId,
      userId: comment.userId,
      content: comment.content,
    };

    if (comment.createdAt) dto.createdAt = comment.createdAt;
    if (comment.updatedAt) dto.updatedAt = comment.updatedAt;

    return dto;
  }

  /**
   * Validation trước khi tạo
   */
  protected override async validateCreate(data: Partial<Comment>): Promise<void> {
    if (!data.content || data.content.trim().length === 0) {
      throw new Error('Comment content is required');
    }
    if (!(data as any).taskId) {
      throw new Error('Task ID is required');
    }
    if (!(data as any).userId) {
      throw new Error('User ID is required');
    }
  }

  /**
   * Validation trước khi cập nhật
   */
  protected override async validateUpdate(id: number, data: Partial<Comment>): Promise<void> {
    if (data.content && data.content.trim().length === 0) {
      throw new Error('Comment content cannot be empty');
    }
  }
}
