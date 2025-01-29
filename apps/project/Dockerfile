FROM node:18 AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/scripts ./apps/scripts
COPY apps/project ./apps/project
COPY proto ./proto

RUN npx prisma generate --schema=./apps/project/src/infrastructure/prisma/schema.prisma

CMD ["sh","apps/scripts/start-project.sh"]