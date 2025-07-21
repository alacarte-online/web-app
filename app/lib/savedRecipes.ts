"use client";

import Cookie from "js-cookie";

const savedRecipes = new Set<number>();
const savedRecipeArray = Cookie.get('saved_recipes');
if (savedRecipeArray !== undefined) {
    const savedRecipesCookieValue = JSON.parse(savedRecipeArray);
    savedRecipesCookieValue.forEach((savedRecipe: number) => savedRecipes.add(savedRecipe));
}

export function isRecipeSaved(recipe_id: number) {
    return savedRecipes.has(recipe_id);
}

export function saveRecipe(recipe_id: number) {
    savedRecipes.add(recipe_id);
    writeCookie();
}

export function removeRecipe(recipe_id: number) {
    savedRecipes.delete(recipe_id);
    writeCookie();
}

function writeCookie() {
    const json = JSON.stringify(Array.from(savedRecipes));
    Cookie.set('saved_recipes', json);
}

