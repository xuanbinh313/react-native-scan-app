import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateProductUseCase } from '../application/create-product.usecase.js';
import { UpdateProductUseCase } from '../application/update-product.usecase.js';
import { GetProductUseCase } from '../application/get-product.usecase.js';
import { CreateProductDto, UpdateProductDto, ProductResponseDto, SearchProductDto } from './product.dto.js';
import { PRODUCT_REPOSITORY } from '../domain/product.repository.js';
import { Inject } from '@nestjs/common';
import type { ProductRepository } from '../domain/product.repository.js';
import { ResponseUtil } from '../../core/utils/response.util.js';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.createProductUseCase.execute(dto);
    return this.toResponse(product);
  }

  @Get()
  async findAll(@Query() searchDto?: SearchProductDto): Promise<ProductResponseDto[] | Partial<ProductResponseDto>[]> {
    const selectedFields = searchDto?.fields ? ResponseUtil.parseFields(searchDto.fields) : undefined;
    let products;
    
    // If any search parameters are provided, use the search functionality
    if (ResponseUtil.hasSearchFilters(searchDto)) {
      const { fields, ...filters } = searchDto || {};
      products = await this.getProductUseCase.executeByFields(filters, selectedFields);
    } else {
      // Otherwise, return all products
      products = await this.getProductUseCase.executeAll(selectedFields);
    }
    
    // Handle field selection in response
    if (selectedFields) {
      return products.map((product) => 
        ResponseUtil.filterFields(this.toResponse(product), selectedFields)
      );
    }
    
    return products.map((product) => this.toResponse(product));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('fields') fields?: string): Promise<ProductResponseDto | Partial<ProductResponseDto>> {
    const selectedFields = fields ? ResponseUtil.parseFields(fields) : undefined;
    const product = await this.getProductUseCase.execute(id, selectedFields);
    
    if (selectedFields) {
      return ResponseUtil.filterFields(this.toResponse(product), selectedFields);
    }
    
    return this.toResponse(product);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.updateProductUseCase.execute(id, dto);
    return this.toResponse(product);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  private toResponse(product: any): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
