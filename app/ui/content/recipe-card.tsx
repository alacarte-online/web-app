"use client";

import { EllipsisVerticalIcon  } from "@heroicons/react/24/solid";
import { HeartIcon as EmptySaveIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledSaveIcon } from "@heroicons/react/24/solid";
import { LargeRecipeImage, SmallRecipeImage } from "@/app/ui/content/recipe-image";
import React from 'react';
import {RecipeOverview} from "@/app/lib/recipeOverview";
import Link from "next/link";
import { isRecipeSaved, saveRecipe, removeRecipe } from "@/app/lib/savedRecipes";

export type RecipeCardData = {
    recipe: RecipeOverview,
    byCurrentUser: boolean
}

export function RecipeCardSmall({data}: { data: RecipeCardData }) {
    return (
        <div className="flex flex-row w-full bg-blackboard-500">
            <SmallRecipeImage recipe={data.recipe} />
            <Body data={data} />
        </div>
    )
}

export function RecipeCardLarge({data, onOptionsClick}: { data: RecipeCardData, onOptionsClick?: () => void }) {
    return (
        <div className="flex flex-col">
            <Link href={"/recipes/" + data.recipe.recipe_id}>
                <LargeRecipeImage recipe_name={data.recipe.recipe_name} image_uri={data.recipe.image_uri}/>
            </Link>
            <Body data={data} onOptionsClick={onOptionsClick}/>
        </div>

)
}

function Body({data, onOptionsClick}: { data: RecipeCardData, onOptionsClick?: () => void }) {
    return (
        <div className="flex flex-row">
            <Link href={"/recipes/" + data.recipe.recipe_id}>
                <RecipeInfo data={data} />
            </Link>
            <Icons data={data} onOptionsClick={onOptionsClick} />
        </div>
    )
}

function RecipeInfo({data}: { data: RecipeCardData }) {
    return (
        <div className="flex grow space-x-2">
            <RecipeText data={data} />
        </div>
    )
}

function RecipeText({data}: { data: RecipeCardData }) {
    return (
        <div className="flex flex-col">
          <h3 className="text-lg">{data.recipe.recipe_name}</h3>
          <p>{data.recipe.brief_description}</p>
          <p>{data.recipe.user_name}</p>
        </div>
    )
}

function Icons({data, onOptionsClick}: {data: RecipeCardData, onOptionsClick?: () => void}) {
    const isSaved = isRecipeSaved(data.recipe.recipe_id);
    const [saveButtonEnabled, setSaveButtonEnabled] = React.useState(isSaved);
    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className="flex flex-row items-center">
            <button
                onClick={() => onSavedRecipePress(data.recipe.recipe_id, setSaveButtonEnabled)}>
                {isClient && saveButtonEnabled ?
                    <FilledSaveIcon className="size-8"/> :
                    <EmptySaveIcon className="size-8"/>
                }
            </button>
            { onOptionsClick != null ?
                <button onClick={onOptionsClick}>
                    <EllipsisVerticalIcon className="size-8"/>
                </button> :
                null
            }
        </div>
    )
}

function onSavedRecipePress(recipe_id: number, setSaveButtonState: React.Dispatch<React.SetStateAction<boolean>>) {
    if (isRecipeSaved(recipe_id)) {
        removeRecipe(recipe_id)
        setSaveButtonState(false)
    } else {
        saveRecipe(recipe_id)
        setSaveButtonState(true)
    }
}