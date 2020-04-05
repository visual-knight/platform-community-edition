FROM node:latest

RUN npm install -g @prisma/cli

ADD "https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh" /wait-for-it.sh
RUN chmod +xr /wait-for-it.sh

COPY schema.prisma /schema.prisma
COPY migrations/ /migrations/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN prisma generate

ENTRYPOINT ["bash", "/entrypoint.sh"]
CMD ["up"]