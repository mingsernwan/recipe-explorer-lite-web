"use client";

import { FocusCards } from "@/components/ui/focus-cards";
import { Loader } from "lucide-react";
import { useRecipeList } from "./hooks";

export function RecipeList() {
  const { LetterButtons, data, error, isLoading } = useRecipeList();
  if (isLoading)
    return (
      <div className="mt-4">
        <LetterButtons />
        <p className="">Loading recipes. Stay tuned... </p>
        <Loader className="size-5 animate-spin ml-2" />
      </div>
    );
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (data?.meals === "no data found") {
    return <div className="mt-4">No recipes found.</div>;
  }
  if (data?.meals === null) {
    return (
      <div className="mt-4">
        <LetterButtons />
        <p className="">No recipes found.</p>
      </div>
    );
  }
  const cards =
    data?.meals?.map((meal) => ({
      title: meal.strMeal,
      src: meal.strMealThumb,
      idMeal: meal.idMeal,
    })) ?? [];

  return (
    <div className="mt-4">
      <LetterButtons />
      <FocusCards cards={cards} />
    </div>
  );
}
