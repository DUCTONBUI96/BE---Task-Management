/**
 * Data Transfer Objects (DTOs) for Metrics/Statistics
 */

/**
 * DTO for project statistics response
 */
export interface ProjectStatisticsDTO {
  overview: {
    totalTasks: number;
    inProgress: number;
    completed: number;
    teamMembers: number;
  };
  taskActivity: {
    [month: string]: number; // Jan, Feb, Mar, etc.
  };
  projectCompletion: number; // Percentage
}
