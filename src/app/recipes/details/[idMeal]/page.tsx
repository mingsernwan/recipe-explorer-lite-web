import { XIcon } from "lucide-react";
import Link from "next/link";
import { RecipeDetails } from "../../_components/recipeDetails";

export default function Page() {
  return (
    <div className="p-4 sm:p-10">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-semibold">Recipe Details</p>
        <Link
          className="rounded-sm border border-solid items-center flex p-1"
          href="/recipes"
        >
          <XIcon className="size-5" />
        </Link>
      </div>
      <RecipeDetails />
    </div>
  );
}
