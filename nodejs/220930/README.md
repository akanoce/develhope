## What we'll do today 

- Configure and run a node app with typescript;
- Use the native vscode debugger with nodejs;
- Use typescript with express.js 
- Setup a request logger with pino 
- Never trust user input: requests validation with zod 

## Install dependencies 

``` 
npm i express zod cors pino pino-pretty dayjs 
```

## Install dev dependencies 
```
npm i --save-dev @types/pino @types/body-parser @types/cors @types/express @types/node @types/pino ts-node-dev typescript 
```

## Initialize typescript and setup scripts

- run `npx tsc --init` in root folder (if you have installed tsc with npx at global level)
- Create src/index.ts 
- Edit package.json `scripts` like this 
```     
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
  },
``` 

## Intitialize prisma 

- Run `npx prisma init --datasource-provider postgres`
- Edit the .env file according to your db config 

- Copy the following schema to `prisma/schema.prisma`

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  name     String?
  password String
  // salt     String
  products Product[]
}


model Product {
  id       Int     @id @default(autoincrement())
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @default(now())
  title String
  content     String?
  price     Float
  owner     User @relation(fields: [ownerId], references: [id])
  ownerId Int 
}

```
> This schema declare two tables: User and Product. It also declare a 1:N relationship between User and product. In particular, a user can have multiple products

### Run the db migration

`npx prisma migrate dev --name init`

