"use client";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import type { JSX } from "react";

type Props = {
  title?: string;
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  loading?: boolean;
};

export function Textarea(
  props: Props &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
): JSX.Element {
  const { label, loading, ...rest } = props;
  const titleText = props.title ?? props.label;

  return (
    <div>
      {props.label && (
        <label
          htmlFor={`${label}-textarea`}
          className="flex text-sm leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
        >
          {props.label}{" "}
          {props.required && <span className="text-destructive">&nbsp;*</span>}
        </label>
      )}
      <div className="relative mt-0.5">
        {loading ? (
          <LoaderIcon className="block h-[30px] w-full" />
        ) : (
          <textarea
            {...rest}
            className={cn(
              "block w-full rounded border py-1 pl-2 focus:border-slate-500 focus:outline-hidden focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100",
              props.error
                ? "border-red-300 pr-10 text-red-900"
                : "border-gray-300 pr-2 text-gray-900 dark:text-gray-200",
              props.className
            )}
            id={`${props.name}-textarea`}
            title={titleText}
          />
        )}
      </div>
    </div>
  );
}
