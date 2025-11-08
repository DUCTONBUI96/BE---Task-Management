/**
 * Project Entity - Represents a project in the system
 */
export class Project {
  private _id: number;
  private _name: string;
  private _description: string | undefined;
  private _createdAt: Date | undefined;
  private _updatedAt: Date | undefined;

  constructor(
    id: number,
    name: string,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;

    this.validate();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string | undefined {
    return this._description;
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
      throw new Error('Project name cannot be empty');
    }
    if (value.length > 255) {
      throw new Error('Project name cannot exceed 255 characters');
    }
    this._name = value.trim();
  }

  set description(value: string | undefined) {
    if (value && value.length > 1000) {
      throw new Error('Description cannot exceed 1000 characters');
    }
    this._description = value;
  }

  /**
   * Validate project data
   */
  private validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Project name is required');
    }
    if (this._name.length > 255) {
      throw new Error('Project name cannot exceed 255 characters');
    }
  }

  /**
   * Update project information
   */
  updateInfo(name?: string, description?: string): void {
    if (name !== undefined) this.name = name;
    if (description !== undefined) this.description = description;
    this._updatedAt = new Date();
  }

  /**
   * Check if project has description
   */
  hasDescription(): boolean {
    return !!this._description && this._description.trim().length > 0;
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  /**
   * Create Project instance from plain object
   */
  static fromObject(data: any): Project {
    return new Project(
      data.id,
      data.name,
      data.description,
      data.createdAt,
      data.updatedAt
    );
  }
}