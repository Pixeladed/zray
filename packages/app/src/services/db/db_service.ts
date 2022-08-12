import { PrismaClient } from '@prisma/client';

export class DBService {
  prisma: PrismaClient;

  constructor(dbPath: string) {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: dbPath,
        },
      },
    });
  }
}
