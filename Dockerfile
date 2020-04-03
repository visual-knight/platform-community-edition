FROM node:10

LABEL mainteiner="Pavlo Strunkin <pashidlos@gmail.com>"
LABEL version=0.0.1

ENV VK_APP_SECRET "SOME_APP_SECRET"
ENV VK_APP_DOMAIN "http://localhost:4200/"
ENV VK_GRAPHQL_SCHEMA_PATH "apps/api/schema.graphql"

ENV VK_DATABASE "file:../../tmp/visual-knight.db"

# EMAIL (only for production)
ENV VK_EMAIL_USER ""
ENV VK_EMAIL_PW ""
ENV VK_EMAIL_SMTP_PROVIDER ""


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3333
EXPOSE 4200

CMD [ "npm", "run", "start"]