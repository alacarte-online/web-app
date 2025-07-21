"use client";

import {isRecipeSaved, removeRecipe, saveRecipe} from "@/app/lib/savedRecipes";
import React from "react";
import {EllipsisVerticalIcon, HeartIcon as FilledSaveIcon} from "@heroicons/react/24/solid";
import {HeartIcon as EmptySaveIcon} from "@heroicons/react/24/outline";

export function RecipeIcons({
        recipe_id,
        onOptionsClick,
        onRecipeSaved,
        styling
    } : {
        recipe_id: number,
        onOptionsClick?: () => void,
        onRecipeSaved?: (recipe: number, isSaved: boolean) => void,
        styling?: string
    }) {
    const isSaved = isRecipeSaved(recipe_id);
    const saveButtonState = React.useState(isSaved);
    const saveButtonEnabled = isSaved;
    const setSaveButtonEnabled = saveButtonState[1];
    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className={`flex flex-row items-center ${styling} ${recipe_id}`}>
            <button className={`${recipe_id}`}
                onClick={() => onSavedRecipePress(
                    {recipe_id: recipe_id,
                        onRecipeSaved: onRecipeSaved,
                        setSaveButtonState: setSaveButtonEnabled})
            }>
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

function onSavedRecipePress(
    {recipe_id, onRecipeSaved, setSaveButtonState}: {
    recipe_id: number,
    onRecipeSaved?: (recipe: number, isSaved: boolean) => void,
    setSaveButtonState: React.Dispatch<React.SetStateAction<boolean>>
}) {
    if (isRecipeSaved(recipe_id)) {
        removeRecipe(recipe_id)
        setSaveButtonState(false)
        if(onRecipeSaved != null) {
            onRecipeSaved(recipe_id, false);
        }
    } else {
        saveRecipe(recipe_id)
        setSaveButtonState(true)
        if(onRecipeSaved != null) {
            onRecipeSaved(recipe_id, true);
        }
    }
}