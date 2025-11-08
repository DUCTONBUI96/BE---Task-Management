import { BaseRepository } from './base/BaseRepository';
import { TaskPriority } from '../models/TaskPriority';

/**
 * TaskPriorityRepository - Handles all database operations for TaskPriority entity
 * Implements Singleton pattern
 */
export class TaskPriorityRepository extends BaseRepository<TaskPriority, number> {
  private static instance: TaskPriorityRepository;

  private constructor() {
    super('TaskPriority');
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): TaskPriorityRepository {
    if (!TaskPriorityRepository.instance) {
      TaskPriorityRepository.instance = new TaskPriorityRepository();
    }
    return TaskPriorityRepository.instance;
  }

  protected getDelegate() {
    return this.prisma.taskPriority;
  }

  protected mapToDomain(data: any): TaskPriority {
    return new TaskPriority(
      data.id,
      data.name,
      data.level,
      data.createdAt
    );
  }

  protected mapToPrisma(data: Partial<TaskPriority>): any {
    const prismaData: any = {};
    
    if (data.name !== undefined) prismaData.name = data.name;
    if (data.level !== undefined) prismaData.level = data.level;
    
    return prismaData;
  }

  /**
   * Find all priorities sorted by level
   */
  async findAllSortedByLevel(): Promise<TaskPriority[]> {
    try {
      const priorities = await this.prisma.taskPriority.findMany({
        orderBy: {
          level: 'desc',
        },
      });
      
      return priorities.map(p => this.mapToDomain(p));
    } catch (error) {
      throw new Error(`Error finding all priorities: ${error}`);
    }
  }

  /**
   * Find priority by name
   */
  async findByName(name: string): Promise<TaskPriority | null> {
    try {
      const priority = await this.prisma.taskPriority.findUnique({
        where: { name },
      });
      return priority ? this.mapToDomain(priority) : null;
    } catch (error) {
      throw new Error(`Error finding priority by name: ${error}`);
    }
  }

  /**
   * Find priorities by level range
   */
  async findByLevelRange(minLevel: number, maxLevel: number): Promise<TaskPriority[]> {
    try {
      const priorities = await this.prisma.taskPriority.findMany({
        where: {
          level: {
            gte: minLevel,
            lte: maxLevel,
          },
        },
        orderBy: {
          level: 'desc',
        },
      });
      
      return priorities.map(p => this.mapToDomain(p));
    } catch (error) {
      throw new Error(`Error finding priorities by level range: ${error}`);
    }
  }

  /**
   * Count tasks with this priority
   */
  async countTasks(priorityId: number): Promise<number> {
    try {
      return await this.prisma.task.count({
        where: {
          priorityId: priorityId,
        },
      });
    } catch (error) {
      throw new Error(`Error counting tasks with priority: ${error}`);
    }
  }

  /**
   * Check if priority name exists
   */
  async nameExists(name: string): Promise<boolean> {
    try {
      const count = await this.prisma.taskPriority.count({
        where: { name },
      });
      return count > 0;
    } catch (error) {
      throw new Error(`Error checking priority name existence: ${error}`);
    }
  }
}
