import { Request, Response, NextFunction } from 'express';
import { RoleService } from '../services/RoleService';
import { CreateRoleDTO, UpdateRoleDTO } from '../dtos/RoleDTO';

/**
 * Helper function để response JSON
 */
const handleResponse = (res: Response, status: number, message: string, data?: any): Response => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

/**
 * RoleController - Xử lý các HTTP requests liên quan đến Role
 * Class-based controller theo chuẩn OOP
 */
export class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = RoleService.getInstance();
  }

  /**
   * GET /roles - Lấy tất cả roles
   */
  getAllRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roles = await this.roleService.getAllRoles();
      handleResponse(res, 200, 'Get all roles successfully', roles);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /roles/:id - Lấy role theo ID
   */
  getRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      
      if (isNaN(id)) {
        handleResponse(res, 400, 'Invalid role ID');
        return;
      }

      const role = await this.roleService.getRoleById(id);
      handleResponse(res, 200, 'Get role successfully', role);
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /roles/name/:name - Lấy role theo tên
   */
  getRoleByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const name = req.params['name'];

      if (!name || name.trim().length === 0) {
        handleResponse(res, 400, 'Role name is required');
        return;
      }

      const role = await this.roleService.getRoleByName(name);
      
      if (!role) {
        handleResponse(res, 404, 'Role not found');
        return;
      }

      handleResponse(res, 200, 'Get role successfully', role);
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /roles - Tạo role mới
   */
  createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateRoleDTO = req.body;

      if (!dto.name || dto.name.trim().length === 0) {
        handleResponse(res, 400, 'Role name is required');
        return;
      }

      const newRole = await this.roleService.createRole(dto);
      handleResponse(res, 201, 'Role created successfully', newRole);
    } catch (error) {
      next(error);
    }
  };

  /**
   * PUT /roles/:id - Cập nhật role
   */
  updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const dto: UpdateRoleDTO = req.body;

      if (isNaN(id)) {
        handleResponse(res, 400, 'Invalid role ID');
        return;
      }

      if (!dto.name && !dto.description) {
        handleResponse(res, 400, 'At least one field (name or description) is required');
        return;
      }

      const updatedRole = await this.roleService.updateRole(id, dto);
      handleResponse(res, 200, 'Role updated successfully', updatedRole);
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /roles/:id - Xóa role
   */
  deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);

      if (isNaN(id)) {
        handleResponse(res, 400, 'Invalid role ID');
        return;
      }

      await this.roleService.deleteRole(id);
      handleResponse(res, 200, 'Role deleted successfully');
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /roles/:id/exists - Kiểm tra role có tồn tại không
   */
  checkRoleExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);

      if (isNaN(id)) {
        handleResponse(res, 400, 'Invalid role ID');
        return;
      }

      const exists = await this.roleService.roleExists(id);
      handleResponse(res, 200, 'Check role existence successfully', { exists });
    } catch (error) {
      next(error);
    }
  };
}

// Export singleton instance
export default new RoleController();
