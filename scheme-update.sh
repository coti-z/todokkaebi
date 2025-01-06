
docker compose up -d

export DATABASE_URL=mysql://root:1234@localhost:6001/userdb
## user db update
rm -rf apps/user/src/infrastructure/prisma/migrations
npx prisma generate --schema=apps/user/src/infrastructure/prisma/schema.prisma
npx prisma migrate deploy --schema=apps/user/src/infrastructure/prisma/schema.prisma


export DATABASE_URL=mysql://root:1234@localhost:6002/authdb
## auth db update
rm -rf apps/auth/src/infrastructure/prisma/migrations
npx prisma generate --schema=apps/auth/src/infrastructure/prisma/schema.prisma
npx prisma migrate deploy --schema=apps/auth/src/infrastructure/prisma/schema.prisma

docker compose restart