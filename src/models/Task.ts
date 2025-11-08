/**
 * Task Entity - Represents a task in the system
 */
export class Task {
  private _id: number;
  private _projectId: number;
  private _name: string;
  private _description: string | undefined;
  private _deadline: Date | undefined;
  private _statusId: number;
  private _priorityId: number;
  private _createdAt: Date | undefined;
  private _updatedAt: Date | undefined;

  constructor(
    id: number,
    projectId: number,
    name: string,
    statusId: number,
    priorityId: number,
    description?: string,
    deadline?: Date,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = id;
    this._projectId = projectId;
    this._name = name;
    this._statusId = statusId;
    this._priorityId = priorityId;
    this._description = description;
    this._deadline = deadline;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;

    this.validate();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get projectId(): number {
    return this._projectId;
  }

  get name(): string {
    return this._name;
  }

  get description(): string | undefined {
    return this._description;
  }

  get deadline(): Date | undefined {
    return this._deadline;
  }

  get statusId(): number {
    return this._statusId;
  }

  get priorityId(): number {
    return this._priorityId;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  // Setters with validation
  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Task name cannot be empty');
    }
    if (value.length > 255) {
      throw new Error('Task name cannot exceed 255 characters');
    }
    this._name = value.trim();
  }

  set description(value: string | undefined) {
    if (value && value.length > 2000) {
      throw new Error('Description cannot exceed 2000 characters');
    }
    this._description = value;
  }

  set deadline(value: Date | undefined) {
    if (value && value < new Date()) {
      throw new Error('Deadline cannot be in the past');
    }
    this._deadline = value;
  }

  set statusId(value: number) {
    if (value <= 0) {
      throw new Error('Invalid status ID');
    }
    this._statusId = value;
  }

  set priorityId(value: number) {
    if (value <= 0) {
      throw new Error('Invalid priority ID');
    }
    this._priorityId = value;
  }

  /**
   * Validate task data
   */
  private validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Task name is required');
    }
    if (this._projectId <= 0) {
      throw new Error('Valid project ID is required');
    }
    if (this._statusId <= 0) {
      throw new Error('Valid status ID is required');
    }
    if (this._priorityId <= 0) {
      throw new Error('Valid priority ID is required');
    }
  }

  /**
   * Update task information
   */
  updateInfo(data: {
    name?: string;
    description?: string;
    deadline?: Date;
    statusId?: number;
    priorityId?: number;
  }): void {
    if (data.name !== undefined) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.deadline !== undefined) this.deadline = data.deadline;
    if (data.statusId !== undefined) this.statusId = data.statusId;
    if (data.priorityId !== undefined) this.priorityId = data.priorityId;
    this._updatedAt = new Date();
  }

  /**
   * Check if task is overdue
   */
  isOverdue(): boolean {
    return !!this._deadline && this._deadline < new Date();
  }

  /**
   * Check if task has deadline
   */
  hasDeadline(): boolean {
    return !!this._deadline;
  }

  /**
   * Get days until deadline
   */
  getDaysUntilDeadline(): number | null {
    if (!this._deadline) return null;
    const now = new Date();
    const diff = this._deadline.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): object {
    return {
      id: this._id,
      projectId: this._projectId,
      name: this._name,
      description: this._description,
      deadline: this._deadline,
      statusId: this._statusId,
      priorityId: this._priorityId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  /**
   * Create Task instance from plain object
   */
  static fromObject(data: any): Task {
    return new Task(
      data.id,
      data.projectId,
      data.name,
      data.statusId,
      data.priorityId,
      data.description,
      data.deadline,
      data.createdAt,
      data.updatedAt
    );
  }
}