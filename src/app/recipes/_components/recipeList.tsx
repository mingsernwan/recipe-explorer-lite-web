"use client";

import { FocusCards } from "@/components/ui/focus-cards";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const fetchMeals = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
  );
  if (!res.ok) {
    alert("Error Fetching Recipes");
  }
  return res.json();
};

export function RecipeList() {
  const {
    data: qData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: fetchMeals,
  });
  const data = qData as {
    meals: RecipeListDTO[] | "no data found";
  };
  if (isLoading)
    return (
      <div className="mt-4 flex items-center">
        <p className="">Loading recipes. Stay tuned... </p>
        <Loader className="size-5 animate-spin ml-2" />
      </div>
    );
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (data?.meals === "no data found") {
    return <div className="mt-4">No recipes found.</div>;
  }
  const cards =
    data?.meals?.map((meal) => ({
      title: meal.strMeal,
      src: meal.strMealThumb,
      idMeal: meal.idMeal,
    })) ?? [];

  return (
    <div className="mt-4">
      <FocusCards cards={cards} />
    </div>
  );
}
