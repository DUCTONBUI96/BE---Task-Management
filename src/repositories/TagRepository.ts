import { BaseRepository } from './base/BaseRepository';
import { Tag } from '../models/Tag';

/**
 * TagRepository - Handles all database operations for Tag entity
 * Implements Singleton pattern
 */
export class TagRepository extends BaseRepository<Tag, number> {
  private static instance: TagRepository;

  private constructor() {
    super('Tag');
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): TagRepository {
    if (!TagRepository.instance) {
      TagRepository.instance = new TagRepository();
    }
    return TagRepository.instance;
  }

  protected getDelegate() {
    return this.prisma.tag;
  }

  protected mapToDomain(data: any): Tag {
    return new Tag(
      data.id,
      data.name,
      data.createdAt
    );
  }

  protected mapToPrisma(data: Partial<Tag>): any {
    const prismaData: any = {};
    
    if (data.name !== undefined) prismaData.name = data.name;
    
    return prismaData;
  }

  /**
   * Find tag by name
   */
  async findByName(name: string): Promise<Tag | null> {
    try {
      const tag = await this.prisma.tag.findUnique({
        where: { name },
      });
      return tag ? this.mapToDomain(tag) : null;
    } catch (error) {
      throw new Error(`Error finding tag by name: ${error}`);
    }
  }

  /**
   * Check if tag name exists
   */
  async nameExists(name: string): Promise<boolean> {
    try {
      const count = await this.prisma.tag.count({
        where: { name },
      });
      return count > 0;
    } catch (error) {
      throw new Error(`Error checking tag name existence: ${error}`);
    }
  }

  /**
   * Find tags by task ID
   */
  async findByTaskId(taskId: number): Promise<Tag[]> {
    try {
      const tags = await this.prisma.tag.findMany({
        where: {
          taskTags: {
            some: {
              taskId: taskId,
            },
          },
        },
      });
      
      return tags.map(t => this.mapToDomain(t));
    } catch (error) {
      throw new Error(`Error finding tags by task: ${error}`);
    }
  }

  /**
   * Search tags by name
   */
  async searchByName(searchTerm: string): Promise<Tag[]> {
    try {
      const tags = await this.prisma.tag.findMany({
        where: {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      });
      
      return tags.map(t => this.mapToDomain(t));
    } catch (error) {
      throw new Error(`Error searching tags: ${error}`);
    }
  }

  /**
   * Count tasks with this tag
   */
  async countTasks(tagId: number): Promise<number> {
    try {
      return await this.prisma.taskTag.count({
        where: {
          tagId: tagId,
        },
      });
    } catch (error) {
      throw new Error(`Error counting tasks with tag: ${error}`);
    }
  }

  /**
   * Get popular tags (most used)
   */
  async findPopularTags(limit: number = 10): Promise<any[]> {
    try {
      const tags = await this.prisma.tag.findMany({
        include: {
          _count: {
            select: {
              taskTags: true,
            },
          },
        },
        orderBy: {
          taskTags: {
            _count: 'desc',
          },
        },
        take: limit,
      });
      
      return tags.map(t => ({
        ...this.mapToDomain(t).toJSON(),
        usageCount: t._count.taskTags,
      }));
    } catch (error) {
      throw new Error(`Error finding popular tags: ${error}`);
    }
  }
}
