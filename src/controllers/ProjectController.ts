import { NextFunction, Response, Request } from 'express';
import { ProjectService } from '../services/ProjectService';
import { CreateProjectDTO, UpdateProjectDTO, AddMemberDTO } from '../dtos/ProjectDTO';

/**
 * ProjectController - Xử lý HTTP requests liên quan đến Project
 */
export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = ProjectService.getInstance();
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
   * GET /projects - Lấy tất cả projects
   */
  getAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projects = await this.projectService.getAllProjects();
      this.handleResponse(res, 200, 'Success', projects);
    } catch (err) {
      next(err);
    }
  };
  /**
   * GET /projects - Lấy tất cả projects
   */
  getAllProjectsDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projects = await this.projectService.getAllDetailsProjects();
      this.handleResponse(res, 200, 'Success', projects);
    } catch (err) {
      next(err);
    }
  };
  /**
   * GET /projects/:id - Lấy project theo ID
   */
  getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const project = await this.projectService.getProjectById(id);
      this.handleResponse(res, 200, 'Success', project);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /projects/:id/detail - Lấy project detail với members
   */
  getProjectDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const project = await this.projectService.getProjectDetail(id);
      this.handleResponse(res, 200, 'Success', project);
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /projects/:id/members - Lấy tất cả members của project
   */
  getProjectMembers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const members = await this.projectService.getProjectMembers(id);
      this.handleResponse(res, 200, 'Success', members);
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /projects - Tạo project mới
   */
  createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CreateProjectDTO = {
        name: req.body.name,
        description: req.body.description,
      };

      const project = await this.projectService.createProject(dto);
      this.handleResponse(res, 201, 'Project created successfully', project);
    } catch (err) {
      next(err);
    }
  };

  /**
   * PUT /projects/:id - Cập nhật project
   */
  updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      const dto: UpdateProjectDTO = {
        name: req.body.name,
        description: req.body.description,
      };

      const project = await this.projectService.updateProject(id, dto);
      this.handleResponse(res, 200, 'Project updated successfully', project);
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /projects/:id - Xóa project
   */
  deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      await this.projectService.deleteProject(id);
      this.handleResponse(res, 200, 'Project deleted successfully');
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /projects/:id/members - Thêm member vào project
   */
  addMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projectId = Number(req.params['id']);
      const dto: AddMemberDTO = {
        userId: req.body.UserId || req.body.userId,
        roleId: req.body.RoleId || req.body.roleId,
      };

      await this.projectService.addMember(projectId, dto);
      this.handleResponse(res, 201, 'Member added successfully');
    } catch (err) {
      next(err);
    }
  };

  /**
   * DELETE /projects/:projectId/members/:userId - Xóa member khỏi project
   */
  removeMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projectId = Number(req.params['projectId']);
      const userId = req.params['userId'] as string;

      await this.projectService.removeMember(projectId, userId);
      this.handleResponse(res, 200, 'Member removed successfully');
    } catch (err) {
      next(err);
    }
  };
}

// Export singleton instance
export default new ProjectController();
