import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'products' })
export class ProductOrmEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property()
  name!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Property({ type: 'integer' })
  stock!: number;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt!: Date;
}
