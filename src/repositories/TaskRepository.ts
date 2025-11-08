import { BaseRepository } from './base/BaseRepository';
import { Task } from '../models/Task';

/**
 * TaskRepository - Handles all database operations for Task entity
 * Implements Singleton pattern
 */
export class TaskRepository extends BaseRepository<Task, number> {
  private static instance: TaskRepository;

  private constructor() {
    super('Task');
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): TaskRepository {
    if (!TaskRepository.instance) {
      TaskRepository.instance = new TaskRepository();
    }
    return TaskRepository.instance;
  }

  protected getDelegate() {
    return this.prisma.task;
  }

  protected mapToDomain(data: any): Task {
    return new Task(
      data.id,
      data.projectId,
      data.name,
      data.statusId,
      data.priorityId,
      data.description,
      data.deadline,
      data.createdAt,
      data.updatedAt
    );
  }

  protected mapToPrisma(data: Partial<Task>): any {
    const prismaData: any = {};
    
    if (data.projectId !== undefined) prismaData.projectId = data.projectId;
    if (data.name !== undefined) prismaData.name = data.name;
    if (data.description !== undefined) prismaData.description = data.description;
    if (data.deadline !== undefined) prismaData.deadline = data.deadline;
    if (data.statusId !== undefined) prismaData.statusId = data.statusId;
    if (data.priorityId !== undefined) prismaData.priorityId = data.priorityId;
    
    return prismaData;
  }

  /**
   * Find all tasks with related data
   */
  async findAllWithDetails(): Promise<any[]> {
    try {
      const tasks = await this.prisma.task.findMany({
        include: {
          project: {
            select: {
              id: true,
              name: true,
            },
          },
          status: true,
          priority: true,
          taskTags: {
            include: {
              tag: true,
            },
          },
          assignments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
      
      return tasks.map(t => ({
        ...this.mapToDomain(t).toJSON(),
        project: t.project,
        status: t.status,
        priority: t.priority,
        tags: t.taskTags.map(tt => tt.tag),
        assignedUsers: t.assignments.map(a => a.user),
      }));
    } catch (error) {
      throw new Error(`Error finding all tasks: ${error}`);
    }
  }

  /**
   * Find task by ID with full details
   */
  async findByIdWithDetails(id: number): Promise<any | null> {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
        include: {
          project: true,
          status: true,
          priority: true,
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: {
              createdAt: 'asc',
            },
          },
          taskTags: {
            include: {
              tag: true,
            },
          },
          assignments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
      
      if (!task) return null;
      
      return {
        ...this.mapToDomain(task).toJSON(),
        project: task.project,
        status: task.status,
        priority: task.priority,
        comments: task.comments,
        tags: task.taskTags.map(tt => tt.tag),
        assignedUsers: task.assignments.map(a => a.user),
      };
    } catch (error) {
      throw new Error(`Error finding task by id with details: ${error}`);
    }
  }

  /**
   * Find tasks by project ID
   */
  async findByProjectId(projectId: number): Promise<Task[]> {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          projectId: projectId,
        },
      });
      
