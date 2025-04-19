"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, TrashIcon } from "lucide-react";
import { FeedbackDetailsDialog } from "./feedbackDetailsDialog";
import { Button } from "@/components/ui/button";

export function FeedbackList() {
  const { data, isLoading, isError } = useQuery<FeedbackListDTO[]>({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await fetch("/api/feedback/get_list");
      if (!res.ok) throw new Error("Failed to fetch feedback");
      return res.json();
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/feedback/details/${id}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to delete feedback");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      alert("Feedback deleted successfully!");
    },
  });

  if (isLoading)
    return (
      <div className="mt-4 flex items-center">
        <p className="">Loading table. Stay tuned... </p>
        <Loader className="size-5 animate-spin ml-2" />
      </div>
    );
  if (isError) return <p>Error loading feedback.</p>;
  if (!data || data.length === 0) return <div>No feedback yet.</div>;

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-2 border">ID</th>
            <th className="px-3 py-2 border">Recipe</th>
            <th className="px-3 py-2 border">Name</th>
            <th className="px-3 py-2 border">Email</th>
            <th className="px-3 py-2 border">Remarks</th>
            <th className="px-3 py-2 border">Created At</th>
            <th className="px-3 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((feedback) => (
            <tr key={feedback.id} className="even:bg-gray-50">
              <td className="px-3 py-2 border">{feedback.id}</td>
              <td className="px-3 py-2 border">{feedback.recipe}</td>
              <td className="px-3 py-2 border">{feedback.name}</td>
              <td className="px-3 py-2 border">{feedback.email}</td>
              <td className="px-3 py-2 border">{feedback.remarks}</td>
              <td className="px-3 py-2 border">
                {new Date(feedback.createdAt).toLocaleString()}
              </td>
              <td className="px-3 py-2 border">
                <div className="flex gap-2 w-full h-full justify-center">
                  <FeedbackDetailsDialog row={feedback} />
                  <Button
                    variant="icon"
                    size="iconText"
                    type="button"
                    isLoading={isPending}
                    onClick={() => mutate(feedback.id.toString())}
                  >
                    <TrashIcon className="size-5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
