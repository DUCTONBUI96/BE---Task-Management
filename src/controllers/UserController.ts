import { NextFunction, Response, Request } from 'express';
import { UserService } from '../services/UserService';
import { CreateUserDTO, UpdateUserDTO, LoginUserDTO, ChangePasswordDTO } from '../dtos/UserDTO';

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

  constructor() {
    this.userService = UserService.getInstance();
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
        password: req.body.password || req.body.passwordhash,
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
   * POST /users/login - Đăng nhập
   */
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: LoginUserDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const user = await this.userService.login(dto);
      // TODO: Generate JWT token
      this.handleResponse(res, 200, 'Login successful', user);
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
}

// Export singleton instance
export default new UserController();
