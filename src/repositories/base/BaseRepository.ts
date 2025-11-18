import { PrismaClient } from '@prisma/client';
import prisma from '../../config/prisma';
import { IRepository } from '../../interfaces/IRepository';

/**
 * Abstract Base Repository implementing common CRUD operations
 * All repositories should extend this class
 */
export abstract class BaseRepository<T, ID> implements IRepository<T, ID> {
  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  /**
   * Get the Prisma delegate for the model
   */
  protected abstract getDelegate(): any;

  /**
   * Map Prisma entity to domain model
   */
  protected abstract mapToDomain(data: any): T;

  /**
   * Map domain model to Prisma entity
   */
  protected abstract mapToPrisma(data: Partial<T>): any;

  async findAll(): Promise<T[]> {
    try {
      const entities = await this.getDelegate().findMany();
      return entities.map((entity: any) => this.mapToDomain(entity));
    } catch (error) {
      throw new Error(`Error finding all ${this.modelName}: ${error}`);
    }
  }

  async findById(id: ID): Promise<T | null> {
    try {
      const entity = await this.getDelegate().findUnique({
        where: { id },
      });
      return entity ? this.mapToDomain(entity) : null;
    } catch (error) {
      throw new Error(`Error finding ${this.modelName} by id ${id}: ${error}`);
    }
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const prismaData = this.mapToPrisma(data);
      const entity = await this.getDelegate().create({
        data: prismaData,
      });
      return this.mapToDomain(entity);
    } catch (error) {
      throw new Error(`Error creating ${this.modelName}: ${error}`);
    }
  }

  async update(id: ID, data: Partial<T>): Promise<T> {
    try {
      const prismaData = this.mapToPrisma(data);
      const entity = await this.getDelegate().update({
        where: { id },
        data: prismaData,
      });
      return this.mapToDomain(entity);
    } catch (error) {
      throw new Error(`Error updating ${this.modelName} with id ${id}: ${error}`);
    }
  }

  async delete(id: ID): Promise<boolean> {
    try {
      await this.getDelegate().delete({
        where: { id },
      });
      return true;
    } catch (error) {
      throw new Error(`Error deleting ${this.modelName} with id ${id}: ${error}`);
    }
  }

  async exists(id: ID): Promise<boolean> {
    try {
      const count = await this.getDelegate().count({
        where: { id },
      });
      return count > 0;
    } catch (error) {
      throw new Error(`Error checking existence of ${this.modelName} with id ${id}: ${error}`);
    }
  }

  /**
   * Begin a transaction
   */
  async transaction<R>(fn: (prisma: PrismaClient) => Promise<R>): Promise<R> {
    return await this.prisma.$transaction(async (tx: PrismaClient) => {
      return await fn(tx as PrismaClient);
    });
  }
}