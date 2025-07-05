import {Ingredient} from "@/app/lib/ingredient";

export type RecipeDetails = {
    recipe_id: number,
    user_id: number,
    recipe_name: string,
    user_name: string,
    brief_description: string,
    image_uri: string,
    method: string,
    ingredients: Ingredient[]
}