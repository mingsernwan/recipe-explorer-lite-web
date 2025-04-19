import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Missing feedback ID" }, { status: 400 });
  }
  const getFeedback = await prisma.feedback.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(getFeedback, { status: 200 });
}
