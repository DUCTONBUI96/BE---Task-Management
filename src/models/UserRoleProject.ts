/**
 * UserRoleProject Entity - Represents the many-to-many relationship between User, Role, and Project
 */
export class UserRoleProject {
  private _id: number;
  private _userId: string;
  private _roleId: number;
  private _projectId: number;

  constructor(
    id: number,
    userId: string,
    roleId: number,
    projectId: number
  ) {
    this._id = id;
    this._userId = userId;
    this._roleId = roleId;
    this._projectId = projectId;

    this.validate();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get roleId(): number {
    return this._roleId;
  }

  get projectId(): number {
    return this._projectId;
  }

  /**
   * Validate user role project data
   */
  private validate(): void {
    if (!this._userId) {
      throw new Error('User ID is required');
    }
    if (this._roleId <= 0) {
      throw new Error('Valid role ID is required');
    }
    if (this._projectId <= 0) {
      throw new Error('Valid project ID is required');
    }
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): object {
    return {
      id: this._id,
      userId: this._userId,
      roleId: this._roleId,
      projectId: this._projectId,
    };
  }

  /**
   * Create UserRoleProject instance from plain object
   */
  static fromObject(data: any): UserRoleProject {
    return new UserRoleProject(
      data.id,
      data.userId,
      data.roleId,
      data.projectId
    );
  }
}