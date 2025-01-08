#!/bin/sh

# 1. 의존성이 없거나 변경되었는지 확인하고 설치
echo "Installing dependencies..."
npm install

rm -rf apps/user/src/infrastructure/prisma/migrations
npx prisma generate --schema=apps/user/src/infrastructure/prisma/schema.prisma
npx prisma migrate deploy --schema=apps/user/src/infrastructure/prisma/schema.prisma
npm run start:user:dev