cd src

npx prisma init

npx prisma db push

npx prisma generate

http://localhost:5555/
npx prisma studio

npx prisma migrate reset

⨯ Error [PrismaClientKnownRequestError]:
Invalid `prisma.user.findMany()` invocation:

GET /api/test 500 in 1494ms
Error [InvalidDatasourceError]: Error validating datasource `db`: the URL must start with the protocol `prisma://` or `prisma+postgres://`

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
