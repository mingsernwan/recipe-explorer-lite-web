import Link from "next/link";
import { RecipeList } from "./_components/recipeList";
import { XIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="p-10">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-semibold">List of Recipes</p>
        <Link
          className="rounded-sm border border-solid items-center flex p-1"
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
