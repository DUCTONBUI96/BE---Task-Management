import { IRepository } from '../../interfaces/IRepository';

/**
 * BaseService - Abstract base class cho tất cả các services
 * Cung cấp các phương thức CRUD cơ bản
 * Áp dụng Generic Pattern để tái sử dụng code
 */
export abstract class BaseService<T, ID> {
  protected repository: IRepository<T, ID>;

  constructor(repository: IRepository<T, ID>) {
    this.repository = repository;
  }

  /**
   * Lấy tất cả entities
   */
  async getAll(): Promise<T[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw new Error(`Error getting all entities: ${error}`);
    }
  }

  /**
   * Lấy entity theo ID
   */
  async getById(id: ID): Promise<T | null> {
    try {
      const entity = await this.repository.findById(id);
      if (!entity) {
        throw new Error(`Entity with id ${id} not found`);
      }
      return entity;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tạo entity mới
   */
  async create(data: Partial<T>): Promise<T> {
    try {
      await this.validateCreate(data);
      return await this.repository.create(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cập nhật entity
   */
  async update(id: ID, data: Partial<T>): Promise<T> {
    try {
      // Kiểm tra entity có tồn tại không
      await this.getById(id);
      
      await this.validateUpdate(id, data);
      return await this.repository.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xóa entity
   */
  async delete(id: ID): Promise<boolean> {
    try {
      // Kiểm tra entity có tồn tại không
      await this.getById(id);
      
      await this.validateDelete(id);
      return await this.repository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kiểm tra entity có tồn tại không
   */
  async exists(id: ID): Promise<boolean> {
    try {
      return await this.repository.exists(id);
    } catch (error) {
      throw new Error(`Error checking entity existence: ${error}`);
    }
  }

  /**
   * Validate trước khi tạo (override trong subclass)
   */
  protected async validateCreate(data: Partial<T>): Promise<void> {
    // Implement validation logic in subclass
  }

  /**
   * Validate trước khi cập nhật (override trong subclass)
   */
  protected async validateUpdate(id: ID, data: Partial<T>): Promise<void> {
    // Implement validation logic in subclass
  }

  /**
   * Validate trước khi xóa (override trong subclass)
   */
  protected async validateDelete(id: ID): Promise<void> {
    // Implement validation logic in subclass
  }
}
