import { MetricRepository } from '../repositories/MetricRepository';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { ProjectStatisticsDTO } from '../dtos/MetricDTO';
import { NotFoundError, ForbiddenError } from '../utils/CustomErrors';

/**
 * MetricService - Xử lý tất cả business logic liên quan đến Metrics/Statistics
 * Singleton Pattern
 */
export class MetricService {
  private static instance: MetricService;
  private metricRepository: MetricRepository;
  private projectRepository: ProjectRepository;

  private constructor() {
    this.metricRepository = MetricRepository.getInstance();
    this.projectRepository = ProjectRepository.getInstance();
  }

  /**
   * Lấy singleton instance
   */
  public static getInstance(): MetricService {
    if (!MetricService.instance) {
      MetricService.instance = new MetricService();
    }
    return MetricService.instance;
  }

  /**
   * Lấy thống kê của project
   */
  async getProjectStatistics(projectId: number, userId: string): Promise<ProjectStatisticsDTO> {
    // Kiểm tra project có tồn tại không
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new NotFoundError('Project not found');
    }

    // Kiểm tra user có trong project không
    const isMember = await this.projectRepository.isUserMember(projectId, userId);
    if (!isMember) {
      throw new ForbiddenError('You are not a member of this project');
    }

    // Lấy thống kê
    const statistics = await this.metricRepository.getProjectStatistics(projectId);
    return statistics;
  }
}
