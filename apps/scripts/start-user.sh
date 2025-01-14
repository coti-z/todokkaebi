#!/bin/sh

npm install

ls
echo "Starting db sync"

npx prisma generate --schema=/usr/src/app/apps/user/src/infrastructure/prisma/schema.prisma --generator user
npx prisma migrate dev --schema=/usr/src/app/apps/user/src/infrastructure/prisma/schema.prisma --name user_init

npm run start:user:dev
