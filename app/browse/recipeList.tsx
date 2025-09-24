"use client"

import {RecipeOverview} from "@/app/lib/recipeOverview";
import {OptionsButtonProps, RecipeCardLarge} from "@/app/ui/content/recipe-card";
import {MealPlanContext} from "@/app/lib/mealPlanning/mealPlanContext";
import React from "react";
import {SavedRecipesContextProvider} from "@/app/lib/recipeSaving/recipeSavingContext";

export function RecipeList({recipes}: { recipes: RecipeOverview[] }) {
    const optionsButtonProps: OptionsButtonProps = {enableAddToPlan: true}
    return (
        <MealPlanContext>
            <SavedRecipesContextProvider>
                <div className="flex flex-col gap-4 grow md:grid md:grid-cols-2 lg:grid-cols-3">
                    {recipes.map((recipe, count) => <RecipeCardLarge
                        recipe={recipe}
                        saveButtonProps={{}}
                        optionsButtonProps={optionsButtonProps}
                        key={count}/>)
                    }
                </div>
            </SavedRecipesContextProvider>
        </MealPlanContext>
    )
}