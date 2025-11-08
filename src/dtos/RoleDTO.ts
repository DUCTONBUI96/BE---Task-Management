/**
 * Data Transfer Objects (DTOs) for Role entity
 */

/**
 * DTO for creating a new role
 */
export interface CreateRoleDTO {
  name: string;
  description?: string;
}

/**
 * DTO for updating role information
 */
export interface UpdateRoleDTO {
  name?: string;
  description?: string;
}

/**
 * DTO for role response
 */
export interface RoleResponseDTO {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
}
