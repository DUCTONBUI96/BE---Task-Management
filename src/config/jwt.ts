import * as crypto from "crypto";

/**
 * JWT Configuration
 * Cấu hình thời hạn token và secret keys (khóa bí mật để ký token)
 * 
 * LƯU Ý:
 * - SECRET KEY: Khóa bí mật dùng để TẠO và VERIFY token (lưu trong ENV)
 * - TOKEN: Mã JWT được tạo ra từ SECRET KEY (gửi cho client, KHÔNG lưu trong ENV)
 */
export const jwtConfig = {
  // Thời hạn access token: 2 giờ
  accessTokenExpiresIn: "2h",
  
  // Thời hạn refresh token: 10 giờ
  refreshTokenExpiresIn: "10h",
  
  // SECRET KEY để ký/verify access token (KHÔNG phải token!)
  accessTokenSecretKey: process.env["JWT_ACCESS_SECRET"] || crypto.randomBytes(64).toString("hex"),
  
  // SECRET KEY để ký/verify refresh token (KHÔNG phải token!)
  refreshTokenSecretKey: process.env["JWT_REFRESH_SECRET"] || crypto.randomBytes(64).toString("hex"),
};