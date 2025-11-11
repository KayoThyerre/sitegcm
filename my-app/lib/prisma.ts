import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // loga as queries no terminal (ótimo pra debug)
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
