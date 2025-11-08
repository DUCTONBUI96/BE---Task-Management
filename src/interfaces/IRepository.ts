/**
 * Generic Repository Interface
 * Defines standard CRUD operations for all repositories
 */
export interface IRepository<T, ID> {
  /**
   * Find all entities
   */
  findAll(): Promise<T[]>;

  /**
   * Find entity by ID
   * @param id - Entity identifier
   */
  findById(id: ID): Promise<T | null>;

  /**
   * Create a new entity
   * @param data - Entity data
   */
  create(data: Partial<T>): Promise<T>;

  /**
   * Update an existing entity
   * @param id - Entity identifier
   * @param data - Updated entity data
   */
  update(id: ID, data: Partial<T>): Promise<T>;

  /**
   * Delete an entity
   * @param id - Entity identifier
   */
  delete(id: ID): Promise<boolean>;

  /**
   * Check if entity exists
   * @param id - Entity identifier
   */
  exists(id: ID): Promise<boolean>;
}
