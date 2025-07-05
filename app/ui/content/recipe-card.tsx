"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { LargeRecipeImage, SmallRecipeImage } from "@/app/ui/content/recipe-image";
import React from 'react';
import {RecipeOverview} from "@/app/lib/recipeOverview";
import Link from "next/link";

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
        <Link href={"/recipes/" + data.recipe.recipe_id}>
            <div className="flex flex-col">
                <LargeRecipeImage recipe_name={data.recipe.recipe_name} image_uri={data.recipe.image_uri}/>
                <Body data={data} onOptionsClick={onOptionsClick}/>
            </div>
        </Link>
    )
}

function Body({data, onOptionsClick}: { data: RecipeCardData, onOptionsClick?: () => void }) {
    return (
        <div className="flex flex-row">
            <RecipeInfo data={data} />
            { onOptionsClick != null ? <Icons onClick={onOptionsClick} /> : null }
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

function Icons({onClick}: {onClick: () => void}) {
    return (
        <div className="flex flex-row items-center">
            <button onClick={onClick}><EllipsisVerticalIcon className="size-8" /></button>
        </div>
    )
}
