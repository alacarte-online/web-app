"use client";

import {OptionsButtonProps, RecipeCardLarge} from "@/app/ui/content/recipe-card";
import React, {useContext} from "react";
import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import {RecipeOverview} from "@/app/lib/recipeOverview";
import {SavedRecipesContext, SavedRecipesContextProvider} from "@/app/lib/recipeSaving/recipeSavingContext";
import {MealPlanContext} from "@/app/lib/mealPlanning/mealPlanContext";

export function SavedRecipesCardList({initialRecipes}: { initialRecipes: RecipeOverview[] }) {
    return (
        <SavedRecipesContextProvider>
            <MealPlanContext>
                <RecipeList recipes={initialRecipes}/>
            </MealPlanContext>
        </SavedRecipesContextProvider>
    );
}

function RecipeList({recipes}: {recipes: RecipeOverview[]}) {
    // Ensure we don't get hydration errors
    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])
    const savedRecipes = useContext(SavedRecipesContext);
    return (
        <div>
            { savedRecipes.size > 0 && isClient ? <PopulatedRecipeList recipes={recipes} savedRecipes={savedRecipes} /> : <EmptyRecipeDisplay /> }
        </div>
    )
}

function PopulatedRecipeList({recipes, savedRecipes}: {recipes: RecipeOverview[], savedRecipes: Set<number>}) {
    const optionsButtonProps: OptionsButtonProps = {enableAddToPlan: true}
    return (
        <div className="flex flex-col gap-2 grow md:grid md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe, count) =>
                <RecipeCardLarge
                    recipe={recipe}
                    style={savedRecipes.has(recipe.recipe_id) ? "" : "hidden"}
                    saveButtonProps={{}}
                    optionsButtonProps={optionsButtonProps}
                    key={count}
                />)}
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