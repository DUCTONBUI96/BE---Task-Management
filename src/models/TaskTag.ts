/**
 * TaskTag Entity - Represents the many-to-many relationship between Task and Tag
 */
export class TaskTag {
  private _id: number;
  private _taskId: number;
  private _tagId: number;

  constructor(
    id: number,
    taskId: number,
    tagId: number
  ) {
    this._id = id;
    this._taskId = taskId;
    this._tagId = tagId;

    this.validate();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get taskId(): number {
    return this._taskId;
  }

  get tagId(): number {
    return this._tagId;
  }

  /**
   * Validate task tag data
   */
  private validate(): void {
    if (this._taskId <= 0) {
      throw new Error('Valid task ID is required');
    }
    if (this._tagId <= 0) {
      throw new Error('Valid tag ID is required');
    }
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): object {
    return {
      id: this._id,
      taskId: this._taskId,
      tagId: this._tagId,
    };
  }

  /**
   * Create TaskTag instance from plain object
   */
  static fromObject(data: any): TaskTag {
    return new TaskTag(
      data.id,
      data.taskId,
      data.tagId
    );
  }
}