"use client";

import { LargeRecipeImage, SmallRecipeImage } from "@/app/ui/content/recipe-image";
import React from 'react';
import {RecipeOverview} from "@/app/lib/recipeOverview";
import Link from "next/link";
import {RecipeIcons} from "@/app/ui/navigation/recipe-icons";

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
        <div className="flex flex-row justify-between items-start">
            <Link href={"/recipes/" + data.recipe.recipe_id}>
                <RecipeInfo data={data} />
            </Link>
            <RecipeIcons recipe_id={data.recipe.recipe_id} styling={"p-2 pt-6"} onOptionsClick={onOptionsClick} />
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