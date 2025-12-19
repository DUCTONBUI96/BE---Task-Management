import { TaskStatusRepository } from '../repositories/TaskStatusRepository';

/**
 * TaskStatusService - Business logic for TaskStatus
 * Singleton Pattern
 */
export class TaskStatusService {
  private static instance: TaskStatusService;
  private taskStatusRepository: TaskStatusRepository;

  private constructor() {
    this.taskStatusRepository = TaskStatusRepository.getInstance();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): TaskStatusService {
    if (!TaskStatusService.instance) {
      TaskStatusService.instance = new TaskStatusService();
    }
    return TaskStatusService.instance;
  }

  /**
   * Get all task statuses sorted by name (ascending)
   * Returns only id and name
   */
  async getAllStatuses(): Promise<{ id: number; name: string }[]> {
    try {
      const statuses = await this.taskStatusRepository.findAllSorted();
      return statuses.map(status => ({
        id: status.id,
        name: status.name,
      }));
    } catch (error) {
      throw new Error(`Error getting all statuses: ${error}`);
    }
  }
}
