/**
 * Data Transfer Objects (DTOs) for other entities
 */

/**
 * TaskStatus DTOs
 */
export interface CreateTaskStatusDTO {
  name: string;
}

export interface TaskStatusResponseDTO {
  id: number;
  name: string;
  createdAt?: Date;
  taskCount?: number;
}

/**
 * TaskPriority DTOs
 */
export interface CreateTaskPriorityDTO {
  name: string;
  level: number;
}

export interface TaskPriorityResponseDTO {
  id: number;
  name: string;
  level: number;
  createdAt?: Date;
  taskCount?: number;
}

/**
 * Tag DTOs
 */
export interface CreateTagDTO {
  name: string;
}

export interface TagResponseDTO {
  id: number;
  name: string;
  createdAt?: Date;
  usageCount?: number;
}
