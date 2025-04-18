import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, email, remarks } = await req.json();

  if (!name || !email || !remarks) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const feedback = await prisma.feedback.create({
    data: { name, email, remarks },
  });

  return NextResponse.json(feedback, { status: 201 });
}
