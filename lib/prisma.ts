import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function addXP(userId: any, xpToAdd: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  
    if (user) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          xp: user.xp || 0 + xpToAdd,
        },
      });
    }
  }
  
  if (process.argv.length === 3) {
    const userId = process.argv[2];
    addXP(userId, 100);
  }