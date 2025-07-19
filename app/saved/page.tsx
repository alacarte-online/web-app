import {RecipeCardData, RecipeCardLarge} from "@/app/ui/content/recipe-card";
import {RecipeOverview} from "@/app/lib/recipeOverview";
import {cookies} from "next/headers";

export const dynamic = 'force-dynamic'

export default async function SavedRecipesPage() {
    const recipes = await GetSavedRecipeData();
   return (
        <div className="flex flex-col gap-2 bg-blackboard-500">
            <Header />
            <RecipeList recipes={recipes} />
        </div>
    );
}

async function GetSavedRecipeData(): Promise<RecipeCardData[]> {
    const cookieStore = await cookies()
    const savedRecipesCookie = cookieStore.get('saved_recipes')
    if (savedRecipesCookie === undefined) {
        return [];
    }
    const savedRecipes: string[] = JSON.parse(savedRecipesCookie?.value);
    const recipeRequests = savedRecipes.map(id => fetch('https://api.alacarteonline.co.uk/recipe/' + id))
    const recipeResponses = await Promise.all(recipeRequests);
    const recipeResponsesJson = recipeResponses.map(res => res.json());
    const recipeOverviews: RecipeOverview[] = await Promise.all(recipeResponsesJson);
    return recipeOverviews.map((recipe: RecipeOverview): RecipeCardData => { return {recipe: recipe, byCurrentUser: false } })
}

function Header() {
    return(
        <div className="flex flex-row items-center w-full">
            <h2 className="text-2xl w-full">Saved recipes</h2>
        </div>
    )
}

function RecipeList({recipes} : {recipes: RecipeCardData[]}) {
    return (
        <div className="flex flex-col gap-2 grow md:grid md:grid-cols-2 lg:grid-cols-3">
            { recipes.map((recipe, count) => <RecipeCardLarge data={recipe} key={count} /> )}
        </div>
    )
}
