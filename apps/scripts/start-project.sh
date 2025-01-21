#!/bin/sh


# DB 연결을 기다림
echo "Waiting for database to be ready..."
sleep 10

npx prisma generate --schema=./apps/project/src/infrastructure/prisma/schema.prisma
npx prisma migrate reset --schema=./apps/project/src/infrastructure/prisma/schema.prisma --force

# 마이그레이션 적용을 확실히 하기 위해
npx prisma migrate deploy --schema=./apps/project/src/infrastructure/prisma/schema.prisma


npm run start:project:dev


