import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        driver: PostgreSqlDriver,
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        user: configService.get('DB_USER', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        dbName: configService.get('DB_NAME', 'scan_app'),
        entities: ['./dist/**/*.orm-entity.js'],
        entitiesTs: ['./src/**/*.orm-entity.ts'],
        debug: configService.get('NODE_ENV') !== 'production',
        migrations: {
          path: './dist/migrations',
          pathTs: './src/migrations',
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
