import { IsString, IsNumber, IsNotEmpty, Min, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(0)
  stock!: number;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price?: number;

  @IsNumber()
  @Min(0)
  stock?: number;
}

export class SearchProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minStock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxStock?: number;

  @IsOptional()
  @IsString()
  fields?: string;
}

export class ProductResponseDto {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
