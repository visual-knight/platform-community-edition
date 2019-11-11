![Visual Knight](visual-knight.png)

# Community edition of the Visual Knight Platform

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

### So first we have to create the database

1. go into libs/api-interface
2. you can find a file with the name schema.prisma
3. Setup your databse (Choose between Postgres, Mysql and SQLite) *NOTE: Set the environment variable!*
4. Create initial database statements for the application `npx prisma2 lift save --name init`
5. Lift up the database with the structure `npx prisma2 lift up`
6. Generate the photon library `npx prisma2 generate`
7. Create the first user `EMAIL=ADD_YOUR_EMAIL_ADDRESS PASSWORD=yourPassw0rd! node postinstall.js`

Everything is done and we can start the UI and API Server ;)

### Start the servers

- Starting the api server: `npx ng run api:serve`
- Starting the ui server: `npx ng run visual-knight:serve`
