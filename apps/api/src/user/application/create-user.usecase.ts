import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { User } from '../domain/user.entity.js';
import { USER_REPOSITORY } from '../domain/user.repository.js';
import type { UserRepository } from '../domain/user.repository.js';
import { UuidUtil } from '../../core/utils/uuid.util.js';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const id = UuidUtil.generate();
    const user = new User(id, dto.name, dto.email, dto.password, dto.role);

    return await this.userRepository.save(user);
  }
}
