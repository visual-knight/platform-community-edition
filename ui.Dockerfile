### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:visual-knight

### STAGE 2: Run ###
FROM nginx:alpine

COPY apps/visual-knight/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx /etc/nginx /var/run /run

EXPOSE 8080

COPY --from=build /usr/src/app/dist/apps/visual-knight /usr/share/nginx/html