FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
ENV DATABASE_URL=mysql://root:root@mysql:3306/test

EXPOSE 5000

CMD ["sh", "-c", "npx --yes prisma migrate deploy && node dist/main.js"]
