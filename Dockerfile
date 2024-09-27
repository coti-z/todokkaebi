FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

CMD sh -c "npx --yes prisma migrate deploy && node dist/main.js"
