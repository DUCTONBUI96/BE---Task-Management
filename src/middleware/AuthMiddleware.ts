import { Request, Response, NextFunction } from 'express';
import { TokenUtils } from '../utils/TokenUtils';
import { UserRepository } from '../repositories/UserRepository';

/**
 * Extend Express Request type để thêm user property
 */
declare global {
  namespace Express {
    interface Request {
      user?: any;
      userId?: string;
    }
  }
}

/**
 * AuthMiddleware - Xác thực user dựa trên access token
 * 
 * Tính năng:
 * - Verify access token từ Authorization header
 * - Extract userId từ token payload
 * - Attach user info vào request object
 * - Handle unauthorized requests
 */
export class AuthMiddleware {
  /**
   * Verify Access Token Middleware
   * 
   * Usage: app.use('/protected', AuthMiddleware.verifyAccessToken);
   * 
   * Expects: Authorization header với format "Bearer <token>"
   * Sets: req.user với decoded token payload
   * Verifies: userId exists in database
   */
  static verifyAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Lấy token từ Authorization header
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        res.status(401).json({ 
          status: 401, 
          message: 'Authorization header is required' 
        });
        return;
      }

      // Extract token (format: "Bearer <token>")
      const token = TokenUtils.extractTokenFromHeader(authHeader);
      
      if (!token) {
        res.status(401).json({ 
          status: 401, 
          message: 'Invalid authorization header format. Expected: Bearer <token>' 
        });
        return;
      }

      // Verify token
      const decoded = TokenUtils.verifyAccessToken(token);
      
      // Verify user exists in database
      const userRepository = UserRepository.getInstance();
      const user = await userRepository.findById(decoded.userId);
      
      if (!user) {
        res.status(401).json({ 
          status: 401, 
          message: 'User not found or has been deleted' 
        });
        return;
      }
      
      // Attach user info to request
      req.user = decoded;
      req.userId = decoded.userId;
      
      next();
    } catch (error) {
      res.status(401).json({ 
        status: 401, 
        message: 'Invalid or expired access token' 
      });
    }
  };

  /**
   * Optional Auth Middleware
   * Tương tự như verifyAccessToken nhưng không throw error nếu không có token
   * Dùng cho routes public nhưng có thêm features khi authenticated
   */
  static optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;
      
      if (authHeader) {
        const token = TokenUtils.extractTokenFromHeader(authHeader);
        
        if (token) {
          const decoded = TokenUtils.verifyAccessToken(token);
          req.user = decoded;
          req.userId = decoded.userId;
        }
      }
      
      next();
    } catch (error) {
      // Continue even if token is invalid
      next();
    }
  };

  /**
   * Verify User Ownership
   * Check nếu request user là owner của resource
   * 
   * Usage: AuthMiddleware.verifyOwnership(req, 'userId', 'id')
   * 
   * @param req - Express request
   * @param paramName - Tên param trong request.params
   * @returns boolean
   */
  static verifyOwnership(req: Request, paramName: string = 'id'): boolean {
    if (!req.user) {
      return false;
    }
    
    const resourceId = req.params[paramName];
    return req.user.userId === resourceId;
  }

  /**
   * Check Authorization - Kiểm tra quyền access
   * 
   * Usage: 
   * if (!AuthMiddleware.checkAuth(req)) {
   *   return res.status(403).json({ message: 'Forbidden' });
   * }
   */
  static checkAuth(req: Request): boolean {
    return req.user !== undefined && req.userId !== undefined;
  }
}
