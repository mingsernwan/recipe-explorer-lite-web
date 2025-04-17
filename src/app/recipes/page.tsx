import { RecipesList } from "./_components/recipesList";

export default function Page() {
  return (
    <div className="p-10">
      <p className="text-xl font-semibold">List of Recipes</p>
      <p className="text-sm italic">Click for more info</p>
      <RecipesList />
    </div>
  );
}
