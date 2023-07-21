// /pages/api/user.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from "../../auth/[...nextauth]/route"
import { redirect } from 'next/navigation';

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  if(!session) {
    redirect("/")
  }
  

  const data = await req.json();
  const level = data.level || 0; // Use 0 as default if xp is not provided in the request body

  const user = await prisma.user.update({
    where: {
      email: currentUserEmail,
    },
    data: {
      level: {
        increment: level, // Increment the user's XP by the provided value
      },
    },
  });

  return NextResponse.json(user);
}
