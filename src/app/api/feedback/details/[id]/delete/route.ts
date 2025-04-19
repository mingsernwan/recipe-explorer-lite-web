import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const deletedFeedback = await prisma.feedback.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json(deletedFeedback, { status: 200 });
}
