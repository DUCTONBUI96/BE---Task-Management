import { BaseRepository } from './base/BaseRepository';
import { Role } from '../models/Roles';

/**
 * RoleRepository - Handles all database operations for Role entity
 * Implements Singleton pattern
 */
export class RoleRepository extends BaseRepository<Role, number> {
  private static instance: RoleRepository;

  private constructor() {
    super('Role');
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): RoleRepository {
    if (!RoleRepository.instance) {
      RoleRepository.instance = new RoleRepository();
    }
    return RoleRepository.instance;
  }

  protected getDelegate() {
    return this.prisma.role;
  }

  protected mapToDomain(data: any): Role {
    return new Role(
      data.id,
      data.name,
      data.description,
      data.createdAt
    );
  }

  protected mapToPrisma(data: Partial<Role>): any {
    const prismaData: any = {};
    
    if (data.name !== undefined) prismaData.name = data.name;
    if (data.description !== undefined) prismaData.description = data.description;
    
    return prismaData;
  }

  /**
   * Find all roles sorted by name
   */
  async findAllSorted(): Promise<Role[]> {
    try {
      const roles = await this.prisma.role.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      
      return roles.map(r => this.mapToDomain(r));
    } catch (error) {
      throw new Error(`Error finding all roles: ${error}`);
    }
  }

  /**
   * Find role by name
   */
  async findByName(name: string): Promise<Role | null> {
    try {
      const role = await this.prisma.role.findUnique({
        where: { name },
      });
      return role ? this.mapToDomain(role) : null;
    } catch (error) {
      throw new Error(`Error finding role by name: ${error}`);
    }
  }

  /**
   * Check if role name exists
   */
  async nameExists(name: string): Promise<boolean> {
    try {
      const count = await this.prisma.role.count({
        where: { name },
      });
      return count > 0;
    } catch (error) {
      throw new Error(`Error checking role name existence: ${error}`);
    }
  }

  /**
   * Find roles by project ID
   */
  async findByProjectId(projectId: number): Promise<Role[]> {
    try {
      const roles = await this.prisma.role.findMany({
        where: {
          userRoles: {
            some: {
              projectId: projectId,
            },
          },
        },
      });
      
      return roles.map(r => this.mapToDomain(r));
    } catch (error) {
      throw new Error(`Error finding roles by project: ${error}`);
    }
  }

  /**
   * Count users with this role
   */
  async countUsers(roleId: number): Promise<number> {
    try {
      return await this.prisma.userRoleProject.count({
        where: {
          roleId: roleId,
        },
      });
    } catch (error) {
      throw new Error(`Error counting users with role: ${error}`);
    }
  }
  /**
   * Check if role is currently in use by any user
   */
  async isRoleInUse(roleId: number): Promise<boolean> {
    try {
      const count = await this.countUsers(roleId);
      return count > 0;
    } catch (error) {
      throw new Error(`Error checking role usage: ${error}`);
    }
  }
}