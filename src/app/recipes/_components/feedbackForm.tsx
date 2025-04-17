"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function FeedbackForm() {
  const router = useRouter();

  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <div className="">
          <p className="text-xl font-semibold">Feedback</p>
          <p className="text-sm italic">We&apos;d love to hear from you!</p>
        </div>
        <button
          type="button"
          className="rounded-sm border border-solid items-center flex p-1 cursor-pointer size-8"
          onClick={() => {
            router.back();
          }}
        >
          <XIcon className="size-5" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 items-end">
        <Input name="name" label="Name" />
        <Input name="email" label="Email Address" />
        <Textarea name="remarksFeedback" label="Remarks/Feedback" />
        <div className="w-full justify-end flex">
          <button
            type="button"
            className="rounded-sm border border-solid items-center flex py-2 px-4 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
