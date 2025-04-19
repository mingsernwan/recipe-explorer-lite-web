import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const feedbackId = Number(id);
    if (isNaN(feedbackId)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
    }
    const deletedFeedback = await prisma.feedback.delete({
      where: { id: feedbackId },
    });

    return NextResponse.json(deletedFeedback, { status: 200 });
  } catch (error) {
    console.error("Error deleting feedback:", error);

    // Check if this is a Prisma "record not found" error
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete feedback" },
      { status: 500 }
    );
  }
}
