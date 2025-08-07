"use client";

import {RecipeCardData, RecipeCardLarge} from "@/app/ui/content/recipe-card";
import React, {useCallback, useState} from "react";

export function SavedRecipesCardList({initialRecipes}: { initialRecipes: RecipeCardData[] }) {
    const [savedRecipes, setSavedRecipes] = useState(initialRecipes);
    const onRecipeUnsaved = useCallback((recipeId: number, isSaved: boolean) => {
        if(isSaved) {
            return;
        }
        const removedRecipeIndex = savedRecipes.map(rec => rec.recipe.recipe_id).indexOf(recipeId);
        if (removedRecipeIndex > -1) {
            const test = savedRecipes.toSpliced(removedRecipeIndex, 1);
            setSavedRecipes(test)
        }
    }, [savedRecipes])
    return (
        <div className="flex flex-col gap-2 bg-blackboard-500">
            {savedRecipes.length > 0 ?
                <RecipeList recipes={savedRecipes} onRecipeSaved={onRecipeUnsaved} /> :
                <EmptyRecipeDisplay />
            }
        </div>
    );
}

function RecipeList({recipes, onRecipeSaved} : {recipes: RecipeCardData[], onRecipeSaved: (recipeId: number, isSaved: boolean) => void}) {
    return (
        <div className="flex flex-col gap-2 grow md:grid md:grid-cols-2 lg:grid-cols-3">
            { recipes.map((recipe, count) => <RecipeCardLarge data={recipe} key={count} onRecipeSaved={onRecipeSaved} /> )}
        </div>
    )
}

function EmptyRecipeDisplay() {
    return (
        <div className="flex w-auto h-96 justify-center items-center text-2xl">
            Saved recipes will appear here. Go find some!
        </div>
    )
}