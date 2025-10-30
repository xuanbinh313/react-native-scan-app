import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../domain/user.entity.js';
import { USER_REPOSITORY } from '../domain/user.repository.js';
import type { UserRepository } from '../domain/user.repository.js';

export interface LoginUserDto {
  email: string;
  password: string;
}

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.verifyPassword(dto.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
