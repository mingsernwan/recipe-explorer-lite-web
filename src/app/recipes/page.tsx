import Link from "next/link";
import { RecipeList } from "./_components/recipeList";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-semibold">List of Recipes</p>
        <Link
          className={cn(buttonVariants({ variant: "icon", size: "icon" }))}
          href="/"
        >
          <XIcon className="size-5" />
        </Link>
      </div>
      <p className="text-sm italic">Click for more info</p>
      <RecipeList />
    </div>
  );
}
