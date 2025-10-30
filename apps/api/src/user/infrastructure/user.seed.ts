import { EntityManager } from '@mikro-orm/core';
import { UserOrmEntity } from './user.orm-entity.js';

export async function seedUsers(em: EntityManager): Promise<void> {
  const existingUsers = await em.count(UserOrmEntity);

  if (existingUsers > 0) {
    console.log('Users already seeded, skipping...');
    return;
  }

  const users = [
    {
      id: '650e8400-e29b-41d4-a716-446655440001',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123', // In production, this should be hashed
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '650e8400-e29b-41d4-a716-446655440002',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123', // In production, this should be hashed
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '650e8400-e29b-41d4-a716-446655440003',
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123', // In production, this should be hashed
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const userData of users) {
    const user = em.create(UserOrmEntity, userData);
    em.persist(user);
  }

  await em.flush();
  console.log('Users seeded successfully!');
}
