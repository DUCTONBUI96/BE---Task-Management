/**
 * Role Entity - Represents a user role in the system
 */
export class Role {
  private _id: number;
  private _name: string;
  private _description: string | undefined;
  private _createdAt: Date | undefined;

  constructor(
    id: number,
    name: string,
    description?: string,
    createdAt?: Date
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
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

  get description(): string | undefined {
    return this._description;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  // Setters with validation
  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Role name cannot be empty');
    }
    if (value.length > 100) {
      throw new Error('Role name cannot exceed 100 characters');
    }
    this._name = value.trim();
  }

  set description(value: string | undefined) {
    if (value && value.length > 500) {
      throw new Error('Description cannot exceed 500 characters');
    }
    this._description = value;
  }

  /**
   * Validate role data
   */
  private validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Role name is required');
    }
  }

  /**
   * Update role information
   */
  updateInfo(name?: string, description?: string): void {
    if (name !== undefined) this.name = name;
    if (description !== undefined) this.description = description;
  }

  /**
   * Check if role has description
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
    };
  }

  /**
   * Create Role instance from plain object
   */
  static fromObject(data: any): Role {
    return new Role(
      data.id,
      data.name,
      data.description,
      data.createdAt
    );
  }
}