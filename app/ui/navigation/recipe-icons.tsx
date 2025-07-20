"use client";

import {isRecipeSaved, removeRecipe, saveRecipe} from "@/app/lib/savedRecipes";
import React from "react";
import {EllipsisVerticalIcon, HeartIcon as FilledSaveIcon} from "@heroicons/react/24/solid";
import {HeartIcon as EmptySaveIcon} from "@heroicons/react/24/outline";

export function RecipeIcons({recipe_id, onOptionsClick, styling}: {recipe_id: number, onOptionsClick?: () => void, styling?: string}) {
    const isSaved = isRecipeSaved(recipe_id);
    const [saveButtonEnabled, setSaveButtonEnabled] = React.useState(isSaved);
    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className={`flex flex-row items-center ${styling}`}>
            <button
                onClick={() => onSavedRecipePress(recipe_id, setSaveButtonEnabled)}>
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