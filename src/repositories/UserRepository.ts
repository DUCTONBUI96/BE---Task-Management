import { BaseRepository } from './base/BaseRepository';
import { User } from '../models/User';

/**
 * UserRepository - Handles all database operations for User entity
 * Implements Singleton pattern
 */
export class UserRepository extends BaseRepository<User, string> {
  private static instance: UserRepository;

  private constructor() {
    super('User');
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  protected getDelegate() {
    return this.prisma.user;
  }

  protected mapToDomain(data: any): User {
    return new User(
      data.id,
      data.email,
      data.name,
      data.passwordhash,
      data.createdAt,
      data.updatedAt
    );
  }

  protected mapToPrisma(data: Partial<User>): any {
    const prismaData: any = {};
    
    if (data.id !== undefined) prismaData.id = data.id;
    if (data.email !== undefined) prismaData.email = data.email;
    if (data.name !== undefined) prismaData.name = data.name;
    if (data.passwordhash !== undefined) prismaData.passwordhash = data.passwordhash;
    
    return prismaData;
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      return user ? this.mapToDomain(user) : null;
    } catch (error) {
      throw new Error(`Error finding user by email: ${error}`);
    }
  }

  /**
   * Find all users with basic info (excluding password)
   */
  async findAllBasicInfo(): Promise<Omit<User, 'passwordhash'>[]> {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      
      return users.map(u => {
        const user = new User(u.id, u.email, u.name, '', u.createdAt, u.updatedAt);
        return user.toJSON() as any;
      });
    } catch (error) {
      throw new Error(`Error finding all users: ${error}`);
    }
  }

  /**
   * Update user password
   */
  async updatePassword(userId: string, newPasswordHash: string): Promise<User> {
    try {
      const updated = await this.prisma.user.update({
        where: { id: userId },
        data: { passwordhash: newPasswordHash },
      });
      return this.mapToDomain(updated);
    } catch (error) {
      throw new Error(`Error updating password: ${error}`);
    }
  }

  /**
   * Check if email exists
   */
  async emailExists(email: string): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({
        where: { email },
      });
      return count > 0;
    } catch (error) {
      throw new Error(`Error checking email existence: ${error}`);
    }
  }

  /**
   * Find users by project ID
   */
  async findByProjectId(projectId: number): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          userRoles: {
            some: {
              projectId: projectId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          passwordhash: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      
      return users.map(u => this.mapToDomain(u));
    } catch (error) {
      throw new Error(`Error finding users by project: ${error}`);
    }
  }

  /**
   * Find users assigned to a task
   */
  async findByTaskId(taskId: number): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          assignedTasks: {
            some: {
              taskId: taskId,
            },
          },
        },
      });
      
      return users.map(u => this.mapToDomain(u));
    } catch (error) {
      throw new Error(`Error finding users by task: ${error}`);
    }
  }
}