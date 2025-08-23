"use client";

import { LargeRecipeImage } from "@/app/ui/content/recipe-image";
import React from 'react';
import {RecipeOverview} from "@/app/lib/recipeOverview";
import Link from "next/link";
import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import {SaveButton} from "@/app/ui/buttons/saveButton";

export type RecipeCardProps = {
    recipe: RecipeOverview,
    style?: string,
    saveButtonProps?: RecipeCardSaveButtonProps
}

export type RecipeCardSaveButtonProps = {
    onSave?: (state: boolean) => void;
}

export function RecipeCardLarge({recipe, style, saveButtonProps}: RecipeCardProps) {
    return (
        <Card className={`border-[2px] border-primary bg-secondary text-primary ${style}`}>
                <Link href={"/recipes/" + recipe.recipe_id}>
                    <LargeRecipeImage recipe_name={recipe.recipe_name} image_uri={recipe.image_uri}/>
                </Link>
                <Body recipe={recipe} saveButtonProps={saveButtonProps} />
        </Card>
)
}

function Body({recipe, saveButtonProps}: RecipeCardProps) {
    return (
        <div className="flex flex-row justify-between items-center p-1 px-3">
            <Link href={"/recipes/" + recipe.recipe_id}>
                <RecipeInfo recipe={recipe} />
            </Link>
            {saveButtonProps && <SaveButton recipeId={recipe.recipe_id} onToggle={saveButtonProps.onSave} />}
        </div>
    )
}

function RecipeInfo({recipe}: { recipe: RecipeOverview }) {
    return (
        <div className="flex grow space-x-2">
            <RecipeText recipe={recipe} />
        </div>
    )
}

function RecipeText({recipe}: { recipe: RecipeOverview }) {
    return (
        <Typography component="div" className="flex flex-col">
          <h3 className="text-2xl font-medium">{recipe.recipe_name}</h3>
          <p>{recipe.user_name}</p>
        </Typography>
    )
}