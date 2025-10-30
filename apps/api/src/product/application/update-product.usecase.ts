import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../domain/product.entity.js';
import { PRODUCT_REPOSITORY } from '../domain/product.repository.js';
import type { ProductRepository } from '../domain/product.repository.js';

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (dto.name !== undefined) {
      product.updateName(dto.name);
    }

    if (dto.description !== undefined) {
      product.updateDescription(dto.description);
    }

    if (dto.price !== undefined) {
      product.updatePrice(dto.price);
    }

    if (dto.stock !== undefined) {
      product.updateStock(dto.stock);
    }

    return await this.productRepository.save(product);
  }
}
