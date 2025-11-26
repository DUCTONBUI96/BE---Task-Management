import { BaseRepository } from './base/BaseRepository';
import { Project } from '../models/Project';

/**
 * ProjectRepository - Handles all database operations for Project entity
 * Implements Singleton pattern
 */
export class ProjectRepository extends BaseRepository<Project, number> {
  private static instance: ProjectRepository;

  private constructor() {
    super('Project');
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ProjectRepository {
    if (!ProjectRepository.instance) {
      ProjectRepository.instance = new ProjectRepository();
    }
    return ProjectRepository.instance;
  }

  protected getDelegate() {
    return this.prisma.project;
  }

  protected mapToDomain(data: any): Project {
    return new Project(
      data.id,
      data.name,
      data.description,
      data.createdAt,
      data.updatedAt
    );
  }

  protected mapToPrisma(data: Partial<Project>): any {
    const prismaData: any = {};
    
    if (data.name !== undefined) prismaData.name = data.name;
    if (data.description !== undefined) prismaData.description = data.description;
    
    return prismaData;
  }

  /**
   * Find all projects with task counts, task complete and member counts
   */
  async findAllWithStats(): Promise<any[]> {
    try {
      const projects = await this.prisma.project.findMany({
        include: {
          tasks: {
            select: {
              id: true,
              name: true,
              deadline:true,
              statusId: true,
              priorityId:true,
            },
          },
          _count: {
            select: {
              tasks: true,
              userRoles: true,
            },
          },
        },
      });
  
      return projects.map(p => {
        const completedTaskCount = p.tasks.filter(t => t.statusId === 4).length; 
  
        return {
          ...this.mapToDomain(p).toJSON(),
          tasks: p.tasks,
          taskCount: p._count.tasks,
          memberCount: p._count.userRoles,
          completedTaskCount,
        };
      });
    } catch (error) {
      throw new Error(`Error finding projects with stats: ${error}`);
    }
  }
  
  //   /**
  //  * Find all projects with task counts and member counts
  //  */
  // async findAllWithStats(): Promise<any[]> {
  //   try {
  //     const projects = await this.prisma.project.findMany({
  //       include: {
  //         tasks: {
  //           select: {
  //             id: true,
  //             name: true,
  //             statusId: true,
  //           },
  //         },
  //         _count: {
  //           select: {
  //             tasks: true,
  //             userRoles: true,
  //           },
  //         },
  //       },
  //     });
      
  //     return projects.map(p => ({
  //       ...this.mapToDomain(p).toJSON(),
  //       tasks: p.tasks,
  //       taskCount: p._count.tasks,
  //       memberCount: p._count.userRoles,
  //     }));
  //   } catch (error) {
  //     throw new Error(`Error finding projects with stats: ${error}`);
  //   }
  // }
  /**
   * Find project by ID with detailed information
   */
  async findByIdWithDetails(id: number): Promise<any | null> {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id },
        include: {
          tasks: true,
          userRoles: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
              role: true,
            },
          },
        },
      });
      
      if (!project) return null;
      
      return {
        ...this.mapToDomain(project).toJSON(),
        tasks: project.tasks,
        members: project.userRoles.map(ur => ({
          userId: ur.user.id,
          userName: ur.user.name,
          email: ur.user.email,
          roleId: ur.role.id,
          roleName: ur.role.name,
        })),
      };
    } catch (error) {
      throw new Error(`Error finding project by id with details: ${error}`);
    }
  }

  /**
   * Get all members in a project
   */
  async findAllMembers(projectId: number): Promise<any[]> {
    try {
      const members = await this.prisma.userRoleProject.findMany({
        where: {
          projectId: projectId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          role: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return members.map(m => ({
        userId: m.user.id,
        userName: m.user.name,
        email: m.user.email,
        roleId: m.role.id,
        roleName: m.role.name,
      }));
    } catch (error) {
      throw new Error(`Error finding project members: ${error}`);
    }
  }

  /**
   * Add a member to a project with a role
   */
  async addMember(projectId: number, userId: string, roleId: number): Promise<any> {
    try {
      return await this.prisma.userRoleProject.create({
        data: {
          userId: userId,
          roleId: roleId,
          projectId: projectId,
        },
      });
    } catch (error) {
      throw new Error(`Error adding member to project: ${error}`);
    }
  }

  /**
   * Remove a member from a project
   */
  async removeMember(projectId: number, userId: string): Promise<boolean> {
    try {
      await this.prisma.userRoleProject.deleteMany({
        where: {
          userId: userId,
          projectId: projectId,
        },
      });
      return true;
    } catch (error) {
      throw new Error(`Error removing member from project: ${error}`);
    }
  }

  /**
   * Find projects by user ID
   */
  async findByUserId(userId: string): Promise<Project[]> {
    try {
      const projects = await this.prisma.project.findMany({
        where: {
          userRoles: {
            some: {
              userId: userId,
            },
          },
        },
      });
      
      return projects.map(p => this.mapToDomain(p));
    } catch (error) {
      throw new Error(`Error finding projects by user: ${error}`);
    }
  }

  /**
   * Search projects by name
   */
  async searchByName(searchTerm: string): Promise<Project[]> {
    try {
      const projects = await this.prisma.project.findMany({
        where: {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      });
      
      return projects.map(p => this.mapToDomain(p));
    } catch (error) {
      throw new Error(`Error searching projects: ${error}`);
    }
  }

  /**
   * Find all members of a project
   */
  async findMembersByProjectId(projectId: number): Promise<any[]> {
    try {
      const members = await this.prisma.userRoleProject.findMany({
        where: { projectId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          role: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return members;
    } catch (error) {
      throw new Error(`Error finding project members: ${error}`);
    }
  }

  /**
   * Check if user is a member of the project
   */
  async isUserMember(projectId: number, userId: string): Promise<boolean> {
    try {
      const member = await this.prisma.userRoleProject.findFirst({
        where: {
          projectId,
          userId,
        },
      });
      return !!member;
    } catch (error) {
      throw new Error(`Error checking user membership: ${error}`);
    }
  }

  /**
   * Check if project has active tasks
   */
  async hasActiveTasks(projectId: number): Promise<boolean> {
    try {
      const taskCount = await this.prisma.task.count({
        where: { projectId },
      });
      return taskCount > 0;
    } catch (error) {
      throw new Error(`Error checking active tasks: ${error}`);
    }
  }
}