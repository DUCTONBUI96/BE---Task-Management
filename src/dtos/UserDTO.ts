/**
 * Data Transfer Objects (DTOs) for User entity
 * Used to separate data layer from presentation layer
 */

/**
 * DTO for creating a new user
 */
export interface CreateUserDTO {
  email: string;
  name: string;
  password: string;
}

/**
 * DTO for updating user information
 */
export interface UpdateUserDTO {
  name?: string;
  email?: string;
}

/**
 * DTO for user response (without sensitive data)
 */
export interface UserResponseDTO {
  id: string;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * DTO for user login
 */
export interface LoginUserDTO {
  email: string;
  password: string;
}

/**
 * DTO for changing password
 */
export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}
