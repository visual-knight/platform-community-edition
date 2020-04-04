FROM node:latest

RUN npm install -g nodemon

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install
RUN mkdir -p /app/api && cp -a /tmp/node_modules /app/api/

WORKDIR /app/api
COPY dist/apps/api/ /app/api

EXPOSE 3333

CMD [ "nodemon", "main.js" ]