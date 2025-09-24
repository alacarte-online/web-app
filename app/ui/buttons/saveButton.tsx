"use client";

import {ToggleButtonWithIconComponent} from "@/app/ui/buttons/toggleButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useContext } from "react";
import {SavedRecipesContext, SavedRecipesDispatchContext} from "@/app/lib/recipeSaving/recipeSavingContext";

type SaveButtonProps = {
    recipeId: number,
    onToggle?: (state: boolean) => void,
    useSecondaryColor?: boolean
}

export const SaveButton = ({recipeId, onToggle, useSecondaryColor} : SaveButtonProps) => {
    const savedRecipes = useContext(SavedRecipesContext);
    const savedRecipesDispatch = useContext(SavedRecipesDispatchContext);

    const DisabledSaveIcon = () => (
        <FavoriteBorderIcon color={useSecondaryColor ? "secondary" : "primary"} sx={{fontSize: "40px"}} />
    )

    const EnabledSaveIcon = () => (
        <FavoriteIcon color={useSecondaryColor ? "secondary" : "primary"} sx={{fontSize: "40px"}} />
    )

    // Ensure we don't get hydration errors
    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    const state = savedRecipes.has(recipeId);
    const OnSaveToggled = () => {
        if(!state) {
            savedRecipesDispatch({type: 'saved', recipe: recipeId})
        }
        else {
            savedRecipesDispatch({type: 'unsaved', recipe: recipeId})
        }
        if(onToggle) {
            onToggle(state)
        }
    }

    return (
        <ToggleButtonWithIconComponent
            DisabledIcon={DisabledSaveIcon}
            EnabledIcon={EnabledSaveIcon}
            state={state && isClient}
            onClick={OnSaveToggled}
        />
    );
};