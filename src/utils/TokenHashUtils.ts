import crypto from 'crypto';

/**
 * TokenHashUtils - Hashing tokens trước khi lưu vào database
 * Lý do: Nếu database bị lộ, hacker vẫn không thể dùng token hash này
 */
export class TokenHashUtils {
  /**
   * Hash refresh token bằng SHA256 trước khi lưu vào database
   * @param token - Raw refresh token
   * @returns Hashed token
   */
  static hashToken(token: string): string {
    return crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
  }

  /**
   * So sánh raw token với hash đã lưu trong database
   * @param token - Raw token
   * @param tokenHash - Hash từ database
   * @returns true nếu token match với hash
   */
  static verifyToken(token: string, tokenHash: string): boolean {
    const hash = this.hashToken(token);
    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(tokenHash)
    );
  }
}
