import { BaseRepository } from '../../core/domain/base.repository.js';
import { Product } from './product.entity.js';

export interface ProductRepository extends BaseRepository<Product> {
  findByName(name: string, fields?: string[]): Promise<Product | null>;
  findByPriceRange(minPrice: number, maxPrice: number, fields?: string[]): Promise<Product[]>;
  findByFields(filters: Partial<{
    name: string;
    description: string;
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
  }>, fields?: string[]): Promise<Product[]>;
}

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');
