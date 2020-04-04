FROM node:latest

WORKDIR /app/visual-knight

COPY . .

RUN npm ci --unsafe-perm
# RUN npm ci

EXPOSE 3333
EXPOSE 4200

CMD [ "npm", "start"]