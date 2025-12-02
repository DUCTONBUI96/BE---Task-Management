/**
 * RefreshTokenSession Model
 * Lưu trữ refresh token sessions của users
 * 
 * Quản lý:
 * - Token hash (không lưu token thô vì bảo mật)
 * - Thời hạn token
 * - Trạng thái revoke (logout, suspicious activity)
 * - IP address và User Agent để detect hacker
 * - Timestamps
 */
export class RefreshTokenSession {
  private _id: string;
  private _userId: string;
  private _refreshTokenHash: string;
  private _expiresAt: Date;
  private _revokedAt: Date | null;
  private _ipAddress: string;
  private _userAgent: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    refreshTokenHash: string,
    expiresAt: Date,
    ipAddress: string,
    userAgent: string,
    createdAt?: Date,
    updatedAt?: Date,
    revokedAt?: Date | null
  ) {
    this._id = id;
    this._userId = userId;
    this._refreshTokenHash = refreshTokenHash;
    this._expiresAt = expiresAt;
    this._ipAddress = ipAddress;
    this._userAgent = userAgent;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
    this._revokedAt = revokedAt || null;

    this.validate();
  }

  // ============ GETTERS ============

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get refreshTokenHash(): string {
    return this._refreshTokenHash;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  get ipAddress(): string {
    return this._ipAddress;
  }

  get userAgent(): string {
    return this._userAgent;
  }

  get revokedAt(): Date | null {
    return this._revokedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // ============ BUSINESS LOGIC METHODS ============

  /**
   * Check nếu token đã bị revoke (logout hoặc suspicious activity detected)
   */
  isRevoked(): boolean {
    return this._revokedAt !== null;
  }

  /**
   * Check nếu token hết hạn
   */
  isExpired(): boolean {
    return new Date() > this._expiresAt;
  }

  /**
   * Revoke token - vô hiệu hóa token này
   * Sử dụng khi user logout hoặc detect suspicious activity
   */
  revoke(): void {
    this._revokedAt = new Date();
    this._updatedAt = new Date();
  }

  /**
   * Check nếu session còn valid (chưa revoke, chưa hết hạn)
   */
  isValid(): boolean {
    return !this.isExpired() && !this.isRevoked();
  }

  /**
   * Check nếu IP address thay đổi (detect hacker)
   */
  hasIpChanged(newIp: string): boolean {
    return this._ipAddress !== newIp;
  }

  /**
   * Check nếu User Agent thay đổi (detect hacker)
   */
  hasUserAgentChanged(newUserAgent: string): boolean {
    return this._userAgent !== newUserAgent;
  }

  /**
   * Validate session integrity
   */
  private validate(): void {
    if (!this._id || !this._userId || !this._refreshTokenHash) {
      throw new Error('RefreshTokenSession requires id, userId, and refreshTokenHash');
    }
  }

  // ============ SERIALIZATION ============

  toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      refreshTokenHash: this._refreshTokenHash,
      expiresAt: this._expiresAt,
      ipAddress: this._ipAddress,
      userAgent: this._userAgent,
      revokedAt: this._revokedAt,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      isValid: this.isValid(),
      isRevoked: this.isRevoked(),
      isExpired: this.isExpired(),
    };
  }

  /**
   * Tạo RefreshTokenSession từ plain object
   */
  static fromJSON(data: any): RefreshTokenSession {
    return new RefreshTokenSession(
      data.id,
      data.userId,
      data.refreshTokenHash,
      new Date(data.expiresAt),
      data.ipAddress,
      data.userAgent,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.revokedAt ? new Date(data.revokedAt) : null
    );
  }
}
