import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email!;


  
      // find the user by email
      const user = await prisma.user.findUnique({
          where: {
              email: email,
          },
          select: {
              id: true,
              name: true,
              email: true,
              image: true,
              xp: true,
              level: true,
              coins: true,
              admin: true,
          }
      });
  
      // return the user if found
      if (user) {
          return NextResponse.json(user);
      } else {
          return NextResponse.json({ status: 404 });
      }
  }