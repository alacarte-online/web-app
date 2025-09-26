import {RecipeOverview} from "@/app/lib/recipeOverview";
import {cookies} from "next/headers";
import {SavedRecipesCardList} from "@/app/saved/savedRecipeCardList";
import React from "react";
import MobileHeader, {MobileHeaderHeightOffset} from "@/app/ui/navigation/mobileHeader";
import {RecipeDetails} from "@/app/lib/recipeDetails";
import {apiClient} from "@/app/api/client";

export const dynamic = 'force-dynamic'

type RecipeResponse = RecipeDetails;

export default async function SavedRecipesPage() {
    const recipes = await GetSavedRecipeData();
    return (
        <div className="flex flex-col gap-2">
            <Header />
            <SavedRecipesCardList initialRecipes={recipes}/>
        </div>
    );
}

function Header() {
    return (
        <div className="md:hidden">
            <MobileHeader title="Saved recipes"/>
            <div className={`${MobileHeaderHeightOffset}`}/>
        </div>
    )
}

async function GetSavedRecipeData(): Promise<RecipeOverview[]> {
    const cookieStore = await cookies()
    const savedRecipesCookie = cookieStore.get('saved_recipes')
    if (savedRecipesCookie === undefined) {
        return [];
    }
    const savedRecipes: string[] = JSON.parse(savedRecipesCookie?.value);
    const recipeResponses: RecipeResponse[] = [];
    for(const recipeId of savedRecipes) {
        try {
            const recipe = await apiClient.get<RecipeResponse>(`/recipe/${recipeId}`).then((response) => response.data);
            recipeResponses.push(recipe);
        } catch (error) {
            console.error('Error getting recipe - ', error);
        }
    }
    return recipeResponses;
}