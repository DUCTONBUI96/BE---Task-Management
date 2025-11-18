import { BaseService } from './base/BaseService';
import { Task } from '../models/Task';
import { TaskRepository } from '../repositories/TaskRepository';
import { CreateTaskDTO, UpdateTaskDTO, TaskResponseDTO, TaskDetailDTO, AssignTaskDTO, UpdateTaskStatusDTO, UpdateTaskPriorityDTO } from '../dtos/TaskDTO';
import { ProjectService } from './ProjectService';

/**
 * TaskService - Xử lý tất cả business logic liên quan đến Task
 * Singleton Pattern
 */
export class TaskService extends BaseService<Task, number> {
  private static instance: TaskService;
  private taskRepository: TaskRepository;
  private projectService: ProjectService;

  private constructor() {
    const taskRepository = TaskRepository.getInstance();
    super(taskRepository);
    this.taskRepository = taskRepository;
    this.projectService = ProjectService.getInstance();
  }
  
  /**
   * Lấy singleton instance
   */
  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  /**
   * Lấy tất cả tasks
   */
  async getAllTasks(): Promise<TaskResponseDTO[]> {
    try {
      const tasks = await this.taskRepository.findAll();
      return tasks.map(task => this.mapToResponseDTO(task));
    } catch (error) {
      throw new Error(`Error getting all tasks: ${error}`);
    }
  }
  async getAllTasksDetails(): Promise<TaskDetailDTO[]> {
    try {
      // Lấy tất cả task từ repository
      const tasks = await this.taskRepository.findAllWithDetails();
      
      // Map từng task → TaskDetailDTO
      const result = tasks.map(task => this.mapToDetailDTO(task));
      return result;
    } catch (error) {
      throw new Error(`Error getting all tasks: ${error}`);
    }
  }
  
