// https://github.com/vercel/next.js/blob/canary/examples/prisma-postgres/lib/prisma.ts

import { PrismaClient } from "./generated/prisma-client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
