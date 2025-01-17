#!/bin/sh

echo "Starting db sync"

npx prisma generate --schema=./apps/project/src/infrastructure/prisma/schema.prisma
npx prisma migrate reset --schema=./apps/project/src/infrastructure/prisma/schema.prisma

npm run start:project:dev


