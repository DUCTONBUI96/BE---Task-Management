import { BaseService } from './base/BaseService';
import { RefreshTokenSession } from '../models/RefreshTokenSession';
import { RefreshTokenSessionRepository } from '../repositories/RefreshTokenSessionRepository';
import { UserService } from './UserService';
import { TokenUtils } from '../utils/TokenUtils';
import { TokenHashUtils } from '../utils/TokenHashUtils';
import { 
  LoginRequestDTO, 
  LoginResponseDTO, 
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
  LogoutDTO,
  LogoutAllDTO
} from '../dtos/AuthDTO';
import { compare } from 'bcrypt-ts';

/**
 * AuthService - Xử lý tất cả business logic liên quan đến authentication
 * 
 * Tính năng:
 * - Login: xác thực user, tạo access token + refresh token
 * - Refresh Token: tạo access token mới từ refresh token
 * - Logout: vô hiệu hóa refresh token
 * - Logout All: logout từ tất cả devices
 * - Detect suspicious activity: IP/User Agent change detection
 * 
 * Singleton Pattern
 */
export class AuthService extends BaseService<RefreshTokenSession, string> {
  private static instance: AuthService;
  private refreshTokenRepository: RefreshTokenSessionRepository;
  private userService: UserService;

  private constructor() {
    const refreshTokenRepository = RefreshTokenSessionRepository.getInstance();
    super(refreshTokenRepository);
    this.refreshTokenRepository = refreshTokenRepository;
    this.userService = UserService.getInstance();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Login - Xác thực người dùng và tạo access token + refresh token
   * 
   * @param dto - Email và password
   * @param ipAddress - IP address của client
   * @param userAgent - User agent của client
   * @returns LoginResponseDTO chứa access token, refresh token, và user info
   * @throws Error nếu email/password invalid
   */
  async login(
    dto: LoginRequestDTO,
    ipAddress: string,
    userAgent: string
  ): Promise<LoginResponseDTO> {
    try {
      // Bước 1: Tìm user by email
      const user = await this.userService.findByEmail(dto.email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Bước 2: Get raw user data with password
      const rawUser = await this.userService.getById(user.id);
      if (!rawUser) {
        throw new Error('User not found');
      }

      // Get password hash from the user object
      const userModel = (rawUser as any);
      const passwordHash = userModel._passwordHash || userModel.passwordHash;
      
      // Verify password
      const isPasswordValid = await compare(dto.password, passwordHash);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Bước 3: Tạo access token (2 giờ)
      const accessToken = TokenUtils.generateAccessToken(user.id, user.email);
      
      // Bước 4: Tạo refresh token (10 giờ)
      const refreshToken = TokenUtils.generateRefreshToken(user.id);
      const refreshTokenHash = TokenHashUtils.hashToken(refreshToken);

      // Bước 5: Tính thời hạn refresh token (10 giờ)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 10);

      // Bước 6: Lưu refresh token session vào database
      await this.repository.create({
        userId: user.id,
        refreshTokenHash: refreshTokenHash,
        expiresAt: expiresAt,
        ipAddress: ipAddress,
        userAgent: userAgent,
      } as Partial<RefreshTokenSession>);

      // Bước 7: Cleanup - xóa expired sessions của user
      await this.refreshTokenRepository.deleteExpiredSessions(user.id);

      return {
        accessToken,
        refreshToken, // Gửi raw token cho client (không phải hash)
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Refresh Access Token - Tạo access token mới từ refresh token
   * 
   * @param dto - Refresh token
   * @param ipAddress - IP address của client
   * @param userAgent - User agent của client
   * @returns RefreshTokenResponseDTO chứa access token mới + refresh token mới
   * @throws Error nếu token invalid, expired, hoặc revoked
   * @throws Error nếu detect suspicious activity (IP/UA change)
   */
  async refreshAccessToken(
    dto: RefreshTokenRequestDTO,
    ipAddress: string,
    userAgent: string
  ): Promise<RefreshTokenResponseDTO> {
    try {
      // Bước 1: Verify refresh token signature
      const decoded = TokenUtils.verifyRefreshToken(dto.refreshToken);

      // Bước 2: Hash token để so sánh với database
      const refreshTokenHash = TokenHashUtils.hashToken(dto.refreshToken);

      // Bước 3: Tìm session trong database
      const session = await this.refreshTokenRepository.findByTokenHash(refreshTokenHash);
      if (!session) {
        throw new Error('Invalid refresh token');
      }

      // Bước 4: Check nếu token bị revoke
      if (session.isRevoked()) {
        throw new Error('Token has been revoked');
      }

      // Bước 5: Check nếu token hết hạn
      if (session.isExpired()) {
        await this.refreshTokenRepository.delete(session.id);
        throw new Error('Refresh token expired');
      }

      // Bước 6: DETECT HACKER - Check nếu IP hoặc User Agent thay đổi
      if (session.hasIpChanged(ipAddress) || session.hasUserAgentChanged(userAgent)) {
        console.warn(`⚠️ Suspicious activity detected for user ${session.userId}`);
        // console.warn(`Old IP: ${session.ipAddress}, New IP: ${ipAddress}`);
        // console.warn(`Old UA: ${session.userAgent}, New UA: ${userAgent}`);

        // Revoke tất cả sessions của user
        await this.refreshTokenRepository.revokeAllUserSessions(session.userId);
        
        throw new Error('Suspicious activity detected. All sessions have been revoked. Please login again.');
      }

      // Bước 7: Lấy user info
      const user = await this.userService.getById(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Bước 8: Tạo access token mới
      const newAccessToken = TokenUtils.generateAccessToken(user.id, user.email);
      
      // Bước 9: Tạo refresh token mới
      const newRefreshToken = TokenUtils.generateRefreshToken(user.id);
      const newRefreshTokenHash = TokenHashUtils.hashToken(newRefreshToken);

      // Bước 10: Tính expiry time
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 10);

      // Bước 11: Xóa session cũ và tạo session mới
      await this.refreshTokenRepository.delete(session.id);
      await this.repository.create({
        userId: user.id,
        refreshTokenHash: newRefreshTokenHash,
        expiresAt: expiresAt,
        ipAddress: ipAddress,
        userAgent: userAgent,
      } as Partial<RefreshTokenSession>);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout - Xóa refresh token session hoàn toàn
   * Token không thể dùng lại nữa
   * 
   * @param dto - userId và refresh token
   * @throws Error nếu không tìm được session
   */
  async logout(dto: LogoutDTO): Promise<void> {
    try {
      const refreshTokenHash = TokenHashUtils.hashToken(dto.refreshToken);
      // Xóa token hoàn toàn khỏi database
      await this.refreshTokenRepository.deleteByTokenHash(refreshTokenHash);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout All - Logout từ tất cả devices
   * Revoke tất cả refresh token sessions của user
   * 
   * @param dto - userId
   */
  async logoutAll(dto: LogoutAllDTO): Promise<void> {
    try {
      await this.refreshTokenRepository.revokeAllUserSessions(dto.userId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify Access Token
   * Được gọi từ AuthMiddleware để verify access token
   */
  verifyAccessToken(token: string): any {
    return TokenUtils.verifyAccessToken(token);
  }

  /**
   * Get all active sessions của một user
   * Dùng cho management, kiểm tra devices đã login
   */
  async getActiveSessionsByUserId(userId: string): Promise<RefreshTokenSession[]> {
    try {
      return await this.refreshTokenRepository.findActiveByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validate data trước khi create (BaseService requirement)
   */
  protected override async validateCreate(data: Partial<RefreshTokenSession>): Promise<void> {
    // Validation không cần thiết vì validate ở service layer
    return Promise.resolve();
  }
}
