import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing feedback ID" }, { status: 400 });
  }

  const updatedFeedback = await prisma.feedback.update({
    where: { id: Number(id) },
    data,
  });

  return NextResponse.json(updatedFeedback, { status: 200 });
}
