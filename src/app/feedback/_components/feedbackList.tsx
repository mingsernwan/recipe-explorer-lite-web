"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { FeedbackDetailsDialog } from "./feedbackDetailsDialog";

export function FeedbackList() {
  const { data, isLoading, isError } = useQuery<FeedbackListDTO[]>({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await fetch("/api/feedback/get_list");
      if (!res.ok) throw new Error("Failed to fetch feedback");
      return res.json();
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
              <td className="px-3 py-2 border">{feedback.name}</td>
              <td className="px-3 py-2 border">{feedback.email}</td>
              <td className="px-3 py-2 border">{feedback.remarks}</td>
              <td className="px-3 py-2 border">
                {new Date(feedback.createdAt).toLocaleString()}
              </td>
              <td className="px-3 py-2 border flex justify-center">
                <FeedbackDetailsDialog row={feedback} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
