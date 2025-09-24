"use client"

import {RecipeSaver} from "@/app/lib/recipeSaving/recipeSaver";
import {createContext, Dispatch, ReactNode, useReducer} from "react";

export type SaveRecipeAction =
    | {type: 'saved', recipe: number}
    | {type: 'unsaved', recipe: number};

const saver = RecipeSaver;
const defaultData = new Set<number>();
const defaultDispatch: Dispatch<SaveRecipeAction> = () => {}
export const SavedRecipesContext = createContext(defaultData);
export const SavedRecipesDispatchContext = createContext(defaultDispatch);

export function SavedRecipesContextProvider({children}: {children: ReactNode}) {
    const [savedRecipes, dispatch] = useReducer(reducer, saver.getSavedRecipes());

    return (
        <SavedRecipesContext value={savedRecipes}>
            <SavedRecipesDispatchContext value={dispatch}>
                {children}
            </SavedRecipesDispatchContext>
        </SavedRecipesContext>
    )
}

function reducer(recipes: Set<number>, action: SaveRecipeAction) {
    switch (action.type) {
        case 'saved': {
            saver.saveRecipe(action.recipe);
            const newSet = new Set(recipes);
            newSet.add(action.recipe);
            return newSet;
        }
        case 'unsaved': {
            saver.removeRecipe(action.recipe);
            const newSet = new Set(recipes);
            newSet.delete(action.recipe);
            return newSet;
        }
    }
}
