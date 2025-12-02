import { NextFunction, Response, Request } from 'express';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';
import { CreateUserDTO, UpdateUserDTO, ChangePasswordDTO, UpdateAvatarDTO } from '../dtos/UserDTO';
import { LoginRequestDTO, RefreshTokenRequestDTO, LogoutDTO, LogoutAllDTO } from '../dtos/AuthDTO';

/**
 * UserController - Xử lý HTTP requests liên quan đến User
 * Controller chỉ làm nhiệm vụ:
 * - Nhận request từ client
 * - Validate request data
 * - Gọi service để xử lý business logic
 * - Trả response về client
 */
export class UserController {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.userService = UserService.getInstance();
    this.authService = AuthService.getInstance();
  }

  /**
   * Helper method để trả response thống nhất
   */
  private handleResponse(res: Response, status: number, message: string, data?: any): Response {
    return res.status(status).json({
      status,
      message,
      data,
    });
  }

  /**
   * GET /users - Lấy tất cả users
   */
  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      this.handleResponse(res, 200, 'Success', users);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /users/:id - Lấy user theo ID
   */
  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'];
      if (!id) {
        this.handleResponse(res, 400, 'User ID is required');
        return;
      }
      const user = await this.userService.getUserById(id);
      this.handleResponse(res, 200, 'Success', user);
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /users - Tạo user mới
   */
  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateUserDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password || req.body.passwordHash,
      };

      const user = await this.userService.createUser(dto);
      this.handleResponse(res, 201, 'User created successfully', user);
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /users/:id - Cập nhật user
   */
  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'];
      if (!id) {
        this.handleResponse(res, 400, 'User ID is required');
        return;
      }
      const dto: UpdateUserDTO = {
        name: req.body.name,
        email: req.body.email,
      };

      const user = await this.userService.updateUser(id, dto);
      this.handleResponse(res, 200, 'User updated successfully', user);
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /users/:id - Xóa user
   */
  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'];
      if (!id) {
        this.handleResponse(res, 400, 'User ID is required');
        return;
      }
      await this.userService.deleteUser(id);
      this.handleResponse(res, 200, 'User deleted successfully');
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /users/:id/password - Đổi mật khẩu
   */
  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'];
      if (!id) {
        this.handleResponse(res, 400, 'User ID is required');
        return;
      }
      const dto: ChangePasswordDTO = {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
      };

      const user = await this.userService.changePassword(id, dto);
      this.handleResponse(res, 200, 'Password changed successfully', user);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /users/email/:email - Tìm user theo email
   */
  findByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.params['email'];
      if (!email) {
        this.handleResponse(res, 400, 'Email is required');
        return;
      }
      const user = await this.userService.findByEmail(email);
      
      if (!user) {
        this.handleResponse(res, 404, 'User not found');
        return;
      }

      this.handleResponse(res, 200, 'Success', user);
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /users/:id/avatar - Cập nhật avatar user
   */
  updateAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params['id'];
      if (!id) {
        this.handleResponse(res, 400, 'User ID is required');
        return;
      }
      const dto: UpdateAvatarDTO = {
        avatarUrl: req.body.avatarUrl,
        avatarId: req.body.avatarId,
      };

      if (!dto.avatarUrl || !dto.avatarId) {
        this.handleResponse(res, 400, 'avatarUrl and avatarId are required');
        return;
      }

      const user = await this.userService.updateAvatar(id, dto);
      this.handleResponse(res, 200, 'Avatar updated successfully', user);
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /auth/login - Đăng nhập
   * Login user và tạo access token + refresh token
   */
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: LoginRequestDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      // Validate
      if (!dto.email || !dto.password) {
        this.handleResponse(res, 400, 'Email and password are required');
        return;
      }

      // Get IP address and User Agent
      const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
      const userAgent = req.headers['user-agent'] || 'unknown';

      // Call AuthService
      const result = await this.authService.login(dto, ipAddress, userAgent);

      // Set refresh token in httpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'strict',
        maxAge: 10 * 60 * 60 * 1000, // 10 giờ
        path: '/',
      });

      // Return access token và user info
      this.handleResponse(res, 200, 'Login successful', {
        accessToken: result.accessToken,
        user: result.user,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /auth/refresh - Làm mới access token
   * Dùng refresh token từ cookie hoặc body để tạo access token mới
   */
  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Lấy refresh token từ cookie hoặc body
      const refreshToken = req.cookies['refreshToken'] || req.body.refreshToken;

      if (!refreshToken) {
        this.handleResponse(res, 401, 'Refresh token is required');
        return;
      }

      const dto: RefreshTokenRequestDTO = { refreshToken };

      // Get IP address and User Agent
      const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
      const userAgent = req.headers['user-agent'] || 'unknown';

      // Call AuthService
      const result = await this.authService.refreshAccessToken(dto, ipAddress, userAgent);

      // Update refresh token in cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'strict',
        maxAge: 10 * 60 * 60 * 1000,
        path: '/',
      });

      this.handleResponse(res, 200, 'Token refreshed', {
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /auth/logout - Đăng xuất
   * Revoke refresh token session
   */
  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshToken = req.cookies['refreshToken'] || req.body.refreshToken;
      const userId = req.user?.userId;

      if (refreshToken && userId) {
        const dto: LogoutDTO = {
          userId,
          refreshToken,
        };
        await this.authService.logout(dto);
      }

      // Clear refresh token cookie
      res.clearCookie('refreshToken', { path: '/' });
      this.handleResponse(res, 200, 'Logout successful');
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /auth/logout-all - Đăng xuất từ tất cả devices
   * Revoke tất cả refresh token sessions của user
   */
  logoutAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        this.handleResponse(res, 401, 'User not authenticated');
        return;
      }

      const dto: LogoutAllDTO = { userId };
      await this.authService.logoutAll(dto);

      // Clear refresh token cookie
      res.clearCookie('refreshToken', { path: '/' });
      this.handleResponse(res, 200, 'Logged out from all devices');
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /auth/me - Lấy thông tin user hiện tại
   */
  getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        this.handleResponse(res, 401, 'User not authenticated');
        return;
      }

      const user = await this.userService.getUserById(userId);
      this.handleResponse(res, 200, 'Success', user);
    } catch (err) {
      next(err);
    }
  };
}

// Export singleton instance
export default new UserController();
