import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, email, remarks, recipe } = await request.json();
    if (!recipe || typeof recipe !== "string") {
      return NextResponse.json(
        { error: "Valid recipe is required" },
        { status: 400 }
      );
    }
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Valid name is required" },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }
    if (!remarks || typeof remarks !== "string") {
      return NextResponse.json(
        { error: "Remarks are required" },
        { status: 400 }
      );
    }
    const feedback = await prisma.feedback.create({
      data: { recipe, name, email, remarks },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json(
      { error: "Failed to create feedback" },
      { status: 500 }
    );
  }
}
