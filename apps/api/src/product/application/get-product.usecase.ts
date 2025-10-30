import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../domain/product.entity.js';
import { PRODUCT_REPOSITORY } from '../domain/product.repository.js';
import type { ProductRepository } from '../domain/product.repository.js';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string, fields?: string[]): Promise<Product> {
    const product = await this.productRepository.findById(id, fields);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async executeAll(fields?: string[]): Promise<Product[]> {
    return await this.productRepository.findAll(fields);
  }

  async executeByFields(filters: Partial<{
    name: string;
    description: string;
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
  }>, fields?: string[]): Promise<Product[]> {
    return await this.productRepository.findByFields(filters, fields);
  }
}
