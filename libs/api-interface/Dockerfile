FROM node:latest

RUN npm install -g prisma2@2.0.0-preview024

ADD wait-for-it.sh /wait-for-it.sh
RUN chmod +xr /wait-for-it.sh

COPY schema.prisma /schema.prisma
COPY migrations/ /migrations/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV VK_DATABASE=''
RUN prisma2 generate

ENTRYPOINT ["bash", "/entrypoint.sh"]
CMD ["up"]