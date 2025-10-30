import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../domain/user.entity.js';
import { USER_REPOSITORY } from '../domain/user.repository.js';
import type { UserRepository } from '../domain/user.repository.js';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, fields?: string[]): Promise<User> {
    const user = await this.userRepository.findById(id, fields);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async executeAll(fields?: string[]): Promise<User[]> {
    return await this.userRepository.findAll(fields);
  }

  async executeByEmail(email: string, fields?: string[]): Promise<User> {
    const user = await this.userRepository.findByEmail(email, fields);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async executeByFields(filters: Partial<{
    name: string;
    email: string;
    role: string;
  }>, fields?: string[]): Promise<User[]> {
    return await this.userRepository.findByFields(filters, fields);
  }
}
