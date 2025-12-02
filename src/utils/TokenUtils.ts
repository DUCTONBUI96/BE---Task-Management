import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

/**
 * TokenUtils - Tạo, verify, và decode JWT tokens
 * 
 * JWT = JSON Web Token
 * Token được tạo từ SECRET KEY và có thời hạn
 * 
 * PHÂN BIỆT:
 * - SECRET KEY: Khóa bí mật (lưu trong ENV) - dùng để TẠO và VERIFY token
 * - TOKEN: Mã JWT được tạo ra - gửi cho client để xác thực
 */
export class TokenUtils {
  /**
   * Tạo Access Token mới (có thời hạn 2 giờ)
   * Token này được CLIENT gửi lên trong mỗi API request
   * 
   * @param userId - ID của user
   * @param email - Email của user
   * @returns Access token (JWT string) - GỬI CHO CLIENT, KHÔNG lưu vào ENV
   */
  static generateAccessToken(userId: string, email: string): string {
    const secretKey = jwtConfig.accessTokenSecretKey;
    if (!secretKey) {
      throw new Error('Access token secret key not configured in ENV');
    }

    const payload = { 
      userId, 
      email, 
      type: 'access' 
    };

    const options: SignOptions = { 
      expiresIn: jwtConfig.accessTokenExpiresIn,
      issuer: 'task-management-api',
    } as SignOptions;

    // Ký token bằng SECRET KEY
    return jwt.sign(payload, secretKey, options);
  }

  /**
   * Tạo Refresh Token mới (có thời hạn 10 giờ)
   * Token này được lưu trong httpOnly cookie
   * 
   * @param userId - ID của user
   * @returns Refresh token (JWT string) - GỬI CHO CLIENT qua cookie
   */
  static generateRefreshToken(userId: string): string {
    const secretKey = jwtConfig.refreshTokenSecretKey;
    if (!secretKey) {
      throw new Error('Refresh token secret key not configured in ENV');
    }

    const payload = { 
      userId, 
      type: 'refresh' 
    };

    const options: SignOptions = { 
      expiresIn: jwtConfig.refreshTokenExpiresIn,
      issuer: 'task-management-api',
    } as SignOptions;

    // Ký token bằng SECRET KEY
    return jwt.sign(payload, secretKey, options);
  }

  /**
   * Verify Access Token
   * Kiểm tra xem token có hợp lệ không bằng SECRET KEY
   * 
   * @param token - Access token từ client
   * @returns Decoded payload
   * @throws Error nếu token invalid hoặc expired
   */
  static verifyAccessToken(token: string): any {
    try {
      const secretKey = jwtConfig.accessTokenSecretKey;
      if (!secretKey) throw new Error('Access token secret key not configured');
      
      // Verify token bằng SECRET KEY
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  /**
   * Verify Refresh Token
   * Kiểm tra xem token có hợp lệ không bằng SECRET KEY
   * 
   * @param token - Refresh token từ client
   * @returns Decoded payload
   * @throws Error nếu token invalid hoặc expired
   */
  static verifyRefreshToken(token: string): any {
    try {
      const secretKey = jwtConfig.refreshTokenSecretKey;
      if (!secretKey) throw new Error('Refresh token secret key not configured');
      
      // Verify token bằng SECRET KEY
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Decode token mà không cần verify (chỉ dùng để lấy info)
   * @param token - Token cần decode
   * @returns Decoded payload hoặc null
   */
  static decodeToken(token: string): any {
    return jwt.decode(token);
  }

  /**
   * Extract token từ Authorization header
   * @param authHeader - Authorization header (ví dụ: "Bearer <token>")
   * @returns Token hoặc null
   */
  static extractTokenFromHeader(authHeader: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }
}
