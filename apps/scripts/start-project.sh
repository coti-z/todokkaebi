#!/bin/sh

# Prisma 클라이언트 생성
npx prisma generate --schema=./apps/project/src/infrastructure/prisma/schema.prisma

# 마이그레이션 실행
npx prisma migrate deploy --schema=./apps/project/src/infrastructure/prisma/schema.prisma

# 애플리케이션 시작
npm run start:project:dev