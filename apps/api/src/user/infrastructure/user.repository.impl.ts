import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../domain/user.entity.js';
import { UserRepository } from '../domain/user.repository.js';
import { UserOrmEntity } from './user.orm-entity.js';
import { FieldMapper } from '../../core/utils/field-mapper.util.js';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private readonly validFields: string[];

  constructor(private readonly em: EntityManager) {
    // Get field names from MikroORM metadata for accurate field list
    const metadata = this.em.getMetadata().get('UserOrmEntity');
    if (metadata) {
      this.validFields = Object.keys(metadata.properties);
    } else {
      // Fallback to manual extraction if metadata is not available
      this.validFields = FieldMapper.getValidFieldsFromEntity(UserOrmEntity);
    }
  }

  async findById(id: string, fields?: string[]): Promise<User | null> {
    const validatedFields = FieldMapper.validateFieldsWithList(fields, this.validFields, 'user');
    const selectFields = FieldMapper.mapFields(validatedFields);
    const options = selectFields ? { fields: selectFields as any } : {};
    const ormEntity = await this.em.findOne(
      UserOrmEntity, 
      { id },
      options
    );

    if (!ormEntity) {
      return null;
    }

    return this.toDomain(ormEntity as UserOrmEntity);
  }

  async findAll(fields?: string[]): Promise<User[]> {
    const validatedFields = FieldMapper.validateFieldsWithList(fields, this.validFields, 'user');
    const selectFields = FieldMapper.mapFields(validatedFields);
    const options = selectFields ? { fields: selectFields as any } : {};
    const ormEntities = await this.em.find(
      UserOrmEntity, 
      {},
      options
    );
    return ormEntities.map((entity) => this.toDomain(entity as UserOrmEntity));
  }

  async findByEmail(email: string, fields?: string[]): Promise<User | null> {
    const validatedFields = FieldMapper.validateFieldsWithList(fields, this.validFields, 'user');
    const selectFields = FieldMapper.mapFields(validatedFields);
    const options = selectFields ? { fields: selectFields as any } : {};
    const ormEntity = await this.em.findOne(
      UserOrmEntity, 
      { email: email.toLowerCase() },
      options
    );

    if (!ormEntity) {
      return null;
    }

    return this.toDomain(ormEntity as UserOrmEntity);
  }

  async findByRole(role: string, fields?: string[]): Promise<User[]> {
    const validatedFields = FieldMapper.validateFieldsWithList(fields, this.validFields, 'user');
    const selectFields = FieldMapper.mapFields(validatedFields);
    const options = selectFields ? { fields: selectFields as any } : {};
    const ormEntities = await this.em.find(
      UserOrmEntity, 
      { role },
      options
    );
    return ormEntities.map((entity) => this.toDomain(entity as UserOrmEntity));
  }

  async findByFields(filters: Partial<{
    name: string;
    email: string;
    role: string;
  }>, fields?: string[]): Promise<User[]> {
    const query: any = {};

    if (filters.name) {
      query.name = { $like: `%${filters.name}%` };
    }

    if (filters.email) {
      query.email = { $like: `%${filters.email}%` };
    }

    if (filters.role) {
      query.role = filters.role;
    }

    const validatedFields = FieldMapper.validateFieldsWithList(fields, this.validFields, 'user');
    const selectFields = FieldMapper.mapFields(validatedFields);
    const options = selectFields ? { fields: selectFields as any } : {};
    const ormEntities = await this.em.find(
      UserOrmEntity, 
      query,
      options
    );
    return ormEntities.map((entity) => this.toDomain(entity as UserOrmEntity));
  }

  async save(entity: User): Promise<User> {
    const ormEntity = this.toOrm(entity);
    await this.em.persistAndFlush(ormEntity);
    return this.toDomain(ormEntity);
  }

  async delete(id: string): Promise<void> {
    const ormEntity = await this.em.findOne(UserOrmEntity, { id });

    if (ormEntity) {
      await this.em.removeAndFlush(ormEntity);
    }
  }

  private toDomain(ormEntity: UserOrmEntity): User {
    const user = new User(
      ormEntity.id || '', 
      ormEntity.name || '', 
      ormEntity.email || '', 
      ormEntity.password || '', 
      ormEntity.role || 'user',
      true // Skip validation for partial data
    );

    // Preserve timestamps if they exist
    if (ormEntity.createdAt) {
      user.createdAt = ormEntity.createdAt;
    }
    if (ormEntity.updatedAt) {
      user.updatedAt = ormEntity.updatedAt;
    }

    return user;
  }

  private toOrm(entity: User): UserOrmEntity {
    const ormEntity = new UserOrmEntity();
    ormEntity.id = entity.id;
    ormEntity.name = entity.name;
    ormEntity.email = entity.email;
    ormEntity.password = entity.password;
    ormEntity.role = entity.role;
    ormEntity.createdAt = entity.createdAt;
    ormEntity.updatedAt = entity.updatedAt;

    return ormEntity;
  }
}
