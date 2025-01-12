#!/bin/sh

# 1. 의존성이 없거나 변경되었는지 확인하고 설치
echo "Installing dependencies..."
npm install


# Prisma 설정
cd /usr/src/app/apps/user
npx prisma generate --schema=./src/infrastructure/prisma/schema.prisma

echo "Running migrations..."
npx prisma migrate dev --schema=./src/infrastructure/prisma/schema.prisma --name init

cd /usr/src/app
npm run start:user:dev