#!/bin/sh
exec /wait-for-it.sh $POSTGRES_SERVER:$POSTGRES_PORT -- prisma2 migrate up -c --experimental