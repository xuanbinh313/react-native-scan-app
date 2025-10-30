import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Product } from '../domain/product.entity.js';
import { ProductRepository } from '../domain/product.repository.js';
import { ProductOrmEntity } from './product.orm-entity.js';
import { FieldMapper } from '../../core/utils/field-mapper.util.js';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  private readonly validFields: string[];

  constructor(private readonly em: EntityManager) {
    // Get field names from MikroORM metadata for accurate field list
    const metadata = this.em.getMetadata().get('ProductOrmEntity');
    if (metadata) {
      this.validFields = Object.keys(metadata.properties);
    } else {
      // Fallback to manual extraction if metadata is not available
      this.validFields = FieldMapper.getValidFieldsFromEntity(ProductOrmEntity);
    }
  }

  async findById(id: string, fields?: string[]): Promise<Product | null> {
    const validatedFields = FieldMapper.validateFieldsWithList(fields, this.validFields, 'product');
    const selectFields = FieldMapper.mapFields(validatedFields);
    const options = selectFields ? { fields: selectFields as any } : {};
    const ormEntity = await this.em.findOne(
      ProductOrmEntity, 
      { id },
      options
    );

    if (!ormEntity) {
      return null;
    }

    return this.toDomain(ormEntity as ProductOrmEntity);
  }

  async findAll(fields?: string[]): Promise<Product[]> {
    const validatedFields = FieldMapper.validateFieldsWithList(fields, this.validFields, 'product');
    const selectFields = FieldMapper.mapFields(validatedFields);
    const options = selectFields ? { fields: selectFields as any } : {};
    const ormEntities = await this.em.find(
      ProductOrmEntity, 
      {},
      options
    );
    return ormEntities.map((entity) => this.toDomain(entity as ProductOrmEntity));
  }

  async findByName(name: string, fields?: string[]): Promise<Product | null> {
    const validatedFields = FieldMapper.validateFieldsWithList(fields, this.validFields, 'product');
    const selectFields = FieldMapper.mapFields(validatedFields);
    const options = selectFields ? { fields: selectFields as any } : {};
    const ormEntity = await this.em.findOne(
      ProductOrmEntity, 
      { name },
      options
    );

    if (!ormEntity) {
      return null;
    }

    return this.toDomain(ormEntity as ProductOrmEntity);
  }

  async findByPriceRange(minPrice: number, maxPrice: number, fields?: string[]): Promise<Product[]> {
    const validatedFields = FieldMapper.validateFieldsWithList(fields, this.validFields, 'product');
    const selectFields = FieldMapper.mapFields(validatedFields);
    const options = selectFields ? { fields: selectFields as any } : {};
    const ormEntities = await this.em.find(
      ProductOrmEntity,
      {
        price: { $gte: minPrice, $lte: maxPrice },
      },
      options
    );

    return ormEntities.map((entity) => this.toDomain(entity as ProductOrmEntity));
  }

  async findByFields(filters: Partial<{
    name: string;
    description: string;
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
  }>, fields?: string[]): Promise<Product[]> {
    const query: any = {};

    if (filters.name) {
      query.name = { $like: `%${filters.name}%` };
    }

    if (filters.description) {
      query.description = { $like: `%${filters.description}%` };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) {
        query.price.$gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        query.price.$lte = filters.maxPrice;
      }
    }

    if (filters.minStock !== undefined || filters.maxStock !== undefined) {
      query.stock = {};
      if (filters.minStock !== undefined) {
        query.stock.$gte = filters.minStock;
      }
      if (filters.maxStock !== undefined) {
        query.stock.$lte = filters.maxStock;
      }
    }

    const validatedFields = FieldMapper.validateFieldsWithList(fields, this.validFields, 'product');
    const selectFields = FieldMapper.mapFields(validatedFields);
    const options = selectFields ? { fields: selectFields as any } : {};
    const ormEntities = await this.em.find(
      ProductOrmEntity, 
      query,
      options
    );
    return ormEntities.map((entity) => this.toDomain(entity as ProductOrmEntity));
  }

  async save(entity: Product): Promise<Product> {
    const ormEntity = this.toOrm(entity);
    await this.em.persistAndFlush(ormEntity);
    return this.toDomain(ormEntity);
  }

  async delete(id: string): Promise<void> {
    const ormEntity = await this.em.findOne(ProductOrmEntity, { id });

    if (ormEntity) {
      await this.em.removeAndFlush(ormEntity);
    }
  }

  private toDomain(ormEntity: ProductOrmEntity): Product {
    // Skip validation for partial field selection
    const product = new Product(
      ormEntity.id || '',
      ormEntity.name || '',
      ormEntity.description || '',
      ormEntity.price || 0,
      ormEntity.stock || 0,
      true // Skip validation for partial data
    );

    // Preserve timestamps if they exist
    if (ormEntity.createdAt) {
      product.createdAt = ormEntity.createdAt;
    }
    if (ormEntity.updatedAt) {
      product.updatedAt = ormEntity.updatedAt;
    }

    return product;
  }

  private toOrm(entity: Product): ProductOrmEntity {
    const ormEntity = new ProductOrmEntity();
    ormEntity.id = entity.id;
    ormEntity.name = entity.name;
    ormEntity.description = entity.description;
    ormEntity.price = entity.price;
    ormEntity.stock = entity.stock;
    ormEntity.createdAt = entity.createdAt;
    ormEntity.updatedAt = entity.updatedAt;

    return ormEntity;
  }
}
