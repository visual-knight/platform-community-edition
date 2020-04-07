### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /usr/src/app
COPY . .
RUN npm ci --unsafe-perm
RUN npm run build:api

### STAGE 2: Run ###
FROM node:latest

COPY --from=build /usr/src/app/dist/apps/api /api
COPY --from=build /usr/src/app/node_modules /api/node_modules

RUN npm install -g nodemon

EXPOSE 3333

CMD [ "nodemon", "/api/main.js" ]