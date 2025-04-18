import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "Missing feedback ID" }, { status: 400 });
  }

  const getFeedback = await prisma.feedback.findUnique({
    where: { id: Number(id) },
  });
  console.log("======\n\n", getFeedback, "\n\n======");

  return NextResponse.json(getFeedback, { status: 200 });
}
