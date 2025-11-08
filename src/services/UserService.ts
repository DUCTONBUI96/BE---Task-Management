import { BaseService } from './base/BaseService';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO, LoginUserDTO, ChangePasswordDTO } from '../dtos/UserDTO';
import { genSalt } from 'bcrypt-ts';
import { hash } from 'crypto';

/**
 * UserService - Xử lý tất cả business logic liên quan đến User
 * Singleton Pattern
 */
export class UserService extends BaseService<User, string> {
  private static instance: UserService;
  private userRepository: UserRepository;

  private constructor() {
    const userRepository = UserRepository.getInstance();
    super(userRepository);
    this.userRepository = userRepository;
  }

  /**
   * Lấy singleton instance
   */
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Lấy tất cả users (không trả về password)
   */
  async getAllUsers(): Promise<UserResponseDTO[]> {
    try {
      const users = await this.userRepository.findAll();
      return users.map(user => this.mapToResponseDTO(user));
    } catch (error) {
      throw new Error(`Error getting all users: ${error}`);
    }
  }

  /**
   * Lấy user theo ID
   */
  async getUserById(id: string): Promise<UserResponseDTO> {
    try {
      const user = await this.getById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return this.mapToResponseDTO(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tạo user mới
   */
  async createUser(dto: CreateUserDTO): Promise<UserResponseDTO> {
    try {
      // Kiểm tra email đã tồn tại chưa
      const existingUser = await this.userRepository.findByEmail(dto.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Hash password - TODO: Implement proper password hashing
      const saltRounds = await genSalt(10);
      const hashedPassword = await hash(dto.password, saltRounds);

      // Tạo user
      const user = await this.repository.create({
        email: dto.email,
        name: dto.name,
        passwordhash: hashedPassword,
      } as Partial<User>);

      return this.mapToResponseDTO(user);
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  /**
   * Cập nhật thông tin user
   */
  async updateUser(id: string, dto: UpdateUserDTO): Promise<UserResponseDTO> {
    try {
      // Nếu cập nhật email, kiểm tra email mới có trùng không
      if (dto.email) {
        const existingUser = await this.userRepository.findByEmail(dto.email);
        if (existingUser && existingUser.id !== id) {
          throw new Error('Email already exists');
        }
      }

      const updatedUser = await this.update(id, dto as Partial<User>);
      return this.mapToResponseDTO(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa user
   */
  async deleteUser(id: string): Promise<boolean> {
    try {
      return await this.delete(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tìm user theo email
   */
  async findByEmail(email: string): Promise<UserResponseDTO | null> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return null;
      }
      return this.mapToResponseDTO(user);
    } catch (error) {
      throw new Error(`Error finding user by email: ${error}`);
    }
  }

  /**
   * Login user
   */
  async login(dto: LoginUserDTO): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepository.findByEmail(dto.email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // TODO: Implement proper password comparison with bcrypt
      const isPasswordValid = dto.password === user.passwordhash;
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      return this.mapToResponseDTO(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Đổi mật khẩu
   */
  async changePassword(userId: string, dto: ChangePasswordDTO): Promise<UserResponseDTO> {
    try {
      const user = await this.getById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify old password - TODO: Implement proper password comparison
      const isOldPasswordValid = dto.oldPassword === user.passwordhash;
      if (!isOldPasswordValid) {
        throw new Error('Old password is incorrect');
      }

      // Hash new password - TODO: Implement proper password hashing
      const hashedPassword = dto.newPassword;

      // Update password
      const updatedUser = await this.userRepository.updatePassword(userId, hashedPassword);
      return this.mapToResponseDTO(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy users theo project ID
   */
  async getUsersByProjectId(projectId: number): Promise<UserResponseDTO[]> {
    try {
      const users = await this.userRepository.findByProjectId(projectId);
      return users.map(user => this.mapToResponseDTO(user));
    } catch (error) {
      throw new Error(`Error getting users by project: ${error}`);
    }
  }

  /**
   * Map User entity sang UserResponseDTO
   */
  private mapToResponseDTO(user: User): UserResponseDTO {
    const dto: UserResponseDTO = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    
    if (user.createdAt) dto.createdAt = user.createdAt;
    if (user.updatedAt) dto.updatedAt = user.updatedAt;
    
    return dto;
  }

  /**
   * Validation trước khi tạo
   */
  protected override async validateCreate(data: Partial<User>): Promise<void> {
    if (!data.email || !data.name || !data.passwordhash) {
      throw new Error('Email, name, and password are required');
    }
  }

  /**
   * Validation trước khi cập nhật
   */
  protected override async validateUpdate(id: string, data: Partial<User>): Promise<void> {
    if (data.email && !this.isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }
    if (data.name && data.name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
  }

  /**
   * Kiểm tra email hợp lệ
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
