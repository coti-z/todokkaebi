#!/bin/sh

npm install

ls

echo "Starting db sync"
npx prisma generate --schema=./apps/auth/src/infrastructure/prisma/schema.prisma --generator auth
npx prisma migrate dev --schema=./apps/auth/src/infrastructure/prisma/schema.prisma --name auth_init

npm run start:auth:dev
