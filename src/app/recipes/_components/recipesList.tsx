"use client";

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

export function RecipesList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: fetchMeals,
  });
  console.log("======\n\n", data, "\n\n======");

  if (isLoading)
    return (
      <div className="mt-4 flex items-center">
        <p className="">Loading recipes. Stay tuned... </p>
        <Loader className="size-5 animate-spin ml-2" />
      </div>
    );
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.meals?.map(
          (meal: { idMeal: string; strMeal: string; strMealThumb: string }) => (
            <div key={meal.idMeal} className="flex flex-col items-center">
              <strong>{meal.strMeal}</strong>
              <picture>
                <img src={meal.strMealThumb} alt={meal.strMeal} width={100} />
              </picture>
            </div>
          )
        )}
      </div>
    </div>
  );
}
