"use client";

import {RecipeCardData, RecipeCardLarge} from "@/app/ui/content/recipe-card";
import React, {useCallback, useState} from "react";
import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";

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
        <div className="flex flex-col gap-2">
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
        <Card className="bg-secondary w-auto h-auto p-12">
            <Typography component="div" className="font-semibold text-2xl text-primary">
                Saved recipes will appear here. Go find some!
            </Typography>
        </Card>
    )
}