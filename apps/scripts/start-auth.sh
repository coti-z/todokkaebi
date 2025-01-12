#!/bin/sh

# 1. 의존성 설치
npm install



cd /usr/src/app/apps/auth
npx prisma generate --schema=./src/infrastructure/prisma/schema.prisma

echo "Running migrations..."
npx prisma migrate dev --schema=./src/infrastructure/prisma/schema.prisma --name init

# 3. 애플리케이션 시작
echo "Starting application..."
cd /usr/src/app
npm run start:auth:dev
