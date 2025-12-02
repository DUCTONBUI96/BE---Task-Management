import express from 'express';
import { UserController } from '../controllers/UserController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

/**
 * Auth Routes
 * Xử lý tất cả authentication endpoints
 * 
 * Routes:
 * POST /auth/login - Đăng nhập
 * POST /auth/refresh - Làm mới access token
 * POST /auth/logout - Đăng xuất
 * POST /auth/logout-all - Đăng xuất từ tất cả devices
 */
const authRouter = express.Router();
const userController = new UserController();

// ============ PUBLIC ROUTES ============

/**
 * POST /auth/login
 * Đăng nhập người dùng
 * 
 * Request body:
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 * 
 * Response:
 * {
 *   "status": 200,
 *   "message": "Login successful",
 *   "data": {
 *     "accessToken": "eyJhbGc...",
 *     "user": { "id": "...", "email": "...", "name": "..." }
 *   }
 * }
 * 
 * Cookie: refreshToken (httpOnly, secure)
 */
authRouter.post('/auth/login', userController.login);

/**
 * POST /auth/refresh
 * Làm mới access token dùng refresh token
 * 
 * Request body hoặc cookie: refreshToken
 * 
 * Response:
 * {
 *   "status": 200,
 *   "message": "Token refreshed",
 *   "data": {
 *     "accessToken": "eyJhbGc..."
 *   }
 * }
 */
authRouter.post('/auth/refresh', userController.refreshToken);

// ============ PROTECTED ROUTES ============

/**
 * POST /auth/logout
 * Đăng xuất người dùng
 * 
 * Headers: Authorization: Bearer <accessToken>
 * Cookie hoặc body: refreshToken
 * 
 * Response:
 * {
 *   "status": 200,
 *   "message": "Logout successful"
 * }
 */
authRouter.post(
  '/auth/logout',
  AuthMiddleware.verifyAccessToken,
  userController.logout
);

/**
 * POST /auth/logout-all
 * Đăng xuất từ tất cả devices
 * 
 * Headers: Authorization: Bearer <accessToken>
 * 
 * Response:
 * {
 *   "status": 200,
 *   "message": "Logged out from all devices"
 * }
 */
authRouter.post(
  '/auth/logout-all',
  AuthMiddleware.verifyAccessToken,
  userController.logoutAll
);

/**
 * GET /auth/me
 * Lấy thông tin user hiện tại
 * 
 * Headers: Authorization: Bearer <accessToken>
 * 
 * Response:
 * {
 *   "status": 200,
 *   "message": "Success",
 *   "data": { "id": "...", "email": "...", "name": "..." }
 * }
 */
authRouter.get(
  '/auth/me',
  AuthMiddleware.verifyAccessToken,
  userController.getCurrentUser
);

export default authRouter;
