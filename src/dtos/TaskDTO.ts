/**
 * Data Transfer Objects (DTOs) for Task entity
 */

/**
 * DTO for creating a new task
 */
export interface CreateTaskDTO {
  projectId: number;
  name: string;
  description?: string;
  deadline?: Date;
  statusId: number;
  priorityId: number;
}

/**
 * DTO for updating task information
 */
export interface UpdateTaskDTO {
  name?: string;
  description?: string;
  deadline?: Date;
  statusId?: number;
  priorityId?: number;
}

/**
 * DTO for task response
 */
export interface TaskResponseDTO {
  id: number;
  projectId: number;
  name: string;
  description?: string;
  deadline?: Date;
  statusId: number;
  priorityId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * DTO for task with detailed information
 */
export interface TaskDetailDTO extends TaskResponseDTO {
  project?: {
    id: number;
    name: string;
  };
  status?: {
    id: number;
    name: string;
  };
  priority?: {
    id: number;
    name: string;
    level: number;
  };
  tags?: Array<{
    id: number;
    name: string;
  }>;
  assignedUsers?: Array<{
    id: string;
    name: string;
    email: string;
  }>;
  commentCount?: number;
  comments?: Array<{
    id: number;
    content: string;
    userId: string;
    userName: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

/**
 * DTO for assigning user to task
 */
export interface AssignTaskDTO {
  userId: string;
}

/**
 * DTO for updating task status
 */
export interface UpdateTaskStatusDTO {
  statusId: number;
}

/**
 * DTO for updating task priority
 */
export interface UpdateTaskPriorityDTO {
  priorityId: number;
}

/**
 * DTO for task priority update request (legacy)
 */
export interface TaskPriorityUpdateDTO {
  taskId: number;
  priorityId: number;
}

/**
 * DTO for updating task tags
 */
export interface UpdateTaskTagsDTO {
  taskId: number;
  tagIds: number[];
}
