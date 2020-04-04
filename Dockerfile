FROM node:10

LABEL mainteiner="Pavlo Strunkin <pashidlos@gmail.com>"
LABEL version=0.0.1

ENV VK_APP_DOMAIN "http://localhost:4200/"
ENV VK_GRAPHQL_SCHEMA_PATH "apps/api/schema.graphql"

ENV VK_DATABASE "postgresql://prisma:prisma@localhost:5432/prisma"

# EMAIL (only for production)
ENV VK_EMAIL_USER ""
ENV VK_EMAIL_PW ""
ENV VK_EMAIL_SMTP_PROVIDER ""


# Create app directory
WORKDIR /usr/src/app

RUN npm install -g @prisma/cli
COPY ./libs/api-interface/schema.prisma ./
COPY ./libs/api-interface/migrations ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN npx prisma2 migrate up --experimental --auto-approve
# RUN node libs/api-interface/postinstall.js

# Bundle app source
COPY . .

EXPOSE 3333
EXPOSE 4200

CMD [ "npm", "start"]