import { Migration } from '@mikro-orm/migrations';

export class Migration20251030054609 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "products" ("id" uuid not null, "name" varchar(255) not null, "description" text not null, "price" numeric(10,2) not null, "stock" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "products_pkey" primary key ("id"));`);

    this.addSql(`create table "users" ("id" uuid not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" varchar(255) not null default 'user', "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "users_pkey" primary key ("id"));`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);

    this.addSql(`drop table if exists "user" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "name" varchar(255) not null, "created_at" timestamptz(6) not null, "updated_at" timestamptz(6) not null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`drop table if exists "products" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);
  }

}
