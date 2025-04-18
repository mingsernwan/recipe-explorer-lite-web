"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { FeedbackDetailsDialogContent } from "./feedbackDetailsDialogContent";

export function FeedbackDetailsDialog({ row }: { row: FeedbackListDTO }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Button
        type="button"
        variant="icon"
        size="iconText"
        onClick={() => setOpen(true)}
      >
        <PencilIcon className="size-5" />
      </Button>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          if (!o) {
            setOpen(false);
          }
        }}
      >
        <DialogContent className="z-50 flex h-max flex-col overflow-x-auto sm:max-w-[80%]">
          <div className="flex flex-row items-center justify-between">
            <DialogTitle>Feedback Details</DialogTitle>
            <div className="pr-8"></div>
          </div>
          <DialogDescription asChild>
            <div className="">
              {open && (
                <FeedbackDetailsDialogContent
                  row={row}
                  onDialogClose={() => setOpen(false)}
                />
              )}
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
