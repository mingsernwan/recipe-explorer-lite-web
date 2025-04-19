import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
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
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
    });
    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(feedback, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback:", error);

    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}
