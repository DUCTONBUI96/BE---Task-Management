/**
 * Data Transfer Objects (DTOs) for Project entity
 */

/**
 * DTO for creating a new project
 */
export interface CreateProjectDTO {
  name: string;
  description?: string;
  userId?: string; // User ID from authenticated user
}

/**
 * DTO for updating project information
 */
export interface UpdateProjectDTO {
  name?: string;
  description?: string;
}

/**
 * DTO for project response
 */
export interface ProjectResponseDTO {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * DTO for project with statistics
 */
export interface ProjectWithStatsDTO extends ProjectResponseDTO {
  taskCount: number;
  memberCount: number;
  completedTaskCount?: number;
}

/**
 * DTO for adding a member to project
 */
export interface AddProjectMemberDTO {
  userId: string;
  roleId: number;
  projectId: number;
}

/**
 * DTO for adding a member (simplified)
 */
export interface AddMemberDTO {
  userId: string;
  roleId: number;
}

/**
 * DTO for project detail with members
 */
export interface ProjectDetailDTO extends ProjectResponseDTO {
  members?: ProjectMemberDTO[];
}

/**
 * DTO for project member information
 */
export interface ProjectMemberDTO {
  userId: string;
  userName?: string;
  userEmail?: string;
  roleId: number;
  roleName?: string;
}
