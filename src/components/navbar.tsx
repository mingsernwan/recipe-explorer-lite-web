import { ChefHatIcon } from "lucide-react";
import Link from "next/link";

export function NavBar() {
  return (
    <nav
      aria-label="Main navigation"
      className="bg-black h-10 flex flex-row gap-4 items-center px-10"
    >
      <Link href="/">
        <ChefHatIcon className="size-5 text-white" />
      </Link>
      <Link className="text-white" href="/recipes">
        Recipes
      </Link>
      <Link className="text-white" href="/feedback">
        Feedback
      </Link>
    </nav>
  );
}
