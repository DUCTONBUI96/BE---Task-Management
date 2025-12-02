/**
 * Auth DTOs - Data Transfer Objects cho authentication operations
 * Định nghĩa request/response formats
 */

/**
 * DTO cho Login request
 */
export interface LoginRequestDTO {
  email: string;
  password: string;
}

/**
 * DTO cho Login response
 */
export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

/**
 * DTO cho Refresh Token request
 */
export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

/**
 * DTO cho Refresh Token response
 */
export interface RefreshTokenResponseDTO {
  accessToken: string;
  refreshToken: string;
}

/**
 * DTO cho Logout request
 */
export interface LogoutDTO {
  userId: string;
  refreshToken: string;
}

/**
 * DTO cho Logout All Devices request
 */
export interface LogoutAllDTO {
  userId: string;
}

/**
 * DTO cho Auth verification (payload từ decoded token)
 */
export interface AuthPayloadDTO {
  userId: string;
  email?: string;
  type: 'access' | 'refresh';
}
