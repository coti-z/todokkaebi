#!/bin/sh

npm install

ls
echo "Starting db sync"

npx prisma generate --schema=/usr/src/app/apps/user/src/infrastructure/prisma/schema.prisma --generator user
npx prisma migrate reset --schema=/usr/src/app/apps/user/src/infrastructure/prisma/schema.prisma --force


npm run start:user:dev
