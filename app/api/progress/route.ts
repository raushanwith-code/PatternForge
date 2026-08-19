import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const toggleSchema = z.object({
  problemId: z.string().min(1),
  patternId: z.string().min(1),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Sign in to view progress." }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const progress = await prisma.progress.findMany({
      where: { userId },
      select: { problemId: true, patternId: true },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("[PROGRESS_GET_ERROR]", error);
    return NextResponse.json({ error: "Couldn't load progress." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Sign in to track progress." }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const body = await request.json();
    const parsed = toggleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid problem reference." }, { status: 400 });
    }

    const { problemId, patternId } = parsed.data;

    const existing = await prisma.progress.findUnique({
      where: { userId_problemId: { userId, problemId } },
    });

    if (existing) {
      await prisma.progress.delete({ where: { id: existing.id } });
      return NextResponse.json({ solved: false });
    }

    await prisma.progress.create({ data: { userId, problemId, patternId } });
    return NextResponse.json({ solved: true });
  } catch (error) {
    console.error("[PROGRESS_POST_ERROR]", error);
    return NextResponse.json({ error: "Couldn't update progress." }, { status: 500 });
  }
}
