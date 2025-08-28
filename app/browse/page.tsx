import {RecipeCardLarge} from "@/app/ui/content/recipe-card";
import {RecipeOverview} from "@/app/lib/recipeOverview";
import MobileHeader, {MobileHeaderHeightOffset} from "@/app/ui/navigation/mobileHeader";
import React from "react";

export const dynamic = 'force-dynamic'

export default async function BrowseRecipesPage() {
    const res = await fetch('https://api.alacarteonline.co.uk/recipe')
    const recipeOverviews: RecipeOverview[] = await res.json()
    return (
        <div className="flex flex-col gap-2">
            <Header />
            <RecipeList recipes={recipeOverviews} />
        </div>
    );
}

function Header() {
    return (
        <div className="md:hidden">
            <MobileHeader title="Browse recipes"/>
            <div className={`${MobileHeaderHeightOffset}`} />
        </div>
    )
}

function RecipeList({recipes} : {recipes: RecipeOverview[]}) {
    return (
        <div className="flex flex-col gap-4 grow md:grid md:grid-cols-2 lg:grid-cols-3">
            { recipes.map((recipe, count) => <RecipeCardLarge recipe={recipe} saveButtonProps={{}} key={count} /> )}
        </div>
    )
}
