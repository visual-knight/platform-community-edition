#!/bin/sh
exec /wait-for-it.sh $POSTGRES_SERVER:$POSTGRES_PORT -- npx prisma migrate up --experimental
# exec npx prisma2 migrate up --experimental