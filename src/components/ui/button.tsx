import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

const buttonVariants = cva(
  cn(
    "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:border-disabled-foreground disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled-foreground"
  ),
  {
    variants: {
      variant: {
        default:
          "flex items-center bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        success:
          "bg-success text-success-foreground shadow-xs hover:bg-success/90",
        outline:
          "border border-primary text-primary bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-blue-600 underline-offset-4 hover:underline disabled:bg-transparent",
        icon: "border border-primary text-primary shadow-none",
        tableHeader: "",
        none: "",
        search:
          "flex items-center bg-primary text-primary-foreground hover:bg-primary/90",
      },
      size: {
        default: "h-[30px] px-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-[30px] w-10 px-1",
        iconBack: "h-[30px] w-10 px-1 rounded-full",
        iconText: "h-[30px] px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={!!isLoading ? isLoading : props.disabled}
      >
        {isLoading ? (
          <LoaderIcon className="size-5 animate-spin" />
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
