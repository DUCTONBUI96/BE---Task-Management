/**
 * User Entity - Represents a user in the system
 * Implements encapsulation and validation logic
 */
export class User {
  private _id: string;
  private _email: string;
  private _name: string;
  private _passwordHash: string;
  private _avatarUrl: string | undefined;
  private _avatarId: string | undefined;
  private _createdAt: Date | undefined;
  private _updatedAt: Date | undefined;

  constructor(
    id: string,
    email: string,
    name: string,
    passwordHash: string,
    avatarUrl?: string,
    avatarId?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = id;
    this._email = email;
    this._name = name;
    this._passwordHash = passwordHash;
    this._avatarUrl = avatarUrl;
    this._avatarId = avatarId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    
    this.validate();
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get avatarUrl(): string | undefined {
    return this._avatarUrl;
  }

  get avatarId(): string | undefined {
    return this._avatarId;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  // Setters with validation
  set email(value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error('Invalid email format');
    }
    this._email = value;
  }

  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this._name = value.trim();
  }

  set passwordhash(value: string) {
    if (!value || value.length < 10) {
      throw new Error('Password hash is required and must be at least 10 characters');
    }
    this._passwordHash = value;
  }

  set avatarUrl(value: string | undefined) {
    if (!value) {
      throw new Error('Avatar URL cannot be empty');
    }
    this._avatarUrl = value;
  }

  set avatarId(value: string | undefined) {
    if (!value) {
      throw new Error('Avatar ID cannot be empty');
    }
    this._avatarId = value;
  }

  /**
   * Validate user data
   */
  private validate(): void {
    if (!this._id) {
      throw new Error('User ID is required');
    }
    if (!this.isValidEmail(this._email)) {
      throw new Error('Invalid email format');
    }
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!this._passwordHash) {
      throw new Error('Password hash is required');
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Update user information
   */
  updateInfo(name?: string, email?: string): void {
    if (name) this.name = name;
    if (email) this.email = email;
    this._updatedAt = new Date();
  }

  /**
   * Update avatar information
   */
  updateAvatar(avatarUrl: string, avatarId: string): void {
    this.avatarUrl = avatarUrl;
    this.avatarId = avatarId;
    this._updatedAt = new Date();
  }

  /**
   * Change password hash
   */
  changePasswordHash(newPasswordHash: string): void {
    this.passwordhash = newPasswordHash;
    this._updatedAt = new Date();
  }

  /**
   * Convert to JSON representation (without sensitive data)
   */
  toJSON(): object {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
      avatarUrl: this._avatarUrl,
      avatarId: this._avatarId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  /**
   * Convert to plain object (including sensitive data)
   */
  toObject(): object {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
      passwordHash: this._passwordHash,
      avatarUrl: this._avatarUrl,
      avatarId: this._avatarId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  /**
   * Create User instance from plain object
   */
  static fromObject(data: any): User {
    return new User(
      data.id,
      data.email,
      data.name,
      data.passwordHash,
      data.avatarUrl,
      data.avatarId,
      data.createdAt,
      data.updatedAt
    );
  }
}