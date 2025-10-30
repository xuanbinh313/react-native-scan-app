import { BaseRepository } from '../../core/domain/base.repository.js';
import { User } from './user.entity.js';

export interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string, fields?: string[]): Promise<User | null>;
  findByRole(role: string, fields?: string[]): Promise<User[]>;
  findByFields(filters: Partial<{
    name: string;
    email: string;
    role: string;
  }>, fields?: string[]): Promise<User[]>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
