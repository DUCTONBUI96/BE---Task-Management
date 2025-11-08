/**
 * UserTask Entity - Represents the assignment of a user to a task
 */
export class UserTask {
  private _id: number;
  private _taskId: number;
  private _userId: string;
  private _assignedAt: Date | undefined;

  constructor(
    id: number,
    taskId: number,
    userId: string,
    assignedAt?: Date
  ) {
    this._id = id;
    this._taskId = taskId;
    this._userId = userId;
    this._assignedAt = assignedAt;

    this.validate();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get taskId(): number {
    return this._taskId;
  }

  get userId(): string {
    return this._userId;
  }

  get assignedAt(): Date | undefined {
    return this._assignedAt;
  }

  /**
   * Validate user task data
   */
  private validate(): void {
    if (this._taskId <= 0) {
      throw new Error('Valid task ID is required');
    }
    if (!this._userId) {
      throw new Error('User ID is required');
    }
  }

  /**
   * Get assignment duration in days
   */
  getAssignmentDuration(): number | null {
    if (!this._assignedAt) return null;
    const now = new Date();
    const diff = now.getTime() - this._assignedAt.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): object {
    return {
      id: this._id,
      taskId: this._taskId,
      userId: this._userId,
      assignedAt: this._assignedAt,
    };
  }

  /**
   * Create UserTask instance from plain object
   */
  static fromObject(data: any): UserTask {
    return new UserTask(
      data.id,
      data.taskId,
      data.userId,
      data.assignedAt
    );
  }
}