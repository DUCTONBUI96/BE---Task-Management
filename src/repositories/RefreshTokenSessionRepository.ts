import { BaseRepository } from './base/BaseRepository';
import { RefreshTokenSession } from '../models/RefreshTokenSession';

/**
 * RefreshTokenSessionRepository
 * Xử lý tất cả database operations cho refresh token sessions
 * 
 * Tính năng:
 * - Lưu/cập nhật/xóa token sessions
 * - Tìm kiếm token by hash
 * - Revoke token sessions
 * - Xóa expired sessions
 * - Detect suspicious activity (IP/UA change)
 */
export class RefreshTokenSessionRepository extends BaseRepository<RefreshTokenSession, string> {
  private static instance: RefreshTokenSessionRepository;

  private constructor() {
    super('refreshTokenSession');
  }

  public static getInstance(): RefreshTokenSessionRepository {
    if (!RefreshTokenSessionRepository.instance) {
      RefreshTokenSessionRepository.instance = new RefreshTokenSessionRepository();
    }
    return RefreshTokenSessionRepository.instance;
  }

  /**
   * Get Prisma delegate
   */
  protected getDelegate(): any {
    return this.prisma.refreshTokenSession;
  }

  /**
   * Tìm session by refresh token hash
   */
  async findByTokenHash(refreshTokenHash: string): Promise<RefreshTokenSession | null> {
    try {
      const session = await this.getDelegate().findUnique({
        where: { refreshTokenHash },
      });
      return session ? this.mapToDomain(session) : null;
    } catch (error) {
      throw new Error(`Error finding session by token hash: ${error}`);
    }
  }

  /**
   * Tìm tất cả sessions của một user
   */
  async findByUserId(userId: string): Promise<RefreshTokenSession[]> {
    try {
      const sessions = await this.getDelegate().findMany({
        where: { userId },
      });
      return sessions.map((s: any) => this.mapToDomain(s));
    } catch (error) {
      throw new Error(`Error finding sessions by user: ${error}`);
    }
  }

  /**
   * Tìm tất cả active (non-revoked, non-expired) sessions của user
   */
  async findActiveByUserId(userId: string): Promise<RefreshTokenSession[]> {
    try {
      const sessions = await this.getDelegate().findMany({
        where: {
          userId,
          revokedAt: null,
          expiresAt: { gt: new Date() },
        },
      });
      return sessions.map((s: any) => this.mapToDomain(s));
    } catch (error) {
      throw new Error(`Error finding active sessions: ${error}`);
    }
  }

  /**
   * Revoke một token session (logout)
   */
  async revokeSession(sessionId: string): Promise<RefreshTokenSession> {
    try {
      const updated = await this.getDelegate().update({
        where: { id: sessionId },
        data: { revokedAt: new Date() },
      });
      return this.mapToDomain(updated);
    } catch (error) {
      throw new Error(`Error revoking session: ${error}`);
    }
  }

  /**
   * Revoke tất cả sessions của một user (logout from all devices)
   */
  async revokeAllUserSessions(userId: string): Promise<number> {
    try {
      const result = await this.getDelegate().updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      return result.count;
    } catch (error) {
      throw new Error(`Error revoking user sessions: ${error}`);
    }
  }

  /**
   * Xóa expired sessions (cleanup database)
   */
  async deleteExpiredSessions(userId?: string): Promise<number> {
    try {
      const where = userId 
        ? { userId, expiresAt: { lt: new Date() } }
        : { expiresAt: { lt: new Date() } };

      const result = await this.getDelegate().deleteMany({
        where,
      });
      return result.count;
    } catch (error) {
      throw new Error(`Error deleting expired sessions: ${error}`);
    }
  }

  /**
   * Xóa một session by token hash (khi logout)
   */
  async deleteByTokenHash(refreshTokenHash: string): Promise<boolean> {
    try {
      const result = await this.getDelegate().delete({
        where: { refreshTokenHash },
      });
      return !!result;
    } catch (error) {
      return false;
    }
  }

  /**
   * Map Prisma data to domain model
   */
  protected mapToDomain(data: any): RefreshTokenSession {
    return new RefreshTokenSession(
      data.id,
      data.userId,
      data.refreshTokenHash,
      data.expiresAt,
      data.ipAddress,
      data.userAgent,
      data.createdAt,
      data.updatedAt,
      data.revokedAt
    );
  }

  /**
   * Map domain model to Prisma data
   */
  protected mapToPrisma(data: Partial<RefreshTokenSession>): any {
    const prismaData: any = {};
    
    if (data.userId) prismaData.userId = data.userId;
    if (data.refreshTokenHash) prismaData.refreshTokenHash = data.refreshTokenHash;
    if (data.expiresAt) prismaData.expiresAt = data.expiresAt;
    if (data.ipAddress) prismaData.ipAddress = data.ipAddress;
    if (data.userAgent) prismaData.userAgent = data.userAgent;
    if (data.revokedAt !== undefined) prismaData.revokedAt = data.revokedAt;
    
    return prismaData;
  }
}