  /**
   * Lấy task theo ID
   */
  async getTaskById(id: number): Promise<TaskResponseDTO> {
    try {
      const task = await this.getById(id);
      if (!task) {
        throw new Error('Task not found');
      }
      return this.mapToResponseDTO(task);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy task detail
   */
  async getTaskDetail(id: number): Promise<TaskDetailDTO> {
    try {
      const task = await this.getById(id);
      if (!task) {
        throw new Error('Task not found');
      }

      // Đếm số lượng comments
      const commentCount = await this.taskRepository.countCommentsByTaskId(id);

      // TODO: Lấy thêm thông tin tags, assigned users, comments
      return {
        ...this.mapToResponseDTO(task),
        commentCount,
        tags: [],
        assignedUsers: [],
        comments: [],
      };
    } catch (error) {
      throw new Error(`Error getting task detail: ${error}`);
    }
  }

  /**
   * Lấy tasks theo project ID
   */
  async getTasksByProjectId(projectId: number): Promise<TaskResponseDTO[]> {
    try {
      // Kiểm tra project tồn tại
      await this.projectService.getById(projectId);

      const tasks = await this.taskRepository.findByProjectId(projectId);
      return tasks.map(task => this.mapToResponseDTO(task));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tạo task mới
   */
  async createTask(dto: CreateTaskDTO): Promise<TaskResponseDTO> {
    try {
      // Kiểm tra project tồn tại
      await this.projectService.getById(dto.projectId);

      const task = await this.repository.create({
        projectId: dto.projectId,
        name: dto.name,
        description: dto.description,
        deadline: dto.deadline,
        statusId: dto.statusId,
        priorityId: dto.priorityId,
      } as any);

      return this.mapToResponseDTO(task);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cập nhật task
   */
  async updateTask(id: number, dto: UpdateTaskDTO): Promise<TaskResponseDTO> {
    try {
      const updateData: any = {};
      
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.description !== undefined) updateData.description = dto.description;
      if (dto.deadline !== undefined) updateData.deadline = dto.deadline;
      if (dto.statusId !== undefined) updateData.statusId = dto.statusId;
      if (dto.priorityId !== undefined) updateData.priorityId = dto.priorityId;

      const updatedTask = await this.update(id, updateData);
      return this.mapToResponseDTO(updatedTask);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa task
   */
  async deleteTask(id: number): Promise<boolean> {
    try {
      return await this.delete(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Assign task cho user
   */
  async assignTask(taskId: number, dto: AssignTaskDTO): Promise<void> {
    try {
      // Kiểm tra task tồn tại
      await this.getById(taskId);

      await this.taskRepository.assignUser(taskId, dto.userId);
    } catch (error) {
      throw new Error(`Error assigning task: ${error}`);
    }
  }

  /**
   * Unassign user khỏi task
   */
  async unassignTask(taskId: number, userId: string): Promise<void> {
    try {
      // Kiểm tra task tồn tại
      await this.getById(taskId);

      await this.taskRepository.unassignUser(taskId, userId);
    } catch (error) {
      throw new Error(`Error unassigning task: ${error}`);
    }
  }

  /**
   * Cập nhật task status
   */
  async updateTaskStatus(id: number, dto: UpdateTaskStatusDTO): Promise<TaskResponseDTO> {
    try {
      const updatedTask = await this.update(id, { statusId: dto.statusId } as any);
      return this.mapToResponseDTO(updatedTask);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cập nhật task priority
   */
  async updateTaskPriority(id: number, dto: UpdateTaskPriorityDTO): Promise<TaskResponseDTO> {
    try {
      const updatedTask = await this.update(id, { priorityId: dto.priorityId } as any);
      return this.mapToResponseDTO(updatedTask);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Thêm tags vào task
   */
  async addTags(taskId: number, tagIds: number[]): Promise<void> {
    try {
      // Kiểm tra task tồn tại
      await this.getById(taskId);

      for (const tagId of tagIds) {
        await this.taskRepository.addTag(taskId, tagId);
      }
    } catch (error) {
      throw new Error(`Error adding tags: ${error}`);
    }
  }

  /**
   * Xóa tags khỏi task
   */
  async removeTags(taskId: number, tagIds: number[]): Promise<void> {
    try {
      // Kiểm tra task tồn tại
      await this.getById(taskId);

      for (const tagId of tagIds) {
        await this.taskRepository.removeTag(taskId, tagId);
      }
    } catch (error) {
      throw new Error(`Error removing tags: ${error}`);
    }
  }

  /**
   * Lấy tasks được assigned cho user
   */
  async getTasksByUserId(userId: string): Promise<TaskResponseDTO[]> {
    try {
      const tasks = await this.taskRepository.findByUserId(userId);
      return tasks.map(task => this.mapToResponseDTO(task));
    } catch (error) {
      throw new Error(`Error getting tasks by user: ${error}`);
    }
  }

  /**
   * Map Task entity sang TaskResponseDTO
   */
  private mapToResponseDTO(task: Task): TaskResponseDTO {
    const dto: any = {
      id: task.id,
      projectId: task.projectId,
      name: task.name,
      statusId: task.statusId,
      priorityId: task.priorityId,
    };

    if (task.description) dto.description = task.description;
    if (task.deadline) dto.deadline = task.deadline;
    if (task.createdAt) dto.createdAt = task.createdAt;
    if (task.updatedAt) dto.updatedAt = task.updatedAt;

    return dto;
  }

  /**
   * Validation trước khi tạo
   */
  protected override async validateCreate(data: Partial<Task>): Promise<void> {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Task name is required');
    }
    if (!(data as any).projectId) {
      throw new Error('Project ID is required');
    }
  }

    /**
   * Map Task entity sang TaskDetailDTO
   */
  private mapToDetailDTO(task: any): TaskDetailDTO {
    const dto: TaskDetailDTO = {
      id: task.id,
      projectId: task.projectId,
      name: task.name,
      statusId: task.statusId,
      priorityId: task.priorityId,
      description: task.description ?? undefined,
      deadline: task.deadline ?? undefined,
      createdAt: task.createdAt ?? undefined,
      updatedAt: task.updatedAt ?? undefined,
    };
    // Relations
    if (task.project) {
      dto.project = {
        id: task.project.id,
        name: task.project.name,
      };
    }

    if (task.status) {
      dto.status = {
        id: task.status.id,
        name: task.status.name,
      };
    }

    if (task.priority) {
      dto.priority = {
        id: task.priority.id,
        name: task.priority.name,
        level: task.priority.level,
      };
    }

    if (task.tags?.length) {
      dto.tags = task.tags.map((t: any) => ({
        id: t.id,
        name: t.name,
      }));
    }

    if (task.assignedUsers?.length) {
      dto.assignedUsers = task.assignedUsers.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
      }));
    }

    if (task.comments?.length) {
      dto.commentCount = task.comments.length;
      dto.comments = task.comments.map((c: any) => ({
        id: c.id,
        content: c.content,
        userId: c.userId,
        userName: c.user?.name ?? "",
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }));
    }

    return dto;
  }
  
  

  /**
   * Validation trước khi cập nhật
   */
  protected override async validateUpdate(id: number, data: Partial<Task>): Promise<void> {
    if (data.name && data.name.trim().length === 0) {
      throw new Error('Task name cannot be empty');
    }
  }
}
