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

- Mysql
- MongoDB
- PostgreSQL

## The web app

The web app is the graphical user interface in Visual Knight. Here you can manage your projects and users to handle all the test comfortably.

## The api backend

This backend returns all the information for the web app based on [Graphql](https://graphql.org/).
This API also provides the possibility to create new tests and return there status. It is used for communication with the testing tools like CodeceptJS. The backend framework is written with [NestJS](https://nestjs.com/)
