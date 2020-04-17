FROM node:latest

# # Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm ci --unsafe-perm

EXPOSE 3333
EXPOSE 4200

CMD [ "npm", "start"]