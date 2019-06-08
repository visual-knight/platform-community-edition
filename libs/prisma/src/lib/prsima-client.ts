import { Prisma } from '../generated/prisma-client';

export const prismaClient = new Prisma({
  endpoint: process.env.prismaEndpoint,
  secret: process.env.prismaSecret
});
