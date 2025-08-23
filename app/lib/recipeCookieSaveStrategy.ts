import {IRecipeSaveStrategy} from "@/app/lib/recipeSaver";
import Cookie from "js-cookie";

export class RecipeCookieSaveStrategy implements IRecipeSaveStrategy {
    saveRecipes(recipes: Set<number>): void {
        const json = JSON.stringify(Array.from(recipes));
        Cookie.set('saved_recipes', json);
    }
    loadRecipes(): Set<number> {
        const savedRecipes = new Set<number>();
        const savedRecipeArray = Cookie.get('saved_recipes');
        if (savedRecipeArray !== undefined) {
            const savedRecipesCookieValue = JSON.parse(savedRecipeArray);
            savedRecipesCookieValue.forEach((savedRecipe: number) => savedRecipes.add(savedRecipe));
        }
        return savedRecipes;
    }

}