#!/bin/sh

npm install

ls
echo "Starting db sync"

npx prisma generate --schema=./apps/project/src/infrastructure/prisma/schema.prisma


npx prisma migrate dev --schema=./apps/project/src/infrastructure/prisma/schema.prisma --name init


npm run start:project:dev


