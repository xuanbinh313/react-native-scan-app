import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserController } from './interfaces/user.controller.js';
import { CreateUserUseCase } from './application/create-user.usecase.js';
import { LoginUserUseCase } from './application/login-user.usecase.js';
import { GetUserUseCase } from './application/get-user.usecase.js';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl.js';
import { UserOrmEntity } from './infrastructure/user.orm-entity.js';
import { USER_REPOSITORY } from './domain/user.repository.js';

@Module({
  imports: [MikroOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    LoginUserUseCase,
    GetUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
