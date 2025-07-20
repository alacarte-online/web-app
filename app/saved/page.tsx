import {RecipeCardData} from "@/app/ui/content/recipe-card";
import {RecipeOverview} from "@/app/lib/recipeOverview";
import {cookies} from "next/headers";
import {SavedRecipesCardList} from "@/app/saved/savedRecipeCardList";

export const dynamic = 'force-dynamic'

export default async function SavedRecipesPage() {
    const recipes = await GetSavedRecipeData();
    return (
        <SavedRecipesCardList initialRecipes={recipes} />
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