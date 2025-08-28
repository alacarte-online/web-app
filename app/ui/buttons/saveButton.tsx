"use client";

import {ToggleButtonWithIconComponent} from "@/app/ui/buttons/toggleButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {IRecipeSaver, RecipeSaver} from "@/app/lib/recipeSaver";
import React from "react";

type SaveButtonProps = {
    recipeId: number,
    onToggle?: (state: boolean) => void,
}

const recipeSaver: IRecipeSaver = RecipeSaver;

export const SaveButton = ({recipeId, onToggle} : SaveButtonProps) => {
    const DisabledSaveIcon = () => (
        <FavoriteBorderIcon color="primary" sx={{fontSize: "40px"}} />
    )

    const EnabledSaveIcon = () => (
        <FavoriteIcon color="primary" sx={{fontSize: "40px"}} />
    )

    const OnSaveToggled = (state: boolean) => {
        if(state) {
            recipeSaver.saveRecipe(recipeId)
        }
        else {
            recipeSaver.removeRecipe(recipeId)
        }
        if(onToggle) {
            onToggle(state)
        }
    }

    return (
        <ToggleButtonWithIconComponent
            DisabledIcon={DisabledSaveIcon}
            EnabledIcon={EnabledSaveIcon}
            initialState={recipeSaver.isRecipeSaved(recipeId)}
            onToggle={OnSaveToggled}
        />
    );
};