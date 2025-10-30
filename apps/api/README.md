# NestJS DDD API Project

A NestJS API built with Domain-Driven Design (DDD) architecture, using MikroORM and PostgreSQL.

## 🏗️ Project Structure

```
src/
├── core/                          # Shared kernel (cross-domain logic)
│   ├── domain/
│   │   ├── base.entity.ts          # Base entity (common id, createdAt, etc.)
│   │   ├── base.repository.ts      # Shared repository interface
│   │   └── domain-event.ts         # Optional domain events
│   ├── utils/
│   │   ├── uuid.util.ts            # UUID generator
│   │   └── guard.util.ts           # Validation helpers
│   └── infra/
│       └── database.module.ts      # MikroORM connection setup
│
├── product/
│   ├── domain/
│   │   ├── product.entity.ts       # Product domain entity
│   │   ├── product.repository.ts   # Product repository interface
│   │   └── product.value-object.ts # ProductName, ProductPrice
│   ├── application/
│   │   ├── create-product.usecase.ts
│   │   ├── update-product.usecase.ts
│   │   └── get-product.usecase.ts
│   ├── infrastructure/
│   │   ├── product.orm-entity.ts   # MikroORM entity mapping
│   │   ├── product.repository.impl.ts
│   │   └── product.seed.ts
│   ├── interfaces/
│   │   ├── product.controller.ts
│   │   └── product.dto.ts
│   └── product.module.ts
│
├── user/
│   ├── domain/
│   │   ├── user.entity.ts          # User domain entity
│   │   ├── user.repository.ts      # User repository interface
│   │   └── user.value-object.ts    # Email, Password
│   ├── application/
│   │   ├── create-user.usecase.ts
│   │   ├── login-user.usecase.ts
│   │   └── get-user.usecase.ts
│   ├── infrastructure/
│   │   ├── user.orm-entity.ts      # MikroORM entity mapping
│   │   ├── user.repository.impl.ts
│   │   └── user.seed.ts
│   ├── interfaces/
│   │   ├── user.controller.ts
│   │   └── user.dto.ts
│   └── user.module.ts
│
├── app.module.ts                  # Root module
├── main.ts                        # NestJS bootstrap
└── seed.ts                        # Database seeder
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=scan_app
   PORT=3000
   ```

3. **Create the database:**
   ```bash
   createdb scan_app
   ```

4. **Run migrations:**
   ```bash
   npm run migration:up
   ```

5. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000/api`

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run migration:create` - Create a new migration
- `npm run migration:up` - Run pending migrations
- `npm run migration:down` - Rollback last migration
- `npm run seed` - Seed the database with initial data

## 🎯 API Endpoints

### Products

- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID

## 🏛️ Architecture Layers

### Domain Layer
Contains the core business logic, entities, and repository interfaces. This layer is independent of any framework or infrastructure concerns.

### Application Layer
Contains use cases (application services) that orchestrate domain objects to fulfill specific business operations.

### Infrastructure Layer
Contains implementations of repository interfaces using MikroORM, database entities, and seeders.

### Interface Layer
Contains REST controllers and DTOs for external communication.

## 🔧 Technologies

- **NestJS** - Progressive Node.js framework
- **MikroORM** - TypeScript ORM for Node.js
- **PostgreSQL** - Relational database
- **class-validator** - Validation decorators
- **class-transformer** - Object transformation

## 📝 Design Patterns

- **Domain-Driven Design (DDD)** - Organizing code around business domains
- **Repository Pattern** - Abstraction over data access
- **Use Case Pattern** - Application-specific business rules
- **Value Objects** - Domain concepts with validation
- **Dependency Injection** - Provided by NestJS

## 🔐 Security Notes

⚠️ **Important:** The current implementation stores passwords in plain text. In a production environment, you should:

1. Hash passwords using bcrypt or argon2
2. Implement JWT authentication
3. Add authorization guards
4. Use environment-specific configurations
5. Enable HTTPS

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [MikroORM Documentation](https://mikro-orm.io)
- [Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)

## 🤝 Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

## 📄 License

This project is licensed under the UNLICENSED license.
