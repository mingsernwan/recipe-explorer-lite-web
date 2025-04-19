"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function FeedbackDetailsDialogContent({
  row,
  onDialogClose,
}: {
  row: FeedbackListDTO;
  onDialogClose: () => void;
}) {
  const [details, setDetails] = useState({
    id: "",
    name: "",
    email: "",
    remarks: "",
    recipe: "",
  });
  const { data, isLoading } = useQuery({
    queryKey: ["feedbackDetails", row.id],
    queryFn: () =>
      fetch(`/api/feedback/details/${row.id}/get_details`).then((res) =>
        res.json()
      ),
  });
  useEffect(() => {
    if (data) {
      setDetails(() => ({
        id: data.id,
        name: data.name,
        email: data.email,
        remarks: data.remarks,
        recipe: data.recipe,
      }));
    }
  }, [data]);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: typeof details) => {
      const res = await fetch(`/api/feedback/details/${row.id}/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.error || "Failed to update feedback");
      }
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      alert("Feedback updated successfully!");
      onDialogClose();
    },
    onError: (error) => {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(details);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2 grid-cols-1">
        <Input
          loading={isLoading}
          label="Recipe"
          name="recipe"
          disabled
          value={details.recipe ?? ""}
        />
        <Input
          required
          loading={isLoading}
          label="Name"
          name="name"
          value={details.name ?? ""}
          onChange={(e) => {
            setDetails((prevValue) => ({
              ...prevValue,
              name: e.target.value,
            }));
          }}
        />
        <Input
          required
          type="email"
          loading={isLoading}
          label="Email"
          name="email"
          value={details.email ?? ""}
          onChange={(e) => {
            setDetails((prevValue) => ({
              ...prevValue,
              email: e.target.value,
            }));
          }}
        />
        <Textarea
          required
          loading={isLoading}
          label="Remarks/Feedback"
          name="remarksFeedback"
          value={details.remarks ?? ""}
          onChange={(e) => {
            setDetails((prevValue) => ({
              ...prevValue,
              remarks: e.target.value,
            }));
          }}
        />
        <div className="" />
        <div className="flex w-full justify-end items-end">
          <Button
            size="icon"
            variant="icon"
            type="submit"
            isLoading={isPending}
          >
            <SaveIcon className="size-5" />
          </Button>
        </div>
      </div>
    </form>
  );
}
