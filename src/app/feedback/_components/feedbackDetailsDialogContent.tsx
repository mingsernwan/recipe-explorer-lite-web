"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SaveIcon } from "lucide-react";

export function FeedbackDetailsDialogContent({
  onDialogClose,
}: {
  row: FeedbackListDTO;
  onDialogClose: () => void;
}) {
  return (
    <div className="">
      <div className="grid gap-4 sm:grid-cols-2 grid-cols-1">
        <Input label="Name" name="name" />
        <Input label="Email" name="email" />
        <Textarea label="Remarks/Feedback" name="remarksFeedback" />
        <div className="flex w-full justify-end items-end">
          <Button
            size="icon"
            variant="icon"
            type="button"
            onClick={() => onDialogClose()}
          >
            <SaveIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
