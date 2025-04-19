"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FeedbackForm() {
  const router = useRouter();
  const [details, setDetails] = useState({ name: "", email: "", remarks: "" });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: typeof details) => {
      const res = await fetch("/api/feedback/create", {
        method: "POST",
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
      alert("Thank you for your feedback!");
      router.back();
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
      <div className="flex flex-row justify-between">
        <div className="">
          <p className="text-xl font-semibold">Feedback</p>
          <p className="text-sm italic">We&apos;d love to hear from you!</p>
        </div>
        <Button
          type="button"
          variant="icon"
          size="icon"
          onClick={() => {
            router.back();
          }}
        >
          <XIcon className="size-5" />
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <Input
          name="name"
          label="Name"
          value={details.name ?? ""}
          onChange={(e) =>
            setDetails((prevValue) => ({
              ...prevValue,
              name: e.target.value,
            }))
          }
        />
        <Input
          name="email"
          label="Email Address"
          value={details.email ?? ""}
          onChange={(e) =>
            setDetails((prevValue) => ({
              ...prevValue,
              email: e.target.value,
            }))
          }
        />
        <Textarea
          name="remarksFeedback"
          label="Remarks/Feedback"
          value={details.remarks ?? ""}
          onChange={(e) =>
            setDetails((prevValue) => ({
              ...prevValue,
              remarks: e.target.value,
            }))
          }
        />
        <div className="w-full justify-end flex">
          <Button
            variant="icon"
            size="iconText"
            type="submit"
            isLoading={isPending}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
