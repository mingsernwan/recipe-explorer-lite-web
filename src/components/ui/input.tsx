import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

type Props = {
  title?: string;
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  loading?: boolean;
};

export function Input(
  props: Props &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
) {
  const { disabled, label, loading, ...rest } = props;
  const titleText = props.title ?? props.label;

  return (
    <div>
      {props.label && (
        <label
          htmlFor={`${label}-input`}
          className="flex text-sm leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1.5"
        >
          {props.label}
          {props.required && <span className="text-destructive">&nbsp;*</span>}
        </label>
      )}
      <div className="relative">
        {loading ? (
          <div className="relative flex flex-col items-center">
            <div className="w-full">
              <Input disabled />
            </div>
            <LoaderIcon
              className={`absolute top-2 size-5 animate-spin text-gray-400`}
            />
          </div>
        ) : (
          <input
            {...rest}
            className={cn(
              "block h-[30px] w-full rounded border py-1 pl-2 focus:border-slate-500 focus:outline-hidden focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800",
              props.error
                ? "border-red-300 pr-10 text-destructive"
                : "border-gray-300 pr-2 text-foreground",
              disabled ? "bg-gray-200 cursor-default" : "",
              props.className
            )}
            readOnly={disabled}
            id={`${props.name}-input`}
            title={titleText}
          />
        )}
      </div>
    </div>
  );
}
