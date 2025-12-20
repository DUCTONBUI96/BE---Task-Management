import prisma from '../config/prisma';

/**
 * MetricRepository - Handles all database operations for Metrics/Statistics
 * Singleton Pattern
 */
export class MetricRepository {
  private static instance: MetricRepository;

  private constructor() {}

  /**
   * Get singleton instance
   */
  public static getInstance(): MetricRepository {
    if (!MetricRepository.instance) {
      MetricRepository.instance = new MetricRepository();
    }
    return MetricRepository.instance;
  }

  /**
   * Get project statistics for the current year
   */
  async getProjectStatistics(projectId: number): Promise<any> {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

    // Get total tasks in current year
    const totalTasks = await prisma.task.count({
      where: {
        projectId,
        createdAt: {
          gte: startOfYear,
          lte: endOfYear,
        },
      },
    });

    // Get tasks by status (using status names)
    const inProgressStatus = await prisma.taskStatus.findFirst({
      where: { name: 'In Progress' },
    });

    const completedStatus = await prisma.taskStatus.findFirst({
      where: { name: 'Completed' },
    });

    const inProgressCount = inProgressStatus ? await prisma.task.count({
      where: {
        projectId,
        statusId: inProgressStatus.id,
        createdAt: {
          gte: startOfYear,
          lte: endOfYear,
        },
      },
    }) : 0;

    const completedCount = completedStatus ? await prisma.task.count({
      where: {
        projectId,
        statusId: completedStatus.id,
        createdAt: {
          gte: startOfYear,
          lte: endOfYear,
        },
      },
    }) : 0;

    // Get team members count
    const teamMembersCount = await prisma.userRoleProject.count({
      where: { projectId },
    });

    // Get tasks by month
    const tasksGroupedByMonth = await prisma.task.groupBy({
      by: ['createdAt'],
      where: {
        projectId,
        createdAt: {
          gte: startOfYear,
          lte: endOfYear,
        },
      },
      _count: true,
    });

    // Initialize monthly data
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const taskActivity: any = {};
    monthNames.forEach(month => {
      taskActivity[month] = 0;
    });

    // Count tasks per month
    tasksGroupedByMonth.forEach((task: any) => {
      const month = new Date(task.createdAt).getMonth();
      const monthName = monthNames[month];
      if (monthName) {
        taskActivity[monthName] += task._count;
      }
    });

    // Calculate project completion percentage
    const projectCompletion = totalTasks > 0 
      ? Math.round((completedCount / totalTasks) * 100) 
      : 0;

    return {
      overview: {
        totalTasks,
        inProgress: inProgressCount,
        completed: completedCount,
        teamMembers: teamMembersCount,
      },
      taskActivity,
      projectCompletion,
    };
  }
}
