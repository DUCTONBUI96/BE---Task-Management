/**
 * TaskPriority Entity - Represents task priority levels
 */
export class TaskPriority {
  private _id: number;
  private _name: string;
  private _level: number;
  private _createdAt: Date | undefined;

  constructor(
    id: number,
    name: string,
    level: number = 0,
    createdAt?: Date
  ) {
    this._id = id;
    this._name = name;
    this._level = level;
    this._createdAt = createdAt;

    this.validate();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get level(): number {
    return this._level;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  // Setters
  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Priority name cannot be empty');
    }
    this._name = value.trim();
  }

  set level(value: number) {
    if (value < 0) {
      throw new Error('Priority level cannot be negative');
    }
    this._level = value;
  }

  /**
   * Validate priority data
   */
  private validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Priority name is required');
    }
    if (this._level < 0) {
      throw new Error('Priority level cannot be negative');
    }
  }

  /**
   * Compare priority levels
   */
  isHigherThan(other: TaskPriority): boolean {
    return this._level > other._level;
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      level: this._level,
      createdAt: this._createdAt,
    };
  }

  /**
   * Create TaskPriority instance from plain object
   */
  static fromObject(data: any): TaskPriority {
    return new TaskPriority(
      data.id,
      data.name,
      data.level || 0,
      data.createdAt
    );
  }
}