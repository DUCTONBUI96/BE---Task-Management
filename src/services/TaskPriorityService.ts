import { TaskPriorityRepository } from '../repositories/TaskPriorityRepository';

/**
 * TaskPriorityService - Business logic for TaskPriority
 * Singleton Pattern
 */
export class TaskPriorityService {
  private static instance: TaskPriorityService;
  private taskPriorityRepository: TaskPriorityRepository;

  private constructor() {
    this.taskPriorityRepository = TaskPriorityRepository.getInstance();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): TaskPriorityService {
    if (!TaskPriorityService.instance) {
      TaskPriorityService.instance = new TaskPriorityService();
    }
    return TaskPriorityService.instance;
  }

  /**
   * Get all task priorities sorted by level (ascending: Low -> Medium -> High)
   * Returns only id and name
   */
  async getAllPriorities(): Promise<{ id: number; name: string }[]> {
    try {
      const priorities = await this.taskPriorityRepository.findAllSortedByLevel();
      return priorities;
    } catch (error) {
      throw new Error(`Error getting all priorities: ${error}`);
    }
  }
}
