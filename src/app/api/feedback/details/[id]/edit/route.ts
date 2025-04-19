import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  // const data = await request.json();
  const { name, email, remarks } = await request.json();
  if (!name || !email || !remarks) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!id) {
    return NextResponse.json({ error: "Missing feedback ID" }, { status: 400 });
  }
  const updatedFeedback = await prisma.feedback.update({
    where: { id: Number(id) },
    data: { name, email, remarks },
  });

  return NextResponse.json(updatedFeedback, { status: 200 });
}
