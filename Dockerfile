FROM node:20 AS base
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Dependencies Stage - 개발 종속성 설치
FROM base AS dependencies
COPY proto ./proto
COPY prisma prisma
RUN npm install
RUN npx prisma generate --schema=./prisma/schema.prisma

# Development Stage
FROM dependencies AS development
COPY .env.development ./.env.development
COPY src ./src
COPY libs ./libs
CMD ["npm", "run", "start:dev"]

# Build Stage - 프로덕션 빌드
FROM dependencies AS builder
COPY src ./src
COPY libs ./libs
RUN npx nest build

FROM base AS production
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=dependencies proto ./proto
COPY --from=builder ./usr/src/app/dist/src ./dist
ENV NODE_ENV=production
CMD ["node", "/usr/src/app/dist/src/main.js"]