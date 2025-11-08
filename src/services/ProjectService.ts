import { BaseService } from './base/BaseService';
import { Project } from '../models/Project';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { CreateProjectDTO, UpdateProjectDTO, ProjectResponseDTO, ProjectDetailDTO, AddMemberDTO } from '../dtos/ProjectDTO';
import { UserService } from './UserService';

/**
 * ProjectService - Xử lý tất cả business logic liên quan đến Project
 * Singleton Pattern
 */
export class ProjectService extends BaseService<Project, number> {
  private static instance: ProjectService;
  private projectRepository: ProjectRepository;
  private userService: UserService;

  private constructor() {
    const projectRepository = ProjectRepository.getInstance();
    super(projectRepository);
    this.projectRepository = projectRepository;
    this.userService = UserService.getInstance();
  }

  /**
   * Lấy singleton instance
   */
  public static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  /**
   * Lấy tất cả projects
   */
  async getAllProjects(): Promise<ProjectResponseDTO[]> {
    try {
      const projects = await this.projectRepository.findAll();
      return projects.map(project => this.mapToResponseDTO(project));
    } catch (error) {
      throw new Error(`Error getting all projects: ${error}`);
    }
  }

  /**
   * Lấy project theo ID
   */
  async getProjectById(id: number): Promise<ProjectResponseDTO> {
    try {
      const project = await this.getById(id);
      if (!project) {
        throw new Error('Project not found');
      }
      return this.mapToResponseDTO(project);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy project detail với members
   */
  async getProjectDetail(id: number): Promise<ProjectDetailDTO> {
    try {
      const project = await this.getById(id);
      if (!project) {
        throw new Error('Project not found');
      }

      // Lấy danh sách members
      const members = await this.projectRepository.findMembersByProjectId(id);

      return {
        ...this.mapToResponseDTO(project),
        members: members.map((m: any) => ({
          userId: m.user_id,
          roleId: m.role_id,
          userName: m.user?.name,
          userEmail: m.user?.email,
          roleName: m.role?.name,
        })),
      };
    } catch (error) {
      throw new Error(`Error getting project detail: ${error}`);
    }
  }

  /**
   * Tạo project mới
   */
  async createProject(dto: CreateProjectDTO): Promise<ProjectResponseDTO> {
    try {
      const project = await this.repository.create({
        name: dto.name,
        description: dto.description,
      } as Partial<Project>);

      return this.mapToResponseDTO(project);
    } catch (error) {
      throw new Error(`Error creating project: ${error}`);
    }
  }

  /**
   * Cập nhật project
   */
  async updateProject(id: number, dto: UpdateProjectDTO): Promise<ProjectResponseDTO> {
    try {
      const updatedProject = await this.update(id, dto as Partial<Project>);
      return this.mapToResponseDTO(updatedProject);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa project
   */
  async deleteProject(id: number): Promise<boolean> {
    try {
      // Kiểm tra project có tasks không
      const hasTasks = await this.projectRepository.hasActiveTasks(id);
      if (hasTasks) {
        throw new Error('Cannot delete project with active tasks');
      }

      return await this.delete(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Thêm member vào project
   */
  async addMember(projectId: number, dto: AddMemberDTO): Promise<void> {
    try {
      // Kiểm tra project tồn tại
      await this.getById(projectId);

      // Kiểm tra user tồn tại
      const userExists = await this.userService.exists(dto.userId);
      if (!userExists) {
        throw new Error('User not found');
      }

      // Kiểm tra user đã là member chưa
      const isMember = await this.projectRepository.isUserMember(projectId, dto.userId);
      if (isMember) {
        throw new Error('User is already a member of this project');
      }

      await this.projectRepository.addMember(projectId, dto.userId, dto.roleId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa member khỏi project
   */
  async removeMember(projectId: number, userId: string): Promise<void> {
    try {
      // Kiểm tra project tồn tại
      await this.getById(projectId);

      // Kiểm tra user có phải member không
      const isMember = await this.projectRepository.isUserMember(projectId, userId);
      if (!isMember) {
        throw new Error('User is not a member of this project');
      }

      await this.projectRepository.removeMember(projectId, userId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy tất cả members của project
   */
  async getProjectMembers(projectId: number) {
    try {
      // Kiểm tra project tồn tại
      await this.getById(projectId);

      const members = await this.projectRepository.findMembersByProjectId(projectId);
      return members.map((m: any) => ({
        userId: m.user_id,
        roleId: m.role_id,
        userName: m.user?.name,
        userEmail: m.user?.email,
        roleName: m.role?.name,
      }));
    } catch (error) {
      throw new Error(`Error getting project members: ${error}`);
    }
  }

  /**
   * Map Project entity sang ProjectResponseDTO
   */
  private mapToResponseDTO(project: Project): ProjectResponseDTO {
    const dto: any = {
      id: project.id,
      name: project.name,
    };

    if (project.description) dto.description = project.description;
    if (project.createdAt) dto.createdAt = project.createdAt;
    if (project.updatedAt) dto.updatedAt = project.updatedAt;

    return dto;
  }

  /**
   * Validation trước khi tạo
   */
  protected override async validateCreate(data: Partial<Project>): Promise<void> {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Project name is required');
    }
  }

  /**
   * Validation trước khi cập nhật
   */
  protected override async validateUpdate(id: number, data: Partial<Project>): Promise<void> {
    if (data.name && data.name.trim().length === 0) {
      throw new Error('Project name cannot be empty');
    }
  }

  /**
   * Validation trước khi xóa
   */
  protected override async validateDelete(id: number): Promise<void> {
    const hasTasks = await this.projectRepository.hasActiveTasks(id);
    if (hasTasks) {
      throw new Error('Cannot delete project with active tasks');
    }
  }
}
