# Community edition of the Visual Knight Platform

![Visual Knight](visual-knight.png)

The ecosystem contains 3 essential parts in Visual Knight.

1. The database
2. The web app
3. The api backend

## Database

We use for our data handling [Prisma 2](https://www.prisma.io/). It is an excellent modern ORM which provides a lot of tools like

- Simplified & type-safe database access
- Declarative migrations & data modeling
- Powerful & visual data management

We use Postgres as database but you can use others too.
Prisma supports following databases at the moment:

- PostgreSQL
- SQLite: unstable (photon releases required)
- Mysql
- MongoDB: coming soon (waiting for prisma2 photon support)

## The web app

The web app is the graphical user interface in Visual Knight. Here you can manage your projects and users to handle all the test comfortably.

## The api backend

This backend returns all the information for the web app based on [Graphql](https://graphql.org/).
This API also provides the possibility to create new tests and return there status. It is used for communication with the testing tools like CodeceptJS. The backend framework is written with [NestJS](https://nestjs.com/)

## Set up

1. create `docker-compose.yml`
```
version: '3.7'
services:
  api:
    image: visualknight/api:0.0.2
    ports: 
      - '${VK_API_PORT}:3333'
    environment: 
      VK_APP_SECRET: SOME_APP_SECRET
      VK_APP_DOMAIN: http://${VK_UI_DOMAIN}:${VK_UI_PORT}/
      VK_GRAPHQL_SCHEMA_PATH: apps/api/schema.graphql
      VK_DATABASE: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/${VK_DB_NAME}
    depends_on:
      - postgres
  ui:
    image: visualknight/ui:0.0.2
    ports: 
      - '${VK_UI_PORT}:8080'
  postgres:
    image: postgres
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - '${POSTGRES_PORT}:5432'
    expose:
      - '${POSTGRES_PORT}'
    volumes:
      - postgres:/var/lib/postgresql/data
  migration:
    image: visualknight/migration:0.0.2
    depends_on:
      - postgres
    environment:
      VK_DATABASE: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/${VK_DB_NAME}
      POSTGRES_SERVER: postgres
      POSTGRES_PORT: ${POSTGRES_PORT}
volumes:
  postgres:
```

2. create `.env`
```
POSTGRES_PORT=5432
POSTGRES_USER=prisma
POSTGRES_PASSWORD=prisma

VK_DB_NAME=prisma_table

VK_UI_DOMAIN=localhost
VK_UI_PORT=4200
VK_API_PORT=3333
```

3. run `docker-compose up`

4. open url `VK_UI_DOMAIN:VK_UI_PORT` _http://localhost:4200_

5. login `visual-knight-community@example.com`/`yourPassw0rd!`

## Setup local env for development

Clone the repository

### Set up env variables

Create `.env` file based on `.envtemplate` for:
1. root derictory
2. libs/api-interface

Fill your environment with your data!

### Install dependencies

`npm install`

### Prepare database

_NOTE: working database is required for mysql or postgres_

1. go into `libs/api-interface`
2. you can find a file with the name schema.prisma
3. Setup your databse (Choose between Postgresql, Mysql and SQLite) _NOTE: environments setup must be done!_
4. Lift up the database with the structure `npx prisma2 migrate up --experimental`
5. Create the first user `node postinstall.js` _NOTE: You'll see credentials and API key in console_

Everything is done and we can start the UI and API Server ;)

### Start the ui and api server (2 servers in parallel)

1. Starting the api server: `npx ng run api:serve` _NOTE: default http://localhost:3333/graphql_
2. Starting the ui server: `npx ng run visual-knight:serve` _NOTE: default http://localhost:4200_

### Build docker images

`docker-compose up --build`

### Create a build

**NOTE: This is still _experimental_**

- api server: `npx ng run api:build`
- ui static files: `npx ng run visual-knight:build`

You can find the files under the `dist` folder.
