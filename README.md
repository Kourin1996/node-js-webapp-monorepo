# node-js-webapp-monorepo

(WIP)

This repository showcases an example of a full-stack web application using NestJS for the backend and Next.js for the frontend, organized within a monorepo structure. The goal is to provide a seamless development experience while maintaining clear separation of concerns between the server and client-side code.

## Features

- NestJS Backend: A robust, scalable server-side framework for building efficient and reliable server-side applications.
- Next.js Frontend: A React-based framework for building user-friendly and performant web frontends.
- Monorepo Structure: Utilizing Turborepo to manage both backend and frontend in a single repository, enabling shared code and easier dependency management.
- TypeScript Support: Full TypeScript support for type-safe code across both NestJS and Next.js.
- Containerized: Both the backend and frontend applications are fully containerized, allowing for consistent development environments and easy developing.
- OpenAPI support: Automatically generate interactive API documentation with Swagger, integrated seamlessly within the NestJS backend.

## Prerequisites

- Node.js (version 20 or later)
- npm/yarn/pnpm

## Structure

- /backend: NestJS Backend Application
- /frontend: Next.js Frontend Application
- /docker-compose.yaml:

## How to use

```bash
$ git clone https://github.com/Kourin1996/node-js-webapp-monorepo.git
$ docker-compose up
$ cd apps/backend && pnpm dlx prisma migrate dev
```

# How to setup project in your environment

This section guides you how to setup such environment step by step.

Initialize monorepo style project by Turborepo. Type name of root project and the directory will be created after the command.

```bash
$ pnpm dlx create-turbo@latest

? Where would you like to create your turborepo? node-js-webapp-monorepo
? Which package manager do you want to use? pnpm workspaces
```

Turborepo setup some child projects called `app` and `package`. You can remove existing projects `apps/docs` & `apps/web`

## Setup Backend

### Initialize NestJS

Initialize NestJS project under `apps`.

```bash
$ pnpm add @nestjs/cli -g
$ cd apps && nest new backend
```

Create `packages/eslint-config/nest.js`.

```js
// packages/eslint-config/nest.js
const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "eslint-config-turbo",
  ],
  plugins: ["@typescript-eslint/eslint-plugin"],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [".*.js", "node_modules/"],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
};
```

Modify `apps/backend/.eslintrc.js`.

```js
// apps/backend/.eslintrc.js

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/nest.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
```

Create `packages/typescript-config/nestjs.json`.

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "NestJS",
  "extends": "./base.json",
  "compilerOptions": {
    "module": "NodeNext",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

Modify `apps/backend/tsconfig.json`.

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Initialize Prisma

```bash
$ cd apps/backend
$ pnpm add prisma @prisma/client
$ pnpm dlx prisma init
```

Add `docker-compose.yaml` in project root.

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16.1-alpine
    ports:
      - 5432:5432
    volumes:
      - ./persist/postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=database
      - POSTGRES_USER=test_user
      - POSTGRES_PASSWORD=test_password
```

Run `docker-compose up -d` to start DB in project root.

```bash
$ docker-compose up -d

[+] Running 2/2
 ✔ Network node-js-webapp-monorepo_default       Created                                                                                                                                                                                                            0.1s
 ✔ Container node-js-webapp-monorepo-postgres-1  Started
```

Modify `apps/backend.env` and set `DATABASE_URL` using database name, username, password set in `docker-compose.yaml`.

```env
DATABASE_URL="postgresql://test_user:test_password@localhost:5432/database?schema=public"
```

Add new model in `apps/backend/prisma/schema.prisma`

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Book {
  @@map("books")

  id Int @id @default(autoincrement())
  name String
  UUID String @unique
  price Int
  created_at DateTime @default(now())
  updated_at DateTime @default(now())
}
```

Run `migrate dev` command to create migration files and `db pull` to apply migrations to DB.

```bash
$ cd apps/backend
$ pnpm dlx prisma migrate dev --name init

# apps/backend/prisma/migrations will be created and migrations will be applied to DB
```

Run `generate` command to generate client code under `apps/backend/src/generated/prisma`, which is set in schema.prisma.

```bash
$ pnpm dlx prisma generate
```

### Install dependencies

```
$ cd apps/backend && pnpm add @nestjs/swagger class-validator
```

### Create directories

## Setup Next.js

```bash
$ cd apps && pnpm dlx create-next-app@latest
```

Rename `apps/frontend/eslintrc.json` to `apps/frontend/.eslintrc.js` and modify it.

```js
// apps/frontend/eslintrc.js

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
```

Modify `apps/frontend/tsconfig.json`

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "next.config.js",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

## Setup Commands

Add start command in `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "start": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## Docker
