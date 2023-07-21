// pages/api/leaderboard.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    // Find users and order them by level in descending order
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        xp: true,
        level: true,
      },
      orderBy: {
        level: "desc",
      },
    });
  
    return NextResponse.json(users);
  }

