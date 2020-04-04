FROM node:latest

# WORKDIR /usr/src/api-interface

RUN npm install -g @prisma/cli

ADD "https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh" /wait-for-it.sh
RUN chmod +xr /wait-for-it.sh

COPY schema.prisma /schema.prisma
COPY migrations/ /migrations/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["up"]