#!/bin/sh

# 1. 의존성이 없거나 변경되었는지 확인하고 설치
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo "Installing dependencies..."
    npm install
fi

rm -rf apps/auth/src/infrastructure/prisma/migrations
npx prisma generate --schema=apps/auth/src/infrastructure/prisma/schema.prisma
npx prisma migrate deploy --schema=apps/auth/src/infrastructure/prisma/schema.prisma
npm run start:auth:dev