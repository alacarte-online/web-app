"use server"

import {RecipeDetails} from "@/app/lib/recipeDetails";
import {apiClient} from "@/app/api/client";

type RecipeResponse = RecipeDetails;

export default async function fetchRecipe(id: number) : Promise<RecipeDetails | null> {
    try {
        return await apiClient.get<RecipeResponse>(`/recipe/${id}`).then((response) => response.data);
    } catch (error) {
        console.error('Error getting recipe - ', error);
        return null;
    }
}