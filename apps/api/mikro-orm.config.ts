import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const configObj: Parameters<typeof MikroORM.init>[0] = {
  entities: ['./dist/**/*.orm-entity.js'],
  entitiesTs: ['./src/**/*.orm-entity.ts'],
  driver: PostgreSqlDriver,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
  // Additional options for Supabase compatibility
  pool: {
    min: 0,
    max: 10,
  },
  driverOptions: process.env.NODE_ENV === 'production' ? {} : {
    connection: {
      ssl: false,
    },
  },
};

// Use Supabase DATABASE_URL if available, otherwise use individual env vars
if (process.env.DATABASE_URL) {
  configObj.clientUrl = process.env.DATABASE_URL;
} else {
  configObj.host = process.env.DB_HOST || 'localhost';
  configObj.port = parseInt(process.env.DB_PORT || '5432');
  configObj.user = process.env.DB_USER || 'postgres';
  configObj.password = process.env.DB_PASSWORD || 'password';
  configObj.dbName = process.env.DB_NAME || 'scan_app';
}

export default configObj;