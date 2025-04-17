import { XIcon } from "lucide-react";
import Link from "next/link";
import { RecipeDetails } from "../../_components/recipeDetails";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-semibold">Recipe Details</p>
        <Link
          className={cn(buttonVariants({ variant: "icon", size: "icon" }))}
          href="/recipes"
        >
          <XIcon className="size-5" />
        </Link>
      </div>
      <RecipeDetails />
    </div>
  );
}
