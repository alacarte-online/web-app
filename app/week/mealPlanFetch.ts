"use server"

import {RecipeDetails} from "@/app/lib/recipeDetails";

export default async function fetchRecipe(id: number) : Promise<RecipeDetails> {
    const res = await fetch('https://api.alacarteonline.co.uk/recipe/' + id);
    return await res.json()
}