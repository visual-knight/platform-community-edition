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

## Setup

Clone the repository

`npm install`

You need to decied which platform you want to use. At the moment it is easy. We just support on premise but more and more providers are coming soon. So you need to deploy the api and ui to your system or you can start them with following commands:

### Prepare environments for the server

Copy the .envtemplate and name it like you want (recommendation: your stage) e.g.: .env
Fill your environment with your data!

### We have to prepare the database

_NOTE: working database is required for mysql or postgres_

1. go into libs/api-interface
2. you can find a file with the name schema.prisma
3. Setup your databse (Choose between Postgresql, Mysql and SQLite) _NOTE: environments setup must be done!_
4. Create initial database migration statements for the application `npx dotenv-cli -e ../../.env npx prisma2 lift save --name init` _NOTE: The name it e.g. 'initialize'. You have to commit the migration files to be able to update later easy the database changes_
5. Lift up the database with the structure `npx dotenv-cli -e ../../.env npx prisma2 lift up`
6. Generate the photon library `npx dotenv-cli -e ../../.env npx prisma2 generate`
7. Create the first user `EMAIL=ADD_YOUR_EMAIL_ADDRESS PASSWORD=yourPassw0rd! npx dotenv-cli -e ../../.env node postinstall.js`

Everything is done and we can start the UI and API Server ;)

### Start the servers

- Starting the api server: `npx dotenv-cli -e ../../.env npx ng run api:serve`
- Starting the ui server: `npx ng run visual-knight:serve`

### Create a build

**NOTE: This is still _experimental_**

- api server: `npx ng run api:build`
- ui static files: `npx ng run visual-knight:build`

You can find the files under the `dist` folder.
