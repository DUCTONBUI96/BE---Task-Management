/**
 * TaskStatus Entity - Represents task status types
 */
export class TaskStatus {
  private _id: number;
  private _name: string;
  private _createdAt: Date | undefined;

  constructor(
    id: number,
    name: string,
    createdAt?: Date
  ) {
    this._id = id;
    this._name = name;
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

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  // Setters
  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Status name cannot be empty');
    }
    this._name = value.trim();
  }

  /**
   * Validate status data
   */
  private validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Status name is required');
    }
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      createdAt: this._createdAt,
    };
  }

  /**
   * Create TaskStatus instance from plain object
   */
  static fromObject(data: any): TaskStatus {
    return new TaskStatus(
      data.id,
      data.name,
      data.createdAt
    );
  }
}