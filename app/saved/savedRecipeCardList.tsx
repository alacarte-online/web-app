"use client";

import {RecipeCardLarge, RecipeCardSaveButtonProps} from "@/app/ui/content/recipe-card";
import React, {useState} from "react";
import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import {RecipeOverview} from "@/app/lib/recipeOverview";

export function SavedRecipesCardList({initialRecipes}: { initialRecipes: RecipeOverview[] }) {
    const [displayedRecipeCount, setDisplayedRecipeCount] = useState(initialRecipes.length);
    return (
        <div className="flex flex-col gap-2">
            {displayedRecipeCount > 0 ?
                <RecipeList recipes={initialRecipes} onRecipeHidden={() => setDisplayedRecipeCount(displayedRecipeCount - 1)} /> :
                <EmptyRecipeDisplay />
            }
        </div>
    );
}

function HideableRecipeCard({recipe, onRecipeHidden}: {recipe: RecipeOverview, onRecipeHidden: () => void}) {
    const [isSaved, setSaved] = useState(true);
    const onSaved = (state: boolean) => {
        setSaved(state);
        if(!state) {
            onRecipeHidden();
        }
    }
    const recipeCardSaveButtonProps: RecipeCardSaveButtonProps = {
        onSave: onSaved
    }
    return (
        <RecipeCardLarge recipe={recipe} style={isSaved ? "" : "hidden"} saveButtonProps={recipeCardSaveButtonProps} />
    )
}

function RecipeList({recipes, onRecipeHidden}: {recipes: RecipeOverview[], onRecipeHidden: () => void}) {
    return (
        <div className="flex flex-col gap-2 grow md:grid md:grid-cols-2 lg:grid-cols-3">
            { recipes.map((recipe, count) => <HideableRecipeCard recipe={recipe} onRecipeHidden={onRecipeHidden} key={count} />)}
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