import { BaseRepository } from './base/BaseRepository';
import { Comment } from '../models/Comment';

/**
 * CommentRepository - Handles all database operations for Comment entity
 * Implements Singleton pattern
 */
export class CommentRepository extends BaseRepository<Comment, number> {
  private static instance: CommentRepository;

  private constructor() {
    super('Comment');
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): CommentRepository {
    if (!CommentRepository.instance) {
      CommentRepository.instance = new CommentRepository();
    }
    return CommentRepository.instance;
  }

  protected getDelegate() {
    return this.prisma.comment;
  }

  protected mapToDomain(data: any): Comment {
    return new Comment(
      data.id,
      data.taskId,
      data.userId,
      data.content,
      data.createdAt,
      data.updatedAt
    );
  }

  protected mapToPrisma(data: Partial<Comment>): any {
    const prismaData: any = {};
    
    if (data.taskId !== undefined) prismaData.taskId = data.taskId;
    if (data.userId !== undefined) prismaData.userId = data.userId;
    if (data.content !== undefined) prismaData.content = data.content;
    
    return prismaData;
  }

  /**
   * Find comments by task ID with user information
   */
  async findByTaskId(taskId: number): Promise<any[]> {
    try {
      const comments = await this.prisma.comment.findMany({
        where: {
          taskId: taskId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return comments.map(c => ({
        id: c.id,
        content: c.content,
        user: c.user,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }));
    } catch (error) {
      throw new Error(`Error finding comments by task: ${error}`);
    }
  }

  /**
   * Find comments by user ID
   */
  async findByUserId(userId: string): Promise<Comment[]> {
    try {
      const comments = await this.prisma.comment.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      
      return comments.map(c => this.mapToDomain(c));
    } catch (error) {
      throw new Error(`Error finding comments by user: ${error}`);
    }
  }

  /**
   * Update comment content
   */
  async updateContent(commentId: number, content: string): Promise<Comment> {
    try {
      const updated = await this.prisma.comment.update({
        where: { id: commentId },
        data: {
          content: content,
        },
      });
      return this.mapToDomain(updated);
    } catch (error) {
      throw new Error(`Error updating comment: ${error}`);
    }
  }

  /**
   * Delete comments by task ID
   */
  async deleteByTaskId(taskId: number): Promise<number> {
    try {
      const result = await this.prisma.comment.deleteMany({
        where: {
          taskId: taskId,
        },
      });
      return result.count;
    } catch (error) {
      throw new Error(`Error deleting comments by task: ${error}`);
    }
  }

  /**
   * Count comments by task ID
   */
  async countByTaskId(taskId: number): Promise<number> {
    try {
      return await this.prisma.comment.count({
        where: {
          taskId: taskId,
        },
      });
    } catch (error) {
      throw new Error(`Error counting comments: ${error}`);
    }
  }
}
