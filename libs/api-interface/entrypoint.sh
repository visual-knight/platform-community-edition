#!/bin/sh
exec /wait-for-it.sh $POSTGRES_SERVER:$POSTGRES_PORT -- prisma migrate up -c --experimental