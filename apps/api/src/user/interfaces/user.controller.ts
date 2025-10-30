import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CreateUserUseCase } from '../application/create-user.usecase.js';
import { LoginUserUseCase } from '../application/login-user.usecase.js';
import { GetUserUseCase } from '../application/get-user.usecase.js';
import { CreateUserDto, LoginUserDto, UserResponseDto, LoginResponseDto, SearchUserDto } from './user.dto.js';
import { ResponseUtil } from '../../core/utils/response.util.js';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateUserDto, @Query('fields') fields?: string): Promise<UserResponseDto | Partial<UserResponseDto>> {
    const user = await this.createUserUseCase.execute(dto);
    
    if (fields) {
      const selectedFields = ResponseUtil.parseFields(fields);
      return ResponseUtil.filterFields(this.toResponse(user), selectedFields);
    }
    
    return this.toResponse(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto, @Query('fields') fields?: string): Promise<LoginResponseDto> {
    const user = await this.loginUserUseCase.execute(dto);
    
    if (fields) {
      const selectedFields = ResponseUtil.parseFields(fields);
      return {
        user: ResponseUtil.filterFields(this.toResponse(user), selectedFields),
        message: 'Login successful',
      };
    }
    
    return {
      user: this.toResponse(user),
      message: 'Login successful',
    };
  }

  @Get()
  async findAll(@Query() searchDto?: SearchUserDto): Promise<UserResponseDto[] | Partial<UserResponseDto>[]> {
    const selectedFields = searchDto?.fields ? ResponseUtil.parseFields(searchDto.fields) : undefined;
    let users;
    
    // If any search parameters are provided, use the search functionality
    if (ResponseUtil.hasSearchFilters(searchDto)) {
      const { fields, ...filters } = searchDto || {};
      users = await this.getUserUseCase.executeByFields(filters, selectedFields);
    } else {
      // Otherwise, return all users
      users = await this.getUserUseCase.executeAll(selectedFields);
    }
    
    // Handle field selection in response
    if (selectedFields) {
      return users.map((user) => 
        ResponseUtil.filterFields(this.toResponse(user), selectedFields)
      );
    }
    
    return users.map((user) => this.toResponse(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('fields') fields?: string): Promise<UserResponseDto | Partial<UserResponseDto>> {
    const selectedFields = fields ? ResponseUtil.parseFields(fields) : undefined;
    const user = await this.getUserUseCase.execute(id, selectedFields);
    
    if (selectedFields) {
      return ResponseUtil.filterFields(this.toResponse(user), selectedFields);
    }
    
    return this.toResponse(user);
  }

  private toResponse(user: any): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
