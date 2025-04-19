import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { error: "Missing feedback ID" },
        { status: 400 }
      );
    }
    const feedbackId = Number(id);
    if (isNaN(feedbackId)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
    }
    const { name, email, remarks } = await request.json();
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
    const updatedFeedback = await prisma.feedback.update({
      where: { id: feedbackId },
      data: { name, email, remarks },
    });

    return NextResponse.json(updatedFeedback, { status: 200 });
  } catch (error) {
    console.error("Error updating feedback:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle record not found error (P2025)
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Feedback not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to update feedback" },
      { status: 500 }
    );
  }
}
