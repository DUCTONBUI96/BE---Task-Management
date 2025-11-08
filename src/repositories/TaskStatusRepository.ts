import { BaseRepository } from './base/BaseRepository';
import { TaskStatus } from '../models/TaskStatus';

/**
 * TaskStatusRepository - Handles all database operations for TaskStatus entity
 * Implements Singleton pattern
 */
export class TaskStatusRepository extends BaseRepository<TaskStatus, number> {
  private static instance: TaskStatusRepository;

  private constructor() {
    super('TaskStatus');
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): TaskStatusRepository {
    if (!TaskStatusRepository.instance) {
      TaskStatusRepository.instance = new TaskStatusRepository();
    }
    return TaskStatusRepository.instance;
  }

  protected getDelegate() {
    return this.prisma.taskStatus;
  }

  protected mapToDomain(data: any): TaskStatus {
    return new TaskStatus(
      data.id,
      data.name,
      data.createdAt
    );
  }

  protected mapToPrisma(data: Partial<TaskStatus>): any {
    const prismaData: any = {};
    
    if (data.name !== undefined) prismaData.name = data.name;
    
    return prismaData;
  }

  /**
   * Find status by name
   */
  async findByName(name: string): Promise<TaskStatus | null> {
    try {
      const status = await this.prisma.taskStatus.findUnique({
        where: { name },
      });
      return status ? this.mapToDomain(status) : null;
    } catch (error) {
      throw new Error(`Error finding status by name: ${error}`);
    }
  }

  /**
   * Check if status name exists
   */
  async nameExists(name: string): Promise<boolean> {
    try {
      const count = await this.prisma.taskStatus.count({
        where: { name },
      });
      return count > 0;
    } catch (error) {
      throw new Error(`Error checking status name existence: ${error}`);
    }
  }

  /**
   * Count tasks with this status
   */
  async countTasks(statusId: number): Promise<number> {
    try {
      return await this.prisma.task.count({
        where: {
          statusId: statusId,
        },
      });
    } catch (error) {
      throw new Error(`Error counting tasks with status: ${error}`);
    }
  }
}
