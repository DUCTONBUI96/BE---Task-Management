/**
 * Data Transfer Objects (DTOs) for Comment entity
 */

/**
 * DTO for creating a new comment
 */
export interface CreateCommentDTO {
  taskId: number;
  userId: string;
  content: string;
}

/**
 * DTO for updating comment
 */
export interface UpdateCommentDTO {
  content: string;
}

/**
 * DTO for comment response
 */
export interface CommentResponseDTO {
  id: number;
  taskId: number;
  userId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * DTO for comment with user information
 */
export interface CommentWithUserDTO extends CommentResponseDTO {
  user: {
    id: string;
    name: string;
    email?: string;
  };
}
