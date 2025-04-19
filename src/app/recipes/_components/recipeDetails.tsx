"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const fetchMealDetails = async ({ idMeal }: { idMeal: string }) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  if (!res.ok) {
    alert("Error Fetching Recipe Details");
  }
  return res.json();
};

export function RecipeDetails() {
  const { idMeal } = useParams();
  const {
    data: qData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["mealDetails", idMeal],
    queryFn: () => fetchMealDetails({ idMeal: idMeal as string }),
  });
  const data = qData as {
    meals: RecipeDetailsDTO[] | "Invalid ID" | null;
  };
  if (isLoading)
    return (
      <div className="mt-4 flex items-center">
        <p className="">Loading details. Stay tuned... </p>
        <Loader className="size-5 animate-spin ml-2" />
      </div>
    );
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (data?.meals === "Invalid ID") {
    return <div className="mt-4">Sorry, invalid ID.</div>;
  }
  if (data?.meals === null) {
    return <div className="mt-4">Sorry, nothing found.</div>;
  }
  const details = data.meals[0];

  return (
    <div className="mt-4">
      <picture>
        <img
          src={details.strMealThumb}
          alt={details.strMeal ?? ""}
          className="size-80 rounded-lg"
        />
      </picture>
      <p className="mt-2 text-lg font-semibold underline">{details.strMeal}</p>
      <p className="mt-2 font-semibold">Category:</p>
      <p className="">{details.strCategory}</p>
      <p className="mt-2 font-semibold">Tags:</p>
      <p className="">{details.strTags}</p>
      <p className="mt-2 font-semibold">Instructions:</p>
      <p className="">{details.strInstructions}</p>
      <p className="mt-2 font-semibold">Ingredients:</p>
      <p className="">
        {details.strIngredient1}, {details.strIngredient2},{" "}
        {details.strIngredient3}
      </p>
      <p className="mt-8 font-semibold">Got thoughts? Share it with us!</p>
      <Link
        href={`/recipes/details/${details.idMeal}/feedback`}
        className="cursor-pointer text-blue-600 underline"
      >
        Send Feedback
      </Link>
    </div>
  );
}
