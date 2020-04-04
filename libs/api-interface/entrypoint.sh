#!/bin/sh
exec /wait-for-it.sh $POSTGRES_SERVER:$POSTGRES_PORT -- prisma migrate up -c --auto-approve --experimental 
# exec npx prisma2 migrate up --experimental