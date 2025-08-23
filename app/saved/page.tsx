import {RecipeCardData} from "@/app/ui/content/recipe-card";
import {RecipeOverview} from "@/app/lib/recipeOverview";
import {cookies} from "next/headers";
import {SavedRecipesCardList} from "@/app/saved/savedRecipeCardList";
import React from "react";
import MobileHeader from "@/app/ui/navigation/mobileHeader";

export const dynamic = 'force-dynamic'

export default async function SavedRecipesPage() {
    const recipes = await GetSavedRecipeData();
    return (
        <div className="flex flex-col gap-2">
            <Header />
            <SavedRecipesCardList initialRecipes={recipes}/>
        </div>

)
    ;
}

function Header() {
    return (
        <MobileHeader title="Saved recipes"/>
    )
}

async function GetSavedRecipeData(): Promise<RecipeOverview[]> {
    const cookieStore = await cookies()
    const savedRecipesCookie = cookieStore.get('saved_recipes')
    if (savedRecipesCookie === undefined) {
        return [];
    }
    const savedRecipes: string[] = JSON.parse(savedRecipesCookie?.value);
    const recipeRequests = savedRecipes.map(id => fetch('https://api.alacarteonline.co.uk/recipe/' + id))
    const recipeResponses = await Promise.all(recipeRequests);
    const recipeResponsesJson = recipeResponses.map(res => res.json());
    return await Promise.all(recipeResponsesJson);
}