import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchMeals = async (search: string) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`
  );
  if (!res.ok) {
    alert("Error Fetching Recipes");
  }
  return res.json();
};

export function useRecipeList() {
  const [search, setSearch] = useState("a");
  const {
    data: qData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["meals", search],
    queryFn: () => fetchMeals(search),
  });
  const data = qData as {
    meals: RecipeListDTO[] | "no data found" | null;
  };
  function LetterButtons() {
    return (
      <div className="flex flex-row gap-2 flex-wrap mb-4">
        {Array.from({ length: 26 }, (_, i) => {
          const letter = String.fromCharCode(97 + i); // 97 is the char code for 'a'
          return (
            <Button
              key={letter}
              variant={letter === search ? "default" : "icon"}
              size="iconText"
              type="button"
              title={`search ${letter}`}
              onClick={() => setSearch(letter)}
              className={
                letter === search ? "bg-primary text-primary-foreground" : ""
              }
            >
              {letter}
            </Button>
          );
        })}
      </div>
    );
  }

  return { LetterButtons, data, error, isLoading };
}
