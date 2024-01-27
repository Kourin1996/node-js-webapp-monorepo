# node-js-webapp-monorepo

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

## Setup NestJS

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