      return tasks.map(t => this.mapToDomain(t));
    } catch (error) {
      throw new Error(`Error finding tasks by project: ${error}`);
    }
  }

  /**
   * Find tasks by status ID
   */
  async findByStatusId(statusId: number): Promise<Task[]> {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          statusId: statusId,
        },
      });
      
      return tasks.map(t => this.mapToDomain(t));
    } catch (error) {
      throw new Error(`Error finding tasks by status: ${error}`);
    }
  }

  /**
   * Find tasks by priority ID
   */
  async findByPriorityId(priorityId: number): Promise<Task[]> {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          priorityId: priorityId,
        },
        orderBy: {
          deadline: 'asc',
        },
      });
      
      return tasks.map(t => this.mapToDomain(t));
    } catch (error) {
      throw new Error(`Error finding tasks by priority: ${error}`);
    }
  }

  /**
   * Find tasks assigned to a user
   */
  async findByUserId(userId: string): Promise<Task[]> {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          assignments: {
            some: {
              userId: userId,
            },
          },
        },
      });
      
      return tasks.map(t => this.mapToDomain(t));
    } catch (error) {
      throw new Error(`Error finding tasks by user: ${error}`);
    }
  }

  /**
   * Assign user to task
   */
  async assignUser(taskId: number, userId: string): Promise<any> {
    try {
      return await this.prisma.userTask.create({
        data: {
          taskId: taskId,
          userId: userId,
        },
      });
    } catch (error) {
      throw new Error(`Error assigning user to task: ${error}`);
    }
  }

  /**
   * Unassign user from task
   */
  async unassignUser(taskId: number, userId: string): Promise<boolean> {
    try {
      await this.prisma.userTask.deleteMany({
        where: {
          taskId: taskId,
          userId: userId,
        },
      });
      return true;
    } catch (error) {
      throw new Error(`Error unassigning user from task: ${error}`);
    }
  }

  /**
   * Add tag to task
   */
  async addTag(taskId: number, tagId: number): Promise<any> {
    try {
      return await this.prisma.taskTag.create({
        data: {
          taskId: taskId,
          tagId: tagId,
        },
      });
    } catch (error) {
      throw new Error(`Error adding tag to task: ${error}`);
    }
  }

  /**
   * Remove tag from task
   */
  async removeTag(taskId: number, tagId: number): Promise<boolean> {
    try {
      await this.prisma.taskTag.deleteMany({
        where: {
          taskId: taskId,
          tagId: tagId,
        },
      });
      return true;
    } catch (error) {
      throw new Error(`Error removing tag from task: ${error}`);
    }
  }

  /**
   * Find overdue tasks
   */
  async findOverdueTasks(): Promise<Task[]> {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          deadline: {
            lt: new Date(),
          },
        },
        orderBy: {
          deadline: 'asc',
        },
      });
      
      return tasks.map(t => this.mapToDomain(t));
    } catch (error) {
      throw new Error(`Error finding overdue tasks: ${error}`);
    }
  }

  /**
   * Update task status
   */
  async updateStatus(taskId: number, statusId: number): Promise<Task> {
    try {
      const updated = await this.prisma.task.update({
        where: { id: taskId },
        data: { statusId: statusId },
      });
      return this.mapToDomain(updated);
    } catch (error) {
      throw new Error(`Error updating task status: ${error}`);
    }
  }

  /**
   * Update task priority
   */
  async updatePriority(taskId: number, priorityId: number): Promise<Task> {
    try {
      const updated = await this.prisma.task.update({
        where: { id: taskId },
        data: { priorityId: priorityId },
      });
      return this.mapToDomain(updated);
    } catch (error) {
      throw new Error(`Error updating task priority: ${error}`);
    }
  }

  /**
   * Update task tags (replace all tags)
   */
  async updateTags(taskId: number, tagIds: number[]): Promise<{ taskId: number; tagIds: number[] }> {
    try {
      // Delete old tags
      await this.prisma.taskTag.deleteMany({
        where: {
          taskId: taskId,
        },
      });

      // Add new tags
      if (tagIds.length > 0) {
        await this.prisma.taskTag.createMany({
          data: tagIds.map((tagId) => ({
            taskId: taskId,
            tagId: tagId,
          })),
        });
      }

      return { taskId, tagIds };
    } catch (error) {
      throw new Error(`Error updating task tags: ${error}`);
    }
  }

  /**
   * Count comments by task ID
   */
  async countCommentsByTaskId(taskId: number): Promise<number> {
    try {
      const count = await this.prisma.comment.count({
        where: {
          taskId: taskId,
        },
      });
      return count;
    } catch (error) {
      throw new Error(`Error counting comments: ${error}`);
    }
  }
}
