import { EntityManager } from '@mikro-orm/core';
import { ProductOrmEntity } from './product.orm-entity.js';

export async function seedProducts(em: EntityManager): Promise<void> {
  const existingProducts = await em.count(ProductOrmEntity);

  if (existingProducts > 0) {
    console.log('Products already seeded, skipping...');
    return;
  }

  const products = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Laptop Pro 2024',
      description: 'High-performance laptop for professionals',
      price: 1299.99,
      stock: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with USB receiver',
      price: 29.99,
      stock: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical gaming keyboard',
      price: 89.99,
      stock: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const productData of products) {
    const product = em.create(ProductOrmEntity, productData);
    em.persist(product);
  }

  await em.flush();
  console.log('Products seeded successfully!');
}
