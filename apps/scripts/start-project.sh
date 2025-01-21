#!/bin/sh



npx prisma generate --schema=./apps/project/src/infrastructure/prisma/schema.prisma
npx prisma migrate reset --schema=./apps/project/src/infrastructure/prisma/schema.prisma --force

npm run start:project:dev


