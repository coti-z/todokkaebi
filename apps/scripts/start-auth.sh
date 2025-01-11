#!/bin/sh

# 1. 의존성 설치
if [ -d "node_modules" ]; then
  echo "Dependencies already installed. Skipping npm install."
else
  echo "Installing dependencies..."
  npm install
fi

# 2. Prisma 설정
if [ -d "apps/auth/src/infrastructure/prisma/migrations" ]; then
  echo "Migrations directory exists."
else
  echo "Migrations directory not found. Creating migrations..."
  mkdir -p apps/auth/src/infrastructure/prisma/migrations
fi

echo "Generating Prisma client..."
npx prisma generate --schema=apps/auth/src/infrastructure/prisma/schema.prisma

echo "Applying database migrations..."
npx prisma migrate deploy --schema=apps/auth/src/infrastructure/prisma/schema.prisma

# 3. 애플리케이션 시작
echo "Starting application..."
npm run start:auth:dev
