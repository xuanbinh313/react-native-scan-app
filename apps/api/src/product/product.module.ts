import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductController } from './interfaces/product.controller.js';
import { CreateProductUseCase } from './application/create-product.usecase.js';
import { UpdateProductUseCase } from './application/update-product.usecase.js';
import { GetProductUseCase } from './application/get-product.usecase.js';
import { ProductRepositoryImpl } from './infrastructure/product.repository.impl.js';
import { ProductOrmEntity } from './infrastructure/product.orm-entity.js';
import { PRODUCT_REPOSITORY } from './domain/product.repository.js';

@Module({
  imports: [MikroOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    UpdateProductUseCase,
    GetProductUseCase,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepositoryImpl,
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductModule {}
