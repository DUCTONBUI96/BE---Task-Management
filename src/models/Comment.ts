/**
 * Comment Entity - Represents a comment on a task
 */
export class Comment {
  private _id: number;
  private _taskId: number;
  private _userId: string;
  private _content: string;
  private _createdAt: Date | undefined;
  private _updatedAt: Date | undefined;

  constructor(
    id: number,
    taskId: number,
    userId: string,
    content: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = id;
    this._taskId = taskId;
    this._userId = userId;
    this._content = content;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;

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

  get content(): string {
    return this._content;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  // Setters with validation
  set content(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Comment content cannot be empty');
    }
    if (value.length > 1000) {
      throw new Error('Comment content cannot exceed 1000 characters');
    }
    this._content = value.trim();
  }

  /**
   * Validate comment data
   */
  private validate(): void {
    if (!this._content || this._content.trim().length === 0) {
      throw new Error('Comment content is required');
    }
    if (this._taskId <= 0) {
      throw new Error('Valid task ID is required');
    }
    if (!this._userId) {
      throw new Error('User ID is required');
    }
  }

  /**
   * Update comment content
   */
  updateContent(newContent: string): void {
    this.content = newContent;
    this._updatedAt = new Date();
  }

  /**
   * Check if comment has been edited
   */
  isEdited(): boolean {
    if (!this._createdAt || !this._updatedAt) return false;
    return this._updatedAt.getTime() > this._createdAt.getTime();
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): object {
    return {
      id: this._id,
      taskId: this._taskId,
      userId: this._userId,
      content: this._content,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  /**
   * Create Comment instance from plain object
   */
  static fromObject(data: any): Comment {
    return new Comment(
      data.id,
      data.taskId,
      data.userId,
      data.content,
      data.createdAt,
      data.updatedAt
    );
  }
}