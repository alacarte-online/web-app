"use client";

import { LargeRecipeImage } from "@/app/ui/content/recipe-image";
import React from 'react';
import {RecipeOverview} from "@/app/lib/recipeOverview";
import Link from "next/link";
import {Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import {SaveButton} from "@/app/ui/buttons/saveButton";
import RecipeCardOptions from "@/app/ui/content/recipeCardOptions";

export type RecipeCardProps = {
    recipe: RecipeOverview,
    style?: string,
    saveButtonProps?: RecipeCardSaveButtonProps,
    optionsButtonProps?: OptionsButtonProps
}

export type RecipeCardSaveButtonProps = {
    onSave?: (state: boolean) => void;
}

export type OptionsButtonProps = {
    enableAddToPlan?: boolean;
}

export function RecipeCardLarge({recipe, style, saveButtonProps, optionsButtonProps}: RecipeCardProps) {
    return (
        <Card sx={{bgcolor: 'secondary.main', color: 'primary.main', borderColor: 'primary.main'}} className={`border-[2px] ${style}`}>
                <Link href={"/recipes/" + recipe.recipe_id}>
                    <LargeRecipeImage recipe_name={recipe.recipe_name} image_uri={recipe.image_uri}/>
                </Link>
                <Body recipe={recipe} saveButtonProps={saveButtonProps} optionsButtonProps={optionsButtonProps} />
        </Card>
)
}

function Body({recipe, saveButtonProps, optionsButtonProps}: RecipeCardProps) {
    return (
        <div className="flex flex-row justify-between items-center p-1 px-3">
            <Link href={"/recipes/" + recipe.recipe_id}>
                <RecipeInfo recipe={recipe} />
            </Link>
            <ButtonTray recipe={recipe} saveButtonProps={saveButtonProps} optionsButtonProps={optionsButtonProps} />
        </div>
    )
}

function ButtonTray({recipe, saveButtonProps, optionsButtonProps}: RecipeCardProps) {
    return (
        <div className="flex flex-row items-center gap-2">
            {saveButtonProps && <SaveButton recipeId={recipe.recipe_id} onToggle={saveButtonProps.onSave}/>}
            {optionsButtonProps && <RecipeCardOptions recipe={recipe.recipe_id} optionsProps={optionsButtonProps}/>}
        </div>
    )
}

function RecipeInfo({recipe}: { recipe: RecipeOverview }) {
    return (
        <div className="flex grow space-x-2">
            <RecipeText recipe={recipe}/>
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