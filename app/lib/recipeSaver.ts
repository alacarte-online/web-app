import { RecipeCookieSaveStrategy } from "./recipeCookieSaveStrategy";

export interface IRecipeSaver {
    isRecipeSaved(recipe_id: number) : boolean;
    saveRecipe(recipe_id: number) : void;
    removeRecipe(recipe_id: number) : void;
}

export interface IRecipeSaveStrategy{
    saveRecipes(recipes: Set<number>) : void;
    loadRecipes() : Set<number>;
}

// Since this is effectively a cache of our cookies, this needs to be a singleton
// Otherwise, different caches could get out of sync on different pages!
class RecipeSaverInternal implements IRecipeSaver {
    savedRecipes: Set<number>
    saveStrategy: IRecipeSaveStrategy;
    onRecipeSaved?: (recipe: number, state : boolean) => void;

    constructor(saveStrategy: IRecipeSaveStrategy, onRecipeSaved?: (recipe: number, state: boolean) => void) {
        this.saveStrategy = saveStrategy;
        this.onRecipeSaved = onRecipeSaved;
        this.savedRecipes = saveStrategy.loadRecipes()
    }

    isRecipeSaved(recipe_id: number): boolean {
        return this.savedRecipes.has(recipe_id);
    }
    saveRecipe(recipe_id: number): void {
        this.savedRecipes.add(recipe_id);
        this.saveStrategy.saveRecipes(this.savedRecipes);
        if(this.onRecipeSaved) {
            this.onRecipeSaved(recipe_id, true)
        }
    }
    removeRecipe(recipe_id: number): void {
        this.savedRecipes.delete(recipe_id);
        this.saveStrategy.saveRecipes(this.savedRecipes);
        if(this.onRecipeSaved) {
            this.onRecipeSaved(recipe_id, false)
        }
    }
}

export const RecipeSaver: IRecipeSaver = new RecipeSaverInternal(new RecipeCookieSaveStrategy());