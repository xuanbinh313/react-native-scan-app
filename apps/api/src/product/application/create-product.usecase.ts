import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../domain/product.entity.js';
import { PRODUCT_REPOSITORY } from '../domain/product.repository.js';
import type { ProductRepository } from '../domain/product.repository.js';
import { UuidUtil } from '../../core/utils/uuid.util.js';

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const id = UuidUtil.generate();
    const product = new Product(id, dto.name, dto.description, dto.price, dto.stock);

    return await this.productRepository.save(product);
  }
}
