import { BaseService } from './base/BaseService';
import { Role } from '../models/Roles';
import { RoleRepository } from '../repositories/RoleRepository';
import { CreateRoleDTO, UpdateRoleDTO, RoleResponseDTO } from '../dtos/RoleDTO';

/**
 * RoleService - Xử lý tất cả business logic liên quan đến Role
 * Singleton Pattern
 */
export class RoleService extends BaseService<Role, number> {
  private static instance: RoleService;
  private roleRepository: RoleRepository;

  private constructor() {
    const roleRepository = RoleRepository.getInstance();
    super(roleRepository);
    this.roleRepository = roleRepository;
  }

  /**
   * Lấy singleton instance
   */
  public static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService();
    }
    return RoleService.instance;
  }

  /**
   * Lấy tất cả roles
   */
  async getAllRoles(): Promise<RoleResponseDTO[]> {
    try {
      const roles = await this.roleRepository.findAllSorted();
      return roles.map(role => this.mapToResponseDTO(role));
    } catch (error) {
      throw new Error(`Error getting all roles: ${error}`);
    }
  }

  /**
   * Lấy role theo ID
   */
  async getRoleById(id: number): Promise<RoleResponseDTO> {
    try {
      const role = await this.getById(id);
      if (!role) {
        throw new Error('Role not found');
      }
      return this.mapToResponseDTO(role);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy role theo tên
   */
  async getRoleByName(name: string): Promise<RoleResponseDTO | null> {
    try {
      const role = await this.roleRepository.findByName(name);
      if (!role) {
        return null;
      }
      return this.mapToResponseDTO(role);
    } catch (error) {
      throw new Error(`Error getting role by name: ${error}`);
    }
  }

  /**
   * Tạo role mới
   */
  async createRole(dto: CreateRoleDTO): Promise<RoleResponseDTO> {
    try {
      // Kiểm tra tên role đã tồn tại
      const existingRole = await this.roleRepository.findByName(dto.name);
      if (existingRole) {
        throw new Error('Role name already exists');
      }

      const role = await this.repository.create({
        name: dto.name,
        description: dto.description,
      } as any);

      return this.mapToResponseDTO(role);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cập nhật role
   */
  async updateRole(id: number, dto: UpdateRoleDTO): Promise<RoleResponseDTO> {
    try {
      const updateData: any = {};
      
      if (dto.name !== undefined) {
        // Kiểm tra tên role đã tồn tại (ngoại trừ role hiện tại)
        const existingRole = await this.roleRepository.findByName(dto.name);
        if (existingRole && existingRole.id !== id) {
          throw new Error('Role name already exists');
        }
        updateData.name = dto.name;
      }
      
      if (dto.description !== undefined) updateData.description = dto.description;

      const updatedRole = await this.update(id, updateData);
      return this.mapToResponseDTO(updatedRole);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa role
   */
  async deleteRole(id: number): Promise<boolean> {
    try {
      // Kiểm tra role có đang được sử dụng không
      const isUsed = await this.roleRepository.isRoleInUse(id);
      if (isUsed) {
        throw new Error('Cannot delete role that is currently in use');
      }

      return await this.delete(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kiểm tra role có tồn tại không
   */
  async roleExists(id: number): Promise<boolean> {
    try {
      return await this.exists(id);
    } catch (error) {
      throw new Error(`Error checking role existence: ${error}`);
    }
  }

  /**
   * Map Role entity sang RoleResponseDTO
   */
  private mapToResponseDTO(role: Role): RoleResponseDTO {
    const dto: RoleResponseDTO = {
      id: role.id,
      name: role.name,
    };

    if (role.description) dto.description = role.description;
    if (role.createdAt) dto.createdAt = role.createdAt;

    return dto;
  }

  /**
   * Validation trước khi tạo
   */
  protected override async validateCreate(data: Partial<Role>): Promise<void> {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Role name is required');
    }
  }

  /**
   * Validation trước khi cập nhật
   */
  protected override async validateUpdate(id: number, data: Partial<Role>): Promise<void> {
    if (data.name && data.name.trim().length === 0) {
      throw new Error('Role name cannot be empty');
    }
  }
}
