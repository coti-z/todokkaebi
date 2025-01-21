#!/bin/sh

npm install

ls

echo "Starting db sync"
npx prisma generate --schema=./apps/auth/src/infrastructure/prisma/schema.prisma --generator auth
npx prisma migrate reset --schema=./apps/auth/src/infrastructure/prisma/schema.prisma --force

npm run start:auth:dev
